// Build target for embedding the app inside a host page we do not control
// (Imweb HTML widget, a blog post, anywhere a <script> tag can go).
//
// Differences from the standalone Vercel build:
//   - IIFE, not ES modules: Imweb widgets are pasted as plain HTML, and a
//     classic script also lets us read document.currentScript.
//   - Every asset is inlined, so the result is one self-contained .js file
//     with no relative asset paths to get wrong on a foreign origin.
//   - CSS is scoped to #myeonggyeol-app and injected from JS, so Tailwind's
//     preflight cannot reset the host page's own layout.
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import postcss, {type Rule} from 'postcss';
import {defineConfig, type Plugin} from 'vite';

const SCOPE = '#myeonggyeol-app';
const STYLE_ID = 'myeonggyeol-styles';

/**
 * Splits a selector list on top-level commas only, ignoring commas inside
 * (), [], quotes, or behind a backslash — Tailwind emits selectors such as
 * `.bg-\[\#D4AF7C\]\/30` and `:is(a, b)`.
 */
function splitSelectorList(selector: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let current = '';

  for (let i = 0; i < selector.length; i++) {
    const char = selector[i];

    if (char === '\\') {
      current += char + (selector[i + 1] ?? '');
      i++;
      continue;
    }
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === '(' || char === '[') depth++;
    if (char === ')' || char === ']') depth--;

    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current);
  return parts;
}

function scopeSelector(selector: string): string {
  return splitSelectorList(selector)
    .map((raw) => {
      const part = raw.trim();
      if (!part || part.includes(SCOPE)) return part;

      // Document-level selectors collapse onto the container itself.
      const rooted = part.match(/^(?::root|html|body|:host)\b\s*(.*)$/);
      if (rooted) return rooted[1] ? `${SCOPE} ${rooted[1]}` : SCOPE;

      return `${SCOPE} ${part}`;
    })
    .filter((part, index, all) => part && all.indexOf(part) === index)
    .join(', ');
}

function isInsideKeyframes(rule: Rule): boolean {
  for (let node = rule.parent; node; node = (node as any).parent) {
    if ((node as any).type === 'atrule' && /keyframes$/.test((node as any).name)) return true;
  }
  return false;
}

async function scopeCss(css: string, from: string): Promise<string> {
  const result = await postcss([
    {
      postcssPlugin: 'myeonggyeol-embed-css',
      Once(root) {
        // Tailwind v4 emits everything inside cascade layers, and ANY
        // unlayered rule on the host page beats a layered one no matter how
        // specific — an Imweb theme's plain `img { border: 3px }` would win
        // over our reset. Flattening the layers puts our rules back on equal
        // footing, where the #myeonggyeol-app prefix wins on specificity.
        for (let guard = 0; guard < 20; guard++) {
          let found = false;
          root.walkAtRules('layer', (atRule) => {
            found = true;
            if (atRule.nodes) atRule.replaceWith(atRule.nodes);
            else atRule.remove();
          });
          if (!found) break;
        }

        root.walkRules((rule: Rule) => {
          if (isInsideKeyframes(rule)) return;
          rule.selector = scopeSelector(rule.selector);
        });
      },
    },
  ]).process(css, {from});
  return result.css;
}

/** Scopes the emitted CSS and folds it into the JS bundle as a <style> tag. */
function scopeAndInlineCss(): Plugin {
  return {
    name: 'myeonggyeol-scope-and-inline-css',
    // Must run after vite:css-post has emitted the stylesheet asset.
    enforce: 'post',
    async generateBundle(_options, bundle) {
      const cssFiles = Object.keys(bundle).filter((name) => name.endsWith('.css'));
      if (cssFiles.length === 0) return;

      let css = '';
      for (const name of cssFiles) {
        const asset = bundle[name];
        if (asset.type !== 'asset') continue;
        css += typeof asset.source === 'string' ? asset.source : Buffer.from(asset.source).toString('utf8');
        // The host page only loads the .js file; drop the stylesheet.
        delete bundle[name];
      }

      const scoped = await scopeCss(css, 'embed.css');
      const injector =
        `(function(){var d=document;if(d.getElementById(${JSON.stringify(STYLE_ID)}))return;` +
        `var s=d.createElement("style");s.id=${JSON.stringify(STYLE_ID)};` +
        `s.textContent=${JSON.stringify(scoped)};` +
        `(d.head||d.documentElement).appendChild(s);})();\n`;

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = injector + chunk.code;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), scopeAndInlineCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    outDir: 'dist-embed',
    emptyOutDir: true,
    cssCodeSplit: false,
    // Inline images as data URIs: a foreign host must not need to resolve
    // any relative asset path back to this deployment.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    lib: {
      entry: path.resolve(__dirname, 'src/embed.tsx'),
      name: 'MyeonggyeolEmbed',
      formats: ['iife'],
      fileName: () => 'myeonggyeol.js',
    },
  },
});
