# Flutter + Firebase

> 🔥 ຄຳຖາມສອບກາງພາກ **ປະມານ 38 ຈາກ 50 ຂໍ້ເປັນເລື່ອງ Firebase** ແຕ່ແອັບໃນສະໄລຍັງບໍ່ໄດ້ໃຊ້ — ບົດນີ້ເພີ່ມເຂົ້າມາໃຫ້ຄົບ ໂດຍໃຊ້ **ແອັບນັກສຶກສາເດີມ** ເປັນຕົວຢ່າງ
> ✅ ໂຄ້ດທັງໝົດຢູ່ໃນ `flutter/student_app_firebase/` — `flutter analyze` ບໍ່ມີ error ແລະ **ທົດສອບຈິງກັບ Firebase Emulator**: ສະໝັກ → ເພີ່ມນັກສຶກສາ → Logout → Login ໃໝ່ຂໍ້ມູນຍັງຢູ່ → ປັດລຶບ + ຢືນຢັນ → Undo ຜ່ານທຸກຂັ້ນ
> ℹ️ ເວີຊັນ package ທີ່ໃຊ້: `firebase_core` 5.1 · `firebase_auth` 7.0 · `cloud_firestore` 7.1 · `firebase_storage` 14.0 — ຊື່ method ທຸກອັນຄືກັບເວີຊັນເກົ່າ (5.x / 4.x) ທີ່ອາຈານອາດໃຊ້
>
> ⬅️ ຮຽນພື້ນຖານແອັບກ່ອນທີ່ **[ບົດຮຽນ Flutter](/flutter/)**

## 1. Firebase ແມ່ນຫຍັງ

**Firebase** = ບໍລິການ Backend ສຳເລັດຮູບຂອງ Google (**BaaS** — Backend as a Service): ມີ ລະບົບສະມາຊິກ, database, ບ່ອນເກັບໄຟລ໌ ໃຫ້ພ້ອມ ບໍ່ຕ້ອງຂຽນ ຫຼື ເຊົ່າ server ເອງ ເໝາະກັບແອັບມືຖືທີ່ຕ້ອງການອອກໄວ

<!-- include:fb-arch -->

| ບໍລິການ | Package Flutter | ໃຊ້ເຮັດຫຍັງ |
|---|---|---|
| Core | `firebase_core` | ເຊື່ອມແອັບກັບ Firebase project (ຕ້ອງມີສະເໝີ) |
| Authentication | `firebase_auth` | ສະໝັກ / ເຂົ້າສູ່ລະບົບ: Email, Google, ເບີໂທ … |
| Cloud Firestore | `cloud_firestore` | Database NoSQL ແບບ Realtime |
| Storage | `firebase_storage` | ເກັບໄຟລ໌ໃຫຍ່: ຮູບ, ວິດີໂອ, PDF |
| (ອື່ນໆ) | `firebase_messaging`, `firebase_analytics` | ແຈ້ງເຕືອນ (Push), ສະຖິຕິການໃຊ້ງານ |

## 2. ຕັ້ງຄ່າໂປຣເຈັກ Flutter ໃຫ້ໃຊ້ Firebase

### 2.1 ສ້າງ Firebase Project

1. ເຂົ້າ https://console.firebase.google.com → **Add project** → ຕັ້ງຊື່
2. ເມນູ **Build › Authentication** → Get started → ເປີດ **Email/Password**
3. ເມນູ **Build › Firestore Database** → Create database → ເລືອກ location ໃກ້ (ເຊັ່ນ `asia-southeast1` ສິງກະໂປ)
4. ເມນູ **Build › Storage** → Get started (ຖ້າຈະເກັບຮູບ)

### 2.2 FlutterFire CLI — ວິທີປັດຈຸບັນ (ແນະນຳ)

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

`flutterfire configure` ຈະ **ລົງທະບຽນແອັບ** (Android, iOS, Web) ໃນ Firebase project ແລ້ວ **ສ້າງໄຟລ໌ `lib/firebase_options.dart`** ທີ່ມີ `apiKey`, `appId`, `projectId` … ຂອງແຕ່ລະ platform ໃຫ້ອັດຕະໂນມັດ

> 💡 ໃນ repo ນີ້ `firebase_options.dart` ເປັນ **ຕົວແທນຊົ່ວຄາວ** — ຕ້ອງລັນ `flutterfire configure` ກັບ project ຂອງຕົນເອງກ່ອນ

