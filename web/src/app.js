/* ເວັບທົບທວນ Java — ການເຮັດວຽກຝັ່ງ browser */
(function () {
  'use strict';

  var P = '__STORE_PREFIX__';
  var root = document.documentElement;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var data = {};
  try { data = JSON.parse($('#page-data').textContent); } catch (e) { data = {}; }
  var slug = data.slug || 'home';

  // ---------------------------------------------------------------- storage (ປອດໄພເມື່ອ browser ປິດ storage)
  function load(key, fallback) {
    try {
      var v = localStorage.getItem(P + key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(P + key, JSON.stringify(value)); } catch (e) { /* ບໍ່ເປັນຫຍັງ */ }
  }
  function saveRaw(key, value) {
    try { localStorage.setItem(P + key, value); } catch (e) { /* ບໍ່ເປັນຫຍັງ */ }
  }

  var readState = load('read', {});
  var gradeState = load('grade', {});

  function isRead(page, id) { return !!readState[page + '/' + id]; }

  // ---------------------------------------------------------------- toast
  var toastTimer;
  function toast(msg) {
    var old = $('.toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 1800);
  }

  // ---------------------------------------------------------------- theme
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  $$('.theme-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      saveRaw('theme', next);
    });
  });

  // ---------------------------------------------------------------- reading progress bar + back to top
  var bar = $('.progress span');
  var topBtn = $('.fab-top');
  var fabState = { toc: false, codeTab: false };
  function updateFab() {
    var fab = $('.toc-open');
    if (fab) fab.hidden = !fabState.toc || fabState.codeTab || window.scrollY < 320;
  }
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
    if (bar) bar.style.width = p + '%';
    if (topBtn) topBtn.hidden = window.scrollY < 900;
    updateFab();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ---------------------------------------------------------------- copy buttons
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var code = btn.closest('.codeblock').querySelector('pre code');
    var text = code ? code.textContent : '';
    var done = function () {
      btn.textContent = 'ສຳເນົາແລ້ວ ✓';
      btn.classList.add('done');
      setTimeout(function () { btn.textContent = 'ສຳເນົາ'; btn.classList.remove('done'); }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  });
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove();
  }

  // ---------------------------------------------------------------- collapsible sections
  function setCollapsed(sec, collapsed) {
    sec.classList.toggle('collapsed', collapsed);
    var t = $('.sec-toggle', sec);
    if (t) t.setAttribute('aria-expanded', String(!collapsed));
  }
  $$('.sec-toggle').forEach(function (t) {
    t.addEventListener('click', function () {
      var sec = t.closest('.sec');
      setCollapsed(sec, !sec.classList.contains('collapsed'));
    });
  });

  // ---------------------------------------------------------------- quiz mode
  function setQuiz(on) {
    root.classList.toggle('quiz', on);
    saveRaw('quiz', on ? '1' : '0');
    $$('.mode-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String((b.dataset.mode === 'quiz') === on));
    });
  }
  setQuiz(root.classList.contains('quiz'));
  $$('.mode-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.dataset.mode === 'quiz';
      if (on === root.classList.contains('quiz')) return;
      setQuiz(on);
      $$('.answer.revealed').forEach(function (a) { a.classList.remove('revealed'); });
      $$('.is-q.revealed').forEach(function (s) { s.classList.remove('revealed'); });
      toast(on ? 'ເປີດໂໝດຝຶກຕອບ — ຄຳຕອບຖືກເຊື່ອງໄວ້' : 'ໂໝດອ່ານ — ສະແດງຄຳຕອບທັງໝົດ');
    });
  });
  function revealAnswer(a) {
    if (!root.classList.contains('quiz')) return;
    a.classList.add('revealed');
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.answer');
    if (a && root.classList.contains('quiz') && !a.classList.contains('revealed')) {
      e.preventDefault();
      revealAnswer(a);
    }
    var r = e.target.closest('.reveal-btn');
    if (r) {
      var sec = r.closest('.is-q');
      sec.classList.add('revealed');
      var head = $('.sec-head', sec);
      if (head && head.getBoundingClientRect().top < 0) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('answer')) {
      e.preventDefault();
      revealAnswer(e.target);
    }
  });

  // ---------------------------------------------------------------- self grading (ໜ້າຂໍ້ສອບ)
  function gk(id) { return slug === 'exam' ? id : slug + '/' + id; }
  function renderGrades() {
    var ok = 0;
    var again = 0;
    $$('.sec.is-q').forEach(function (sec) {
      var g = gradeState[gk(sec.id)];
      if (g) sec.setAttribute('data-grade', g); else sec.removeAttribute('data-grade');
      $$('.grade-btn', sec).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.grade === g)); });
      if (g === 'ok') ok++;
      if (g === 'again') again++;
    });
    var so = $('.score-ok');
    var sa = $('.score-again');
    if (so) so.textContent = ok;
    if (sa) sa.textContent = again;
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.grade-btn');
    if (!b) return;
    var sec = b.closest('.sec');
    var k = gk(sec.id);
    gradeState[k] = gradeState[k] === b.dataset.grade ? undefined : b.dataset.grade;
    if (!gradeState[k]) delete gradeState[k];
    save('grade', gradeState);
    renderGrades();
    if (gradeState[k] === 'ok') markRead(sec.id, true);
  });
  var resetBtn = $('.score-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (!window.confirm('ລ້າງຄະແນນການຝຶກຕອບທັງໝົດ?')) return;
      $$('.sec.is-q').forEach(function (q) { delete gradeState[gk(q.id)]; });
      save('grade', gradeState);
      $$('.is-q.revealed').forEach(function (s) { s.classList.remove('revealed'); });
      renderGrades();
    });
  }
  renderGrades();

  // ---------------------------------------------------------------- read tracking
  function markRead(id, value) {
    var key = slug + '/' + id;
    if (value) readState[key] = 1; else delete readState[key];
    save('read', readState);
    renderRead();
  }
  function renderRead() {
    var total = (data.sections || []).length;
    var n = 0;
    (data.sections || []).forEach(function (id) { if (isRead(slug, id)) n++; });
    $$('.read-btn').forEach(function (b) {
      var on = isRead(slug, b.dataset.read);
      b.setAttribute('aria-pressed', String(on));
      $('span', b).textContent = on ? 'ອ່ານແລ້ວ' : 'ໝາຍວ່າອ່ານແລ້ວ';
    });
    var rc = $('.read-count');
    if (rc) rc.textContent = 'ອ່ານແລ້ວ ' + n + '/' + total;
    $$('.toc-list a[data-id]').forEach(function (a) { a.classList.toggle('done', isRead(slug, a.dataset.id)); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.read-btn');
    if (!b) return;
    var on = !isRead(slug, b.dataset.read);
    markRead(b.dataset.read, on);
    if (on) toast('ບັນທຶກແລ້ວ ✓');
  });

  // ---------------------------------------------------------------- home progress
  if (slug === 'home' && data.manifest) {
    var all = 0;
    var done = 0;
    Object.keys(data.manifest).forEach(function (p) {
      var ids = data.manifest[p];
      var n = ids.filter(function (id) { return isRead(p, id); }).length;
      all += ids.length;
      done += n;
      var card = $('.card[data-slug="' + p + '"]');
      if (card) {
        $('.bar > span', card).style.width = (ids.length ? (n / ids.length) * 100 : 0) + '%';
        $('.card-count', card).textContent = n + '/' + ids.length;
      }
    });
    var pct = all ? Math.round((done / all) * 100) : 0;
    var op = $('.overall-pct');
    if (op) op.textContent = pct + '%';
    var ob = $('.overall .bar > span');
    if (ob) ob.style.width = pct + '%';
  }

  // ---------------------------------------------------------------- sheet (bottom sheet / side panel)
  var sheet = $('#sheet');
  var lastFocus = null;
  function openSheet(title, bodyNode, footNode) {
    if (!sheet) return;
    lastFocus = document.activeElement;
    $('#sheet-title').textContent = title;
    var body = $('.sheet-body', sheet);
    var foot = $('.sheet-foot', sheet);
    body.innerHTML = '';
    foot.innerHTML = '';
    body.appendChild(bodyNode);
    if (footNode) foot.appendChild(footNode);
    sheet.hidden = false;
    body.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    var close = $('.sheet-head [data-close]', sheet);
    if (close) close.focus({ preventScroll: true });
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  if (sheet) {
    sheet.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeSheet(); });
    // ລາກລົງເພື່ອປິດ (ມືຖື)
    var startY = null;
    var panel = $('.sheet-panel', sheet);
    $('.sheet-head', sheet).addEventListener('touchstart', function (e) { startY = e.touches[0].clientY; }, { passive: true });
    $('.sheet-head', sheet).addEventListener('touchmove', function (e) {
      if (startY === null) return;
      var dy = Math.max(0, e.touches[0].clientY - startY);
      panel.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    $('.sheet-head', sheet).addEventListener('touchend', function (e) {
      var dy = startY === null ? 0 : e.changedTouches[0].clientY - startY;
      panel.style.transform = '';
      startY = null;
      if (dy > 90) closeSheet();
    });
  }

  // ---------------------------------------------------------------- tabs (ໜ້າ Login / PanelProduct)
  function showTab(name, opts) {
    var tabs = $$('.tab');
    if (!tabs.length) return;
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.tab === name)); });
    $$('.tab-panel').forEach(function (p) { p.hidden = p.dataset.panel !== name; });
    if (!(opts && opts.keepHash)) {
      try { history.replaceState(null, '', name === 'code' ? '#code' : location.pathname); } catch (e) { /* ignore */ }
    }
    fabState.codeTab = name === 'code';
    updateFab();
    var tabsEl = $('.tabs');
    if (tabsEl && !(opts && opts.noScroll) && tabsEl.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: window.scrollY + tabsEl.getBoundingClientRect().top - 56, behavior: 'auto' });
    }
  }
  $$('.tab').forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.dataset.tab); });
  });

  // ---------------------------------------------------------------- go to heading
  function revealTarget(el) {
    var sec = el.closest('.sec');
    if (sec && sec.classList.contains('collapsed')) setCollapsed(sec, false);
    if (sec && sec.classList.contains('is-q')) sec.classList.add('revealed');
    var panel = el.closest('.tab-panel');
    if (panel && panel.hidden) showTab(panel.dataset.panel, { keepHash: true, noScroll: true });
  }
  function goTo(id, smooth) {
    var el = document.getElementById(id);
    if (!el) return;
    revealTarget(el);
    requestAnimationFrame(function () {
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      if (el.classList.contains('sub') || el.classList.contains('ai-tool')) {
        el.classList.remove('flash');
        void el.offsetWidth;
        el.classList.add('flash');
      }
    });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    if (id === 'main' || id === 'code') return;
    if (!document.getElementById(id)) return;
    e.preventDefault();
    closeSheet();
    try { history.replaceState(null, '', '#' + id); } catch (err) { /* ignore */ }
    goTo(id, true);
  });

  // ---------------------------------------------------------------- code viewer: ແຕະແຖວ → ຄຳອະທິບາຍ
  function sectionFragment(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    var frag = document.createElement('div');
    if (el.classList.contains('sec')) {
      var body = $('.sec-body', el);
      if (body) frag.appendChild(body.cloneNode(true));
      return { title: $('.sec-title', el).textContent.trim(), node: frag };
    }
    var level = parseInt(el.tagName.slice(1), 10);
    var n = el.nextElementSibling;
    while (n) {
      if (/^H[1-6]$/.test(n.tagName) && parseInt(n.tagName.slice(1), 10) <= level) break;
      frag.appendChild(n.cloneNode(true));
      n = n.nextElementSibling;
    }
    var clean = function (h) {
      var c = h.cloneNode(true);
      $$('.anchor', c).forEach(function (x) { x.remove(); });
      return c.textContent.trim();
    };
    var prefixText = '';
    if (level === 4) {
      var p = el.previousElementSibling;
      while (p && p.tagName !== 'H3') p = p.previousElementSibling;
      if (p) prefixText = clean(p);
    }
    if (!prefixText) {
      var parent = el.closest('.sec');
      if (parent) prefixText = $('.sec-title', parent).textContent.trim();
    }
    return { title: (prefixText ? prefixText + ' › ' : '') + clean(el), node: frag };
  }

  var viewers = $$('.viewer');
  if (viewers.length) {
    var wrapBtn = $('.wrap-btn');
    var wrapOn = load('wrap', true);
    var applyWrap = function () {
      viewers.forEach(function (v) { v.classList.toggle('wrap', wrapOn); });
      if (wrapBtn) wrapBtn.setAttribute('aria-pressed', String(wrapOn));
    };
    applyWrap();
    if (wrapBtn) wrapBtn.addEventListener('click', function () { wrapOn = !wrapOn; save('wrap', wrapOn); applyWrap(); });

    var openLine = function (ln) {
      var r = ln.dataset.r;
      var id = ln.dataset.sec;
      $$('.ln.hl').forEach(function (l) { l.classList.remove('hl'); });
      var group = $$('.ln[data-r="' + r + '"]', ln.closest('.viewer'));
      group.forEach(function (l) { l.classList.add('hl'); });
      var nums = group.map(function (l) { return parseInt(l.dataset.l, 10); });
      var info = sectionFragment(id);
      if (!info) return;
      var body = document.createElement('div');
      var lines = document.createElement('p');
      lines.className = 'sheet-lines';
      lines.textContent = 'ແຖວ ' + Math.min.apply(null, nums) + '–' + Math.max.apply(null, nums) + ' (ແຕະແຖວທີ່ເລືອກ ' + ln.dataset.l + ')';
      body.appendChild(lines);
      body.appendChild(info.node);
      var foot = document.createElement('div');
      foot.style.display = 'contents';
      var go = document.createElement('button');
      go.type = 'button';
      go.className = 'btn';
      go.textContent = 'ເປີດໃນໜ້າຄຳອະທິບາຍ';
      go.addEventListener('click', function () {
        closeSheet();
        showTab('explain', { keepHash: true, noScroll: true });
        try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ }
        goTo(id, false);
      });
      var ok = document.createElement('button');
      ok.type = 'button';
      ok.className = 'btn btn-primary';
      ok.textContent = 'ເຂົ້າໃຈແລ້ວ';
      ok.addEventListener('click', closeSheet);
      foot.appendChild(go);
      foot.appendChild(ok);
      // ໄຮໄລທ໌ຍັງຢູ່ຫຼັງປິດ sheet ຈົນກວ່າຈະແຕະແຖວໃໝ່
      openSheet(info.title, body, foot);
    };
    viewers.forEach(function (viewer) {
      viewer.addEventListener('click', function (e) {
        var ln = e.target.closest('.ln.has');
        if (!ln) return;
        if (window.getSelection && String(window.getSelection()).length > 0) return;
        openLine(ln);
      });
      viewer.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('has')) {
          e.preventDefault();
          openLine(e.target);
        }
      });
    });

    // ເລືອກໄຟລ໌ (ໂປຣເຈັກທີ່ມີຫຼາຍໄຟລ໌) — ຈື່ໄຟລ໌ລ່າສຸດໄວ້ຕໍ່ໜ້າ
    var cfBtns = $$('.cf-btn');
    var showFile = function (i, scroll) {
      cfBtns.forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.file === String(i))); });
      $$('.code-pane').forEach(function (p) { p.hidden = p.dataset.file !== String(i); });
      var on = $('.cf-btn[aria-selected="true"]');
      var bar = $('.code-files');
      if (on && bar) bar.scrollLeft = Math.max(0, on.offsetLeft - bar.clientWidth / 2 + on.offsetWidth / 2);
      if (scroll && bar && bar.getBoundingClientRect().top < 0) bar.scrollIntoView({ block: 'start' });
    };
    if (cfBtns.length) {
      var lastFile = load('cfile:' + slug, 0);
      if (!$('.code-pane[data-file="' + lastFile + '"]')) lastFile = 0;
      showFile(lastFile, false);
      cfBtns.forEach(function (b) {
        b.addEventListener('click', function () { save('cfile:' + slug, Number(b.dataset.file)); showFile(b.dataset.file, true); });
      });
    }
  }

  // ---------------------------------------------------------------- Illustrator: ແຕະໝາຍເລກເທິງໜ້າຈໍຈຳລອງ
  $$('.hs-fig').forEach(function (fig) {
    function activate(k, fromSvg) {
      fig.classList.add('has-active');
      $$('.hs', fig).forEach(function (g) { g.classList.toggle('active', g.getAttribute('data-hs') === k); });
      $$('.hs-item', fig).forEach(function (li) {
        var on = li.getAttribute('data-hs') === k;
        li.classList.toggle('active', on);
        if (on && fromSvg) li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      if (!fromSvg) {
        var wrap = $('.ws-wrap', fig);
        var r = wrap.getBoundingClientRect();
        if (r.top < 60 || r.bottom > window.innerHeight) wrap.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    function handle(e) {
      var t = e.target.closest('[data-hs]');
      if (!t) return;
      activate(t.getAttribute('data-hs'), !!e.target.closest('.hs'));
    }
    fig.addEventListener('click', handle);
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handle(e); }
    });
  });

  // ---------------------------------------------------------------- Illustrator: Toolbar ຈຳລອງ
  $$('.ai-explorer').forEach(function (ex) {
    var detail = $('.ai-detail', ex);
    ex.addEventListener('click', function (e) {
      var b = e.target.closest('.ai-tbtn');
      if (!b) return;
      if (b.dataset.goto) {
        try { history.replaceState(null, '', '#' + b.dataset.goto); } catch (err) { /* ignore */ }
        goTo(b.dataset.goto, true);
        return;
      }
      var id = b.dataset.tool;
      var src = document.getElementById('tool-' + id);
      if (!src) return;
      $$('.ai-tbtn', ex).forEach(function (x) { x.classList.toggle('on', x === b); });
      var card = src.cloneNode(true);
      card.removeAttribute('id');
      detail.innerHTML = '';
      detail.appendChild(card);
      var more = document.createElement('a');
      more.href = '#tool-' + id;
      more.className = 'ai-more';
      more.textContent = 'ເບິ່ງໃນລາຍການກຸ່ມ ↓';
      detail.appendChild(more);
    });
  });

  // ---------------------------------------------------------------- Illustrator: ສັບລຳດັບບັດຝຶກຕອບ
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.qz-shuffle');
    if (!b) return;
    var grid = b.closest('.qz-tools').querySelector('.qz-grid');
    var cards = Array.prototype.slice.call(grid.children);
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
    }
    cards.forEach(function (c, n) {
      grid.appendChild(c);
      var no = $('.qz-no', c);
      if (no) no.textContent = n + 1;
      var a = $('.answer', c);
      if (a) a.classList.remove('revealed');
    });
    toast('ສັບລຳດັບແລ້ວ');
  });

  // ---------------------------------------------------------------- ຂໍ້ສອບລອງທຳ (Illustrator, Flutter)
  if ($('.mq-list')) {
    var LETTERS = ['ກ', 'ຂ', 'ຄ', 'ງ'];
    var examEl = $('[data-exam]');
    var examKey = (examEl && examEl.dataset.exam) || 'aimock';
    var mx = load(examKey, { a: {}, w: {}, g: {} });
    mx.a = mx.a || {}; mx.w = mx.w || {}; mx.g = mx.g || {};
    var saveMx = function () { save(examKey, mx); };
    var shuffleArr = function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
      return arr;
    };
    var shuffleOpts = function (card) {
      var box = $('.mq-opts', card);
      shuffleArr($$('.mq-o', box)).forEach(function (b, pos) {
        box.appendChild(b);
        $('.mq-l', b).textContent = LETTERS[pos];
      });
    };
    var shuffleList = function (list) {
      shuffleArr($$('.mq', list)).forEach(function (c, n) {
        list.appendChild(c);
        $('.mq-n', c).textContent = n + 1;
      });
    };
    var cards = $$('.mq');
    var total = cards.length;

    var applyAnswer = function (card, i) {
      var btns = $$('.mq-o', card);
      var chosenBtn = null;
      var okBtn = null;
      btns.forEach(function (b) {
        b.disabled = true;
        if (b.dataset.i === String(i)) chosenBtn = b;
        if (b.dataset.ok === '1') okBtn = b;
      });
      btns.forEach(function (b) {
        b.classList.toggle('ok', b === okBtn);
        b.classList.toggle('bad', b === chosenBtn && b !== okBtn);
        b.setAttribute('aria-pressed', String(b === chosenBtn));
      });
      var right = chosenBtn && chosenBtn === okBtn;
      card.classList.add('answered');
      card.classList.toggle('is-right', !!right);
      card.classList.toggle('is-wrong', !right);
      var ex = $('.mq-ex', card);
      ex.hidden = false;
      $('.mq-res', ex).textContent = right
        ? '✅ ຖືກຕ້ອງ! '
        : '❌ ຍັງບໍ່ຖືກ — ຄຳຕອບທີ່ຖືກ: ' + $('.mq-t', okBtn).textContent + '. ';
    };
    var clearAnswer = function (card) {
      card.classList.remove('answered', 'is-right', 'is-wrong');
      $$('.mq-o', card).forEach(function (b) {
        b.disabled = false;
        b.classList.remove('ok', 'bad');
        b.removeAttribute('aria-pressed');
      });
      $('.mq-ex', card).hidden = true;
    };

    var updateScore = function () {
      var done = 0;
      var ok = 0;
      var wrong = [];
      cards.forEach(function (c) {
        if (!c.classList.contains('answered')) return;
        done++;
        if (c.classList.contains('is-right')) ok++;
        else wrong.push(c);
      });
      var pct = total ? Math.round((ok / total) * 100) : 0;
      $$('.mx-ok').forEach(function (el) { el.textContent = ok; });
      $$('.mx-done').forEach(function (el) { el.textContent = done; });
      $$('.mx-bad').forEach(function (el) { el.textContent = done - ok; });
      $$('.mx-pct').forEach(function (el) { el.textContent = pct + '%'; });
      $$('.mx-bar').forEach(function (el) { el.style.width = (done ? (ok / total) * 100 : 0) + '%'; });
      var pill = $('.mx-pill');
      if (pill) pill.textContent = '✔ ' + ok + ' · ✘ ' + (done - ok) + ' · ' + done + '/' + total;

      var gt = $('.mx-grade-t');
      var gd = $('.mx-grade-d');
      var gi = $('.mx-grade-ic');
      if (gt) {
        if (done < total) {
          gi.textContent = '📝';
          gt.textContent = 'ຕອບແລ້ວ ' + done + ' / ' + total + ' ຂໍ້';
          gd.textContent = 'ຕອບພາກ ກ ແລະ ຂ ໃຫ້ຄົບ ເພື່ອເບິ່ງຜົນລວມ · ຕອນນີ້ຖືກ ' + ok + ' ຂໍ້';
        } else {
          var lv = pct >= 90 ? ['🏆', 'ດີເລີດ'] : pct >= 75 ? ['👍', 'ດີ'] : pct >= 50 ? ['🙂', 'ຜ່ານ'] : ['📚', 'ຕ້ອງທົບທວນເພີ່ມ'];
          gi.textContent = lv[0];
          gt.textContent = lv[1] + ' — ' + ok + ' / ' + total + ' (' + pct + '%)';
          gd.textContent = wrong.length ? 'ທົບທວນຂໍ້ທີ່ຜິດຂ້າງລຸ່ມ ແລ້ວກົດ "ເລີ່ມໃໝ່" ທຳອີກຮອບ' : 'ຖືກທຸກຂໍ້! ລອງເລີ່ມໃໝ່ເພື່ອຢືນຢັນວ່າຈື່ໄດ້ແທ້';
        }
      }
      var wl = $('.mx-wrong-list');
      if (wl) {
        wl.innerHTML = '';
        if (wrong.length) {
          var h = document.createElement('p');
          h.className = 'mx-wl-h';
          h.textContent = 'ຂໍ້ທີ່ຕອບຜິດ (' + wrong.length + '):';
          wl.appendChild(h);
          var ul = document.createElement('ul');
          wrong.forEach(function (c) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + c.id;
            var part = c.dataset.q.charAt(0) === 'A' ? 'ກ' : 'ຂ';
            a.textContent = 'ພາກ ' + part + ' ຂໍ້ ' + $('.mq-n', c).textContent + ': ' + $('.mq-q', c).textContent.trim();
            li.appendChild(a);
            if (c.dataset.ref) {
              var r = document.createElement('a');
              r.href = c.dataset.ref.charAt(0) === '/' ? c.dataset.ref : '/illustrator/#' + c.dataset.ref;
              r.className = 'mx-ref';
              r.textContent = 'ບົດຮຽນ →';
              li.appendChild(r);
            }
            ul.appendChild(li);
          });
          wl.appendChild(ul);
        }
      }
      var ws = $('.mx-written-sum');
      if (ws) {
        var cnt = { ok: 0, part: 0, no: 0 };
        Object.keys(mx.g).forEach(function (k) { if (cnt[mx.g[k]] !== undefined) cnt[mx.g[k]]++; });
        var nW = $$('.wq').length;
        ws.textContent = 'ພາກ ຄ (ອັດຕະໄນ): ຕອບໄດ້ ' + cnt.ok + ' · ໄດ້ບາງສ່ວນ ' + cnt.part + ' · ຕອບບໍ່ໄດ້ ' + cnt.no + ' · ຍັງບໍ່ໄດ້ກວດ ' + (nW - cnt.ok - cnt.part - cnt.no) + ' ຈາກ ' + nW + ' ຂໍ້';
      }
    };

    // ສັບຕົວເລືອກທຸກຄັ້ງທີ່ເປີດໜ້າ ແລ້ວຄືນຄຳຕອບທີ່ບັນທຶກໄວ້
    cards.forEach(shuffleOpts);
    Object.keys(mx.a).forEach(function (id) {
      var c = document.getElementById('q-' + id);
      if (c) applyAnswer(c, mx.a[id]);
    });

    document.addEventListener('click', function (e) {
      var b = e.target.closest('.mq-o');
      if (!b || b.disabled) return;
      var card = b.closest('.mq');
      mx.a[card.dataset.q] = parseInt(b.dataset.i, 10);
      saveMx();
      applyAnswer(card, mx.a[card.dataset.q]);
      updateScore();
    });

    var resetBtn2 = $('.mx-reset');
    if (resetBtn2) resetBtn2.addEventListener('click', function () {
      if (Object.keys(mx.a).length && !window.confirm('ລ້າງຄຳຕອບພາກ ກ ແລະ ຂ ທັງໝົດ ແລ້ວສັບຂໍ້ໃໝ່?')) return;
      mx.a = {};
      saveMx();
      cards.forEach(clearAnswer);
      $$('.mq-list').forEach(shuffleList);
      cards.forEach(shuffleOpts);
      updateScore();
      var first = $('.mq-list');
      if (first) first.closest('.sec').scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast('ເລີ່ມໃໝ່ແລ້ວ — ສັບຂໍ້ ແລະ ຕົວເລືອກໃໝ່');
    });

    var wrongBtn = $('.mx-wrong');
    if (wrongBtn) wrongBtn.addEventListener('click', function () {
      var on = !document.body.classList.contains('mx-only-wrong');
      document.body.classList.toggle('mx-only-wrong', on);
      wrongBtn.setAttribute('aria-pressed', String(on));
      wrongBtn.textContent = on ? 'ສະແດງທຸກຂໍ້' : 'ສະແດງສະເພາະຂໍ້ທີ່ຜິດ';
      if (on && !$$('.mq.is-wrong').length) toast('ຍັງບໍ່ມີຂໍ້ທີ່ຕອບຜິດ');
    });

    // ອັດຕະໄນ: ບັນທຶກຄຳຕອບ, ເປີດຄຳຕອບຕົວຢ່າງ, ປະເມີນຕົນເອງ
    $$('.wq').forEach(function (w) {
      var n = w.dataset.w;
      var ta = $('.wq-in', w);
      if (mx.w[n]) ta.value = mx.w[n];
      var timer;
      ta.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { mx.w[n] = ta.value; saveMx(); }, 400);
      });
      var reveal = function () {
        $('.wq-ans', w).hidden = false;
        $('.wq-grade', w).hidden = false;
        $('.wq-show', w).hidden = true;
      };
      $('.wq-show', w).addEventListener('click', reveal);
      var paint = function () {
        $$('.wq-g', w).forEach(function (g) { g.setAttribute('aria-pressed', String(g.dataset.g === mx.g[n])); });
      };
      $$('.wq-g', w).forEach(function (g) {
        g.addEventListener('click', function () {
          mx.g[n] = mx.g[n] === g.dataset.g ? undefined : g.dataset.g;
          if (!mx.g[n]) delete mx.g[n];
          saveMx();
          paint();
          updateScore();
        });
      });
      if (mx.g[n]) { reveal(); paint(); }
    });

    // ປ້າຍຄະແນນລອຍ (ສະແດງເມື່ອເລື່ອນລົງ)
    var pill = document.createElement('div');
    pill.className = 'mx-pill';
    pill.setAttribute('aria-hidden', 'true');
    pill.hidden = true;
    document.body.appendChild(pill);
    window.addEventListener('scroll', function () { pill.hidden = window.scrollY < 500; }, { passive: true });
    updateScore();
  }

  // ---------------------------------------------------------------- table of contents
  function buildToc() {
    var toc = data.toc || [];
    var ul = document.createElement('ul');
    ul.className = 'toc-list';
    toc.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + item.id;
      a.dataset.id = item.id;
      var dot = document.createElement('span');
      dot.className = 'toc-dot';
      dot.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>';
      var t = document.createElement('span');
      t.textContent = item.t;
      a.appendChild(dot);
      a.appendChild(t);
      li.appendChild(a);
      if (item.subs && item.subs.length) {
        var sub = document.createElement('ul');
        sub.className = 'toc-sub';
        item.subs.forEach(function (s) {
          var sli = document.createElement('li');
          var sa = document.createElement('a');
          sa.href = '#' + s.id;
          sa.textContent = s.t;
          sli.appendChild(sa);
          sub.appendChild(sli);
        });
        li.appendChild(sub);
      }
      ul.appendChild(li);
    });
    return ul;
  }
  var tocBtn = $('.toc-open');
  if (data.toc && data.toc.length) {
    if (tocBtn) {
      fabState.toc = true;
      updateFab();
      tocBtn.addEventListener('click', function () {
        openSheet('ສາລະບານ', buildToc());
        renderRead();
        var cur = $('.toc-side a.on');
        if (cur) {
          var m = $('.sheet-body a[data-id="' + cur.dataset.id + '"]');
          if (m) { m.classList.add('on'); m.scrollIntoView({ block: 'center' }); }
        }
      });
    }
    var side = $('.toc-side');
    if (side) {
      var h = document.createElement('h2');
      h.textContent = 'ໃນໜ້ານີ້';
      side.appendChild(h);
      side.appendChild(buildToc());
      document.body.classList.add('has-side-toc');
    }
    // scrollspy
    if ('IntersectionObserver' in window) {
      var visible = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
        var firstId = null;
        (data.sections || []).some(function (id) { if (visible[id]) { firstId = id; return true; } return false; });
        if (!firstId) return;
        $$('.toc-side .toc-list > li > a').forEach(function (a) { a.classList.toggle('on', a.dataset.id === firstId); });
      }, { rootMargin: '-80px 0px -55% 0px' });
      $$('.sec[id]').forEach(function (s) { io.observe(s); });
    }
  }
  renderRead();

  // ---------------------------------------------------------------- search
  var searchEl = $('#search');
  var input = $('#search-input');
  var results = $('#search-results');
  var index = null;
  var pageNames = { summary: 'ສະຫຼຸບບົດທີ 1–6', login: 'Login.java', product: 'PanelProduct.java', illustrator: 'Illustrator', 'ai-exam': 'ຂໍ້ສອບລອງທຳ Illustrator', exam: 'ຂໍ້ສອບ 15 ຂໍ້' };

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (j) { index = j; return j; });
  }
  function openSearch() {
    if (!searchEl) return;
    searchEl.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderResults('');
    setTimeout(function () { input.focus(); }, 30);
    loadIndex().catch(function () { results.innerHTML = '<p class="sr-empty">ໂຫຼດຂໍ້ມູນຄົ້ນຫາບໍ່ໄດ້ — ກວດສອບອິນເຕີເນັດ</p>'; });
  }
  function closeSearch() {
    if (!searchEl || searchEl.hidden) return;
    searchEl.hidden = true;
    document.body.style.overflow = '';
  }
  function appendMarked(parent, text, q) {
    var lower = text.toLowerCase();
    var i = 0;
    var at;
    while (q && (at = lower.indexOf(q, i)) !== -1) {
      parent.appendChild(document.createTextNode(text.slice(i, at)));
      var m = document.createElement('mark');
      m.textContent = text.slice(at, at + q.length);
      parent.appendChild(m);
      i = at + q.length;
    }
    parent.appendChild(document.createTextNode(text.slice(i)));
  }
  function renderResults(raw) {
    var q = raw.trim().toLowerCase();
    results.innerHTML = '';
    if (!q) {
      var hint = document.createElement('p');
      hint.className = 'sr-empty';
      hint.textContent = 'ພິມຄຳທີ່ຕ້ອງການ ເຊັ່ນ JVM, try-catch, executeQuery, barcode_old';
      results.appendChild(hint);
      return;
    }
    if (!index) { loadIndex().then(function () { renderResults(input.value); }); return; }
    var hits = [];
    index.forEach(function (e) {
      var t = e.t.toLowerCase();
      var x = e.x.toLowerCase();
      var score = 0;
      if (t.indexOf(q) !== -1) score += 10;
      if (x.indexOf(q) !== -1) score += 1;
      if (score) hits.push({ e: e, s: score });
    });
    hits.sort(function (a, b) { return b.s - a.s; });
    hits = hits.slice(0, 40);
    if (!hits.length) {
      var none = document.createElement('p');
      none.className = 'sr-empty';
      none.textContent = 'ບໍ່ພົບ "' + raw.trim() + '"';
      results.appendChild(none);
      return;
    }
    var groups = {};
    var order = [];
    hits.forEach(function (h) {
      if (!groups[h.e.p]) { groups[h.e.p] = []; order.push(h.e.p); }
      groups[h.e.p].push(h.e);
    });
    order.forEach(function (p) {
      var g = document.createElement('div');
      g.className = 'sr-group';
      g.textContent = pageNames[p] || p;
      results.appendChild(g);
      groups[p].forEach(function (e) {
        var a = document.createElement('a');
        a.className = 'sr';
        a.href = e.u;
        var t = document.createElement('span');
        t.className = 'sr-t';
        appendMarked(t, e.t, q);
        a.appendChild(t);
        if (e.c) {
          var c = document.createElement('span');
          c.className = 'sr-c';
          c.textContent = e.c;
          a.appendChild(c);
        }
        var lower = e.x.toLowerCase();
        var at = lower.indexOf(q);
        if (e.x) {
          var start = Math.max(0, at - 50);
          var snip = (start > 0 ? '…' : '') + e.x.slice(start, start + 150) + (e.x.length > start + 150 ? '…' : '');
          var x = document.createElement('span');
          x.className = 'sr-x';
          appendMarked(x, snip, q);
          a.appendChild(x);
        }
        a.addEventListener('click', function (ev) {
          var url = new URL(e.u, location.origin);
          if (url.pathname === location.pathname) {
            ev.preventDefault();
            closeSearch();
            var id = url.hash.slice(1);
            try { history.replaceState(null, '', '#' + id); } catch (err) { /* ignore */ }
            goTo(id, true);
          }
        });
        results.appendChild(a);
      });
    });
  }
  $$('.search-open').forEach(function (b) { b.addEventListener('click', openSearch); });
  if (searchEl) {
    searchEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]') || e.target === searchEl) closeSearch();
    });
    var debounce;
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () { renderResults(input.value); }, 80);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = $('.sr', results);
        if (first) first.click();
      }
    });
  }

  // ---------------------------------------------------------------- keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeSheet(); }
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea') { e.preventDefault(); openSearch(); }
  });

  // ---------------------------------------------------------------- initial hash
  function handleHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    if (h === 'code') { showTab('code', { keepHash: true, noScroll: true }); return; }
    if (document.getElementById(h)) goTo(h, false);
  }
  handleHash();
  window.addEventListener('hashchange', handleHash);

  // ---------------------------------------------------------------- offline (service worker) + ສະຖານະ
  var off = data.offline;
  var swOk = 'serviceWorker' in navigator && !!window.caches &&
    (location.protocol === 'https:' || location.hostname === 'localhost');

  function setOfflineStatus(state, text) {
    $$('.oc-status').forEach(function (el) { el.textContent = text; });
    $$('.offline-card, .foot-offline').forEach(function (el) { el.setAttribute('data-state', state); });
  }

  var checkTries = 0;
  function checkOffline() {
    if (!off) return;
    if (!swOk) {
      setOfflineStatus('na', location.protocol === 'https:' || location.hostname === 'localhost'
        ? 'browser ນີ້ບໍ່ຮອງຮັບການໃຊ້ offline'
        : 'ໃຊ້ offline ໄດ້ສະເພາະເວັບທີ່ເປີດຜ່ານ https');
      return;
    }
    caches.open(off.cache).then(function (cache) {
      return Promise.all(off.urls.map(function (u) { return cache.match(u); }));
    }).then(function (res) {
      var n = res.filter(Boolean).length;
      var total = off.urls.length;
      if (n === total) {
        setOfflineStatus('ready', 'ພ້ອມໃຊ້ offline ✓ ເປີດໄດ້ແມ່ນບໍ່ມີເນັດ');
        return;
      }
      checkTries++;
      if (checkTries > 60) {
        setOfflineStatus('error', 'ດາວໂຫຼດບໍ່ຄົບ (' + n + '/' + total + ') — ເປີດເວັບໃໝ່ຕອນມີອິນເຕີເນັດ');
        return;
      }
      setOfflineStatus('loading', navigator.onLine === false
        ? 'ຍັງບໍ່ພ້ອມ — ເປີດເວັບຕອນມີເນັດ 1 ຄັ້ງ'
        : 'ກຳລັງເກັບໄວ້ໃນເຄື່ອງ… ' + n + '/' + total);
      setTimeout(checkOffline, 1000);
    }).catch(function () {
      setOfflineStatus('error', 'ກວດສອບບໍ່ໄດ້ — browser ອາດປິດການເກັບຂໍ້ມູນ (ເຊັ່ນ ໂໝດ Private)');
    });
  }

  if (swOk) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(checkOffline, function () {
        setOfflineStatus('error', 'ເປີດໃຊ້ offline ບໍ່ໄດ້ — browser ອາດປິດການເກັບຂໍ້ມູນ (ເຊັ່ນ ໂໝດ Private)');
      });
    });
  } else {
    checkOffline();
  }

  // ແຖບແຈ້ງເມື່ອບໍ່ມີອິນເຕີເນັດ
  var netBanner = $('.net-banner');
  function updateNet() {
    var isOff = navigator.onLine === false;
    if (netBanner) netBanner.hidden = !isOff;
    document.body.classList.toggle('is-offline', isOff);
  }
  window.addEventListener('online', function () { updateNet(); toast('ກັບມາອອນລາຍແລ້ວ'); });
  window.addEventListener('offline', updateNet);
  updateNet();

  // ---------------------------------------------------------------- ຕິດຕັ້ງເປັນແອັບ (Add to Home Screen)
  var installPrompt = null;
  var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function updateInstall() {
    $$('.install-btn').forEach(function (b) { b.hidden = standalone || !(installPrompt || isIOS); });
    $$('.install-done').forEach(function (el) { el.hidden = !standalone; });
  }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    installPrompt = e;
    updateInstall();
  });
  window.addEventListener('appinstalled', function () {
    installPrompt = null;
    updateInstall();
    toast('ຕິດຕັ້ງແລ້ວ ✓ ເປີດຈາກໄອຄອນໃນໜ້າຈໍໄດ້ເລີຍ');
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.install-btn')) return;
    if (installPrompt) {
      var p = installPrompt;
      installPrompt = null;
      p.prompt();
      // prompt() ໃຊ້ໄດ້ຄັ້ງດຽວ — ຖ້າຜູ້ໃຊ້ກົດຍົກເລີກ ປຸ່ມຈະກັບມາເມື່ອ browser ສົ່ງ event ໃໝ່
      if (p.userChoice) p.userChoice.then(updateInstall, updateInstall);
      else updateInstall();
    } else if (isIOS) {
      var tpl = $('#ios-guide');
      var node = document.createElement('div');
      if (tpl) node.appendChild(tpl.content.cloneNode(true));
      openSheet('ຕິດຕັ້ງໃສ່ໜ້າຈໍຫຼັກ', node);
    }
  });
  updateInstall();
})();
