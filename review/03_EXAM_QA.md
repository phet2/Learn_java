# ຄຳຖາມສອບເສັງ Java ພ້ອມຄຳຕອບ (15 ຂໍ້)

> ✅ ໂຄ້ດຕົວຢ່າງທຸກຂໍ້ compile ແລະ ລັນຜ່ານດ້ວຍ JDK 21 ແລ້ວ
> 💡 ແຕ່ລະຂໍ້ມີ "ຕົວຢ່າງຈາກໂປຣເຈັກ" (Login / PanelProduct) — ຍົກໃຫ້ອາຈານເບິ່ງຈະໄດ້ຄະແນນດີ

---

## ຂໍ້ 1. Java ມີຈຸດເດັ່ນຫຍັງແດ່?

| ຈຸດເດັ່ນ | ຄຳອະທິບາຍ |
|---|---|
| **Simple** (ງ່າຍ) | syntax ຄ້າຍ C/C++ ແຕ່ບໍ່ມີ pointer, ມີ **Garbage Collection** ຄືນໜ່ວຍຄວາມຈຳອັດຕະໂນມັດ |
| **Portable / Platform Independent** | "**Write Once, Run Anywhere**" — compile ເປັນ bytecode (`.class`) ຄັ້ງດຽວ ລັນໄດ້ທຸກ OS ທີ່ມີ JVM (Windows, Linux, macOS) |
| **Object Oriented** | ຂຽນໂປຣແກຣມເຊີງວັດຖຸ ມີ Encapsulation, Inheritance, Polymorphism, Abstraction |
| **Secure** (ປອດໄພ) | ມີ Bytecode Verifier ກວດໂຄ້ດກ່ອນລັນ, ບໍ່ມີ pointer ເຂົ້າເຖິງໜ່ວຍຄວາມຈຳໂດຍກົງ |
| **Robust** (ແຂງແຮງ) | ກວດຊະນິດຂໍ້ມູນເຂັ້ມງວດຕອນ compile, ມີ Exception Handling |
| **Multithreading** | ເຮັດຫຼາຍວຽກພ້ອມກັນໄດ້ |
| **Dynamic** | ໂຫຼດ class ແລະ ເພີ່ມ library ໄດ້ງ່າຍ |

---

## ຂໍ້ 2. ຄຳສັ່ງ `if...else` ໃຊ້ເພື່ອຫຍັງ? ພ້ອມຕົວຢ່າງ

**`if...else`** ໃຊ້ **ຕັດສິນໃຈ** ເລືອກເຮັດຄຳສັ່ງຕາມເງື່ອນໄຂ: ຖ້າເງື່ອນໄຂເປັນ **true** ເຮັດບລັອກ `if`, ຖ້າເປັນ **false** ເຮັດບລັອກ `else` (ໂຄງສ້າງແບບທາງເລືອກ — Selection Structure)

```java
if (ເງື່ອນໄຂ) {
    // ເຮັດເມື່ອເງື່ອນໄຂເປັນ true
} else {
    // ເຮັດເມື່ອເງື່ອນໄຂເປັນ false
}
```

**ຕົວຢ່າງ 1:** ກວດວ່າສອບຜ່ານບໍ
```java
int score = 75;
if (score >= 50) {
    System.out.println("ຜ່ານ");
} else {
    System.out.println("ບໍ່ຜ່ານ");
}
// ຜົນ: ຜ່ານ
```

**ຕົວຢ່າງ 2:** `if...else if...else` ຕັດເກຣດ (ຫຼາຍເງື່ອນໄຂ)
```java
char grade;
if (score >= 80) grade = 'A';
else if (score >= 70) grade = 'B';
else if (score >= 60) grade = 'C';
else if (score >= 50) grade = 'D';
else grade = 'F';
// score = 75 → grade = 'B'
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ (Login):**
```java
if (BCrypt.checkpw(txtPassword.getText(), storedHash)) {
    // ລະຫັດຖືກ → ເປີດໜ້າ Main
} else {
    // ລະຫັດຜິດ → ແຈ້ງເຕືອນ
}
```

---

## ຂໍ້ 3. ອະທິບາຍ JVM, JDK ແລະ JRE

| | ຊື່ເຕັມ | ຄວາມໝາຍ | ໃຜໃຊ້ |
|---|---|---|---|
| **JVM** | Java Virtual Machine | ເຄື່ອງຈັກສະເໝືອນ ທີ່ **ແປ bytecode ເປັນພາສາເຄື່ອງ** ແລ້ວລັນ — ແຕ່ລະ OS ມີ JVM ຂອງຕົນເອງ ຈຶ່ງເຮັດໃຫ້ Java ລັນໄດ້ທຸກ OS | ຢູ່ໃນ JRE |
| **JRE** | Java Runtime Environment | **ສະພາບແວດລ້ອມສຳລັບລັນ** = JVM + Library ມາດຕະຖານ; ເຮັດວຽກ 3 ຂັ້ນ: Class Loader (ໂຫຼດ) → Bytecode Verifier (ກວດ) → Interpreter (ລັນ) | ຜູ້ໃຊ້ທີ່ຕ້ອງການ **ລັນ** ໂປຣແກຣມ |
| **JDK** | Java Development Kit | **ຊຸດພັດທະນາ** = JRE + ເຄື່ອງມືເຊັ່ນ `javac` (compiler), `java` (launcher), `jar`, `javadoc`, debugger | ນັກພັດທະນາທີ່ຕ້ອງການ **ຂຽນ ແລະ compile** |

**ຄວາມສຳພັນ:** **JDK ⊃ JRE ⊃ JVM**

```diagram-jdk
┌───────────── JDK ─────────────┐
│  javac, jar, javadoc ...      │
│  ┌────────── JRE ──────────┐  │
│  │  Library (java.lang...) │  │
│  │  ┌──────── JVM ──────┐  │  │
│  │  └───────────────────┘  │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘

