// ຂໍ້ມູນ ແລະ ໜ້າຈໍຈຳລອງ Adobe Illustrator 2025 (Windows) ສຳລັບບົດຮຽນ
// ໄອຄອນທັງໝົດວາດໃໝ່ໃຫ້ຄ້າຍກັບໂປຣແກຣມຈິງ (ບໍ່ແມ່ນໄອຄອນຂອງ Adobe)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------- ໄອຄອນເຄື່ອງມື (24×24)

const P = {
  selection: '<path d="M6 2.5l12 9.2-5.6 1.1 3.2 6.6-2.5 1.2-3.1-6.7L6 18.3z" fill="currentColor" stroke="none"/>',
  direct: '<path d="M6 2.5l12 9.2-5.6 1.1 3.2 6.6-2.5 1.2-3.1-6.7L6 18.3z"/>',
  group: '<path d="M6 2.5l12 9.2-5.6 1.1 3.2 6.6-2.5 1.2-3.1-6.7L6 18.3z"/><path d="M17 17h5M19.5 14.5v5"/>',
  magicwand: '<path d="M3.5 20.5 14 10"/><path d="M16 2.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" fill="currentColor"/><path d="M20 11v2M19 12h2M10 3v2M9 4h2"/>',
  lasso: '<path d="M8.5 16.5C4 15.5 2.5 11 6 8s11-3.5 13 0-3 7.5-9 7"/><path d="M8.8 16c-1.5 1.2-1 3.6 1 4.4"/>',
  pen: '<path d="M12 21.5 7 12l5-9 5 9z"/><path d="M12 21.5V13.6"/><circle cx="12" cy="12.2" r="1.4"/>',
  addanchor: '<path d="M10 21.5 5 12l5-9 5 9z"/><path d="M18 3v6M15 6h6"/>',
  delanchor: '<path d="M10 21.5 5 12l5-9 5 9z"/><path d="M15 6h6"/>',
  anchorpoint: '<path d="M4 20 12 8l8 12"/><path d="M6 8h12" stroke-dasharray="2 2"/><rect x="10.5" y="6.5" width="3" height="3" fill="currentColor"/>',
  curvature: '<path d="M3 19c3-8 7-8 9-2s6 6 9-2"/><path d="M15 3.5 18.5 9 15 14l-3.5-5z"/>',
  type: '<path d="M5 5h14M12 5v14M9 19h6"/>',
  areatype: '<rect x="3" y="3" width="18" height="18" rx="1" stroke-dasharray="3 2"/><path d="M8 8h8M12 8v9"/>',
  typepath: '<path d="M3 18c4-9 10-9 18 0" stroke-dasharray="2 2"/><path d="M8 4h8M12 4v8"/>',
  verttype: '<path d="M6 4h12M12 4v6M7 14h10M12 14v6"/>',
  line: '<path d="M4.5 19.5 19.5 4.5"/>',
  arc: '<path d="M4 20C4 11 11 4 20 4"/>',
  rect: '<rect x="3.5" y="6" width="17" height="12"/>',
  roundrect: '<rect x="3.5" y="6" width="17" height="12" rx="4"/>',
  ellipse: '<ellipse cx="12" cy="12" rx="8.5" ry="7"/>',
  polygon: '<path d="M12 3.5l8.5 6.2-3.2 10H6.7L3.5 9.7z"/>',
  star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6.1L12 16.6l-5.4 3 1.2-6.1-4.5-4.2 6.1-.7z"/>',
  paintbrush: '<path d="M20.5 3.5 11 13"/><path d="M11 13c-2.2-1-5.2.2-5.2 3.2 0 1.8-1 2.9-2.3 3.3 3.7 1.3 8.4-.2 8.4-3.6z" fill="currentColor"/>',
  blobbrush: '<path d="M20.5 3.5 13 11"/><path d="M13 11c-2-1-4 0-4 2"/><path d="M3 18c2-3 5-3 7-1s3 3 6 1" stroke-width="3.2"/>',
  shaper: '<path d="M3 13c2.5-6 4.5 4 7-1s3.5 2 5 0"/><path d="M14 21l4-7 4 7z"/>',
  pencil: '<path d="M4 20l1.2-4.6L16 4.6l3.4 3.4L8.6 18.8z"/><path d="M13.5 7l3.4 3.4"/>',
  eraser: '<path d="M8 20.5h12"/><path d="M3.5 15 13 5.5l6 6-7 7H7z"/><path d="M8.5 10l6 6"/>',
  scissors: '<circle cx="6" cy="6.5" r="3"/><circle cx="6" cy="17.5" r="3"/><path d="M8.5 8 20 17M8.5 16 20 7"/>',
  knife: '<path d="M3.5 20.5 15 9l2 2L6.5 20.5z"/><path d="M15 9l3.5-3.5a1.5 1.5 0 0 1 2 2L17 11"/>',
  rotate: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M17.5 2.5v4h4"/>',
  reflect: '<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M9 6 3 18h6zM15 6l6 12h-6z"/>',
  scale: '<rect x="3.5" y="11" width="9.5" height="9.5"/><path d="M13 3.5h7.5V11" stroke-dasharray="2 2"/><path d="M11 13l9-9M15 4h5v5"/>',
  width: '<path d="M2.5 15c4-1 6.5-5.5 9.5-5.5s5.5 4.5 9.5 5.5c-4 1-6.5 3-9.5 3s-5.5-2-9.5-3z"/><path d="M12 6v3.5M12 18v1.5" /><circle cx="12" cy="9.5" r="1" fill="currentColor"/>',
  warp: '<path d="M4 18c3-2 4-10 8-10s5 8 8 10"/><circle cx="12" cy="8" r="3"/>',
  freetransform: '<rect x="3.5" y="3.5" width="13" height="13" stroke-dasharray="3 2"/><path d="M13.5 13.5l7 7M20.5 15v5.5H15"/>',
  shapebuilder: '<circle cx="8.5" cy="10" r="5"/><circle cx="14" cy="10" r="5"/><path d="M18.5 15.5v6M15.5 18.5h6"/>',
  livepaint: '<path d="M4 12l7-7 8 8-7 7z"/><path d="M19 13c1 1.5 2 2.8 2 4a2 2 0 0 1-4 0c0-1.2 1-2.5 2-4z" fill="currentColor"/>',
  perspective: '<path d="M2.5 20h19L16 5.5H8z"/><path d="M12 5.5V20M5.3 12.8h13.4M9.8 5.5 7.4 20M14.2 5.5l2.4 14.5"/>',
  mesh: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 12c5-3.5 12 3.5 17 0M12 3.5c-3.5 5 3.5 12 0 17"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>',
  gradient: '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M8 3.5v17" stroke-width="5" opacity=".85"/><path d="M13 3.5v17" stroke-width="4" opacity=".45"/><path d="M17.5 3.5v17" stroke-width="3" opacity=".18"/>',
  eyedropper: '<path d="M14.5 3.5l6 6-2.2 2.2-6-6z" fill="currentColor"/><path d="M13.5 7.5 5 16v3.5h3.5L17 11"/>',
  measure: '<path d="M3 17 17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  blend: '<circle cx="5.5" cy="12" r="3.3"/><circle cx="10.5" cy="12" r="3.3" opacity=".55"/><rect x="14.5" y="8.5" width="7" height="7"/>',
  symbol: '<rect x="6.5" y="9" width="8" height="12" rx="1.5"/><path d="M8.5 9V6h4v3"/><path d="M15 5h2M19 3.5l1.2-1M19 6.5l1.2 1M19.5 5h2"/>',
  graph: '<path d="M3.5 20.5h17"/><rect x="5.5" y="11" width="3" height="9.5"/><rect x="10.5" y="5.5" width="3" height="15"/><rect x="15.5" y="13.5" width="3" height="7"/>',
  artboard: '<rect x="6" y="6" width="12" height="12"/><path d="M6 1.5v3M1.5 6h3M18 1.5v3M22.5 6h-3M6 22.5v-3M1.5 18h3M18 22.5v-3M22.5 18h-3"/>',
  slice: '<path d="M4 20.5 17.5 7l2.5 2.5L6.5 20.5z"/><path d="M15 4.5 19.5 9" />',
  hand: '<path d="M7.5 12.5V6a1.5 1.5 0 0 1 3 0v5M10.5 11V4.5a1.5 1.5 0 0 1 3 0V11M13.5 11V5.5a1.5 1.5 0 0 1 3 0v6.5M16.5 10a1.5 1.5 0 0 1 3 0v4.5c0 4-2.5 7-6.5 7h-.5c-2.4 0-4-1.2-5.4-3.1L3.8 14a1.5 1.5 0 0 1 2.3-1.9l1.4 1.6"/>',
  rotateview: '<path d="M7.5 12.5V7a1.5 1.5 0 0 1 3 0v4M10.5 11V6a1.5 1.5 0 0 1 3 0v5M13.5 11V7a1.5 1.5 0 0 1 3 0v6c0 4-2.5 7-6 7-2.5 0-4-1.5-5-3l-2-3a1.5 1.5 0 0 1 2.5-1.5"/><path d="M18 3a5 5 0 0 1 3 4.5M21 5v2.5h-2.5"/>',
  zoom: '<circle cx="10" cy="10" r="6.5"/><path d="M20.5 20.5 15 15"/>',
};

