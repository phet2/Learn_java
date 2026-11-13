import 'dart:convert';

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

  StudentModel({
    required this.id,
    required this.name,
    required this.age,
    required this.gender,
    required this.major,
    required this.gpa,
    required this.classroom,
    required this.year,
    this.phone = '020-5555-8888',
    this.email = 'student@soutsaka.edu.la',
  });

  String get gradeLetter {
    if (gpa >= 3.5) return 'A';
    if (gpa >= 3.0) return 'B';
    if (gpa >= 2.0) return 'C';
    return 'D';
  }

  StudentModel copyWith({
    String? id,
    String? name,
    int? age,
    String? gender,
    String? major,
    double? gpa,
    String? classroom,
    int? year,
    String? phone,
    String? email,
  }) {
    return StudentModel(
      id: id ?? this.id,
      name: name ?? this.name,
      age: age ?? this.age,
      gender: gender ?? this.gender,
      major: major ?? this.major,
      gpa: gpa ?? this.gpa,
      classroom: classroom ?? this.classroom,
      year: year ?? this.year,
      phone: phone ?? this.phone,
      email: email ?? this.email,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'age': age,
      'gender': gender,
      'major': major,
      'gpa': gpa,
      'classroom': classroom,
      'year': year,
      'phone': phone,
      'email': email,
    };
  }

  factory StudentModel.fromMap(Map<String, dynamic> map) {
    return StudentModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      age: map['age'] ?? 0,
      gender: map['gender'] ?? 'ຊາຍ',
      major: map['major'] ?? 'ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ',
      gpa: (map['gpa'] as num?)?.toDouble() ?? 0.0,
      classroom: map['classroom'] ?? 'BCSP7A-AM',
      year: map['year'] ?? 4,
      phone: map['phone'] ?? '020-5555-8888',
      email: map['email'] ?? 'student@soutsaka.edu.la',
    );
  }

  String toJson() => json.encode(toMap());
  factory StudentModel.fromJson(String source) => StudentModel.fromMap(json.decode(source));
}
