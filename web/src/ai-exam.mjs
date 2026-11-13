// ຊຸດຂໍ້ສອບລອງທຳ Adobe Illustrator 2025
// a = ດັດຊະນີຄຳຕອບທີ່ຖືກ (ເລີ່ມຈາກ 0) · ref = ຫົວຂໍ້ໃນບົດຮຽນ /illustrator/ ທີ່ອະທິບາຍເລື່ອງນີ້
import { aiIcon } from './illustrator.mjs';
import { makeExam } from './exam-kit.mjs';

export const MCQ = [
  { q: 'Adobe Illustrator ເປັນໂປຣແກຣມອອກແບບປະເພດໃດ?', o: ['ກຣາບຟິກແບບ Vector', 'ແຕ່ງຮູບແບບ Raster (Pixel)', 'ຕັດຕໍ່ວິດີໂອ', 'ຈັດການຖານຂໍ້ມູນ'], a: 0, e: 'Illustrator ເປັນໂປຣແກຣມ Vector — ຮູບສ້າງຈາກ path ແລະ anchor point ຂະຫຍາຍບໍ່ແຕກ', ref: 'sec-6-1' },
  { q: 'ຂໍ້ໃດແມ່ນຂໍ້ດີຂອງພາບແບບ Vector?', o: ['ຂະຫຍາຍເທົ່າໃດກໍບໍ່ແຕກ', 'ເກັບເປັນຈຸດ Pixel', 'ເໝາະທີ່ສຸດກັບຮູບຖ່າຍ', 'ໄຟລ໌ໃຫຍ່ກວ່າ Raster ສະເໝີ'], a: 0, e: 'Vector ຄຳນວນຈາກສູດຄະນິດສາດ ຈຶ່ງຄົມຊັດທຸກຂະໜາດ · ຮູບຖ່າຍເໝາະກັບ Raster', ref: 'sec-6-1' },
  { q: 'ງານທີ່ຈະສົ່ງພິມ (ໂປສເຕີ, ນາມບັດ) ຄວນຕັ້ງ Color Mode ແບບໃດ?', o: ['CMYK', 'RGB', 'HSB', 'Web Safe'], a: 0, e: 'CMYK = ໝຶກພິມ (Cyan, Magenta, Yellow, Key/ດຳ)', ref: 'sec-6-2' },
  { q: 'ງານສຳລັບເວັບໄຊ ແລະ ໂຊຊຽວມີເດຍ ຄວນໃຊ້ Color Mode ແບບໃດ?', o: ['RGB', 'CMYK', 'Pantone', 'Grayscale'], a: 0, e: 'RGB = ສີຂອງແສງ ໃຊ້ກັບໜ້າຈໍ', ref: 'sec-6-2' },
  { q: 'ຄີລັດຂອງ Selection Tool (ລູກສອນດຳ) ແມ່ນປຸ່ມໃດ?', o: ['V', 'A', 'S', 'Q'], a: 0, e: 'V = Selection · A = Direct Selection · S = Scale · Q = Lasso', ref: 'sec-2-1' },
  { q: 'ເຄື່ອງມືໃດໃຊ້ເລືອກ Anchor Point ທີລະຈຸດ ເພື່ອແກ້ຮູບຮ່າງ?', o: ['Direct Selection Tool (A)', 'Selection Tool (V)', 'Magic Wand Tool (Y)', 'Group Selection Tool'], a: 0, e: 'ລູກສອນຂາວ (A) ເລືອກທີລະຈຸດ · ລູກສອນດຳ (V) ເລືອກທັງວັດຖຸ', ref: 'sec-2-1' },
  { q: 'Magic Wand Tool (Y) ໃຊ້ເຮັດຫຍັງ?', o: ['ເລືອກວັດຖຸທີ່ມີສີ ຫຼື ຄຸນສົມບັດຄືກັນ ໃນຄັ້ງດຽວ', 'ວາດຮູບດາວ', 'ລຶບພື້ນຫຼັງຂອງຮູບຖ່າຍ', 'ປ່ຽນຂະໜາດວັດຖຸ'], a: 0, e: 'ຄລິກວັດຖຸ 1 ອັນ → ວັດຖຸອື່ນທີ່ມີ Fill/Stroke ຄືກັນຖືກເລືອກນຳ', ref: 'sec-2-1' },
  { q: 'ເມື່ອໃຊ້ Pen Tool ແລ້ວ "ຄລິກຄ້າງແລ້ວລາກ" ຈະໄດ້ຫຍັງ?', o: ['ເສັ້ນໂຄ້ງ (ມີ handle)', 'ເສັ້ນຊື່', 'ລຶບຈຸດ', 'ຮູບສີ່ຫຼ່ຽມ'], a: 0, e: 'ຄລິກ = ເສັ້ນຊື່ · ຄລິກລາກ = ເສັ້ນໂຄ້ງ Bézier', ref: 'sec-2-2' },
  { q: 'ຄີລັດຂອງ Pen Tool ແມ່ນປຸ່ມໃດ?', o: ['P', 'N', 'B', 'E'], a: 0, e: 'P = Pen · N = Pencil · B = Paintbrush · E = Free Transform', ref: 'sec-2-2' },
  { q: 'ເຄື່ອງມືໃດໃຊ້ປ່ຽນ "ຈຸດມຸມ" ໃຫ້ເປັນ "ຈຸດໂຄ້ງ" ແລະ ກັບກັນ?', o: ['Anchor Point Tool (Shift+C)', 'Add Anchor Point Tool (+)', 'Curvature Tool (Shift+~)', 'Width Tool (Shift+W)'], a: 0, e: 'Anchor Point Tool ຢູ່ກຸ່ມດຽວກັບ Pen Tool', ref: 'sec-2-2' },
  { q: 'ຖ້າຕ້ອງການວາດວົງມົນສົມບູນ ດ້ວຍ Ellipse Tool ຕ້ອງກົດປຸ່ມໃດຄ້າງໄວ້?', o: ['Shift', 'Alt', 'Ctrl', 'Tab'], a: 0, e: 'Shift = ຮັກສາສັດສ່ວນ (ວົງມົນ / ສີ່ຫຼ່ຽມຈະຕຸລັດ) · Alt = ວາດອອກຈາກຈຸດກາງ', ref: 'sec-2-2' },
  { q: 'ຄີລັດຂອງ Rectangle Tool ແລະ Ellipse Tool ແມ່ນຫຍັງ ຕາມລຳດັບ?', o: ['M ແລະ L', 'R ແລະ E', 'S ແລະ O', 'M ແລະ O'], a: 0, e: 'M = Rectangle · L = Ellipse · R = Rotate · O = Reflect', ref: 'sec-2-2' },
  { q: 'Type Tool ຖ້າ "ລາກເປັນກອບ" ແລ້ວພິມ ຈະໄດ້ຂໍ້ຄວາມແບບໃດ?', o: ['Area Type (ຕັດແຖວຕາມກອບ)', 'Point Type', 'Type on a Path', 'Vertical Type'], a: 0, e: 'ຄລິກ 1 ຄັ້ງ = Point Type · ລາກກອບ = Area Type', ref: 'sec-2-3' },
  { q: 'Scissors Tool (C) ໃຊ້ເຮັດຫຍັງ?', o: ['ຕັດ path ທີ່ຈຸດທີ່ຄລິກ', 'ຕັດຮູບຖ່າຍເປັນວົງມົນ', 'ລຶບ Layer', 'ສ້າງ Artboard'], a: 0, e: 'Scissors ຢູ່ກຸ່ມດຽວກັບ Eraser ແລະ Knife', ref: 'sec-2-4' },
  { q: 'ເຄື່ອງມືໃດໃຊ້ສະທ້ອນ (ກັບດ້ານ) ວັດຖຸຄືແວ່ນ?', o: ['Reflect Tool (O)', 'Rotate Tool (R)', 'Shear Tool', 'Warp Tool'], a: 0, e: 'Reflect ຢູ່ກຸ່ມດຽວກັບ Rotate', ref: 'sec-2-5' },
  { q: 'ກົດ Ctrl+D ຫຼັງຈາກໝູນ ຫຼື ຍ້າຍວັດຖຸ ຈະເກີດຫຍັງ?', o: ['ເຮັດຄຳສັ່ງ Transform ລ່າສຸດຊ້ຳ (Transform Again)', 'ລຶບວັດຖຸ', 'ຍົກເລີກການເລືອກ', 'ສຳເນົາໄຟລ໌'], a: 0, e: 'Object > Transform > Transform Again = Ctrl+D', ref: 'sec-2-5' },
  { q: 'ເຄື່ອງມືໃດລວມ ຫຼື ລຶບ ພື້ນທີ່ຂອງຮູບທີ່ຊ້ອນກັນ ໂດຍລາກທັບໂດຍກົງ?', o: ['Shape Builder Tool (Shift+M)', 'Blend Tool (W)', 'Live Paint Bucket (K)', 'Knife Tool'], a: 0, e: 'ລາກຜ່ານ = ລວມ · Alt + ຄລິກ = ລຶບພື້ນທີ່', ref: 'sec-2-5' },
  { q: 'Width Tool (Shift+W) ໃຊ້ເຮັດຫຍັງ?', o: ['ປັບໃຫ້ເສັ້ນໜາ-ບາງ ບໍ່ເທົ່າກັນ', 'ປ່ຽນຄວາມກວ້າງຂອງ Artboard', 'ຢືດຕົວອັກສອນ', 'ວັດໄລຍະ'], a: 0, e: 'ລາກອອກຈາກເສັ້ນ = ໜາຂຶ້ນ · ລາກເຂົ້າ = ບາງລົງ', ref: 'sec-2-5' },
  { q: 'ເຄື່ອງມືໃດໃຊ້ດູດສີ ແລະ ຮູບແບບ ຈາກວັດຖຸໜຶ່ງໄປໃສ່ອີກວັດຖຸໜຶ່ງ?', o: ['Eyedropper Tool (I)', 'Blend Tool (W)', 'Mesh Tool (U)', 'Gradient Tool (G)'], a: 0, e: 'ເລືອກວັດຖຸປາຍທາງ → ໃຊ້ Eyedropper ຄລິກວັດຖຸຕົ້ນແບບ', ref: 'sec-2-6' },
  { q: 'Blend Tool (W) ໃຊ້ເຮັດຫຍັງ?', o: ['ສ້າງຮູບ ແລະ ສີ ຂັ້ນກາງລະຫວ່າງ 2 ວັດຖຸ', 'ລວມ Layer', 'ເຮັດໃຫ້ຮູບມົວ', 'ລຶບສີ'], a: 0, e: 'ເຊັ່ນ ວົງມົນສີແດງ → ສີ່ຫຼ່ຽມສີຟ້າ ຈະມີຮູບຂັ້ນກາງຕາມຈຳນວນ Steps', ref: 'sec-2-6' },
  { q: 'ການໄລ່ສີ (Gradient) ໃນ Illustrator ມີ 3 ແບບ ຄືແບບໃດ?', o: ['Linear, Radial, Freeform', 'Linear, Angle, Diamond', 'Solid, Pattern, None', 'RGB, CMYK, HSB'], a: 0, e: 'Linear = ເສັ້ນຊື່ · Radial = ວົງມົນ · Freeform = ກຳນົດຈຸດສີອິດສະຫຼະ', ref: 'sec-3-7' },
  { q: 'ກົດປຸ່ມ X ໃນ Illustrator ເຮັດຫຍັງ?', o: ['ສະຫຼັບວ່າກຳລັງແກ້ Fill ຫຼື Stroke', 'ສະຫຼັບສີ Fill ↔ Stroke', 'ຄືນສີເລີ່ມຕົ້ນ', 'ລຶບວັດຖຸ'], a: 0, e: 'X = ສະຫຼັບການແກ້ Fill/Stroke · Shift+X = ສະຫຼັບສີ · D = ຄ່າເລີ່ມຕົ້ນ', ref: 'sec-2-9' },
  { q: 'ກົດ D ແລ້ວ Fill ແລະ Stroke ຈະເປັນສີຫຍັງ?', o: ['Fill ຂາວ · Stroke ດຳ', 'Fill ດຳ · Stroke ຂາວ', 'ບໍ່ມີສີທັງສອງ', 'Fill ດຳ · ບໍ່ມີ Stroke'], a: 0, e: 'D = Default Fill and Stroke', ref: 'sec-2-9' },
  { q: 'ພື້ນທີ່ສີຂາວທີ່ຈະຖືກພິມ ຫຼື export ເອີ້ນວ່າຫຍັງ?', o: ['Artboard', 'Canvas / Pasteboard', 'Layer', 'Swatch'], a: 0, e: 'ວັດຖຸທີ່ຢູ່ນອກ Artboard (ເທິງ Canvas ສີເທົາ) ຈະບໍ່ຖືກພິມ', ref: 'sec-1' },
  { q: 'ຄີລັດຂອງ Artboard Tool ແມ່ນຫຍັງ?', o: ['Shift+O', 'O', 'Shift+A', 'Ctrl+N'], a: 0, e: 'O ຢ່າງດຽວ = Reflect Tool', ref: 'sec-2-7' },
  { q: 'Panel ໃດສະແດງ ແລະ ແກ້ຄ່າຂອງວັດຖຸທີ່ເລືອກ (ຂະໜາດ, ສີ, ເສັ້ນ) ເປັນຄ່າເລີ່ມຕົ້ນໃນ Workspace Essentials?', o: ['Properties', 'Info', 'Navigator', 'Actions'], a: 0, e: 'Properties ປ່ຽນເນື້ອໃນຕາມວັດຖຸ ແລະ ເຄື່ອງມືທີ່ໃຊ້ຢູ່', ref: 'sec-1' },
  { q: 'ໃນ Layers panel ໄອຄອນ "ຮູບຕາ" ໃຊ້ເຮັດຫຍັງ?', o: ['ເຊື່ອງ / ສະແດງ Layer', 'ລັອກ Layer', 'ສ້າງ Layer ໃໝ່', 'ລຶບ Layer'], a: 0, e: 'ຮູບກະແຈ = ລັອກ · ປຸ່ມ ⊕ = Layer ໃໝ່', ref: 'sec-3-1' },
  { q: 'ຄີລັດ Ctrl+2 ແລະ Ctrl+3 ໝາຍເຖິງຫຍັງ ຕາມລຳດັບ?', o: ['Lock ແລະ Hide', 'Hide ແລະ Lock', 'Group ແລະ Ungroup', 'Copy ແລະ Paste'], a: 0, e: 'Unlock All = Alt+Ctrl+2 · Show All = Alt+Ctrl+3', ref: 'sec-6-5' },
  { q: 'ຖ້າຕ້ອງການຈັດວັດຖຸຫຼາຍອັນໃຫ້ຊິດຊ້າຍເທົ່າກັນ ຕ້ອງໃຊ້ Panel ໃດ?', o: ['Align', 'Pathfinder', 'Stroke', 'Character'], a: 0, e: 'Align (Shift+F7): ຈັດແນວ, ກະຈາຍ ແລະ ຈັດໄລຍະຫ່າງ', ref: 'sec-3-4' },
  { q: 'ໃນ Pathfinder ປຸ່ມໃດ "ລວມຮູບທີ່ຊ້ອນກັນເປັນຮູບດຽວ"?', o: ['Unite', 'Minus Front', 'Intersect', 'Exclude'], a: 0, e: 'Shape Modes: Unite (ລວມ), Minus Front (ລົບດ້ວຍຮູບໜ້າ), Intersect (ເຫຼືອສ່ວນທັບ), Exclude (ຕັດສ່ວນທັບອອກ)', ref: 'sec-3-5' },
  { q: 'ໃນ Pathfinder ປຸ່ມໃດ "ເຫຼືອແຕ່ພື້ນທີ່ທີ່ທັບກັນ"?', o: ['Intersect', 'Exclude', 'Divide', 'Unite'], a: 0, e: 'Exclude ແມ່ນກົງກັນຂ້າມ — ລຶບພື້ນທີ່ທີ່ທັບກັນອອກ', ref: 'sec-3-5' },
  { q: 'ໃນ Stroke panel ຖ້າຕ້ອງການໃຫ້ປາຍເສັ້ນມົນ ຕ້ອງເລືອກຫຍັງ?', o: ['Round Cap', 'Butt Cap', 'Projecting Cap', 'Miter Join'], a: 0, e: 'Cap = ປາຍເສັ້ນ (Butt, Round, Projecting) · Corner/Join = ມຸມເສັ້ນ (Miter, Round, Bevel)', ref: 'sec-3-3' },
  { q: 'ໃນ Character panel "Leading" ໝາຍເຖິງຫຍັງ?', o: ['ໄລຍະຫ່າງລະຫວ່າງແຖວ', 'ໄລຍະຫ່າງລະຫວ່າງຕົວອັກສອນ 2 ຕົວ', 'ໄລຍະຫ່າງຂອງຕົວອັກສອນທັງຄຳ', 'ຂະໜາດຕົວອັກສອນ'], a: 0, e: 'Kerning = ລະຫວ່າງ 2 ຕົວ · Tracking = ທັງຄຳ/ແຖວ · Leading = ລະຫວ່າງແຖວ', ref: 'sec-3-6' },
  { q: 'ເມນູໃດມີຄຳສັ່ງ Group, Lock, Clipping Mask ແລະ Compound Path?', o: ['Object', 'Edit', 'Select', 'View'], a: 0, e: 'ເມນູ Object ລວມຄຳສັ່ງຈັດການວັດຖຸທັງໝົດ', ref: 'sec-4' },
  { q: 'ຄີລັດ Ctrl+7 ແມ່ນຄຳສັ່ງໃດ?', o: ['Make Clipping Mask', 'Make Compound Path', 'Group', 'Create Outlines'], a: 0, e: 'Ctrl+7 = Clipping Mask · Ctrl+8 = Compound Path · Ctrl+G = Group', ref: 'sec-6-3' },
  { q: 'ຄີລັດຂອງ Create Outlines (ແປງຕົວອັກສອນເປັນຮູບຮ່າງ) ແມ່ນຫຍັງ?', o: ['Shift+Ctrl+O', 'Ctrl+O', 'Shift+Ctrl+V', 'Ctrl+T'], a: 0, e: 'Ctrl+O = Open · Shift+Ctrl+V = Paste in Place · Ctrl+T = Character panel', ref: 'sec-2-3' },
  { q: 'ເປັນຫຍັງຄວນ Create Outlines ກ່ອນສົ່ງໄຟລ໌ໃຫ້ຮ້ານພິມ?', o: ['ກັນບັນຫາເຄື່ອງອື່ນບໍ່ມີຟອນ ແລ້ວຕົວອັກສອນປ່ຽນ', 'ເພື່ອເພີ່ມຄວາມລະອຽດຂອງຮູບ', 'ເພື່ອປ່ຽນ RGB ເປັນ CMYK', 'ເພື່ອໃຫ້ແກ້ຂໍ້ຄວາມງ່າຍຂຶ້ນ'], a: 0, e: 'ຫຼັງ Create Outlines ຈະແກ້ຂໍ້ຄວາມບໍ່ໄດ້ອີກ ຄວນເກັບໄຟລ໌ຕົ້ນສະບັບໄວ້', ref: 'sec-2-3' },
  { q: 'ໃນໜ້າຕ່າງ New Document ສຳລັບງານພິມ ນິຍົມຕັ້ງ Bleed ເທົ່າໃດ?', o: ['3 mm', '0 mm', '25 mm', '100 px'], a: 0, e: 'Bleed = ພື້ນທີ່ເກີນຂອບເຈ້ຍ ກັນຂອບຂາວຕອນຕັດ', ref: 'sec-5' },
  { q: 'Raster Effects ທີ່ເໝາະກັບງານພິມ ແມ່ນຄ່າໃດ?', o: ['High (300 ppi)', 'Screen (72 ppi)', 'Medium (150 ppi)', '30 ppi'], a: 0, e: 'ງານຈໍໃຊ້ Screen 72 ppi · ງານພິມໃຊ້ High 300 ppi', ref: 'sec-5' },
  { q: 'ຄີລັດ Ctrl+Y ໃນ Illustrator ເຮັດຫຍັງ?', o: ['ສະຫຼັບມຸມມອງ Outline / Preview', 'Redo', 'ບັນທຶກໄຟລ໌', 'ຊູມເຂົ້າ'], a: 0, e: 'Outline view ສະແດງແຕ່ເສັ້ນ path ບໍ່ມີສີ · Redo ໃນ Illustrator = Shift+Ctrl+Z', ref: 'sec-4' },
  { q: 'ຄີລັດ Ctrl+0 (ເລກສູນ) ເຮັດຫຍັງ?', o: ['Fit Artboard in Window (ພໍດີໜ້າຈໍ)', 'Actual Size 100%', 'ເປີດໄຟລ໌', 'ຊູມອອກ'], a: 0, e: 'Ctrl+1 = Actual Size (100%)', ref: 'sec-4' },
  { q: 'Image Trace ໃຊ້ເຮັດຫຍັງ?', o: ['ແປງຮູບ Raster ໃຫ້ເປັນ Vector', 'ແປງ Vector ໃຫ້ເປັນ Raster', 'ລຶບພື້ນຫຼັງ', 'ເພີ່ມຂໍ້ຄວາມໃສ່ຮູບ'], a: 0, e: 'ເຊັ່ນ ແປງຮູບໂລໂກ້ທີ່ແຕ້ມດ້ວຍມືແລ້ວສະແກນ ໃຫ້ເປັນ Vector · Object > Image Trace', ref: 'sec-8' },
  { q: 'ນາມສະກຸນໄຟລ໌ຕົ້ນສະບັບຂອງ Illustrator ແມ່ນຫຍັງ?', o: ['.AI', '.PSD', '.CDR', '.INDD'], a: 0, e: '.PSD = Photoshop · .CDR = CorelDRAW · .INDD = InDesign', ref: 'sec-6-4' },
  { q: 'ໄຟລ໌ Raster ແບບໃດທີ່ມີພື້ນຫຼັງໂປ່ງໃສໄດ້?', o: ['PNG', 'JPG', 'BMP', 'AI'], a: 0, e: 'JPG ບໍ່ຮອງຮັບພື້ນໂປ່ງໃສ · AI ເປັນ Vector', ref: 'sec-6-4' },
  { q: 'ຈະເປີດ Toolbar ແບບທີ່ມີເຄື່ອງມືຄົບທຸກອັນ ໄດ້ທີ່ໃດ?', o: ['Window > Toolbars > Advanced', 'Edit > Preferences > General', 'View > Show Toolbar', 'File > Document Setup'], a: 0, e: 'ຄ່າເລີ່ມຕົ້ນແມ່ນ Basic toolbar ທີ່ມີເຄື່ອງມືບໍ່ຄົບ', ref: 'sec-2' },
  { q: 'ຂໍ້ໃດກ່າວຖືກກ່ຽວກັບ Effect ແລະ Expand?', o: ['Effect ແກ້ກັບຄືນໄດ້ໃນ Appearance · Expand ແກ້ກັບຄືນບໍ່ໄດ້', 'Effect ແກ້ກັບຄືນບໍ່ໄດ້ · Expand ແກ້ກັບຄືນໄດ້', 'ທັງສອງແກ້ກັບຄືນບໍ່ໄດ້', 'ທັງສອງແມ່ນຄຳສັ່ງດຽວກັນ'], a: 0, e: 'Effect ເປັນເອັບເຟັກທີ່ຊ້ອນຢູ່ເທິງວັດຖຸ · Expand ແປງໃຫ້ເປັນຮູບຮ່າງຈິງ', ref: 'sec-4' },
  { q: 'ກົດປຸ່ມໃດຄ້າງໄວ້ ເພື່ອໃຊ້ Hand Tool ຊົ່ວຄາວ ຂະນະກຳລັງໃຊ້ເຄື່ອງມືອື່ນ?', o: ['Spacebar', 'Shift', 'Tab', 'Esc'], a: 0, e: 'ປ່ອຍ Spacebar ຈະກັບໄປເຄື່ອງມືເດີມ', ref: 'sec-2-8' },
  { q: 'ກົດປຸ່ມ Tab ໃນ Illustrator (ຂະນະບໍ່ໄດ້ພິມຂໍ້ຄວາມ) ຈະເກີດຫຍັງ?', o: ['ເຊື່ອງ / ສະແດງ Toolbar ແລະ Panel ທັງໝົດ', 'ສ້າງ Layer ໃໝ່', 'ປ່ຽນໄປ Artboard ຖັດໄປ', 'ບັນທຶກໄຟລ໌'], a: 0, e: 'Shift+Tab = ເຊື່ອງສະເພາະ panel ທາງຂວາ', ref: 'sec-1' },
];