export function aiIcon(id, cls = 'ai-ic') {
  const p = P[id] || P.rect;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

// ---------------------------------------------------------------- ກຸ່ມເຄື່ອງມື (ໃຊ້ສີເປັນເສັ້ນແບ່ງກຸ່ມ)

export const GROUPS = {
  select: { lo: 'ກຸ່ມເລືອກວັດຖຸ', en: 'Selection', color: '#3b82f6' },
  draw: { lo: 'ກຸ່ມວາດເສັ້ນ ແລະ ຮູບຮ່າງ', en: 'Drawing', color: '#22c55e' },
  type: { lo: 'ກຸ່ມຕົວອັກສອນ', en: 'Type', color: '#a855f7' },
  cut: { lo: 'ກຸ່ມຕັດ ແລະ ລຶບ', en: 'Cut & Erase', color: '#ef4444' },
  modify: { lo: 'ກຸ່ມປັບແຕ່ງ ແລະ ແປງຮູບ', en: 'Modify & Transform', color: '#ec4899' },
  paint: { lo: 'ກຸ່ມສີ ແລະ ການທາສີ', en: 'Color & Paint', color: '#f59e0b' },
  special: { lo: 'ກຸ່ມພິເສດ', en: 'Symbol · Graph · Artboard · Slice', color: '#14b8a6' },
  nav: { lo: 'ກຸ່ມມຸມມອງ', en: 'Navigate', color: '#94a3b8' },
};

// ---------------------------------------------------------------- ເຄື່ອງມືໃນ Toolbar (Advanced) ຕາມລຳດັບຈິງ
// hidden = ເຄື່ອງມືທີ່ຊ່ອນຢູ່ໃນກຸ່ມດຽວກັນ (ກົດຄ້າງໄອຄອນເພື່ອເບິ່ງ)

export const TOOLS = [
  {
    id: 'selection', icon: 'selection', group: 'select', name: 'Selection Tool', key: 'V',
    lo: 'ເຄື່ອງມືເລືອກວັດຖຸ (ລູກສອນດຳ)',
    use: 'ເລືອກ, ຍ້າຍ, ຍໍ້-ຂະຫຍາຍ ແລະ ໝູນ ວັດຖຸທັງກ້ອນ',
    how: 'ຄລິກວັດຖຸເພື່ອເລືອກ · ລາກເພື່ອຍ້າຍ · ລາກຈຸດມຸມກອບ (bounding box) ເພື່ອປ່ຽນຂະໜາດ · ກົດ Shift ຄ້າງ = ຮັກສາສັດສ່ວນ · ກົດ Alt ຄ້າງແລ້ວລາກ = ສຳເນົາວັດຖຸ',
  },
  {
    id: 'direct', icon: 'direct', group: 'select', name: 'Direct Selection Tool', key: 'A',
    lo: 'ເຄື່ອງມືເລືອກຈຸດໂດຍກົງ (ລູກສອນຂາວ)',
    use: 'ເລືອກ ແລະ ແກ້ໄຂ Anchor Point ຫຼື ສ່ວນຂອງເສັ້ນ (segment) ເທື່ອລະຈຸດ',
    how: 'ຄລິກຈຸດແລ້ວລາກເພື່ອປ່ຽນຮູບຮ່າງ · ລາກ handle ເພື່ອປັບຄວາມໂຄ້ງ · ໃຊ້ປັບມຸມໃຫ້ມົນໄດ້ດ້ວຍ Live Corners (ຈຸດວົງມົນນ້ອຍໆ)',
    hidden: [{ icon: 'group', name: 'Group Selection Tool', lo: 'ເລືອກວັດຖຸ ຫຼື ກຸ່ມຍ່ອຍ ທີ່ຢູ່ໃນກຸ່ມ ໂດຍບໍ່ຕ້ອງ Ungroup' }],
  },
  {
    id: 'magicwand', icon: 'magicwand', group: 'select', name: 'Magic Wand Tool', key: 'Y',
    lo: 'ໄມ້ກາຍສິດ',
    use: 'ເລືອກວັດຖຸທຸກອັນທີ່ມີ ສີພື້ນ, ສີເສັ້ນ, ຄວາມໜາເສັ້ນ ຫຼື ຄວາມໂປ່ງໃສ ຄືກັນ ໃນຄັ້ງດຽວ',
    how: 'ຄລິກວັດຖຸ 1 ອັນ → ວັດຖຸອື່ນທີ່ຄ້າຍກັນຖືກເລືອກນຳ · ດັບເບີ້ນຄລິກໄອຄອນເພື່ອຕັ້ງຄ່າ Tolerance',
  },
  {
    id: 'lasso', icon: 'lasso', group: 'select', name: 'Lasso Tool', key: 'Q',
    lo: 'ບ່ວງເລືອກ',
    use: 'ລາກເປັນຮູບອິດສະຫຼະອ້ອມຈຸດ ຫຼື ວັດຖຸ ເພື່ອເລືອກ Anchor Point ຫຼາຍຈຸດພ້ອມກັນ',
    how: 'ລາກເສັ້ນອ້ອມຈຸດທີ່ຕ້ອງການ · ເໝາະກັບການເລືອກຈຸດໃນບ່ອນທີ່ວັດຖຸຊ້ອນກັນຫຼາຍ',
  },
  {
    id: 'pen', icon: 'pen', group: 'draw', name: 'Pen Tool', key: 'P',
    lo: 'ປາກກາ',
    use: 'ວາດເສັ້ນຊື່ ແລະ ເສັ້ນໂຄ້ງ (Bézier) ທີ່ຊັດເຈນ — ເຄື່ອງມືສຳຄັນທີ່ສຸດສຳລັບວາດໂລໂກ້ ແລະ ຮູບຮ່າງ',
    how: 'ຄລິກ = ຈຸດ ແລະ ເສັ້ນຊື່ · ຄລິກຄ້າງແລ້ວລາກ = ເສັ້ນໂຄ້ງ · ຄລິກຈຸດທຳອິດ = ປິດ path · ກົດ Esc ຫຼື Enter = ຈົບເສັ້ນເປີດ',
    hidden: [
      { icon: 'addanchor', name: 'Add Anchor Point Tool', key: '+', lo: 'ເພີ່ມຈຸດໃສ່ path' },
      { icon: 'delanchor', name: 'Delete Anchor Point Tool', key: '−', lo: 'ລຶບຈຸດອອກຈາກ path' },
      { icon: 'anchorpoint', name: 'Anchor Point Tool', key: 'Shift+C', lo: 'ປ່ຽນຈຸດມຸມ ↔ ຈຸດໂຄ້ງ' },
    ],
  },
  {
    id: 'curvature', icon: 'curvature', group: 'draw', name: 'Curvature Tool', key: 'Shift+~',
    lo: 'ເຄື່ອງມືວາດເສັ້ນໂຄ້ງ',
    use: 'ວາດເສັ້ນໂຄ້ງໄດ້ງ່າຍກວ່າ Pen — ພຽງຄລິກຈຸດ ໂປຣແກຣມຈະສ້າງຄວາມໂຄ້ງໃຫ້ເອງ',
    how: 'ຄລິກຈຸດຕໍ່ໆກັນ = ເສັ້ນໂຄ້ງລຽບ · ດັບເບີ້ນຄລິກ = ຈຸດມຸມ',
  },
  {
    id: 'type', icon: 'type', group: 'type', name: 'Type Tool', key: 'T',
    lo: 'ເຄື່ອງມືພິມຕົວອັກສອນ',
    use: 'ພິມ ແລະ ແກ້ໄຂຂໍ້ຄວາມ',
    how: 'ຄລິກ 1 ຄັ້ງ = Point Type (ບໍ່ຕັດແຖວເອງ) · ລາກເປັນກອບ = Area Type (ຕັດແຖວຕາມກອບ)',
    hidden: [
      { icon: 'areatype', name: 'Area Type Tool', lo: 'ພິມຂໍ້ຄວາມຢູ່ພາຍໃນຮູບຮ່າງ' },
      { icon: 'typepath', name: 'Type on a Path Tool', lo: 'ພິມຂໍ້ຄວາມຕາມເສັ້ນ path (ເຊັ່ນ ໂຄ້ງຕາມວົງມົນ)' },
      { icon: 'verttype', name: 'Vertical Type Tool', lo: 'ພິມຂໍ້ຄວາມແນວຕັ້ງ (ມີແບບ Area ແລະ on a Path ນຳ)' },
      { name: 'Touch Type Tool', key: 'Shift+T', lo: 'ຍ້າຍ, ໝູນ, ຍໍ້ ຕົວອັກສອນແຕ່ລະຕົວ ໂດຍຍັງແກ້ຂໍ້ຄວາມໄດ້' },
    ],
  },
  {
    id: 'line', icon: 'line', group: 'draw', name: 'Line Segment Tool', key: '\\',
    lo: 'ເຄື່ອງມືເສັ້ນຊື່',
    use: 'ວາດເສັ້ນຊື່ 1 ເສັ້ນ',
    how: 'ລາກຈາກຈຸດເລີ່ມຫາຈຸດສຸດທ້າຍ · ກົດ Shift ຄ້າງ = ລັອກມຸມ 45°/90°',
    hidden: [
      { icon: 'arc', name: 'Arc Tool', lo: 'ວາດເສັ້ນໂຄ້ງຄືຄັນທະນູ' },
      { name: 'Spiral Tool', lo: 'ວາດເສັ້ນກຽວ' },
      { name: 'Rectangular Grid Tool', lo: 'ວາດຕາຕະລາງສີ່ຫຼ່ຽມ' },
      { name: 'Polar Grid Tool', lo: 'ວາດຕາຂ່າຍວົງມົນ (ຄືເປົ້າ)' },
    ],
  },
  {
    id: 'rect', icon: 'rect', group: 'draw', name: 'Rectangle Tool', key: 'M',
    lo: 'ເຄື່ອງມືສີ່ຫຼ່ຽມ',
    use: 'ວາດຮູບສີ່ຫຼ່ຽມ',
    how: 'ລາກເພື່ອວາດ · Shift = ສີ່ຫຼ່ຽມຈະຕຸລັດ · Alt = ວາດອອກຈາກຈຸດກາງ · ຄລິກ 1 ຄັ້ງ = ພິມຂະໜາດທີ່ແນ່ນອນ',
    hidden: [
      { icon: 'roundrect', name: 'Rounded Rectangle Tool', lo: 'ສີ່ຫຼ່ຽມມຸມມົນ' },
      { icon: 'ellipse', name: 'Ellipse Tool', key: 'L', lo: 'ວົງມົນ ແລະ ວົງຣີ (Shift = ວົງມົນສົມບູນ)' },
      { icon: 'polygon', name: 'Polygon Tool', lo: 'ຮູບຫຼາຍຫຼ່ຽມ (ກົດລູກສອນ ↑ ↓ ຂະນະລາກ = ເພີ່ມ/ຫຼຸດ ຈຳນວນຂ້າງ)' },
      { icon: 'star', name: 'Star Tool', lo: 'ຮູບດາວ' },
      { name: 'Flare Tool', lo: 'ເອັບເຟັກແສງແຟຣ໌ (ຄືແສງສະທ້ອນເລນກ້ອງ)' },
    ],
  },
  {
    id: 'paintbrush', icon: 'paintbrush', group: 'draw', name: 'Paintbrush Tool', key: 'B',
    lo: 'ແປງທາສີ',
    use: 'ວາດເສັ້ນແບບມືດ້ວຍລາຍແປງ (Brush) ຕ່າງໆ — ຜົນທີ່ໄດ້ເປັນ Stroke',
    how: 'ລາກວາດຄືໃຊ້ແປງແທ້ · ເລືອກລາຍແປງຈາກ Brushes panel (F5)',
    hidden: [{ icon: 'blobbrush', name: 'Blob Brush Tool', key: 'Shift+B', lo: 'ວາດແລ້ວໄດ້ເປັນຮູບຮ່າງ (Fill) ລວມເປັນກ້ອນດຽວ' }],
  },
  {
    id: 'shaper', icon: 'shaper', group: 'draw', name: 'Shaper Tool', key: 'Shift+N',
    lo: 'ເຄື່ອງມື Shaper',
    use: 'ແຕ້ມຮູບຫຍາບໆ ແລ້ວໂປຣແກຣມປ່ຽນເປັນຮູບຮ່າງທີ່ສວຍງາມ (ວົງມົນ, ສີ່ຫຼ່ຽມ, ສາມຫຼ່ຽມ)',
    how: 'ແຕ້ມເປັນວົງ → ໄດ້ວົງມົນ · ຂີດທັບ (scribble) ສ່ວນທີ່ຊ້ອນກັນ = ລຶບ ຫຼື ລວມ',
    hidden: [
      { icon: 'pencil', name: 'Pencil Tool', key: 'N', lo: 'ວາດເສັ້ນອິດສະຫຼະຄືສໍດຳ' },
      { name: 'Smooth Tool', lo: 'ລາກທັບເສັ້ນເພື່ອໃຫ້ລຽບ' },
      { name: 'Path Eraser Tool', lo: 'ລຶບບາງສ່ວນຂອງ path' },
      { name: 'Join Tool', lo: 'ເຊື່ອມປາຍເສັ້ນ 2 ເສັ້ນເຂົ້າກັນ' },
    ],
  },
  {
    id: 'eraser', icon: 'eraser', group: 'cut', name: 'Eraser Tool', key: 'Shift+E',
    lo: 'ຢາງລຶບ',
    use: 'ລຶບສ່ວນຂອງຮູບຮ່າງ ຄືໃຊ້ຢາງລຶບ',
    how: 'ລາກທັບສ່ວນທີ່ຈະລຶບ · Alt + ລາກ = ລຶບເປັນກອບສີ່ຫຼ່ຽມ',
    hidden: [
      { icon: 'scissors', name: 'Scissors Tool', key: 'C', lo: 'ຕັດ path ທີ່ຈຸດທີ່ຄລິກ (ແຍກເສັ້ນອອກ)' },
      { icon: 'knife', name: 'Knife Tool', lo: 'ລາກຕັດຮູບຮ່າງແບ່ງເປັນຫຼາຍຊິ້ນ' },
    ],
  },
  {
    id: 'rotate', icon: 'rotate', group: 'modify', name: 'Rotate Tool', key: 'R',
    lo: 'ເຄື່ອງມືໝູນ',
    use: 'ໝູນວັດຖຸອ້ອມຈຸດອ້າງອີງ',
    how: 'ລາກເພື່ອໝູນ · Alt + ຄລິກ = ກຳນົດຈຸດໝູນ ແລະ ພິມອົງສາ · Shift = ລັອກ 45°',
    hidden: [{ icon: 'reflect', name: 'Reflect Tool', key: 'O', lo: 'ສະທ້ອນ / ກັບດ້ານວັດຖຸ (ຄືແວ່ນ) ແນວນອນ ຫຼື ແນວຕັ້ງ' }],
  },
  {
    id: 'scale', icon: 'scale', group: 'modify', name: 'Scale Tool', key: 'S',
    lo: 'ເຄື່ອງມືຍໍ້-ຂະຫຍາຍ',
    use: 'ປ່ຽນຂະໜາດວັດຖຸ ເປັນເປີເຊັນ ຈາກຈຸດອ້າງອີງ',
    how: 'ດັບເບີ້ນຄລິກໄອຄອນ → ພິມ %, ເລືອກວ່າຈະ Scale ຄວາມໜາເສັ້ນ ແລະ ເອັບເຟັກນຳຫຼືບໍ່',
    hidden: [
      { name: 'Shear Tool', lo: 'ອຽງວັດຖຸ (ເອນໄປທາງຂ້າງ)' },
      { name: 'Reshape Tool', lo: 'ປັບຮູບຊົງຂອງ path ໂດຍຮັກສາລາຍລະອຽດ' },
    ],
  },
  {
    id: 'width', icon: 'width', group: 'modify', name: 'Width Tool', key: 'Shift+W',
    lo: 'ເຄື່ອງມືປັບຄວາມໜາເສັ້ນ',
    use: 'ເຮັດໃຫ້ເສັ້ນ (stroke) ໜາ-ບາງ ບໍ່ເທົ່າກັນໃນແຕ່ລະຈຸດ',
    how: 'ລາກອອກຈາກເສັ້ນ = ໜາຂຶ້ນ · ລາກເຂົ້າ = ບາງລົງ',
    hidden: [
      { icon: 'warp', name: 'Warp Tool', key: 'Shift+R', lo: 'ບິດຮູບຮ່າງຄືປັ້ນດິນ' },
      { name: 'Twirl / Pucker / Bloat', lo: 'ບິດໝູນ / ດຶງເຂົ້າ / ພອງອອກ' },
      { name: 'Scallop / Crystallize / Wrinkle', lo: 'ເຮັດຂອບເປັນຫອຍ / ແຫຼມ / ຍັບ' },
    ],
  },
  {
    id: 'freetransform', icon: 'freetransform', group: 'modify', name: 'Free Transform Tool', key: 'E',
    lo: 'ເຄື່ອງມືແປງຮູບອິດສະຫຼະ',
    use: 'ຍໍ້, ໝູນ, ອຽງ ແລະ ດຶງມຸມໃຫ້ເປັນທັດສະນິຍົມ (Perspective / Free Distort)',
    how: 'ເມື່ອເລືອກເຄື່ອງມື ຈະມີແຖບນ້ອຍໃຫ້ເລືອກໂໝດ: Constrain, Free Transform, Perspective Distort, Free Distort',
    hidden: [{ name: 'Puppet Warp Tool', lo: 'ປັກໝຸດໃສ່ວັດຖຸແລ້ວລາກບິດ (ຄືຫຸ່ນເຊີດ)' }],
  },
  {
    id: 'shapebuilder', icon: 'shapebuilder', group: 'modify', name: 'Shape Builder Tool', key: 'Shift+M',
    lo: 'ເຄື່ອງມືສ້າງຮູບຮ່າງ',
    use: 'ລວມ ຫຼື ລຶບ ສ່ວນຂອງຮູບຮ່າງທີ່ຊ້ອນກັນ ໂດຍລາກທັບໂດຍກົງ',
    how: 'ເລືອກຮູບທີ່ຊ້ອນກັນ → ລາກຜ່ານພື້ນທີ່ = ລວມ (Unite) · Alt + ຄລິກ/ລາກ = ລຶບພື້ນທີ່ນັ້ນ',
    hidden: [
      { icon: 'livepaint', name: 'Live Paint Bucket', key: 'K', lo: 'ເທສີໃສ່ພື້ນທີ່ທີ່ເສັ້ນຕັດກັນ (ຄືປຶ້ມລະບາຍສີ)' },
      { name: 'Live Paint Selection Tool', key: 'Shift+L', lo: 'ເລືອກພື້ນທີ່ ຫຼື ຂອບ ໃນກຸ່ມ Live Paint' },
    ],
  },
  {
    id: 'perspective', icon: 'perspective', group: 'modify', name: 'Perspective Grid Tool', key: 'Shift+P',
    lo: 'ຕາຂ່າຍທັດສະນິຍົມ',
    use: 'ສະແດງຕາຂ່າຍ 1, 2 ຫຼື 3 ຈຸດລັບຕາ ເພື່ອວາດວັດຖຸໃຫ້ເປັນມິຕິ (ຄືອາຄານ, ຖະໜົນ)',
    how: 'ວາດຮູບຂະນະຕາຂ່າຍເປີດ → ຮູບຈະບິດຕາມທັດສະນິຍົມ',
    hidden: [{ name: 'Perspective Selection Tool', key: 'Shift+V', lo: 'ຍ້າຍວັດຖຸເທິງຕາຂ່າຍທັດສະນິຍົມ' }],
  },
  {
    id: 'mesh', icon: 'mesh', group: 'paint', name: 'Mesh Tool', key: 'U',
    lo: 'ເຄື່ອງມືຕາໜ່າງສີ (Gradient Mesh)',
    use: 'ສ້າງການໄລ່ສີທີ່ສັບຊ້ອນ ແບບແສງເງົາສົມຈິງ (ເຊັ່ນ ໝາກໄມ້, ຜິວໜັງ)',
    how: 'ຄລິກໃນຮູບຮ່າງ = ເພີ່ມຈຸດ mesh → ເລືອກສີໃຫ້ແຕ່ລະຈຸດ',
  },
  {
    id: 'gradient', icon: 'gradient', group: 'paint', name: 'Gradient Tool', key: 'G',
    lo: 'ເຄື່ອງມືໄລ່ສີ',
    use: 'ປັບທິດທາງ, ຄວາມຍາວ ແລະ ຈຸດສີ ຂອງການໄລ່ສີ (Linear, Radial, Freeform)',
    how: 'ລາກຜ່ານວັດຖຸເພື່ອກຳນົດທິດໄລ່ສີ · ແກ້ສີໃນ Gradient panel (Ctrl+F9)',
  },
  {
    id: 'eyedropper', icon: 'eyedropper', group: 'paint', name: 'Eyedropper Tool', key: 'I',
    lo: 'ເຄື່ອງມືດູດສີ',
    use: 'ດູດສີ ແລະ ຮູບແບບ (ສີພື້ນ, ສີເສັ້ນ, ຮູບແບບຕົວອັກສອນ) ຈາກວັດຖຸໜຶ່ງ ໄປໃສ່ອີກວັດຖຸໜຶ່ງ',
    how: 'ເລືອກວັດຖຸປາຍທາງ → ຄລິກວັດຖຸຕົ້ນແບບ',
    hidden: [{ icon: 'measure', name: 'Measure Tool', lo: 'ວັດໄລຍະ ແລະ ມຸມ ລະຫວ່າງ 2 ຈຸດ (ເບິ່ງຜົນໃນ Info panel)' }],
  },
  {
    id: 'blend', icon: 'blend', group: 'paint', name: 'Blend Tool', key: 'W',
    lo: 'ເຄື່ອງມືຜະສົມ (Blend)',
    use: 'ສ້າງຮູບ ແລະ ສີ ຂັ້ນກາງ ລະຫວ່າງ 2 ວັດຖຸ (ເຊັ່ນ ວົງມົນ → ສີ່ຫຼ່ຽມ, ສີແດງ → ສີຟ້າ)',
    how: 'ຄລິກວັດຖຸທີ 1 ແລ້ວຄລິກວັດຖຸທີ 2 · ດັບເບີ້ນຄລິກໄອຄອນ = ກຳນົດຈຳນວນຂັ້ນ (Specified Steps)',
  },
  {
    id: 'symbol', icon: 'symbol', group: 'special', name: 'Symbol Sprayer Tool', key: 'Shift+S',
    lo: 'ເຄື່ອງມືສີດ Symbol',
    use: 'ສີດ Symbol (ເຊັ່ນ ໃບໄມ້, ດາວ) ລົງໜ້າເຈ້ຍຫຼາຍອັນພ້ອມກັນ',
    how: 'ເລືອກ Symbol ໃນ Symbols panel → ຄລິກ ຫຼື ລາກ',
    hidden: [{ name: 'Symbol Shifter / Scruncher / Sizer / Spinner / Stainer / Screener / Styler', lo: 'ຍ້າຍ / ບີບ / ປ່ຽນຂະໜາດ / ໝູນ / ຍ້ອມສີ / ປັບໂປ່ງໃສ / ໃສ່ Style ໃຫ້ Symbol ທີ່ສີດແລ້ວ' }],
  },
  {
    id: 'graph', icon: 'graph', group: 'special', name: 'Column Graph Tool', key: 'J',
    lo: 'ເຄື່ອງມືກາຟແທ່ງ',
    use: 'ສ້າງກາຟຈາກຂໍ້ມູນຕົວເລກ',
    how: 'ລາກເປັນກອບ → ພິມຂໍ້ມູນໃນຕາຕະລາງ',
    hidden: [{ name: 'Stacked Column, Bar, Stacked Bar, Line, Area, Scatter, Pie, Radar', lo: 'ກາຟປະເພດອື່ນໆ ລວມ 9 ແບບ (ເຊັ່ນ Pie = ກາຟວົງມົນ, Line = ກາຟເສັ້ນ)' }],
  },
  {
    id: 'artboard', icon: 'artboard', group: 'special', name: 'Artboard Tool', key: 'Shift+O',
    lo: 'ເຄື່ອງມື Artboard',
    use: 'ສ້າງ, ປ່ຽນຂະໜາດ, ຍ້າຍ ແລະ ລຶບ Artboard (ໜ້າເຈ້ຍ) — 1 ໄຟລ໌ມີຫຼາຍໜ້າໄດ້',
    how: 'ລາກໃນພື້ນທີ່ວ່າງ = Artboard ໃໝ່ · ພິມຂະໜາດໃນ Properties · ກົດ Esc ເພື່ອອອກ',
  },
  {
    id: 'slice', icon: 'slice', group: 'special', name: 'Slice Tool', key: 'Shift+K',
    lo: 'ເຄື່ອງມືຕັດແບ່ງຮູບ (Slice)',
    use: 'ແບ່ງຮູບເປັນສ່ວນໆ ເພື່ອ export ໄປໃຊ້ໃນເວັບ',
    how: 'ລາກເປັນກອບໃສ່ສ່ວນທີ່ຕ້ອງການ',
    hidden: [{ name: 'Slice Selection Tool', lo: 'ເລືອກ ແລະ ປັບ slice ທີ່ສ້າງແລ້ວ' }],
  },
  {
    id: 'hand', icon: 'hand', group: 'nav', name: 'Hand Tool', key: 'H',
    lo: 'ເຄື່ອງມືມື',
    use: 'ເລື່ອນມຸມມອງໜ້າຈໍ (ບໍ່ໄດ້ຍ້າຍວັດຖຸ)',
    how: 'ລາກເພື່ອເລື່ອນ · ກົດ Spacebar ຄ້າງ = ໃຊ້ມືຊົ່ວຄາວ ຂະນະໃຊ້ເຄື່ອງມືອື່ນ',
    hidden: [
      { icon: 'rotateview', name: 'Rotate View Tool', key: 'Shift+H', lo: 'ໝູນມຸມມອງໜ້າຈໍ (ວັດຖຸບໍ່ໝູນແທ້)' },
      { name: 'Print Tiling Tool', lo: 'ກຳນົດພື້ນທີ່ພິມ' },
    ],
  },
  {
    id: 'zoom', icon: 'zoom', group: 'nav', name: 'Zoom Tool', key: 'Z',
    lo: 'ແວ່ນຂະຫຍາຍ',
    use: 'ຊູມເຂົ້າ-ອອກ ເພື່ອເບິ່ງລາຍລະອຽດ',
    how: 'ຄລິກ = ຊູມເຂົ້າ · Alt + ຄລິກ = ຊູມອອກ · Ctrl + 0 = ພໍດີ Artboard',
  },
];

// ---------------------------------------------------------------- ສ່ວນລຸ່ມສຸດຂອງ Toolbar

const FILLSTROKE = [
  ['1', 'Fill (ສີພື້ນ)', 'ສີ່ຫຼ່ຽມທີ່ທຶບ — ສີທີ່ຢູ່ພາຍໃນຮູບຮ່າງ'],
  ['2', 'Stroke (ສີເສັ້ນ)', 'ສີ່ຫຼ່ຽມທີ່ມີແຕ່ຂອບ — ສີຂອງເສັ້ນຂອບ'],
  ['3', 'Swap (Shift+X)', 'ສະຫຼັບສີ Fill ↔ Stroke'],
  ['4', 'Default (D)', 'ກັບຄືນຄ່າເລີ່ມຕົ້ນ: Fill ຂາວ, Stroke ດຳ'],
  ['5', 'Color / Gradient / None ( < > / )', 'ໃສ່ສີທຶບ / ໃສ່ສີໄລ່ / ບໍ່ມີສີ (ສີ່ຫຼ່ຽມຂາວມີເສັ້ນແດງ)'],
  ['6', 'Draw Normal / Behind / Inside (Shift+D)', 'ວາດປົກກະຕິ / ວາດໄວ້ທາງຫຼັງ / ວາດຢູ່ພາຍໃນວັດຖຸທີ່ເລືອກ'],
  ['7', 'Change Screen Mode (F)', 'ສະຫຼັບໂໝດໜ້າຈໍ: ປົກກະຕິ / ເຕັມຈໍ / Presentation'],
  ['8', 'Edit Toolbar ( ••• )', 'ເພີ່ມ ຫຼື ລຶບ ເຄື່ອງມືໃນ Toolbar'],
];

export function fillStrokeHtml() {
  const c = ['#f59e0b', '#38bdf8', '#a3e635', '#f472b6', '#c084fc', '#fb923c', '#94a3b8', '#e2e8f0'];
  const svg = `<svg class="ai-fs-svg" viewBox="0 0 120 210" role="img" aria-label="ສ່ວນ Fill ແລະ Stroke ລຸ່ມສຸດຂອງ Toolbar">
    <rect width="120" height="210" rx="8" fill="#2b2b2b"/>
    <rect x="22" y="14" width="40" height="40" fill="#f2f2f2" stroke="#111" stroke-width="1.5"/>
    <rect x="44" y="36" width="40" height="40" fill="none" stroke="#111" stroke-width="10"/>
    <rect x="44" y="36" width="40" height="40" fill="none" stroke="#f2f2f2" stroke-width="2"/>
    <rect x="44" y="36" width="40" height="40" fill="none" stroke="#f2f2f2" stroke-width="2" transform="translate(0 0)"/>
    <path d="M70 14q12 0 12 12" fill="none" stroke="#ddd" stroke-width="2"/><path d="M80 22l2 4 3-3" fill="none" stroke="#ddd" stroke-width="2"/>
    <rect x="14" y="66" width="10" height="10" fill="#f2f2f2"/><rect x="18" y="70" width="10" height="10" fill="none" stroke="#f2f2f2" stroke-width="2"/>
    <rect x="18" y="92" width="22" height="18" fill="#e5e5e5"/>
    <defs><linearGradient id="aifsg" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#111"/></linearGradient></defs>
    <rect x="49" y="92" width="22" height="18" fill="url(#aifsg)"/>
    <rect x="80" y="92" width="22" height="18" fill="#fff"/><path d="M80 110l22-18" stroke="#e11d48" stroke-width="2.5"/>
    <rect x="18" y="122" width="22" height="18" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="24" y="127" width="10" height="8" fill="#bbb"/>
    <rect x="49" y="122" width="22" height="18" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="53" y="126" width="10" height="8" fill="#555" stroke="#bbb"/>
    <rect x="80" y="122" width="22" height="18" fill="none" stroke="#bbb" stroke-width="1.5" stroke-dasharray="3 2"/><rect x="85" y="127" width="12" height="8" fill="#bbb"/>
    <rect x="38" y="152" width="44" height="22" rx="3" fill="none" stroke="#bbb" stroke-width="1.5"/><rect x="44" y="157" width="32" height="12" fill="#bbb"/>
    <text x="60" y="198" fill="#ddd" font-size="18" text-anchor="middle" font-family="sans-serif">•••</text>
    ${[
      [22, 14, 40, 40], [44, 36, 40, 40], [68, 12, 20, 20], [12, 64, 18, 18], [16, 90, 88, 22], [16, 120, 88, 22], [36, 150, 48, 26], [40, 184, 40, 20],
    ]
      .map(([x, y, w, h], i) => `<rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" rx="4" fill="none" stroke="${c[i]}" stroke-width="2"/>`)
      .join('')}
    ${[
      [10, 12], [94, 74], [100, 10], [6, 88], [110, 101], [110, 131], [94, 168], [94, 196],
    ]
      .map(([x, y], i) => `<g><circle cx="${x}" cy="${y}" r="7" fill="${c[i]}"/><text x="${x}" y="${y + 3.5}" font-size="9" font-weight="700" text-anchor="middle" fill="#111" font-family="sans-serif">${i + 1}</text></g>`)
      .join('')}
  </svg>`;
  return `<div class="ai-fs">${svg}<ol class="ai-legend">${FILLSTROKE.map(
    ([n, t, d], i) => `<li style="--c:${c[i]}"><span class="lg-n">${n}</span><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`,
  ).join('')}</ol></div>`;
}

// ---------------------------------------------------------------- ລາຍການເຄື່ອງມືຕາມກຸ່ມ

function keycap(k) {
  if (!k) return '';
  // ແຍກດ້ວຍ + ແຕ່ຮັກສາປຸ່ມ "+" ເອງໄວ້ (ເຊັ່ນ "+" ຫຼື "Ctrl++")
  const parts = k === '+' ? ['+'] : k.split(/(?<=[^+])\+/);
  return `<span class="kbd-group">${parts
    .map((x) => `<kbd>${esc(x)}</kbd>`)
    .join('<i>+</i>')}</span>`;
}

function toolCard(t) {
  const g = GROUPS[t.group];
  const hidden = (t.hidden || [])
    .map(
      (h) =>
        `<li>${h.icon ? aiIcon(h.icon, 'ai-ic sm') : '<span class="ai-ic sm blank"></span>'}<div><b>${esc(h.name)}</b>${h.key ? ` ${keycap(h.key)}` : ''}<span>${esc(h.lo)}</span></div></li>`,
    )
    .join('');
  return `<article class="ai-tool" id="tool-${t.id}" data-tool="${t.id}" style="--g:${g.color}">
  <header class="ai-tool-h">
    <span class="ai-tool-ic">${aiIcon(t.icon)}${t.hidden ? '<i class="flyout" aria-hidden="true"></i>' : ''}</span>
    <div class="ai-tool-t"><b>${esc(t.name)}</b><span>${esc(t.lo)}</span></div>
    ${keycap(t.key)}
  </header>
  <dl class="ai-tool-d">
    <dt>ໃຊ້ເຮັດຫຍັງ</dt><dd>${esc(t.use)}</dd>
    <dt>ວິທີໃຊ້</dt><dd>${esc(t.how)}</dd>
  </dl>
  ${hidden ? `<div class="ai-hidden"><div class="ai-hidden-h">ເຄື່ອງມືທີ່ຊ່ອນຢູ່ກຸ່ມດຽວກັນ (ກົດຄ້າງໄອຄອນ)</div><ul>${hidden}</ul></div>` : ''}
</article>`;
}

export function toolsGroupHtml(group) {
  const list = TOOLS.filter((t) => t.group === group);
  if (!list.length) throw new Error(`ບໍ່ມີເຄື່ອງມືໃນກຸ່ມ ${group}`);
  return `<div class="ai-tools">${list.map(toolCard).join('')}</div>`;
}

// ---------------------------------------------------------------- Toolbar ຈຳລອງ (ແຕະເພື່ອເບິ່ງ)

export function toolbarHtml() {
  let prev = null;
  const btns = TOOLS.map((t) => {
    const g = GROUPS[t.group];
    const sep = prev && prev !== t.group ? '<span class="ai-tb-sep" aria-hidden="true"></span>' : '';
    prev = t.group;
    return `${sep}<button class="ai-tbtn" type="button" data-tool="${t.id}" style="--g:${g.color}" aria-label="${esc(t.name)}" title="${esc(t.name)} (${esc(t.key)})">${aiIcon(t.icon)}${t.hidden ? '<i class="flyout" aria-hidden="true"></i>' : ''}</button>`;
  }).join('');
  const legend = Object.entries(GROUPS)
    .map(([k, g]) => `<span class="ai-chip" style="--g:${g.color}"><i></i>${esc(g.lo)}</span>`)
    .join('');
  return `<div class="ai-legend-chips">${legend}</div>
<div class="ai-explorer">
  <div class="ai-tb" role="toolbar" aria-label="Toolbar ຈຳລອງ">${btns}<span class="ai-tb-sep" aria-hidden="true"></span><button class="ai-tbtn ai-tb-fs" type="button" data-goto="sec-2-9" aria-label="Fill ແລະ Stroke"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="11" height="11" fill="#eee" stroke="#111"/><rect x="10" y="10" width="11" height="11" fill="none" stroke="#111" stroke-width="3.5"/><rect x="10" y="10" width="11" height="11" fill="none" stroke="#eee" stroke-width="1"/></svg></button></div>
  <div class="ai-detail" aria-live="polite">
    <div class="ai-detail-empty">
      <p class="ai-detail-hand">👈</p>
      <p><b>ແຕະໄອຄອນໃນ Toolbar</b> ເພື່ອເບິ່ງຊື່ເຄື່ອງມື, ຄີລັດ, ໜ້າທີ່ ແລະ ເຄື່ອງມືທີ່ຊ່ອນຢູ່</p>
      <p class="ai-detail-tip">ສາມຫຼ່ຽມນ້ອຍຢູ່ມຸມໄອຄອນ = ມີເຄື່ອງມືຊ່ອນຢູ່ກຸ່ມດຽວກັນ (ໃນໂປຣແກຣມຈິງ ກົດຄ້າງ ຫຼື ຄລິກຂວາ ເພື່ອເປີດ)</p>
    </div>
  </div>
</div>`;
}

// ---------------------------------------------------------------- ໜ້າຈໍລວມ (Workspace) ແບບ SVG

const WS = [
  { k: 1, c: '#f97316', x: 2, y: 2, w: 996, h: 32, bx: 990, by: 18, t: 'Menu Bar (ແຖບເມນູ)', d: 'ເມນູຄຳສັ່ງທັງໝົດ: File, Edit, Object, Type, Select, Effect, View, Window, Help' },
  { k: 2, c: '#eab308', x: 48, y: 36, w: 712, h: 24, bx: 752, by: 48, t: 'Document Tab (ແຖບຊື່ໄຟລ໌)', d: 'ສະແດງຊື່ໄຟລ໌, % ການຊູມ, ໂໝດສີ (CMYK/RGB) ແລະ ໂໝດມຸມມອງ · ເປີດຫຼາຍໄຟລ໌ໄດ້ເປັນແທັບ' },
  { k: 3, c: '#3b82f6', x: 2, y: 62, w: 44, h: 554, bx: 24, by: 74, t: 'Toolbar (ແຖບເຄື່ອງມື)', d: 'ເຄື່ອງມືວາດ, ເລືອກ, ພິມ, ທາສີ ແລະ ປັບແຕ່ງ · ເປີດ/ປິດ ທີ່ Window > Toolbars' },
  { k: 4, c: '#22c55e', x: 196, y: 120, w: 420, h: 380, bx: 206, by: 132, t: 'Artboard (ໜ້າເຈ້ຍ)', d: 'ພື້ນທີ່ສີຂາວ — ສະເພາະວັດຖຸທີ່ຢູ່ໃນ Artboard ເທົ່ານັ້ນທີ່ຖືກພິມ ຫຼື export · 1 ໄຟລ໌ມີຫຼາຍ Artboard ໄດ້' },
  { k: 5, c: '#14b8a6', x: 50, y: 64, w: 706, h: 548, bx: 66, by: 588, t: 'Canvas / Pasteboard (ພື້ນທີ່ອ້ອມຂ້າງ)', d: 'ພື້ນທີ່ສີເທົາອ້ອມ Artboard — ວາງວັດຖຸພັກໄວ້ໄດ້ ແຕ່ບໍ່ຖືກພິມ ຫຼື export' },
  { k: 6, c: '#ec4899', x: 318, y: 440, w: 236, h: 34, bx: 562, by: 457, t: 'Contextual Task Bar', d: 'ແຖບລອຍໃກ້ວັດຖຸທີ່ເລືອກ — ລວມຄຳສັ່ງທີ່ໃຊ້ຕໍ່ເລື້ອຍ (ໃໝ່ໃນ Illustrator 2025) · ເປີດ/ປິດ ທີ່ Window > Contextual Task Bar' },
  { k: 7, c: '#a855f7', x: 762, y: 36, w: 236, h: 580, bx: 774, by: 76, t: 'Panels / Properties (ແຜງຄວບຄຸມ)', d: 'Properties ສະແດງຄ່າຂອງວັດຖຸທີ່ເລືອກ (ຂະໜາດ, ສີ, ເສັ້ນ) · ແທັບອື່ນເຊັ່ນ Layers · ເປີດ panel ອື່ນທີ່ເມນູ Window' },
  { k: 8, c: '#94a3b8', x: 48, y: 616, w: 712, h: 22, bx: 752, by: 627, t: 'Status Bar (ແຖບສະຖານະ)', d: 'ສະແດງ % ຊູມ, ມຸມໝູນມຸມມອງ, ເລກ Artboard (ກົດ ◀ ▶ ເພື່ອປ່ຽນໜ້າ) ແລະ ຊື່ເຄື່ອງມືທີ່ກຳລັງໃຊ້' },
];

export function workspaceHtml() {
  const menus = ['File', 'Edit', 'Object', 'Type', 'Select', 'Effect', 'View', 'Window', 'Help'];
  let mx = 18;
  const menuText = menus
    .map((m) => {
      const s = `<text x="${mx}" y="23" class="ws-t">${m}</text>`;
      mx += m.length * 8 + 22;
      return s;
    })
    .join('');
  const tbIcons = TOOLS.slice(0, 22)
    .map((t, i) => `<svg x="13" y="${70 + i * 24.5}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[t.icon]}</svg>`)
    .join('');
  const regions = WS.map(
    (r) => `<g class="hs" data-hs="${r.k}" style="--c:${r.c}" tabindex="0" role="button" aria-label="${r.k}. ${esc(r.t)}">
      <rect class="hs-r" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="4"/>
      <circle class="hs-b" cx="${r.bx}" cy="${r.by}" r="11"/><text class="hs-n" x="${r.bx}" y="${r.by + 4.5}">${r.k}</text>
    </g>`,
  ).join('');
  const svg = `<svg class="ws-svg" viewBox="0 0 1000 640" role="img" aria-label="ໜ້າຈໍຈຳລອງ Adobe Illustrator 2025">
  <rect width="1000" height="640" fill="#1d1d1d"/>
  <rect width="1000" height="34" fill="#323232"/>
  ${menuText}
  <rect x="842" y="7" width="66" height="20" rx="10" fill="#2f6fe6"/><text x="875" y="21" class="ws-t" text-anchor="middle" fill="#fff">Share</text>
  <circle cx="930" cy="17" r="7" fill="none" stroke="#bbb" stroke-width="1.6"/><path d="M935 22l4 4" stroke="#bbb" stroke-width="1.6"/>
  <rect y="34" width="1000" height="28" fill="#262626"/>
  <rect x="48" y="36" width="300" height="26" fill="#1d1d1d"/>
  <text x="60" y="53" class="ws-s">ໂລໂກ້.ai @ 66 % (CMYK/Preview)</text><text x="332" y="53" class="ws-s">×</text>
  <rect y="62" width="46" height="554" fill="#323232"/>
  ${tbIcons}
  <rect x="11" y="612" width="0" height="0"/>
  <rect x="46" y="62" width="714" height="554" fill="#1d1d1d"/>
  <rect x="196" y="120" width="420" height="380" fill="#ffffff"/>
  <text x="200" y="114" class="ws-s" fill="#9a9a9a">01 - Artboard 1</text>
  <circle cx="406" cy="282" r="78" fill="#2f5bea"/>
  <path d="M370 300c18-60 54-60 72 0" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
  <text x="406" y="400" text-anchor="middle" font-size="30" font-weight="700" font-family="sans-serif" fill="#1d1d1d">LOGO</text>
  <rect x="326" y="202" width="160" height="160" fill="none" stroke="#3b9cff" stroke-width="1.2"/>
  ${[[326, 202], [406, 202], [486, 202], [326, 282], [486, 282], [326, 362], [406, 362], [486, 362]].map(([x, y]) => `<rect x="${x - 3.5}" y="${y - 3.5}" width="7" height="7" fill="#fff" stroke="#3b9cff"/>`).join('')}
  <rect x="318" y="440" width="236" height="34" rx="17" fill="#323232" stroke="#4a4a4a"/>
  <text x="340" y="462" class="ws-s">Recolor</text><text x="410" y="462" class="ws-s">Duplicate</text><text x="488" y="462" class="ws-s">Lock</text><text x="528" y="462" class="ws-s">•••</text>
  <rect x="760" y="34" width="240" height="582" fill="#323232"/>
  <text x="776" y="54" class="ws-t" fill="#fff">Properties</text><text x="862" y="54" class="ws-s">Layers</text><text x="920" y="54" class="ws-s">Libraries</text>
  <rect x="770" y="60" width="78" height="2" fill="#fff"/>
  <text x="776" y="96" class="ws-s" fill="#9a9a9a">Path</text>
  <text x="776" y="124" class="ws-t" fill="#e5e5e5">Transform</text>
  <text x="776" y="148" class="ws-s">X: 320 px</text><text x="880" y="148" class="ws-s">Y: 240 px</text>
  <text x="776" y="170" class="ws-s">W: 160 px</text><text x="880" y="170" class="ws-s">H: 160 px</text>
  <text x="776" y="208" class="ws-t" fill="#e5e5e5">Appearance</text>
  <rect x="776" y="220" width="16" height="16" fill="#2f5bea"/><text x="800" y="233" class="ws-s">Fill</text>
  <rect x="776" y="244" width="16" height="16" fill="none" stroke="#bbb" stroke-width="3"/><text x="800" y="257" class="ws-s">Stroke  1 pt</text>
  <text x="776" y="282" class="ws-s">Opacity  100 %</text>
  <text x="776" y="320" class="ws-t" fill="#e5e5e5">Quick Actions</text>
  <rect x="776" y="332" width="100" height="26" rx="4" fill="#3d3d3d"/><text x="826" y="349" class="ws-s" text-anchor="middle">Offset Path</text>
  <rect x="884" y="332" width="100" height="26" rx="4" fill="#3d3d3d"/><text x="934" y="349" class="ws-s" text-anchor="middle">Recolor</text>
  <rect x="46" y="616" width="714" height="24" fill="#262626"/>
  <text x="60" y="632" class="ws-s">66 %</text><text x="116" y="632" class="ws-s">0°</text><text x="160" y="632" class="ws-s">◀  1  ▶</text><text x="240" y="632" class="ws-s">Selection</text>
  ${regions}
</svg>`;
  const legend = WS.map(
    (r) => `<li class="hs-item" data-hs="${r.k}" style="--c:${r.c}" tabindex="0" role="button"><span class="lg-n">${r.k}</span><div><b>${esc(r.t)}</b><span>${esc(r.d)}</span></div></li>`,
  ).join('');
  return `<figure class="ai-fig hs-fig"><div class="ws-wrap">${svg}</div><figcaption>ແຕະໝາຍເລກ ຫຼື ລາຍການຂ້າງລຸ່ມ ເພື່ອໄຮໄລທ໌ສ່ວນນັ້ນ · ໜ້າຈໍຈຳລອງຂອງ Workspace ແບບ Essentials</figcaption><ol class="ai-legend hs-list">${legend}</ol></figure>`;
}

