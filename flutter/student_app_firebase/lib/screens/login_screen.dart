import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isRegister = false; // false = ເຂົ້າສູ່ລະບົບ, true = ສະໝັກສະມາຊິກ
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    final email = _emailController.text.trim();
    final password = _passwordController.text;
    try {
      if (_isRegister) {
        await AuthService.register(email, password);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('ສະໝັກສຳເລັດ — ກວດອີເມວເພື່ອຢືນຢັນຕົວຕົນ')),
          );
        }
      } else {
        await AuthService.signIn(email, password);
      }
      // ບໍ່ຕ້ອງ Navigator.push: AuthGate ຈະສະຫຼັບໄປໜ້າລາຍການເອງ ເມື່ອ authStateChanges() ສົ່ງ User ມາ
    } on FirebaseAuthException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AuthService.messageFor(e)), backgroundColor: Colors.red.shade600),
        );
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Icon(Icons.school_rounded, size: 72, color: Color(0xFF0052D4)),
                  const SizedBox(height: 12),
                  Text(
                    _isRegister ? 'ສະໝັກສະມາຊິກ' : 'ເຂົ້າສູ່ລະບົບ',
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  TextFormField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: const InputDecoration(labelText: 'ອີເມວ', prefixIcon: Icon(Icons.email_outlined)),
                    validator: (v) => v == null || !v.contains('@') ? 'ກະລຸນາປ້ອນອີເມວໃຫ້ຖືກ' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(labelText: 'ລະຫັດຜ່ານ', prefixIcon: Icon(Icons.lock_outline)),
                    validator: (v) => v == null || v.length < 6 ? 'ລະຫັດຜ່ານຢ່າງໜ້ອຍ 6 ຕົວ' : null,
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 50,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF0052D4),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: _loading ? null : _submit,
                      child: _loading
                          ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white))
                          : Text(
                              _isRegister ? 'ສະໝັກສະມາຊິກ' : 'ເຂົ້າສູ່ລະບົບ',
                              style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                    ),
                  ),
                  TextButton(
                    onPressed: _loading ? null : () => setState(() => _isRegister = !_isRegister),
                    child: Text(_isRegister ? 'ມີບັນຊີແລ້ວ? ເຂົ້າສູ່ລະບົບ' : 'ຍັງບໍ່ມີບັນຊີ? ສະໝັກສະມາຊິກ'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
