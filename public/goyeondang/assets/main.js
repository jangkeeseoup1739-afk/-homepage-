/* 고연당 홈페이지 동작 — 내용은 assets/site.config.js 에서 가져옵니다. */
(function () {
  'use strict';

  var CFG = window.GOYEONDANG || {};
  var KAKAO_SDK = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';

  /* ── 작은 도우미 ───────────────────────────────────────── */
  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (key) {
      if (key === 'class') node.className = props[key];
      else if (key === 'text') node.textContent = props[key];
      else if (key in node) node[key] = props[key];
      else node.setAttribute(key, props[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function abs(path) { return new URL(path, location.href).href; }

  /* ── 클래스 카드 ──────────────────────────────────────── */
  function renderClasses() {
    var grid = $('#classGrid');
    if (!grid) return;
    (CFG.classes || []).forEach(function (item) {
      var card = el('article', {class: 'class-card reveal' + (item.featured ? ' is-featured' : '')});
      if (item.featured) card.appendChild(el('span', {class: 'class-badge', text: '인기'}));
      card.appendChild(el('h3', {text: item.title}));
      if (item.duration) card.appendChild(el('p', {class: 'class-meta', text: item.duration}));
      if (item.summary) card.appendChild(el('p', {text: item.summary}));
      if (item.points && item.points.length) {
        card.appendChild(el('ul', {class: 'class-points'}, item.points.map(function (p) {
          return el('li', {text: p});
        })));
      }
      card.appendChild(el('p', {class: 'class-price', text: item.price ? item.price : '문의'}));
      grid.appendChild(card);
    });

    var note = $('#classNote');
    if (!note) return;
    note.appendChild(document.createTextNode('일정 · 가격 안내와 예약은 '));
    var link = CFG.links && (CFG.links.booking || CFG.links.instagram);
    if (link) {
      note.appendChild(el('a', {
        href: link,
        target: '_blank',
        rel: 'noopener',
        text: CFG.links.booking ? '예약 페이지' : '인스타그램 DM',
      }));
      note.appendChild(document.createTextNode(CFG.phone ? ' 또는 전화로 문의해 주세요.' : '으로 문의해 주세요.'));
    } else {
      note.appendChild(document.createTextNode('전화 또는 방문으로 문의해 주세요.'));
    }
  }

  /* ── 갤러리 ───────────────────────────────────────────── */
  function placeholder(caption) {
    return el('div', {class: 'gallery-placeholder'}, [
      (function () {
        var wrap = el('div');
        wrap.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/>' +
          '<circle cx="8.5" cy="10" r="1.5"/><path d="m4 17 5-4.5 3.5 3L16 12l4 4"/></svg>';
        return wrap.firstChild;
      })(),
      el('span', {text: caption ? caption + ' — 사진 준비 중' : '사진 준비 중'}),
    ]);
  }

  function renderGallery() {
    var grid = $('#galleryGrid');
    if (!grid) return;

    (CFG.gallery || []).forEach(function (item) {
      var cell = el('button', {
        class: 'gallery-item reveal is-empty',
        type: 'button',
        disabled: true,
      });
      cell.appendChild(placeholder(item.caption));
      grid.appendChild(cell);

      if (!item.src) return;

      // 파일이 실제로 있을 때만 사진으로 교체한다 (없으면 자리표시자 유지).
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

  /* ── 메뉴 ─────────────────────────────────────────────── */
  function renderMenu() {
    var grid = $('#menuGrid');
    if (!grid) return;
    (CFG.menu || []).forEach(function (group) {
      var list = el('ul', {class: 'menu-list'}, (group.items || []).map(function (item) {
        var name = el('span', {class: 'menu-name'}, [document.createTextNode(item.name)]);
        if (item.note) name.appendChild(el('small', {class: 'menu-note', text: item.note}));
        // 가격이 비어 있으면 점선 리더도 그리지 않는다 (이름만 깔끔하게).
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

  /* ── 오시는 길 · 링크 ─────────────────────────────────── */
  function renderInfo() {
    var list = $('#infoList');
    var links = CFG.links || {};

    function row(term, body) {
      var wrap = el('div', {class: 'info-row reveal'}, [el('dt', {text: term}), body]);
      list.appendChild(wrap);
    }

    if (list) {
      if (CFG.address) {
        var dd = el('dd', {}, [document.createTextNode(CFG.address)]);
        if (CFG.addressDetail) dd.appendChild(el('small', {text: CFG.addressDetail}));
        row('주소', dd);
      } else if (links.naverPlace) {
        row('주소', el('dd', {}, [
          el('a', {href: links.naverPlace, target: '_blank', rel: 'noopener', text: '네이버 지도에서 위치 보기'}),
        ]));
      }

      if (CFG.hours && CFG.hours.length) {
        var hours = el('dd');
        CFG.hours.forEach(function (h, i) {
          if (i) hours.appendChild(el('br'));
          hours.appendChild(document.createTextNode(h.days + '  ·  ' + h.time));
        });
        if (CFG.hoursNote) hours.appendChild(el('small', {text: CFG.hoursNote}));
        row('영업시간', hours);
      }

      if (CFG.phone) {
        row('전화', el('dd', {}, [
          el('a', {href: 'tel:' + CFG.phone.replace(/[^0-9+]/g, ''), text: CFG.phone}),
        ]));
      }

      if (links.instagram) {
        row('인스타그램', el('dd', {}, [
          el('a', {href: links.instagram, target: '_blank', rel: 'noopener', text: '@goyeondang_'}),
        ]));
      }
    }

    var cta = $('#visitCta');
    if (cta) {
      if (links.naverPlace) {
        cta.appendChild(el('a', {
          class: 'btn btn-primary', href: links.naverPlace, target: '_blank', rel: 'noopener',
          text: '네이버 지도로 길찾기',
        }));
      }
      if (CFG.phone) {
        cta.appendChild(el('a', {
          class: 'btn btn-ghost', href: 'tel:' + CFG.phone.replace(/[^0-9+]/g, ''),
          text: '전화 문의',
        }));
      }
      if (links.instagram) {
        cta.appendChild(el('a', {
          class: 'btn btn-ghost', href: links.instagram, target: '_blank', rel: 'noopener',
          text: '인스타그램',
        }));
      }
    }

    var footer = $('#footerLinks');
    if (footer) {
      [
        links.instagram && {href: links.instagram, text: '인스타그램'},
        links.naverPlace && {href: links.naverPlace, text: '네이버 지도'},
        CFG.phone && {href: 'tel:' + CFG.phone.replace(/[^0-9+]/g, ''), text: CFG.phone},
      ].filter(Boolean).forEach(function (link) {
        footer.appendChild(el('a', {href: link.href, target: '_blank', rel: 'noopener', text: link.text}));
      });
    }

    if (links.instagram) {
      var insta = $('#instaLink');
      if (insta) insta.href = links.instagram;
    }
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
  function shareText() { return CFG.description || document.querySelector('meta[name="description"]').content; }

  function status(message, isError) {
    var box = $('#shareStatus');
    if (!box) return;
    box.textContent = message;
    box.style.color = isError ? 'var(--dancheong)' : 'var(--celadon)';
  }

  function kakaoShare() {
    if (!CFG.kakaoJsKey) {
      status('카카오 JavaScript 키가 없어 링크 복사로 대신합니다.', true);
      copyLink();
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
              mobileWebUrl: (CFG.links && CFG.links.naverPlace) || location.href,
              webUrl: (CFG.links && CFG.links.naverPlace) || location.href,
            },
          },
        ],
      });
      status('카카오톡 공유 창을 열었어요.');
    }).catch(function () {
      status('카카오톡 공유를 열지 못해 링크를 복사합니다.', true);
      copyLink();
    });
  }

  function copyLink() {
    var url = location.href;
    var done = function () { status('링크를 복사했어요.'); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(done).catch(fallback);
    } else {
      fallback();
    }
    function fallback() {
      var area = el('textarea', {value: url});
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); done(); }
      catch (err) { status('복사에 실패했어요. 주소창의 링크를 직접 복사해 주세요.', true); }
      document.body.removeChild(area);
    }
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
    $$('[data-share]').forEach(function (btn) {
      btn.addEventListener('click', openShare);
    });
    $$('#shareSheet [data-close]').forEach(function (btn) {
      btn.addEventListener('click', closeShare);
    });
    var kakaoBtn = $('#kakaoShare');
    if (kakaoBtn) kakaoBtn.addEventListener('click', kakaoShare);
    var copyBtn = $('#copyLink');
    if (copyBtn) copyBtn.addEventListener('click', copyLink);

    var nativeBtn = $('#nativeShare');
    if (nativeBtn && navigator.share) {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener('click', function () {
        navigator.share({title: shareTitle(), text: shareText(), url: location.href})
          .then(function () { closeShare(); })
          .catch(function () { /* 사용자가 취소한 경우 */ });
      });
    }
  }

  /* ── 헤더 · 네비게이션 ─────────────────────────────────── */
  function initHeader() {
    var header = $('#siteHeader');
    var nav = $('#nav');
    var toggle = $('.nav-toggle');

    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
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

    // 현재 보고 있는 섹션을 상단 메뉴에 표시
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
  renderClasses();
  renderGallery();
  renderMenu();
  renderInfo();
  initShare();
  initHeader();
  initReveal();

  $$('#lightbox [data-close]').forEach(function (btn) {
    btn.addEventListener('click', closeLightbox);
  });
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

  document.title = (CFG.name || '고연당') + ' — ' + (CFG.tagline || '민화 공방 · 커피');
})();