### 2.3 ວິທີເກົ່າ: ວາງໄຟລ໌ຄອນຟິກເອງ

ຖ້າບໍ່ໃຊ້ CLI ຕ້ອງດາວໂຫຼດໄຟລ໌ຈາກ Firebase Console ແລ້ວວາງເອງ (ມັກອອກສອບ):

| Platform | ໄຟລ໌ | ວາງໄວ້ທີ່ |
|---|---|---|
| Android | `google-services.json` | `android/app/` |
| iOS | `GoogleService-Info.plist` | `ios/Runner/` (ເພີ່ມຜ່ານ Xcode) |

### 2.4 ຕິດຕັ້ງ Package

```bash
flutter pub add firebase_core firebase_auth cloud_firestore firebase_storage
```

### 2.5 ເລີ່ມ Firebase ໃນ main()

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}
```

- `main()` ກາຍເປັນ **`async`** ເພາະຕ້ອງ `await` ໃຫ້ Firebase ພ້ອມກ່ອນເປີດແອັບ
- **`WidgetsFlutterBinding.ensureInitialized()`** ຕ້ອງເອີ້ນ **ກ່ອນ** `Firebase.initializeApp()` — ເພື່ອໃຫ້ Flutter engine ຖືກຜູກ (bind) ແລະ ພ້ອມໃຊ້ **Platform Channel** (ຊ່ອງທາງທີ່ Dart ຄຸຍກັບ native SDK ຂອງ Android/iOS) · ປົກກະຕິ `runApp()` ເຮັດໃຫ້ເອງ ແຕ່ຕອນນີ້ເຮົາຕ້ອງໃຊ້ Platform Channel **ກ່ອນ** `runApp()`
- `DefaultFirebaseOptions.currentPlatform` ເລືອກຄ່າຄອນຟິກຕາມ platform ທີ່ກຳລັງລັນ

## 3. Firebase Authentication

ໂຄ້ດຢູ່ໃນ `lib/services/auth_service.dart` ແລະ `lib/screens/login_screen.dart`

### 3.1 ສະໝັກສະມາຊິກ + ສົ່ງອີເມວຢືນຢັນ

```dart
static Future<void> register(String email, String password) async {
  final cred = await FirebaseAuth.instance.createUserWithEmailAndPassword(email: email, password: password);
  await cred.user?.sendEmailVerification();   // ສົ່ງອີເມວຢືນຢັນຕົວຕົນ
}
```

ສະໝັກສຳເລັດ = **ເຂົ້າສູ່ລະບົບໃຫ້ອັດຕະໂນມັດ** · ກວດວ່າຢືນຢັນອີເມວແລ້ວບໍ ດ້ວຍ `user.emailVerified`

### 3.2 ເຂົ້າສູ່ລະບົບ + ຈັດການ Error

```dart
try {
  await FirebaseAuth.instance.signInWithEmailAndPassword(email: email, password: password);
} on FirebaseAuthException catch (e) {
  // e.code ບອກສາເຫດ → ແປເປັນຂໍ້ຄວາມພາສາລາວ
  showError(AuthService.messageFor(e));
}
```

| `e.code` | ຄວາມໝາຍ |
|---|---|
| `invalid-email` | ຮູບແບບອີເມວຜິດ |
| `invalid-credential` / `wrong-password` / `user-not-found` | ອີເມວ ຫຼື ລະຫັດຜ່ານຜິດ (ເວີຊັນໃໝ່ລວມເປັນ `invalid-credential` ເພື່ອຄວາມປອດໄພ) |
| `email-already-in-use` | ອີເມວນີ້ສະໝັກແລ້ວ |
| `weak-password` | ລະຫັດຜ່ານສັ້ນກວ່າ 6 ຕົວ |
| `too-many-requests` | ລອງຫຼາຍເທື່ອເກີນ ຖືກລັອກຊົ່ວຄາວ |
| `network-request-failed` | ບໍ່ມີອິນເຕີເນັດ |

> 🔒 ຢ່າບອກຜູ້ໃຊ້ແຍກວ່າ "ບໍ່ພົບອີເມວ" ຫຼື "ລະຫັດຜິດ" — ຄົນບໍ່ດີຈະໃຊ້ທົດລອງວ່າອີເມວໃດມີບັນຊີ · ໃຊ້ຂໍ້ຄວາມດຽວ "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"

### 3.3 ຜູ້ໃຊ້ປັດຈຸບັນ ແລະ ອອກຈາກລະບົບ

```dart
final User? user = FirebaseAuth.instance.currentUser;   // null = ຍັງບໍ່ Login
print(user?.uid);     // ລະຫັດຜູ້ໃຊ້ (ບໍ່ຊ້ຳ ບໍ່ປ່ຽນ) — ໃຊ້ເປັນ Document ID ໄດ້
print(user?.email);