Hello.java ──javac──► Hello.class (bytecode) ──JVM──► ລັນໄດ້ທຸກ OS
```

---

## ຂໍ້ 4. ຕົວປ່ຽນ (Variable) ແມ່ນຫຍັງ? ພ້ອມຕົວຢ່າງ

**ຕົວປ່ຽນ** ແມ່ນ **ຊື່ທີ່ຕັ້ງຂຶ້ນ ເພື່ອອ້າງອີງບ່ອນເກັບຂໍ້ມູນໃນໜ່ວຍຄວາມຈຳ** ຄ່າຂອງມັນປ່ຽນແປງໄດ້ລະຫວ່າງໂປຣແກຣມເຮັດວຽກ; ທຸກຕົວປ່ຽນຕ້ອງມີ **ຊະນິດຂໍ້ມູນ** ແລະ **ຊື່**

```java
DataType varName;            // ປະກາດ
varName = value;             // ກຳນົດຄ່າ
DataType varName = value;    // ປະກາດ + ກຳນົດຄ່າ
```

**ຕົວຢ່າງ:**
```java
String productName = "ນ້ຳດື່ມ";
int quantity = 24;
double price = 5000.50;
boolean inStock = true;
final double VAT = 0.10;     // ຄ່າຄົງທີ່ (constant) ປ່ຽນບໍ່ໄດ້
```

**ກົດການຕັ້ງຊື່:** ຂຶ້ນຕົ້ນດ້ວຍຕົວອັກສອນ, `_` ຫຼື `$` / ຫ້າມຂຶ້ນຕົ້ນດ້ວຍຕົວເລກ / ຫ້າມມີຍະຫວ່າງ / ຫ້າມໃຊ້ keyword / ຕົວພິມໃຫຍ່-ນ້ອຍຕ່າງກັນ

**ປະເພດຕົວປ່ຽນຕາມບ່ອນປະກາດ:**
| ປະເພດ | ບ່ອນປະກາດ | ຕົວຢ່າງຈາກໂປຣເຈັກ |
|---|---|---|
| Local variable | ໃນ method | `int selectIndex = jTable1.getSelectedRow();` |
| Instance variable | ໃນ class ນອກ method | `String barcode_old = null;` |
| Static variable | ໃນ class ມີ `static` | (ສ່ວນໃຫຍ່ໃຊ້ສຳລັບຄ່າຄົງທີ່) |

---

## ຂໍ້ 5. Data Type ໃນ Java ມີຫຍັງແດ່? ຍົກຕົວຢ່າງ 5 ຊະນິດ

Data Type ແບ່ງເປັນ 2 ກຸ່ມ:

**1) Primitive Type (ຊະນິດພື້ນຖານ) — 8 ຊະນິດ**
| ຊະນິດ | ຂະໜາດ | ເກັບຫຍັງ | ຕົວຢ່າງ |
|---|---|---|---|
| `byte` | 1 byte | ຈຳນວນເຕັມ -128 ຫາ 127 | `byte age = 25;` |
| `short` | 2 byte | ຈຳນວນເຕັມ | `short year = 2026;` |
| `int` | 4 byte | ຈຳນວນເຕັມ (ໃຊ້ຫຼາຍສຸດ) | `int quantity = 24;` |
| `long` | 8 byte | ຈຳນວນເຕັມໃຫຍ່ (ມີ `L`) | `long total = 3_000_000_000L;` |
| `float` | 4 byte | ທົດສະນິຍົມ (ມີ `F`) | `float discount = 0.05F;` |
| `double` | 8 byte | ທົດສະນິຍົມ (ໃຊ້ຫຼາຍສຸດ) | `double price = 5000.50;` |
| `char` | 2 byte | ຕົວອັກສອນ 1 ຕົວ (Unicode) | `char size = 'L';` |
| `boolean` | — | `true` / `false` | `boolean inStock = true;` |

**2) Reference Type (ຊະນິດອ້າງອີງ)** — `String`, Array, class ທີ່ສ້າງເອງ, ...
```java
String name = "Phet";
int[] scores = {90, 75, 60};
```

**5 ຊະນິດທີ່ແນະນຳໃຫ້ຕອບ:** `int`, `double`, `char`, `boolean`, `String` (ບອກນຳວ່າ String ເປັນ reference type)

---

## ຂໍ້ 6. ຄວາມແຕກຕ່າງລະຫວ່າງ `while`, `do...while` ແລະ `for`

| | `while` | `do...while` | `for` |
|---|---|---|---|
| ກວດເງື່ອນໄຂ | **ກ່ອນ** ເຂົ້າ loop | **ຫຼັງ** ເຮັດ loop | **ກ່ອນ** ເຂົ້າ loop |
| ເຮັດຢ່າງໜ້ອຍ | 0 ຮອບ | **1 ຮອບສະເໝີ** | 0 ຮອບ |
| ເໝາະກັບ | ບໍ່ຮູ້ຈຳນວນຮອບລ່ວງໜ້າ | ຕ້ອງເຮັດກ່ອນ 1 ຄັ້ງ (ເຊັ່ນ ເມນູ, ຮັບຂໍ້ມູນຈົນຖືກ) | **ຮູ້ຈຳນວນຮອບ** ແນ່ນອນ |
| ຂຽນ | `while (ເງື່ອນໄຂ) { }` | `do { } while (ເງື່ອນໄຂ);` ← ມີ `;` | `for (ຄ່າເລີ່ມ; ເງື່ອນໄຂ; ປ່ຽນຄ່າ) { }` |

**ຕົວຢ່າງ:**
```java
// while
int i = 1;
while (i <= 3) {
    System.out.print("while " + i + " ");
    i++;
}
// ຜົນ: while 1 while 2 while 3

