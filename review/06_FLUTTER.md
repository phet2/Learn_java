# ບົດຮຽນ Flutter: ແອັບຈັດການນັກສຶກສາ (Provider + SharedPreferences)

> 📱 ບົດຮຽນນີ້ອະທິບາຍແອັບ **"ລະບົບຈັດການນັກສຶກສາ ສະຖາບັນ ເຕັກໂນໂລຊີ ສຸດສະກະ"** ຈາກສະໄລ 24 ໜ້າ — ໂຄ້ດທຸກໄຟລ໌ພິມຄືນ **ກົງກັບສະໄລທຸກແຖວ** (ເລກແຖວຄືກັນ) ເປີດແຖບ **ໂຄ້ດເຕັມ · ແຕະແຖວ** ເພື່ອອ່ານທີລະແຖວ
> ✅ ກວດແລ້ວດ້ວຍ **Flutter 3.50.0 / Dart 3.14**: `flutter analyze` ບໍ່ມີ error, `flutter build web` ຜ່ານ ແລະ ໜ້າຈໍທີ່ໄດ້ຄືກັບໃນສະໄລ · ໂປຣເຈັກຢູ່ໃນ repo ທີ່ `flutter/student_app/`
>
> 📚 ຮຽນຕໍ່: **[Flutter + Firebase](/firebase/)** · **[ຄຳຖາມສອບກາງພາກ 50 ຂໍ້](/flutter-qa/)** · **[ຂໍ້ສອບລອງທຳ](/flutter-exam/)**

## 1. ພາບລວມແອັບ

ແອັບນີ້ໃຊ້ **ຈັດການຂໍ້ມູນນັກສຶກສາ** ໃນມືຖື ຫຼື browser: ເພີ່ມ, ເບິ່ງ, ແກ້ໄຂ, ລຶບ, ຄົ້ນຫາ, ກັ່ນຕອງຕາມສາຂາ ແລະ ຈັດລຽງ — ຂໍ້ມູນ **ເກັບໄວ້ໃນເຄື່ອງ** ປິດແອັບແລ້ວເປີດໃໝ່ຂໍ້ມູນຍັງຢູ່

<!-- include:fl-shots -->

| ຄຸນສົມບັດ | ໃຊ້ຫຍັງເຮັດ | ໄຟລ໌ |
|---|---|---|
| Dashboard 3 ຕົວເລກ (ຈຳນວນ, GPA ສະເລ່ຍ, ເກຣດ A) | getter ໃນ Provider + `LinearGradient` | `dashboard_header.dart` |
| ຄົ້ນຫາ ຊື່ / ສາຂາ / ຫ້ອງ | `TextField.onChanged` → `setSearchQuery()` | `search_bar_widget.dart` |
| ກັ່ນຕອງຕາມສາຂາ | `ChoiceChip` → `setMajorFilter()` | `search_bar_widget.dart` |
| ຈັດລຽງ ຕາມຊື່ / GPA | `PopupMenuButton` → `setSortBy()` | `student_list_screen.dart` |
| ເພີ່ມ / ແກ້ໄຂ | `Form` + `TextFormField` + `validator` | `student_form_screen.dart` |
| ລຶບ (ປັດຊ້າຍ) | `Dismissible` | `student_card.dart` |
| ເກັບຂໍ້ມູນໃນເຄື່ອງ | `shared_preferences` + JSON | `student_provider.dart` |

**Package ທີ່ໃຊ້:** `provider` (State Management) · `shared_preferences` (ເກັບຂໍ້ມູນໃນເຄື່ອງ) · `image_picker` (ຕິດຕັ້ງໄວ້ ແຕ່ຍັງບໍ່ໄດ້ໃຊ້ໃນໂຄ້ດ)

## 2. ທິດສະດີອ້າງອີງ 4 ຂໍ້

ສະໄລໜ້າທຳອິດອ້າງອີງ 4 ທິດສະດີ — ທັງໝົດນີ້ຄື "ເຫດຜົນ" ວ່າເປັນຫຍັງໂຄ້ດຈຶ່ງຂຽນແບບນີ້

### 2.1 State Management — Observer Pattern / Provider

**State** = ຂໍ້ມູນທີ່ປ່ຽນໄດ້ ແລະ ມີຜົນຕໍ່ໜ້າຈໍ (ເຊັ່ນ ລາຍຊື່ນັກສຶກສາ, ຄຳຄົ້ນຫາ) · **Observer Pattern** = ມີ "ຜູ້ຖືຂໍ້ມູນ" 1 ຄົນ ແລະ "ຜູ້ຕິດຕາມ" ຫຼາຍຄົນ — ເມື່ອຂໍ້ມູນປ່ຽນ ຜູ້ຖືຂໍ້ມູນຈະ **ແຈ້ງເຕືອນ** ທຸກຄົນທີ່ຕິດຕາມໃຫ້ອັບເດດເອງ

<!-- include:fl-observer -->

| ບົດບາດໃນ Observer | ໃນແອັບນີ້ |
|---|---|
| Subject (ຜູ້ຖືຂໍ້ມູນ) | `StudentProvider extends ChangeNotifier` |
| ແຈ້ງເຕືອນ | `notifyListeners()` |
| ລົງທະບຽນ | `ChangeNotifierProvider` ໃນ `main.dart` |
| Observer (ຜູ້ຕິດຕາມ) | `Consumer<StudentProvider>` ໃນໜ້າລາຍການ |

**ຂໍ້ດີ:** ບໍ່ຕ້ອງສົ່ງຂໍ້ມູນຜ່ານ constructor ທີລະຊັ້ນ (ຫຼີກລ່ຽງ "prop drilling"), ທຸກໜ້າເຫັນຂໍ້ມູນຊຸດດຽວກັນ ແລະ UI ອັບເດດອັດຕະໂນມັດ

### 2.2 Software Architecture — Separation of Concerns / Clean Architecture

**Separation of Concerns** = ແຍກໂຄ້ດຕາມໜ້າທີ່ ແຕ່ລະສ່ວນເຮັດວຽກດຽວ — ແກ້ສ່ວນໜຶ່ງບໍ່ກະທົບສ່ວນອື່ນ ໂຄ້ດອ່ານງ່າຍ ທົດສອບງ່າຍ ແລະ ແບ່ງວຽກໃຫ້ທີມໄດ້

<!-- include:fl-layers -->

ຫຼັກຖານວ່າແຍກຊັ້ນໄດ້ດີ: ໃນ **[ບົດ Firebase](/firebase/)** ເຮົາປ່ຽນບ່ອນເກັບຂໍ້ມູນຈາກເຄື່ອງເປັນ Cloud ໂດຍແກ້ **ແຕ່ Provider** — ໜ້າຈໍ ແລະ widget ໃຊ້ຄືເກົ່າເກືອບທັງໝົດ

### 2.3 Data Persistence — Local Caching / Key-Value Store

**Persistence** = ຂໍ້ມູນຢູ່ຕໍ່ ເຖິງແມ່ນປິດແອັບ · `shared_preferences` ເກັບຂໍ້ມູນແບບ **Key-Value** (ຄືຕູ້ລັອກເກີ: 1 ກະແຈ → 1 ຄ່າ) ຢູ່ໃນເຄື່ອງ: Android = SharedPreferences, iOS = NSUserDefaults, Web = localStorage

ແອັບນີ້ເກັບນັກສຶກສາ **ທັງໝົດ** ເປັນ JSON string ກ້ອນດຽວ ໃນ key `soutsaka_students_key_v1`:

```text
key   : soutsaka_students_key_v1
value : [{"id":"1","name":"ນາງ ອາລຸນຍາ ຈັນທາ","age":20,...}, {"id":"2",...}]
```

| ເໝາະກັບ | ບໍ່ເໝາະກັບ |
|---|---|
| ຂໍ້ມູນນ້ອຍ: ການຕັ້ງຄ່າ, ໂໝດມືດ, token, cache | ຂໍ້ມູນຫຼາຍພັນແຖວ ຫຼື ຕ້ອງ query ຊັບຊ້ອນ (ໃຊ້ SQLite / Hive / Isar) |
| ແອັບທີ່ໃຊ້ຄົນດຽວ ເຄື່ອງດຽວ | ແບ່ງປັນຂໍ້ມູນຫຼາຍເຄື່ອງ (ໃຊ້ Cloud ເຊັ່ນ Firestore) |

### 2.4 CRUD Paradigm — Create, Read, Update, Delete