await FirebaseAuth.instance.signOut();                  // ອອກຈາກລະບົບ
```

### 3.4 authStateChanges() + AuthGate

`authStateChanges()` = **Stream** ທີ່ສົ່ງ `User` ເມື່ອ Login ແລະ `null` ເມື່ອ Logout (ຍັງມີ `idTokenChanges()` ແລະ `userChanges()` ທີ່ສົ່ງຄ່າເລື້ອຍກວ່າ ເຊັ່ນ ເມື່ອແກ້ໂປຣໄຟລ໌) · Widget ທີ່ເໝາະທີ່ສຸດໃນການສະຫຼັບໜ້າ = **`StreamBuilder`**

<!-- include:fb-auth-flow -->

```dart
class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        return snapshot.data == null ? const LoginScreen() : const StudentListScreen();
      },
    );
  }
}
```

ໃນ `main.dart` ປ່ຽນ `home: const StudentListScreen()` ເປັນ **`home: const AuthGate()`**

### 3.5 ຂັ້ນຕອນ Logout ໃນແອັບທີ່ໃຊ້ Provider + Firebase Auth

1. ຜູ້ໃຊ້ກົດປຸ່ມ Logout → ເອີ້ນ `AuthService.signOut()` (ຫຼື method ໃນ Provider)
2. `FirebaseAuth.instance.signOut()` ລຶບ session ໃນເຄື່ອງ
3. Firebase ສົ່ງ `null` ຜ່ານ `authStateChanges()`
4. `AuthGate` (StreamBuilder) ໄດ້ຮັບ → ສະຫຼັບໄປ `LoginScreen` ເອງ
5. `StudentProvider` ທີ່ຟັງ `authStateChanges()` ຢູ່ ຍົກເລີກການຟັງ Firestore ແລະ ລ້າງຂໍ້ມູນ — ຜູ້ໃຊ້ຄົນຕໍ່ໄປບໍ່ເຫັນຂໍ້ມູນເກົ່າ

**ປະໂຫຍດຂອງ Provider ສຳລັບ Auth State:** ແບ່ງປັນສະຖານະຜູ້ໃຊ້ໃຫ້ທົ່ວແອັບ ບໍ່ຕ້ອງສົ່ງຜ່ານ constructor ທີລະຊັ້ນ (prop drilling) ແລະ UI rebuild ເອງທັນທີເມື່ອ Login / Logout

## 4. Cloud Firestore

### 4.1 ໂຄງສ້າງຂໍ້ມູນ

<!-- include:fb-model -->

**ຊະນິດຂໍ້ມູນທີ່ເກັບໄດ້:** String · Number (int / double) · Boolean · **Array** · **Map** (object ຊ້ອນ) · Null · **Timestamp** · **GeoPoint** (ພິກັດ GPS) · **Reference** (ອ້າງອີງ Document ອື່ນ) · Bytes

```dart
await db.collection('demo').doc('types').set({
  'text': 'ສະບາຍດີ',                                  // String
  'number': 42, 'double': 3.14,                       // Number
  'isActive': true,                                    // Boolean
  'tags': ['flutter', 'firebase'],                     // Array
  'address': {'city': 'ວຽງຈັນ', 'zip': '01000'},        // Map
  'location': const GeoPoint(17.9757, 102.6331),       // GeoPoint
  'createdAt': Timestamp.now(),                        // Timestamp
  'owner': db.collection('users').doc(uid),            // Reference
  'note': null,                                        // Null
});
```

### 4.2 Firestore ທຽບກັບ SQL (Relational Database)

| ຫົວຂໍ້ | SQL (MySQL) | Cloud Firestore |
|---|---|---|
| ໂຄງສ້າງ | Table → Row → Column | Collection → Document → Field |
| Schema | ຕ້ອງກຳນົດຖັນລ່ວງໜ້າ | **Schemaless** — ແຕ່ລະ Document ມີ field ຕ່າງກັນໄດ້ |
| ເຊື່ອມຕາຕະລາງ | `JOIN` | **ບໍ່ມີ JOIN** — ເກັບຊ້ຳ (denormalize) ຫຼື query ຫຼາຍຄັ້ງ |
| Realtime | ຕ້ອງ refresh ເອງ | ✅ `.snapshots()` ອັບເດດທັນທີ |
| ຂະຫຍາຍລະບົບ | ຕ້ອງຈັດການ server | Google ຂະຫຍາຍໃຫ້ອັດຕະໂນມັດ (Scalability) |
| Offline | ❌ | ✅ cache ໃນເຄື່ອງ ຂຽນໄດ້ຕອນບໍ່ມີເນັດ ແລ້ວ sync ພາຍຫຼັງ |
| ຄ່າໃຊ້ຈ່າຍ | ຄ່າ server | ຈ່າຍຕາມຈຳນວນ **ອ່ານ / ຂຽນ / ລຶບ** (ມີ quota ຟຣີລາຍວັນ) |

### 4.3 Create: .add() ແລະ .doc(id).set()

```dart
final col = FirebaseFirestore.instance.collection('students');