// ພາກ ຂ: ເບິ່ງໄອຄອນ ແລ້ວທາຍຊື່ເຄື່ອງມື
export const ICONQ = [
  { icon: 'pen', o: ['Pen Tool', 'Pencil Tool', 'Paintbrush Tool', 'Curvature Tool'], a: 0, ref: 'sec-2-2' },
  { icon: 'direct', o: ['Direct Selection Tool', 'Selection Tool', 'Group Selection Tool', 'Lasso Tool'], a: 0, ref: 'sec-2-1' },
  { icon: 'shapebuilder', o: ['Shape Builder Tool', 'Blend Tool', 'Live Paint Bucket', 'Ellipse Tool'], a: 0, ref: 'sec-2-5' },
  { icon: 'eyedropper', o: ['Eyedropper Tool', 'Measure Tool', 'Pencil Tool', 'Knife Tool'], a: 0, ref: 'sec-2-6' },
  { icon: 'blend', o: ['Blend Tool', 'Shape Builder Tool', 'Symbol Sprayer Tool', 'Mesh Tool'], a: 0, ref: 'sec-2-6' },
  { icon: 'artboard', o: ['Artboard Tool', 'Crop Tool', 'Slice Tool', 'Rectangle Tool'], a: 0, ref: 'sec-2-7' },
  { icon: 'rotate', o: ['Rotate Tool', 'Rotate View Tool', 'Reflect Tool', 'Twirl Tool'], a: 0, ref: 'sec-2-5' },
  { icon: 'width', o: ['Width Tool', 'Warp Tool', 'Smooth Tool', 'Stroke Tool'], a: 0, ref: 'sec-2-5' },
  { icon: 'gradient', o: ['Gradient Tool', 'Mesh Tool', 'Live Paint Bucket', 'Eraser Tool'], a: 0, ref: 'sec-2-6' },
  { icon: 'typepath', o: ['Type on a Path Tool', 'Area Type Tool', 'Vertical Type Tool', 'Touch Type Tool'], a: 0, ref: 'sec-2-3' },
];

