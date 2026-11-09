import java.text.DecimalFormat;
import java.util.Scanner;

// ບົດທີ 5 - Exercise 2
// ຄິດໄລ່ເງິນໂບນັດຈາກຍອດຂາຍລວມໝົດປີ (ຄິດເປັນ % ຂອງເງິນເດືອນ)
public class Exercise2 {
    public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);
        DecimalFormat df = new DecimalFormat("#,##0");

        System.out.print("ປ້ອນຊື່ພະນັກງານ: ");
        String name = keyboard.nextLine();

        System.out.print("ປ້ອນເງິນເດືອນ: ");
        long salary = keyboard.nextLong();

        System.out.print("ປ້ອນຍອດຂາຍລວມ: ");
        long sales = keyboard.nextLong();

        int percent;
        if (sales <= 100_000) {
            percent = 10;
        } else if (sales <= 200_000) {
            percent = 20;
        } else if (sales <= 300_000) {
            percent = 30;
        } else {
            percent = 40;
        }

        long bonus = salary * percent / 100;

        System.out.println("ພະນັກງານ: " + name);
        System.out.println("ຍອດຂາຍ: " + df.format(sales) + " ກີບ");
        System.out.println("ອັດຕາໂບນັດ: " + percent + "% ຂອງເງິນເດືອນ");
        System.out.println("ເງິນໂບນັດທີ່ໄດ້: " + df.format(bonus) + " ກີບ");

        keyboard.close();
    }
}