// do...while — ເງື່ອນໄຂເປັນ false ຕັ້ງແຕ່ຕົ້ນ ກໍຍັງເຮັດ 1 ຮອບ
int j = 10;
do {
    System.out.print("do-while " + j + " ");
    j++;
} while (j <= 3);
// ຜົນ: do-while 10

// for
for (int k = 1; k <= 3; k++) {
    System.out.print("for " + k + " ");
}
// ຜົນ: for 1 for 2 for 3
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ (PanelProduct):** `while (rs.next()) { d.addRow(...); }` — ໃຊ້ while ເພາະ **ບໍ່ຮູ້ລ່ວງໜ້າ** ວ່າມີສິນຄ້າຈັກແຖວ

---

## ຂໍ້ 7. Method ມີປະໂຫຍດແນວໃດ? ພ້ອມຕົວຢ່າງ

**Method** ແມ່ນ **ກຸ່ມຄຳສັ່ງທີ່ຕັ້ງຊື່ໄວ້ ເພື່ອເຮັດວຽກໃດໜຶ່ງ** ເອີ້ນໃຊ້ຜ່ານຊື່ໄດ້ຫຼາຍຄັ້ງ

```java
[modifier] returnType methodName([parameter]) {
    // ຄຳສັ່ງ
    return value;   // ຖ້າ returnType ເປັນ void ບໍ່ຕ້ອງມີ return
}
```

**ປະໂຫຍດ:**
1. **ໃຊ້ຊ້ຳໄດ້ (Reuse)** — ຂຽນຄັ້ງດຽວ ເອີ້ນໄດ້ຫຼາຍບ່ອນ
2. **ແບ່ງວຽກເປັນສ່ວນນ້ອຍ** — ໂປຣແກຣມອ່ານງ່າຍ ເຂົ້າໃຈງ່າຍ
3. **ແກ້ໄຂງ່າຍ** — ແກ້ບ່ອນດຽວ ມີຜົນທຸກບ່ອນທີ່ເອີ້ນ
4. **ຫຼຸດໂຄ້ດຊ້ຳ** ແລະ ຫຼຸດຂໍ້ຜິດພາດ