// .add() → Firestore ສຸ່ມ Document ID ໃຫ້ (Auto-ID)
final ref = await col.add({'name': 'ນາງ ອາລຸນຍາ ຈັນທາ', 'gpa': 3.85});
print(ref.id);   // ເຊັ່ນ Xk29aBq1...

// .doc(id).set() → ກຳນົດ Document ID ເອງ (ເຊັ່ນ ໃຊ້ UID ຂອງຜູ້ໃຊ້)
await FirebaseFirestore.instance.collection('users').doc(user.uid).set({'role': 'teacher'});
```

> ⚠️ `.set()` ທີ່ບໍ່ມີ `merge` = **ຂຽນທັບທັງ Document** — field ທີ່ບໍ່ໄດ້ສົ່ງໄປຈະຫາຍ

### 4.4 Read: .get() ແລະ .snapshots()

| | `.get()` | `.snapshots()` |
|---|---|---|
| ຮູບແບບ | ດຶງ **ຄັ້ງດຽວ** (One-time fetch) | ຟັງ **Realtime** |
| ຄືນຄ່າ | `Future<QuerySnapshot>` | `Stream<QuerySnapshot>` |
| ໃຊ້ກັບ | `await` / `FutureBuilder` | `listen()` / `StreamBuilder` |
| ເໝາະກັບ | ລາຍງານ, ຂໍ້ມູນທີ່ບໍ່ຄ່ອຍປ່ຽນ — ປະຫຍັດການອ່ານ | ແຊັດ, ລາຍການທີ່ຫຼາຍຄົນແກ້ພ້ອມກັນ |

```dart
final snapshot = await FirebaseFirestore.instance.collection('students').get();
for (var doc in snapshot.docs) {
  print(doc.id);              // Document ID
  print(doc.data()['name']);  // ຂໍ້ມູນເປັນ Map
}
```

**QuerySnapshot** = ຜົນຂອງ query (`docs`, `size`) · **DocumentSnapshot** = Document 1 ອັນ (`id`, `data()`, `exists`)

### 4.5 Update: .update(), .set(merge) ແລະ FieldValue

| ຄຳສັ່ງ | Document ມີຢູ່ແລ້ວ | Document ຍັງບໍ່ມີ |
|---|---|---|
| `.update({...})` | ແກ້ສະເພາະ field ທີ່ສົ່ງ | ❌ **Error (not-found)** |
| `.set({...})` | **ຂຽນທັບທັງໝົດ** (field ອື່ນຫາຍ) | ສ້າງໃໝ່ |
| `.set({...}, SetOptions(merge: true))` | ແກ້/ເພີ່ມສະເພາະ field ທີ່ສົ່ງ ຮັກສາ field ອື່ນ | ສ້າງໃໝ່ |

```dart
await doc.update({'gpa': 3.9, 'updatedAt': FieldValue.serverTimestamp()});  // ເວລາຈາກ Server
await doc.update({'nickname': FieldValue.delete()});                          // ລຶບສະເພາະ field
await doc.update({'score': FieldValue.increment(1)});                         // ບວກ 1 ແບບປອດໄພ
await doc.set({'age': 21}, SetOptions(merge: true));                          // Upsert
```

**`FieldValue.serverTimestamp()`** — ໃຊ້ເວລາຂອງ **Server** ແທນ `DateTime.now()` ທີ່ເອົາເວລາຈາກເຄື່ອງຜູ້ໃຊ້ (ອາດຕັ້ງຜິດ ຫຼື ຢູ່ຄົນລະເຂດເວລາ)

### 4.6 Delete

```dart
await FirebaseFirestore.instance.collection('students').doc(id).delete();   // ລຶບທັງ Document
```

> ⚠️ ລຶບ Document **ບໍ່ໄດ້ລຶບ Sub-collection** ຂ້າງໃນນຳ — ຕ້ອງລຶບແຍກ

### 4.7 Query: where, orderBy, limit ແລະ Index

```dart
final q = await FirebaseFirestore.instance
    .collection('orders')
    .where('status', isEqualTo: 'pending')      // ກັ່ນຕອງ
    .orderBy('created_at', descending: true)     // ຈັດລຽງ ໃໝ່ → ເກົ່າ
    .limit(10)                                   // ເອົາແຕ່ 10 ລາຍການ
    .get();