| ຕົວອັກສອນ | ຄວາມໝາຍ | ໃນແອັບນີ້ | ໃນ SQL ທຽບກັບ |
|---|---|---|---|
| **C** Create | ເພີ່ມ | `addStudent()` ← ປຸ່ມ + | `INSERT` |
| **R** Read | ອ່ານ / ສະແດງ | `loadStudents()`, getter `students` | `SELECT` |
| **U** Update | ແກ້ໄຂ | `updateStudent()` ← ເມນູ ⋮ > ແກ້ໄຂ | `UPDATE` |
| **D** Delete | ລຶບ | `deleteStudent()` ← ປັດຊ້າຍ | `DELETE` |

## 3. ພື້ນຖານ Dart ທີ່ໂຄ້ດນີ້ໃຊ້

ສ່ວນນີ້ສະຫຼຸບ syntax ຂອງ Dart ທີ່ພົບໃນໂຄ້ດ — ອ່ານກ່ອນ ຈະອ່ານໂຄ້ດໄດ້ງ່າຍຂຶ້ນຫຼາຍ

### 3.1 ຕົວປ່ຽນ: var, final, const, late

| ຄຳ | ຄວາມໝາຍ | ຕົວຢ່າງຈາກໂຄ້ດ |
|---|---|---|
| `var` / ຊະນິດ | ປ່ຽນຄ່າໄດ້ | `String _searchQuery = '';` |
| `final` | ກຳນົດຄ່າໄດ້ **ຄັ້ງດຽວ** (ຕອນ run) | `final String name;` |
| `const` | ຄ່າຄົງທີ່ຮູ້ຕັ້ງແຕ່ **compile** — Flutter ບໍ່ສ້າງ widget ນັ້ນໃໝ່ ຊ່ວຍໃຫ້ໄວ | `const SizedBox(height: 16)` |
| `late` | ສັນຍາວ່າຈະກຳນົດຄ່າ "ພາຍຫຼັງ" ກ່ອນໃຊ້ | `late TextEditingController _nameController;` (ກຳນົດໃນ `initState`) |
| `static const` | ຄ່າຄົງທີ່ຂອງ class (ມີຊຸດດຽວ) | `static const String _storageKey = '...';` |
| `_` ນຳໜ້າ | **private** — ໃຊ້ໄດ້ສະເພາະໃນໄຟລ໌ນັ້ນ | `_students`, `_saveToPrefs()` |

### 3.2 Null Safety: ? ?? ! ?.

Dart ບໍ່ໃຫ້ຕົວປ່ຽນເປັນ `null` ຖ້າບໍ່ໄດ້ອະນຸຍາດ — ກັນ error "null" ທີ່ພົບເລື້ອຍທີ່ສຸດ

| ສັນຍາລັກ | ຄວາມໝາຍ | ຕົວຢ່າງຈາກໂຄ້ດ |
|---|---|---|
| `Type?` | ອາດເປັນ null ໄດ້ | `final StudentModel? student;` (null = ໂໝດເພີ່ມ) |
| `a ?? b` | ຖ້າ a ເປັນ null ໃຊ້ b | `map['name'] ?? ''` |
| `a?.b` | ຖ້າ a ເປັນ null ບໍ່ເອີ້ນ b (ໄດ້ null) | `widget.student?.name` |
| `a!` | ຢືນຢັນວ່າ a ບໍ່ແມ່ນ null (ຖ້າເປັນ null ແອັບ crash) | `widget.student!.gender` |

```dart
// ໂໝດເພີ່ມ: student = null → ໃຊ້ '' · ໂໝດແກ້ໄຂ: ໃຊ້ຊື່ເດີມ
_nameController = TextEditingController(text: widget.student?.name ?? '');
```

### 3.3 Class, Constructor ແລະ Named Parameters

```dart
class StudentModel {
  final String name;
  final String phone;

  StudentModel({                 // { } = named parameters (ເອີ້ນດ້ວຍຊື່)
    required this.name,          // required = ບັງຄັບສົ່ງ
    this.phone = '020-5555-8888', // ມີຄ່າເລີ່ມຕົ້ນ = ບໍ່ສົ່ງກໍໄດ້
  });

  String get gradeLetter => 'A';           // getter = ຄຸນສົມບັດທີ່ຄຳນວນ
  factory StudentModel.fromMap(Map m) =>   // factory = constructor ທີ່ສ້າງ object ຈາກຂໍ້ມູນອື່ນ
      StudentModel(name: m['name']);
}

final s = StudentModel(name: 'ທ້າວ ນິກ'); // ເອີ້ນດ້ວຍຊື່ parameter
```

### 3.4 List ແລະ ຟັງຊັນທີ່ໃຊ້ເລື້ອຍ

| ຟັງຊັນ | ເຮັດຫຍັງ | ຕົວຢ່າງຈາກໂຄ້ດ |
|---|---|---|
| `where()` | ກັ່ນຕອງເອົາສະເພາະທີ່ກົງເງື່ອນໄຂ | `_students.where((s) => s.gpa >= 3.5)` |
| `map()` | ແປງທຸກອັນເປັນອັນໃໝ່ | `jsonList.map((item) => StudentModel.fromMap(item))` |
| `fold()` | ລວມຄ່າທັງໝົດເປັນຄ່າດຽວ | `fold(0, (sum, s) => sum + s.gpa)` |
| `sort()` | ຈັດລຽງ (ປ່ຽນ list ເດີມ) | `list.sort((a, b) => b.gpa.compareTo(a.gpa))` |
| `indexWhere()` | ຫາຕຳແໜ່ງ (ບໍ່ພົບ = -1) | `_students.indexWhere((s) => s.id == id)` |
| `removeWhere()` | ລຶບທຸກອັນທີ່ກົງເງື່ອນໄຂ | `_students.removeWhere((s) => s.id == id)` |
| `toList()` | ແປງຜົນ (Iterable) ກັບເປັນ List | `.where(...).toList()` |
| `List.from()` | ສຳເນົາ list ໃໝ່ | `List.from(_students)` |

**Arrow function** `=>` = ຟັງຊັນທີ່ມີຄຳສັ່ງດຽວ: `(s) => s.gpa >= 3.5` ເທົ່າກັບ `(s) { return s.gpa >= 3.5; }`

### 3.5 enum

```dart
enum SortOption { name, gpa }   // ຊຸດຄ່າທີ່ເລືອກໄດ້ຈຳກັດ — ພິມຜິດ compile ບໍ່ຜ່ານ (ດີກວ່າໃຊ້ String 'name')
SortOption _sortBy = SortOption.name;
```

### 3.6 async / await, Future ແລະ Stream

ວຽກທີ່ໃຊ້ເວລາ (ອ່ານໄຟລ໌, ເນັດ, database) ເປັນແບບ **Asynchronous** — ແອັບບໍ່ຄ້າງລໍ

| | Future | Stream |
|---|---|---|
| ຜົນລັບ | **ຄ່າດຽວ** ໃນອະນາຄົດ | **ຫຼາຍຄ່າ** ຕໍ່ເນື່ອງ |
| ປຽບທຽບ | ສັ່ງເຂົ້າ 1 ຈານ ລໍຮັບເທື່ອດຽວ | ຟັງວິທະຍຸ — ມີຂ່າວໃໝ່ເຂົ້າມາເລື້ອຍໆ |
| ຮັບຄ່າ | `await` ຫຼື `FutureBuilder` | `listen()` ຫຼື `StreamBuilder` |
| ຕົວຢ່າງ | `SharedPreferences.getInstance()` | `FirebaseAuth.instance.authStateChanges()` |

```dart
Future<void> loadStudents() async {                       // async = ຟັງຊັນນີ້ມີການລໍ
  final prefs = await SharedPreferences.getInstance();    // await = ລໍໃຫ້ສຳເລັດກ່ອນ ແລ້ວຈຶ່ງໄປແຖວຕໍ່ໄປ
  final data = prefs.getString(_storageKey);
}
```

### 3.7 String Interpolation

```dart
'$totalStudents ຄົນ'                    // ຕົວປ່ຽນ: $ຊື່
'ອາຍຸ: ${student.age} ປີ'               // expression / property: ${...}
'Grade ${student.gradeLetter}'
```

## 4. ພື້ນຖານ Flutter

### 4.1 ທຸກຢ່າງແມ່ນ Widget