**ຕົວຢ່າງ:**
```java
static double area(double width, double height) {   // ມີ return
    return width * height;
}

static void greet(String name) {                      // void ບໍ່ return
    System.out.println("ສະບາຍດີ " + name);
}

// ເອີ້ນໃຊ້
System.out.println("area=" + area(5, 4));   // area=20.0
greet("Phet");                              // ສະບາຍດີ Phet
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ (PanelProduct):**
- `checkInputs()` — ຂຽນຄັ້ງດຽວ ໃຊ້ທັງປຸ່ມ **ເພີ່ມ** ແລະ **ແກ້ໄຂ**
- `clearForm()` — ໃຊ້ໃນ 4 ບ່ອນ: ປຸ່ມຍົກເລີກ, ຫຼັງເພີ່ມ, ຫຼັງແກ້ໄຂ, ຫຼັງລຶບ
- `tableUpdate()` — ໂຫຼດຕາຕະລາງໃໝ່ຫຼັງທຸກການປ່ຽນແປງ

---

## ຂໍ້ 8. Polymorphism ແມ່ນຫຍັງ? ພ້ອມຕົວຢ່າງ

**Polymorphism (ຫຼາຍຮູບແບບ)** ແມ່ນຄວາມສາມາດທີ່ **method ຊື່ດຽວກັນ ເຮັດວຽກໄດ້ຫຼາຍແບບ** ຂຶ້ນກັບ parameter ຫຼື object ທີ່ໃຊ້; ມີ 2 ແບບ:

| | Overloading | Overriding |
|---|---|---|
| ຊື່ອື່ນ | Compile-time polymorphism | Runtime polymorphism |
| ຄວາມໝາຍ | method **ຊື່ດຽວກັນ ໃນ class ດຽວກັນ** ແຕ່ parameter ຕ່າງກັນ (ຈຳນວນ ຫຼື ຊະນິດ) | class ລູກ **ຂຽນ method ຂອງ class ແມ່ໃໝ່** (ຊື່ ແລະ parameter ຄືເກົ່າ) |
| ຕ້ອງມີ Inheritance | ບໍ່ຕ້ອງ | ຕ້ອງ |

**ຕົວຢ່າງ Overloading:**
```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

Calculator c = new Calculator();
c.add(1, 2);        // 3
c.add(1.5, 2.5);    // 4.0
c.add(1, 2, 3);     // 6
```

**ຕົວຢ່າງ Overriding:**
```java
abstract class Animal {
    protected String name;
    Animal(String name) { this.name = name; }
    abstract String sound();
    void show() { System.out.println(name + " : " + sound()); }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override String sound() { return "Woof"; }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    @Override String sound() { return "Meow"; }
}

Animal[] animals = { new Dog("Lucky"), new Cat("Tom") };
for (Animal a : animals) a.show();
// Lucky : Woof
// Tom : Meow     ← ຕົວປ່ຽນຊະນິດ Animal ດຽວກັນ ແຕ່ເຮັດວຽກຕ່າງກັນ
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ (PanelProduct):** override `isCellEditable()` ຂອງ `DefaultTableModel` ເພື່ອກຳນົດຖັນທີ່ແກ້ໄດ້; override `keyReleased()` ຂອງ `KeyAdapter`
**ຕົວຢ່າງ Overloading ທີ່ໃຊ້ຢູ່ແລ້ວ:** `JOptionPane.showMessageDialog(this, e)` (2 parameter) ແລະ `showMessageDialog(this, msg, title, type)` (4 parameter)

---

## ຂໍ້ 9. ຫຼັກການ OOP (Object-Oriented Programming)

**OOP** = ການຂຽນໂປຣແກຣມໂດຍມອງລະບົບເປັນ **object (ວັດຖຸ)** ແຕ່ລະ object ມີ **attribute (ຂໍ້ມູນ/ຄຸນລັກສະນະ)** ແລະ **method (ພຶດຕິກຳ)**, ສ້າງ object ຈາກ **class (ແມ່ແບບ)**

**4 ຫຼັກການ:**

| ຫຼັກການ | ຄວາມໝາຍ | ໃນ Java | ຕົວຢ່າງຈາກໂປຣເຈັກ |
|---|---|---|---|
| **Encapsulation** | ຫຸ້ມຫໍ່ຂໍ້ມູນ + method ໄວ້ໃນ class ແລະ **ເຊື່ອງຂໍ້ມູນ** ບໍ່ໃຫ້ພາຍນອກແຕະໂດຍກົງ | `private` + getter/setter | `private javax.swing.JButton btnLogin;` |
| **Inheritance** | class ລູກ **ສືບທອດ** attribute ແລະ method ຈາກ class ແມ່ | `extends` | `Login extends JFrame`, `PanelProduct extends JPanel` |
| **Polymorphism** | method ດຽວກັນ ເຮັດວຽກໄດ້ຫຼາຍຮູບແບບ | overloading, overriding | override `isCellEditable()` |
| **Abstraction** | ສະແດງແຕ່ສິ່ງທີ່ຈຳເປັນ **ເຊື່ອງລາຍລະອຽດ** ການເຮັດວຽກ | `abstract class`, `interface` | ໃຊ້ `BCrypt.checkpw()` ໂດຍບໍ່ຕ້ອງຮູ້ວ່າ hash ແນວໃດ |

**ຂໍ້ດີຂອງ OOP:** ໃຊ້ຊ້ຳໄດ້ (Reuse), ພັດທະນາໄວ (Rapid Delivery), ດູແລຮັກສາງ່າຍ (Maintainable), ຄຸນນະພາບສູງ, ໃຊ້ງານງ່າຍ

