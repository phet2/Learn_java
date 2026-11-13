// ແຜນພາບ ແລະ ຂໍ້ສອບລອງທຳ ສຳລັບບົດຮຽນ Flutter / Firebase
import { makeExam, esc } from './exam-kit.mjs';

// ---------------------------------------------------------------- ແຜນພາບ

const shots = () => `<div class="shots">
  <figure><img src="/assets/flutter/app-list.webp" alt="ໜ້າລາຍການນັກສຶກສາ: Dashboard, ຊ່ອງຄົ້ນຫາ, ຊິບສາຂາ ແລະ ບັດນັກສຶກສາ 4 ຄົນ" width="390" height="780" loading="lazy" decoding="async"><figcaption>ໜ້າລາຍການ (StudentListScreen)</figcaption></figure>
  <figure><img src="/assets/flutter/app-form.webp" alt="ໜ້າຟອມເພີ່ມຂໍ້ມູນນັກສຶກສາ" width="390" height="780" loading="lazy" decoding="async"><figcaption>ໜ້າຟອມ (StudentFormScreen)</figcaption></figure>
</div>
<p class="note">ພາບໜ້າຈໍຈາກການລັນໂຄ້ດຊຸດນີ້ຈິງ (Flutter 3.50, Chrome ຂະໜາດມືຖື)</p>`;

const observer = () => `<figure class="diagram">
  <div class="obs">
    <div class="obs-box subj"><b>StudentProvider</b><span>ChangeNotifier · ຖືຂໍ້ມູນ</span></div>
    <div class="obs-arrow"><span>notifyListeners()</span></div>
    <div class="obs-row">
      <div class="obs-box"><b>Consumer</b><span>ໜ້າລາຍການ → build ໃໝ່</span></div>
      <div class="obs-box"><b>Dashboard</b><span>ຕົວເລກອັບເດດ</span></div>
      <div class="obs-box"><b>ລາຍການ</b><span>ບັດອັບເດດ</span></div>
    </div>
  </div>
  <ol class="chips pipeline"><li>ຜູ້ໃຊ້ກົດ / ພິມ</li><li>ເອີ້ນ method ຂອງ Provider</li><li>ແກ້ <code>_students</code></li><li><code>notifyListeners()</code></li><li>Consumer build ໃໝ່</li></ol>
  <figcaption>Observer Pattern: ຂໍ້ມູນປ່ຽນບ່ອນດຽວ → ທຸກໜ້າຈໍທີ່ຕິດຕາມອັບເດດເອງ</figcaption>
</figure>`;

const layers = () => `<figure class="diagram">
  <div class="lay">
    <div class="lay-box ui"><b>Presentation (UI)</b><span><code>screens/</code> · <code>widgets/</code> — ສະແດງຜົນ ແລະ ຮັບການກົດ</span></div>
    <div class="lay-arrow">ເອີ້ນ method ↓ · ↑ notifyListeners()</div>
    <div class="lay-box st"><b>State / Logic</b><span><code>providers/</code> — ຄົ້ນຫາ, ກັ່ນຕອງ, ຈັດລຽງ, CRUD</span></div>
    <div class="lay-arrow">toMap() ↓ · ↑ fromMap()</div>
    <div class="lay-box dt"><b>Data</b><span><code>models/</code> + SharedPreferences (ໃນເຄື່ອງ) — ໃນບົດ Firebase ປ່ຽນເປັນ Cloud Firestore</span></div>
  </div>
  <figcaption>ແຕ່ລະຊັ້ນຮູ້ຈັກແຕ່ຊັ້ນທີ່ຢູ່ຕິດກັນ — UI ບໍ່ຮູ້ວ່າຂໍ້ມູນເກັບຢູ່ໃສ</figcaption>
</figure>`;

const lifecycle = () => `<figure class="diagram">
  <ol class="flow">
    <li><b><code>createState()</code></b><span>ສ້າງ object State</span></li>
    <li><b><code>initState()</code> — ຄັ້ງດຽວ</b><span>ຕັ້ງຄ່າເລີ່ມຕົ້ນ ສ້າງ controller · ຕ້ອງເອີ້ນ <code>super.initState()</code> ກ່ອນ</span></li>
    <li><b><code>build()</code></b><span>ວາດໜ້າຈໍ — ຖືກເອີ້ນຊ້ຳໄດ້ຫຼາຍເທື່ອ</span>
      <div class="branches"><div class="br ok"><b><code>setState(() { ... })</code></b><span>state ປ່ຽນ → ກັບໄປ build() ໃໝ່</span></div></div>
    </li>
    <li><b><code>dispose()</code> — ຄັ້ງດຽວ</b><span>ປິດໜ້າ: ຄືນ memory ຂອງ controller, ຍົກເລີກ subscription · ເອີ້ນ <code>super.dispose()</code> ທ້າຍສຸດ</span></li>
  </ol>
  <figcaption>Lifecycle ຂອງ StatefulWidget</figcaption>
</figure>`;