// ---------------------------------------------------------------- Panels ຈຳລອງ

function panel(title, body, notes, colors) {
  const c = colors || ['#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#ef4444', '#94a3b8', '#84cc16', '#06b6d4', '#f43f5e'];
  const html = body.replace(/\{(\d+)\}/g, (_, n) => `<span class="pn" style="--c:${c[(n - 1) % c.length]}">${n}</span>`);
  return `<div class="ai-panel-wrap"><div class="aip"><div class="aip-tab">${esc(title)}<span>≡</span></div><div class="aip-body">${html}</div></div><ol class="ai-legend">${notes
    .map(([t, d], i) => `<li style="--c:${c[i % c.length]}"><span class="lg-n">${i + 1}</span><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`)
    .join('')}</ol></div>`;
}

const eye = '<svg viewBox="0 0 24 24" class="aip-i"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>';
const lock = '<svg viewBox="0 0 24 24" class="aip-i"><rect x="6" y="11" width="12" height="9" rx="1.5" fill="currentColor"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

function pfIcon(kind) {
  // ໄອຄອນ Pathfinder: ສີ່ຫຼ່ຽມ 2 ອັນຊ້ອນກັນ
  const a = 'M3 3h11v11H3z';
  const b = 'M9 9h11v11H9z';
  const map = {
    unite: `<path d="M3 3h11v6h6v11H9v-6H3z" fill="currentColor"/>`,
    minus: `<path d="M3 3h11v6H9v5H3z" fill="currentColor"/><path d="${b}" fill="none" stroke="currentColor" stroke-dasharray="2 2"/>`,
    intersect: `<path d="${a}" fill="none" stroke="currentColor" stroke-dasharray="2 2"/><path d="${b}" fill="none" stroke="currentColor" stroke-dasharray="2 2"/><path d="M9 9h5v5H9z" fill="currentColor"/>`,
    exclude: `<path d="M3 3h11v6H9v5H3z" fill="currentColor"/><path d="M14 9h6v11H9v-6h5z" fill="currentColor"/>`,
    divide: `<path d="M3 3h11v6H9v5H3z" fill="currentColor"/><path d="M9 9h5v5H9z" fill="currentColor" opacity=".55"/><path d="M14 9h6v11H9v-6h5z" fill="currentColor" opacity=".8"/>`,
    trim: `<path d="M3 3h11v6H9v5H3z" fill="currentColor" opacity=".55"/><path d="${b}" fill="currentColor"/>`,
    merge: `<path d="M3 3h11v6H9v5H3z" fill="currentColor" opacity=".55"/><path d="${b}" fill="currentColor"/>`,
    crop: `<path d="M9 9h5v5H9z" fill="currentColor"/><path d="${b}" fill="none" stroke="currentColor" stroke-dasharray="2 2"/>`,
    outline: `<path d="${a}" fill="none" stroke="currentColor"/><path d="${b}" fill="none" stroke="currentColor"/>`,
    minusback: `<path d="${a}" fill="none" stroke="currentColor" stroke-dasharray="2 2"/><path d="M14 9h6v11H9v-6h5z" fill="currentColor"/>`,
  };
  return `<svg viewBox="0 0 23 23" class="aip-pf">${map[kind]}</svg>`;
}

