// ສະຄຣິບ build ເວັບທົບທວນ Java
// ອ່ານ markdown ໃນ review/ → ສ້າງໜ້າ HTML ແບບ static ໄວ້ໃນ dist/
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import { codeMaps } from './src/code-map.mjs';

hljs.registerLanguage('java', java);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sql', sql);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'web', 'src');
const OUT = join(ROOT, 'dist');

const SITE_NAME = 'ທົບທວນ Java';
const STORE_PREFIX = 'ljr:v1:';

const pages = [
  {
    slug: 'summary',
    file: 'review/SUMMARY.md',
    nav: 'ສະຫຼຸບ',
    icon: 'book',
    title: 'ສະຫຼຸບບົດທີ 1–6',
    desc: 'ເນື້ອຫາຫຼັກທຸກບົດ, ຕາຕະລາງທີ່ມັກອອກສອບ, ຈຸດທີ່ສະໄລພິມຜິດ ແລະ ຄຳຖາມທົດສອບຕົນເອງ',
    quiz: true,
  },
  {
    slug: 'login',
    file: 'review/01_LOGIN_EXPLAINED.md',
    nav: 'Login',
    icon: 'lock',
    title: 'ອະທິບາຍ Login.java',
    desc: 'ສອນທີລະບັນທັດ ຕັ້ງແຕ່ main() ຈົນເຂົ້າສູ່ລະບົບສຳເລັດ — JDBC, PreparedStatement, BCrypt',
    quiz: true,
    code: 'login',
  },
  {
    slug: 'product',
    file: 'review/02_PANEL_PRODUCT_EXPLAINED.md',
    nav: 'ສິນຄ້າ',
    icon: 'box',
    title: 'ອະທິບາຍ PanelProduct.java',
    desc: 'CRUD ສິນຄ້າ: ເພີ່ມ, ສະແດງ/ຄົ້ນຫາ, ແກ້ໄຂ, ລຶບ — JOIN, barcode_old, error 1451',
    quiz: true,
    code: 'product',
  },
  {
    slug: 'exam',
    file: 'review/03_EXAM_QA.md',
    nav: 'ຂໍ້ສອບ',
    icon: 'quiz',
    title: 'ຄຳຖາມສອບເສັງ 15 ຂໍ້',
    desc: 'ຄຳຖາມທີ່ອາຈານໃຫ້ ພ້ອມຄຳຕອບ ແລະ ຕົວຢ່າງໂຄ້ດທີ່ທົດສອບແລ້ວ — ມີໂໝດຝຶກຕອບ',
    quiz: true,
  },
];

// ---------------------------------------------------------------- helpers

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const plain = (s) =>
  String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^\s*[#>]+\s*/gm, '')
    .replace(/\|/g, ' ')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const today = (() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
})();

// ---------------------------------------------------------------- icons

const icon = (name, cls = 'ic') => {
  const paths = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/><path d="M9 7h7M9 11h5"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.5"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    quiz: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/><path d="m9 12 2 2 4-4"/><path d="M9 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    read: '<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    wrap: '<path d="M3 6h18M3 12h15a3 3 0 0 1 0 6h-4"/><path d="m16 16-2 2 2 2"/><path d="M3 18h7"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  };
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

// ---------------------------------------------------------------- diagrams

