import java.text.DecimalFormat;
import java.util.Scanner;

// ບົດທີ 5 - Exercise 1
// ຄຳນວນຄ່າຮຽນພິເສດ: ຊົ່ວໂມງລະ 100,000 ກີບ, ຈ່າຍເປັນຄັ້ງຕໍ່ຄັ້ງ
public class Exercise1 {
    public static void main(String[] args) {
        final long RATE_PER_HOUR = 100_000; // ຄ່າຮຽນຕໍ່ຊົ່ວໂມງ (ກີບ)

        Scanner keyboard = new Scanner(System.in);
        DecimalFormat df = new DecimalFormat("#,##0");

        System.out.print("ປ້ອນຈຳນວນຊົ່ວໂມງສອນ: ");
        int hours = keyboard.nextInt();

        long fee = hours * RATE_PER_HOUR;
        System.out.println("ຄ່າຮຽນທີ່ຕ້ອງຈ່າຍ: " + df.format(fee) + " ກີບ");

        keyboard.close();
    }
}