function alIcon(kind) {
  const m = {
    left: '<path d="M4 3v18"/><rect x="6" y="6" width="12" height="4"/><rect x="6" y="14" width="7" height="4"/>',
    hcenter: '<path d="M12 3v18"/><rect x="5" y="6" width="14" height="4"/><rect x="8" y="14" width="8" height="4"/>',
    right: '<path d="M20 3v18"/><rect x="6" y="6" width="12" height="4"/><rect x="11" y="14" width="7" height="4"/>',
    top: '<path d="M3 4h18"/><rect x="6" y="6" width="4" height="12"/><rect x="14" y="6" width="4" height="7"/>',
    vcenter: '<path d="M3 12h18"/><rect x="6" y="5" width="4" height="14"/><rect x="14" y="8" width="4" height="8"/>',
    bottom: '<path d="M3 20h18"/><rect x="6" y="6" width="4" height="12"/><rect x="14" y="11" width="4" height="7"/>',
    dist: '<rect x="3" y="7" width="4" height="10"/><rect x="10" y="7" width="4" height="10"/><rect x="17" y="7" width="4" height="10"/><path d="M7 4h3M14 4h3"/>',
  };
  return `<svg viewBox="0 0 24 24" class="aip-al" fill="none" stroke="currentColor" stroke-width="1.6">${m[kind]}</svg>`;
}

