// ເຄື່ອງມືສ້າງໜ້າຂໍ້ສອບລອງທຳ (ໃຊ້ຮ່ວມກັນ: Illustrator, Flutter)
// app.js ອ່ານ data-exam (key ບັນທຶກຄຳຕອບ) ແລະ data-ref (ລິ້ງກັບໄປບົດຮຽນ) ຈາກ HTML ທີ່ສ້າງຢູ່ນີ້

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ສັບລຳດັບແບບກຳນົດ seed — build ໃໝ່ໄດ້ HTML ຄືເກົ່າ (ຕົວເລືອກຖືກສັບອີກຄັ້ງໃນ browser)
function permute(n, seed) {
  const idx = [...Array(n).keys()];
  let s = (seed * 9301 + 49297) % 233280;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

/**
 * @param {object} cfg
 * @param {string} cfg.key     key ບັນທຶກຄຳຕອບໃນ localStorage (ຕ້ອງບໍ່ຊ້ຳກັນລະຫວ່າງໜ້າ)
 * @param {string} cfg.lesson  path ບົດຮຽນຫຼັກ ເຊັ່ນ '/flutter/student-app/' — ref ທີ່ບໍ່ຂຶ້ນຕົ້ນດ້ວຍ '/' ຈະຕໍ່ທ້າຍ path ນີ້
 */
export function makeExam({ key, lesson }) {
  let seed = 7;
  const refUrl = (ref) => (!ref ? '' : ref.startsWith('/') ? ref : `${lesson}#${ref}`);

  function card(id, num, qHtml, opts, a, explain, ref) {
    const letters = ['ກ', 'ຂ', 'ຄ', 'ງ'];
    const order = permute(opts.length, seed++);
    const url = refUrl(ref);
    return `<div class="mq" id="q-${id}" data-q="${id}" data-ref="${esc(url)}">
  <div class="mq-h"><span class="mq-n">${num}</span><div class="mq-q">${qHtml}</div></div>
  <div class="mq-opts" role="group">${order
    .map((i, pos) => `<button class="mq-o" type="button" data-i="${i}"${i === a ? ' data-ok="1"' : ''}><span class="mq-l">${letters[pos]}</span><span class="mq-t">${esc(opts[i])}</span></button>`)
    .join('')}</div>
  <div class="mq-ex" hidden><b class="mq-res"></b>${explain ? `<span>${esc(explain)}</span>` : ''}${url ? ` <a href="${esc(url)}">ອ່ານບົດຮຽນ →</a>` : ''}</div>
</div>`;
  }

  /** part = 'A' ຫຼື 'B' · qHtml(item) ຄືນ HTML ຂອງຄຳຖາມ */
  function list(items, part, qHtml = (m) => esc(m.q)) {
    return `<div class="mq-list" data-part="${part}">${items
      .map((m, i) => card(`${part}${i + 1}`, i + 1, qHtml(m), m.o, m.a, m.e, m.ref))
      .join('')}</div>`;
  }

  function written(items) {
    return `<div class="wq-list">${items
      .map(
        (w, i) => `<div class="wq" id="w-${i + 1}" data-w="${i + 1}">
  <div class="mq-h"><span class="mq-n">${i + 1}</span><div class="mq-q">${w.qHtml || esc(w.q)}</div></div>
  <textarea class="wq-in" rows="4" placeholder="ພິມຄຳຕອບຂອງເຈົ້າບ່ອນນີ້ (ບັນທຶກໄວ້ໃນເຄື່ອງອັດຕະໂນມັດ)" aria-label="ຄຳຕອບຂໍ້ ${i + 1}"></textarea>
  <div class="wq-actions"><button class="btn btn-sm wq-show" type="button">ເບິ່ງຄຳຕອບຕົວຢ່າງ</button><span class="wq-grade" hidden><button class="btn btn-sm wq-g" type="button" data-g="ok">✅ ຕອບໄດ້</button><button class="btn btn-sm wq-g" type="button" data-g="part">🟡 ໄດ້ບາງສ່ວນ</button><button class="btn btn-sm wq-g" type="button" data-g="no">❌ ຕອບບໍ່ໄດ້</button></span></div>
  <div class="wq-ans" hidden><b>ຄຳຕອບຕົວຢ່າງ (ຄວນມີຈຸດເຫຼົ່ານີ້):</b><ul>${w.a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>${w.aHtml || ''}${w.ref ? `<a href="${esc(refUrl(w.ref))}">ອ່ານບົດຮຽນ →</a>` : ''}</div>
</div>`,
      )
      .join('')}</div>`;
  }

  function score(total) {
    return `<div class="mx-panel" data-exam="${esc(key)}">
  <div class="mx-row"><span>ຄະແນນ (ພາກ ກ + ຂ)</span><b><span class="mx-ok">0</span> / ${total}</b></div>
  <div class="bar big"><span class="mx-bar"></span></div>
  <div class="mx-row small"><span>ຕອບແລ້ວ <span class="mx-done">0</span> / ${total} · ຜິດ <span class="mx-bad">0</span></span><span class="mx-pct">0%</span></div>
  <div class="mx-btns"><button class="btn btn-primary btn-sm mx-reset" type="button">🔀 ເລີ່ມໃໝ່ (ສັບຂໍ້)</button><button class="btn btn-sm mx-wrong" type="button" aria-pressed="false">ສະແດງສະເພາະຂໍ້ທີ່ຜິດ</button></div>
</div>`;
  }

  function result() {
    return `<div class="mx-result">
  <div class="mx-grade"><span class="mx-grade-ic">📝</span><div><b class="mx-grade-t">ຍັງບໍ່ໄດ້ເລີ່ມ</b><span class="mx-grade-d">ຕອບພາກ ກ ແລະ ຂ ໃຫ້ຄົບ ເພື່ອເບິ່ງຜົນ</span></div></div>
  <div class="mx-wrong-list"></div>
  <div class="mx-written-sum"></div>
</div>`;
  }

  return { list, written, score, result };
}
