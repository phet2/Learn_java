// ໂຄ້ດຄຳຕອບຈາກ "ຄຳຖາມຄົ້ນຄວ້າສອບເສັງກາງພາກ" — ລວມໄວ້ເພື່ອກວດວ່າ compile ຜ່ານແທ້
// (ໄຟລ໌ນີ້ບໍ່ໄດ້ຖືກເອີ້ນໃຊ້ໃນແອັບ ເປັນຕົວຢ່າງປະກອບບົດຮຽນເທົ່ານັ້ນ)
// ignore_for_file: avoid_print

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

// ---------------------------------------------------------------- ຂໍ້ 43–45: StreamBuilder ສະແດງສິນຄ້າແບບ Realtime
class ProductListExample extends StatelessWidget {
  const ProductListExample({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<QuerySnapshot>(
      stream: FirebaseFirestore.instance.collection('products').snapshots(),
      builder: (context, snapshot) {
        if (snapshot.hasError) return const Text('Something went wrong');
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
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
    );
  }
}

// ---------------------------------------------------------------- ຂໍ້ 46–47: ອັບເດດອາຍຸ (Document ຕ້ອງມີຢູ່ແລ້ວ)
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

// ---------------------------------------------------------------- ຂໍ້ 48: set + merge (ບໍ່ມີ Document ກໍສ້າງໃໝ່ · ບໍ່ລຶບ field ອື່ນ)
Future<void> upsertUserAge(String docId, int newAge) async {
  await FirebaseFirestore.instance
      .collection('users')
      .doc(docId)
      .set({'age': newAge}, SetOptions(merge: true));
}

// ---------------------------------------------------------------- ຂໍ້ 49: Sign In ດ້ວຍ Email & Password + try-catch
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

// ---------------------------------------------------------------- ຂໍ້ 50: Query orders ທີ່ pending ໃໝ່ສຸດ 10 ລາຍການ
Future<QuerySnapshot> latestPendingOrders() async {
  QuerySnapshot querySnapshot = await FirebaseFirestore.instance
      .collection('orders')
      .where('status', isEqualTo: 'pending')
      .orderBy('created_at', descending: true)
      .limit(10)
      .get();
  return querySnapshot;
}

// ---------------------------------------------------------------- ຕົວຢ່າງເພີ່ມເຕີມສຳລັບຂໍ້ 21–39
Future<void> firestoreBasics() async {
  final db = FirebaseFirestore.instance;
  final uid = FirebaseAuth.instance.currentUser?.uid ?? 'demo-uid';

  // .add() → Auto-ID
  final newRef = await db.collection('students').add({
    'name': 'ນາງ ອາລຸນຍາ ຈັນທາ',
    'gpa': 3.85,
    'createdAt': FieldValue.serverTimestamp(), // ເວລາຈາກ Server
  });
  print('Document ID ໃໝ່: ${newRef.id}');

  // .doc(id).set() → ກຳນົດ Document ID ເອງ (ເຊັ່ນ ໃຊ້ UID)
  await db.collection('users').doc(uid).set({'role': 'teacher'});

  // ລຶບສະເພາະ field
  await db.collection('users').doc(uid).update({'nickname': FieldValue.delete()});

  // .get() → ດຶງຄັ້ງດຽວ ໄດ້ QuerySnapshot
  final snapshot = await db.collection('students').where('gpa', isGreaterThanOrEqualTo: 3.5).get();
  for (var doc in snapshot.docs) {
    print('${doc.id} → ${doc.data()['name']}');
  }

  // ຂໍ້ມູນຫຼາຍປະເພດໃນ Document ດຽວ
  await db.collection('demo').doc('types').set({
    'text': 'ສະບາຍດີ',
    'number': 42,
    'double': 3.14,
    'isActive': true,
    'tags': ['flutter', 'firebase'], // Array
    'address': {'city': 'ວຽງຈັນ', 'zip': '01000'}, // Map
    'location': const GeoPoint(17.9757, 102.6331), // GeoPoint
    'createdAt': Timestamp.now(), // Timestamp
    'owner': db.collection('users').doc(uid), // Reference
    'note': null, // Null
  });
}

// ---------------------------------------------------------------- FutureBuilder: ດຶງຄັ້ງດຽວ ແລ້ວສະແດງ
class StudentCountOnce extends StatelessWidget {
  const StudentCountOnce({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<QuerySnapshot<Map<String, dynamic>>>(
      future: FirebaseFirestore.instance.collection('students').get(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }
        if (snapshot.hasError) return Text('ຜິດພາດ: ${snapshot.error}');
        return Text('ນັກສຶກສາທັງໝົດ ${snapshot.data!.size} ຄົນ');
      },
    );
  }
}
