/* 고연당 홈페이지 동작 — 내용은 assets/site.config.js 에서 가져옵니다. */
(function () {
  'use strict';

  var CFG = window.GOYEONDANG || {};
  var LINKS = CFG.links || {};
  var HANDLES = CFG.instagramHandles || {};
  var KAKAO_SDK = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';

  /* ── 도우미 ───────────────────────────────────────────── */
  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (key) {
      if (key === 'class') node.className = props[key];
      else if (key === 'text') node.textContent = props[key];
      else if (key === 'html') node.innerHTML = props[key];
      else if (key in node) node[key] = props[key];
      else node.setAttribute(key, props[key]);
    });
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function abs(path) { return new URL(path, location.href).href; }
  function tel() { return CFG.phone ? 'tel:' + CFG.phone.replace(/[^0-9+]/g, '') : ''; }
  function fill(id, value, asHtml) {
    var node = document.getElementById(id);
    if (!node) return;
    if (!value) { node.hidden = true; return; }
    if (asHtml) node.innerHTML = value; else node.textContent = value;
  }
  function insta(kind) {
    return kind === 'minhwa' ? LINKS.instagramMinhwa : LINKS.instagramCoffee;
  }
  function instaLink(kind, label, klass) {
    var href = insta(kind);
    if (!href) return null;
    return el('a', {
      class: klass || 'btn btn-ghost',
      href: href,
      target: '_blank',
      rel: 'noopener',
      text: label,
    });
  }

  /* ── 히어로 ───────────────────────────────────────────── */
  function renderHero() {
    fill('heroTitle', CFG.heroTitle, true);
    fill('heroLead', CFG.heroLead, true);
    var place = [CFG.address, CFG.addressDetail].filter(Boolean).join(' ');
    fill('heroPlace', place);
  }

  /* ── 진입 분기 카드 ───────────────────────────────────── */
  function renderBranches() {
    var grid = $('#branchGrid');
    if (!grid) return;
    (CFG.branches || []).forEach(function (item) {
      grid.appendChild(el('a', {class: 'branch-card reveal', href: item.href}, [
        el('span', {class: 'branch-eyebrow', text: item.eyebrow}),
        el('h2', {text: item.title}),
        el('p', {text: item.text}),
        el('span', {class: 'branch-cta', text: item.cta}),
      ]));
    });
  }

  /* ── 클래스 ───────────────────────────────────────────── */
  function renderClasses() {
    var grid = $('#classGrid');
    if (grid) {
      (CFG.classes || []).forEach(function (item) {
        var card = el('article', {class: 'class-card reveal' + (item.featured ? ' is-featured' : '')});
        if (item.featured) card.appendChild(el('span', {class: 'class-badge', text: '인기'}));
        card.appendChild(el('h3', {text: item.title}));
        var meta = [item.duration, item.capacity].filter(Boolean).join('  ·  ');
        if (meta) card.appendChild(el('p', {class: 'class-meta', text: meta}));
        if (item.summary) card.appendChild(el('p', {text: item.summary}));
        if (item.points && item.points.length) {
          card.appendChild(el('ul', {class: 'class-points'}, item.points.map(function (p) {
            return el('li', {text: p});
          })));
        }
        card.appendChild(el('p', {class: 'class-price', text: item.price || '문의'}));
        grid.appendChild(card);
      });
    }

    var steps = $('#steps');
    if (steps) {
      (CFG.steps || []).forEach(function (step, i) {
        steps.appendChild(el('li', {class: 'step'}, [
          el('span', {class: 'step-no', text: String(i + 1)}),
          el('h4', {text: step.title}),
          el('p', {text: step.text}),
        ]));
      });
    }

    sectionFoot('classFoot', '수업과 작품 소식은 ' + (HANDLES.minhwa || '인스타그램') + ' 에 올려요',
      instaLink('minhwa', '민화 인스타그램 보기'));
  }

  /* ── 섹션 하단 인스타그램 안내 ────────────────────────── */
  function sectionFoot(id, text, link) {
    var box = document.getElementById(id);
    if (!box) return;
    if (!link) { box.hidden = true; return; }
    box.appendChild(el('p', {class: 'section-foot-text', text: text}));
    box.appendChild(link);
  }

  /* ── 갤러리 ───────────────────────────────────────────── */
  function placeholder(caption) {
    var wrap = el('div', {class: 'gallery-placeholder'});
    wrap.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/>' +
      '<circle cx="8.5" cy="10" r="1.5"/><path d="m4 17 5-4.5 3.5 3L16 12l4 4"/></svg>';
    wrap.appendChild(el('span', {text: caption ? caption + ' — 사진 준비 중' : '사진 준비 중'}));
    return wrap;
  }

  function renderGallery() {
    var grid = $('#galleryGrid');
    if (grid) {
      (CFG.gallery || []).forEach(function (item) {
        var cell = el('button', {class: 'gallery-item reveal is-empty', type: 'button', disabled: true});
        cell.appendChild(placeholder(item.caption));
        grid.appendChild(cell);
        if (!item.src) return;

        // 파일이 실제로 있을 때만 사진으로 바꾼다 (없으면 자리표시자 유지).
        var probe = new Image();
        probe.onload = function () {
          cell.textContent = '';
          cell.classList.remove('is-empty');
          cell.disabled = false;
          cell.appendChild(el('img', {
            src: item.src,
            alt: item.caption || '고연당 공방 사진',
            loading: 'lazy',
            decoding: 'async',
          }));
          if (item.caption) cell.appendChild(el('span', {class: 'gallery-caption', text: item.caption}));
          cell.addEventListener('click', function () { openLightbox(item); });
        };
        probe.src = item.src;
      });
    }

    sectionFoot('galleryFoot', '더 많은 작품은 ' + (HANDLES.minhwa || '인스타그램') + ' 에서 보실 수 있어요',
      instaLink('minhwa', '작품 더 보기'));
  }

  /* ── 라이트박스 ───────────────────────────────────────── */
  var lightbox = $('#lightbox');
  var lastFocused = null;

  function openLightbox(item) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    $('#lightboxImg').src = item.src;
    $('#lightboxImg').alt = item.caption || '고연당 공방 사진';
    $('#lightboxCaption').textContent = item.caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }
  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    $('#lightboxImg').src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  /* ── 커피 ─────────────────────────────────────────────── */
  function renderCoffee() {
    fill('coffeeLead', CFG.coffeeLead);

    var grid = $('#menuGrid');
    if (grid) {
      (CFG.menu || []).forEach(function (group) {
        var list = el('ul', {class: 'menu-list'}, (group.items || []).map(function (item) {
          var name = el('span', {class: 'menu-name'}, [document.createTextNode(item.name)]);
          if (item.note) name.appendChild(el('small', {class: 'menu-note', text: item.note}));
          // 가격이 비어 있으면 점선 리더도 그리지 않는다.
          var row = [name];
          if (item.price) {
            row.push(el('span', {class: 'menu-dots', 'aria-hidden': 'true'}));
            row.push(el('span', {class: 'menu-price', text: item.price}));
          }
          return el('li', {}, row);
        }));
        grid.appendChild(el('div', {class: 'menu-group reveal'}, [
          el('h3', {text: group.group}),
          list,
        ]));
      });
    }

    var notes = $('#coffeeNotes');
    if (notes) {
      if (!(CFG.coffeeNotes || []).length) notes.hidden = true;
      (CFG.coffeeNotes || []).forEach(function (note) {
        notes.appendChild(el('li', {text: note}));
      });
    }

    sectionFoot('coffeeFoot', '오늘의 원두와 영업 소식은 ' + (HANDLES.coffee || '인스타그램') + ' 에서',
      instaLink('coffee', '커피 인스타그램 보기'));
  }

  /* ── 오시는 길 · 문의 ─────────────────────────────────── */
  function renderVisit() {
    var list = $('#infoList');

    function row(term, body) {
      list.appendChild(el('div', {class: 'info-row reveal'}, [el('dt', {text: term}), body]));
    }

    if (list) {
      if (CFG.address) {
        var addr = el('dd', {}, [document.createTextNode(CFG.address)]);
        if (CFG.addressDetail) addr.appendChild(el('small', {text: CFG.addressDetail}));
        row('주소', addr);
      }
      if ((CFG.hours || []).length) {
        var hours = el('dd');
        CFG.hours.forEach(function (h, i) {
          if (i) hours.appendChild(el('br'));
          hours.appendChild(document.createTextNode(h.days + '  ·  ' + h.time));
        });
        if (CFG.hoursNote) hours.appendChild(el('small', {text: CFG.hoursNote}));
        row('영업시간', hours);
      }
      if (CFG.phone) row('전화', el('dd', {}, [el('a', {href: tel(), text: CFG.phone})]));
      if (CFG.parking) row('주차', el('dd', {text: CFG.parking}));

      var handles = el('dd', {class: 'info-handles'});
      if (LINKS.instagramMinhwa) {
        handles.appendChild(el('a', {
          href: LINKS.instagramMinhwa, target: '_blank', rel: 'noopener',
          text: '민화 ' + (HANDLES.minhwa || ''),
        }));
      }
      if (LINKS.instagramCoffee) {
        handles.appendChild(el('a', {
          href: LINKS.instagramCoffee, target: '_blank', rel: 'noopener',
          text: '커피 ' + (HANDLES.coffee || ''),
        }));
      }
      if (handles.childNodes.length) row('인스타그램', handles);
    }

    var cta = $('#visitCta');
    if (cta && LINKS.naverPlace) {
      cta.appendChild(el('a', {
        class: 'btn btn-primary', href: LINKS.naverPlace, target: '_blank', rel: 'noopener',
        text: '네이버 지도로 길찾기',
      }));
    }
    if (cta) {
      cta.appendChild(el('button', {class: 'btn btn-ghost', type: 'button', id: 'copyAddress', text: '주소 복사'}));
      if (CFG.phone) cta.appendChild(el('a', {class: 'btn btn-ghost', href: tel(), text: '전화 문의'}));
    }

    var contact = $('#contactButtons');
    if (contact) {
      if (LINKS.booking) {
        contact.appendChild(el('a', {
          class: 'btn btn-primary', href: LINKS.booking, target: '_blank', rel: 'noopener',
          text: '예약 페이지 열기',
        }));
      }
      if (CFG.phone) contact.appendChild(el('a', {class: 'btn btn-ghost', href: tel(), text: '전화로 문의'}));
      var dm = instaLink('minhwa', '수업 문의 (인스타그램 DM)');
      if (dm) contact.appendChild(dm);
      var coffeeDm = instaLink('coffee', '매장 문의 (인스타그램 DM)');
      if (coffeeDm) contact.appendChild(coffeeDm);
    }

    fill('footerAddr', [CFG.address, CFG.addressDetail].filter(Boolean).join(' '));
    fill('footHandleMinhwa', HANDLES.minhwa || '');
    fill('footHandleCoffee', HANDLES.coffee || '');

    var footer = $('#footerLinks');
    if (footer) {
      [
        LINKS.instagramMinhwa && {href: LINKS.instagramMinhwa, text: '민화 인스타그램'},
        LINKS.instagramCoffee && {href: LINKS.instagramCoffee, text: '커피 인스타그램'},
        LINKS.naverPlace && {href: LINKS.naverPlace, text: '네이버 지도'},
        CFG.phone && {href: tel(), text: CFG.phone},
      ].filter(Boolean).forEach(function (link) {
        footer.appendChild(el('a', {href: link.href, target: '_blank', rel: 'noopener', text: link.text}));
      });
    }

    // 모바일 하단 고정 바: 지도 · 문의 · 공유
    var bar = $('#mobileBar');
    if (bar) {
      if (LINKS.naverPlace) {
        bar.appendChild(el('a', {href: LINKS.naverPlace, target: '_blank', rel: 'noopener', text: '길찾기'}));
      }
      bar.appendChild(el('a', {href: '#contact', text: '예약 · 문의'}));
      var shareBtn = el('button', {type: 'button', text: '공유'});
      shareBtn.setAttribute('data-share', '');
      bar.appendChild(shareBtn);
    }
  }

  function copyText(text, okMessage) {
    var done = function () { toast(okMessage); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var area = el('textarea', {value: text});
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); done(); }
      catch (err) { toast('복사에 실패했어요.'); }
      document.body.removeChild(area);
    }
  }

  var toastTimer = null;
  function toast(message) {
    var box = $('#toast');
    if (!box) {
      box = el('div', {class: 'toast', id: 'toast', role: 'status', 'aria-live': 'polite'});
      document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { box.classList.remove('is-on'); }, 2200);
  }

  /* ── 카카오톡 공유 ────────────────────────────────────── */
  var kakaoReady = null;

  function loadKakao() {
    if (kakaoReady) return kakaoReady;
    kakaoReady = new Promise(function (resolve, reject) {
      if (!CFG.kakaoJsKey) { reject(new Error('no-key')); return; }
      if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()) { resolve(window.Kakao); return; }
      var script = el('script', {src: KAKAO_SDK, async: true, crossOrigin: 'anonymous'});
      script.onload = function () {
        try {
          if (!window.Kakao.isInitialized()) window.Kakao.init(CFG.kakaoJsKey);
          resolve(window.Kakao);
        } catch (err) { reject(err); }
      };
      script.onerror = function () { reject(new Error('sdk-load-failed')); };
      document.head.appendChild(script);
    });
    return kakaoReady;
  }

  function shareTitle() { return (CFG.name || '고연당') + ' — ' + (CFG.tagline || ''); }
  function shareText() {
    return CFG.description || document.querySelector('meta[name="description"]').content;
  }
  function status(message, isError) {
    var box = $('#shareStatus');
    if (!box) return;
    box.textContent = message;
    box.style.color = isError ? 'var(--dancheong)' : 'var(--celadon)';
  }

  function kakaoShare() {
    if (!CFG.kakaoJsKey) {
      status('카카오 JavaScript 키가 없어 링크 복사로 대신합니다.', true);
      copyText(location.href, '링크를 복사했어요.');
      return;
    }
    loadKakao().then(function (Kakao) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle(),
          description: shareText(),
          imageUrl: abs('images/hero.png'),
          link: {mobileWebUrl: location.href, webUrl: location.href},
        },
        buttons: [
          {title: '홈페이지 보기', link: {mobileWebUrl: location.href, webUrl: location.href}},
          {
            title: '오시는 길',
            link: {
              mobileWebUrl: LINKS.naverPlace || location.href,
              webUrl: LINKS.naverPlace || location.href,
            },
          },
        ],
      });
      status('카카오톡 공유 창을 열었어요.');
    }).catch(function () {
      status('카카오톡 공유를 열지 못해 링크를 복사합니다.', true);
      copyText(location.href, '링크를 복사했어요.');
    });
  }

  var shareSheet = $('#shareSheet');

  function openShare() {
    if (!shareSheet) return;
    lastFocused = document.activeElement;
    status('');
    shareSheet.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#kakaoShare').focus();
  }
  function closeShare() {
    if (!shareSheet || shareSheet.hidden) return;
    shareSheet.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function initShare() {
    $$('[data-share]').forEach(function (btn) { btn.addEventListener('click', openShare); });
    $$('#shareSheet [data-close]').forEach(function (btn) { btn.addEventListener('click', closeShare); });

    var kakaoBtn = $('#kakaoShare');
    if (kakaoBtn) kakaoBtn.addEventListener('click', kakaoShare);

    var copyBtn = $('#copyLink');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyText(location.href, '링크를 복사했어요.');
        status('링크를 복사했어요.');
      });
    }

    var addrBtn = $('#copyAddress');
    if (addrBtn) {
      addrBtn.addEventListener('click', function () {
        copyText([CFG.address, CFG.addressDetail].filter(Boolean).join(' '), '주소를 복사했어요.');
      });
    }

    var nativeBtn = $('#nativeShare');
    if (nativeBtn && navigator.share) {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener('click', function () {
        navigator.share({title: shareTitle(), text: shareText(), url: location.href})
          .then(closeShare)
          .catch(function () { /* 사용자가 취소한 경우 */ });
      });
    }
  }

  /* ── 헤더 · 네비게이션 ────────────────────────────────── */
  function initHeader() {
    var header = $('#siteHeader');
    var nav = $('#nav');
    var toggle = $('.nav-toggle');

    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      });
      nav.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    var links = $$('#nav a');
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, {rootMargin: '-45% 0px -50% 0px'});
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ── 스크롤 등장 ──────────────────────────────────────── */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: .08});
    items.forEach(function (item) { io.observe(item); });
  }

  /* ── 시작 ─────────────────────────────────────────────── */
  renderHero();
  renderBranches();
  renderClasses();
  renderGallery();
  renderCoffee();
  renderVisit();
  initShare();
  initHeader();
  initReveal();

  $$('#lightbox [data-close]').forEach(function (btn) { btn.addEventListener('click', closeLightbox); });
  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { closeLightbox(); closeShare(); }
  });

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