const flow = () => {
  const card = (cls, title, steps) =>
    `<div class="pf ${cls}"><h4>${title}</h4><ol class="chips">${steps.map((s) => `<li>${s}</li>`).join('')}</ol></div>`;
  return `<figure class="diagram">
  <div class="pflow">
    ${card('init', 'ເປີດແອັບ', ['<code>main()</code>', '<code>MultiProvider</code> ສ້າງ <code>StudentProvider</code>', '<code>loadStudents()</code>', 'ອ່ານ SharedPreferences (ບໍ່ມີ = ຂໍ້ມູນຕົວຢ່າງ 4 ຄົນ)', '<code>notifyListeners()</code>', 'ສະແດງລາຍການ'])}
    ${card('add', 'ເພີ່ມ (Create)', ['ກົດ +', '<code>push(StudentFormScreen())</code>', 'ປ້ອນຂໍ້ມູນ', '<code>validate()</code>', '<code>addStudent()</code>', '<code>_saveToPrefs()</code> + <code>notifyListeners()</code>', '<code>pop</code>'])}
    ${card('edit', 'ແກ້ໄຂ (Update)', ['⋮ > ແກ້ໄຂ', '<code>push(StudentFormScreen(student: s))</code>', 'ຟອມເຕີມຄ່າເດີມ (<code>initState</code>)', '<code>copyWith()</code>', '<code>updateStudent()</code>', '<code>pop</code>'])}
    ${card('del', 'ລຶບ (Delete)', ['ປັດບັດໄປຊ້າຍ', '<code>Dismissible.onDismissed</code>', '<code>onDelete()</code>', '<code>deleteStudent(id)</code>', 'ບັນທຶກ + ແຈ້ງເຕືອນ'])}
    ${card('find', 'ຄົ້ນຫາ / ກັ່ນຕອງ / ຈັດລຽງ (Read)', ['ພິມ / ກົດຊິບ / ເລືອກເມນູ', '<code>setSearchQuery</code> · <code>setMajorFilter</code> · <code>setSortBy</code>', '<code>notifyListeners()</code>', 'getter <code>students</code> ຄຳນວນໃໝ່'])}
  </div>
  <figcaption>ທຸກການປ່ຽນແປງຜ່ານ Provider — ໜ້າຈໍບໍ່ເຄີຍແກ້ຂໍ້ມູນເອງ</figcaption>
</figure>`;
};

const fbArch = () => `<figure class="diagram">
  <div class="lay">
    <div class="lay-box ui"><b>Flutter App</b><span>Android · iOS · Web — ໃຊ້ package <code>firebase_core</code>, <code>firebase_auth</code>, <code>cloud_firestore</code>, <code>firebase_storage</code></span></div>
    <div class="lay-arrow">ອິນເຕີເນັດ (HTTPS / WebSocket) ↕</div>
    <div class="fb-row">
      <div class="lay-box st"><b>Authentication</b><span>ສະໝັກ / ເຂົ້າສູ່ລະບົບ / UID</span></div>
      <div class="lay-box dt"><b>Cloud Firestore</b><span>Database NoSQL · Realtime</span></div>
      <div class="lay-box fs"><b>Storage</b><span>ໄຟລ໌: ຮູບ, ວິດີໂອ, PDF</span></div>
    </div>
    <div class="lay-arrow">ທຸກຄຳຂໍຜ່ານ Security Rules ↓</div>
    <div class="lay-box rules"><b>Security Rules</b><span>ກວດວ່າໃຜອ່ານ / ຂຽນ ຫຍັງໄດ້ (ເຊັ່ນ <code>request.auth != null</code>)</span></div>
  </div>
  <figcaption>Firebase = Backend as a Service (BaaS): ບໍ່ຕ້ອງຂຽນ server ເອງ</figcaption>
</figure>`;

const fbModel = () => `<figure class="diagram">
  <div class="fsm">
    <div class="fsm-col"><span class="fsm-tag">Collection</span><b>students</b></div>
    <div class="fsm-docs">
      <div class="fsm-doc"><span class="fsm-tag d">Document</span><b>Xk29aB…</b> <small>(Auto-ID)</small>
        <ul><li><code>name</code>: "ນາງ ອາລຸນຍາ ຈັນທາ" <i>String</i></li><li><code>gpa</code>: 3.85 <i>Number</i></li><li><code>year</code>: 4 <i>Number</i></li><li><code>createdAt</code>: 13/11/2026 <i>Timestamp</i></li></ul>
      </div>
      <div class="fsm-doc"><span class="fsm-tag d">Document</span><b>p8Qr1z…</b>
        <ul><li><code>name</code>: "ທ້າວ ອານົນ ແພ່ງຈາວ"</li><li>…</li></ul>
        <div class="fsm-sub"><span class="fsm-tag">Sub-collection</span><b>grades</b> → Document → Field</div>
      </div>
    </div>
  </div>
  <figcaption>Collection (ຄືໂຟນເດີ) → Document (ຄືໄຟລ໌ JSON ມີ ID) → Field (key: value) · Document ມີ Sub-collection ຊ້ອນໄດ້</figcaption>
</figure>`;

const fbAuthFlow = () => `<figure class="diagram">
  <ol class="flow">
    <li><b>ເປີດແອັບ → <code>AuthGate</code></b><span><code>StreamBuilder</code> ຟັງ <code>authStateChanges()</code></span></li>
    <li><b>Stream ສົ່ງຄ່າມາ</b><span>ແຍກຕາມ <code>snapshot</code>:</span>
      <div class="branches">
        <div class="br warn"><b><code>ConnectionState.waiting</code></b><span>ສະແດງ <code>CircularProgressIndicator</code></span></div>
        <div class="br err"><b><code>data == null</code> (ຍັງບໍ່ Login)</b><span>ສະແດງ <code>LoginScreen</code></span></div>
        <div class="br ok"><b><code>data</code> = User</b><span>ສະແດງ <code>StudentListScreen</code></span></div>
      </div>
    </li>
    <li><b>Login / Logout ສຳເລັດ</b><span>Firebase ສົ່ງຄ່າໃໝ່ຜ່ານ Stream → AuthGate ສະຫຼັບໜ້າເອງ <b>ບໍ່ຕ້ອງ Navigator</b></span></li>
  </ol>
  <figcaption>ສະຫຼັບໜ້າ Login ↔ ໜ້າຫຼັກ ຕາມສະຖານະ Authentication</figcaption>
</figure>`;

// ---------------------------------------------------------------- ຂໍ້ສອບລອງທຳ Flutter
// a = ດັດຊະນີຄຳຕອບທີ່ຖືກ (ເລີ່ມຈາກ 0) · ref = ຫົວຂໍ້ໃນບົດຮຽນ (ບໍ່ມີ '/' ນຳໜ້າ = ໜ້າ /flutter/)