**Widget** = ຊິ້ນສ່ວນ UI (ປຸ່ມ, ຂໍ້ຄວາມ, ໄລຍະຫ່າງ, ໜ້າຈໍທັງໜ້າ) ທີ່ຊ້ອນກັນເປັນ **Widget Tree** — ເຊັ່ນ ບັດນັກສຶກສາ 1 ໃບ:

```text
StudentCard
└── Dismissible            ປັດເພື່ອລຶບ
    └── Container          ພື້ນຂາວ ຂອບມົນ ເງົາ
        └── Padding
            └── Row        ລຽງແນວນອນ
                ├── Container (ວົງມົນ + Icon ໜ້າຄົນ)
                ├── Expanded → Column (ຊື່, Grade, ອາຍຸ, ສາຂາ)
                └── Column (GPA + ເມນູ ⋮)
```

### 4.2 StatelessWidget ແລະ StatefulWidget

| | StatelessWidget | StatefulWidget |
|---|---|---|
| ມີ State ຂອງຕົນເອງ | ❌ ຮັບຂໍ້ມູນຈາກພາຍນອກຢ່າງດຽວ | ✅ ມີ class `State` ແຍກ |
| ອັບເດດໜ້າຈໍເອງ | ບໍ່ໄດ້ | ເອີ້ນ `setState(() { ... })` |
| ໃນແອັບນີ້ | `StudentListScreen`, `StudentCard`, `DashboardHeader`, `SearchBarWidget`, `EmptyStateWidget`, `MyApp` | `StudentFormScreen` (ມີ controller ແລະ ຄ່າ dropdown ທີ່ປ່ຽນໄດ້) |

> 💡 `StudentListScreen` ເປັນ Stateless ແຕ່ໜ້າຈໍຍັງອັບເດດໄດ້ — ເພາະ **State ຢູ່ໃນ Provider** ແລະ `Consumer` ເປັນຕົວ rebuild ໃຫ້

### 4.3 Lifecycle ຂອງ StatefulWidget

<!-- include:fl-lifecycle -->

| Method | ເອີ້ນເມື່ອໃດ | ໃນ `StudentFormScreen` ໃຊ້ເຮັດຫຍັງ |
|---|---|---|
| `createState()` | ສ້າງ widget | ສ້າງ `_StudentFormScreenState` |
| `initState()` | **ຄັ້ງດຽວ** ຕອນເລີ່ມ | ສ້າງ `TextEditingController` 6 ອັນ + ເຕີມຄ່າເດີມ |
| `build()` | ທຸກຄັ້ງທີ່ຕ້ອງວາດໃໝ່ | ສ້າງຟອມ |
| `setState()` | ເຮົາເອີ້ນເອງ ເມື່ອ state ປ່ຽນ | ປ່ຽນ ເພດ / ສາຂາ ໃນ dropdown |
| `dispose()` | **ຄັ້ງດຽວ** ຕອນປິດໜ້າ | ຄືນ memory ຂອງ controller ທັງ 6 (ກັນ **Memory Leak**) |

### 4.4 BuildContext ແລະ Navigator

- **BuildContext** = "ທີ່ຢູ່" ຂອງ widget ໃນ Widget Tree — ໃຊ້ຫາສິ່ງທີ່ຢູ່ຊັ້ນເທິງ ເຊັ່ນ `Provider.of<StudentProvider>(context)`, `ScaffoldMessenger.of(context)`
- **Navigator** = ຈັດການໜ້າຈໍແບບ **Stack** (ຊ້ອນກັນຄືຈານ):

```dart
Navigator.push(context, MaterialPageRoute(builder: (_) => const StudentFormScreen())); // ເປີດໜ້າໃໝ່ທັບ
Navigator.pop(context); // ປິດໜ້າເທິງສຸດ ກັບໄປໜ້າເກົ່າ
```

### 4.5 Widget ທີ່ໃຊ້ໃນແອັບນີ້

| Widget | ໜ້າທີ່ |
|---|---|
| `MaterialApp` | ກອບແອັບ: theme, ໜ້າທຳອິດ (`home`), ຊື່ແອັບ |
| `Scaffold` | ໂຄງໜ້າຈໍ: `appBar`, `body`, `floatingActionButton` |
| `AppBar` | ແຖບຫົວໜ້າຈໍ + `actions` (ປຸ່ມທາງຂວາ) |
| `Column` / `Row` | ລຽງ widget ລູກ ແນວຕັ້ງ / ແນວນອນ |
| `Expanded` / `Flexible` | ໃຫ້ລູກຂະຫຍາຍເຕັມພື້ນທີ່ທີ່ເຫຼືອໃນ Row/Column |
| `Container` | ກ່ອງ: ສີ, ຂອບມົນ, ເງົາ, gradient, margin, padding |
| `Padding` / `SizedBox` | ເພີ່ມໄລຍະຫ່າງ |
| `ListView.builder` | ລາຍການທີ່ສ້າງສະເພາະແຖວທີ່ເຫັນ (ປະຫຍັດ memory) |
| `SingleChildScrollView` | ເລື່ອນໄດ້ ເມື່ອເນື້ອຫາຍາວເກີນຈໍ (ຟອມ) |
| `Form` + `TextFormField` | ຟອມ + ຊ່ອງປ້ອນທີ່ມີ `validator` |
| `DropdownButtonFormField` | ລາຍການເລືອກໃນຟອມ |
| `ElevatedButton` / `FloatingActionButton` | ປຸ່ມ / ປຸ່ມລອຍມຸມຂວາລຸ່ມ |
| `PopupMenuButton` | ເມນູ ⋮ ທີ່ເປີດອອກມາ |
| `ChoiceChip` | ປຸ່ມຊິບເລືອກໄດ້ 1 ອັນ |
| `Dismissible` | ປັດເພື່ອລຶບ |
| `SnackBar` | ແຖບຂໍ້ຄວາມແຈ້ງເຕືອນຊົ່ວຄາວລຸ່ມຈໍ |

## 5. ສ້າງໂປຣເຈັກ ແລະ ຕິດຕັ້ງ Package

### 5.1 ຄຳສັ່ງພື້ນຖານ

| ຄຳສັ່ງ | ເຮັດຫຍັງ |
|---|---|
| `flutter create student_app` | ສ້າງໂປຣເຈັກໃໝ່ |
| `flutter pub add provider` | ເພີ່ມ package (ຂຽນລົງ `pubspec.yaml` ໃຫ້) |
| `flutter pub get` | ດາວໂຫຼດ package ທັງໝົດຕາມ `pubspec.yaml` |
| `flutter run -d chrome` | ລັນໃນ Chrome (ຫຼື `flutter run` ໃນມືຖື/emulator) |
| `r` / `R` (ຕອນລັນຢູ່) | **Hot Reload** (ອັບເດດ UI ຮັກສາ state) / **Hot Restart** (ເລີ່ມແອັບໃໝ່) |
| `flutter analyze` | ກວດໂຄ້ດຫາ error ແລະ warning |
| `flutter build apk` | ສ້າງໄຟລ໌ຕິດຕັ້ງ Android |

ຄຳສັ່ງຕິດຕັ້ງ package ຕາມສະໄລ:

```bash
flutter pub add provider shared_preferences image_picker
```

### 5.2 pubspec.yaml

`pubspec.yaml` = ໄຟລ໌ຕັ້ງຄ່າໂປຣເຈັກ: **ຊື່ ແລະ ເວີຊັນແອັບ**, **dependencies** (package ທີ່ໃຊ້), **assets** (ຮູບ, ຟອນ)

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  provider: ^6.1.5+1
  shared_preferences: ^2.2.2
  image_picker: ^1.0.7
