import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/student_model.dart';

enum SortOption { name, gpa }

class StudentProvider extends ChangeNotifier {
  List<StudentModel> _students = [];
  String _searchQuery = '';
  String _selectedMajorFilter = 'ທັງໝົດ';
  SortOption _sortBy = SortOption.name;
  static const String _storageKey = 'soutsaka_students_key_v1';

  StudentProvider() {
    loadStudents();
  }

  String get selectedMajorFilter => _selectedMajorFilter;
  SortOption get sortBy => _sortBy;

  int get totalStudents => _students.length;

  double get averageGpa {
    if (_students.isEmpty) return 0.0;
    double total = _students.fold(0, (sum, s) => sum + s.gpa);
    return total / _students.length;
  }

  int get honorStudents => _students.where((s) => s.gpa >= 3.5).length;

  List<StudentModel> get students {
    List<StudentModel> list = List.from(_students);

    if (_selectedMajorFilter != 'ທັງໝົດ') {
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
      list.sort((a, b) => a.name.compareTo(b.name));
    } else {
      list.sort((a, b) => b.gpa.compareTo(a.gpa));
    }

    return list;
  }

  Future<void> loadStudents() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final String? dataString = prefs.getString(_storageKey);

      if (dataString != null) {
        final List<dynamic> jsonList = json.decode(dataString);
        _students = jsonList.map((item) => StudentModel.fromMap(item)).toList();
      } else {
        // Initial Data ສະຖາບັນ ເຕັກໂນໂລຊີ ສຸດສະກະ
        _students = [
          StudentModel(
            id: '1',
            name: 'ນາງ ອາລຸນຍາ ຈັນທາ',
            age: 20,
            gender: 'ຍິງ',
            major: 'ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ',
            gpa: 3.85,
            classroom: 'BCSP7A-AM',
            year: 4,
            phone: '020-5511-2233',
            email: 'alunya@soutsaka.edu.la',
          ),
          StudentModel(
            id: '2',
            name: 'ທ້າວ ອານົນ ແພ່ງຈາວ',
            age: 21,
            gender: 'ຊາຍ',
            major: 'ບໍລິຫານທຸລະກິດ',
            gpa: 3.25,
            classroom: 'BCSP7A-AM',
            year: 4,
            phone: '020-9988-7766',
            email: 'arnon@soutsaka.edu.la',
          ),
          StudentModel(
            id: '3',
            name: 'ທ້າວ ເຈມສ໌ ວົງສະຫວັນ',
            age: 21,
            gender: 'ຊາຍ',
            major: 'ບໍລິຫານທຸລະກິດ',
            gpa: 3.00,
            classroom: 'BCSP7A-AM',
            year: 4,
            phone: '020-7766-5544',
            email: 'james@soutsaka.edu.la',
          ),
          StudentModel(
            id: '4',
            name: 'ທ້າວ ນິກ ນາມວົງ',
            age: 22,
            gender: 'ຊາຍ',
            major: 'ວິທະຍາສາດຄອມພິວເຕີ',
            gpa: 2.90,
            classroom: 'BCSP7A-AM',
            year: 4,
            phone: '020-2233-4455',
            email: 'nick@soutsaka.edu.la',
          ),
        ];
        _saveToPrefs();
      }
      notifyListeners();
    } catch (e) {
      debugPrint("Error loading students: $e");
    }
  }

  Future<void> _saveToPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_storageKey, json.encode(_students.map((s) => s.toMap()).toList()));
    } catch (e) {
      debugPrint("Error saving students: $e");
    }
  }

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

  void addStudent(StudentModel student) {
    _students.add(student);
    _saveToPrefs();
    notifyListeners();
  }

  void updateStudent(StudentModel updatedStudent) {
    final index = _students.indexWhere((s) => s.id == updatedStudent.id);
    if (index != -1) {
      _students[index] = updatedStudent;
      _saveToPrefs();
      notifyListeners();
    }
  }

  void deleteStudent(String id) {
    _students.removeWhere((s) => s.id == id);
    _saveToPrefs();
    notifyListeners();
  }
}
