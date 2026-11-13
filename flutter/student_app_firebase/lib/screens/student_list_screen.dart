import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/student_provider.dart';
import '../services/auth_service.dart';
import '../widgets/dashboard_header.dart';
import '../widgets/search_bar_widget.dart';
import '../widgets/student_card.dart';
import '../widgets/empty_state_widget.dart';
import 'student_form_screen.dart';

class StudentListScreen extends StatelessWidget {
  const StudentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F6F9),
      appBar: AppBar(
        title: const Text('ລະບົບຈັດການນັກສຶກສາ ສະຖາບັນ ເຕັກໂນໂລຊີ ສຸດສະກະ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: const Color(0xFF0052D4),
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          PopupMenuButton<SortOption>(
            icon: const Icon(Icons.sort_rounded),
            onSelected: (sort) {
              Provider.of<StudentProvider>(context, listen: false).setSortBy(sort);
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: SortOption.name,
                child: Text('ຈັດລຳດັບຕາມຊື່ (A-Z)'),
              ),
              const PopupMenuItem(
                value: SortOption.gpa,
                child: Text('ຈັດລຳດັບຕາມ GPA (ສູງສຸດ)'),
              ),
            ],
          ),
          IconButton(
            tooltip: 'ອອກຈາກລະບົບ',
            icon: const Icon(Icons.logout_rounded),
            // signOut() → authStateChanges() ສົ່ງ null → AuthGate ສະຫຼັບໄປໜ້າ Login ເອງ
            onPressed: () => AuthService.signOut(),
          ),
        ],
      ),
      body: Consumer<StudentProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (provider.error != null) {
            return Center(child: Padding(padding: const EdgeInsets.all(24), child: Text(provider.error!, textAlign: TextAlign.center)));
          }
          final students = provider.students; // ຄຳນວນ ກັ່ນຕອງ+ຈັດລຽງ ຄັ້ງດຽວຕໍ່ການ build
          return Column(
            children: [
              DashboardHeader(
                totalStudents: provider.totalStudents,
                averageGpa: provider.averageGpa,
                honorStudents: provider.honorStudents,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                child: SearchBarWidget(
                  selectedMajor: provider.selectedMajorFilter,
                  onChanged: (query) => provider.setSearchQuery(query),
                  onMajorSelected: (major) => provider.setMajorFilter(major),
                ),
              ),
              const SizedBox(height: 8),
              Expanded(
                child: students.isEmpty
                    ? const EmptyStateWidget()
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        itemCount: students.length,
                        itemBuilder: (context, index) {
                          final student = students[index];
                          return StudentCard(
                            student: student,
                            onEdit: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (_) => StudentFormScreen(student: student)),
                              );
                            },
                            onDelete: () {
                              provider.deleteStudent(student.id);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('ລຶບ ${student.name} ແລ້ວ'),
                                  action: SnackBarAction(
                                    label: 'ຍົກເລີກ',
                                    onPressed: () => provider.addStudent(student),
                                  ),
                                ),
                              );
                            },
                          );
                        },
                      ),
              ),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF0052D4),
        elevation: 4,
        child: const Icon(Icons.add_rounded, color: Colors.white, size: 30),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const StudentFormScreen()),
          );
        },
      ),
    );
  }
}
