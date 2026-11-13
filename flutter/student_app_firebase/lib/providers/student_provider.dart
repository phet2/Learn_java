import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../constants/majors.dart';
import '../models/student_model.dart';

enum SortOption { name, gpa }

/// ເວີຊັນ Firebase ຂອງ StudentProvider — ຊື່ method ແລະ getter ຄືເກົ່າທຸກອັນ
/// ໜ້າຈໍ ແລະ widget ຈຶ່ງບໍ່ຕ້ອງແກ້ ປ່ຽນແຕ່ "ບ່ອນເກັບຂໍ້ມູນ":
///   SharedPreferences (ໃນເຄື່ອງ)  →  Cloud Firestore (ເທິງ Cloud, Realtime)
class StudentProvider extends ChangeNotifier {
  final CollectionReference<Map<String, dynamic>> _col =
      FirebaseFirestore.instance.collection('students');

  List<StudentModel> _students = [];
  String _searchQuery = '';
  String _selectedMajorFilter = kAllMajors;
  SortOption _sortBy = SortOption.name;
  bool _isLoading = true;
  String? _error;

  StreamSubscription<User?>? _authSub;
  StreamSubscription<QuerySnapshot<Map<String, dynamic>>>? _studentsSub;

  StudentProvider() {
    // ເລີ່ມຟັງຂໍ້ມູນເມື່ອ Login · ຢຸດຟັງ ແລະ ລ້າງຂໍ້ມູນເມື່ອ Logout
    _authSub = FirebaseAuth.instance.authStateChanges().listen((user) {
      _studentsSub?.cancel();
      _studentsSub = null;
      if (user == null) {
        _students = [];
        _isLoading = false;
        notifyListeners();
      } else {
        _listenStudents();
      }
    });
  }

  void _listenStudents() {
    _isLoading = true;
    _error = null;
    notifyListeners();
    // .snapshots() = Realtime: ທຸກຄັ້ງທີ່ຂໍ້ມູນໃນ Firestore ປ່ຽນ (ຈາກເຄື່ອງໃດກໍໄດ້) ຈະສົ່ງ QuerySnapshot ໃໝ່ມາ
    _studentsSub = _col.snapshots().listen(
      (snapshot) {
        _students = snapshot.docs
            .map((doc) => StudentModel.fromMap({...doc.data(), 'id': doc.id}))
            .toList();
        _isLoading = false;
        notifyListeners();
      },
      onError: (Object e) {
        _error = 'ໂຫຼດຂໍ້ມູນບໍ່ສຳເລັດ: $e';
        _isLoading = false;
        notifyListeners();
      },
    );
  }

  bool get isLoading => _isLoading;
  String? get error => _error;
  String get selectedMajorFilter => _selectedMajorFilter;
  SortOption get sortBy => _sortBy;

  int get totalStudents => _students.length;

  double get averageGpa {
    if (_students.isEmpty) return 0.0;
    double total = _students.fold(0, (acc, s) => acc + s.gpa);
    return total / _students.length;
  }

  int get honorStudents => _students.where((s) => s.gpa >= 3.5).length;

  List<StudentModel> get students {
    List<StudentModel> list = List.from(_students);

    if (_selectedMajorFilter != kAllMajors) {
      list = list.where((s) => s.major == _selectedMajorFilter).toList();
    }

    if (_searchQuery.trim().isNotEmpty) {
      final query = _searchQuery.toLowerCase().trim();
      list = list.where((s) {
        return s.name.toLowerCase().contains(query) ||
            s.major.toLowerCase().contains(query) ||
            s.classroom.toLowerCase().contains(query);
      }).toList();
    }

    if (_sortBy == SortOption.name) {
      list.sort((a, b) => _laoSortKey(a.name).compareTo(_laoSortKey(b.name)));
    } else {
      list.sort((a, b) => b.gpa.compareTo(a.gpa));
    }

    return list;
  }

  // ຕັດຄຳນຳໜ້າ (ທ້າວ/ນາງ) ແລະ ຍ້າຍສະຫຼະໜ້າ (ເ ແ ໂ ໃ ໄ) ໄປຫຼັງພະຍັນຊະນະ
  static String _laoSortKey(String name) => name
      .replaceFirst(RegExp(r'^(ທ້າວ|ນາງ)\s*'), '')
      .replaceAllMapped(RegExp(r'([ເແໂໃໄ])([ກ-ຮໜໝ])'), (m) => '${m[2]}${m[1]}');

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setMajorFilter(String major) {
    _selectedMajorFilter = major;
    notifyListeners();
  }

  void setSortBy(SortOption sort) {
    _sortBy = sort;
    notifyListeners();
  }

  /// ຂໍ້ມູນທີ່ຈະບັນທຶກລົງ Firestore (ບໍ່ເກັບ id ໃນ field ເພາະ id ຄື Document ID ຢູ່ແລ້ວ)
  Map<String, dynamic> _toFirestore(StudentModel s) => s.toMap()..remove('id');

  // CREATE — .add() ໃຫ້ Firestore ສຸ່ມ Document ID ໃຫ້ (Auto-ID)
  Future<void> addStudent(StudentModel student) => _write(() => _col.add({
        ..._toFirestore(student),
        'createdAt': FieldValue.serverTimestamp(),
      }));

  // UPDATE — .update() ແກ້ສະເພາະ field ທີ່ສົ່ງໄປ (Document ຕ້ອງມີຢູ່ແລ້ວ)
  Future<void> updateStudent(StudentModel updatedStudent) => _write(() => _col.doc(updatedStudent.id).update({
        ..._toFirestore(updatedStudent),
        'updatedAt': FieldValue.serverTimestamp(),
      }));

  // DELETE — ລຶບທັງ Document
  Future<void> deleteStudent(String id) => _write(() => _col.doc(id).delete());

  // ບໍ່ຕ້ອງເອີ້ນ notifyListeners() ຫຼັງຂຽນ: listener ຂອງ .snapshots() ຈະໄດ້ຂໍ້ມູນໃໝ່ເອງ
  Future<void> _write(Future<Object?> Function() action) async {
    try {
      await action();
    } on FirebaseException catch (e) {
      _error = 'ບັນທຶກບໍ່ສຳເລັດ: ${e.message ?? e.code}';
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _studentsSub?.cancel();
    _authSub?.cancel();
    super.dispose();
  }
}