// ພາກ ຄ: ອັດຕະໄນ
export const WRITTEN = [
  { q: 'ຈົ່ງອະທິບາຍຄວາມແຕກຕ່າງລະຫວ່າງພາບແບບ Vector ແລະ Raster ພ້ອມຍົກຕົວຢ່າງໂປຣແກຣມ ແລະ ນາມສະກຸນໄຟລ໌.', a: ['Vector ເກັບເປັນເສັ້ນ ແລະ ຮູບຮ່າງ (path, anchor point) ທີ່ຄຳນວນດ້ວຍສູດຄະນິດສາດ — ຂະຫຍາຍເທົ່າໃດກໍບໍ່ແຕກ, ໄຟລ໌ນ້ອຍ, ເໝາະກັບໂລໂກ້ ແລະ ໄອຄອນ', 'Raster (Bitmap) ເກັບເປັນຈຸດສີ (pixel) — ຂະຫຍາຍແລ້ວແຕກ, ເໝາະກັບຮູບຖ່າຍ', 'ໂປຣແກຣມ Vector: Illustrator, CorelDRAW, Inkscape · ໂປຣແກຣມ Raster: Photoshop, GIMP', 'ນາມສະກຸນ Vector: .AI, .EPS, .SVG, .PDF · Raster: .JPG, .PNG, .GIF, .PSD'], ref: 'sec-6-1' },
  { q: 'ຈົ່ງອະທິບາຍສ່ວນປະກອບຂອງໜ້າຈໍ Illustrator ຢ່າງໜ້ອຍ 5 ສ່ວນ.', a: ['Menu Bar — ເມນູຄຳສັ່ງ File, Edit, Object, Type, Select, Effect, View, Window, Help', 'Toolbar — ແຖບເຄື່ອງມືທາງຊ້າຍ', 'Artboard — ໜ້າເຈ້ຍສີຂາວທີ່ຈະຖືກພິມ/export', 'Canvas (Pasteboard) — ພື້ນທີ່ສີເທົາອ້ອມ Artboard ບໍ່ຖືກພິມ', 'Panels / Properties — ແຜງຄວບຄຸມທາງຂວາ ສະແດງຄ່າຂອງວັດຖຸທີ່ເລືອກ', 'Document Tab — ຊື່ໄຟລ໌, % ຊູມ, ໂໝດສີ · Status Bar — % ຊູມ, ເລກ Artboard, ຊື່ເຄື່ອງມື'], ref: 'sec-1' },
  { q: 'Selection Tool ແລະ Direct Selection Tool ຕ່າງກັນແນວໃດ? ບອກຄີລັດ.', a: ['Selection Tool (V, ລູກສອນດຳ) — ເລືອກທັງວັດຖຸ ເພື່ອຍ້າຍ, ຍໍ້-ຂະຫຍາຍ, ໝູນ', 'Direct Selection Tool (A, ລູກສອນຂາວ) — ເລືອກ Anchor Point ຫຼື segment ທີລະຈຸດ ເພື່ອແກ້ຮູບຮ່າງ ແລະ ຄວາມໂຄ້ງ'], ref: 'sec-2-1' },
  { q: 'ຈົ່ງອະທິບາຍວິທີໃຊ້ Pen Tool ວາດເສັ້ນຊື່ ແລະ ເສັ້ນໂຄ້ງ.', a: ['ເລືອກ Pen Tool (P)', 'ຄລິກ = ສ້າງ Anchor Point ແລະ ເສັ້ນຊື່ລະຫວ່າງຈຸດ (ກົດ Shift = ລັອກມຸມ 45°/90°)', 'ຄລິກຄ້າງແລ້ວລາກ = ສ້າງຈຸດໂຄ້ງທີ່ມີ handle ກຳນົດຄວາມໂຄ້ງ', 'ຄລິກຈຸດທຳອິດ = ປິດ path (Closed Path) · ກົດ Esc/Enter = ຈົບເສັ້ນເປີດ (Open Path)', 'ແກ້ໄຂພາຍຫຼັງດ້ວຍ Direct Selection (A) ແລະ Anchor Point Tool (Shift+C)'], ref: 'sec-2-2' },
  { q: 'ຈົ່ງອະທິບາຍປຸ່ມ Shape Modes ທັງ 4 ຂອງ Pathfinder panel.', a: ['Unite — ລວມຮູບທີ່ຊ້ອນກັນເປັນຮູບດຽວ', 'Minus Front — ເອົາຮູບທີ່ຢູ່ໜ້າໄປເຈາະຮູບທີ່ຢູ່ຫຼັງ', 'Intersect — ເຫຼືອແຕ່ພື້ນທີ່ທີ່ທັບກັນ', 'Exclude — ລຶບພື້ນທີ່ທີ່ທັບກັນ ເຫຼືອສ່ວນທີ່ບໍ່ທັບ', '(ເປີດ Pathfinder: Window > Pathfinder ຫຼື Shift+Ctrl+F9 · ຕ້ອງເລືອກວັດຖຸ 2 ອັນຂຶ້ນໄປ)'], ref: 'sec-3-5' },
  { q: 'ຖ້າຈະອອກແບບໂປສເຕີຂະໜາດ A4 ເພື່ອສົ່ງພິມ ຄວນຕັ້ງຄ່າໃນໜ້າຕ່າງ New Document ແນວໃດ?', a: ['File > New (Ctrl+N) → ເລືອກແທັບ Print → ຂະໜາດ A4 (210 x 297 mm)', 'Units: Millimeters · Orientation: ຕາມງານ (ແນວຕັ້ງ/ນອນ)', 'Bleed: 3 mm ທຸກດ້ານ', 'Color Mode: CMYK', 'Raster Effects: High (300 ppi)', 'ກ່ອນສົ່ງພິມ: Create Outlines ຕົວອັກສອນ ແລະ Save as PDF ຫຼື Package'], ref: 'sec-5' },
  { q: 'Clipping Mask ແມ່ນຫຍັງ? ມີຂັ້ນຕອນເຮັດແນວໃດ?', a: ['Clipping Mask = ໃຊ້ຮູບຮ່າງທີ່ຢູ່ເທິງສຸດເປັນກອບ ເຊື່ອງສ່ວນຂອງວັດຖຸທີ່ຢູ່ນອກກອບ (ເຊັ່ນ ໃສ່ຮູບຖ່າຍໃນວົງມົນ)', 'ຂັ້ນຕອນ: 1) ວາງຮູບຮ່າງທີ່ຈະເປັນກອບໄວ້ເທິງສຸດ 2) ເລືອກທັງກອບ ແລະ ວັດຖຸ 3) Object > Clipping Mask > Make ຫຼື Ctrl+7', 'ຍົກເລີກ: Object > Clipping Mask > Release (Alt+Ctrl+7)'], ref: 'sec-6-3' },
  { q: 'Create Outlines ແມ່ນຫຍັງ? ເປັນຫຍັງຕ້ອງໃຊ້ ແລະ ໃຊ້ແນວໃດ?', a: ['ແປງຕົວອັກສອນໃຫ້ເປັນຮູບຮ່າງ Vector (path)', 'ເຫດຜົນ: ກັນບັນຫາເຄື່ອງຮ້ານພິມບໍ່ມີຟອນ ແລ້ວຕົວອັກສອນຖືກປ່ຽນເປັນຟອນອື່ນ', 'ວິທີ: ເລືອກຂໍ້ຄວາມ → Type > Create Outlines ຫຼື Shift+Ctrl+O', 'ຂໍ້ຄວນລະວັງ: ຫຼັງແປງແລ້ວແກ້ຂໍ້ຄວາມບໍ່ໄດ້ ຄວນເກັບໄຟລ໌ຕົ້ນສະບັບໄວ້'], ref: 'sec-2-3' },
  { q: 'Layer ມີປະໂຫຍດແນວໃດ? ຈົ່ງອະທິບາຍໄອຄອນຫຼັກໃນ Layers panel.', a: ['Layer ຄືຊັ້ນທີ່ຊ້ອນກັນ — ແຍກສ່ວນງານ (ພື້ນຫຼັງ, ຮູບ, ຕົວອັກສອນ) ເພື່ອຈັດການ ແລະ ແກ້ໄຂງ່າຍ, ວັດຖຸໃນ Layer ເທິງບັງ Layer ລຸ່ມ', 'ຮູບຕາ — ເຊື່ອງ/ສະແດງ Layer', 'ຮູບກະແຈ — ລັອກ ກັນແກ້ໄຂຜິດ', 'ວົງມົນ (Target) — ເລືອກວັດຖຸທັງໝົດໃນ Layer', 'ປຸ່ມລຸ່ມ: Create New Layer, Create New Sublayer, Make/Release Clipping Mask, Delete', 'ເປີດ Layers panel: F7'], ref: 'sec-3-1' },
  { q: 'RGB ແລະ CMYK ຕ່າງກັນແນວໃດ? ໃຊ້ເມື່ອໃດ?', a: ['RGB (Red, Green, Blue) — ສີຂອງແສງ ແບບບວກ, ລວມກັນໄດ້ສີຂາວ, ໃຊ້ກັບໜ້າຈໍ ເວັບ ມືຖື ວິດີໂອ', 'CMYK (Cyan, Magenta, Yellow, Key/ດຳ) — ສີຂອງໝຶກ ແບບລົບ, ໃຊ້ກັບງານພິມ', 'ຕ້ອງຕັ້ງໃຫ້ຖືກຕັ້ງແຕ່ສ້າງໄຟລ໌ (ປ່ຽນໄດ້ທີ່ File > Document Color Mode) ເພາະສີ RGB ບາງສີພິມອອກ CMYK ບໍ່ໄດ້'], ref: 'sec-6-2' },
];

