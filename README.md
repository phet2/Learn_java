# Learn Java

## ເອກະສານທົບທວນ (markdown)

| ໄຟລ໌ | ເນື້ອໃນ |
|---|---|
| `review/SUMMARY.md` | ສະຫຼຸບທົບທວນບົດທີ 1–6 + ຈຸດທີ່ສະໄລພິມຜິດ + ຄຳຖາມທົດສອບຕົນເອງ |
| `review/01_LOGIN_EXPLAINED.md` | ອະທິບາຍ `Login.java` ທີລະບັນທັດ |
| `review/02_PANEL_PRODUCT_EXPLAINED.md` | ອະທິບາຍ `PanelProduct.java` ທີລະບັນທັດ (CRUD ສິນຄ້າ) |
| `review/03_EXAM_QA.md` | ຄຳຖາມສອບເສັງ 15 ຂໍ້ ພ້ອມຄຳຕອບ ແລະ ຕົວຢ່າງໂຄ້ດ |
| `review/04_ILLUSTRATOR.md` | ບົດຮຽນ Adobe Illustrator 2025: Workspace, Toolbar, Panels, ເມນູ, New Document, ທິດສະດີ, ຝຶກຕອບ (ໜ້າຈໍຈຳລອງຢູ່ໃນ `web/src/illustrator.mjs`) |
| `review/05_ILLUSTRATOR_MOCK_EXAM.md` | ຂໍ້ສອບລອງທຳ Illustrator (ຄຳຖາມຢູ່ໃນ `web/src/ai-exam.mjs`) |
| `review/06_FLUTTER.md` | ບົດຮຽນ Flutter: ພື້ນຖານ Dart/Flutter, ທິດສະດີ 4 ຂໍ້, ອະທິບາຍແອັບຈັດການນັກສຶກສາ 9 ໄຟລ໌, ຈຸດທີ່ຄວນລະວັງ |
| `review/07_FIREBASE.md` | Flutter + Firebase: FlutterFire, Auth, Firestore, Storage, StreamBuilder, ປ່ຽນແອັບໃຫ້ໃຊ້ Firestore |
| `review/08_FLUTTER_EXAM_QA.md` | ຄຳຖາມຄົ້ນຄວ້າສອບເສັງກາງພາກ Flutter 50 ຂໍ້ ພ້ອມຄຳຕອບ |
| `review/09_FLUTTER_MOCK_EXAM.md` | ຂໍ້ສອບລອງທຳ Flutter (ຄຳຖາມຢູ່ໃນ `web/src/flutter.mjs`) |
| `flutter/student_app/` | ໂປຣເຈັກ Flutter ຈາກສະໄລ (Provider + SharedPreferences) — ເວັບອ່ານໂຄ້ດຈາກບ່ອນນີ້ໂດຍກົງ |
| `flutter/student_app_firebase/` | ເວີຊັນ Firebase (Auth + Firestore + Storage) + ແກ້ບັນຫາໃນໂຄ້ດສະໄລ |
| `exercises/chapter5/` | ຄຳຕອບ Exercise ບົດທີ 5 |

## ເວັບທົບທວນ (mobile first)

ເວັບຖືກສ້າງຈາກໄຟລ໌ markdown ຂ້າງເທິງໂດຍກົງ — ແກ້ໄຟລ໌ `review/*.md` ແລ້ວ build ໃໝ່ ເວັບຈະອັບເດດຕາມ

**ຄຸນສົມບັດ**
- ໂໝດ **ຝຶກຕອບ**: ເຊື່ອງຄຳຕອບໄວ້ ແຕະເພື່ອເປີດ + ປະເມີນຕົນເອງ (ຈື່ໄດ້ / ທວນອີກ)
- ແຖບ **ໂຄ້ດເຕັມ** ຂອງ Login ແລະ PanelProduct: ແຕະແຖວໃດກໍໄດ້ ເພື່ອເບິ່ງຄຳອະທິບາຍ
- **ໝາຍວ່າອ່ານແລ້ວ** ແລະ ຄວາມຄືບໜ້າ (ບັນທຶກໃນ browser ຂອງເຄື່ອງນັ້ນ)
- **ຄົ້ນຫາ** ທຸກໜ້າ, ສາລະບານ, ໂໝດມືດ, ແຜນພາບ, ປຸ່ມສຳເນົາໂຄ້ດ
- ໃຊ້ງານ **offline** ໄດ້ (service worker + ຟອນ Noto Sans Lao ຢູ່ໃນເວັບເອງ)

**ໂຄງສ້າງ**
```
web/build.mjs          ສະຄຣິບ build: markdown → HTML
web/src/app.css        ການອອກແບບ (mobile first, ໂໝດມືດ)
web/src/app.js         ການເຮັດວຽກຝັ່ງ browser
web/src/sw.js          service worker (offline)
web/src/code/          ໂຄ້ດ Login.java ແລະ PanelProduct.java ສຳລັບແຖບ "ໂຄ້ດເຕັມ"
web/src/code-map.mjs   ແຜນທີ່ "ແຖວໂຄ້ດ → ຫົວຂໍ້ຄຳອະທິບາຍ"
web/src/illustrator.mjs ໜ້າຈໍຈຳລອງ Illustrator
web/src/flutter.mjs    ແຜນພາບ ແລະ ຂໍ້ສອບລອງທຳ Flutter
web/src/exam-kit.mjs   ເຄື່ອງມືສ້າງໜ້າຂໍ້ສອບລອງທຳ (ໃຊ້ຮ່ວມກັນ)
web/src/assets/flutter/ ພາບໜ້າຈໍແອັບ Flutter
wrangler.jsonc         ການຕັ້ງຄ່າ Cloudflare Workers (static assets)
dist/                  ຜົນ build (ບໍ່ເກັບໃນ git)
```

**ຄຳສັ່ງ** (ຕ້ອງມີ Node.js 20 ຂຶ້ນໄປ)
```bash
npm install
```
```bash
npm run build
```
```bash
npm run preview
```

> ຖ້າແກ້ເລກແຖວໃນ `web/src/code/*.java` ຫຼື `flutter/student_app/lib/` ຕ້ອງແກ້ `web/src/code-map.mjs` ນຳ — build ຈະແຈ້ງ error ຖ້າ id ຫົວຂໍ້ບໍ່ກົງ ຫຼື ຊ່ວງແຖວເກີນຄວາມຍາວໄຟລ໌

## Deploy ຂຶ້ນ Cloudflare (Workers Builds)

ເຊື່ອມ repo ນີ້ກັບ Cloudflare ຄັ້ງດຽວ ຫຼັງຈາກນັ້ນທຸກຄັ້ງທີ່ push, Cloudflare ຈະ build ແລະ deploy ໃຫ້ອັດຕະໂນມັດ

| ຊ່ອງ | ຄ່າ |
|---|---|
| Project / Worker name | `learn-java-review` (ຕ້ອງກົງກັບ `name` ໃນ `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (ຄ່າເລີ່ມຕົ້ນ) |

ເອກະສານ: https://developers.cloudflare.com/workers/ci-cd/builds/
