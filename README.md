# Learn Java

## ເອກະສານທົບທວນ (markdown)

| ໄຟລ໌ | ເນື້ອໃນ |
|---|---|
| `review/SUMMARY.md` | ສະຫຼຸບທົບທວນບົດທີ 1–6 + ຈຸດທີ່ສະໄລພິມຜິດ + ຄຳຖາມທົດສອບຕົນເອງ |
| `review/01_LOGIN_EXPLAINED.md` | ອະທິບາຍ `Login.java` ທີລະບັນທັດ |
| `review/02_PANEL_PRODUCT_EXPLAINED.md` | ອະທິບາຍ `PanelProduct.java` ທີລະບັນທັດ (CRUD ສິນຄ້າ) |
| `review/03_EXAM_QA.md` | ຄຳຖາມສອບເສັງ 15 ຂໍ້ ພ້ອມຄຳຕອບ ແລະ ຕົວຢ່າງໂຄ້ດ |
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

> ຖ້າແກ້ເລກແຖວໃນ `web/src/code/*.java` ຕ້ອງແກ້ `web/src/code-map.mjs` ນຳ — build ຈະແຈ້ງ error ຖ້າ id ຫົວຂໍ້ບໍ່ກົງ

## Deploy ຂຶ້ນ Cloudflare (Workers Builds)

ເຊື່ອມ repo ນີ້ກັບ Cloudflare ຄັ້ງດຽວ ຫຼັງຈາກນັ້ນທຸກຄັ້ງທີ່ push, Cloudflare ຈະ build ແລະ deploy ໃຫ້ອັດຕະໂນມັດ

| ຊ່ອງ | ຄ່າ |
|---|---|
| Project / Worker name | `learn-java-review` (ຕ້ອງກົງກັບ `name` ໃນ `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (ຄ່າເລີ່ມຕົ້ນ) |

ເອກະສານ: https://developers.cloudflare.com/workers/ci-cd/builds/
