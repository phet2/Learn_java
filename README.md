# ສູນບົດຮຽນ

ເວັບລວມບົດຮຽນ ແລະ ຂໍ້ສອບທົບທວນ (mobile first, ໃຊ້ offline ໄດ້) — ແບ່ງເປັນ **ໝວດ → ວິຊາ → ບົດ**

| ໝວດ | ວິຊາ | ລິ້ງ | ບົດ |
|---|---|---|---|
| ການຂຽນໂປຣແກຣມ | Java Programming | `/java/` | ສະຫຼຸບບົດທີ 1–6, Login.java, PanelProduct.java, ຄຳຖາມສອບເສັງ 15 ຂໍ້ |
| ການຂຽນໂປຣແກຣມ | Mobile App Development (Flutter) | `/flutter/` | ແອັບຈັດການນັກສຶກສາ, Flutter + Firebase, ຄຳຖາມກາງພາກ 50 ຂໍ້, ຂໍ້ສອບລອງທຳ |
| ອອກແບບກຣາບຟິກ | Adobe Illustrator 2025 | `/illustrator/` | ບົດຮຽນ (ໜ້າຈໍຈຳລອງ), ຂໍ້ສອບລອງທຳ |

ລິ້ງຂອງແຕ່ລະບົດ = `/<ວິຊາ>/<ບົດ>/` ເຊັ່ນ `/java/login/`, `/flutter/firebase/` · ລິ້ງເກົ່າ (ເຊັ່ນ `/login/`) ຖືກພາໄປລິ້ງໃໝ່ອັດຕະໂນມັດ ແລະ ຄວາມຄືບໜ້າທີ່ບັນທຶກໄວ້ໃນເຄື່ອງຖືກຍ້າຍໃຫ້ເອງ

## ໂຄງສ້າງໄຟລ໌

```
courses/                         ເນື້ອຫາທັງໝົດ (ແກ້ບ່ອນນີ້ ແລ້ວ build ໃໝ່)
├── categories.json              ລາຍຊື່ໝວດ (ລຳດັບໃນໄຟລ໌ = ລຳດັບໃນໜ້າຫຼັກ)
├── java/
│   ├── course.json              ຂໍ້ມູນວິຊາ + ລາຍການບົດ
│   ├── summary.md               1 ບົດ = 1 ໄຟລ໌ (ຊື່ໄຟລ໌ = slug ຂອງບົດ)
│   ├── login.md · product.md · exam.md
├── flutter/
│   ├── course.json
│   ├── student-app.md · firebase.md · midterm-qa.md · mock-exam.md
│   └── assets/                  ຮູບຂອງວິຊາ → ເວັບເຫັນທີ່ /assets/flutter/...
└── illustrator/
    ├── course.json
    └── basics.md · mock-exam.md
flutter/student_app/             ໂປຣເຈັກ Flutter ຈາກສະໄລ — ແຖບ "ໂຄ້ດເຕັມ" ອ່ານໂຄ້ດຈາກບ່ອນນີ້ໂດຍກົງ
flutter/student_app_firebase/    ເວີຊັນ Firebase (Auth + Firestore + Storage)
exercises/chapter5/              ຄຳຕອບ Exercise Java ບົດທີ 5
web/                             ສະຄຣິບ build ແລະ ການອອກແບບເວັບ (ເບິ່ງລຸ່ມ)
```

## ເພີ່ມວິຊາໃໝ່ (ບໍ່ຕ້ອງແກ້ໂຄ້ດ)

1. ສ້າງໂຟນເດີ `courses/<id>/` — `id` ໃຊ້ a-z, 0-9, `-` ເທົ່ານັ້ນ (ຈະເປັນລິ້ງ `/<id>/`)
2. ສ້າງ `courses/<id>/course.json`:

```json
{
  "title": "Database Systems",
  "short": "Database",
  "category": "programming",
  "order": 3,
  "icon": "box",
  "color": "#2e7d32",
  "desc": "ອອກແບບຖານຂໍ້ມູນ, SQL ແລະ Normalization",
  "plan": [{ "t": "ອ່ານບົດທີ 1", "d": "ເຂົ້າໃຈ ER Diagram ກ່ອນ" }],
  "resources": [{ "t": "ໄຟລ໌ SQL ຕົວຢ່າງ", "d": "database/sample.sql ໃນ repo" }],
  "lessons": [
    { "slug": "sql-basics", "nav": "SQL", "icon": "book", "kind": "lesson", "title": "ພື້ນຖານ SQL", "desc": "SELECT, INSERT, UPDATE, DELETE", "quiz": true },
    { "slug": "exam", "nav": "ຂໍ້ສອບ", "icon": "quiz", "kind": "qa", "title": "ຄຳຖາມສອບເສັງ", "desc": "ຄຳຖາມ ພ້ອມຄຳຕອບ", "quiz": true, "qa": true }
  ]
}
```

3. ສ້າງໄຟລ໌ບົດຮຽນ `courses/<id>/<slug>.md` ໃຫ້ຄົບທຸກ slug (ເຊັ່ນ `sql-basics.md`, `exam.md`)
4. ຖ້າເປັນໝວດໃໝ່ ເພີ່ມໃນ `courses/categories.json` ກ່ອນ
5. `npm run build` — ວິຊາໃໝ່ຈະຂຶ້ນໃນໜ້າຫຼັກ, ເມນູ, ຄົ້ນຫາ ແລະ offline ໃຫ້ອັດຕະໂນມັດ · ຖ້າຂໍ້ມູນຂາດ ຫຼື ຜິດ build ຈະບອກວ່າຜິດຢູ່ໃສ

| Field ໃນ course.json | ຄວາມໝາຍ |
|---|---|
| `title` / `short` | ຊື່ເຕັມ (ໜ້າວິຊາ) / ຊື່ສັ້ນ (ເມນູ, ເສັ້ນທາງ) |
| `category` | `id` ຂອງໝວດໃນ `categories.json` |
| `order` | ລຳດັບພາຍໃນໝວດ (ນ້ອຍມາກ່ອນ) |
| `icon` | ຊື່ໄອຄອນ: `book`, `lock`, `box`, `quiz`, `vector`, `code`, `phone`, `cloud`, `coffee`, `folder`, `pen`, `read` … (ເບິ່ງ `icon()` ໃນ `web/build.mjs`) |
| `color` | ສີປະຈຳວິຊາ (hex) |
| `plan` / `resources` | (ບໍ່ບັງຄັບ) ແຜນທົບທວນ / ແຫຼ່ງຂໍ້ມູນປະກອບ ໃນໜ້າວິຊາ |
| `lessons[].kind` | `lesson` = ບົດຮຽນ · `qa` = ຄຳຖາມ-ຄຳຕອບ · `exam` = ຂໍ້ສອບລອງທຳ |
| `lessons[].quiz` | ມີປຸ່ມ ອ່ານ / ຝຶກຕອບ |
| `lessons[].qa` | ຫົວຂໍ້ `## ຂໍ້ N.` ກາຍເປັນບັດຄຳຖາມ ເຊື່ອງຄຳຕອບ + ປະເມີນຕົນເອງ |
| `lessons[].code` | ຊື່ code map ໃນ `web/src/code-map.mjs` → ມີແຖບ "ໂຄ້ດເຕັມ · ແຕະແຖວ" |
| `lessons[].collapseIssues` | ພັບຫົວຂໍ້ທີ່ມີ ⚠️ ໄວ້ຕອນເປີດໜ້າ |
| `lessons[].legacy` | ລິ້ງເກົ່າທີ່ຕ້ອງພາມາໜ້ານີ້ (ໃຊ້ຕອນຍ້າຍ ຫຼື ປ່ຽນຊື່ບົດ) |