export const PANELS = {
  layers: () =>
    panel(
      'Layers  (F7)',
      `<div class="aip-row"><span class="aip-eye">{1}${eye}</span><span class="aip-lock">{2}</span><span class="aip-sw" style="background:#3b82f6"></span><b>▾ Layer 2</b>{3}<span class="aip-tgt">○{4}</span></div>
       <div class="aip-row sub"><span class="aip-eye">${eye}</span><span class="aip-lock"></span><span class="aip-sw" style="background:#3b82f6"></span>&lt;Path&gt;<span class="aip-tgt">○</span></div>
       <div class="aip-row sub"><span class="aip-eye">${eye}</span><span class="aip-lock"></span><span class="aip-sw" style="background:#3b82f6"></span>&lt;Group&gt;<span class="aip-tgt">○</span></div>
       <div class="aip-row"><span class="aip-eye">${eye}</span><span class="aip-lock">${lock}</span><span class="aip-sw" style="background:#ef4444"></span><b>▸ Layer 1</b><span class="aip-tgt">○</span></div>
       <div class="aip-foot">2 Layers <span class="aip-btns">⌕{5} ▣{6} ⊞{7} ⊕{8} 🗑{9}</span></div>`,
      [
        ['ຮູບຕາ (Visibility)', 'ຄລິກເພື່ອ ເຊື່ອງ / ສະແດງ Layer ນັ້ນ'],
        ['ຮູບກະແຈ (Lock)', 'ລັອກ Layer — ເລືອກ ຫຼື ແກ້ໄຂວັດຖຸໃນ Layer ນັ້ນບໍ່ໄດ້ (ກັນແກ້ຜິດ)'],
        ['ຊື່ Layer ແລະ ລູກສອນ ▾', 'ດັບເບີ້ນຄລິກເພື່ອປ່ຽນຊື່ · ລູກສອນເປີດເບິ່ງວັດຖຸຍ່ອຍ (Sublayer) ຂ້າງໃນ'],
        ['ວົງມົນ (Target)', 'ຄລິກເພື່ອເລືອກວັດຖຸທັງໝົດໃນ Layer — ສີ່ຫຼ່ຽມສີທາງຂວາ = ມີວັດຖຸຖືກເລືອກ'],
        ['Locate Object', 'ຊອກຫາວັດຖຸທີ່ເລືອກຢູ່ ວ່າຢູ່ Layer ໃດ'],
        ['Make / Release Clipping Mask', 'ສ້າງ ຫຼື ຍົກເລີກ Clipping Mask ໃຫ້ທັງ Layer'],
        ['Create New Sublayer', 'ສ້າງ Layer ຍ່ອຍພາຍໃນ Layer ທີ່ເລືອກ'],
        ['Create New Layer', 'ສ້າງ Layer ໃໝ່'],
        ['Delete', 'ລຶບ Layer ຫຼື ວັດຖຸທີ່ເລືອກ'],
      ],
    ),
  swatches: () =>
    panel(
      'Swatches',
      `<div class="aip-grid">{1}<span class="none"></span><span style="background:#fff"></span><span style="background:#000"></span><span class="reg">⊕</span>{2}${['#e11d48', '#f97316', '#facc15', '#22c55e', '#06b6d4', '#2563eb', '#7c3aed', '#db2777'].map((c) => `<span style="background:${c}"></span>`).join('')}<span class="global" style="background:#0ea5e9"></span>{3}<span class="grad"></span>{4}</div>
       <div class="aip-folder">📁 Color Group 1 {5}</div><div class="aip-grid">${['#fde68a', '#fca5a5', '#93c5fd', '#86efac'].map((c) => `<span style="background:${c}"></span>`).join('')}</div>
       <div class="aip-foot">Libraries{6} <span class="aip-btns">📁{7} ⊕{8} 🗑</span></div>`,
      [
        ['None', 'ສີ່ຫຼ່ຽມຂາວມີເສັ້ນແດງ = ບໍ່ມີສີ (ໃຊ້ກັບ Fill ຫຼື Stroke)'],
        ['Registration (⊕)', 'ສີພິເສດທີ່ພິມອອກທຸກແມ່ພິມ (C, M, Y, K) — ໃຊ້ສຳລັບເຄື່ອງໝາຍຕັດ (crop marks) ເທົ່ານັ້ນ'],
        ['Global Swatch', 'ສີທີ່ມີສາມຫຼ່ຽມຂາວຢູ່ມຸມ — ແກ້ສີ swatch 1 ຄັ້ງ ວັດຖຸທຸກອັນທີ່ໃຊ້ສີນີ້ປ່ຽນຕາມໝົດ'],
        ['Gradient Swatch', 'ເກັບສີໄລ່ໄວ້ໃຊ້ຊ້ຳ'],
        ['Color Group', 'ໂຟນເດີຈັດກຸ່ມສີ ເຊັ່ນ ສີຂອງແບຣນ'],
        ['Swatch Libraries', 'ເປີດຄັງສີສຳເລັດຮູບ ລວມທັງ Pantone (spot color)'],
        ['New Color Group', 'ສ້າງກຸ່ມສີໃໝ່'],
        ['New Swatch', 'ບັນທຶກສີທີ່ກຳລັງໃຊ້ເປັນ swatch ໃໝ່'],
      ],
    ),
  stroke: () =>
    panel(
      'Stroke  (Ctrl+F10)',
      `<div class="aip-f">Weight {1}<span class="aip-in">1 pt ▾</span></div>
       <div class="aip-f">Cap {2}<span class="aip-seg"><i>▌</i><i>◖</i><i>▐▌</i></span></div>
       <div class="aip-f">Corner {3}<span class="aip-seg"><i>⌐</i><i>╭</i><i>◸</i></span> Limit 10 x</div>
       <div class="aip-f">Align Stroke {4}<span class="aip-seg"><i>Center</i><i>Inside</i><i>Outside</i></span></div>
       <div class="aip-f"><span class="aip-cb">☑</span> Dashed Line {5}<span class="aip-in sm">dash 12</span><span class="aip-in sm">gap 6</span></div>
       <div class="aip-f">Arrowheads {6}<span class="aip-in">— ▾</span><span class="aip-in">→ ▾</span></div>
       <div class="aip-f">Profile {7}<span class="aip-in">Uniform ▾</span></div>`,
      [
        ['Weight', 'ຄວາມໜາຂອງເສັ້ນ (ໜ່ວຍ pt)'],
        ['Cap (ປາຍເສັ້ນ)', 'Butt = ຕັດປາຍຕົງ · Round = ປາຍມົນ · Projecting = ປາຍຕົງຍື່ນອອກເທົ່າເຄິ່ງຄວາມໜາ'],
        ['Corner (ມຸມເສັ້ນ)', 'Miter = ມຸມແຫຼມ · Round = ມຸມມົນ · Bevel = ມຸມຕັດ'],
        ['Align Stroke', 'ເສັ້ນຢູ່ ກາງ / ພາຍໃນ / ພາຍນອກ ຂອບຂອງຮູບຮ່າງ'],
        ['Dashed Line', 'ເຮັດເປັນເສັ້ນປະ — dash = ຄວາມຍາວຂີດ, gap = ຊ່ອງຫວ່າງ'],
        ['Arrowheads', 'ໃສ່ຫົວລູກສອນທີ່ປາຍເສັ້ນ'],
        ['Profile', 'ຮູບແບບຄວາມໜາ-ບາງ ຂອງເສັ້ນ (ຄ້າຍ Width Tool)'],
      ],
    ),
  align: () =>
    panel(
      'Align  (Shift+F7)',
      `<div class="aip-lbl">Align Objects {1}</div><div class="aip-ic-row">${['left', 'hcenter', 'right', 'top', 'vcenter', 'bottom'].map(alIcon).join('')}</div>
       <div class="aip-lbl">Distribute Objects {2}</div><div class="aip-ic-row">${Array(6).fill(alIcon('dist')).join('')}</div>
       <div class="aip-lbl">Distribute Spacing {3}</div><div class="aip-ic-row">${alIcon('dist')}${alIcon('dist')}<span class="aip-in sm">0 px</span></div>
       <div class="aip-lbl">Align To {4}</div><div class="aip-ic-row"><span class="aip-in">Align to Selection ▾</span></div>`,
      [
        ['Align Objects (ຈັດແນວ)', 'ຈັດວັດຖຸໃຫ້ຊິດ ຊ້າຍ / ກາງ / ຂວາ (ແນວນອນ) ແລະ ເທິງ / ກາງ / ລຸ່ມ (ແນວຕັ້ງ)'],
        ['Distribute Objects (ກະຈາຍ)', 'ກະຈາຍວັດຖຸໃຫ້ຈຸດອ້າງອີງ (ຂອບ ຫຼື ກາງ) ຫ່າງເທົ່າກັນ'],
        ['Distribute Spacing', 'ຈັດໃຫ້ຊ່ອງຫວ່າງລະຫວ່າງວັດຖຸເທົ່າກັນ ຫຼື ກຳນົດໄລຍະເປັນຕົວເລກ'],
        ['Align To', 'ຈັດແນວອີງໃສ່: ກຸ່ມທີ່ເລືອກ (Selection) / ວັດຖຸຫຼັກ (Key Object) / ໜ້າ Artboard'],
      ],
    ),
  pathfinder: () => {
    const sm = [['unite', 'Unite'], ['minus', 'Minus Front'], ['intersect', 'Intersect'], ['exclude', 'Exclude']];
    const pf = [['divide', 'Divide'], ['trim', 'Trim'], ['merge', 'Merge'], ['crop', 'Crop'], ['outline', 'Outline'], ['minusback', 'Minus Back']];
    const cell = ([k, n], i) => `<span class="aip-pfc">${pfIcon(k)}<small>${n}</small>{${i}}</span>`;
    return panel(
      'Pathfinder  (Shift+Ctrl+F9)',
      `<div class="aip-lbl">Shape Modes</div><div class="aip-pf-row">${sm.map((x, i) => cell(x, i + 1)).join('')}<span class="aip-in sm">Expand</span></div>
       <div class="aip-lbl">Pathfinders</div><div class="aip-pf-row">${pf.map((x, i) => cell(x, i + 5)).join('')}</div>`,
      [
        ['Unite (ລວມ)', 'ລວມຮູບທີ່ຊ້ອນກັນເປັນຮູບດຽວ'],
        ['Minus Front (ລົບດ້ວຍຮູບໜ້າ)', 'ເອົາຮູບທີ່ຢູ່ໜ້າໄປເຈາະຮູບທີ່ຢູ່ຫຼັງ'],
        ['Intersect (ສ່ວນທີ່ທັບກັນ)', 'ເຫຼືອແຕ່ພື້ນທີ່ທີ່ທັບກັນ'],
        ['Exclude (ຕັດສ່ວນທັບອອກ)', 'ລຶບພື້ນທີ່ທີ່ທັບກັນ ເຫຼືອສ່ວນທີ່ບໍ່ທັບ'],
        ['Divide (ແບ່ງ)', 'ແບ່ງເປັນຊິ້ນໆ ຕາມເສັ້ນທີ່ຕັດກັນ'],
        ['Trim (ຕັດສ່ວນທີ່ຖືກບັງ)', 'ລຶບສ່ວນທີ່ຖືກວັດຖຸອື່ນບັງ ແລະ ລຶບ stroke'],
        ['Merge (ຕັດ + ລວມສີດຽວກັນ)', 'ຄື Trim ແຕ່ລວມຮູບທີ່ມີສີດຽວກັນເຂົ້າກັນ'],
        ['Crop (ຄອບ)', 'ໃຊ້ຮູບເທິງສຸດເປັນກອບ ຕັດສ່ວນທີ່ຢູ່ນອກກອບອອກ'],
        ['Outline (ເຫຼືອແຕ່ເສັ້ນ)', 'ແປງເປັນເສັ້ນຂອບ ແບ່ງຕາມຈຸດຕັດ'],
        ['Minus Back (ລົບດ້ວຍຮູບຫຼັງ)', 'ເອົາຮູບທີ່ຢູ່ຫຼັງໄປເຈາະຮູບທີ່ຢູ່ໜ້າ'],
      ],
    );
  },
  character: () =>
    panel(
      'Character  (Ctrl+T)',
      `<div class="aip-f">{1}<span class="aip-in wide">Noto Sans Lao ▾</span></div>
       <div class="aip-f">{2}<span class="aip-in wide">Regular ▾</span></div>
       <div class="aip-f2"><span>{3} <b>T</b> 12 pt</span><span>{4} <b>A↕</b> 14.4 pt</span></div>
       <div class="aip-f2"><span>{5} <b>V|A</b> Auto</span><span>{6} <b>VA↔</b> 0</span></div>
       <div class="aip-f2"><span>{7} <b>↕T</b> 100 %</span><span>{8} <b>T↔</b> 100 %</span></div>
       <div class="aip-f2"><span>{9} <b>Aª</b> 0 pt</span><span>{10} <b>↻T</b> 0°</span></div>`,
      [
        ['Font Family', 'ເລືອກຟອນ'],
        ['Font Style', 'ຄວາມໜາ / ແບບຕົວອຽງ ເຊັ່ນ Regular, Bold, Italic'],
        ['Font Size', 'ຂະໜາດຕົວອັກສອນ (pt)'],
        ['Leading', 'ໄລຍະຫ່າງລະຫວ່າງແຖວ'],
        ['Kerning', 'ໄລຍະຫ່າງລະຫວ່າງຕົວອັກສອນ 2 ຕົວທີ່ຢູ່ຕິດກັນ (ຄູ່ດຽວ)'],
        ['Tracking', 'ໄລຍະຫ່າງຂອງຕົວອັກສອນທັງຄຳ ຫຼື ທັງແຖວ'],
        ['Vertical Scale', 'ຢືດຕົວອັກສອນແນວຕັ້ງ'],
        ['Horizontal Scale', 'ຢືດຕົວອັກສອນແນວນອນ'],
        ['Baseline Shift', 'ຍົກ ຫຼື ລົດ ຕົວອັກສອນຈາກເສັ້ນຖານ (ເຊັ່ນ ຕົວຍົກກຳລັງ)'],
        ['Character Rotation', 'ໝູນຕົວອັກສອນແຕ່ລະຕົວ'],
      ],
    ),
};