**Class vs Object:** class = ແມ່ແບບ (ແບບແປ້ນເຮືອນ), object = ສິ່ງທີ່ສ້າງຈາກແມ່ແບບ (ເຮືອນແຕ່ລະຫຼັງ)
```java
Student s1 = new Student("001", "Bounkong", 3.5);   // s1 ເປັນ object ຂອງ class Student
```

---

## ຂໍ້ 10. ຄວາມແຕກຕ່າງລະຫວ່າງ Abstract Class ແລະ Interface

| ຫົວຂໍ້ | Abstract Class | Interface |
|---|---|---|
| ຄຳສັ່ງ | `abstract class` | `interface` |
| ການສືບທອດ | `extends` — ສືບທອດໄດ້ **ພຽງ 1 class** | `implements` — implement ໄດ້ **ຫຼາຍ interface** |
| Method | ມີທັງ abstract method ແລະ method ປົກກະຕິ | ສ່ວນໃຫຍ່ເປັນ abstract (ມີ `default`/`static` ໄດ້ຕັ້ງແຕ່ Java 8, `private` ຕັ້ງແຕ່ Java 9) |
| ຕົວປ່ຽນ | ມີຕົວປ່ຽນປົກກະຕິໄດ້ (ເກັບ state) | ໄດ້ແຕ່ຄ່າຄົງທີ່ (`public static final` ອັດຕະໂນມັດ) |
| Constructor | **ມີໄດ້** | **ບໍ່ມີ** |
| Access modifier | ໃຊ້ໄດ້ທຸກແບບ | method ເປັນ `public` ອັດຕະໂນມັດ |
| ສ້າງ object ໂດຍກົງ | ບໍ່ໄດ້ ທັງສອງ | ບໍ່ໄດ້ ທັງສອງ |
| ໃຊ້ເມື່ອ | class ຫຼາຍຕົວ **ເປັນປະເພດດຽວກັນ** ແລະ ມີໂຄ້ດຮ່ວມກັນ ("is-a") | class ຕ່າງປະເພດ ແຕ່ **ມີຄວາມສາມາດດຽວກັນ** ("can-do") |

**ຕົວຢ່າງ Abstract Class:** `Animal` ໃນຂໍ້ 8 (ມີ constructor, ຕົວປ່ຽນ `name`, method ປົກກະຕິ `show()` ແລະ abstract method `sound()`)

**ຕົວຢ່າງ Interface:**
```java
interface Payable {
    double TAX = 0.1;      // public static final ອັດຕະໂນມັດ
    double pay();          // public abstract ອັດຕະໂນມັດ
}

class Employee implements Payable {
    private double salary;
    Employee(double salary) { this.salary = salary; }
    @Override
    public double pay() { return salary - salary * TAX; }
}

Payable p = new Employee(5_000_000);
p.pay();   // 4500000.0
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ:** `ActionListener` ເປັນ interface — `btnAdd.addActionListener(this::btnAddActionPerformed)` ໃຊ້ method reference ແທນການຂຽນ class ທີ່ implement ActionListener

---

## ຂໍ້ 11. Array ແມ່ນຫຍັງ? ພ້ອມຕົວຢ່າງການສ້າງ

**Array** ແມ່ນໂຄງສ້າງຂໍ້ມູນທີ່ **ເກັບຂໍ້ມູນຊະນິດດຽວກັນໄດ້ຫຼາຍຄ່າ ພາຍໃຕ້ຊື່ດຽວ** ອ້າງອີງແຕ່ລະຄ່າດ້ວຍ **index ເລີ່ມຈາກ 0** ຫາ `length - 1`; **ຂະໜາດຄົງທີ່** ປ່ຽນບໍ່ໄດ້ຫຼັງສ້າງ

**ວິທີສ້າງ:**
```java
// ວິທີ 1: ປະກາດ + ກຳນົດຂະໜາດ ແລ້ວໃສ່ຄ່າທີລະຕົວ
int[] scores = new int[3];
scores[0] = 90;
scores[1] = 75;
scores[2] = 60;

// ວິທີ 2: ປະກາດ + ກຳນົດຄ່າເລີ່ມຕົ້ນພ້ອມກັນ
String[] provinces = {"Vientiane", "Luang Prabang", "Champasak"};

// Array 2 ມິຕິ
int[][] matrix = { {1, 2, 3}, {4, 5, 6} };
matrix[1][2];   // 6 (ແຖວ 1 ຖັນ 2)

