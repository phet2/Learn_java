import 'package:flutter/material.dart';
import '../constants/majors.dart';

class SearchBarWidget extends StatelessWidget {
  final ValueChanged<String> onChanged;
  final String selectedMajor;
  final ValueChanged<String> onMajorSelected;

  final List<String> majors = const [kAllMajors, ...kMajors];

  const SearchBarWidget({
    super.key,
    required this.onChanged,
    required this.selectedMajor,
    required this.onMajorSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: TextField(
            onChanged: onChanged,
            decoration: InputDecoration(
              hintText: 'ຄົ້ນຫານັກສຶກສາ (ຊື່, ສາຂາ, ຫ້ອງ)...',
              hintStyle: TextStyle(color: Colors.grey.shade400, fontSize: 14),
              prefixIcon: Icon(Icons.search_rounded, color: Colors.blue.shade600),
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: 38,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: majors.length,
            itemBuilder: (context, index) {
              final major = majors[index];
              final isSelected = major == selectedMajor;
              return Padding(
                padding: const EdgeInsets.only(right: 8.0),
                child: ChoiceChip(
                  label: Text(
                    major,
                    style: TextStyle(
                      color: isSelected ? Colors.white : Colors.grey.shade700,
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                    ),
                  ),
                  selected: isSelected,
                  selectedColor: const Color(0xFF0052D4),
                  backgroundColor: Colors.white,
                  elevation: isSelected ? 2 : 0,
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  onSelected: (_) => onMajorSelected(major),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