```

| Method | ໜ້າທີ່ |
|---|---|
| `.where(field, isEqualTo / isGreaterThan / isLessThan / arrayContains / whereIn …)` | ກັ່ນຕອງຕາມເງື່ອນໄຂ |
| `.orderBy(field, descending: true)` | ຈັດລຽງ |
| `.limit(n)` | ຈຳກັດຈຳນວນ — ປະຫຍັດ bandwidth ແລະ ຈຳນວນການອ່ານ (ຄ່າໃຊ້ຈ່າຍ) ໂຫຼດໄວຂຶ້ນ ໃຊ້ເຮັດ pagination |

**Composite Index:** query ທີ່ກັ່ນຕອງ field ໜຶ່ງ ແລະ ຈັດລຽງອີກ field ໜຶ່ງ (ຫຼາຍ field ພ້ອມກັນ) ຕ້ອງມີ **index ລວມ** — ບໍ່ດັ່ງນັ້ນ Firestore ປະຕິເສດ query (ບໍ່ຍອມ scan ທຸກ Document) ແລະ ສົ່ງ error ທີ່ **ມີລິ້ງກົດສ້າງ index** ໃນ Console ໃຫ້

### 4.8 Security Rules

ໄຟລ໌ `firestore.rules` — ກວດທຸກຄຳຂໍ **ຢູ່ຝັ່ງ Server** (ໂຄ້ດໃນແອັບຖືກແກ້ໄດ້ ແຕ່ Rules ແກ້ບໍ່ໄດ້):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read, write: if request.auth != null;          // ສະເພາະຜູ້ທີ່ Login ແລ້ວ
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;   // ສະເພາະເຈົ້າຂອງ
    }
  }
}
```

- `request.auth` = ຂໍ້ມູນຜູ້ໃຊ້ທີ່ສົ່ງຄຳຂໍ (`null` = ບໍ່ໄດ້ Login) · `request.auth.uid` = UID
- `if request.auth != null` = **ອ່ານ ແລະ ຂຽນໄດ້ສະເພາະຜູ້ທີ່ Login ແລ້ວ** ກັນຄົນທີ່ບໍ່ໄດ້ Login ເຂົ້າມາອ່ານ ຫຼື ແກ້ຂໍ້ມູນ
- ⚠️ **Test mode** (`allow read, write: if true;` ຫຼື ຈຳກັດຕາມວັນທີ) ໃຊ້ຕອນທົດລອງເທົ່ານັ້ນ — ປ່ອຍໄວ້ = ໃຜກໍລຶບ database ໄດ້

## 5. StreamBuilder ແລະ FutureBuilder

| | FutureBuilder | StreamBuilder |
|---|---|---|
| ຮັບ | `future:` (ຄ່າດຽວ) | `stream:` (ຫຼາຍຄ່າ) |
| build ໃໝ່ | ເມື່ອ Future ສຳເລັດ (ຄັ້ງດຽວ) | **ທຸກຄັ້ງ** ທີ່ Stream ສົ່ງຄ່າໃໝ່ |
| ຕົວຢ່າງ | `collection('x').get()` | `collection('x').snapshots()`, `authStateChanges()` |

**Property ຂອງ AsyncSnapshot:**

| Property | ຄວາມໝາຍ |
|---|---|
| `connectionState == ConnectionState.waiting` | ກຳລັງລໍຂໍ້ມູນ → ສະແດງ loading |
| `hasError` / `error` | ເກີດຂໍ້ຜິດພາດ → ສະແດງຂໍ້ຄວາມ + ປຸ່ມລອງໃໝ່ (Retry) |
| `hasData` / `data` | ມີຂໍ້ມູນແລ້ວ → ຂໍ້ມູນຈິງຢູ່ `snapshot.data` |