// ວົນອ່ານທຸກຄ່າ
int sum = 0;
for (int s : scores) sum += s;            // sum = 225
provinces.length;                         // 3
provinces[provinces.length - 1];          // "Champasak"
```

- ຄ່າເລີ່ມຕົ້ນ: `int` → 0, `double` → 0.0, `boolean` → false, `String` → null
- ໃຊ້ index ເກີນ → `ArrayIndexOutOfBoundsException`
- ຖ້າຕ້ອງການຂະໜາດທີ່ຂະຫຍາຍໄດ້ → ໃຊ້ `ArrayList`

**ຕົວຢ່າງຈາກໂປຣເຈັກ:** `d.addRow(new Object[]{...})`, `boolean[] canEdit = {...}`, `new String[] { "ມີ", "ບໍ່ມີ" }`

---

## ຂໍ້ 12. Constructor ແມ່ນຫຍັງ? ໃຊ້ເພື່ອຫຍັງ?

**Constructor** ແມ່ນ **method ພິເສດ** ທີ່ເຮັດວຽກ **ອັດຕະໂນມັດເມື່ອສ້າງ object ດ້ວຍ `new`** ໃຊ້ເພື່ອ **ກຳນົດຄ່າເລີ່ມຕົ້ນ** ໃຫ້ object

**ລັກສະນະ:**
- ຊື່ **ດຽວກັນກັບ class**
- **ບໍ່ມີ return type** (ແມ່ນແຕ່ `void` ກໍບໍ່ມີ)
- ເຮັດວຽກຄັ້ງດຽວຕໍ່ 1 object
- ຖ້າບໍ່ຂຽນ Java ສ້າງ **default constructor** (ບໍ່ມີ parameter) ໃຫ້ອັດຕະໂນມັດ
- **Overload** ໄດ້ (ມີຫຼາຍ constructor ທີ່ parameter ຕ່າງກັນ)

```java
class Student {
    private String id;
    private String name;
    private double gpa;

    public Student() {                                       // constructor ບໍ່ມີ parameter
        this("000", "ບໍ່ມີຊື່", 0.0);                          // ເອີ້ນ constructor ອີກຕົວ
    }

    public Student(String id, String name, double gpa) {     // constructor ມີ parameter
        this.id = id;          // this.id = attribute, id = parameter
        this.name = name;
        setGpa(gpa);
    }
    // ...
}

Student s1 = new Student("001", "Bounkong", 3.5);
Student s2 = new Student();          // name = "ບໍ່ມີຊື່"
```

**ຕົວຢ່າງຈາກໂປຣເຈັກ:**
- `public Login() { initComponents(); ... }` — ກຽມໜ້າຈໍ Login ຕອນ `new Login()`
- `public PanelProduct() { ... tableUpdate(); }` — ໂຫຼດຂໍ້ມູນສິນຄ້າຕອນເປີດໜ້າ
- `new Main(rs.getString(1), rs.getString(2), rs.getString(3))` — ສົ່ງຂໍ້ມູນພະນັກງານຜ່ານ constructor

---

## ຂໍ້ 13. Exception Handling ແມ່ນຫຍັງ? ໃຊ້ `try-catch-finally` ແນວໃດ?

**Exception** = ຂໍ້ຜິດພາດທີ່ເກີດ **ລະຫວ່າງໂປຣແກຣມເຮັດວຽກ** (runtime) ເຊັ່ນ ຫານດ້ວຍ 0, ແປງ "abc" ເປັນຕົວເລກ, ເຊື່ອມ DB ບໍ່ໄດ້
**Exception Handling** = ການ **ຈັບ ແລະ ຈັດການ** ຂໍ້ຜິດພາດ ເພື່ອບໍ່ໃຫ້ໂປຣແກຣມ crash

| ບລັອກ | ໜ້າທີ່ |
|---|---|
| `try` | ໃສ່ໂຄ້ດທີ່ **ອາດເກີດ** ຂໍ້ຜິດພາດ |
| `catch` | ເຮັດວຽກ **ເມື່ອເກີດ** ຂໍ້ຜິດພາດ (ມີຫຼາຍ catch ໄດ້) |
| `finally` | ເຮັດວຽກ **ສະເໝີ** ບໍ່ວ່າຈະຜິດພາດ ຫຼື ບໍ່ (ໃຊ້ປິດ resource) |

```java
try {
    int x = 10 / 0;                        // ເກີດ ArithmeticException
    System.out.println(x);                 // ບໍ່ໄດ້ເຮັດ
} catch (ArithmeticException e) {
    System.out.println("ຜິດພາດ: " + e.getMessage());
} finally {
    System.out.println("finally ເຮັດວຽກສະເໝີ");
}
// ຜົນ:
// ຜິດພາດ: / by zero
// finally ເຮັດວຽກສະເໝີ