const diagrams = {
  'login-flow': () => `
<figure class="diagram">
  <ol class="flow">
    <li><b>ເປີດໂປຣແກຣມ</b><span><code>main()</code> → <code>ThemeConfig.config()</code> ຕັ້ງທີມ FlatLaf</span></li>
    <li><b><code>new Login()</code></b><span>Constructor ຕົບແຕ່ງໜ້າຈໍ → <code>setVisible(true)</code></span></li>
    <li><b>ພິມ username + Enter</b><span>ເຄີເຊີໄປຊ່ອງ password (<code>requestFocus()</code>)</span></li>
    <li><b>ພິມ password + Enter</b><span>ເທົ່າກັບກົດປຸ່ມ "ເຂົ້າໃຊ້ງານ" (<code>doClick()</code>)</span></li>
    <li><b><code>btnLoginActionPerformed()</code></b><span>ກວດຂໍ້ມູນ ແລ້ວແຍກເປັນ 4 ທາງ:</span>
      <div class="branches">
        <div class="br warn"><b>ຊ່ອງຫວ່າງ</b><span>"ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"</span></div>
        <div class="br err"><b>ບໍ່ພົບ username</b><span>"ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"</span></div>
        <div class="br err"><b>ລະຫັດຜ່ານບໍ່ກົງ</b><span>"ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"</span></div>
        <div class="br ok"><b>ຖືກຕ້ອງ</b><span>ເປີດໜ້າ Main ແລ້ວປິດໜ້າ Login</span></div>
      </div>
    </li>
  </ol>
  <figcaption>ລຳດັບການເຮັດວຽກຂອງໜ້າ Login</figcaption>
</figure>`,

  db: () => {
    const tbl = (name, rows, main = false) => `
      <div class="tbl${main ? ' main' : ''}">
        <div class="tbl-h">${name}</div>
        <ul>${rows
          .map(([k, f]) => `<li>${k ? `<span class="key ${k.toLowerCase()}">${k}</span>` : '<span class="key none"></span>'}<code>${f}</code></li>`)
          .join('')}</ul>
      </div>`;
    return `
<figure class="diagram">
  <div class="db">
    ${tbl('brand', [['PK', 'brand_id'], ['', 'brand_name']])}
    <div class="rel rel-a"><span class="arr"></span><code>product.brand_id</code></div>
    ${tbl(
      'product',
      [
        ['PK', 'barcode'],
        ['', 'product_name'],
        ['', 'unit'],
        ['', 'quantity'],
        ['', 'quantity_min'],
        ['', 'cost_price'],
        ['', 'retail_price'],
        ['FK', 'brand_id'],
        ['FK', 'category_id'],
        ['', 'status'],
      ],
      true,
    )}
    <div class="rel rel-b"><span class="arr"></span><code>product.category_id</code></div>
    ${tbl('category', [['PK', 'category_id'], ['', 'category_name']])}
  </div>
  <figcaption><b>PK</b> = ລະຫັດຫຼັກ ຫ້າມຊ້ຳ · <b>FK</b> = ອ້າງອີງໄປຕາຕະລາງອື່ນ · ສິນຄ້າ 1 ລາຍການ ມີ 1 ຍີ່ຫໍ້ ແລະ 1 ປະເພດ</figcaption>
</figure>`;
  },

  'product-ui': () => {
    const fields = [
      ['ລະຫັດບາໂຄ້ດ', 'txtBarcode'],
      ['ລາຍການສິນຄ້າ', 'txtProduct_name'],
      ['ຫົວໜ່ວຍ', 'txtUnit'],
      ['ຈຳນວນ', 'txtQuantity'],
      ['ຈຳນວນຕ່ຳສຸດ', 'txtQuantity_min'],
      ['ລາຄາຕົ້ນທຶນ', 'txtCost_price'],
      ['ລາຄາຂາຍ', 'txtRetail_price'],
      ['ຍີ່ຫໍ້', 'txtBrand ▾'],
      ['ປະເພດ', 'txtCategory ▾'],
      ['ສະຖານະ', 'txtStatus ▾'],
    ];
    const cols = ['ບາໂຄ້ດ', 'ສິນຄ້າ', 'ຫົວໜ່ວຍ', 'ຈຳນວນ', 'ຕ່ຳສຸດ', 'ຕົ້ນທຶນ', 'ລາຄາຂາຍ', 'ຍີ່ຫໍ້', 'ປະເພດ', 'ສະຖານະ'];
    return `
<figure class="diagram">
  <div class="mock">
    <div class="mock-title">ຈັດການຂໍ້ມູນສິນຄ້າ <small>jPanel1</small></div>
    <div class="mock-form">${fields
      .map(([l, v]) => `<label><span>${l}</span><i>${v}</i></label>`)
      .join('')}</div>
    <div class="mock-btns">
      <span class="b add">ເພີ່ມ</span><span class="b edit">ແກ້ໄຂ</span><span class="b del">ລືບ</span><span class="b cancel">ຍົກເລີກ</span>
    </div>
    <div class="mock-search">${icon('search')} <i>txtSearch</i></div>
    <div class="mock-table"><div class="mt-cap">jTable1</div><div class="mt-row">${cols
      .map((c) => `<span>${c}</span>`)
      .join('')}</div><div class="mt-row empty">${cols.map(() => '<span></span>').join('')}</div></div>
  </div>
  <figcaption>ໜ້າຈໍຈັດການສິນຄ້າ ແລະ ຊື່ຕົວປ່ຽນຂອງແຕ່ລະຊ່ອງ</figcaption>
</figure>`;
  },

  'product-flow': () => {
    const card = (cls, title, steps) =>
      `<div class="pf ${cls}"><h4>${title}</h4><ol class="chips">${steps.map((s) => `<li>${s}</li>`).join('')}</ol></div>`;
    return `
<figure class="diagram">
  <div class="pflow">
    ${card('init', 'ເປີດໜ້າ → Constructor', ['<code>initComponents()</code>', 'ຕົບແຕ່ງຊ່ອງຄົ້ນຫາ, ຈັດຖັນກາງ', '<code>connectDB()</code>', '<code>brandList()</code>', '<code>categoryList()</code>', '<code>tableUpdate()</code>'])}
    ${card('add', 'ເພີ່ມ (Create)', ['ບໍ່ເລືອກແຖວ', 'ປ້ອນຄົບ', 'ບາໂຄ້ດບໍ່ຊ້ຳ', '<code>INSERT</code>', 'ລ້າງຟອມ + ໂຫຼດຕາຕະລາງ'])}
    ${card('edit', 'ແກ້ໄຂ (Update)', ['ຄລິກແຖວ (ຈື່ <code>barcode_old</code>)', 'ແກ້ຂໍ້ມູນ', 'ປ້ອນຄົບ', 'ບາໂຄ້ດບໍ່ຊ້ຳກັບສິນຄ້າອື່ນ', '<code>UPDATE … WHERE barcode = barcode_old</code>'])}
    ${card('del', 'ລຶບ (Delete)', ['ຄລິກແຖວ', 'ຢືນຢັນ OK', '<code>DELETE … WHERE barcode = barcode_old</code>', 'error 1451 = ຖືກໃຊ້ຢູ່'])}
    ${card('find', 'ຄົ້ນຫາ (Read)', ['ພິມໃນຊ່ອງຄົ້ນຫາ', "<code>SELECT … LIKE '%ຄຳ%'</code>", 'ໂຫຼດຕາຕະລາງໃໝ່'])}
  </div>
  <figcaption>ສະຫຼຸບການເຮັດວຽກທັງໝົດຂອງໜ້າສິນຄ້າ</figcaption>
</figure>`;
  },

  jdk: () => `
<figure class="diagram">
  <div class="nest n-jdk">
    <div class="nest-h"><b>JDK</b><span>javac, jar, javadoc, debugger …</span></div>
    <div class="nest n-jre">
      <div class="nest-h"><b>JRE</b><span>Library ມາດຕະຖານ (java.lang …)</span></div>
      <div class="nest n-jvm">
        <div class="nest-h"><b>JVM</b><span>ແປ bytecode ເປັນພາສາເຄື່ອງ ແລ້ວລັນ</span></div>
      </div>
    </div>
  </div>
  <ol class="chips pipeline">
    <li><code>Hello.java</code></li><li><code>javac</code></li><li><code>Hello.class</code> (bytecode)</li><li>JVM</li><li>ລັນໄດ້ທຸກ OS</li>
  </ol>
  <figcaption><b>JDK ⊃ JRE ⊃ JVM</b> — compile ຄັ້ງດຽວ ລັນໄດ້ທຸກ OS ທີ່ມີ JVM</figcaption>
</figure>`,
};