```

**`^2.2.2`** (caret) = ຍອມຮັບເວີຊັນ **2.2.2 ຂຶ້ນໄປ ແຕ່ຕ່ຳກວ່າ 3.0.0** — ອັບເດດແກ້ບັກໄດ້ ແຕ່ບໍ່ຂ້າມເວີຊັນໃຫຍ່ທີ່ອາດປ່ຽນ API

### 5.3 ໂຄງສ້າງ Folder

```text
lib/
├── models/
│   └── student_model.dart        ຂໍ້ມູນ (Model)
├── providers/
│   └── student_provider.dart     State + Logic + ບັນທຶກຂໍ້ມູນ
├── screens/
│   ├── student_list_screen.dart  ໜ້າລາຍການ (ໜ້າຫຼັກ)
│   └── student_form_screen.dart  ໜ້າຟອມ ເພີ່ມ/ແກ້ໄຂ
├── widgets/
│   ├── dashboard_header.dart     ບັດສະຫຼຸບ
│   ├── student_card.dart         ບັດນັກສຶກສາ
│   ├── search_bar_widget.dart    ຄົ້ນຫາ + ຊິບສາຂາ
│   └── empty_state_widget.dart   ໜ້າຈໍຕອນບໍ່ມີຂໍ້ມູນ
└── main.dart                     ຈຸດເລີ່ມຕົ້ນ
```

**screens** = ໜ້າຈໍເຕັມໜ້າ (ມີ `Scaffold`) · **widgets** = ຊິ້ນສ່ວນນ້ອຍທີ່ນຳໃຊ້ຄືນໄດ້

## 6. Model — student_model.dart

Model = **ແມ່ແບບຂໍ້ມູນ** ຂອງນັກສຶກສາ 1 ຄົນ (ຄື 1 ແຖວໃນຕາຕະລາງ database)

### 6.1 Field ແລະ Constructor

```dart
class StudentModel {
  final String id;
  final String name;
  final int age;
  final String gender; // 'ຊາຍ' ຫຼື 'ຍິງ'
  final String major;
  final double gpa;
  final String classroom;
  final int year;
  final String phone;
  final String email;
```

- ທຸກ field ເປັນ `final` = **Immutable** (ສ້າງແລ້ວແກ້ບໍ່ໄດ້) — ຢາກແກ້ຕ້ອງສ້າງ object ໃໝ່ດ້ວຍ `copyWith()` ປອດໄພກວ່າ ບໍ່ມີບ່ອນໃດແອບແກ້ຂໍ້ມູນ
- Constructor ໃຊ້ **named parameters**: 8 field ແມ່ນ `required` · `phone` ແລະ `email` ມີຄ່າເລີ່ມຕົ້ນ `'020-5555-8888'` ແລະ `'student@soutsaka.edu.la'`

### 6.2 getter gradeLetter

```dart
String get gradeLetter {
  if (gpa >= 3.5) return 'A';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.0) return 'C';
  return 'D';
}
```

**getter** = ຄຸນສົມບັດທີ່ **ຄຳນວນທຸກຄັ້ງທີ່ເອີ້ນ** ບໍ່ໄດ້ເກັບໄວ້ — ເອີ້ນໂດຍບໍ່ມີວົງເລັບ: `student.gradeLetter` · ກວດຈາກສູງໄປຕ່ຳ ພົບເງື່ອນໄຂທຳອິດກໍ `return` ທັນທີ

### 6.3 copyWith()

```dart
widget.student!.copyWith(name: 'ຊື່ໃໝ່', gpa: 3.9) // ໄດ້ object ໃໝ່: ປ່ຽນແຕ່ name ກັບ gpa ທີ່ເຫຼືອຄືເກົ່າ
```

ທຸກ parameter ເປັນ `Type?` (ອາດເປັນ null) → `id: id ?? this.id` ໝາຍຄວາມວ່າ "ຖ້າບໍ່ໄດ້ສົ່ງຄ່າໃໝ່ມາ ໃຊ້ຄ່າເກົ່າ" · ໃຊ້ໃນ **ໂໝດແກ້ໄຂ** ເພື່ອຮັກສາ `id` ແລະ `email` ເດີມ

### 6.4 toMap, fromMap, toJson, fromJson

| Method | ທິດທາງ | ໃຊ້ຕອນ |
|---|---|---|
| `toMap()` | Object → `Map<String, dynamic>` | ກ່ອນບັນທຶກ |
| `StudentModel.fromMap()` | Map → Object | ຫຼັງອ່ານ |
| `toJson()` | Object → JSON String | (ໃຊ້ `json.encode(toMap())`) |
| `StudentModel.fromJson()` | JSON String → Object | (ໃຊ້ `json.decode()` ແລ້ວ `fromMap`) |

```dart
gpa: (map['gpa'] as num?)?.toDouble() ?? 0.0,
```

ແຖວນີ້ສຳຄັນ: JSON ບໍ່ແຍກ int ກັບ double — GPA `3` ອາດອ່ານກັບມາເປັນ **int** · `as num?` ຮັບທັງ int/double ແລ້ວ `toDouble()` ແປງໃຫ້ເປັນ double ສະເໝີ · `?? 0.0` ກັນກໍລະນີບໍ່ມີຄ່າ — **field ອື່ນໃຊ້ `??` ໃສ່ຄ່າເລີ່ມຕົ້ນ** ເພື່ອບໍ່ໃຫ້ແອັບ crash ເມື່ອຂໍ້ມູນເກົ່າຂາດບາງ field

## 7. Provider — student_provider.dart

ໄຟລ໌ສຳຄັນທີ່ສຸດ: ເກັບ **State** ທັງໝົດ + **Logic** (ຄົ້ນຫາ, ກັ່ນຕອງ, ຈັດລຽງ, CRUD) + **ບັນທຶກລົງເຄື່ອງ**

### 7.1 enum ແລະ State ສ່ວນຕົວ

```dart
enum SortOption { name, gpa }