try {
    int n = Integer.parseInt("abc");
} catch (NumberFormatException e) {
    System.out.println("NumberFormatException: " + e.getMessage());
}
// ຜົນ: NumberFormatException: For input string: "abc"
```

**ປະເພດ Exception:**
- **Checked** — compiler ບັງຄັບໃຫ້ຈັບ ເຊັ່ນ `SQLException`, `IOException`
- **Unchecked** (RuntimeException) — ບໍ່ບັງຄັບ ເຊັ່ນ `ArithmeticException`, `NullPointerException`, `ArrayIndexOutOfBoundsException`

**ຕົວຢ່າງຈາກໂປຣເຈັກ (PanelProduct ປຸ່ມລຶບ):**
```java
} catch (SQLException e) {
    if (e.getErrorCode() == 1451) {          // ສິນຄ້າຖືກໃຊ້ຢູ່ (Foreign Key)
        JOptionPane.showMessageDialog(this, "ບໍ່ສາມາດລືບສິນຄ້ານີ້ໄດ້ ເນື່ອງຈາກ ຖືກນຳໃຊ້ຢູ່", ...);
    } else {
        JOptionPane.showMessageDialog(this, e);
    }
}
```

---

## ຂໍ້ 14. ຫຼັກການ Encapsulation ແລະ ປະໂຫຍດ

**Encapsulation (ການຫຸ້ມຫໍ່)** ແມ່ນການ **ລວມຂໍ້ມູນ (attribute) ແລະ method ໄວ້ໃນ class ດຽວ** ແລະ **ເຊື່ອງຂໍ້ມູນ (Information Hiding)** ບໍ່ໃຫ້ພາຍນອກເຂົ້າເຖິງໂດຍກົງ — ຕ້ອງຜ່ານ method ທີ່ອະນຸຍາດເທົ່ານັ້ນ

**ວິທີເຮັດ:**
1. ປະກາດ attribute ເປັນ **`private`**
2. ສ້າງ **getter** (ອ່ານຄ່າ) ແລະ **setter** (ກຳນົດຄ່າ) ເປັນ `public`
3. ໃສ່ **ການກວດສອບ** ໃນ setter

```java
class Student {
    private double gpa;                     // ພາຍນອກແຕະໂດຍກົງບໍ່ໄດ້

    public double getGpa() {                // getter
        return gpa;
    }

    public void setGpa(double gpa) {        // setter + ກວດສອບ
        if (gpa < 0 || gpa > 4) {
            throw new IllegalArgumentException("GPA ຕ້ອງຢູ່ລະຫວ່າງ 0 - 4");
        }
        this.gpa = gpa;
    }
}

Student s = new Student();
// s.gpa = 5;      ← compile error: gpa has private access
s.setGpa(5);       // ← ຖືກປະຕິເສດ: "GPA ຕ້ອງຢູ່ລະຫວ່າງ 0 - 4"
```

**ປະໂຫຍດ:**
1. **ປ້ອງກັນຂໍ້ມູນ** — ກັນການກຳນົດຄ່າຜິດ (ເຊັ່ນ GPA = 5, ລາຄາຕິດລົບ)
2. **ຄວບຄຸມການເຂົ້າເຖິງ** — ເລືອກໄດ້ວ່າໃຫ້ອ່ານຢ່າງດຽວ (ມີແຕ່ getter) ຫຼື ແກ້ໄດ້
3. **ແກ້ໄຂງ່າຍ** — ປ່ຽນລາຍລະອຽດພາຍໃນ class ໄດ້ໂດຍບໍ່ກະທົບໂຄ້ດພາຍນອກ
4. **ຄວາມປອດໄພ** ແລະ ຫຼຸດຂໍ້ຜິດພາດ

**Access Modifier ທີ່ໃຊ້:**
| | class ດຽວກັນ | package ດຽວກັນ | subclass | ທຸກບ່ອນ |
|---|:-:|:-:|:-:|:-:|
| `private` | ✔ | ✘ | ✘ | ✘ |
| (default) | ✔ | ✔ | ✘ | ✘ |
| `protected` | ✔ | ✔ | ✔ | ✘ |
| `public` | ✔ | ✔ | ✔ | ✔ |

**ຕົວຢ່າງຈາກໂປຣເຈັກ:** component ທັງໝົດເປັນ `private` (`private javax.swing.JTextField txtBarcode;`) ແລະ method ຊ່ວຍເຊັ່ນ `private void clearForm()` — class ອື່ນເອີ້ນບໍ່ໄດ້

---

## ຂໍ້ 15. ວິທີເຊື່ອມຕໍ່ Java ກັບ MySQL ໂດຍໃຊ້ JDBC

**JDBC (Java Database Connectivity)** = API ມາດຕະຖານຂອງ Java ສຳລັບເຊື່ອມຕໍ່ ແລະ ສັ່ງງານຖານຂໍ້ມູນ (package `java.sql`)

**ຂັ້ນຕອນ:**

**1) ເພີ່ມ MySQL Driver** — ດາວໂຫຼດ **MySQL Connector/J** (`mysql-connector-j-x.x.x.jar`) ແລ້ວເພີ່ມໃນ Libraries ຂອງໂປຣເຈັກ (NetBeans: ຄລິກຂວາ Libraries → Add JAR/Folder) ຫຼື ໃສ່ dependency ໃນ Maven
> ✅ ທົດສອບແລ້ວ: ຖ້າບໍ່ມີ driver ຈະ error `No suitable driver found for jdbc:mysql://...`