const F = '/firebase/#';

export const MCQ = [
  { q: 'ຄຳສັ່ງໃດໃຊ້ສ້າງໂປຣເຈັກ Flutter ໃໝ່?', o: ['flutter create ຊື່ໂປຣເຈັກ', 'flutter new ຊື່ໂປຣເຈັກ', 'flutter init ຊື່ໂປຣເຈັກ', 'dart create app'], a: 0, e: 'flutter create student_app', ref: 'sec-5-1' },
  { q: 'ໄຟລ໌ pubspec.yaml ມີໜ້າທີ່ຫຼັກແມ່ນຫຍັງ?', o: ['ກຳນົດ dependencies, ເວີຊັນແອັບ ແລະ assets', 'ເກັບໂຄ້ດໜ້າຈໍຫຼັກ', 'ເກັບຂໍ້ມູນຜູ້ໃຊ້', 'ຕັ້ງຄ່າ Firebase'], a: 0, e: 'ເພີ່ມ package ດ້ວຍ flutter pub add ແລ້ວ flutter pub get', ref: 'sec-5-2' },
  { q: '"provider: ^6.1.5" ໃນ pubspec.yaml ໝາຍຄວາມວ່າແນວໃດ?', o: ['ເວີຊັນ 6.1.5 ຂຶ້ນໄປ ແຕ່ຕ່ຳກວ່າ 7.0.0', 'ເວີຊັນ 6.1.5 ເທົ່ານັ້ນ', 'ເວີຊັນໃດກໍໄດ້', 'ຕ່ຳກວ່າ 6.1.5'], a: 0, e: 'caret (^) = ອັບເດດໄດ້ແຕ່ບໍ່ຂ້າມເວີຊັນໃຫຍ່', ref: 'sec-5-2' },
  { q: 'ຟັງຊັນໃດເປັນຈຸດເລີ່ມຕົ້ນຂອງແອັບ Flutter?', o: ['main()', 'build()', 'initState()', 'runApp()'], a: 0, e: 'main() ເອີ້ນ runApp() ເພື່ອສະແດງ widget ທຳອິດ', ref: 'sec-8' },
  { q: 'ໃນ Dart "final" ຕ່າງຈາກ "const" ແນວໃດ?', o: ['final ກຳນົດຄ່າຄັ້ງດຽວຕອນ run · const ຄ່າຄົງທີ່ຮູ້ຕັ້ງແຕ່ compile', 'ຄືກັນທຸກຢ່າງ', 'final ປ່ຽນຄ່າໄດ້ · const ປ່ຽນບໍ່ໄດ້', 'const ໃຊ້ໄດ້ສະເພາະຕົວເລກ'], a: 0, e: 'const SizedBox(...) ຊ່ວຍໃຫ້ Flutter ບໍ່ສ້າງ widget ໃໝ່', ref: 'sec-3-1' },
  { q: 'ຕົວປ່ຽນທີ່ຂຶ້ນຕົ້ນດ້ວຍ _ (ເຊັ່ນ _students) ໃນ Dart ໝາຍເຖິງຫຍັງ?', o: ['private — ໃຊ້ໄດ້ສະເພາະໃນໄຟລ໌ນັ້ນ', 'ຄ່າຄົງທີ່', 'ຕົວປ່ຽນ static', 'ອາດເປັນ null'], a: 0, e: 'Dart ບໍ່ມີຄຳວ່າ private — ໃຊ້ _ ແທນ', ref: 'sec-3-1' },
  { q: 'map[\'name\'] ?? \'\' ໝາຍຄວາມວ່າແນວໃດ?', o: ['ຖ້າ map[\'name\'] ເປັນ null ໃຫ້ໃຊ້ \'\'', 'ກວດວ່າ name ເທົ່າກັບ \'\' ບໍ', 'ບັງຄັບວ່າບໍ່ແມ່ນ null', 'ລຶບ name'], a: 0, e: '?? = if-null operator', ref: 'sec-3-2' },
  { q: 'ສັນຍາລັກ ! ໃນ widget.student!.gender ມີຄວາມສ່ຽງຫຍັງ?', o: ['ຖ້າ student ເປັນ null ແອັບຈະ crash', 'ບໍ່ມີຄວາມສ່ຽງ', 'ເຮັດໃຫ້ຂໍ້ມູນຫາຍ', 'compile ບໍ່ຜ່ານ'], a: 0, e: '! = ຢືນຢັນວ່າບໍ່ແມ່ນ null — ໃຊ້ສະເພາະເມື່ອແນ່ໃຈ (ເຊັ່ນ ຫຼັງກວດ != null)', ref: 'sec-3-2' },
  { q: 'Future ແລະ Stream ຕ່າງກັນແນວໃດ?', o: ['Future ໃຫ້ຄ່າດຽວ · Stream ໃຫ້ຫຼາຍຄ່າຕໍ່ເນື່ອງ', 'Future ໄວກວ່າ Stream', 'Stream ໃຊ້ໄດ້ສະເພາະ Firebase', 'ຄືກັນ'], a: 0, e: 'Future → await / FutureBuilder · Stream → listen / StreamBuilder', ref: 'sec-3-6' },
  { q: 'StatefulWidget ຕ່າງຈາກ StatelessWidget ແນວໃດ?', o: ['StatefulWidget ມີ State ປ່ຽນໄດ້ ແລະ ເອີ້ນ setState() ເພື່ອ build ໃໝ່', 'StatelessWidget ໄວກວ່າສະເໝີ ຈຶ່ງບໍ່ມີ build()', 'StatefulWidget ໃຊ້ໄດ້ສະເພາະໜ້າຫຼັກ', 'ບໍ່ຕ່າງກັນ'], a: 0, e: 'ໃນແອັບນີ້ StudentFormScreen ເປັນ StatefulWidget', ref: 'sec-4-2' },
  { q: 'Lifecycle method ໃດຖືກເອີ້ນຄັ້ງດຽວຕອນ State ຖືກສ້າງ?', o: ['initState()', 'build()', 'dispose()', 'setState()'], a: 0, e: 'ໃຊ້ສ້າງ TextEditingController ແລະ ເຕີມຄ່າເລີ່ມຕົ້ນ', ref: 'sec-4-3' },
  { q: 'ເປັນຫຍັງຕ້ອງເອີ້ນ dispose() ຂອງ TextEditingController?', o: ['ກັນ Memory Leak', 'ລ້າງຂໍ້ຄວາມໃນຊ່ອງ', 'ບັນທຶກຂໍ້ມູນ', 'ປິດແປ້ນພິມ'], a: 0, e: 'ຖ້າບໍ່ dispose controller ຈະຄ້າງໃນ memory ຫຼັງປິດໜ້າ', ref: 'sec-10-3' },
  { q: 'Navigator.pop(context) ເຮັດຫຍັງ?', o: ['ປິດໜ້າເທິງສຸດ ກັບໄປໜ້າກ່ອນ', 'ເປີດໜ້າໃໝ່', 'ລຶບຂໍ້ມູນ', 'ປິດແອັບ'], a: 0, e: 'Navigator ເຮັດວຽກແບບ Stack: push = ວາງທັບ, pop = ເອົາອອກ', ref: 'sec-4-4' },
  { q: 'ໃນແອັບນີ້ Class ໃດເປັນ "Subject" ຂອງ Observer Pattern?', o: ['StudentProvider', 'StudentModel', 'StudentCard', 'MaterialApp'], a: 0, e: 'StudentProvider extends ChangeNotifier ແລະ ເອີ້ນ notifyListeners()', ref: 'sec-2-1' },
  { q: 'ຫຼັງແກ້ຂໍ້ມູນໃນ ChangeNotifier ຕ້ອງເອີ້ນ method ໃດເພື່ອໃຫ້ UI ອັບເດດ?', o: ['notifyListeners()', 'setState()', 'build()', 'refresh()'], a: 0, e: 'setState() ໃຊ້ໃນ StatefulWidget — ບໍ່ແມ່ນໃນ Provider', ref: 'sec-7-6' },
  { q: 'Widget ໃດໃຊ້ຟັງ Provider ແລ້ວ rebuild ສະເພາະສ່ວນທີ່ຫໍ່ໄວ້?', o: ['Consumer<T>', 'Container', 'Expanded', 'Padding'], a: 0, e: 'ແອັບນີ້ຫໍ່ສະເພາະ body ຂອງ Scaffold', ref: 'sec-9-2' },
  { q: 'Provider.of<StudentProvider>(context, listen: false) ໃຊ້ເມື່ອໃດ?', o: ['ເອີ້ນ method ໃນ event handler ໂດຍບໍ່ຕ້ອງ rebuild', 'ສະແດງຂໍ້ມູນໃນໜ້າຈໍ', 'ສ້າງ Provider ໃໝ່', 'ລຶບ Provider'], a: 0, e: 'ເຊັ່ນ ໃນ onSelected ຂອງເມນູຈັດລຽງ ແລະ ໃນ _saveForm()', ref: 'sec-9-1' },
  { q: 'ເປັນຫຍັງ MultiProvider ຈຶ່ງຢູ່ເທິງ MaterialApp ໃນ main.dart?', o: ['ໃຫ້ທຸກໜ້າ (ລວມທັງໜ້າທີ່ push) ເຂົ້າເຖິງ Provider ໄດ້', 'ໃຫ້ແອັບເປີດໄວຂຶ້ນ', 'ເພື່ອປ່ຽນ theme', 'ບັງຄັບຂອງ Flutter'], a: 0, e: 'Provider ຕ້ອງຢູ່ຊັ້ນເທິງຂອງທຸກ widget ທີ່ຈະໃຊ້ມັນ', ref: 'sec-8' },
  { q: 'shared_preferences ເກັບຂໍ້ມູນແບບໃດ?', o: ['Key-Value ໃນເຄື່ອງ', 'ຕາຕະລາງ SQL', 'Document ເທິງ Cloud', 'ໄຟລ໌ຮູບ'], a: 0, e: 'ແອັບນີ້ເກັບນັກສຶກສາທັງໝົດເປັນ JSON String ໃນ key ດຽວ', ref: 'sec-2-3' },
  { q: 'ເປີດແອັບຄັ້ງທຳອິດ (ຍັງບໍ່ມີຂໍ້ມູນໃນເຄື່ອງ) ຈະເກີດຫຍັງ?', o: ['ໃສ່ຂໍ້ມູນຕົວຢ່າງ 4 ຄົນ ແລ້ວບັນທຶກ', 'ແອັບ error', 'ໜ້າຈໍວ່າງ', 'ໂຫຼດຈາກ Firebase'], a: 0, e: 'getString() ຄືນ null → ໃຊ້ Initial Data', ref: 'sec-7-4' },
  { q: 'copyWith() ໃນ StudentModel ໃຊ້ເຮັດຫຍັງ?', o: ['ສ້າງ object ໃໝ່ທີ່ປ່ຽນບາງ field ຮັກສາ field ອື່ນ', 'ສຳເນົາໄຟລ໌', 'ບັນທຶກລົງເຄື່ອງ', 'ລຶບ field'], a: 0, e: 'ເພາະທຸກ field ເປັນ final (Immutable)', ref: 'sec-6-3' },
  { q: 'ໃນ getter students ເປັນຫຍັງໃຊ້ b.gpa.compareTo(a.gpa)?', o: ['ຈັດລຽງ GPA ຈາກຫຼາຍໄປໜ້ອຍ', 'ຈັດລຽງຈາກໜ້ອຍໄປຫຼາຍ', 'ກັ່ນຕອງ GPA', 'ລວມ GPA'], a: 0, e: 'a ກ່ອນ b = ໜ້ອຍ→ຫຼາຍ · b ກ່ອນ a = ຫຼາຍ→ໜ້ອຍ', ref: 'sec-7-3' },
  { q: 'validator ຂອງ TextFormField ຕ້ອງຄືນຄ່າຫຍັງ ເມື່ອຂໍ້ມູນຖືກຕ້ອງ?', o: ['null', 'true', 'ຂໍ້ຄວາມ "OK"', '0'], a: 0, e: 'ຄືນ String = ຂໍ້ຄວາມ error ທີ່ສະແດງໃຕ້ຊ່ອງ', ref: 'sec-10-5' },
  { q: 'Widget ໃດໃຊ້ປັດລາຍການເພື່ອລຶບ?', o: ['Dismissible', 'GestureDetector', 'Draggable', 'Slidable'], a: 0, e: 'ຕ້ອງມີ key ທີ່ບໍ່ຊ້ຳ · ໃຊ້ confirmDismiss ເພື່ອຖາມກ່ອນລຶບ', ref: 'sec-11-3' },
  { q: 'ເປັນຫຍັງ ListView.builder ໃນ Column ຕ້ອງຫໍ່ດ້ວຍ Expanded?', o: ['ListView ຕ້ອງຮູ້ຄວາມສູງ — Expanded ໃຫ້ໃຊ້ພື້ນທີ່ທີ່ເຫຼືອ', 'ເພື່ອໃຫ້ເລື່ອນໄວ', 'ເພື່ອໃສ່ສີ', 'ບໍ່ຈຳເປັນ'], a: 0, e: 'ບໍ່ຫໍ່ = error "Vertical viewport was given unbounded height"', ref: 'sec-9-3' },
  { q: 'ເປັນຫຍັງໃຊ້ double.tryParse ແທນ double.parse ໃນ validator?', o: ['tryParse ຄືນ null ເມື່ອຜິດ — ບໍ່ໂຍນ exception', 'tryParse ໄວກວ່າ', 'parse ໃຊ້ບໍ່ໄດ້ໃນ Flutter', 'tryParse ປ່ຽນຈຸດເປັນຈຸດ'], a: 0, e: 'ໂຄ້ດໃນສະໄລໃຊ້ parse ຫຼັງ validator ທີ່ກວດແຕ່ຊ່ອງວ່າງ — ປ້ອນ "abc" ຈຶ່ງ error', ref: 'sec-13-1' },
  { q: 'Hot Reload ຕ່າງຈາກ Hot Restart ແນວໃດ?', o: ['Hot Reload ຮັກສາ state · Hot Restart ເລີ່ມແອັບໃໝ່', 'ຄືກັນ', 'Hot Restart ໄວກວ່າ', 'Hot Reload ຕ້ອງ build ໃໝ່ທັງໝົດ'], a: 0, e: 'ກົດ r = Hot Reload · R = Hot Restart', ref: 'sec-5-1' },
  { q: 'ເປັນຫຍັງຕ້ອງເອີ້ນ WidgetsFlutterBinding.ensureInitialized() ກ່ອນ Firebase.initializeApp()?', o: ['ໃຫ້ Flutter engine ພ້ອມກ່ອນໃຊ້ Platform Channel', 'ເພື່ອ Login ອັດຕະໂນມັດ', 'ເພື່ອໂຫຼດຟອນ', 'ເພື່ອສ້າງ firebase_options.dart'], a: 0, e: 'Firebase ຕິດຕໍ່ກັບ native SDK ຜ່ານ Platform Channel', ref: F + 'sec-2-5' },
  { q: 'ເຄື່ອງມືໃດສ້າງໄຟລ໌ firebase_options.dart?', o: ['FlutterFire CLI (flutterfire configure)', 'flutter create', 'Android Studio', 'npm install firebase'], a: 0, e: 'ຕ້ອງ dart pub global activate flutterfire_cli ກ່ອນ', ref: F + 'sec-2-2' },
  { q: 'ຄຳສັ່ງໃດສ້າງຜູ້ໃຊ້ໃໝ່ດ້ວຍ Email/Password?', o: ['createUserWithEmailAndPassword()', 'signInWithEmailAndPassword()', 'registerUser()', 'addUser()'], a: 0, e: 'ສະໝັກແລ້ວ ເອີ້ນ user.sendEmailVerification() ສົ່ງອີເມວຢືນຢັນ', ref: F + 'sec-3-1' },
  { q: 'Stream ໃດໃຊ້ຕິດຕາມສະຖານະ Login/Logout ແບບ Realtime?', o: ['authStateChanges()', 'currentUser', 'signOut()', 'idToken()'], a: 0, e: 'ໃຊ້ຄູ່ກັບ StreamBuilder ເພື່ອສະຫຼັບໜ້າ Login / ໜ້າຫຼັກ', ref: F + 'sec-3-4' },
  { q: 'Cloud Firestore ເກັບຂໍ້ມູນເປັນໂຄງສ້າງແບບໃດ?', o: ['Collection → Document → Field (NoSQL)', 'Table → Row → Column', 'Folder → File', 'Key → Value ຢ່າງດຽວ'], a: 0, e: 'Document ມີ Sub-collection ຊ້ອນໄດ້', ref: F + 'sec-4-1' },
  { q: '.add() ຕ່າງຈາກ .doc(id).set() ແນວໃດ?', o: ['.add() ສຸ່ມ Document ID ໃຫ້ · .doc(id).set() ກຳນົດ ID ເອງ', '.add() ແກ້ຂໍ້ມູນ · .set() ເພີ່ມ', 'ຄືກັນ', '.add() ໃຊ້ໄດ້ສະເພາະ Sub-collection'], a: 0, e: 'ເຊັ່ນ ໃຊ້ UID ເປັນ Document ID: .collection(\'users\').doc(uid).set({...})', ref: F + 'sec-4-3' },
  { q: '.update() ໃສ່ Document ທີ່ບໍ່ມີຢູ່ ຈະເກີດຫຍັງ?', o: ['ເກີດ Error (not-found)', 'ສ້າງ Document ໃໝ່', 'ບໍ່ມີຫຍັງເກີດຂຶ້ນ', 'ລຶບ Collection'], a: 0, e: 'ຢາກສ້າງຖ້າບໍ່ມີ ໃຊ້ .set(data, SetOptions(merge: true))', ref: F + 'sec-4-5' },
  { q: 'ດຶງຂໍ້ມູນແບບ Realtime ຕ້ອງໃຊ້ method ໃດ?', o: ['.snapshots()', '.get()', '.fetch()', '.listen()'], a: 0, e: '.get() = ດຶງຄັ້ງດຽວ (Future)', ref: F + 'sec-4-4' },
  { q: 'ຄຳສັ່ງໃດໃຊ້ເວລາຈາກ Server ຂອງ Firestore?', o: ['FieldValue.serverTimestamp()', 'DateTime.now()', 'Timestamp.now()', 'Server.time()'], a: 0, e: 'DateTime.now() ໃຊ້ເວລາເຄື່ອງຜູ້ໃຊ້ ທີ່ອາດຕັ້ງຜິດ', ref: F + 'sec-4-5' },
  { q: 'Query ທີ່ໃຊ້ .where() ກັບ field ໜຶ່ງ ແລະ .orderBy() ອີກ field ໜຶ່ງ ຕ້ອງມີຫຍັງ?', o: ['Composite Index', 'Security Rules ພິເສດ', 'Sub-collection', 'Storage'], a: 0, e: 'Firestore ຈະແຈ້ງ error ພ້ອມລິ້ງສ້າງ index ໃນ Console', ref: F + 'sec-4-7' },
  { q: 'allow read, write: if request.auth != null; ໝາຍຄວາມວ່າແນວໃດ?', o: ['ອ່ານ/ຂຽນໄດ້ ສະເພາະຜູ້ທີ່ Login ແລ້ວ', 'ທຸກຄົນອ່ານ/ຂຽນໄດ້', 'ບໍ່ມີໃຜອ່ານ/ຂຽນໄດ້', 'ສະເພາະ admin'], a: 0, e: 'request.auth = ຂໍ້ມູນຜູ້ໃຊ້ທີ່ສົ່ງຄຳຂໍມາ (null = ບໍ່ໄດ້ Login)', ref: F + 'sec-4-8' },
  { q: 'Firebase Storage ເໝາະກັບເກັບຫຍັງ?', o: ['ໄຟລ໌ ເຊັ່ນ ຮູບ ວິດີໂອ ສຽງ', 'ຂໍ້ມູນນັກສຶກສາເປັນ field', 'ລະຫັດຜ່ານ', 'Security Rules'], a: 0, e: 'ເກັບ URL ຂອງໄຟລ໌ໄວ້ໃນ Firestore ອີກທີ', ref: F + 'sec-6' },
  { q: 'Method ໃດໃຊ້ຂໍ URL ຂອງໄຟລ໌ໃນ Storage ເພື່ອສະແດງຮູບ?', o: ['getDownloadURL()', 'getUrl()', 'download()', 'putFile()'], a: 0, e: 'ແລ້ວໃຊ້ Image.network(url)', ref: F + 'sec-6' },
  { q: 'ໃນ StreamBuilder ຈະກວດວ່າ "ກຳລັງລໍຂໍ້ມູນ" ແນວໃດ?', o: ['snapshot.connectionState == ConnectionState.waiting', 'snapshot.hasData == false', 'snapshot.data == 0', 'snapshot.isLoading'], a: 0, e: 'ຂໍ້ມູນຈິງຢູ່ snapshot.data · error ຢູ່ snapshot.error', ref: F + 'sec-5' },
];

