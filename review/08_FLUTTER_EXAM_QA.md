# ຄຳຖາມຄົ້ນຄວ້າສອບເສັງກາງພາກ Flutter (50 ຂໍ້)

> 📄 ຄຳຖາມ ແລະ ຄຳຕອບຈາກເອກະສານ "ຄຳຖາມຄົ້ນຄວ້າສອບເສັງກາງພາກ ສົກຮຽນ 2026-2027" (ແກ້ຄຳພິມຜິດເລັກນ້ອຍ) · **💡 ເພີ່ມເຕີມ** = ຄຳອະທິບາຍທີ່ເພີ່ມໃຫ້ເຂົ້າໃຈເລິກຂຶ້ນ
> ✅ ໂຄ້ດຄຳຕອບທຸກຂໍ້ຢູ່ໃນ `flutter/student_app_firebase/lib/examples/exam_answers.dart` — ກວດແລ້ວດ້ວຍ `flutter analyze` (Flutter 3.50)
> ✍️ ເປີດໂໝດ **ຝຶກຕອບ** → ຄິດຄຳຕອບກ່ອນ → ກົດ **ສະແດງຄຳຕອບ** → ປະເມີນ "ຈື່ໄດ້ / ທວນອີກ"
>
> 📚 ອ່ານເນື້ອຫາ: **[ບົດຮຽນ Flutter](/flutter/)** · **[Flutter + Firebase](/firebase/)** · ລອງສອບ: **[ຂໍ້ສອບລອງທຳ](/flutter-exam/)**

## ໝວດທີ 1: ພື້ນຖານ Flutter, CLI, ການຕັ້ງຄ່າ Project ແລະ Lifecycle

