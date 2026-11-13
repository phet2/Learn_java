import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'login_screen.dart';
import 'student_list_screen.dart';

/// ຟັງ authStateChanges() ແລ້ວສະຫຼັບໜ້າຈໍອັດຕະໂນມັດ:
/// ຍັງບໍ່ Login → LoginScreen · Login ແລ້ວ → StudentListScreen
class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: AuthService.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        if (snapshot.hasError) {
          return Scaffold(body: Center(child: Text('ເກີດຂໍ້ຜິດພາດ: ${snapshot.error}')));
        }
        return snapshot.data == null ? const LoginScreen() : const StudentListScreen();
      },
    );
  }
}