```dart
StreamBuilder<QuerySnapshot>(
  stream: FirebaseFirestore.instance.collection('products').snapshots(),
  builder: (context, snapshot) {
    if (snapshot.hasError) return const Text('Something went wrong');            // 1) error
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();                                  // 2) loading
    }
    final data = snapshot.data!.docs;                                            // 3) data
    return ListView.builder(
      itemCount: data.length,
      itemBuilder: (context, index) => ListTile(
        title: Text(data[index]['name']),
        subtitle: Text('${data[index]['price']} LAK'),
      ),
    );
  },
)
```

> ⚠️ ຢ່າສ້າງ Future/Stream **ໃນ** `build()` ຂອງ StatefulWidget ທີ່ rebuild ເລື້ອຍ (ເຊັ່ນ `future: collection('x').get()`) — ທຸກຄັ້ງທີ່ build ຈະດຶງໃໝ່ · ຄວນສ້າງໄວ້ໃນ `initState()` ຫຼື ໃນ Provider

## 6. Firebase Storage — ອັບໂຫຼດຮູບ

**Storage** ເກັບ **ໄຟລ໌ໃຫຍ່** (Binary): ຮູບ, ວິດີໂອ, ສຽງ, ເອກະສານ — **ບໍ່ຄວນ** ເກັບໄຟລ໌ໃນ Firestore (Document ໃຫຍ່ສຸດ 1 MB) · ວິທີທີ່ຖືກ: ເກັບໄຟລ໌ໃນ Storage ແລ້ວເກັບ **URL** ໄວ້ໃນ Firestore

```dart
// lib/services/storage_service.dart
final XFile? picked = await ImagePicker().pickImage(source: ImageSource.gallery, maxWidth: 800, imageQuality: 80);
if (picked == null) return null;                                   // ກົດຍົກເລີກ

final ref = FirebaseStorage.instance.ref('students/$studentId.jpg');  // ບ່ອນເກັບ
await ref.putData(await picked.readAsBytes(), SettableMetadata(contentType: 'image/jpeg'));
final url = await ref.getDownloadURL();                            // URL ສຳລັບສະແດງ

// ສະແດງຮູບ
Image.network(url)
```

- `image_picker` (ທີ່ຕິດຕັ້ງໄວ້ໃນສະໄລ) ເລືອກຮູບຈາກ **ຄັງຮູບ** (`ImageSource.gallery`) ຫຼື **ກ້ອງ** (`ImageSource.camera`)
- `putData(bytes)` ໃຊ້ໄດ້ທຸກ platform ລວມທັງ Web · `putFile(File)` ໃຊ້ໄດ້ສະເພາະມືຖື
- `maxWidth` + `imageQuality` ຍໍ້ຮູບກ່ອນອັບໂຫຼດ — ປະຫຍັດພື້ນທີ່ ແລະ ເນັດຂອງຜູ້ໃຊ້
- iOS ຕ້ອງເພີ່ມ `NSPhotoLibraryUsageDescription` ແລະ `NSCameraUsageDescription` ໃນ `ios/Runner/Info.plist`

**Storage Rules** (`storage.rules`) ຈຳກັດປະເພດ ແລະ ຂະໜາດ:

```text
match /students/{fileName} {
  allow read: if request.auth != null;
  allow write: if request.auth != null
               && request.resource.size < 2 * 1024 * 1024          // ບໍ່ເກີນ 2 MB
               && request.resource.contentType.matches('image/.*'); // ຮູບເທົ່ານັ້ນ
}
```

## 7. ປ່ຽນແອັບນັກສຶກສາໃຫ້ໃຊ້ Firestore

