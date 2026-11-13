# student_app_firebase — ລະບົບຈັດການນັກສຶກສາ ເວີຊັນ Firebase

ຕໍ່ຍອດຈາກ `../student_app` (ໂຄ້ດໃນສະໄລ) ໂດຍ:

1. **ປ່ຽນບ່ອນເກັບຂໍ້ມູນ** ຈາກ SharedPreferences (ໃນເຄື່ອງ) → **Cloud Firestore** (ເທິງ Cloud, ອັບເດດ Realtime ທຸກເຄື່ອງ)
2. **ເພີ່ມ Firebase Authentication** — ໜ້າ ເຂົ້າສູ່ລະບົບ / ສະໝັກສະມາຊິກ, ປຸ່ມອອກຈາກລະບົບ, `AuthGate` ສະຫຼັບໜ້າຈໍຕາມ `authStateChanges()`
3. **ແກ້ບັນຫາທີ່ພົບໃນໂຄ້ດສະໄລ** — ກວດຕົວເລກໃນຟອມ, ຢືນຢັນກ່ອນລຶບ + ຍົກເລີກ (Undo), ຊ່ອງອີເມວ, ລາຍຊື່ສາຂາບ່ອນດຽວ, ຈັດລຽງຊື່ພາສາລາວ, API ໃໝ່ແທນ API ທີ່ເລີກໃຊ້
4. **ຕົວຢ່າງ Firebase Storage** (`lib/services/storage_service.dart`) — ເລືອກຮູບດ້ວຍ `image_picker` ແລ້ວອັບໂຫຼດ (ຍັງບໍ່ໄດ້ເຊື່ອມກັບໜ້າຈໍ ເປັນແບບຝຶກຫັດ)
5. **ໂຄ້ດຄຳຕອບຂໍ້ສອບກາງພາກ** (`lib/examples/exam_answers.dart`) — ກວດແລ້ວວ່າ compile ຜ່ານ

> ✅ ກວດແລ້ວດ້ວຍ Flutter 3.50.0: `flutter analyze` ບໍ່ມີ error / warning · `flutter build web` ຜ່ານ
> ✅ ທົດສອບຈິງກັບ Firebase Emulator (Auth + Firestore): ສະໝັກ → ເພີ່ມນັກສຶກສາ → Logout → Login ໃໝ່ຂໍ້ມູນຍັງຢູ່ → ປັດລຶບ + ຢືນຢັນ → Undo — ຜ່ານທຸກຂັ້ນ

## ກ່ອນລັນ: ເຊື່ອມກັບ Firebase project ຂອງທ່ານ

ໄຟລ໌ `lib/firebase_options.dart` ໃນ repo ເປັນ **ຕົວແທນຊົ່ວຄາວ** (ລັນແລ້ວຈະແຈ້ງ error ຈົນກວ່າຈະຕັ້ງຄ່າ)

1. ສ້າງ project ທີ່ https://console.firebase.google.com → ເປີດ **Authentication** (Email/Password), **Firestore Database** ແລະ **Storage**
2. ຕິດຕັ້ງເຄື່ອງມື ແລະ ເຊື່ອມ project (ຈະຂຽນທັບ `firebase_options.dart` ໃຫ້ອັດຕະໂນມັດ):

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

```bash
dart pub global activate flutterfire_cli
```

```bash
flutterfire configure
```

3. ເອົາ Security Rules ໃນ `firestore.rules` ແລະ `storage.rules` ໄປວາງໃນ Firebase Console (ແຖບ Rules)
4. ລັນ:

```bash
flutter pub get
```

```bash
flutter run -d chrome
```

## ໄຟລ໌ທີ່ຕ່າງຈາກ student_app

| ໄຟລ໌ | ການປ່ຽນແປງ |
|---|---|
| `lib/main.dart` | `async main()` + `WidgetsFlutterBinding.ensureInitialized()` + `Firebase.initializeApp()` · ໜ້າທຳອິດເປັນ `AuthGate` |
| `lib/providers/student_provider.dart` | ໃຊ້ Firestore: `.snapshots()` (Realtime), `.add()`, `.update()`, `.delete()` · ຊື່ method ຄືເກົ່າ |
| `lib/screens/auth_gate.dart` | ໃໝ່ — `StreamBuilder` + `authStateChanges()` |
| `lib/screens/login_screen.dart` | ໃໝ່ — ເຂົ້າສູ່ລະບົບ / ສະໝັກ + ສົ່ງອີເມວຢືນຢັນ |
| `lib/services/auth_service.dart` | ໃໝ່ — ລວມຄຳສັ່ງ Auth + ແປ error ເປັນພາສາລາວ |
| `lib/services/storage_service.dart` | ໃໝ່ — ອັບໂຫຼດຮູບ + `getDownloadURL()` |
| `lib/constants/majors.dart` | ໃໝ່ — ລາຍຊື່ສາຂາບ່ອນດຽວ |
| `lib/screens/student_form_screen.dart` | ກວດຕົວເລກ/ຂອບເຂດ, ຊ່ອງອີເມວ, `initialValue` |
| `lib/screens/student_list_screen.dart` | ປຸ່ມອອກຈາກລະບົບ, ສະຖານະກຳລັງໂຫຼດ, Undo ຫຼັງລຶບ |
| `lib/widgets/student_card.dart` | `confirmDismiss` ຖາມກ່ອນລຶບ, `withValues()` |