class StudentProvider extends ChangeNotifier {
  List<StudentModel> _students = [];               // ຂໍ້ມູນຕົ້ນສະບັບ
  String _searchQuery = '';                        // ຄຳຄົ້ນຫາ
  String _selectedMajorFilter = 'ທັງໝົດ';           // ສາຂາທີ່ເລືອກ
  SortOption _sortBy = SortOption.name;            // ວິທີຈັດລຽງ
  static const String _storageKey = 'soutsaka_students_key_v1';
```

- `extends ChangeNotifier` = ໄດ້ຄວາມສາມາດ `notifyListeners()` (Observer Pattern)
- ທຸກ field ເປັນ **private** (`_`) — ພາຍນອກແກ້ໂດຍກົງບໍ່ໄດ້ ຕ້ອງຜ່ານ method ເທົ່ານັ້ນ (Encapsulation) ຈຶ່ງແນ່ໃຈວ່າທຸກການປ່ຽນແປງ **ບັນທຶກ + ແຈ້ງເຕືອນ** ສະເໝີ
- `_v1` ທ້າຍ key = ເວີຊັນຂອງຮູບແບບຂໍ້ມູນ — ຖ້າປ່ຽນໂຄງສ້າງຂໍ້ມູນໃນອະນາຄົດ ປ່ຽນເປັນ `_v2` ຈະບໍ່ອ່ານຂໍ້ມູນເກົ່າທີ່ບໍ່ເຂົ້າກັນ

### 7.2 Constructor ແລະ getter ສະຖິຕິ

```dart
StudentProvider() {
  loadStudents();          // ໂຫຼດຂໍ້ມູນທັນທີທີ່ Provider ຖືກສ້າງ
}

int get totalStudents => _students.length;
double get averageGpa { /* fold ລວມ GPA ÷ ຈຳນວນ */ }
int get honorStudents => _students.where((s) => s.gpa >= 3.5).length;
```

`averageGpa` ກວດ `isEmpty` ກ່ອນ ເພື່ອ **ກັນການຫານດ້ວຍ 0** · ສະຖິຕິທັງ 3 ຄຳນວນຈາກ **ນັກສຶກສາທັງໝົດ** (ບໍ່ປ່ຽນຕາມການຄົ້ນຫາ)

### 7.3 getter students — ກັ່ນຕອງ, ຄົ້ນຫາ, ຈັດລຽງ

ໜ້າຈໍບໍ່ເຄີຍເຫັນ `_students` ໂດຍກົງ — ເຫັນຜ່ານ getter `students` ທີ່ຜ່ານ 3 ຂັ້ນ:

1. **ສຳເນົາ** `List.from(_students)` — ບໍ່ໃຫ້ການ sort ໄປປ່ຽນລຳດັບຂໍ້ມູນຕົ້ນສະບັບ
2. **ກັ່ນຕອງສາຂາ** — ຖ້າບໍ່ແມ່ນ `'ທັງໝົດ'` ເອົາສະເພາະ `s.major == _selectedMajorFilter`
3. **ຄົ້ນຫາ** — `toLowerCase()` ທັງສອງຝັ່ງ (ບໍ່ສົນຕົວໃຫຍ່-ນ້ອຍ) ແລ້ວ `contains()` ໃນ ຊື່ **ຫຼື** ສາຂາ **ຫຼື** ຫ້ອງ
4. **ຈັດລຽງ** — ຕາມຊື່: `a.name.compareTo(b.name)` (A→Z) · ຕາມ GPA: `b.gpa.compareTo(a.gpa)` (ສັງເກດ **b ກ່ອນ a** = ຈາກຫຼາຍໄປໜ້ອຍ)

> ⚠️ ຈັດລຽງຕາມຊື່ ຈະລຽງຕາມ **ຄຳນຳໜ້າ** ທ້າວ/ນາງ ກ່ອນ ແລະ ຊື່ທີ່ຂຶ້ນຕົ້ນດ້ວຍສະຫຼະໜ້າ (ເ ແ ໂ ໃ ໄ) ຈະໄປຢູ່ທ້າຍ — ເບິ່ງວິທີແກ້ໃນ [ຫົວຂໍ້ 13](#sec-13)

### 7.4 loadStudents() — ອ່ານຂໍ້ມູນຈາກເຄື່ອງ

```dart
final prefs = await SharedPreferences.getInstance();
final String? dataString = prefs.getString(_storageKey);   // ບໍ່ມີ = null

if (dataString != null) {
  final List<dynamic> jsonList = json.decode(dataString);  // JSON String → List<Map>
  _students = jsonList.map((item) => StudentModel.fromMap(item)).toList();
} else {
  _students = [ /* ນັກສຶກສາຕົວຢ່າງ 4 ຄົນ */ ];
  _saveToPrefs();
}
notifyListeners();
```

- ເປີດແອັບ **ຄັ້ງທຳອິດ** = ຍັງບໍ່ມີຂໍ້ມູນ (`null`) → ໃສ່ **ຂໍ້ມູນຕົວຢ່າງ 4 ຄົນ** ແລ້ວບັນທຶກ (Seed Data)
- ຄັ້ງຕໍ່ໄປ = ອ່ານ JSON → `fromMap` ທີລະຄົນ
- ຫໍ່ດ້ວຍ `try-catch` — ຖ້າຂໍ້ມູນເສຍ ແອັບບໍ່ crash ແຕ່ພິມ error ດ້ວຍ `debugPrint`

### 7.5 _saveToPrefs() — ບັນທຶກລົງເຄື່ອງ

```dart
await prefs.setString(_storageKey, json.encode(_students.map((s) => s.toMap()).toList()));
```

ອ່ານຈາກໃນອອກນອກ: ທຸກຄົນ `toMap()` → ເປັນ List → `json.encode` ເປັນ String ກ້ອນດຽວ → `setString` ບັນທຶກທັບຂອງເກົ່າ — **ບັນທຶກທັງໝົດທຸກຄັ້ງ** (ງ່າຍ ແຕ່ຖ້າມີຫຼາຍພັນຄົນຈະຊ້າ)

### 7.6 setter + notifyListeners()

```dart
void setSearchQuery(String query) {
  _searchQuery = query;
  notifyListeners();   // ← ບອກທຸກ Consumer ໃຫ້ build ໃໝ່
}
```

`setMajorFilter()` ແລະ `setSortBy()` ເຮັດແບບດຽວກັນ — ສັງເກດວ່າ **ບໍ່ໄດ້ບັນທຶກລົງເຄື່ອງ** ເພາະເປັນແຕ່ການຕັ້ງຄ່າມຸມມອງ ບໍ່ແມ່ນຂໍ້ມູນ

### 7.7 CRUD: addStudent, updateStudent, deleteStudent

| Method | ຂັ້ນຕອນ |
|---|---|
| `addStudent(student)` | `_students.add()` → `_saveToPrefs()` → `notifyListeners()` |
| `updateStudent(updated)` | `indexWhere` ຫາ id → ຖ້າພົບ (`!= -1`) ແທນທີ່ → ບັນທຶກ → ແຈ້ງເຕືອນ |
| `deleteStudent(id)` | `removeWhere` ຕາມ id → ບັນທຶກ → ແຈ້ງເຕືອນ |

ທຸກ method ມີ **3 ຂັ້ນຄືກັນ**: ແກ້ຂໍ້ມູນໃນ memory → ບັນທຶກລົງເຄື່ອງ → ແຈ້ງ UI

## 8. main.dart — ຈຸດເລີ່ມຕົ້ນ

```dart
void main() {
  runApp(const MyApp());
}
```

`main()` = ຟັງຊັນທຳອິດທີ່ຖືກເອີ້ນ · `runApp()` ເອົາ widget ຂຶ້ນສະແດງເຕັມຈໍ

```dart
return MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => StudentProvider()),
  ],
  child: MaterialApp( ... home: const StudentListScreen() ),
);
```

- **`MultiProvider`** ຢູ່ **ເທິງສຸດ** ຂອງ Widget Tree → ທຸກໜ້າ (ລວມທັງໜ້າຟອມທີ່ push ເຂົ້າມາ) ເຂົ້າເຖິງ `StudentProvider` ໄດ້
- `ChangeNotifierProvider(create: ...)` ສ້າງ Provider **ຄັ້ງດຽວ** ແລະ `dispose` ໃຫ້ເອງເມື່ອປິດແອັບ
- ໃຊ້ `MultiProvider` ເຖິງວ່າຈະມີ Provider ອັນດຽວ — ພ້ອມເພີ່ມອັນອື່ນໃນອະນາຄົດ (ເຊັ່ນ AuthProvider)
- `theme`: `useMaterial3: false` (ໃຊ້ Material 2), ສີຫຼັກ `0xFF0052D4` (ຟ້າເຂັ້ມ), ພື້ນຫຼັງ `0xFFF4F6F9` · `debugShowCheckedModeBanner: false` ເຊື່ອງປ້າຍ DEBUG

**ຮູບແບບສີ `Color(0xFF0052D4)`:** `0x` = ເລກຖານ 16 · `FF` = ຄວາມທຶບ 100% · `0052D4` = ສີ RGB

## 9. ໜ້າລາຍການ — student_list_screen.dart

### 9.1 Scaffold, AppBar ແລະ ເມນູຈັດລຽງ

```dart
PopupMenuButton<SortOption>(
  icon: const Icon(Icons.sort_rounded),
  onSelected: (sort) {
    Provider.of<StudentProvider>(context, listen: false).setSortBy(sort);
  },
  itemBuilder: (context) => [
    const PopupMenuItem(value: SortOption.name, child: Text('ຈັດລຳດັບຕາມຊື່ (A-Z)')),
    const PopupMenuItem(value: SortOption.gpa, child: Text('ຈັດລຳດັບຕາມ GPA (ສູງສຸດ)')),
  ],
),
```

**`listen: false`** = ຂໍ Provider ມາ **ເອີ້ນ method ຢ່າງດຽວ** ບໍ່ຕ້ອງການ rebuild ເມື່ອຂໍ້ມູນປ່ຽນ — ໃຊ້ໃນ event handler (onPressed, onSelected) ສະເໝີ

### 9.2 Consumer<StudentProvider>

```dart
body: Consumer<StudentProvider>(
  builder: (context, provider, child) {
    return Column(children: [ DashboardHeader(...), SearchBarWidget(...), Expanded(...) ]);
  },
),
```

`Consumer` = **Observer** — ທຸກຄັ້ງທີ່ Provider ເອີ້ນ `notifyListeners()` ສ່ວນ `builder` ຈະ **ຖືກ build ໃໝ່** ດ້ວຍຂໍ້ມູນລ່າສຸດ · ຫໍ່ສະເພາະ `body` (ບໍ່ແມ່ນທັງ Scaffold) ເພື່ອບໍ່ໃຫ້ AppBar ແລະ ປຸ່ມ + rebuild ໂດຍບໍ່ຈຳເປັນ

| ວິທີເອົາ Provider | rebuild ເມື່ອປ່ຽນ | ໃຊ້ຕອນ |
|---|---|---|
| `Consumer<T>(builder: ...)` | ✅ | ສະແດງຂໍ້ມູນ |
| `Provider.of<T>(context)` | ✅ | ສະແດງຂໍ້ມູນ (ທັງ widget rebuild) |
| `Provider.of<T>(context, listen: false)` | ❌ | ເອີ້ນ method ໃນ event |
| `context.watch<T>()` / `context.read<T>()` | ✅ / ❌ | ຮູບແບບສັ້ນຂອງ 2 ແຖວຂ້າງເທິງ |

### 9.3 ListView.builder ແລະ ການເຊື່ອມ callback

```dart
Expanded(
  child: provider.students.isEmpty
      ? const EmptyStateWidget()               // ບໍ່ມີຂໍ້ມູນ → ໜ້າວ່າງ
      : ListView.builder(
          itemCount: provider.students.length,
          itemBuilder: (context, index) {
            final student = provider.students[index];
            return StudentCard(
              student: student,
              onEdit: () { Navigator.push(... StudentFormScreen(student: student)); },
              onDelete: () => provider.deleteStudent(student.id),
            );
          },
        ),
),
```

- `Expanded` ຈຳເປັນ: `ListView` ຢູ່ໃນ `Column` ຕ້ອງຮູ້ຄວາມສູງ — `Expanded` ໃຫ້ມັນໃຊ້ພື້ນທີ່ທີ່ເຫຼືອທັງໝົດ
- **`? :`** (ternary) = ຖ້າ ... ສະແດງອັນນີ້ ບໍ່ດັ່ງນັ້ນ ສະແດງອັນນັ້ນ
- `StudentCard` ບໍ່ຮູ້ຈັກ Provider — ຮັບແຕ່ **callback** (`onEdit`, `onDelete`) ຈາກພໍ່ ⇒ widget ນຳໃຊ້ຄືນໄດ້ (Separation of Concerns)

### 9.4 FloatingActionButton

ກົດປຸ່ມ **+** → `Navigator.push` ໄປ `const StudentFormScreen()` **ບໍ່ສົ່ງ student** = ໂໝດເພີ່ມ · ຖ້າມາຈາກເມນູ "ແກ້ໄຂ" ຈະສົ່ງ `StudentFormScreen(student: student)` = ໂໝດແກ້ໄຂ — **ໜ້າດຽວໃຊ້ 2 ໂໝດ**

## 10. ໜ້າຟອມ — student_form_screen.dart

### 10.1 StatefulWidget ແລະ ຕົວປ່ຽນ

```dart
class StudentFormScreen extends StatefulWidget {
  final StudentModel? student;   // null = ເພີ່ມ · ມີຄ່າ = ແກ້ໄຂ
```

ໃນ State: `GlobalKey<FormState>` (ກະແຈຄວບຄຸມຟອມ), `TextEditingController` 6 ອັນ (ອ່ານ/ຂຽນຂໍ້ຄວາມໃນຊ່ອງ), ຄ່າ dropdown `_selectedGender` / `_selectedMajor` ແລະ ລາຍການ `_genders` / `_majors`

### 10.2 initState() — ເຕີມຄ່າເລີ່ມຕົ້ນ

```dart
_gpaController = TextEditingController(text: widget.student?.gpa.toString() ?? '3.50');
```

ໂໝດແກ້ໄຂ → ໃສ່ຄ່າເດີມ · ໂໝດເພີ່ມ → ໃສ່ຄ່າເລີ່ມຕົ້ນ (GPA 3.50, ຫ້ອງ BCSP7A-AM, ປີ 4) · ໃນ `State` ເຂົ້າເຖິງ field ຂອງ widget ຜ່ານ **`widget.`**

**Safety Check ຂອງ Dropdown:** `DropdownButtonFormField` ຈະ **error (Assertion)** ຖ້າຄ່າທີ່ເລືອກ ບໍ່ມີໃນ `items` — ເຊັ່ນ ຂໍ້ມູນເກົ່າມີສາຂາທີ່ຖືກລຶບອອກຈາກລາຍການແລ້ວ · ໂຄ້ດຈຶ່ງກວດ `_majors.contains(...)` ກ່ອນ ຖ້າບໍ່ມີ ໃຊ້ອັນທຳອິດ (`.first`)

### 10.3 dispose()

ເອີ້ນ `.dispose()` ໃຫ້ controller **ທັງ 6** ແລ້ວ `super.dispose()` ຢູ່ **ທ້າຍສຸດ** — ຖ້າລືມ controller ຍັງຄ້າງໃນ memory ຫຼັງປິດໜ້າ (**Memory Leak**) · ສັງເກດ: `initState` ເອີ້ນ `super` **ກ່ອນ**, `dispose` ເອີ້ນ `super` **ຫຼັງ**

### 10.4 _saveForm() — ບັນທຶກ

1. `_formKey.currentState!.validate()` — ເອີ້ນ `validator` ຂອງທຸກຊ່ອງ · ມີຊ່ອງໃດຜິດ = ສະແດງຂໍ້ຄວາມແດງ ແລະ ຢຸດ
2. `int.parse()` / `double.parse()` — ແປງຂໍ້ຄວາມເປັນຕົວເລກ
3. `widget.student == null` → `addStudent(StudentModel(id: DateTime.now().millisecondsSinceEpoch.toString(), ...))` — ໃຊ້ **ເວລາປັດຈຸບັນ (ມິນລິວິນາທີ)** ເປັນ id ທີ່ບໍ່ຊ້ຳ
4. ບໍ່ດັ່ງນັ້ນ → `updateStudent(widget.student!.copyWith(...))` — ຮັກສາ id ເດີມ
5. `Navigator.pop(context)` — ກັບໜ້າລາຍການ (ທີ່ອັບເດດແລ້ວຜ່ານ Consumer)

`.trim()` = ຕັດຍະຫວ່າງໜ້າ-ຫຼັງ ກັນຜູ້ໃຊ້ພິມຍະຫວ່າງເກີນ

### 10.5 build() — ສ່ວນປະກອບຂອງຟອມ

```dart
TextFormField(
  controller: _nameController,
  decoration: const InputDecoration(labelText: 'ຊື່ ແລະ ນາມສະກຸນ', border: UnderlineInputBorder()),
  validator: (val) => val == null || val.trim().isEmpty ? 'ກະລຸນາປ້ອນຊື່' : null,
),
```

- **validator** ຄືນ **String** = ຂໍ້ຄວາມ error · ຄືນ **null** = ຖືກຕ້ອງ
- `keyboardType: TextInputType.number` / `numberWithOptions(decimal: true)` / `phone` = ເປີດແປ້ນພິມທີ່ເໝາະສົມໃນມືຖື
- `Row` + `Expanded` 2 ອັນ = 2 ຊ່ອງຄູ່ກັນ ກວ້າງເທົ່າກັນ (ອາຍຸ-ປີ, ຫ້ອງ-GPA)
- `DropdownButtonFormField`: `items` ສ້າງຈາກ `_genders.map(...)` · `onChanged` ເອີ້ນ `setState` ເພື່ອຈື່ຄ່າໃໝ່
- `isEditing ? 'ແກ້ໄຂຂໍ້ມູນນັກສຶກສາ' : 'ເພີ່ມຂໍ້ມູນນັກສຶກສາ'` — ຫົວຂໍ້ປ່ຽນຕາມໂໝດ

## 11. Widget ຍ່ອຍ

### 11.1 DashboardHeader — ບັດສະຫຼຸບ

- ຮັບ 3 ຄ່າ (`totalStudents`, `averageGpa`, `honorStudents`) ຜ່ານ constructor — **Stateless** ບໍ່ຮູ້ຈັກ Provider
- `BoxDecoration` + `LinearGradient` 3 ສີ (ຟ້າເຂັ້ມ → ຟ້າອ່ອນ) ຈາກ `topLeft` ຫາ `bottomRight` + `BoxShadow`
- `_buildMetric(title, value, icon)` = **helper method** ສ້າງ Column (Icon → ຕົວເລກ → ຫົວຂໍ້) ເອີ້ນ 3 ເທື່ອ ບໍ່ຕ້ອງຂຽນຊ້ຳ · ຄັ່ນດ້ວຍ `Container(width: 1)` ເປັນເສັ້ນຕັ້ງ
- `averageGpa.toStringAsFixed(2)` = ສະແດງທົດສະນິຍົມ 2 ຕຳແໜ່ງ (3.25)

### 11.2 SearchBarWidget — ຄົ້ນຫາ ແລະ ຊິບສາຂາ

- `ValueChanged<String>` = ຊະນິດຂອງ callback ທີ່ຮັບ String 1 ຄ່າ
- `TextField(onChanged: onChanged)` — ທຸກຕົວອັກສອນທີ່ພິມ ສົ່ງໄປ `setSearchQuery()` ທັນທີ (ຄົ້ນຫາແບບ realtime)
- ລາຍການສາຂາ: `ListView.builder(scrollDirection: Axis.horizontal)` ສູງ 38 → ເລື່ອນຊ້າຍ-ຂວາໄດ້
- `ChoiceChip`: `selected: major == selectedMajor` · ກົດແລ້ວເອີ້ນ `onMajorSelected(major)` — ສີ ແລະ ຄວາມໜາຕົວອັກສອນປ່ຽນຕາມ `isSelected`

### 11.3 StudentCard — ບັດນັກສຶກສາ

- **`_getGpaColor()`** — ສີຕາມເກຣດ: ຂຽວ (≥3.5), ຟ້າ (≥3.0), ສົ້ມ (≥2.0), ແດງ
- **`Dismissible`** — `key: Key(student.id)` (ຕ້ອງບໍ່ຊ້ຳ), `direction: endToStart` (ປັດຈາກຂວາໄປຊ້າຍເທົ່ານັ້ນ), `background` = ພື້ນແດງ + ໄອຄອນຖັງຂີ້ເຫຍື້ອ, `onDismissed` → `onDelete()`
- **ຮູບແທນຕົວ** — ວົງມົນ gradient: ຟ້າ + `Icons.face_rounded` (ຊາຍ) / ບົວ + `Icons.face_3_rounded` (ຍິງ) ຕາມ `isMale`
- **ຊື່ + ປ້າຍ Grade** — `Flexible` + `TextOverflow.ellipsis` = ຊື່ຍາວຈະຕັດເປັນ "…" ບໍ່ລົ້ນຈໍ
- **ເມນູ ⋮** — `PopupMenuButton<String>` 2 ລາຍການ: `'call'` → ສະແດງ `SnackBar` ເບີໂທ (ຍັງບໍ່ໄດ້ໂທແທ້) · `'edit'` → `onEdit()`

### 11.4 EmptyStateWidget

ສະແດງເມື່ອລາຍການວ່າງ (ລຶບໝົດ ຫຼື ຄົ້ນຫາບໍ່ພົບ): ວົງມົນສີເທົາ + `Icons.folder_open_rounded` + ຂໍ້ຄວາມ "ບໍ່ມີຂໍ້ມູນນັກສຶກສາ" — UX ທີ່ດີ: ດີກວ່າປ່ອຍໜ້າຈໍວ່າງເປົ່າ

## 12. ລຳດັບການເຮັດວຽກ (Flow)

<!-- include:fl-flow -->

**ຕົວຢ່າງ: ພິມຄົ້ນຫາ "ທ້າວ"** → `TextField.onChanged('ທ້າວ')` → `provider.setSearchQuery('ທ້າວ')` → `notifyListeners()` → `Consumer` build ໃໝ່ → getter `students` ກັ່ນຕອງ → ເຫຼືອ 3 ຄົນ → `ListView` ສະແດງ 3 ບັດ

## 13. ⚠️ ຈຸດທີ່ຄວນລະວັງ ແລະ ວິທີແກ້

ໂຄ້ດໃນສະໄລເຮັດວຽກໄດ້ ແຕ່ມີຈຸດທີ່ຄວນປັບປຸງ — **ໂຄ້ດແກ້ທຸກຂໍ້ກວດແລ້ວດ້ວຍ `flutter analyze`** ແລະ ລວມໄວ້ໃນເວີຊັນ Firebase (`flutter/student_app_firebase/`)

### 13.1 ປ້ອນຕົວເລກຜິດ ແອັບ error

`validator` ກວດແຕ່ "ວ່າງ ຫຼື ບໍ່" — ພິມອາຍຸ `abc` ຫຼື GPA `3,5` (ຈຸດເປັນຈຸດ) ຜ່ານ validator ແຕ່ `int.parse()` / `double.parse()` **ໂຍນ FormatException** ກົດບັນທຶກແລ້ວບໍ່ມີຫຍັງເກີດຂຶ້ນ · GPA `9.5` ກໍບັນທຶກໄດ້

```dart
validator: (val) {
  final g = double.tryParse(val?.trim().replaceAll(',', '.') ?? '');   // tryParse: ຜິດ = null (ບໍ່ error)
  if (g == null) return 'ກະລຸນາປ້ອນ GPA ເປັນຕົວເລກ';
  if (g < 0 || g > 4) return 'GPA ຕ້ອງຢູ່ລະຫວ່າງ 0.00–4.00';
  return null;
},
```

### 13.2 ປັດແລ້ວລຶບທັນທີ ບໍ່ມີຢືນຢັນ

ປັດຜິດ = ຂໍ້ມູນຫາຍທັນທີ ເອົາຄືນບໍ່ໄດ້ · ເພີ່ມ `confirmDismiss` ຖາມກ່ອນ ແລະ `SnackBar` ມີປຸ່ມ **ຍົກເລີກ (Undo)**:

```dart
// student_card.dart — ໃນ Dismissible
confirmDismiss: (_) => showDialog<bool>(
  context: context,
  builder: (ctx) => AlertDialog(
    title: const Text('ຢືນຢັນການລຶບ'),
    content: Text('ລຶບຂໍ້ມູນ ${student.name} ແທ້ບໍ?'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('ຍົກເລີກ')),
      TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('ລຶບ')),
    ],
  ),
),