const code = (s) => `<pre class="mq-code"><code>${esc(s)}</code></pre>`;

export const CODEQ = [
  {
    qHtml: `ໂຄ້ດນີ້ຈະສະແດງຫຍັງ?${code("final list = [3.85, 3.25, 2.90];\nlist.sort((a, b) => b.compareTo(a));\nprint(list.first);")}`,
    o: ['3.85', '2.90', '3.25', 'Error'], a: 0, e: 'b.compareTo(a) = ຫຼາຍ→ໜ້ອຍ · first = ໂຕທຳອິດ', ref: 'sec-7-3',
  },
  {
    qHtml: `ຜົນຂອງ <code>averageGpa</code> ເມື່ອ <code>_students</code> ວ່າງ?${code("double get averageGpa {\n  if (_students.isEmpty) return 0.0;\n  double total = _students.fold(0, (sum, s) => sum + s.gpa);\n  return total / _students.length;\n}")}`,
    o: ['0.0', 'NaN', 'Error ຫານດ້ວຍ 0', 'null'], a: 0, e: 'ກວດ isEmpty ກ່ອນ ເພື່ອກັນການຫານດ້ວຍ 0', ref: 'sec-7-2',
  },
  {
    qHtml: `ຖ້າ <code>map['gpa']</code> ເປັນ <code>3</code> (int) ຈະໄດ້ຄ່າໃດ?${code("gpa: (map['gpa'] as num?)?.toDouble() ?? 0.0,")}`,
    o: ['3.0', '3', '0.0', 'Error'], a: 0, e: 'num ຮັບທັງ int ແລະ double · toDouble() ແປງເປັນ 3.0', ref: 'sec-6-4',
  },
  {
    qHtml: `ນັກສຶກສາ GPA <code>3.0</code> ຈະໄດ້ເກຣດໃດ?${code("String get gradeLetter {\n  if (gpa >= 3.5) return 'A';\n  if (gpa >= 3.0) return 'B';\n  if (gpa >= 2.0) return 'C';\n  return 'D';\n}")}`,
    o: ['B', 'A', 'C', 'D'], a: 0, e: '3.0 >= 3.0 ເປັນ true ຈຶ່ງ return \'B\'', ref: 'sec-6-2',
  },
  {
    qHtml: `ໂຄ້ດນີ້ຂາດຫຍັງ ທີ່ເຮັດໃຫ້ UI ບໍ່ອັບເດດ?${code("void setSortBy(SortOption sort) {\n  _sortBy = sort;\n}")}`,
    o: ['notifyListeners()', 'setState()', 'await', 'return'], a: 0, e: 'ChangeNotifier ຕ້ອງເອີ້ນ notifyListeners() ຫຼັງແກ້ state', ref: 'sec-7-6',
  },
  {
    qHtml: `ຖ້າ <code>widget.student</code> ເປັນ <code>null</code> ຊ່ອງນີ້ຈະມີຂໍ້ຄວາມຫຍັງ?${code("_gpaController = TextEditingController(\n  text: widget.student?.gpa.toString() ?? '3.50');")}`,
    o: ['3.50', 'null', 'ວ່າງ', 'Error'], a: 0, e: '?. ໄດ້ null → ?? ໃຊ້ \'3.50\'', ref: 'sec-10-2',
  },
  {
    qHtml: `ປ້ອນອາຍຸ <code>abc</code> ແລ້ວກົດບັນທຶກ ຈະເກີດຫຍັງ?${code("validator: (val) => val == null || val.trim().isEmpty ? 'ກະລຸນາປ້ອນອາຍຸ' : null,\n// ...\nfinal age = int.parse(_ageController.text.trim());")}`,
    o: ['ຜ່ານ validator ແຕ່ int.parse ໂຍນ FormatException', 'ສະແດງ "ກະລຸນາປ້ອນອາຍຸ"', 'ບັນທຶກອາຍຸ 0', 'ບັນທຶກອາຍຸ abc'], a: 0, e: 'validator ກວດແຕ່ວ່າງ — ຄວນໃຊ້ int.tryParse ກວດ', ref: 'sec-13-1',
  },
  {
    qHtml: `ໂຄ້ດນີ້ເຮັດຫຍັງ?${code("StreamBuilder<QuerySnapshot>(\n  stream: FirebaseFirestore.instance.collection('products').snapshots(),\n  builder: (context, snapshot) {\n    if (snapshot.hasError) return Text('Something went wrong');\n    if (snapshot.connectionState == ConnectionState.waiting) {\n      return CircularProgressIndicator();\n    }\n    final data = snapshot.data!.docs;\n    return ListView.builder(\n      itemCount: data.length,\n      itemBuilder: (context, i) => ListTile(title: Text(data[i]['name'])),\n    );\n  },\n)")}`,
    o: ['ສະແດງລາຍຊື່ສິນຄ້າຈາກ Firestore ແບບ Realtime', 'ດຶງສິນຄ້າຄັ້ງດຽວ', 'ເພີ່ມສິນຄ້າ', 'ລຶບສິນຄ້າ'], a: 0, e: '.snapshots() + StreamBuilder = ອັບເດດທັນທີເມື່ອຂໍ້ມູນປ່ຽນ', ref: '/flutter-qa/#q-43',
  },
  {
    qHtml: `ຖ້າ Document <code>docId</code> ບໍ່ມີຢູ່ ຜົນຈະເປັນແນວໃດ?${code("try {\n  await FirebaseFirestore.instance.collection('users')\n      .doc(docId).update({'age': newAge});\n  print('Updated successfully');\n} catch (e) {\n  print('Error updating: $e');\n}")}`,
    o: ['ພິມ "Error updating: ..." ເພາະ update ຕ້ອງມີ Document', 'ພິມ "Updated successfully"', 'ສ້າງ Document ໃໝ່', 'ແອັບ crash'], a: 0, e: 'update() ໂຍນ not-found → ເຂົ້າ catch', ref: '/flutter-qa/#q-47',
  },
  {
    qHtml: `Query ນີ້ດຶງຂໍ້ມູນຫຍັງ?${code(".collection('orders')\n.where('status', isEqualTo: 'pending')\n.orderBy('created_at', descending: true)\n.limit(10)\n.get();")}`,
    o: ['10 ອໍເດີ pending ທີ່ໃໝ່ທີ່ສຸດ ດຶງຄັ້ງດຽວ', '10 ອໍເດີທຳອິດທັງໝົດ', 'ອໍເດີ pending ທັງໝົດແບບ Realtime', 'ອໍເດີ pending ເກົ່າສຸດ 10 ລາຍການ'], a: 0, e: 'descending: true = ໃໝ່→ເກົ່າ · .get() = ຄັ້ງດຽວ', ref: '/flutter-qa/#q-50',
  },
];