**2) ເຊື່ອມຕໍ່ດ້ວຍ `DriverManager.getConnection(url, user, password)`**
- URL: `jdbc:mysql://host:port/ຊື່ຖານຂໍ້ມູນ` ເຊັ່ນ `jdbc:mysql://localhost:3306/shop_db`
- ຕັ້ງແຕ່ JDBC 4.0 **ບໍ່ຈຳເປັນ** ຕ້ອງຂຽນ `Class.forName("com.mysql.cj.jdbc.Driver")` ແລ້ວ (driver ໂຫຼດອັດຕະໂນມັດ)

**3) ສ້າງ `PreparedStatement`** ແລະ ໃສ່ຄ່າແທນ `?`

**4) ລັນຄຳສັ່ງ**
- `executeQuery()` → SELECT → ໄດ້ `ResultSet`
- `executeUpdate()` → INSERT / UPDATE / DELETE → ໄດ້ຈຳນວນແຖວ (int)

**5) ອ່ານຜົນ** ດ້ວຍ `while (rs.next())` ແລະ `rs.getString(...)`, `rs.getInt(...)`, `rs.getDouble(...)`

**6) ປິດ resource** (`ResultSet` → `PreparedStatement` → `Connection`) — ໃຊ້ **try-with-resources** ປິດໃຫ້ອັດຕະໂນມັດ

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcDemo {
    private static final String URL = "jdbc:mysql://localhost:3306/shop_db";
    private static final String USER = System.getenv("DB_USER");          // ບໍ່ hardcode ລະຫັດຜ່ານໃນໂຄ້ດ
    private static final String PASSWORD = System.getenv("DB_PASSWORD");

    // ຂັ້ນທີ 2: ເຊື່ອມຕໍ່
    public static Connection connectDB() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void main(String[] args) {
        String sql = "SELECT barcode, product_name, retail_price FROM product WHERE retail_price > ?";

        // ຂັ້ນທີ 6: try-with-resources ປິດ conn ແລະ pst ໃຫ້ອັດຕະໂນມັດ
        try (Connection conn = connectDB();
             PreparedStatement pst = conn.prepareStatement(sql)) {   // ຂັ້ນທີ 3

            pst.setDouble(1, 10000);                                  // ໃສ່ຄ່າແທນ ? ຕົວທີ 1

            try (ResultSet rs = pst.executeQuery()) {                 // ຂັ້ນທີ 4
                while (rs.next()) {                                   // ຂັ້ນທີ 5
                    System.out.println(rs.getString("barcode") + " | "
                            + rs.getString("product_name") + " | "
                            + rs.getDouble("retail_price"));
                }
            }
        } catch (SQLException e) {
            System.out.println("ເຊື່ອມຕໍ່ຖານຂໍ້ມູນບໍ່ໄດ້: " + e.getMessage());
        }
    }
}
```

**ຈຸດສຳຄັນທີ່ຄວນບອກອາຈານ:**
- ໃຊ້ **`PreparedStatement` + `?`** ແທນການຕໍ່ String → ກັນ **SQL Injection**
- ດັດຊະນີ `?` ແລະ ຖັນໃນ `ResultSet` **ນັບຈາກ 1** (ບໍ່ແມ່ນ 0)
- ຕ້ອງ **ປິດ connection** ທຸກຄັ້ງ ບໍ່ດັ່ງນັ້ນ connection ຈະເຕັມ

**ຕົວຢ່າງຈາກໂປຣເຈັກ:** `MysqlConnect.connectDB()` ສົ່ງຄືນ `Connection` → `Login` ໃຊ້ SELECT ກວດ username, `PanelProduct` ໃຊ້ INSERT / SELECT / UPDATE / DELETE

---

## ອ້າງອີງ

- Java Tutorials (Oracle) — https://docs.oracle.com/javase/tutorial/
- JVM / JRE / JDK — https://docs.oracle.com/en/java/javase/21/install/overview-jdk-installation.html
- Primitive Data Types — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
- Variables — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html
- if-then-else — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html
- while / do-while — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html
- for — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html
- Defining Methods — https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html
- Polymorphism — https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html
- Overriding and Hiding Methods — https://docs.oracle.com/javase/tutorial/java/IandI/override.html
- OOP Concepts — https://docs.oracle.com/javase/tutorial/java/concepts/
- Abstract Methods and Classes (ປຽບທຽບກັບ Interface) — https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html
- Interfaces — https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html
- Arrays — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html
- Constructors — https://docs.oracle.com/javase/tutorial/java/javaOO/constructors.html
- Exceptions — https://docs.oracle.com/javase/tutorial/essential/exceptions/
- Controlling Access (Access Modifier) — https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html
- JDBC Basics — https://docs.oracle.com/javase/tutorial/jdbc/basics/
- MySQL Connector/J: Connecting with DriverManager — https://dev.mysql.com/doc/connector-j/en/connector-j-usagenotes-connect-drivermanager.html
- OWASP SQL Injection Prevention — https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
