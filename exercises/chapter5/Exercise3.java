// ບົດທີ 5 - Exercise 3
// ຫາຜົນບວກຂອງເລກຄີກຈາກ 1 - 10 (1 + 3 + 5 + 7 + 9 = 25)
public class Exercise3 {
    public static void main(String[] args) {
        int sum = 0;
        for (int number = 1; number <= 10; number++) {
            if (number % 2 != 0) { // ເລກຄີກ = ຫານ 2 ແລ້ວມີເສດ
                sum += number;
            }
        }
        System.out.println("ຜົນບວກເລກຄີກ 1 - 10 = " + sum);
    }
}