**ກົດການຂຽນ markdown:** `## 1. ຫົວຂໍ້` = ພາກໃຫຍ່ (id `sec-1`) · `### 1.2 ຫົວຂໍ້ຍ່ອຍ` (id `sec-1-2`) · `## ຂໍ້ 5. ...` = ຄຳຖາມ (id `q-5`) · ລິ້ງຫາບົດອື່ນໃຊ້ `/<ວິຊາ>/<ບົດ>/#sec-1` · ໂຟນເດີທີ່ຂຶ້ນຕົ້ນດ້ວຍ `_` (ເຊັ່ນ `courses/_draft/`) ບໍ່ຖືກ build

## ເວັບ (mobile first)

ເວັບຖືກສ້າງຈາກ `courses/` ໂດຍກົງ — ແກ້ໄຟລ໌ markdown ຫຼື course.json ແລ້ວ build ໃໝ່ ເວັບຈະອັບເດດຕາມ

**ຄຸນສົມບັດ**
- ໂໝດ **ຝຶກຕອບ**: ເຊື່ອງຄຳຕອບໄວ້ ແຕະເພື່ອເປີດ + ປະເມີນຕົນເອງ (ຈື່ໄດ້ / ທວນອີກ)
- ໜ້າຫຼັກແບ່ງ **ໝວດ → ວິຊາ** · ໜ້າວິຊາມີລາຍການບົດ, ແຜນທົບທວນ ແລະ ຄວາມຄືບໜ້າ · ໃນບົດມີເສັ້ນທາງ (breadcrumb) ແລະ ປຸ່ມ ບົດກ່ອນ / ບົດຖັດໄປ
- ເມນູຕາມບໍລິບົດ: ໃນວິຊາໃດ ເມນູສະແດງບົດຂອງວິຊານັ້ນ · ໜ້າຫຼັກສະແດງ "ຮຽນຕໍ່ຈາກເທື່ອກ່ອນ"
- ແຖບ **ໂຄ້ດເຕັມ** (Login, PanelProduct, ແອັບ Flutter ຫຼາຍໄຟລ໌): ແຕະແຖວໃດກໍໄດ້ ເພື່ອເບິ່ງຄຳອະທິບາຍ
- **ໝາຍວ່າອ່ານແລ້ວ** ແລະ ຄວາມຄືບໜ້າ (ບັນທຶກໃນ browser ຂອງເຄື່ອງນັ້ນ)
- **ຄົ້ນຫາ** ທຸກວິຊາ (ຜົນຈັດກຸ່ມຕາມ ວິຊາ · ບົດ), ສາລະບານ, ໂໝດມືດ, ແຜນພາບ, ປຸ່ມສຳເນົາໂຄ້ດ
- ໃຊ້ງານ **offline** ໄດ້ (service worker + ຟອນ Noto Sans Lao ຢູ່ໃນເວັບເອງ)

**ໂຄງສ້າງ**
```
web/build.mjs          ສະຄຣິບ build: courses/ → HTML (ໜ້າຫຼັກ, ໜ້າວິຊາ, ໜ້າບົດ, ລິ້ງເກົ່າ)
web/src/app.css        ການອອກແບບ (mobile first, ໂໝດມືດ)
web/src/app.js         ການເຮັດວຽກຝັ່ງ browser
web/src/sw.js          service worker (offline)
web/src/code/          ໂຄ້ດ Login.java ແລະ PanelProduct.java ສຳລັບແຖບ "ໂຄ້ດເຕັມ"
web/src/code-map.mjs   ແຜນທີ່ "ແຖວໂຄ້ດ → ຫົວຂໍ້ຄຳອະທິບາຍ"
web/src/illustrator.mjs ໜ້າຈໍຈຳລອງ Illustrator
web/src/flutter.mjs    ແຜນພາບ ແລະ ຂໍ້ສອບລອງທຳ Flutter
web/src/exam-kit.mjs   ເຄື່ອງມືສ້າງໜ້າຂໍ້ສອບລອງທຳ (ໃຊ້ຮ່ວມກັນ)
wrangler.jsonc         ການຕັ້ງຄ່າ Cloudflare Workers (static assets)
dist/                  ຜົນ build (ບໍ່ເກັບໃນ git) — ມີ _redirects ສຳລັບລິ້ງເກົ່າ
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
