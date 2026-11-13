# student_app — ລະບົບຈັດການນັກສຶກສາ (Flutter + Provider + SharedPreferences)

ໂຄ້ດຊຸດນີ້ພິມຄືນຈາກສະໄລບົດຮຽນ **ທຸກແຖວກົງກັບສະໄລ** (ເລກແຖວຄືກັນ) — ບົດອະທິບາຍທີລະແຖວຢູ່ໃນເວັບທົບທວນ ໜ້າ **Flutter** (`/flutter/`)

> ✅ ກວດແລ້ວດ້ວຍ Flutter 3.50.0 (Dart 3.14): `flutter analyze` ບໍ່ມີ error / warning ແລະ `flutter build web` ຜ່ານ — ໜ້າຈໍທີ່ໄດ້ຄືກັບໃນສະໄລ
> ℹ️ ຍັງມີ "info" ເຕືອນ API ທີ່ເລີກໃຊ້ (deprecated) ເຊັ່ນ `withOpacity`, `value:` ຂອງ Dropdown — ເຈດຕະນາຮັກສາໄວ້ໃຫ້ຄືສະໄລ · ວິທີແກ້ຢູ່ໃນບົດຮຽນ ຫົວຂໍ້ "ຈຸດທີ່ຄວນລະວັງ"

## ໂຄງສ້າງ

```
lib/
├── models/student_model.dart        ໂຄງສ້າງຂໍ້ມູນນັກສຶກສາ + ແປງ Map/JSON
├── providers/student_provider.dart  State (ChangeNotifier): CRUD, ຄົ້ນຫາ, ກັ່ນຕອງ, ຈັດລຽງ, ບັນທຶກລົງເຄື່ອງ
├── screens/
│   ├── student_list_screen.dart     ໜ້າຫຼັກ: Dashboard + ຄົ້ນຫາ + ລາຍການ
│   └── student_form_screen.dart     ຟອມ ເພີ່ມ / ແກ້ໄຂ
├── widgets/
│   ├── dashboard_header.dart        ບັດສະຫຼຸບ 3 ຕົວເລກ
│   ├── student_card.dart            ບັດນັກສຶກສາ 1 ຄົນ (ປັດລຶບ, ເມນູ ⋮)
│   ├── search_bar_widget.dart       ຊ່ອງຄົ້ນຫາ + ຊິບສາຂາ
│   └── empty_state_widget.dart      ໜ້າຈໍຕອນບໍ່ມີຂໍ້ມູນ
└── main.dart                        ຈຸດເລີ່ມຕົ້ນ + MultiProvider
```

## ວິທີລັນ

```bash
flutter pub get
```

```bash
flutter run -d chrome
```

ລັນໃນມືຖື Android: ເປີດ emulator ຫຼື ສຽບມືຖື (ເປີດ USB debugging) ແລ້ວ `flutter run`

## Package ທີ່ໃຊ້

| Package | ໃຊ້ເຮັດຫຍັງ |
|---|---|
| `provider` | ຈັດການ State (ແບບ Observer) |
| `shared_preferences` | ເກັບຂໍ້ມູນແບບ Key-Value ໃນເຄື່ອງ (ປິດແອັບແລ້ວຂໍ້ມູນຍັງຢູ່) |
| `image_picker` | ຕິດຕັ້ງໄວ້ຕາມສະໄລ ແຕ່ **ຍັງບໍ່ໄດ້ໃຊ້** ໃນໂຄ້ດ |