// student_list_screen.dart — onDelete
onDelete: () {
  provider.deleteStudent(student.id);
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Text('ລຶບ ${student.name} ແລ້ວ'),
    action: SnackBarAction(label: 'ຍົກເລີກ', onPressed: () => provider.addStudent(student)),
  ));
},
```

### 13.3 getter students ຖືກຄຳນວນຊ້ຳຫຼາຍເທື່ອ

`provider.students` ເປັນ **getter ທີ່ກັ່ນຕອງ + ຈັດລຽງໃໝ່ທຸກຄັ້ງທີ່ເອີ້ນ** — ໃນ `ListView.builder` ຖືກເອີ້ນ `isEmpty` 1 ເທື່ອ, `length` 1 ເທື່ອ ແລະ **ທຸກແຖວ** ອີກ 1 ເທື່ອ → ມີ 1,000 ຄົນ = ຈັດລຽງຫຼາຍພັນເທື່ອຕໍ່ການ build · ແກ້: ເກັບໃສ່ຕົວປ່ຽນຄັ້ງດຽວ

```dart
builder: (context, provider, child) {
  final students = provider.students;   // ຄຳນວນຄັ້ງດຽວ
  ...
  itemCount: students.length,
  itemBuilder: (context, index) { final student = students[index]; ... }
```

### 13.4 ຈັດລຽງຊື່ພາສາລາວບໍ່ຖືກ

`compareTo` ທຽບລະຫັດ Unicode ຕົວຕໍ່ຕົວ: ① ທຸກ "ທ້າວ" ມາກ່ອນ "ນາງ" ໂດຍບໍ່ສົນຊື່ແທ້ ② ສະຫຼະໜ້າ ເ ແ ໂ ໃ ໄ ຢູ່ກ່ອນພະຍັນຊະນະ ຈຶ່ງ "ເຈມສ໌" ຖືກຈັດຢູ່ໝວດ **ເ** (ທ້າຍສຸດ) ແທນທີ່ຈະເປັນ **ຈ**

```dart
static String _laoSortKey(String name) => name
    .replaceFirst(RegExp(r'^(ທ້າວ|ນາງ)\s*'), '')                                  // ຕັດຄຳນຳໜ້າ
    .replaceAllMapped(RegExp(r'([ເແໂໃໄ])([ກ-ຮໜໝ])'), (m) => '${m[2]}${m[1]}');    // ຍ້າຍສະຫຼະໜ້າໄປຫຼັງ

list.sort((a, b) => _laoSortKey(a.name).compareTo(_laoSortKey(b.name)));
```

ຜົນທີ່ທົດສອບແລ້ວ: ເດີມ = ນິກ, ອານົນ, ເຈມສ໌, ອາລຸນຍາ → ແກ້ແລ້ວ = **ເຈມສ໌ (ຈ), ນິກ (ນ), ອານົນ, ອາລຸນຍາ (ອ)** · ໝາຍເຫດ: ລຳດັບ Unicode ຍັງບໍ່ກົງກັບລຳດັບພະຍັນຊະນະລາວ 100% (ເຊັ່ນ ສ)

### 13.5 ຟອມບໍ່ມີຊ່ອງອີເມວ

ນັກສຶກສາໃໝ່ທຸກຄົນໄດ້ອີເມວ `student@soutsaka.edu.la` ຄືກັນໝົດ (ຄ່າເລີ່ມຕົ້ນຂອງ constructor) · ເພີ່ມ `_emailController` + `TextFormField(keyboardType: TextInputType.emailAddress)` ພ້ອມ validator ກວດຮູບແບບ ແລ້ວສົ່ງ `email:` ຕອນ add/copyWith · **ຢ່າລືມ dispose controller ໃໝ່**

### 13.6 ລາຍຊື່ສາຂາຂຽນຊ້ຳ 2 ໄຟລ໌

`_majors` ໃນຟອມ ແລະ `majors` ໃນແຖບຄົ້ນຫາ ຕ້ອງກົງກັນ — ເພີ່ມສາຂາໃໝ່ແລ້ວລືມແກ້ອີກໄຟລ໌ = ຊິບກັ່ນຕອງບໍ່ມີສາຂານັ້ນ · ແກ້: ສ້າງໄຟລ໌ຄ່າຄົງທີ່ບ່ອນດຽວ (Single Source of Truth)

```dart
// lib/constants/majors.dart
const String kAllMajors = 'ທັງໝົດ';
const List<String> kMajors = ['ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ', 'ບໍລິຫານທຸລະກິດ', 'ພາສາອັງກິດ', 'ວິທະຍາສາດຄອມພິວເຕີ', 'ການເງິນ-ການບັນຊີ'];

// search_bar_widget.dart
final List<String> majors = const [kAllMajors, ...kMajors];   // ...  = spread (ກະຈາຍ list)
```

### 13.7 API ທີ່ເລີກໃຊ້ (Deprecated)

ໃນສະໄລເຫັນເປັນ **ຂີດຂ້າ** — ຍັງໃຊ້ໄດ້ ແຕ່ຈະຖືກລຶບໃນເວີຊັນໜ້າ:

| ເກົ່າ | ໃໝ່ | ເລີກໃຊ້ຕັ້ງແຕ່ |
|---|---|---|
| `color.withOpacity(0.35)` | `color.withValues(alpha: 0.35)` | Flutter 3.27 |
| `DropdownButtonFormField(value: x)` | `DropdownButtonFormField(initialValue: x)` | Flutter 3.33 |
| `const MyApp({Key? key}) : super(key: key);` | `const MyApp({super.key});` | Dart 2.17 (ແນະນຳ) |
| `import 'package:flutter/material.dart';` | `package:material_ui/material_ui.dart` (ເພີ່ມ package `material_ui`) | Flutter 3.47 — ຍັງໃຊ້ແບບເກົ່າໄດ້ ຖ້າອາຈານໃຊ້ເວີຊັນເກົ່າກວ່ານີ້ ບໍ່ຕ້ອງປ່ຽນ |

ຄຳສັ່ງ `dart fix --apply` ແກ້ບາງຢ່າງໃຫ້ອັດຕະໂນມັດ

### 13.8 ສິ່ງທີ່ຍັງບໍ່ຄົບ

- **`image_picker` ຕິດຕັ້ງແຕ່ບໍ່ໄດ້ໃຊ້** — ຖ້າບໍ່ໃຊ້ຄວນ `flutter pub remove image_picker` (ແອັບໃຫຍ່ຂຶ້ນ ແລະ iOS ຕ້ອງຂໍສິດເຂົ້າຄັງຮູບໂດຍບໍ່ຈຳເປັນ) · ວິທີໃຊ້ຢູ່ໃນ [ບົດ Firebase › Storage](/firebase/#sec-6)
- **ເມນູ "ໂທຫາ" ພຽງສະແດງ SnackBar** — ໂທແທ້ຕ້ອງໃຊ້ package `url_launcher`: `launchUrl(Uri(scheme: 'tel', path: student.phone))`
- **ຄອມເມັນ `[cite: 9]`** ໃນ `initState` ຫຼົງມາຈາກ AI — ຄວນລຶບ
- `_saveToPrefs()` ບໍ່ໄດ້ `await` — ຖ້າບັນທຶກລົ້ມເຫຼວ ຜູ້ໃຊ້ບໍ່ຮູ້ (ເຫັນແຕ່ໃນ debug console)

## 14. ຄຳຖາມທົດສອບຕົນເອງ

ເປີດໂໝດ **ຝຶກຕອບ** ເພື່ອເຊື່ອງຄຳຕອບ ແລ້ວແຕະເພື່ອເປີດ

1. Class ໃດເປັນ "Subject" ໃນ Observer Pattern ຂອງແອັບນີ້? — **`StudentProvider extends ChangeNotifier`**
2. Method ໃດບອກໃຫ້ UI build ໃໝ່? — **`notifyListeners()`**
3. Widget ໃດຟັງການປ່ຽນແປງຂອງ Provider ແລ້ວ rebuild? — **`Consumer<StudentProvider>`**
4. ເປັນຫຍັງໃຊ້ `listen: false` ໃນ `onSelected` ຂອງເມນູຈັດລຽງ? — **ເອີ້ນ method ຢ່າງດຽວ ບໍ່ຕ້ອງການ rebuild ເມື່ອຂໍ້ມູນປ່ຽນ**
5. SharedPreferences ເກັບຂໍ້ມູນແບບໃດ? — **Key-Value ໃນເຄື່ອງ (Local) — ແອັບນີ້ເກັບທັງໝົດເປັນ JSON String ໃນ key ດຽວ**
6. ເປີດແອັບຄັ້ງທຳອິດ ຂໍ້ມູນມາຈາກໃສ? — **ຂໍ້ມູນຕົວຢ່າງ 4 ຄົນໃນ `loadStudents()` (ເພາະ `getString` ຄືນ null) ແລ້ວບັນທຶກລົງເຄື່ອງ**
7. `copyWith()` ໃຊ້ເຮັດຫຍັງ? — **ສ້າງ object ໃໝ່ທີ່ປ່ຽນບາງ field ຮັກສາ field ອື່ນ (ລວມທັງ id) ເພາະ field ເປັນ final**
8. `fromMap` ໃຊ້ `(map['gpa'] as num?)?.toDouble()` ເພື່ອຫຍັງ? — **JSON ອາດຄືນ GPA ເປັນ int — ແປງໃຫ້ເປັນ double ສະເໝີ ແລະ ກັນ null**
9. `StudentFormScreen` ຮູ້ໄດ້ແນວໃດວ່າເປັນໂໝດເພີ່ມ ຫຼື ແກ້ໄຂ? — **`widget.student == null` = ເພີ່ມ · ມີຄ່າ = ແກ້ໄຂ**
10. ເປັນຫຍັງຕ້ອງ dispose TextEditingController? — **ກັນ Memory Leak — controller ຄ້າງໃນ memory ຫຼັງປິດໜ້າ**
11. validator ຄືນຄ່າຫຍັງ ເມື່ອຂໍ້ມູນຖືກຕ້ອງ? — **null (ຄືນ String = ຂໍ້ຄວາມ error)**
12. ສ້າງ id ໃຫ້ນັກສຶກສາໃໝ່ແນວໃດ? — **`DateTime.now().millisecondsSinceEpoch.toString()`**
13. `Dismissible` ຕ້ອງມີ property ໃດທີ່ບໍ່ຊ້ຳກັນ? — **`key` (ໃຊ້ `Key(student.id)`)**
14. ເປັນຫຍັງ `ListView.builder` ຕ້ອງຢູ່ໃນ `Expanded`? — **ຢູ່ໃນ Column ListView ບໍ່ຮູ້ຄວາມສູງ — Expanded ໃຫ້ໃຊ້ພື້ນທີ່ທີ່ເຫຼືອ**
15. Hot Reload ຕ່າງຈາກ Hot Restart ແນວໃດ? — **Hot Reload ອັບເດດ UI ຮັກສາ state · Hot Restart ເລີ່ມແອັບໃໝ່ state ຫາຍ**

## ອ້າງອີງ

- Flutter documentation — https://docs.flutter.dev
- Simple app state management (Provider) — https://docs.flutter.dev/data-and-backend/state-mgmt/simple
- Package provider — https://pub.dev/packages/provider
- Package shared_preferences — https://pub.dev/packages/shared_preferences
- Package image_picker — https://pub.dev/packages/image_picker
- Dart language tour — https://dart.dev/language
- Sound null safety — https://dart.dev/null-safety
- StatefulWidget lifecycle (API) — https://api.flutter.dev/flutter/widgets/State-class.html
- Build a form with validation — https://docs.flutter.dev/cookbook/forms/validation
- Implement swipe to dismiss — https://docs.flutter.dev/cookbook/gestures/dismissible
