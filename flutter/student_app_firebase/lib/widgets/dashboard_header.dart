import 'package:flutter/material.dart';

class DashboardHeader extends StatelessWidget {
  final int totalStudents;
  final double averageGpa;
  final int honorStudents;

  const DashboardHeader({
    super.key,
    required this.totalStudents,
    required this.averageGpa,
    required this.honorStudents,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 8),
      padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF0052D4), Color(0xFF4364F7), Color(0xFF6FB1FC)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF4364F7).withValues(alpha: 0.35),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildMetric('ນັກສຶກສາທັງໝົດ', '$totalStudents ຄົນ', Icons.groups_rounded),
          Container(height: 38, width: 1, color: Colors.white24),
          _buildMetric('GPA ສະເລ່ຍ', averageGpa.toStringAsFixed(2), Icons.star_rounded),
          Container(height: 38, width: 1, color: Colors.white24),
          _buildMetric('ເກຣດ A (≥ 3.5)', '$honorStudents ຄົນ', Icons.workspace_premium_rounded),
        ],
      ),
    );
  }

  Widget _buildMetric(String title, String value, IconData icon) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white, size: 22),
        const SizedBox(height: 6),
        Text(
          value,
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 17),
        ),
        const SizedBox(height: 2),
        Text(
          title,
          style: const TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}