export const TOTAL_AUTO = MCQ.length + ICONQ.length;

// ---------------------------------------------------------------- HTML

// ສັບລຳດັບຕົວເລືອກແບບຄົງທີ່ຕອນ build (browser ຈະສັບໃໝ່ອີກຄັ້ງຕອນເປີດໜ້າ)
const exam = makeExam({ key: 'aimock', lesson: '/illustrator/' });

export function mcqHtml() {
  return exam.list(MCQ, 'A');
}

export function iconQHtml() {
  return `<div class="mq-icons">${exam.list(ICONQ, 'B', (m) => `<span class="mq-icq">${aiIcon(m.icon)}</span><span>ໄອຄອນນີ້ແມ່ນເຄື່ອງມືໃດ?</span>`)}</div>`;
}

export function writtenHtml() {
  return exam.written(WRITTEN);
}

export function scoreHtml() {
  return exam.score(TOTAL_AUTO);
}

export function resultHtml() {
  return exam.result();
}

export function aiExamInclude(name) {
  switch (name) {
    case 'ai-mock-score': return scoreHtml();
    case 'ai-mock-mcq': return mcqHtml();
    case 'ai-mock-icons': return iconQHtml();
    case 'ai-mock-written': return writtenHtml();
    case 'ai-mock-result': return resultHtml();
    default: return null;
  }
}