// ---------------------------------------------------------------- code blocks

function codeBlock(text, lang) {
  const valid = lang && hljs.getLanguage(lang);
  const body = valid ? hljs.highlight(text, { language: lang }).value : esc(text);
  return `<div class="codeblock"><div class="cb-head"><span class="cb-lang">${esc(lang || 'text')}</span><button class="copy-btn" type="button" aria-label="ສຳເນົາໂຄ້ດ">ສຳເນົາ</button></div><pre><code class="hljs">${body}</code></pre></div>`;
}

function exercisesHtml() {
  const list = [
    ['Exercise1.java', 'ຄຳນວນຄ່າຮຽນພິເສດ ຊົ່ວໂມງລະ 100,000 ກີບ', 'ປ້ອນຈຳນວນຊົ່ວໂມງສອນ: 12\nຄ່າຮຽນທີ່ຕ້ອງຈ່າຍ: 1,200,000 ກີບ'],
    [
      'Exercise2.java',
      'ຄິດໄລ່ເງິນໂບນັດຕາມຍອດຂາຍ (if-else-if)',
      'ປ້ອນຊື່ພະນັກງານ: ສົມໃຈ\nປ້ອນເງິນເດືອນ: 5000000\nປ້ອນຍອດຂາຍລວມ: 250000\nພະນັກງານ: ສົມໃຈ\nຍອດຂາຍ: 250,000 ກີບ\nອັດຕາໂບນັດ: 30% ຂອງເງິນເດືອນ\nເງິນໂບນັດທີ່ໄດ້: 1,500,000 ກີບ',
    ],
    ['Exercise3.java', 'ຜົນບວກເລກຄີກ 1 – 10 (for + if)', 'ຜົນບວກເລກຄີກ 1 - 10 = 25'],
  ];
  return `<div class="exercises">${list
    .map(([f, t, out], i) => {
      const src = readFileSync(join(ROOT, 'exercises', 'chapter5', f), 'utf8').replace(/\n$/, '');
      return `<details class="ex"><summary><span class="ex-n">${i + 1}</span><span>${esc(t)}</span>${icon('chevron', 'ic chev')}</summary>${codeBlock(src, 'java')}<div class="ex-out"><div class="ex-out-h">ຜົນລັນ (ທົດສອບແລ້ວ ✅)</div><pre>${esc(out)}</pre></div></details>`;
    })
    .join('')}</div>`;
}

// ---------------------------------------------------------------- markdown → sections