export function panelHtml(name) {
  const fn = PANELS[name];
  if (!fn) throw new Error(`ບໍ່ພົບ panel: ${name}`);
  return fn();
}

// ---------------------------------------------------------------- ເມນູຫຼັກ

const MENUS = [
  ['File', 'ຈັດການໄຟລ໌', [['New', 'Ctrl+N'], ['Open', 'Ctrl+O'], ['Save', 'Ctrl+S'], ['Save As', 'Shift+Ctrl+S'], ['Place (ນຳຮູບເຂົ້າ)', 'Shift+Ctrl+P'], ['Export > Export for Screens', 'Alt+Ctrl+E'], ['Export > Export As (PNG, JPG, SVG…)', ''], ['Package (ລວມໄຟລ໌ + ຮູບ + ຟອນ)', ''], ['Document Setup', 'Alt+Ctrl+P'], ['Print', 'Ctrl+P']]],
  ['Edit', 'ແກ້ໄຂ ແລະ ຕັ້ງຄ່າ', [['Undo / Redo', 'Ctrl+Z / Shift+Ctrl+Z'], ['Cut / Copy / Paste', 'Ctrl+X / C / V'], ['Paste in Front', 'Ctrl+F'], ['Paste in Back', 'Ctrl+B'], ['Paste in Place', 'Shift+Ctrl+V'], ['Edit Colors > Recolor Artwork', ''], ['Keyboard Shortcuts', 'Alt+Shift+Ctrl+K'], ['Preferences', 'Ctrl+K']]],
  ['Object', 'ຈັດການວັດຖຸ', [['Transform > Transform Again', 'Ctrl+D'], ['Arrange > Bring to Front / Send to Back', 'Shift+Ctrl+] / ['], ['Group / Ungroup', 'Ctrl+G / Shift+Ctrl+G'], ['Lock / Unlock All', 'Ctrl+2 / Alt+Ctrl+2'], ['Hide / Show All', 'Ctrl+3 / Alt+Ctrl+3'], ['Expand / Expand Appearance', ''], ['Path > Join / Offset Path', 'Ctrl+J'], ['Blend > Make', 'Alt+Ctrl+B'], ['Clipping Mask > Make / Release', 'Ctrl+7 / Alt+Ctrl+7'], ['Compound Path > Make', 'Ctrl+8'], ['Image Trace > Make', '']]],
  ['Type', 'ຕົວອັກສອນ', [['Font / Size', ''], ['Glyphs (ຕົວອັກສອນພິເສດ)', ''], ['Type on a Path', ''], ['Create Outlines', 'Shift+Ctrl+O'], ['Find Font / Change Case', '']]],
  ['Select', 'ການເລືອກ', [['All', 'Ctrl+A'], ['Deselect', 'Shift+Ctrl+A'], ['Inverse (ເລືອກກົງກັນຂ້າມ)', ''], ['Same > Fill Color / Stroke Color', ''], ['Save Selection', '']]],
  ['Effect', 'ເອັບເຟັກ (ແກ້ກັບຄືນໄດ້ໃນ Appearance)', [['3D and Materials', ''], ['Distort & Transform', ''], ['Stylize > Drop Shadow / Round Corners', ''], ['Warp', ''], ['Photoshop Effects: Blur, Texture…', ''], ['Document Raster Effects Settings', '']]],
  ['View', 'ມຸມມອງ', [['Outline / Preview', 'Ctrl+Y'], ['Zoom In / Zoom Out', 'Ctrl++ / Ctrl+−'], ['Fit Artboard in Window', 'Ctrl+0'], ['Actual Size (100%)', 'Ctrl+1'], ['Rulers', 'Ctrl+R'], ['Guides', 'Ctrl+;'], ['Smart Guides', 'Ctrl+U'], ['Show Grid', 'Ctrl+"']]],
  ['Window', 'ເປີດ / ປິດ Panel', [['Workspace > Essentials / Reset', ''], ['Toolbars > Advanced', ''], ['Layers / Color / Swatches / Stroke …', 'F7 / F6 / – / Ctrl+F10'], ['Properties / Contextual Task Bar', '']]],
  ['Help', 'ຊ່ວຍເຫຼືອ', [['Illustrator Help', 'F1'], ['Updates / What\'s New', '']]],
];