ຍ້ອນແອັບແຍກຊັ້ນໄວ້ດີ ([Separation of Concerns](/flutter/#sec-2-2)) — **ແກ້ແຕ່ `StudentProvider`** ໂດຍຮັກສາຊື່ method ຄືເກົ່າ ໜ້າຈໍ ແລະ widget ໃຊ້ຕໍ່ໄດ້ທັນທີ

| ໜ້າທີ່ | SharedPreferences (ສະໄລ) | Cloud Firestore |
|---|---|---|
| ອ່ານ | `getString()` → `json.decode` ຄັ້ງດຽວຕອນເປີດ | `collection('students').snapshots().listen(...)` **Realtime** |
| ເພີ່ມ | `_students.add()` + `_saveToPrefs()` + `notifyListeners()` | `.add({...})` — listener ອັບເດດ UI ເອງ |
| ແກ້ໄຂ | `indexWhere` + ແທນທີ່ + ບັນທຶກທັງໝົດ | `.doc(id).update({...})` |
| ລຶບ | `removeWhere` + ບັນທຶກທັງໝົດ | `.doc(id).delete()` |
| id ນັກສຶກສາ | `DateTime.now().millisecondsSinceEpoch` | **Document ID** (Auto-ID) |
| ຂໍ້ມູນຢູ່ໃສ | ເຄື່ອງດຽວ | Cloud — ທຸກເຄື່ອງເຫັນຊຸດດຽວກັນ |

**ຫົວໃຈຂອງ Provider ເວີຊັນ Firestore:**

```dart
StudentProvider() {
  // Login → ເລີ່ມຟັງ Firestore · Logout → ຢຸດຟັງ ແລະ ລ້າງຂໍ້ມູນ
  _authSub = FirebaseAuth.instance.authStateChanges().listen((user) {
    _studentsSub?.cancel();
    if (user == null) { _students = []; notifyListeners(); }
    else { _listenStudents(); }
  });
}

void _listenStudents() {
  _studentsSub = _col.snapshots().listen((snapshot) {
    _students = snapshot.docs
        .map((doc) => StudentModel.fromMap({...doc.data(), 'id': doc.id}))   // ໃຊ້ Document ID ເປັນ id
        .toList();
    notifyListeners();
  });
}

Future<void> addStudent(StudentModel s) =>
    _col.add({...s.toMap()..remove('id'), 'createdAt': FieldValue.serverTimestamp()});
Future<void> updateStudent(StudentModel s) => _col.doc(s.id).update(s.toMap()..remove('id'));
Future<void> deleteStudent(String id) => _col.doc(id).delete();

@override
void dispose() {          // ຍົກເລີກ subscription ກັນ memory leak
  _studentsSub?.cancel();
  _authSub?.cancel();
  super.dispose();
}
```

- `{...doc.data(), 'id': doc.id}` = ກະຈາຍ (spread) field ທັງໝົດ ແລ້ວເພີ່ມ `id` — ໃຊ້ `fromMap()` ເດີມໄດ້ເລີຍ
- `toMap()..remove('id')` — `..` (cascade) ເອີ້ນ method ໃສ່ Map ແລ້ວຄືນ Map ເດີມ · ບໍ່ເກັບ id ຊ້ຳເພາະເປັນ Document ID ຢູ່ແລ້ວ
- ບໍ່ຕ້ອງເອີ້ນ `notifyListeners()` ຫຼັງ add/update/delete — Firestore ອັບເດດ cache ໃນເຄື່ອງທັນທີ (Latency Compensation) ແລ້ວ listener ຍິງເອງ ⇒ ໜ້າຈໍປ່ຽນທັນທີແມ້ເນັດຊ້າ
- ເພີ່ມ `isLoading` / `error` ໃຫ້ໜ້າລາຍການສະແດງ loading ແລະ ຂໍ້ຄວາມ error

**ສິ່ງອື່ນທີ່ປ່ຽນ:** `main.dart` (Firebase.initializeApp + `home: AuthGate()`), ເພີ່ມ `LoginScreen`, ປຸ່ມ **ອອກຈາກລະບົບ** ໃນ AppBar ແລະ ລວມການແກ້ບັນຫາທັງໝົດໃນ [ຫົວຂໍ້ 13 ຂອງບົດ Flutter](/flutter/#sec-13) — ເບິ່ງລາຍລະອຽດໃນ `flutter/student_app_firebase/README.md`

## 8. ⚠️ ຂໍ້ຜິດພາດທີ່ພົບເລື້ອຍ

| ອາການ | ສາເຫດ / ວິທີແກ້ |
|---|---|
| `[core/no-app] No Firebase App '[DEFAULT]' has been created` | ລືມ `await Firebase.initializeApp()` ໃນ `main()` |
| `Binding has not yet been initialized` | ລືມ `WidgetsFlutterBinding.ensureInitialized()` ກ່ອນ initializeApp |
| `[cloud_firestore/permission-denied]` | Security Rules ບໍ່ອະນຸຍາດ — ຍັງບໍ່ Login ຫຼື rules ຜິດ |
| `[cloud_firestore/failed-precondition] The query requires an index` | Query ຫຼາຍ field — ກົດລິ້ງໃນ error ເພື່ອສ້າງ Composite Index |
| `[cloud_firestore/not-found]` ຕອນ `update()` | Document ບໍ່ມີ — ໃຊ້ `set(..., SetOptions(merge: true))` |
| `Null check operator used on a null value` ໃນ `snapshot.data!` | ອ່ານ data ກ່ອນກວດ `waiting` / `hasError` |
| Android build error ກ່ຽວກັບ `minSdk` | Firebase ເວີຊັນໃໝ່ຕ້ອງການ Android `minSdk` ສູງຂຶ້ນ — ກວດ `android/app/build.gradle.kts` |
| ຂໍ້ມູນຊ້ຳ ຫຼື ອ່ານເກີນ quota | ສ້າງ Stream/Future ໃນ `build()` — ຍ້າຍໄປ `initState()` / Provider |

## 9. ຄຳຖາມທົດສອບຕົນເອງ

1. ຄຳສັ່ງໃດສ້າງໄຟລ໌ `firebase_options.dart`? — **`flutterfire configure` (FlutterFire CLI)**
2. `google-services.json` ວາງໄວ້ໃສ? — **`android/app/`** (iOS: `GoogleService-Info.plist` ໃນ `ios/Runner/`)
3. ເປັນຫຍັງ `main()` ຕ້ອງເປັນ async? — **ຕ້ອງ await `Firebase.initializeApp()` ໃຫ້ສຳເລັດກ່ອນ `runApp()`**
4. ສະໝັກສະມາຊິກໃຊ້ method ໃດ? — **`createUserWithEmailAndPassword()`**
5. ສົ່ງອີເມວຢືນຢັນໃຊ້ method ໃດ? — **`user.sendEmailVerification()`**
6. ເອົາຜູ້ໃຊ້ທີ່ Login ຢູ່ຈາກໃສ? — **`FirebaseAuth.instance.currentUser`**
7. Stream ໃດບອກສະຖານະ Login/Logout? — **`authStateChanges()`**
8. `.get()` ກັບ `.snapshots()` ຕ່າງກັນແນວໃດ? — **get = ດຶງຄັ້ງດຽວ (Future) · snapshots = Realtime (Stream)**
9. `.update()` ກັບ `.set(merge: true)` ຕ່າງກັນແນວໃດ? — **update ຕ້ອງມີ Document (ບໍ່ມີ = error) · set merge ສ້າງໃໝ່ໄດ້ ແລະ ຮັກສາ field ອື່ນ**
10. ເອົາ Document ID ຈາກ QuerySnapshot ແນວໃດ? — **`doc.id` (ເຊັ່ນ `for (var doc in snapshot.docs) print(doc.id)`)**
11. ເປັນຫຍັງໃຊ້ `FieldValue.serverTimestamp()`? — **ໃຊ້ເວລາ Server ກັນເວລາເຄື່ອງຜູ້ໃຊ້ບໍ່ກົງກັນ**
12. Query ຫຼາຍ field ຕ້ອງມີຫຍັງ? — **Composite Index**
13. ເກັບຮູບໄວ້ໃສ ແລະ ເອົາ URL ແນວໃດ? — **Firebase Storage · `ref.getDownloadURL()`**
14. ກວດ "ກຳລັງໂຫຼດ" ໃນ StreamBuilder ແນວໃດ? — **`snapshot.connectionState == ConnectionState.waiting`**

## ອ້າງອີງ

- Add Firebase to your Flutter app — https://firebase.google.com/docs/flutter/setup
- FlutterFire documentation — https://firebase.flutter.dev
- Firebase Authentication (Flutter) — https://firebase.google.com/docs/auth/flutter/start
- Handle auth errors — https://firebase.google.com/docs/auth/flutter/errors
- Cloud Firestore (Flutter) — https://firebase.google.com/docs/firestore/quickstart
- Firestore data model — https://firebase.google.com/docs/firestore/data-model
- Supported data types — https://firebase.google.com/docs/firestore/manage-data/data-types
- Add / update data — https://firebase.google.com/docs/firestore/manage-data/add-data
- Index types — https://firebase.google.com/docs/firestore/query-data/index-overview
- Security Rules — https://firebase.google.com/docs/firestore/security/get-started
- Cloud Storage (Flutter) — https://firebase.google.com/docs/storage/flutter/start
- Firebase Local Emulator Suite — https://firebase.google.com/docs/emulator-suite
- Package image_picker — https://pub.dev/packages/image_picker