function makeMarked() {
  const m = new Marked({ gfm: true });
  m.use({
    renderer: {
      heading(t) {
        const inner = this.parser.parseInline(t.tokens);
        if (t.depth <= 2) return `<h${t.depth}>${inner}</h${t.depth}>`;
        return `<h${t.depth} id="${t._id}" class="sub">${inner}<a class="anchor" href="#${t._id}" aria-label="ລິ້ງຫົວຂໍ້ນີ້">#</a></h${t.depth}>`;
      },
      code(t) {
        const lang = (t.lang || '').trim().split(/\s+/)[0];
        if (lang.startsWith('diagram-')) {
          const fn = diagrams[lang.slice(8)];
          if (!fn) throw new Error(`ບໍ່ພົບ diagram: ${lang}`);
          return fn();
        }
        return codeBlock(t.text, lang);
      },
      table(t) {
        const hdr = t.header.map((c) => plain(c.text));
        const qa = /ຄຳຖາມ/.test(hdr[0] || '') && /ຄຳຕອບ/.test(hdr[1] || '');
        // ຕາຕະລາງທີ່ມີຫຼາຍຖັນ ແລະ ຂໍ້ຄວາມຍາວ → ສະແດງເປັນບັດ (card) ໃນມືຖື
        const cells = t.rows.flat();
        const avg = cells.length ? cells.reduce((s, c) => s + plain(c.text).length, 0) / cells.length : 0;
        const stack = qa || (t.header.length >= 3 && avg > 14);
        const align = (i) => (t.align[i] ? ` style="text-align:${t.align[i]}"` : '');
        const head = `<tr>${t.header.map((c, i) => `<th${align(i)}>${this.parser.parseInline(c.tokens)}</th>`).join('')}</tr>`;
        const rows = t.rows
          .map(
            (r) =>
              `<tr>${r
                .map((c, i) => {
                  const inner = this.parser.parseInline(c.tokens);
                  return `<td${align(i)} data-label="${esc(hdr[i] || '')}">${qa && i === 1 ? `<span class="answer" tabindex="0" role="button" aria-label="ແຕະເພື່ອເບິ່ງຄຳຕອບ">${inner}</span>` : inner}</td>`;
                })
                .join('')}</tr>`,
          )
          .join('');
        // ຖັນທຳອິດສັ້ນຫຼາຍ (ເຊັ່ນ ເລກບົດ) → ສະແດງຊື່ຖັນນຳໜ້າ ເຊັ່ນ "ບົດ 1"
        const firstAvg = t.rows.length ? t.rows.reduce((s, r) => s + plain(r[0]?.text || '').length, 0) / t.rows.length : 0;
        const cls = [qa ? 'qa' : '', stack ? 'stack' : '', stack && firstAvg <= 3 ? 'lbl-first' : ''].filter(Boolean).join(' ');
        return `<div class="table-wrap${stack ? ' stack-wrap' : ''}"><table${cls ? ` class="${cls}"` : ''}><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
      },
      link(t) {
        const text = this.parser.parseInline(t.tokens);
        const ext = /^https?:\/\//.test(t.href);
        return `<a href="${esc(t.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
      html(t) {
        if (t.text.includes('include:exercises')) return exercisesHtml();
        return '';
      },
    },
  });
  return m;
}

function assignIds(tokens) {
  const used = new Set();
  const ctx = { h2: 'top', h3: null };
  let seq = 0;
  const uniq = (id) => {
    let out = id;
    let n = 2;
    while (used.has(out)) out = `${id}-${n++}`;
    used.add(out);
    return out;
  };
  for (const t of tokens) {
    if (t.type !== 'heading' || t.depth < 2) continue;
    const txt = plain(t.text);
    let m;
    let id;
    if (t.depth === 2) {
      if ((m = txt.match(/^(\d+)\.\s/))) id = `sec-${m[1]}`;
      else if ((m = txt.match(/^ຂໍ້\s*(\d+)/))) id = `q-${m[1]}`;
      else if ((m = txt.match(/^ບົດທີ\s*(\d+)/))) id = `ch-${m[1]}`;
      else if (/ອ້າງອີງ/.test(txt)) id = 'refs';
      else id = `s-${++seq}`;
      id = uniq(id);
      ctx.h2 = id;
      ctx.h3 = null;
    } else if (t.depth === 3) {
      id = uniq((m = txt.match(/^(\d+)\.(\d+)\s/)) ? `sec-${m[1]}-${m[2]}` : `${ctx.h2}-${++seq}`);
      ctx.h3 = id;
    } else {
      const parent = ctx.h3 || ctx.h2;
      id = uniq((m = txt.match(/^ຂັ້ນທີ\s*(\d+)/)) ? `${parent}-step-${m[1]}` : `${parent}-${++seq}`);
    }
    t._id = id;
    t._plain = txt;
  }
}

function renderPage(page) {
  const md = readFileSync(join(ROOT, page.file), 'utf8');
  const marked = makeMarked();
  const tokens = marked.lexer(md).filter((t) => t.type !== 'hr');
  assignIds(tokens);

  const intro = [];
  const sections = [];
  let cur = null;
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth === 1) continue;
    if (t.type === 'heading' && t.depth === 2) {
      cur = { heading: t, body: [] };
      sections.push(cur);
    } else (cur ? cur.body : intro).push(t);
  }

  // ດັດຊະນີຄົ້ນຫາ: ທຸກ heading ລະດັບ 2–4 ພ້ອມເນື້ອຫາຈົນຮອດ heading ຖັດໄປ
  const search = [];
  let h2title = '';
  let entry = null;
  for (const t of tokens) {
    if (t.type === 'heading' && t.depth >= 2) {
      if (t.depth === 2) h2title = t._plain;
      entry = { p: page.slug, u: `/${page.slug}/#${t._id}`, t: t._plain, c: t.depth > 2 ? h2title : '', x: '' };
      search.push(entry);
    } else if (entry && t.type !== 'heading') {
      if (entry.x.length < 900) entry.x += ' ' + plain(t.raw || '');
    }
  }
  search.forEach((e) => (e.x = e.x.trim().slice(0, 900)));

  const headingIds = new Set(tokens.filter((t) => t.type === 'heading' && t._id).map((t) => t._id));
  const toc = [];

  const html = sections
    .map(({ heading, body }) => {
      const id = heading._id;
      const titleHtml = marked.parser([heading]).replace(/^<h2>|<\/h2>$/g, '');
      let bodyHtml = marked.parser(body);
      const isQ = page.slug === 'exam' && id.startsWith('q-');
      const isRefs = id === 'refs';
      const isIssues = (page.slug === 'login' || page.slug === 'product') && heading._plain.includes('⚠️');
      const collapsible = isRefs || isIssues;
      const isSelfTest = heading._plain.includes('ຄຳຖາມທົດສອບ');
      if (isSelfTest) {
        bodyHtml = bodyHtml.replace(/ — <strong>(.*?)<\/strong>(\s*)<\/li>/g, ' — <span class="answer" tabindex="0" role="button" aria-label="ແຕະເພື່ອເບິ່ງຄຳຕອບ"><strong>$1</strong></span>$2</li>');
      }
      const subs = body
        .filter((t) => t.type === 'heading' && t.depth === 3)
        .map((t) => ({ id: t._id, t: t._plain }));
      toc.push({ id, t: heading._plain, subs });

      const cls = ['sec'];
      if (isQ) cls.push('is-q');
      if (collapsible) cls.push('collapsible', 'collapsed');
      if (isIssues) cls.push('is-issues');
      if (isRefs) cls.push('is-refs');

      const headInner = collapsible
        ? `<button class="sec-toggle" type="button" aria-expanded="false" aria-controls="${id}-body"><h2 class="sec-title">${titleHtml}</h2>${icon('chevron', 'ic chev')}</button>`
        : `<h2 class="sec-title"><a href="#${id}">${titleHtml}</a></h2>`;

      const quizTop = isQ
        ? `<div class="q-cover"><p>ລອງຕອບໃນໃຈ ຫຼື ຂຽນໃສ່ເຈ້ຍກ່ອນ ແລ້ວຈຶ່ງເປີດເບິ່ງ</p><button class="btn btn-primary reveal-btn" type="button">ສະແດງຄຳຕອບ</button></div>`
        : '';
      const grade = isQ
        ? `<div class="grade" role="group" aria-label="ປະເມີນຕົນເອງ"><span>ຕອບໄດ້ບໍ?</span><button class="btn grade-btn" type="button" data-grade="ok">${icon('check')} ຈື່ໄດ້</button><button class="btn grade-btn" type="button" data-grade="again">ທວນອີກ</button></div>`
        : '';

      return `<section class="${cls.join(' ')}" id="${id}" data-sec="${id}">
  <header class="sec-head">${headInner}</header>
  ${quizTop}
  <div class="sec-body" id="${id}-body">${bodyHtml}</div>
  <footer class="sec-foot">${grade}<button class="read-btn" type="button" data-read="${id}" aria-pressed="false">${icon('check')}<span>ໝາຍວ່າອ່ານແລ້ວ</span></button></footer>
</section>`;
    })
    .join('\n');

  const introHtml = marked.parser(intro);
  return { html, introHtml, toc, search, headingIds, sectionIds: sections.map((s) => s.heading._id) };
}