export function menusHtml() {
  const strip = MENUS.map(([m], i) => `<a class="mn" href="#menu-${m.toLowerCase()}" style="--c:hsl(${i * 40} 80% 60%)">${m}</a>`).join('');
  const cards = MENUS.map(
    ([m, lo, items], i) => `<section class="mn-card" id="menu-${m.toLowerCase()}" style="--c:hsl(${i * 40} 80% 60%)">
  <h4><span>${m}</span>${esc(lo)}</h4>
  <ul>${items.map(([n, k]) => `<li><span>${esc(n)}</span>${k ? `<code>${esc(k)}</code>` : ''}</li>`).join('')}</ul>
</section>`,
  ).join('');
  return `<div class="mn-strip" role="navigation" aria-label="ເມນູ Illustrator">${strip}</div><div class="mn-grid">${cards}</div>`;
}

// ---------------------------------------------------------------- ໜ້າຕ່າງ New Document

export function newDocHtml() {
  const body = `<div class="nd">
  <div class="nd-top"><b>New Document</b><span class="nd-x">×</span></div>
  <div class="nd-tabs">{1}<span>Recent</span><span>Saved</span><span>Mobile</span><span>Web</span><span class="on">Print</span><span>Film &amp; Video</span><span>Art &amp; Illustration</span></div>
  <div class="nd-main">
    <div class="nd-presets">{2}<div class="nd-card on"><i></i>A4<small>210 x 297 mm</small></div><div class="nd-card"><i></i>Letter<small>612 x 792 pt</small></div><div class="nd-card"><i></i>Postcard<small>288 x 560 pt</small></div><div class="nd-card"><i></i>A3<small>297 x 420 mm</small></div></div>
    <div class="nd-details">
      <div class="nd-h">PRESET DETAILS</div>
      <div class="nd-f">{3}<span class="aip-in wide">Untitled-1</span></div>
      <div class="nd-f2"><span>{4} Width <span class="aip-in">210 mm</span></span><span>{5} <span class="aip-in">Millimeters ▾</span></span></div>
      <div class="nd-f2"><span>Height <span class="aip-in">297 mm</span></span><span>{6} ▯ ▭</span></div>
      <div class="nd-f">{7} Artboards <span class="aip-in sm">1</span></div>
      <div class="nd-f">{8} Bleed <span class="aip-in sm">3 mm</span><span class="aip-in sm">3 mm</span><span class="aip-in sm">3 mm</span><span class="aip-in sm">3 mm</span> 🔗</div>
      <div class="nd-h">▾ Advanced Options</div>
      <div class="nd-f">{9} Color Mode <span class="aip-in">CMYK Color ▾</span></div>
      <div class="nd-f">{10} Raster Effects <span class="aip-in">High (300 ppi) ▾</span></div>
      <div class="nd-f">{11} Preview Mode <span class="aip-in">Default ▾</span></div>
      <div class="nd-btns"><span class="nd-more">More Settings</span><span class="nd-close">Close</span><span class="nd-create">Create {12}</span></div>
    </div>
  </div>
</div>`;
  return panel(
    'File > New  (Ctrl+N)',
    body,
    [
      ['ແທັບປະເພດງານ', 'ເລືອກໝວດ: Mobile, Web, Print (ງານພິມ), Film & Video, Art & Illustration · ແຕ່ລະໝວດຕັ້ງໜ່ວຍ ແລະ ໂໝດສີໃຫ້ຕ່າງກັນ'],
      ['Blank Document Presets', 'ຂະໜາດສຳເລັດຮູບ ເຊັ່ນ A4, Letter, ຂະໜາດຈໍມືຖື'],
      ['Name', 'ຊື່ໄຟລ໌'],
      ['Width / Height', 'ຄວາມກວ້າງ / ຄວາມສູງ ຂອງ Artboard'],
      ['Units', 'ໜ່ວຍວັດ: Pixels (ເວັບ, ຈໍ), Millimeters / Inches / Points (ງານພິມ)'],
      ['Orientation', 'ແນວຕັ້ງ (Portrait) ຫຼື ແນວນອນ (Landscape)'],
      ['Artboards', 'ຈຳນວນໜ້າ Artboard ໃນໄຟລ໌'],
      ['Bleed (ລະຍະເກີນຂອບ)', 'ພື້ນທີ່ເກີນຂອບເຈ້ຍ ສຳລັບງານພິມ — ນິຍົມ 3 mm ທຸກດ້ານ ກັນຂອບຂາວຕອນຕັດ'],
      ['Color Mode', 'RGB = ງານຈໍ / ເວັບ · CMYK = ງານພິມ'],
      ['Raster Effects', 'ຄວາມລະອຽດຂອງເອັບເຟັກແບບ raster (ເງົາ, ມົວ): Screen 72 ppi · Medium 150 ppi · High 300 ppi (ງານພິມ)'],
      ['Preview Mode', 'ໂໝດສະແດງຜົນ: Default, Pixel, Overprint'],
      ['Create', 'ສ້າງໄຟລ໌ຕາມທີ່ຕັ້ງຄ່າ'],
    ],
  );
}

