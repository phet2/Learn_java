import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/student_model.dart';
import '../providers/student_provider.dart';
import '../constants/majors.dart';

class StudentFormScreen extends StatefulWidget {
  final StudentModel? student;

  const StudentFormScreen({super.key, this.student});

  @override
  State<StudentFormScreen> createState() => _StudentFormScreenState();
}

class _StudentFormScreenState extends State<StudentFormScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _ageController;
  late TextEditingController _gpaController;
  late TextEditingController _classroomController;
  late TextEditingController _yearController;
  late TextEditingController _phoneController;
  late TextEditingController _emailController;

  String _selectedGender = 'ຊາຍ';
  String _selectedMajor = kMajors.first;

  final List<String> _genders = ['ຊາຍ', 'ຍິງ'];

  final List<String> _majors = kMajors;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.student?.name ?? '');
    _ageController = TextEditingController(text: widget.student?.age.toString() ?? '');
    _gpaController = TextEditingController(text: widget.student?.gpa.toString() ?? '3.50');
    _classroomController = TextEditingController(text: widget.student?.classroom ?? 'BCSP7A-AM');
    _yearController = TextEditingController(text: widget.student?.year.toString() ?? '4');
    _phoneController = TextEditingController(text: widget.student?.phone ?? '020-5555-8888');
    _emailController = TextEditingController(text: widget.student?.email ?? '');

    // ກວດສອບຄວາມປອດໄພຂອງຄ່າ Gender
    if (widget.student != null) {
      if (_genders.contains(widget.student!.gender)) {
        _selectedGender = widget.student!.gender;
      } else {
        _selectedGender = _genders.first;
      }

      // Safety Check ປ້ອງກັນ Assertion Error ຂອງ Dropdown
      if (_majors.contains(widget.student!.major)) {
        _selectedMajor = widget.student!.major;
      } else {
        _selectedMajor = _majors.first;
      }
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    _gpaController.dispose();
    _classroomController.dispose();
    _yearController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void _saveForm() {
    if (_formKey.currentState!.validate()) {
      final provider = Provider.of<StudentProvider>(context, listen: false);
      final age = int.parse(_ageController.text.trim());
      final gpa = double.parse(_gpaController.text.trim().replaceAll(',', '.'));
      final year = int.parse(_yearController.text.trim());

      if (widget.student == null) {
        provider.addStudent(
          StudentModel(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            name: _nameController.text.trim(),
            age: age,
            gender: _selectedGender,
            major: _selectedMajor,
            gpa: gpa,
            classroom: _classroomController.text.trim(),
            year: year,
            phone: _phoneController.text.trim(),
            email: _emailController.text.trim(),
          ),
        );
      } else {
        provider.updateStudent(
          widget.student!.copyWith(
            name: _nameController.text.trim(),
            age: age,
            gender: _selectedGender,
            major: _selectedMajor,
            gpa: gpa,
            classroom: _classroomController.text.trim(),
            year: year,
            phone: _phoneController.text.trim(),
            email: _emailController.text.trim(),
          ),
        );
      }
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.student != null;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(isEditing ? 'ແກ້ໄຂຂໍ້ມູນນັກສຶກສາ' : 'ເພີ່ມຂໍ້ມູນນັກສຶກສາ'),
        backgroundColor: const Color(0xFF0052D4),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'ຊື່ ແລະ ນາມສະກຸນ',
                  border: UnderlineInputBorder(),
                ),
                validator: (val) => val == null || val.trim().isEmpty ? 'ກະລຸນາປ້ອນຊື່' : null,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _ageController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'ອາຍຸ',
                        border: UnderlineInputBorder(),
                      ),
                      validator: (val) {
                        final n = int.tryParse(val?.trim() ?? '');
                        if (n == null) return 'ກະລຸນາປ້ອນອາຍຸເປັນຕົວເລກ';
                        if (n < 15 || n > 80) return 'ອາຍຸຕ້ອງຢູ່ລະຫວ່າງ 15–80';
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextFormField(
                      controller: _yearController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: 'ປີ (ເຊັ່ນ: 4)',
                        border: UnderlineInputBorder(),
                      ),
                      validator: (val) {
                        final n = int.tryParse(val?.trim() ?? '');
                        if (n == null || n < 1 || n > 6) return 'ປີທີຕ້ອງເປັນ 1–6';
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _classroomController,
                      decoration: const InputDecoration(
                        labelText: 'ຫ້ອງຮຽນ (ເຊັ່ນ: BCSP7A-AM)',
                        border: UnderlineInputBorder(),
                      ),
                      validator: (val) => val == null || val.trim().isEmpty ? 'ກະລຸນາປ້ອນຫ້ອງ' : null,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextFormField(
                      controller: _gpaController,
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      decoration: const InputDecoration(
                        labelText: 'ຄະແນນ (GPA)',
                        border: UnderlineInputBorder(),
                      ),
                      validator: (val) {
                        final g = double.tryParse(val?.trim().replaceAll(',', '.') ?? '');
                        if (g == null) return 'ກະລຸນາປ້ອນ GPA ເປັນຕົວເລກ';
                        if (g < 0 || g > 4) return 'GPA ຕ້ອງຢູ່ລະຫວ່າງ 0.00–4.00';
                        return null;
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'ເບີໂທລະສັບ',
                  border: UnderlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: const InputDecoration(
                  labelText: 'ອີເມວ',
                  border: UnderlineInputBorder(),
                ),
                validator: (val) {
                  final v = val?.trim() ?? '';
                  if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(v)) return 'ອີເມວບໍ່ຖືກຮູບແບບ';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                initialValue: _selectedGender,
                decoration: const InputDecoration(
                  labelText: 'ເພດ',
                  border: UnderlineInputBorder(),
                ),
                items: _genders.map((gender) {
                  return DropdownMenuItem(value: gender, child: Text(gender));
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedGender = val);
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                initialValue: _selectedMajor,
                decoration: const InputDecoration(
                  labelText: 'ສາຂາວິຊາ',
                  border: UnderlineInputBorder(),
                ),
                items: _majors.map((major) {
                  return DropdownMenuItem(value: major, child: Text(major));
                }).toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedMajor = val);
                },
              ),
              const SizedBox(height: 36),
              SizedBox(
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF0052D4),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                    elevation: 0,
                  ),
                  onPressed: _saveForm,
                  child: const Text(
                    'ບັນທຶກຂໍ້ມູນ',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