// ---------------------------------------------------------------- code viewer

function splitHighlighted(html) {
  const lines = [];
  const stack = [];
  let cur = '';
  const re = /(<span[^>]*>)|(<\/span>)|(\n)|([^<\n]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) {
      stack.push(m[1]);
      cur += m[1];
    } else if (m[2]) {
      stack.pop();
      cur += m[2];
    } else if (m[3]) {
      cur += '</span>'.repeat(stack.length);
      lines.push(cur);
      cur = stack.join('');
    } else cur += m[4];
  }
  lines.push(cur + '</span>'.repeat(stack.length));
  return lines;
}

function buildCodeViewer(key, headingIds) {
  const { file, ranges, folds } = codeMaps[key];
  const src = readFileSync(join(SRC, 'code', file), 'utf8').replace(/\n$/, '');
  const lines = splitHighlighted(hljs.highlight(src, { language: 'java' }).value);
  for (const [, , id] of ranges) {
    if (!headingIds.has(id)) throw new Error(`code-map ${key}: ບໍ່ພົບຫົວຂໍ້ id "${id}"`);
  }
  const rangeOf = (n) => {
    let best = -1;
    ranges.forEach((r, i) => {
      if (n >= r[0] && n <= r[1] && (best < 0 || r[1] - r[0] < ranges[best][1] - ranges[best][0])) best = i;
    });
    return best;
  };
  const row = (html, n) => {
    const ri = rangeOf(n);
    const attrs = ri >= 0 ? ` data-r="${ri}" data-sec="${ranges[ri][2]}" tabindex="0" role="button"` : '';
    return `<div class="ln${ri >= 0 ? ' has' : ''}" data-l="${n}"${attrs}><span class="n">${n}</span><span class="c">${html || ' '}</span></div>`;
  };
  let out = '';
  let i = 0;
  while (i < lines.length) {
    const n = i + 1;
    const f = folds.find((x) => x[0] === n);
    if (f) {
      const chunk = [];
      for (let k = f[0]; k <= f[1]; k++) chunk.push(row(lines[k - 1], k));
      out += `<details class="fold"><summary><span class="fold-l">${f[0]}–${f[1]}</span><span>${esc(f[2])} · ${f[1] - f[0] + 1} ແຖວ</span><span class="fold-hint">ແຕະເພື່ອເປີດ</span></summary>${chunk.join('')}</details>`;
      i = f[1];
    } else {
      out += row(lines[i], n);
      i++;
    }
  }
  return `
<div class="code-intro">
  <p>ແຕະ <b>ແຖວໃດກໍໄດ້</b> ເພື່ອເບິ່ງຄຳອະທິບາຍຂອງແຖວນັ້ນ — ແຖວທີ່ຢູ່ໃນກຸ່ມດຽວກັນຈະຖືກໄຮໄລທ໌ພ້ອມກັນ</p>
  <div class="code-tools">
    <span class="code-file">${icon('code')} ${esc(file)} · ${lines.length} ແຖວ</span>
    <button class="btn btn-sm wrap-btn" type="button" aria-pressed="true">${icon('wrap')} ຕັດແຖວ</button>
  </div>
</div>
<div class="viewer wrap" data-code="${key}">${out}</div>`;
}

// ---------------------------------------------------------------- layout

function navItems(active) {
  const items = [{ slug: '', nav: 'ໜ້າຫຼັກ', icon: 'home' }, ...pages];
  return items
    .map((p) => {
      const href = p.slug ? `/${p.slug}/` : '/';
      const on = p.slug === active;
      return `<a class="nav-item${on ? ' on' : ''}" href="${href}"${on ? ' aria-current="page"' : ''}>${icon(p.icon)}<span>${p.nav}</span></a>`;
    })
    .join('');
}