export const WRITTEN = [
  { q: 'ອະທິບາຍ Observer Pattern ແລະ ບອກວ່າໃນແອັບນັກສຶກສາ ແຕ່ລະບົດບາດແມ່ນ class / method ໃດ', a: ['Observer = Subject 1 ຕົວ ແຈ້ງເຕືອນ Observer ຫຼາຍຕົວເມື່ອຂໍ້ມູນປ່ຽນ', 'Subject = StudentProvider (extends ChangeNotifier)', 'ແຈ້ງເຕືອນ = notifyListeners()', 'ລົງທະບຽນ = ChangeNotifierProvider ໃນ main.dart', 'Observer = Consumer<StudentProvider> ໃນໜ້າລາຍການ'], ref: 'sec-2-1' },
  { q: 'ອະທິບາຍໂຄງສ້າງ Folder ຂອງແອັບ (models, providers, screens, widgets) ແລະ ຫຼັກ Separation of Concerns', a: ['models = ໂຄງສ້າງຂໍ້ມູນ (StudentModel)', 'providers = State + Logic + ບັນທຶກຂໍ້ມູນ', 'screens = ໜ້າຈໍເຕັມ (ລາຍການ, ຟອມ)', 'widgets = ຊິ້ນສ່ວນ UI ນຳໃຊ້ຄືນ', 'ແຍກໜ້າທີ່ → ແກ້ສ່ວນໜຶ່ງບໍ່ກະທົບສ່ວນອື່ນ ອ່ານ/ທົດສອບງ່າຍ'], ref: 'sec-2-2' },
  { q: 'ອະທິບາຍຂັ້ນຕອນທີ່ loadStudents() ອ່ານຂໍ້ມູນ ແລະ _saveToPrefs() ບັນທຶກຂໍ້ມູນ', a: ['SharedPreferences.getInstance() → getString(key)', 'ມີຂໍ້ມູນ: json.decode → map(fromMap) → List', 'ບໍ່ມີ (null): ໃຊ້ຂໍ້ມູນຕົວຢ່າງ 4 ຄົນ ແລ້ວບັນທຶກ', 'ບັນທຶກ: map(toMap) → json.encode → setString', 'ຈົບດ້ວຍ notifyListeners() · ຫໍ່ try-catch'], ref: 'sec-7-4' },
  { q: 'ໜ້າ StudentFormScreen ໃຊ້ສຳລັບທັງ "ເພີ່ມ" ແລະ "ແກ້ໄຂ" ໄດ້ແນວໃດ?', a: ['ຮັບ StudentModel? student (ອາດເປັນ null)', 'null = ໂໝດເພີ່ມ · ມີຄ່າ = ໂໝດແກ້ໄຂ', 'initState ເຕີມຄ່າເດີມ ດ້ວຍ widget.student?.x ?? ຄ່າເລີ່ມຕົ້ນ', '_saveForm: null → addStudent (id ໃໝ່ຈາກເວລາ) · ບໍ່ null → updateStudent(copyWith)', 'ຫົວຂໍ້ AppBar ປ່ຽນຕາມ isEditing'], ref: 'sec-10' },
  { q: 'ຊີ້ບັນຫາ 3 ຂໍ້ໃນໂຄ້ດສະໄລ ແລະ ວິທີແກ້', a: ['ປ້ອນຕົວເລກຜິດ → parse error: ໃຊ້ tryParse ໃນ validator + ກວດຂອບເຂດ', 'ປັດລຶບທັນທີ: ເພີ່ມ confirmDismiss + SnackBar Undo', 'getter students ຄຳນວນຊ້ຳ: ເກັບໃສ່ຕົວປ່ຽນຄັ້ງດຽວ', '(ອື່ນໆ) ຈັດລຽງຊື່ລາວ, ບໍ່ມີຊ່ອງອີເມວ, ລາຍຊື່ສາຂາຊ້ຳ 2 ໄຟລ໌, API deprecated'], ref: 'sec-13' },
  { q: 'ຂຽນ Function Sign In ດ້ວຍ Email & Password ພ້ອມ try-catch', a: ['Future<void> signIn(String email, String password) async { ... }', 'await FirebaseAuth.instance.signInWithEmailAndPassword(email: email, password: password)', 'on FirebaseAuthException catch (e) → ແຈ້ງ e.message / e.code', 'catch (e) → error ອື່ນ'], ref: '/flutter-qa/#q-49' },
  { q: 'ອະທິບາຍວ່າຈະປ່ຽນແອັບນັກສຶກສາຈາກ SharedPreferences ເປັນ Cloud Firestore ແນວໃດ', a: ['ຕັ້ງຄ່າ Firebase: flutterfire configure + Firebase.initializeApp ໃນ main', 'ແກ້ແຕ່ StudentProvider (ຊື່ method ຄືເກົ່າ) — UI ບໍ່ຕ້ອງແກ້', 'Read: collection(\'students\').snapshots().listen → fromMap({...doc.data(), \'id\': doc.id})', 'Create .add() · Update .doc(id).update() · Delete .doc(id).delete()', 'ຕັ້ງ Security Rules + Login ກ່ອນເຂົ້າເຖິງຂໍ້ມູນ'], ref: F + 'sec-7' },
  { q: 'ທຽບ FutureBuilder ກັບ StreamBuilder ແລະ ບອກ property ສຳຄັນຂອງ AsyncSnapshot', a: ['FutureBuilder = Future ຄ່າດຽວ (ເຊັ່ນ .get())', 'StreamBuilder = Stream ຫຼາຍຄ່າ rebuild ທຸກຄັ້ງທີ່ມີຂໍ້ມູນໃໝ່ (ເຊັ່ນ .snapshots(), authStateChanges())', 'connectionState == waiting → ສະແດງ loading', 'hasError / error → ສະແດງ error + ປຸ່ມລອງໃໝ່', 'hasData / data → ຂໍ້ມູນຈິງ'], ref: F + 'sec-5' },
];

const exam = makeExam({ key: 'flmock', lesson: '/flutter/' });
export const TOTAL_AUTO = MCQ.length + CODEQ.length;

// ---------------------------------------------------------------- include → HTML

export function flutterInclude(name) {
  switch (name) {
    case 'fl-shots': return shots();
    case 'fl-observer': return observer();
    case 'fl-layers': return layers();
    case 'fl-lifecycle': return lifecycle();
    case 'fl-flow': return flow();
    case 'fb-arch': return fbArch();
    case 'fb-model': return fbModel();
    case 'fb-auth-flow': return fbAuthFlow();
    case 'fl-mock-score': return exam.score(TOTAL_AUTO);
    case 'fl-mock-mcq': return exam.list(MCQ, 'A');
    case 'fl-mock-code': return exam.list(CODEQ, 'B', (m) => m.qHtml);
    case 'fl-mock-written': return exam.written(WRITTEN);
    case 'fl-mock-result': return exam.result();
    default: return null;
  }
}