ຂໍ້ 1–10 · ເນື້ອຫາໃນ [ບົດ Flutter ຫົວຂໍ້ 3–5](/flutter/#sec-3) ແລະ [ບົດ Firebase ຫົວຂໍ້ 2](/firebase/#sec-2)

## ຂໍ້ 1. ຄຳສັ່ງໃດໃນ Command Line ທີ່ໃຊ້ສຳລັບສ້າງ Project Flutter ໃໝ່?

```bash
flutter create <project_name>
```

💡 **ເພີ່ມເຕີມ:** ຊື່ project ໃຊ້ຕົວອັກສອນນ້ອຍ ແລະ `_` ເທົ່ານັ້ນ (ເຊັ່ນ `student_app`) · ລັນດ້ວຍ `cd student_app` ແລ້ວ `flutter run`

## ຂໍ້ 2. ໄຟລ໌ pubspec.yaml ໃນ Project Flutter ມີໜ້າທີ່ຫຼັກ ແລະ ຄວາມສຳຄັນແນວໃດ?

ໃຊ້ສຳລັບ **ຈັດການ Dependencies** (Package/Library ຕ່າງໆທີ່ໃຊ້ໃນ Project), **ກຳນົດ Version ຂອງແອັບ**, **ຕັ້ງຄ່າ Assets** (ຮູບພາບ, Fonts) ແລະ ການຕັ້ງຄ່າກ່ຽວກັບ Project

💡 **ເພີ່ມເຕີມ:** ແກ້ pubspec.yaml ແລ້ວຕ້ອງ `flutter pub get` · `^2.2.2` = ເວີຊັນ 2.2.2 ຂຶ້ນໄປແຕ່ຕ່ຳກວ່າ 3.0.0 · `version: 1.0.0+1` = ຊື່ເວີຊັນ + build number — [ອ່ານເພີ່ມ](/flutter/#sec-5-2)

## ຂໍ້ 3. ໄຟລ໌ຄອນຟິກຂອງ Android (google-services.json) ແລະ iOS (GoogleService-Info.plist) ທີ່ໄດ້ຈາກ Firebase Console ຕ້ອງເອົາໄປວາງໄວ້ຢູ່ Folder ໃດຂອງ Project?

| Platform | ໄຟລ໌ | ວາງໄວ້ທີ່ |
|---|---|---|
| Android | `google-services.json` | `android/app/` |
| iOS | `GoogleService-Info.plist` | `ios/Runner/` (ຜ່ານ Xcode) |

💡 **ເພີ່ມເຕີມ:** ຖ້າໃຊ້ `flutterfire configure` ເຄື່ອງມືຈະຈັດການໃຫ້ອັດຕະໂນມັດ — [ອ່ານເພີ່ມ](/firebase/#sec-2-3)

## ຂໍ້ 4. ໃນການເລີ່ມຕົ້ນຕັ້ງຄ່າ Flutter ໃຫ້ເຮັດວຽກຮ່ວມກັບ Firebase ເວີຊັນປັດຈຸບັນ ເຄື່ອງມື CLI ໃດທີ່ນິຍົມໃຊ້ສ້າງໄຟລ໌ firebase_options.dart?

**FlutterFire CLI** — ຄຳສັ່ງ `flutterfire configure`

💡 **ເພີ່ມເຕີມ:** ຕິດຕັ້ງດ້ວຍ `dart pub global activate flutterfire_cli` ແລະ ຕ້ອງ `firebase login` (Firebase CLI) ກ່ອນ

## ຂໍ້ 5. ຟັງຊັນຫຼັກ (Function) ໃດທີ່ໃຊ້ເປັນຈຸດເລີ່ມຕົ້ນຂອງການເຮັດວຽກໃນ Flutter App?

**`main()`**

```dart
void main() {
  runApp(const MyApp());   // runApp() ເອົາ widget ທຳອິດຂຶ້ນສະແດງ
}
```

## ຂໍ້ 6. ເປັນຫຍັງຈຶ່ງຕ້ອງເອີ້ນໃຊ້ WidgetsFlutterBinding.ensureInitialized() ກ່ອນ Firebase.initializeApp() ໃນຟັງຊັນ main()?

ເພື່ອ **ຮັບປະກັນວ່າ Flutter Engine ໄດ້ຖືກຜູກມັດ (Bound) ແລະ ພ້ອມໃຊ້ງານແລ້ວ** ກ່ອນທີ່ຈະມີການເອີ້ນໃຊ້ **Platform Channels** (ເຊັ່ນ ການຕິດຕໍ່ສື່ສານກັບ Native Services ຂອງ Firebase ຕອນເລີ່ມຕົ້ນແອັບ)

```dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}
```

## ຂໍ້ 7. ໃນ Stateful Widget, Lifecycle function ໃດທີ່ຖືກເອີ້ນເຮັດວຽກພຽງຄັ້ງດຽວເມື່ອ Widget ຖືກສ້າງຂຶ້ນມາ?

**`initState()`**

💡 **ເພີ່ມເຕີມ:** ຕ້ອງເອີ້ນ `super.initState()` ເປັນແຖວທຳອິດ · ໃຊ້ສ້າງ controller, ເລີ່ມຟັງ Stream, ຕັ້ງຄ່າເລີ່ມຕົ້ນ — [ເບິ່ງແຜນພາບ Lifecycle](/flutter/#sec-4-3)

## ຂໍ້ 8. Lifecycle function ໃດທີ່ຖືກເອີ້ນໃຊ້ງານເມື່ອ Widget ຖືກທຳລາຍ ຫຼື ຖອດອອກຈາກ Widget Tree?

**`dispose()`**

💡 **ເພີ່ມເຕີມ:** ເອີ້ນ `super.dispose()` ເປັນແຖວ **ສຸດທ້າຍ** · ໃຊ້ຄືນ memory ຂອງ controller ແລະ ຍົກເລີກ StreamSubscription

## ຂໍ້ 9. ເປັນຫຍັງເຮົາຈຶ່ງຄວນຄືນ Memory ໃຫ້ກັບ TextEditingController ໃນ dispose()?

ເພື່ອ **ປ້ອງກັນບັນຫາ Memory Leak** (ການຮົ່ວໄຫຼຂອງໜ່ວຍຄວາມຈຳ) ຍ້ອນ Controller ຍັງຖືກເກັບໄວ້ໃນໜ່ວຍຄວາມຈຳຫຼັງຈາກ Widget ຖືກປິດໄປແລ້ວ

```dart
@override
void dispose() {
  _nameController.dispose();
  _ageController.dispose();
  super.dispose();
}
```

## ຂໍ້ 10. Future ແລະ Stream ໃນພາສາ Dart ມີຄວາມແຕກຕ່າງກັນແນວໃດໃນການຈັດການ Async Operation?

| | Future | Stream |
|---|---|---|
| ຜົນລັບ | ຄ່າ **ຄັ້ງດຽວ** (Single value) ໃນອະນາຄົດ | ສົ່ງຂໍ້ມູນ **ຕໍ່ເນື່ອງຫຼາຍຄັ້ງ** (Multiple events over time) |
| ຕົວຢ່າງ | ດຶງຂໍ້ມູນເທື່ອດຽວ `.get()` | ຂໍ້ມູນ Real-time `.snapshots()` |
| ຮັບຄ່າ | `await` / `FutureBuilder` | `listen()` / `StreamBuilder` |

## ໝວດທີ 2: Firebase Authentication ແລະ State Management

ຂໍ້ 11–20 · ເນື້ອຫາໃນ [ບົດ Firebase ຫົວຂໍ້ 3](/firebase/#sec-3)

## ຂໍ້ 11. Package ໃດໃນ Flutter ທີ່ຈຳເປັນຕ້ອງຕິດຕັ້ງເພື່ອໃຊ້ງານ System Authentication ຂອງ Firebase?

**`firebase_auth`** (ພ້ອມ `firebase_core` ທີ່ທຸກບໍລິການຕ້ອງມີ)

```bash
flutter pub add firebase_core firebase_auth
```

## ຂໍ້ 12. ຄຳສັ່ງໃດທີ່ໃຊ້ສຳລັບສ້າງຜູ້ໃຊ້ງານ (User) ໃໝ່ດ້ວຍ Email ແລະ Password ໃນ Firebase Auth?

```dart
FirebaseAuth.instance.createUserWithEmailAndPassword(email: email, password: password);
```

💡 **ເພີ່ມເຕີມ:** ສະໝັກສຳເລັດ = Login ໃຫ້ອັດຕະໂນມັດ · ລະຫັດຜ່ານສັ້ນກວ່າ 6 ຕົວ = error `weak-password`

## ຂໍ້ 13. ຄຳສັ່ງໃດທີ່ໃຊ້ສຳລັບເຂົ້າສູ່ລະບົບ (Sign In) ດ້ວຍ Email ແລະ Password?

```dart
FirebaseAuth.instance.signInWithEmailAndPassword(email: email, password: password);
```

## ຂໍ້ 14. ຫາກຕ້ອງການດຶງຂໍ້ມູນ User ທີ່ກຳລັງ Login ຢູ່ໃນປັດຈຸບັນ ຕ້ອງເອີ້ນໃຊ້ Property ໃດຈາກ FirebaseAuth.instance?

**`FirebaseAuth.instance.currentUser`** — ຄືນ `User?` (`null` = ຍັງບໍ່ Login)

💡 **ເພີ່ມເຕີມ:** `currentUser?.uid`, `currentUser?.email`, `currentUser?.emailVerified`

## ຂໍ້ 15. ຄຳສັ່ງໃດທີ່ໃຊ້ສຳລັບ Sign Out ຫຼື ອອກຈາກລະບົບ Firebase?

```dart
await FirebaseAuth.instance.signOut();
```

## ຂໍ້ 16. Stream ໃດໃນ firebase_auth ທີ່ໃຊ້ຕິດຕາມການປ່ຽນແປງສະຖານະ Login/Logout ຂອງຜູ້ໃຊ້ແບບ Realtime?

**`FirebaseAuth.instance.authStateChanges()`** (ຫຼື `userChanges()`)

💡 **ເພີ່ມເຕີມ:** `authStateChanges()` ສົ່ງຄ່າເມື່ອ Login/Logout · `idTokenChanges()` ເພີ່ມຕອນ token ປ່ຽນ · `userChanges()` ເພີ່ມຕອນແກ້ໂປຣໄຟລ໌

## ຂໍ້ 17. ຫາກຕ້ອງການສົ່ງ Email ຢືນຢັນຕົວຕົນໃຫ້ຜູ້ໃຊ້ຫຼັງຈາກສະໝັກສະມາຊິກແລ້ວ ຕ້ອງໃຊ້ Method ໃດ?

ເອີ້ນ **`sendEmailVerification()`** ຈາກວັດຖຸ User

```dart
final cred = await FirebaseAuth.instance.createUserWithEmailAndPassword(email: email, password: password);
await cred.user?.sendEmailVerification();
```

## ຂໍ້ 18. ອະທິບາຍປະໂຫຍດຂອງການໃຊ້ Provider ຫຼື State Management ໃນການຈັດການ Auth State (Login/Logout) ຂອງ Mobile App

ຊ່ວຍໃຫ້ **ການແບ່ງປັນສະຖານະ (State) ຂອງ User ໄປທົ່ວທັງແອັບເປັນລະບຽບ**, **ຫຼຸດຜ່ອນການສົ່ງຄ່າຜ່ານ constructor ທີລະຊັ້ນ (Prop Drilling)** ແລະ ເຮັດໃຫ້ **UI ອັບເດດ (Rebuild) ອັດຕະໂນມັດທັນທີ** ເມື່ອຜູ້ໃຊ້ Login ຫຼື Logout

💡 **ເພີ່ມເຕີມ:** ໃນແອັບນັກສຶກສາເວີຊັນ Firebase, `StudentProvider` ຟັງ `authStateChanges()` — Logout ແລ້ວລ້າງຂໍ້ມູນໃຫ້ເອງ ຜູ້ໃຊ້ຄົນຕໍ່ໄປບໍ່ເຫັນຂໍ້ມູນເກົ່າ — [ອ່ານເພີ່ມ](/firebase/#sec-3-5)

## ຂໍ້ 19. Widget ໃດທີ່ເໝາະສົມທີ່ສຸດໃນການໃຊ້ສັບປ່ຽນໜ້າຈໍ Login ແລະ ໜ້າ Main App ຕາມສະຖານະ Authentication ທີ່ໄດ້ຈາກ Stream?

**`StreamBuilder`** (ມັກໃຊ້ຮ່ວມກັບ `authStateChanges()`)

```dart
StreamBuilder<User?>(
  stream: FirebaseAuth.instance.authStateChanges(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) return const CircularProgressIndicator();
    return snapshot.data == null ? const LoginScreen() : const StudentListScreen();
  },
)
```

## ຂໍ້ 20. ການເຮັດ Log Out ໃນ App ທີ່ໃຊ້ Provider + Firebase Auth ມີຂັ້ນຕອນການເຮັດວຽກຫຼັກໆແນວໃດ?

1. ຜູ້ໃຊ້ກົດປຸ່ມ Logout ໃນ UI ➔ ສົ່ງຄຳສັ່ງໄປຫາ Provider (ViewModel / ChangeNotifier)
2. Provider ເອີ້ນຄຳສັ່ງ `FirebaseAuth.instance.signOut()`
3. Firebase Auth ປ່ຽນສະຖານະ ແລະ ຍິງ Event ຜ່ານ `authStateChanges()` Stream
4. `StreamBuilder` ທີ່ກວມເອົາ Root Widget ຮັບຮູ້ການປ່ຽນແປງ ແລະ ສະຫຼັບ UI ໄປສະແດງໜ້າ Login ໃຫ້ອັດຕະໂນມັດ

## ໝວດທີ 3: Cloud Firestore (NoSQL Document Database)

ຂໍ້ 21–35 · ເນື້ອຫາໃນ [ບົດ Firebase ຫົວຂໍ້ 4](/firebase/#sec-4)

## ຂໍ້ 21. Cloud Firestore ມີໂຄງສ້າງ (Structure) ການເກັບຂໍ້ມູນຫຼັກໆເປັນແບບໃດ?

ເປັນແບບ **Document-based / Collection-based (NoSQL)** — ຂໍ້ມູນເກັບເປັນ **Document** (ຮູບແບບ JSON / Key-Value) ໄວ້ໃນ **Collection** ແລະ ພາຍໃນ Document ສາມາດມີ **Sub-collection** ໄດ້ອີກ

💡 **ເພີ່ມເຕີມ:** Collection → Document → Field — [ເບິ່ງແຜນພາບ](/firebase/#sec-4-1)

## ຂໍ້ 22. ຂໍ້ມູນປະເພດໃດແດ່ທີ່ສາມາດເກັບລົງໃນ Document ຂອງ Cloud Firestore ໄດ້?

String, Number (Integer / Double), Boolean, Array, Map (Nested objects), Null, Timestamp, **GeoPoint** (ຈຸດພິກັດ GPS) ແລະ **Reference** (ອ້າງອີງເຖິງ Document ອື່ນ)

💡 **ເພີ່ມເຕີມ:** ມີ Bytes ອີກຊະນິດ · Document ໃຫຍ່ສຸດ 1 MB — ໄຟລ໌ໃຫຍ່ໃຫ້ເກັບໃນ Storage

## ຂໍ້ 23. Cloud Firestore ມີຂໍ້ດີ ແລະ ຂໍ້ແຕກຕ່າງແນວໃດເມື່ອທຽບກັບ Relational Database (SQL)?

**ຂໍ້ດີ / ຄວາມແຕກຕ່າງ:** ຍືດຫຍຸ່ນສູງ (**Schemaless** — ບໍ່ຈຳເປັນຕ້ອງກຳນົດໂຄງສ້າງຕາຕະລາງລ່ວງໜ້າ), ຂະຫຍາຍລະບົບງ່າຍ (**Scalability**), ຮອງຮັບ **Real-time sync** ໄດ້ດີຫຼາຍ — ແຕ່ **ບໍ່ເໝາະກັບ Query ທີ່ຊັບຊ້ອນຫຼາຍຕາຕະລາງ** (JOIN ໂດຍກົງຄື SQL ບໍ່ໄດ້)

💡 **ເພີ່ມເຕີມ:** ຍັງໃຊ້ offline ໄດ້ ແລະ ຄິດເງິນຕາມຈຳນວນອ່ານ/ຂຽນ — [ເບິ່ງຕາຕະລາງທຽບ](/firebase/#sec-4-2)

## ຂໍ້ 24. ການເພີ່ມຂໍ້ມູນໃໝ່ລົງໃນ Collection ໂດຍໃຊ້ .add() ແລະ ການໃຊ້ .doc(id).set() ມີຄວາມແຕກຕ່າງກັນແນວໃດ?

- **`.add()`** — Firestore **ສຸ່ມລະຫັດ Document ID (Auto-ID)** ໃຫ້ອັດຕະໂນມັດ
- **`.doc(id).set()`** — ເຮົາ **ກຳນົດ Document ID ເອງ** ໄດ້ຕາມໃຈມັກ

💡 **ເພີ່ມເຕີມ:** `.set()` ທີ່ບໍ່ມີ merge ຈະ **ຂຽນທັບທັງ Document** ຖ້າ ID ນັ້ນມີຢູ່ແລ້ວ

## ຂໍ້ 25. ຫາກຕ້ອງການລະບຸ Document ID ເອງ (ເຊັ່ນ ໃຊ້ UID ຂອງ User ເປັນ Document ID) ຕ້ອງໃຊ້ຄຳສັ່ງແນວໃດ?

```dart
FirebaseFirestore.instance.collection('users').doc(userId).set({...});
```

💡 **ເພີ່ມເຕີມ:** `userId` ມັກເອົາຈາກ `FirebaseAuth.instance.currentUser!.uid` — ເຮັດໃຫ້ 1 ຜູ້ໃຊ້ມີ 1 Document ແລະ ຂຽນ Rules `request.auth.uid == userId` ໄດ້ງ່າຍ

## ຂໍ້ 26. ຄຳສັ່ງ .update() ແລະ .set(data, SetOptions(merge: true)) ໃນ Firestore ເຮັດວຽກຕ່າງກັນແນວໃດ?

- **`.update()`** — ແກ້ໄຂ Field ສະເພາະ · ຖ້າ Document **ບໍ່ມີຢູ່ຈິງ ຈະເກີດ Error**
- **`.set(..., SetOptions(merge: true))`** — ຖ້າມີ Document ຢູ່ແລ້ວ: ອັບເດດ/ເພີ່ມສະເພາະ Field ທີ່ສົ່ງໄປ (ຮັກສາ Field ເກົ່າໄວ້) · ຖ້າ **ຍັງບໍ່ມີ** Document: **ສ້າງໃໝ່ທັນທີ**

## ຂໍ້ 27. ຄຳສັ່ງ .delete() ໃນ Cloud Firestore ໃຊ້ສຳລັບລຶບຂໍ້ມູນສ່ວນໃດ?

ໃຊ້ **ລຶບ Document ທັງໝົດ** · ຖ້າຕ້ອງການລຶບສະເພາະ Field ຕ້ອງໃຊ້:

```dart
.update({'fieldName': FieldValue.delete()});
```

💡 **ເພີ່ມເຕີມ:** ລຶບ Document **ບໍ່ໄດ້ລຶບ Sub-collection** ຂ້າງໃນ

## ຂໍ້ 28. ຫາກຕ້ອງການດຶງຂໍ້ມູນຈາກ Cloud Firestore ພຽງຄັ້ງດຽວ (ບໍ່ Realtime) ຕ້ອງໃຊ້ Method ໃດ ແລະ ຄືນຄ່າເປັນຫຍັງ?

ໃຊ້ **`.get()`** — ເປັນການດຶງຂໍ້ມູນແບບ **One-time fetch** ຄືນຄ່າເປັນ `Future<QuerySnapshot>` (ຫຼື `Future<DocumentSnapshot>` ເມື່ອດຶງ Document ດຽວ) · ປະຫຍັດ Network ແລະ ຈຳນວນ Reads ຂອງ Database ເມື່ອບໍ່ຈຳເປັນຕ້ອງອັບເດດ Realtime

## ຂໍ້ 29. ຫາກຕ້ອງການດຶງຂໍ້ມູນແບບ Realtime (ອັບເດດ UI ທັນທີເມື່ອຂໍ້ມູນໃນ Database ປ່ຽນ) ຕ້ອງໃຊ້ Method ໃດ?

**`.snapshots()`** — ຄືນ `Stream<QuerySnapshot>` ໃຊ້ຄູ່ກັບ `StreamBuilder` ຫຼື `.listen()`

## ຂໍ້ 30. ຄຳສັ່ງ .where() ແລະ .orderBy() ໃນ Firestore ໃຊ້ສຳລັບເຮັດຫຍັງ?

- **`.where()`** — **ກັ່ນຕອງ / ຊອກຫາຂໍ້ມູນ (Filtering)** ຕາມເງື່ອນໄຂ (ເທົ່າກັນ, ຫຼາຍກວ່າ, ໜ້ອຍກວ່າ …)
- **`.orderBy()`** — **ຈັດລຽງລຳດັບຂໍ້ມູນ** ຕາມ Field ທີ່ກຳນົດ (ໜ້ອຍ→ຫຼາຍ ຫຼື `descending: true` ຫຼາຍ→ໜ້ອຍ)

```dart
.where('gpa', isGreaterThanOrEqualTo: 3.5).orderBy('gpa', descending: true)
```

## ຂໍ້ 31. ເປັນຫຍັງການ Query ຂໍ້ມູນແບບຫຼາຍ Field ພ້ອມກັນ (ເຊັ່ນ .where() ຮ່ວມກັບ .orderBy()) ຈຶ່ງຕ້ອງໄປສ້າງ Index ໃນ Firebase Console ກ່ອນ?

ເພື່ອໃຫ້ Firestore ສ້າງ **Composite Index** ຊ່ວຍໃຫ້ Database ຄົ້ນຫາ ແລະ ຈັດລຽງຂໍ້ມູນຫຼາຍ Field ພ້ອມກັນໄດ້ຢ່າງວ່ອງໄວ (ຫຼີກລ່ຽງການ Scan ຂໍ້ມູນທັງໝົດ ຊຶ່ງຈະເຮັດໃຫ້ Query ບໍ່ສຳເລັດ)

💡 **ເພີ່ມເຕີມ:** ລັນ query ຄັ້ງທຳອິດຈະໄດ້ error `failed-precondition` ທີ່ມີ **ລິ້ງ** ກົດແລ້ວສ້າງ index ໃຫ້ເລີຍ (ລໍ 1–2 ນາທີ)

## ຂໍ້ 32. Method .limit() ໃນ Firestore Query ມີໄວ້ເພື່ອປະໂຫຍດຫຍັງ?

ໃຊ້ **ຈຳກັດຈຳນວນຜົນລັບ** ທີ່ຈະດຶງອອກມາ (ເຊັ່ນ ດຶງມາສະແດງພຽງ 10 ລາຍການທຳອິດ) ຊ່ວຍ **ປະຫຍັດ Bandwidth** ແລະ **ໂຫຼດໄວຂຶ້ນ**

💡 **ເພີ່ມເຕີມ:** ຍັງຫຼຸດ **ຄ່າໃຊ້ຈ່າຍ** (Firestore ຄິດເງິນຕາມຈຳນວນ Document ທີ່ອ່ານ) ແລະ ໃຊ້ຄູ່ກັບ `startAfterDocument()` ເຮັດ Pagination (ໂຫຼດເພີ່ມທີລະໜ້າ)

## ຂໍ້ 33. ການດຶງຄ່າເວລາປັດຈຸບັນຈາກ Server ຂອງ Firestore ເພື່ອປ້ອງກັນເວລາເຄື່ອງຜູ້ໃຊ້ບໍ່ກົງກັນ ຕ້ອງໃຊ້ຄຳສັ່ງໃດ?

```dart
FieldValue.serverTimestamp()
```

💡 **ເພີ່ມເຕີມ:** ຕ່າງຈາກ `DateTime.now()` ຫຼື `Timestamp.now()` ທີ່ເອົາເວລາຈາກເຄື່ອງຜູ້ໃຊ້ (ອາດຕັ້ງຜິດ)

## ຂໍ້ 34. ຫາກຕ້ອງການດຶງ Document ID ຈາກ QuerySnapshot ທີ່ໄດ້ມາຈາກ Firestore ຕ້ອງເອີ້ນໃຊ້ຜ່ານ Property ໃດ?

ຜ່ານ **`doc.id`**

```dart
for (var doc in snapshot.docs) {
  print(doc.id);
}
```

## ຂໍ້ 35. ໃນການກຳນົດ Cloud Firestore Security Rules, ເງື່ອນໄຂ allow read, write: if request.auth != null; ໝາຍເຖິງຫຍັງ?

ອະນຸຍາດໃຫ້ຜູ້ໃຊ້ **ອ່ານ (Read) ແລະ ຂຽນ (Write)** ຂໍ້ມູນໄດ້ **ກໍຕໍ່ເມື່ອຜູ້ໃຊ້ນັ້ນໄດ້ Login ເຂົ້າສູ່ລະບົບແລ້ວເທົ່ານັ້ນ** (ປ້ອງກັນບໍ່ໃຫ້ຄົນທີ່ບໍ່ໄດ້ Login ເຂົ້າມາແກ້ໄຂຂໍ້ມູນ)

💡 **ເພີ່ມເຕີມ:** ທຸກຄົນທີ່ Login ຍັງແກ້ຂໍ້ມູນຂອງຄົນອື່ນໄດ້ — ຖ້າຢາກໃຫ້ແກ້ໄດ້ແຕ່ຂອງຕົນເອງ ໃຊ້ `request.auth.uid == userId` — [ອ່ານເພີ່ມ](/firebase/#sec-4-8)

## ໝວດທີ 4: Firebase Storage ແລະ Async Widgets (StreamBuilder / FutureBuilder)

ຂໍ້ 36–42 · ເນື້ອຫາໃນ [ບົດ Firebase ຫົວຂໍ້ 5–6](/firebase/#sec-5)

## ຂໍ້ 36. Firebase Storage ໃຊ້ສຳລັບຈັດເກັບຂໍ້ມູນປະເພດໃດເປັນຫຼັກ?

ໃຊ້ຈັດເກັບ **Files ຂະໜາດໃຫຍ່ (Binary Files)** ເຊັ່ນ ຮູບພາບ (Images), ວິດີໂອ (Videos), ໄຟລ໌ສຽງ (Audio) ແລະ ໄຟລ໌ເອກະສານຕ່າງໆ

## ຂໍ້ 37. Package ໃດໃນ Flutter ທີ່ໃຊ້ສຳລັບການອັບໂຫຼດ ແລະ ຈັດການໄຟລ໌ໃນ Firebase Storage?

**`firebase_storage`**

💡 **ເພີ່ມເຕີມ:** ມັກໃຊ້ຄູ່ກັບ `image_picker` ເພື່ອເລືອກຮູບຈາກຄັງຮູບ ຫຼື ກ້ອງ — [ເບິ່ງໂຄ້ດ](/firebase/#sec-6)

## ຂໍ້ 38. ຫາກຕ້ອງການດຶງ URL ຂອງຮູບພາບຈາກ Firebase Storage ມາສະແດງໃນ Widget Image ຂອງ Flutter ຕ້ອງໃຊ້ Method ໃດ?

**`getDownloadURL()`**

```dart
final url = await storageRef.getDownloadURL();
Image.network(url);
```

## ຂໍ້ 39. ຄວາມແຕກຕ່າງຫຼັກໆລະຫວ່າງ FutureBuilder ແລະ StreamBuilder ໃນ Flutter ມີຫຍັງແດ່?

- **FutureBuilder** — ສະແດງ UI ຕາມຜົນລັບຂອງ Future ທີ່ສົ່ງຄ່າອອກມາ **ພຽງຄັ້ງດຽວ** ແລ້ວຈົບ (One-time async operation)
- **StreamBuilder** — ຟັງເຫດການຈາກ Stream ທີ່ສົ່ງຄ່າອອກມາໄດ້ **ຫຼາຍຄັ້ງຢ່າງຕໍ່ເນື່ອງ** (Real-time updates) — UI **Rebuild ທຸກຄັ້ງ** ທີ່ມີຂໍ້ມູນໃໝ່ເຂົ້າມາ

## ຂໍ້ 40. ໃນການໃຊ້ງານ StreamBuilder, Property ໃດຂອງ AsyncSnapshot ທີ່ໃຊ້ກວດສອບວ່າກຳລັງລໍຖ້າຂໍ້ມູນຢູ່ ຫຼື ບໍ່?

```dart
snapshot.connectionState == ConnectionState.waiting
```

💡 **ເພີ່ມເຕີມ:** ConnectionState ມີ 4 ຄ່າ: `none`, `waiting`, `active` (Stream ກຳລັງສົ່ງ), `done` (ຈົບ)

## ຂໍ້ 41. ຄ່າຂໍ້ມູນຈິງທີ່ດຶງມາຈາກ Stream ຈະຖືກເກັບຢູ່ໃນ Property ໃດຂອງ AsyncSnapshot?

**`snapshot.data`** (ກວດກ່ອນດ້ວຍ `snapshot.hasData`)

## ຂໍ້ 42. ຖ້າ snapshot.hasError ເປັນ true ໃນ AsyncBuilder ໝາຍຄວາມວ່າແນວໃດ ແລະ ຄວນຈັດການ UI ແນວໃດ?

ໝາຍເຖິງ **ເກີດຂໍ້ຜິດພາດ (Error)** ໃນຂະນະທີ່ກຳລັງດຶງ ຫຼື ປະມວນຜົນຂໍ້ມູນຈາກ Async Operation · ຄວນສະແດງ **ຂໍ້ຄວາມແຈ້ງເຕືອນ (Error Message)** ຫຼື **ປຸ່ມລອງໃໝ່ (Retry)**

```dart
if (snapshot.hasError) {
  return Column(children: [
    Text('ເກີດຂໍ້ຜິດພາດ: ${snapshot.error}'),
    ElevatedButton(onPressed: retry, child: const Text('ລອງໃໝ່')),
  ]);
}
```

## ໝວດທີ 5: ວິເຄາະ ແລະ ແກ້ໄຂໂຄ້ດ (Code Analysis ແລະ Practical Questions)

ຂໍ້ 43–50 · ໂຄ້ດຂອງຂໍ້ 43 ແລະ 46 ມາຈາກເອກະສານ

## ຂໍ້ 43. ຈາກໂຄ້ດ StreamBuilder ລຸ່ມນີ້ ໂຄ້ດນີ້ເຮັດວຽກຫຍັງ?

```dart
StreamBuilder<QuerySnapshot>(
  stream: FirebaseFirestore.instance.collection('products').snapshots(),
  builder: (context, snapshot) {
    if (snapshot.hasError) return Text('Something went wrong');
    if (snapshot.connectionState == ConnectionState.waiting) {
      return CircularProgressIndicator();
    }
    final data = snapshot.data!.docs;
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(data[index]['name']),
          subtitle: Text('${data[index]['price']} LAK'),
        );
      },
    );
  },
)
```

**ຄຳຕອບ:** ດຶງ **ລາຍການສິນຄ້າ (Products)** ຈາກ Firestore **ແບບ Real-time** ມາສະແດງເປັນລາຍການ (`ListView.builder`) — ແຕ່ລະ Item ສະແດງ **ຊື່ສິນຄ້າ (name)** ແລະ **ລາຄາ (price)**

💡 **ເພີ່ມເຕີມ:** ລຳດັບ 3 ຂັ້ນ: error → loading → ຂໍ້ມູນ · `snapshot.data!` ປອດໄພເພາະກວດ waiting ແລະ error ແລ້ວ

## ຂໍ້ 44. ຈາກໂຄ້ດຂໍ້ 43 ເປັນຫຍັງຈຶ່ງໃຊ້ .snapshots() ແທນທີ່ຈະໃຊ້ .get()?

ເພາະຕ້ອງການໃຫ້ **UI ອັບເດດແບບ Real-time** ທັນທີທີ່ມີການເພີ່ມ, ແກ້ໄຂ ຫຼື ລຶບຂໍ້ມູນສິນຄ້າໃນ Firestore ໂດຍທີ່ຜູ້ໃຊ້ **ບໍ່ຕ້ອງກົດ Refresh** ແອັບ

💡 **ເພີ່ມເຕີມ:** `StreamBuilder` ຕ້ອງການ **Stream** — `.get()` ຄືນ Future ຈຶ່ງໃຊ້ກັບ StreamBuilder ບໍ່ໄດ້ (ຕ້ອງໃຊ້ FutureBuilder)

## ຂໍ້ 45. ຈາກໂຄ້ດຂໍ້ 43 ຖ້າ Collection products ໃນ Firestore ບໍ່ມີຂໍ້ມູນ (ເປັນ Collection ຫວ່າງ) UI ຈະສະແດງຜົນແນວໃດ?

`data.length` ມີຄ່າ **0** ດັ່ງນັ້ນ `ListView.builder` ຈະສ້າງ **List ທີ່ວ່າງເປົ່າ** — ບໍ່ສະແດງ item ໃດໆ **ແຕ່ແອັບບໍ່ພັງ (ບໍ່ Error)**

💡 **ເພີ່ມເຕີມ:** UX ທີ່ດີຄວນກວດ `if (data.isEmpty) return Text('ຍັງບໍ່ມີສິນຄ້າ');` — ຄືກັບ `EmptyStateWidget` ໃນ[ແອັບນັກສຶກສາ](/flutter/#sec-11-4)

## ຂໍ້ 46. ຈາກໂຄ້ດ Function ລຸ່ມນີ້ ຟັງຊັນນີ້ໃຊ້ເຮັດວຽກຫຍັງ?

```dart
Future<void> updateUserAge(String docId, int newAge) async {
  try {
    await FirebaseFirestore.instance
        .collection('users')
        .doc(docId)
        .update({'age': newAge});
    print('Updated successfully');
  } catch (e) {
    print('Error updating: $e');
  }
}
```

**ຄຳຕອບ:** ໃຊ້ **ອັບເດດອາຍຸ (age)** ຂອງ User ຕາມ Document ID (`docId`) ໃນ Collection `users` ພ້ອມມີການ **ດັກຈັບ Error (Try-Catch)**

## ຂໍ້ 47. ຈາກໂຄ້ດຂໍ້ 46 ຖ້າ docId ທີ່ສົ່ງເຂົ້າໄປບໍ່ມີຢູ່ໃນ Collection 'users' ເລີຍ ຈະເກີດຫຍັງຂຶ້ນ?

ຄຳສັ່ງ `.update()` ຈະ **ລົ້ມເຫຼວ (Throw Exception)** ແລະ ໂຄ້ດຈະໂດດເຂົ້າໄປໃນທ່ອນ `catch (e)` ພິມ `Error updating: ...` ອອກທາງ Console — ຂໍ້ມູນ **ບໍ່ຖືກສ້າງ** ເພາະ update ໃຊ້ແກ້ໄຂຂໍ້ມູນທີ່ມີຢູ່ແລ້ວເທົ່ານັ້ນ

💡 **ເພີ່ມເຕີມ:** error ທີ່ໄດ້ຄື `[cloud_firestore/not-found]`

## ຂໍ້ 48. ຈາກໂຄ້ດຂໍ້ 46 ຖ້າຕ້ອງການປ່ຽນຈາກ .update() ເປັນ .set() ເພື່ອໃຫ້ສ້າງ Document ໃໝ່ໄດ້ອັດຕະໂນມັດ (ຖ້າຍັງບໍ່ມີ) ໂດຍບໍ່ໃຫ້ຂໍ້ມູນ Field ອື່ນເສຍຫາຍ ຕ້ອງປັບໂຄ້ດແນວໃດ?

ເພີ່ມ **`SetOptions(merge: true)`** ເຂົ້າໄປໃນ `.set()`:

```dart
await FirebaseFirestore.instance
    .collection('users')
    .doc(docId)
    .set({'age': newAge}, SetOptions(merge: true));
```

💡 **ເພີ່ມເຕີມ:** ຖ້າໃຊ້ `.set({'age': newAge})` **ບໍ່ມີ merge** — Field ອື່ນ (ຊື່, ອີເມວ …) ຈະຖືກລຶບໝົດ ເຫຼືອແຕ່ age

## ຂໍ້ 49. ຈົ່ງຂຽນ Function ພາສາ Dart ສຳລັບການ Sign In ດ້ວຍ Email ແລະ Password ໂດຍໃຊ້ FirebaseAuth ພ້ອມມີການດັກ try-catch ເພື່ອແຈ້ງ Error

```dart
Future<void> signInWithEmail(String email, String password) async {
  try {
    UserCredential userCredential = await FirebaseAuth.instance
        .signInWithEmailAndPassword(email: email, password: password);
    print("Login ສຳເລັດ: ${userCredential.user?.email}");
  } on FirebaseAuthException catch (e) {
    print("ເກີດຂໍ້ຜິດພາດ: ${e.message}");
  } catch (e) {
    print("Error: $e");
  }
}
```

💡 **ເພີ່ມເຕີມ:** `on FirebaseAuthException` ຈັບ error ຂອງ Firebase ສະເພາະ (ມີ `e.code` ເຊັ່ນ `invalid-credential`) · `catch (e)` ທ້າຍສຸດຈັບ error ອື່ນທັງໝົດ · ໃນແອັບຈິງໃຊ້ SnackBar ແທນ print — [ເບິ່ງຕາຕະລາງ e.code](/firebase/#sec-3-2)

## ຂໍ້ 50. ຈົ່ງຂຽນຄຳສັ່ງ Firestore Query ເພື່ອດຶງຂໍ້ມູນຈາກ Collection orders: ຄັດກອງເອົາສະເພາະ status == 'pending', ຈັດລຽງຕາມ created_at ຈາກໃໝ່ຫາເກົ່າ ແລະ ຈຳກັດການດຶງພຽງ 10 ລາຍການ

```dart
QuerySnapshot querySnapshot = await FirebaseFirestore.instance
    .collection('orders')
    .where('status', isEqualTo: 'pending')
    .orderBy('created_at', descending: true)
    .limit(10)
    .get();
```

💡 **ເພີ່ມເຕີມ:** Query ນີ້ໃຊ້ `where` + `orderBy` ຄົນລະ field → ຕ້ອງສ້າງ **Composite Index** (`status` + `created_at`) ກ່ອນ (ເບິ່ງຂໍ້ 31)

## ອ້າງອີງ

- ເອກະສານ "ຄຳຖາມຄົ້ນຄວ້າສອບເສັງກາງພາກ ສົກຮຽນ 2026-2027"
- Flutter documentation — https://docs.flutter.dev
- FlutterFire documentation — https://firebase.flutter.dev
- Firebase Authentication (Flutter) — https://firebase.google.com/docs/auth/flutter/start
- Cloud Firestore — https://firebase.google.com/docs/firestore
- Cloud Storage (Flutter) — https://firebase.google.com/docs/storage/flutter/start
- StreamBuilder (API) — https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html