// ---------------------------------------------------------------- ແຜນພາບທິດສະດີ

export function vectorRasterHtml() {
  const px = [];
  const R = 9;
  for (let y = 0; y < 18; y++) for (let x = 0; x < 18; x++) {
    const d = Math.hypot(x - 8.5, y - 8.5);
    if (d < R - 0.3) px.push(`<rect x="${x * 10}" y="${y * 10}" width="10" height="10" fill="#2f5bea"/>`);
    else if (d < R + 0.6) px.push(`<rect x="${x * 10}" y="${y * 10}" width="10" height="10" fill="#93acf5"/>`);
  }
  return `<figure class="ai-fig vr">
  <div class="vr-box"><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="88" fill="#2f5bea"/><path d="M90 2a88 88 0 0 1 88 88" fill="none" stroke="#ffb547" stroke-width="2"/><rect x="86" y="-1" width="8" height="6" fill="#fff" stroke="#ffb547"/><rect x="175" y="86" width="6" height="8" fill="#fff" stroke="#ffb547"/></svg><b>Vector — ຊູມ 800%</b><span>ຂອບຍັງຄົມຊັດ ເພາະຄຳນວນຈາກ path ແລະ anchor point</span></div>
  <div class="vr-box"><svg viewBox="0 0 180 180" shape-rendering="crispEdges">${px.join('')}</svg><b>Raster — ຊູມ 800%</b><span>ເຫັນເປັນຕາລາງ pixel (ແຕກ) ເພາະເກັບເປັນຈຸດສີ</span></div>
  <figcaption>Illustrator = ໂປຣແກຣມ Vector · Photoshop = ໂປຣແກຣມ Raster (Bitmap)</figcaption>
</figure>`;
}

export function colorModesHtml() {
  return `<figure class="ai-fig vr">
  <div class="vr-box dark"><svg viewBox="0 0 180 170"><g style="mix-blend-mode:screen;isolation:isolate"><circle cx="90" cy="62" r="48" fill="#ff0000" style="mix-blend-mode:screen"/><circle cx="62" cy="108" r="48" fill="#00ff00" style="mix-blend-mode:screen"/><circle cx="118" cy="108" r="48" fill="#0000ff" style="mix-blend-mode:screen"/></g></svg><b>RGB — ສີຂອງແສງ (ບວກ)</b><span>Red + Green + Blue ລວມກັນ = ຂາວ · ໃຊ້ກັບໜ້າຈໍ, ເວັບ, ມືຖື, ວິດີໂອ</span></div>
  <div class="vr-box light"><svg viewBox="0 0 180 170"><g style="isolation:isolate"><circle cx="90" cy="62" r="48" fill="#00ffff" style="mix-blend-mode:multiply"/><circle cx="62" cy="108" r="48" fill="#ff00ff" style="mix-blend-mode:multiply"/><circle cx="118" cy="108" r="48" fill="#ffff00" style="mix-blend-mode:multiply"/></g></svg><b>CMYK — ສີຂອງໝຶກ (ລົບ)</b><span>Cyan + Magenta + Yellow (+ Key = ດຳ) · ໃຊ້ກັບງານພິມ</span></div>
  <figcaption>ຕັ້ງໂໝດສີໃຫ້ຖືກຕັ້ງແຕ່ສ້າງໄຟລ໌ · ປ່ຽນພາຍຫຼັງທີ່ File > Document Color Mode</figcaption>
</figure>`;
}

export function pathPartsHtml() {
  return `<figure class="ai-fig">
  <svg class="pp-svg" viewBox="0 0 420 220" role="img" aria-label="ສ່ວນປະກອບຂອງ path">
    <path d="M30 170 C 90 30, 190 30, 230 120 S 360 200, 390 70" fill="none" stroke="#2f5bea" stroke-width="3"/>
    <path d="M230 120 L 180 40 M230 120 L 280 200" stroke="#ff8a00" stroke-width="1.6"/>
    <circle cx="180" cy="40" r="5" fill="#ff8a00"/><circle cx="280" cy="200" r="5" fill="#ff8a00"/>
    <rect x="24" y="164" width="12" height="12" fill="#fff" stroke="#2f5bea" stroke-width="2"/>
    <rect x="224" y="114" width="12" height="12" fill="#2f5bea"/>
    <rect x="384" y="64" width="12" height="12" fill="#fff" stroke="#2f5bea" stroke-width="2"/>
    <g class="pp-l" font-family="sans-serif" font-size="13">
      <text x="10" y="200">① Anchor Point (ຈຸດຍຶດ)</text>
      <text x="236" y="112">② ຈຸດທີ່ເລືອກ (ທຶບ)</text>
      <text x="120" y="28">③ Handle / Direction Line</text>
      <text x="60" y="80">④ Segment</text>
      <text x="300" y="60">⑤ Open Path (ເສັ້ນເປີດ)</text>
    </g>
  </svg>
  <figcaption>Anchor Point ກຳນົດຕຳແໜ່ງ · Handle ກຳນົດຄວາມໂຄ້ງ · Segment = ເສັ້ນລະຫວ່າງ 2 ຈຸດ · Closed Path = ເສັ້ນທີ່ຈຸດທຳອິດ ແລະ ສຸດທ້າຍມາບັນຈົບກັນ</figcaption>
</figure>`;
}

// ---------------------------------------------------------------- ຝຶກຕອບ: ເຄື່ອງມືນີ້ຄືຫຍັງ

export function quizHtml() {
  const items = [];
  for (const t of TOOLS) {
    items.push({ icon: t.icon, name: t.name, key: t.key, lo: t.lo, use: t.use, g: GROUPS[t.group].color });
    for (const h of t.hidden || []) if (h.icon) items.push({ icon: h.icon, name: h.name, key: h.key || '', lo: h.lo, use: '', g: GROUPS[t.group].color });
  }
  return `<div class="qz-tools">
  <div class="qz-bar"><span class="qz-count">${items.length} ໄອຄອນ</span><button class="btn btn-sm qz-shuffle" type="button">🔀 ສັບລຳດັບ</button></div>
  <div class="qz-grid">${items
    .map(
      (it, i) => `<div class="qz-card" style="--g:${it.g}"><span class="qz-no">${i + 1}</span><div class="qz-ic">${aiIcon(it.icon)}</div><div class="answer" tabindex="0" role="button" aria-label="ແຕະເພື່ອເບິ່ງຄຳຕອບ"><b>${esc(it.name)}</b>${it.key ? `<code>${esc(it.key)}</code>` : ''}<span>${esc(it.lo)}</span></div></div>`,
    )
    .join('')}</div>
</div>`;
}

// ---------------------------------------------------------------- ຕົວກາງ: include → HTML

export function aiInclude(name) {
  const [kind, arg] = name.split(':');
  switch (kind) {
    case 'ai-workspace': return workspaceHtml();
    case 'ai-toolbar': return toolbarHtml();
    case 'ai-tools': return toolsGroupHtml(arg);
    case 'ai-fillstroke': return fillStrokeHtml();
    case 'ai-panel': return panelHtml(arg);
    case 'ai-menus': return menusHtml();
    case 'ai-newdoc': return newDocHtml();
    case 'ai-vector-raster': return vectorRasterHtml();
    case 'ai-color-modes': return colorModesHtml();
    case 'ai-path-parts': return pathPartsHtml();
    case 'ai-quiz': return quizHtml();
    default: return null;
  }
}
