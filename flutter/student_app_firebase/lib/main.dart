import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';
import 'providers/student_provider.dart';
import 'screens/auth_gate.dart';

Future<void> main() async {
  // ຕ້ອງເອີ້ນກ່ອນ Firebase.initializeApp() ເພາະ Firebase ຕິດຕໍ່ກັບ native ຜ່ານ Platform Channel
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => StudentProvider()),
      ],
      child: MaterialApp(
        title: 'ລະບົບຈັດການນັກສຶກສາ ສະຖາບັນ ເຕັກໂນໂລຊີ ສຸດສະກະ',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: false,
          primaryColor: const Color(0xFF0052D4),
          scaffoldBackgroundColor: const Color(0xFFF4F6F9),
        ),
        // AuthGate ເລືອກວ່າຈະສະແດງໜ້າ Login ຫຼື ໜ້າລາຍການ ຕາມສະຖານະການເຂົ້າສູ່ລະບົບ
        home: const AuthGate(),
      ),
    );
  }
}
