import 'package:firebase_auth/firebase_auth.dart';

/// ລວມຄຳສັ່ງ Firebase Authentication ໄວ້ບ່ອນດຽວ — ໜ້າຈໍເອີ້ນໃຊ້ຜ່ານ class ນີ້
class AuthService {
  AuthService._();

  static final FirebaseAuth _auth = FirebaseAuth.instance;

  /// Stream ສະຖານະ Login/Logout ແບບ Realtime (null = ຍັງບໍ່ໄດ້ເຂົ້າລະບົບ)
  static Stream<User?> authStateChanges() => _auth.authStateChanges();

  /// ຜູ້ໃຊ້ທີ່ກຳລັງເຂົ້າລະບົບຢູ່ຕອນນີ້
  static User? get currentUser => _auth.currentUser;

  static Future<void> signIn(String email, String password) {
    return _auth.signInWithEmailAndPassword(email: email, password: password);
  }

  /// ສະໝັກສະມາຊິກ ແລ້ວສົ່ງອີເມວຢືນຢັນຕົວຕົນ
  static Future<void> register(String email, String password) async {
    final cred = await _auth.createUserWithEmailAndPassword(email: email, password: password);
    await cred.user?.sendEmailVerification();
  }

  static Future<void> signOut() => _auth.signOut();

  /// ແປງ error code ຂອງ Firebase ເປັນຂໍ້ຄວາມພາສາລາວ
  static String messageFor(FirebaseAuthException e) {
    switch (e.code) {
      case 'invalid-email':
        return 'ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ';
      case 'user-disabled':
        return 'ບັນຊີນີ້ຖືກປິດການໃຊ້ງານ';
      case 'user-not-found':
      case 'wrong-password':
      case 'invalid-credential':
        return 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ';
      case 'email-already-in-use':
        return 'ອີເມວນີ້ຖືກໃຊ້ສະໝັກແລ້ວ';
      case 'weak-password':
        return 'ລະຫັດຜ່ານສັ້ນເກີນໄປ (ຢ່າງໜ້ອຍ 6 ຕົວ)';
      case 'too-many-requests':
        return 'ລອງຫຼາຍເທື່ອເກີນໄປ ກະລຸນາລໍຖ້າສັກໜ້ອຍ';
      case 'network-request-failed':
        return 'ບໍ່ມີອິນເຕີເນັດ';
      default:
        return e.message ?? 'ເກີດຂໍ້ຜິດພາດ (${e.code})';
    }
  }
}