function layout({ slug, title, desc, body, data = {}, buildId }) {
  const fullTitle = slug ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — ບົດທີ 1–6, ອະທິບາຍໂຄ້ດ ແລະ ຂໍ້ສອບ`;
  return `<!doctype html>
<html lang="lo">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#f6f7fb" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d1117" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/icon-192.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/noto-sans-lao-lao-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/app.css?v=${buildId}">
<script>(function(){try{var d=document.documentElement,t=localStorage.getItem('${STORE_PREFIX}theme');if(t)d.setAttribute('data-theme',t);if(localStorage.getItem('${STORE_PREFIX}quiz')==='1')d.classList.add('quiz');}catch(e){}})();</script>
</head>
<body data-page="${slug || 'home'}">
<a class="skip" href="#main">ຂ້າມໄປເນື້ອຫາ</a>
<div class="progress" aria-hidden="true"><span></span></div>
<header class="appbar">
  <a class="brand" href="/" aria-label="${SITE_NAME} ໜ້າຫຼັກ"><img src="/assets/icon.svg" alt="" width="28" height="28"><span>${SITE_NAME}</span></a>
  <div class="appbar-actions">
    <button class="icon-btn search-open" type="button" aria-label="ຄົ້ນຫາ">${icon('search')}</button>
    <button class="icon-btn theme-btn" type="button" aria-label="ປ່ຽນໂໝດມືດ / ແຈ້ງ">${icon('moon', 'ic i-moon')}${icon('sun', 'ic i-sun')}</button>
  </div>
</header>
<nav class="nav" aria-label="ເມນູຫຼັກ">${navItems(slug)}</nav>
<div class="shell">
<main id="main" class="main">
${body}
<footer class="foot">
  <p>ສ້າງຈາກເອກະສານປະກອບການສອນ ບົດທີ 1–6 ແລະ ໂຄ້ດໂປຣເຈັກຂາຍເຄື່ອງໜ້າຮ້ານ · ໂຄ້ດຕົວຢ່າງທົດສອບດ້ວຍ JDK 21</p>
  <p>ອັບເດດລ່າສຸດ ${today}</p>
</footer>
</main>
<aside class="toc-side" aria-label="ສາລະບານ"></aside>
</div>
<button class="fab toc-open" type="button" aria-label="ສາລະບານ" hidden>${icon('list')}<span>ສາລະບານ</span></button>
<button class="fab-top" type="button" aria-label="ກັບຂຶ້ນເທິງ" hidden>${icon('arrowUp')}</button>

<div class="sheet" id="sheet" hidden>
  <div class="sheet-backdrop" data-close></div>
  <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div class="sheet-grip" aria-hidden="true"></div>
    <div class="sheet-head"><h2 id="sheet-title"></h2><button class="icon-btn" type="button" data-close aria-label="ປິດ">${icon('close')}</button></div>
    <div class="sheet-body"></div>
    <div class="sheet-foot"></div>
  </div>
</div>

<div class="search" id="search" hidden role="dialog" aria-modal="true" aria-label="ຄົ້ນຫາ">
  <div class="search-bar">
    ${icon('search')}
    <input type="search" id="search-input" placeholder="ຄົ້ນຫາ ເຊັ່ນ JDBC, Constructor, 1451" autocomplete="off" enterkeyhint="search" aria-label="ຄຳຄົ້ນຫາ">
    <button class="btn btn-ghost" type="button" data-close>ປິດ</button>
  </div>
  <div class="search-results" id="search-results" aria-live="polite"></div>
</div>

<script id="page-data" type="application/json">${jsonForScript(data)}</script>
<script src="/assets/app.js?v=${buildId}" defer></script>
</body>
</html>
`;
}

function pageBody(page, r) {
  const modeBar = page.quiz
    ? `<div class="mode" role="group" aria-label="ໂໝດການອ່ານ">
  <button class="mode-btn" type="button" data-mode="read">${icon('read')} ອ່ານ</button>
  <button class="mode-btn" type="button" data-mode="quiz">${icon('pen')} ຝຶກຕອບ</button>
</div>
<p class="mode-hint">${
        page.slug === 'exam'
          ? 'ໂໝດ <b>ຝຶກຕອບ</b> ຈະເຊື່ອງຄຳຕອບ — ລອງຕອບເອງກ່ອນ ແລ້ວປະເມີນວ່າຈື່ໄດ້ ຫຼື ຕ້ອງທວນອີກ'
          : 'ໂໝດ <b>ຝຶກຕອບ</b> ຈະເຊື່ອງຄຳຕອບໃນຕາຕະລາງຄຳຖາມ — ແຕະເພື່ອເປີດເບິ່ງ'
      }</p>`
    : '';
  const score =
    page.slug === 'exam'
      ? `<div class="score" aria-live="polite"><span class="score-ok">0</span> ຈື່ໄດ້ · <span class="score-again">0</span> ທວນອີກ · ຈາກ ${r.sectionIds.filter((x) => x.startsWith('q-')).length} ຂໍ້ <button class="btn btn-sm btn-ghost score-reset" type="button">ລ້າງຄະແນນ</button></div>`
      : '';
  const hero = `
<div class="hero">
  <p class="hero-kicker">${icon(page.icon)} ${esc(page.nav)}</p>
  <h1>${esc(page.title)}</h1>
  <p class="hero-desc">${esc(page.desc)}</p>
  <div class="hero-meta"><span class="chip">${r.sectionIds.length} ຫົວຂໍ້</span><span class="chip read-count">ອ່ານແລ້ວ 0/${r.sectionIds.length}</span></div>
  ${r.introHtml ? `<div class="hero-intro">${r.introHtml}</div>` : ''}
  ${modeBar}
  ${score}
</div>`;
  if (page.code) {
    return `${hero}
<div class="tabs" role="tablist" aria-label="ມຸມມອງ">
  <button class="tab" role="tab" type="button" id="tab-explain" aria-controls="panel-explain" aria-selected="true" data-tab="explain">${icon('read')} ຄຳອະທິບາຍ</button>
  <button class="tab" role="tab" type="button" id="tab-code" aria-controls="panel-code" aria-selected="false" data-tab="code">${icon('code')} ໂຄ້ດເຕັມ · ແຕະແຖວ</button>
</div>
<div class="tab-panel" id="panel-explain" role="tabpanel" aria-labelledby="tab-explain" data-panel="explain">${r.html}</div>
<div class="tab-panel" id="panel-code" role="tabpanel" aria-labelledby="tab-code" data-panel="code" hidden>${buildCodeViewer(page.code, r.headingIds)}</div>`;
  }
  return `${hero}\n<div class="content">${r.html}</div>`;
}

function homeBody(results) {
  const cards = pages
    .map((p) => {
      const r = results[p.slug];
      return `<a class="card" href="/${p.slug}/" data-slug="${p.slug}">
  <span class="card-ic">${icon(p.icon)}</span>
  <span class="card-main">
    <span class="card-title">${esc(p.title)}</span>
    <span class="card-desc">${esc(p.desc)}</span>
    <span class="card-progress"><span class="bar"><span></span></span><span class="card-count">0/${r.sectionIds.length}</span></span>
  </span>
  ${icon('chevron', 'ic chev')}
</a>`;
    })
    .join('');
  return `
<div class="hero home-hero">
  <p class="hero-kicker">ກຽມສອບ Java</p>
  <h1>ທົບທວນ Java ໃຫ້ພ້ອມສອບ</h1>
  <p class="hero-desc">ສະຫຼຸບບົດທີ 1–6, ອະທິບາຍໂຄ້ດ Login ແລະ PanelProduct ທີລະບັນທັດ, ຄຳຖາມສອບເສັງ 15 ຂໍ້ ພ້ອມຄຳຕອບ</p>
  <button class="search-fake search-open" type="button">${icon('search')}<span>ຄົ້ນຫາທຸກຫົວຂໍ້ ເຊັ່ນ JDBC, Constructor…</span></button>
  <div class="overall">
    <div class="overall-top"><span>ຄວາມຄືບໜ້າທັງໝົດ</span><b class="overall-pct">0%</b></div>
    <div class="bar big"><span></span></div>
  </div>
</div>
<h2 class="block-title">ບົດຮຽນ</h2>
<div class="cards">${cards}</div>

<h2 class="block-title">ແຜນທົບທວນທີ່ແນະນຳ</h2>
<ol class="plan">
  <li><b>ອ່ານ ສະຫຼຸບບົດທີ 1–6</b><span>ໂດຍສະເພາະຕາຕະລາງ ແລະ ຈຸດທີ່ສະໄລພິມຜິດ</span></li>
  <li><b>ອ່ານ ຂໍ້ສອບ 15 ຂໍ້ ໃນໂໝດອ່ານ</b><span>ເຂົ້າໃຈຄຳຕອບ ແລະ ຕົວຢ່າງໂຄ້ດ</span></li>
  <li><b>ຮຽນ Login ແລ້ວ PanelProduct</b><span>ເປີດແຖບ "ໂຄ້ດເຕັມ" ແລ້ວແຕະທີລະແຖວ</span></li>
  <li><b>ຝຶກຕອບ ຂໍ້ສອບ 15 ຂໍ້</b><span>ເປີດໂໝດຝຶກຕອບ ແລ້ວທວນຂໍ້ທີ່ຍັງຈື່ບໍ່ໄດ້ຈົນຄົບ</span></li>
</ol>

<h2 class="block-title">ວິທີໃຊ້</h2>
<div class="tips">
  <div class="tip">${icon('pen')}<div><b>ໂໝດຝຶກຕອບ</b><span>ເຊື່ອງຄຳຕອບໄວ້ ແຕະເພື່ອເປີດ</span></div></div>
  <div class="tip">${icon('code')}<div><b>ແຕະແຖວໂຄ້ດ</b><span>ເບິ່ງຄຳອະທິບາຍຂອງແຖວນັ້ນທັນທີ</span></div></div>
  <div class="tip">${icon('check')}<div><b>ໝາຍວ່າອ່ານແລ້ວ</b><span>ບັນທຶກຄວາມຄືບໜ້າໃນເຄື່ອງນີ້</span></div></div>
  <div class="tip">${icon('search')}<div><b>ຄົ້ນຫາ</b><span>ຫາຄຳໃດກໍໄດ້ຈາກທຸກໜ້າ</span></div></div>
</div>
<p class="note">ໃຊ້ງານແບບ offline ໄດ້ ຫຼັງຈາກເປີດແຕ່ລະໜ້າ 1 ຄັ້ງ · ເພີ່ມໃສ່ໜ້າຈໍຫຼັກໄດ້ຈາກເມນູຂອງ browser</p>`;
}

// ---------------------------------------------------------------- fonts (self-host, ໃຊ້ offline ໄດ້)

const FONTS = [
  { pkg: 'noto-sans-lao', family: 'Noto Sans Lao', subset: 'lao', weights: [400, 600, 700], range: 'U+0E81-0EDF,U+200C-200D,U+25CC' },
  {
    pkg: 'noto-sans-lao',
    family: 'Noto Sans Lao',
    subset: 'latin',
    weights: [400, 600, 700],
    range: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  },
  { pkg: 'jetbrains-mono', family: 'JetBrains Mono', subset: 'latin', weights: [400, 600], range: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD' },
];

function copyFonts() {
  const files = [];
  let css = '';
  for (const f of FONTS) {
    for (const w of f.weights) {
      const name = `${f.pkg}-${f.subset}-${w}-normal.woff2`;
      const src = join(ROOT, 'node_modules', '@fontsource', f.pkg, 'files', name);
      mkdirSync(join(OUT, 'assets', 'fonts'), { recursive: true });
      copyFileSync(src, join(OUT, 'assets', 'fonts', name));
      files.push(`/assets/fonts/${name}`);
      css += `@font-face{font-family:'${f.family}';font-style:normal;font-display:swap;font-weight:${w};src:url(/assets/fonts/${name}) format('woff2');unicode-range:${f.range}}\n`;
    }
  }
  return { css, files };
}

// ---------------------------------------------------------------- build

function writeOut(rel, content) {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
}

function main() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  const results = {};
  const searchIndex = [];
  for (const p of pages) {
    results[p.slug] = renderPage(p);
    searchIndex.push(...results[p.slug].search);
  }

  const fonts = copyFonts();
  const css = `/* ຟອນ: Noto Sans Lao ແລະ JetBrains Mono (SIL Open Font License) */\n${fonts.css}\n${readFileSync(join(SRC, 'app.css'), 'utf8')}`;
  const js = readFileSync(join(SRC, 'app.js'), 'utf8');
  const hash = createHash('sha256');
  hash.update(css).update(js).update(JSON.stringify(searchIndex));
  for (const p of pages) hash.update(results[p.slug].html);
  hash.update(readFileSync(join(SRC, 'code', 'Login.java'))).update(readFileSync(join(SRC, 'code', 'PanelProduct.java')));
  const buildId = hash.digest('hex').slice(0, 10);

  const manifest = Object.fromEntries(pages.map((p) => [p.slug, results[p.slug].sectionIds]));

  writeOut(
    'index.html',
    layout({
      slug: '',
      title: SITE_NAME,
      desc: 'ເວັບທົບທວນ Java: ສະຫຼຸບບົດທີ 1–6, ອະທິບາຍໂຄ້ດ Login ແລະ PanelProduct ທີລະບັນທັດ, ຄຳຖາມສອບເສັງ 15 ຂໍ້ ພ້ອມຄຳຕອບ',
      body: homeBody(results),
      data: { slug: 'home', manifest },
      buildId,
    }),
  );

  for (const p of pages) {
    const r = results[p.slug];
    writeOut(
      `${p.slug}/index.html`,
      layout({
        slug: p.slug,
        title: p.title,
        desc: p.desc,
        body: pageBody(p, r),
        data: { slug: p.slug, toc: r.toc, sections: r.sectionIds, quiz: !!p.quiz, code: !!p.code },
        buildId,
      }),
    );
  }

  writeOut(
    '404.html',
    layout({
      slug: '404',
      title: 'ບໍ່ພົບໜ້ານີ້',
      desc: 'ບໍ່ພົບໜ້າທີ່ຕ້ອງການ',
      body: `<div class="hero"><h1>ບໍ່ພົບໜ້ານີ້</h1><p class="hero-desc">ລິ້ງອາດຜິດ ຫຼື ໜ້ານີ້ຖືກຍ້າຍແລ້ວ</p><p><a class="btn btn-primary" href="/">ກັບໜ້າຫຼັກ</a></p></div>`,
      data: { slug: '404' },
      buildId,
    }),
  );

  writeOut('assets/app.css', css);
  writeOut('assets/app.js', js.replace(/__STORE_PREFIX__/g, STORE_PREFIX));
  writeOut('search-index.json', JSON.stringify(searchIndex));
  for (const f of ['icon.svg', 'icon-192.png', 'icon-512.png']) {
    const src = join(SRC, 'assets', f);
    if (existsSync(src)) copyFileSync(src, join(OUT, 'assets', f));
  }

  writeOut(
    'manifest.webmanifest',
    JSON.stringify(
      {
        name: SITE_NAME,
        short_name: 'Java',
        lang: 'lo',
        start_url: '/',
        display: 'standalone',
        background_color: '#f6f7fb',
        theme_color: '#2f5bea',
        icons: [
          { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/assets/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      null,
      2,
    ),
  );

  const precache = ['/', ...pages.map((p) => `/${p.slug}/`), `/assets/app.css?v=${buildId}`, `/assets/app.js?v=${buildId}`, '/search-index.json', '/assets/icon.svg', ...fonts.files];
  writeOut('sw.js', readFileSync(join(SRC, 'sw.js'), 'utf8').replace('__BUILD_ID__', buildId).replace('__PRECACHE__', JSON.stringify(precache)));

  console.log(`✔ build ${buildId} → dist/ (${pages.length + 2} ໜ້າ, ${searchIndex.length} ລາຍການຄົ້ນຫາ)`);
}

main();
