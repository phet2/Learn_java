// ⚠️ ໄຟລ໌ນີ້ເປັນຕົວແທນຊົ່ວຄາວ — ຕ້ອງສ້າງໃໝ່ດ້ວຍ FlutterFire CLI ກ່ອນລັນແອັບ:
//
//   dart pub global activate flutterfire_cli
//   flutterfire configure
//
// ຄຳສັ່ງຂ້າງເທິງຈະເຊື່ອມກັບ Firebase project ຂອງທ່ານ ແລ້ວຂຽນທັບໄຟລ໌ນີ້
// ດ້ວຍຄ່າ apiKey, appId, projectId … ຂອງແຕ່ລະ platform (Android, iOS, Web)
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    throw UnsupportedError(
      'ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ Firebase — ລັນ "flutterfire configure" ເພື່ອສ້າງໄຟລ໌ firebase_options.dart',
    );
  }
}
