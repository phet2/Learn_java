import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

/// ອັບໂຫຼດຮູບນັກສຶກສາຂຶ້ນ Firebase Storage ແລ້ວຄືນ URL ສຳລັບສະແດງໃນ Image.network()
///
/// ວິທີໃຊ້ (ເຊັ່ນ ໃນຟອມ):
///   final url = await StorageService.pickAndUploadStudentPhoto(student.id);
///   if (url != null) provider.updateStudent(student.copyWith(...)); // ເກັບ url ໄວ້ໃນ Firestore
class StorageService {
  StorageService._();

  static Future<String?> pickAndUploadStudentPhoto(String studentId) async {
    // 1) ເລືອກຮູບຈາກຄັງຮູບ (ໃຊ້ package image_picker)
    final XFile? picked = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      maxWidth: 800, // ຍໍ້ຮູບກ່ອນອັບໂຫຼດ ປະຫຍັດພື້ນທີ່ ແລະ ອິນເຕີເນັດ
      imageQuality: 80,
    );
    if (picked == null) return null; // ຜູ້ໃຊ້ກົດຍົກເລີກ

    // 2) ກຳນົດບ່ອນເກັບ: students/<id>.jpg
    final ref = FirebaseStorage.instance.ref('students/$studentId.jpg');

    // 3) ອັບໂຫຼດເປັນ bytes (ໃຊ້ໄດ້ທັງ Android, iOS ແລະ Web)
    await ref.putData(
      await picked.readAsBytes(),
      SettableMetadata(contentType: 'image/jpeg'),
    );

    // 4) ຂໍ URL ສຳລັບດາວໂຫຼດ/ສະແດງຮູບ
    return ref.getDownloadURL();
  }
}
