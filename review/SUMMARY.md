# ສະຫຼຸບທົບທວນ Java ບົດທີ 1–6

ອີງຕາມເອກະສານປະກອບການສອນ chapter 1–6 (Google Drive) ຂອງ ອຈ. ສຸກສະຫວັນ ຈັນດາລີ.
ຂໍ້ທີ່ໝາຍ ✅ ໄດ້ທົດສອບດ້ວຍ JDK 21 ແລ້ວ.

---

## ບົດທີ 1 — ແນະນຳພາສາ Java

**ຈຸດເດັ່ນຂອງ Java**
| ຄຸນສົມບັດ | ຄວາມໝາຍ |
|---|---|
| Simple | ບໍ່ມີ pointer, ມີ garbage collection ຈັດການໜ່ວຍຄວາມຈຳອັດຕະໂນມັດ |
| Portable | "Write Once, Run Anywhere" — bytecode ລັນໄດ້ທຸກ OS ທີ່ມີ JVM |
| Object Oriented | ຂຽນໂປຣແກຣມເຊີງວັດຖຸ |
| Dynamic | ເພີ່ມ/ປັບປຸງ library ໄດ້ງ່າຍ |
| Multithreading | ເຮັດຫຼາຍວຽກພ້ອມກັນໄດ້ |
| Code Security | ກວດ bytecode ກ່ອນລັນ (Bytecode Verifier) |

**ຂະບວນການ:** `Hello.java` (source code) → `javac` (compiler) → `Hello.class` (bytecode) → `java` (JVM) → ລັນໃນ Windows / Linux / Mac

**3 ອົງປະກອບ (ຕ້ອງຈື່!)**
- **JVM** — ແປ bytecode ເປັນພາສາເຄື່ອງ (interpreter)
- **JRE** = JVM + library ສຳລັບ **ລັນ**. ເຮັດວຽກ 3 ຂັ້ນ: Class Loader (ໂຫຼດ) → Bytecode Verifier (ກວດ) → Runtime Interpreter (ລັນ)
- **JDK** = JRE + ເຄື່ອງມື **ພັດທະນາ** ເຊັ່ນ `javac.exe` (compiler), `java.exe` (launcher) — ບໍ່ມີ Editor ມາໃຫ້
- ສະຫຼຸບ: **JDK ⊃ JRE ⊃ JVM**

**3 Platform:** Java SE (Standard), Java EE (Enterprise — ປັດຈຸບັນປ່ຽນຊື່ເປັນ Jakarta EE), Java ME (Micro)

---

## ບົດທີ 2 — OOP

**ຂໍ້ດີ OOP (5 ຂໍ້):** Reuse, Rapid Delivery, User Friendly, More Maintainable, Greater Quality

**4 ຫຼັກການ OOP (ອອກສອບແນ່ນອນ)**
| ຫຼັກການ | ສັ້ນໆ |
|---|---|
| Abstraction | ໃຊ້ງານຜ່ານ attribute/method ໂດຍບໍ່ຕ້ອງຮູ້ລາຍລະອຽດພາຍໃນ (ເຊັ່ນ ໃຊ້ TextField ໂດຍບໍ່ສົນວ່າຂຽນແນວໃດ) |
| Encapsulation | ຫຸ້ມຫໍ່ + ເຊື່ອງຂໍ້ມູນ (information hiding) ດ້ວຍ access modifier |
| Inheritance | class ລູກສືບທອດ attribute/method ຈາກ class ແມ່ (`extends`) |
| Polymorphism | ມີໄດ້ຫຼາຍຮູບແບບ — overloading (ຊື່ method ດຽວກັນ ແຕ່ parameter ຕ່າງກັນ) ແລະ overriding (class ລູກຂຽນ method ຂອງແມ່ໃໝ່) |

**Structured vs OOP**
| Structured | OOP |
|---|---|
| ເນັ້ນຂັ້ນຕອນ/function | ເນັ້ນແບ່ງເປັນວັດຖຸ (object) |
| ໃຊ້ຂໍ້ມູນຮ່ວມກັນ | ຊ່ອນຂໍ້ມູນ (information hiding) |
| ແຍກຂໍ້ມູນອອກຈາກ function | ຫຸ້ມຫໍ່ຂໍ້ມູນ (encapsulation) |
| ຕົວຢ່າງ: ລົງທະບຽນ, ຊຳລະເງິນ, ເພີ່ມວິຊາ | ຕົວຢ່າງ: ນັກສຶກສາ, ໃບລົງທະບຽນ, ລາຍວິຊາ, ໃບຮັບເງິນ |

**Class vs Object:** class = ແມ່ແບບ, object = ສິ່ງທີ່ສ້າງຈາກແມ່ແບບ

```java
public class Student {                 // ປະກາດ class
    private String name;               // attribute
    public void setName(String n) {    // method (void = ບໍ່ສົ່ງຄ່າກັບ)
        name = n;
    }
    public String getName() {          // method ທີ່ return String
        return name;
    }
}

Student s = new Student();             // ສ້າງ object
s.setName("Bounkong");                 // ObjectName.MethodName(argument)
```

**Non-access modifier**
- `static` attribute — ສ້າງຄັ້ງດຽວ, ທຸກ object ໃຊ້ຮ່ວມກັນ
- `static` method — ເອີ້ນຜ່ານຊື່ class ໄດ້ເລີຍ ບໍ່ຕ້ອງສ້າງ object (ເຊັ່ນ `Math.sqrt()`)
- `final` attribute — ປ່ຽນຄ່າບໍ່ໄດ້ / `final` class — ສືບທອດບໍ່ໄດ້ / `final` method — override ບໍ່ໄດ້

**Access modifier (ຈື່ຕາຕະລາງນີ້)**
| Modifier | class ດຽວກັນ | package ດຽວກັນ | subclass ນອກ package | ນອກ package |
|---|:-:|:-:|:-:|:-:|
| `public` | ✔ | ✔ | ✔ | ✔ |
| `protected` | ✔ | ✔ | ✔ | ✘ |
| (ບໍ່ຂຽນ = package/default) | ✔ | ✔ | ✘ | ✘ |
| `private` | ✔ | ✘ | ✘ | ✘ |

**Package:** `package packageName;` (ຢູ່ແຖວທຳອິດຂອງໄຟລ໌), ໃຊ້ class ຕ່າງ package ດ້ວຍ `import`

---

## ບົດທີ 3 — ຕົວປ່ຽນ, ຊະນິດຂໍ້ມູນ, Operator

**ປະກາດຕົວປ່ຽນ:** `DataType varName;` / `DataType a, b, c;` / `DataType varName = value;`

**Primitive type (8 ຊະນິດ)**
| ຊະນິດ | ຂະໜາດ | ໝາຍເຫດ |
|---|---|---|
| `byte` | 1 byte | -128 ຫາ 127 |
| `short` | 2 byte | -32,768 ຫາ 32,767 |
| `int` | 4 byte | ປະມານ ±2.1 ພັນລ້ານ (2,147,483,647) |
| `long` | 8 byte | ຕ້ອງມີ `L` ທ້າຍຕົວເລກໃຫຍ່: `long d = 9000000000L;` |
| `float` | 4 byte | ຕ້ອງມີ `F`: `float c = 200.5F;` |
| `double` | 8 byte | ຄ່າເລີ່ມຕົ້ນຂອງເລກທົດສະນິຍົມ |
| `char` | 2 byte | Unicode, ໃຊ້ `'A'` (single quote) ຫຼື `'A'` |
| `boolean` | — | `true` / `false` ເທົ່ານັ້ນ |

`String` **ບໍ່ແມ່ນ primitive** — ເປັນ class (reference type), ໃຊ້ `"..."` (double quote)

**ກົດການຕັ້ງຊື່ຕົວປ່ຽນ**
- ປະກອບດ້ວຍ A-Z, a-z, 0-9, `_`, `$`
- ຕ້ອງ **ຂຶ້ນຕົ້ນ** ດ້ວຍຕົວອັກສອນ, `_` ຫຼື `$` ເທົ່ານັ້ນ (ຫ້າມຂຶ້ນຕົ້ນດ້ວຍຕົວເລກ)
- ຫ້າມມີຍະຫວ່າງ, ຫ້າມໃຊ້ keyword (`int`, `class`, `for` ...)
- ຕົວພິມໃຫຍ່-ນ້ອຍ ຕ່າງກັນ (`Age` ≠ `age`)

**ຄ່າຄົງທີ່:** `final double PI = 3.14;`

**ການແປງຊະນິດຂໍ້ມູນ**
- **Implicit** (ອັດຕະໂນມັດ) — ຈາກນ້ອຍໄປໃຫຍ່: `byte → short → int → long → float → double` (ແລະ `char → int`)
- **Explicit** (casting) — ຈາກໃຫຍ່ໄປນ້ອຍ: `int x = (int) 3.99;` → ໄດ້ `3` (ຕັດທົດສະນິຍົມ ບໍ່ປັດ) ✅
- **Wrapper class:** `Integer.parseInt("10")`, `Double.parseDouble("2.5")`, `Float.parseFloat()` (String → ຕົວເລກ) / `Integer.toString(10)` (ຕົວເລກ → String)

**Operator**
- Arithmetic: `+ - * / %` — `13 % 5 = 3`, `7 / 2 = 3` (int ÷ int ໄດ້ int), `7 / 2.0 = 3.5` ✅
- Assignment: `= += -= *= /= %=`
- Unary: `b = 5; x = b++;` → x = 5 (ໃຊ້ກ່ອນ ບວກທີຫຼັງ) / `y = ++b;` → ບວກກ່ອນ ໃຊ້ທີຫຼັງ ✅
- Comparison: `== != > < >= <=` (ຜົນເປັນ boolean) — `'t' < 's'` = false ເພາະ 't'=116, 's'=115 ✅
- Logical: `&&` (ຈິງທັງສອງ), `||` (ຈິງອັນໃດອັນໜຶ່ງ), `!` (ກົງກັນຂ້າມ)
- Bitwise: `&` `|` `^` `<<` `>>` `>>>` — `6&3=2`, `6|3=7`, `6^3=5`, `1<<3=8` ✅

**ລຳດັບຄວາມສຳຄັນ (ສູງ → ຕ່ຳ):** `() []` → `++ -- !` → `* / %` → `+ -` → `<< >> >>>` → `< <= > >=` → `== !=` → `&` → `^` → `|` → `&&` → `||` → `?:` → `= += -= ...` (assignment ເຮັດຈາກຂວາໄປຊ້າຍ)

---

## ບົດທີ 4 — Output / Input

**Output**
- `System.out.println(...)` — ພິມແລ້ວຂຶ້ນແຖວໃໝ່ / `System.out.print(...)` — ບໍ່ຂຶ້ນແຖວໃໝ່
- ຕໍ່ຂໍ້ຄວາມດ້ວຍ `+`: `1 + 2 + "3"` = `"33"` ແຕ່ `"1" + 2 + 3` = `"123"` ✅ (ເຮັດຈາກຊ້າຍໄປຂວາ)

**Escape sequence** (ທີ່ Java ຮອງຮັບແທ້)
| | ຄວາມໝາຍ |
|---|---|
| `\n` | ຂຶ້ນແຖວໃໝ່ |
| `\t` | tab |
| `\b` | backspace |
| `\r` | carriage return |
| `\f` | form feed |
| `\'` `\"` `\\` | ພິມ ' " \ |
| `\101` | octal → 'A' |
| `A` | Unicode (hex 4 ຕົວ) → 'A' |

**JOptionPane** (`import javax.swing.JOptionPane;`)
- `showMessageDialog(parent, message, title, type)` — ສະແດງຂໍ້ຄວາມ, parent = `null` → ສະແດງກາງຈໍ
- type: `ERROR_MESSAGE`, `INFORMATION_MESSAGE`, `PLAIN_MESSAGE`, `QUESTION_MESSAGE`, `WARNING_MESSAGE`
- `showInputDialog(...)` — ຮັບຂໍ້ມູນ, **return ເປັນ String ສະເໝີ** → ຖ້າຕ້ອງການເລກ ຕ້ອງ `Integer.parseInt()`
- `showConfirmDialog(...)` — ກົດຕົກລົງ/Yes ໄດ້ຄ່າ `0` (`YES_OPTION` = `OK_OPTION` = 0) ✅

**Scanner** (`import java.util.Scanner;`)
```java
Scanner keyboard = new Scanner(System.in);
int a = keyboard.nextInt();
double b = keyboard.nextDouble();
String s = keyboard.nextLine();
```
method: `nextByte() nextShort() nextInt() nextLong() nextFloat() nextDouble() nextLine()` — ເລືອກໃຫ້ກົງກັບຊະນິດຕົວປ່ຽນ

⚠️ ກັບດັກ: ເອີ້ນ `nextLine()` ຫຼັງ `nextInt()` ຈະໄດ້ String ຫວ່າງ ເພາະ Enter ທີ່ຄ້າງຢູ່ → ແກ້ໂດຍເອີ້ນ `keyboard.nextLine();` ເປົ່າໆ 1 ຄັ້ງກ່ອນ

**DecimalFormat** (`import java.text.DecimalFormat;`)
```java
DecimalFormat df = new DecimalFormat("#,##0.00");
String str = df.format(1500000);   // "1,500,000.00"
```

---

## ບົດທີ 5 — Control Statement

**3 ໂຄງສ້າງ:** Sequential (ລຽງລຳດັບ), Selection (ທາງເລືອກ), Repetition (ວົນຮອບ)

**Selection**
```java
if (age == 10) { ... }
if (age == 10) { ... } else { ... }
if (v == 10) { ... } else if (v > 10) { ... } else if (v < 5) { ... } else { ... }

switch (x) {          // ຕົວພິມນ້ອຍ switch
    case 1:  ...; break;
    case 2:  ...; break;
    default: ...;     // ເມື່ອບໍ່ກົງ case ໃດ
}
```
⚠️ ລືມ `break` → ຈະເຮັດ case ຖັດໄປຕໍ່ (fall-through)

**Repetition**
| | ກວດເງື່ອນໄຂ | ລັນຢ່າງໜ້ອຍ |
|---|---|---|
| `while` | ກ່ອນເຂົ້າ loop | 0 ຮອບ |
| `do ... while` | ຫຼັງລັນ loop | **1 ຮອບ** |
| `for` | ກ່ອນເຂົ້າ loop | 0 ຮອບ — ເໝາະເມື່ອຮູ້ຈຳນວນຮອບ |

```java
int sum = 0;
for (int number = 1; number <= 10; number++) {
    sum += number;
}
// sum = 55
```
`do { ... } while (ເງື່ອນໄຂ);` ← ມີ `;` ທ້າຍ

Exercise 1–3 ເບິ່ງຄຳຕອບໃນ `exercises/chapter5/`

<!-- include:exercises -->

---

## ບົດທີ 6 — Array ແລະ ArrayList

**Array** = ເກັບຂໍ້ມູນ **ຊະນິດດຽວກັນ** ຫຼາຍຄ່າ ໃນຊື່ດຽວ, ອ້າງອີງດ້ວຍ index ເລີ່ມຈາກ **0** ຫາ **length − 1**

- ແບ່ງຕາມຊະນິດ: Array of Primitive (`int[]`, `char[]`) / Array of Reference (`String[]`, `Student[]`)
- ແບ່ງຕາມມິຕິ: 1 ມິຕິ / ຫຼາຍມິຕິ

```java
int[] x = new int[5];                 // ປະກາດ + ສ້າງ (ຂະໜາດ 5)
int y[] = {77, 90};                   // ປະກາດ + ກຳນົດຄ່າເລີ່ມຕົ້ນ
String[] p = {"Vientiane", "Bolikhamxay", "Khammuane"};
int[][] m = new int[3][4];            // 2 ມິຕິ: 3 ແຖວ 4 ຖັນ

for (int i = 0; i < x.length; i++) {  // length ບໍ່ມີ ()
    System.out.println(x[i]);
}
```
- ຄ່າເລີ່ມຕົ້ນອັດຕະໂນມັດ: `int`→0, `double`→0.0, `boolean`→false, `char`→'\u0000', `String`/object→`null` ✅
- `m.length` = 3 (ຈຳນວນແຖວ), `m[0].length` = 4 (ຈຳນວນຖັນ) ✅
- ໃຊ້ index ເກີນ → `ArrayIndexOutOfBoundsException`
- Array **ປ່ຽນຂະໜາດບໍ່ໄດ້** ຫຼັງສ້າງແລ້ວ

**Copy array:** `b = a;` **ບໍ່ແມ່ນການ copy** — ເປັນການໃຫ້ b ຊີ້ໄປ array ດຽວກັນກັບ a (ແກ້ b ແລ້ວ a ປ່ຽນນຳ ✅) → ຕ້ອງ copy ທີລະຕົວດ້ວຍ loop ຫຼືໃຊ້ `a.clone()` / `Arrays.copyOf(a, a.length)` / `System.arraycopy(...)`

**ArrayList** (`import java.util.ArrayList;`) — ຂະຫຍາຍຂະໜາດເອງອັດຕະໂນມັດ, ເກັບ object ເທົ່ານັ້ນ
```java
ArrayList<String> list = new ArrayList<>();
list.add("A");            // ເພີ່ມທ້າຍ
list.add(0, "B");         // ເພີ່ມທີ່ index 0
list.get(1);              // ເອົາຄ່າທີ່ index 1
list.remove(0);           // ລຶບທີ່ index 0
list.indexOf("A");        // ຫາ index (ບໍ່ພົບ = -1)
list.size();              // ຈຳນວນສະມາຊິກ (array ໃຊ້ .length)
```
⚠️ `ArrayList<Integer>`: `remove(1)` = ລຶບ index 1, `remove(Integer.valueOf(1))` = ລຶບຄ່າ 1 ✅

| | Array | ArrayList |
|---|---|---|
| ຂະໜາດ | ຄົງທີ່ | ຂະຫຍາຍເອງ |
| ຊະນິດ | primitive ຫຼື object | object ເທົ່ານັ້ນ (`Integer` ແທນ `int`) |
| ຈຳນວນ | `.length` | `.size()` |
| ເອົາຄ່າ | `a[i]` | `list.get(i)` |

---

## ⚠️ ຈຸດທີ່ສະໄລພິມຜິດ / ບໍ່ຄົບ (ຢ່າຈື່ຜິດ)

| ບົດ | ໃນສະໄລ | ທີ່ຖືກຕ້ອງ |
|---|---|---|
| 1 | "Multithead" | Multi**thread**ing |
| 1 | JDK ມີ "ລັນໄບໂຄດໂດຍໃຊ້ Runtime Interpreter" | ແຖວນີ້ copy ມາຈາກ JRE — JDK ຄື JRE + ເຄື່ອງມືພັດທະນາ (javac, java, javadoc, jar ...) |
| 2 | protected = class ດຽວກັນ + class ທີ່ສືບທອດ | protected ເຂົ້າເຖິງໄດ້ **ໃນ package ດຽວກັນ** ນຳ (ຕາຕະລາງໃນສະໄລຖືກ ແຕ່ຄຳອະທິບາຍບໍ່ຄົບ) |
| 2 | Polymorphism ອະທິບາຍແຕ່ການປ່ຽນ parameter | ນັ້ນຄື overloading; ຍັງມີ overriding ນຳ |
| 3 | `short var_1 = true; int var_2 = false;` | ✅ compile error — ຕ້ອງເປັນ `boolean var_1 = true;` |
| 3 | `long var_4 = -9,223,372,036,854,775,808;` | ✅ compile error — ໃສ່ `,` ບໍ່ໄດ້ ແລະ ຕ້ອງມີ `L`: `-9223372036854775808L` (ຂຽນ `9_223_372_036_854_775_807L` ໄດ້) |
| 3 | `float var_5 = var_3 = -3.40282347E+38;` | ຕ້ອງມີ `F`: `float var_5 = -3.4028235E38F;` (`float f = 200.5;` ✅ compile error) |
| 3 | "ຫ້າມໃສ່ເຄື່ອງໝາຍພິເສດຍົກເວັ້ນ $" | ຍົກເວັ້ນ `$` **ແລະ** `_` (ແຕ່ `_` ໂຕດຽວເປັນຊື່ບໍ່ໄດ້ ຕັ້ງແຕ່ Java 9) |
| 3 | ລຳດັບ 14: `... &=, ^=, !=` | ຕົວສຸດທ້າຍຄື `\|=` — `!=` ເປັນ comparison (ລຳດັບ 7) |
| 4 | `\v` = vertical tab | ✅ **Java ບໍ່ມີ** `\v` — compile error "illegal escape character" |
| 4 | `\065` = 'A' | ✅ `\065` ເປັນ octal = '5'; 'A' ຄື `\101` (octal 101 = 65) |
| 4 | `\u008` = ຂຶ້ນແຖວໃໝ່ | Unicode ຕ້ອງມີ hex **4 ຕົວ**; ຂຶ້ນແຖວໃໝ່ຄື `\u000A` (ແຕ່ໃນ String ໃຫ້ໃຊ້ `\n`) |
| 4 | `JOptionPane.WIDTH` ເປັນ message type | ✅ ລັນໄດ້ຍ້ອນ WIDTH = 1 ເທົ່າກັບ `INFORMATION_MESSAGE` ໂດຍບັງເອີນ — ຄວນໃຊ້ `INFORMATION_MESSAGE` |
| 5 | `Switch(...)`, `}whlie(...)` | `switch`, `while` (Java ແຍກຕົວພິມໃຫຍ່-ນ້ອຍ) |
| 6 | `b = a;` ໝາຍວ່າ "Wrong" | ບໍ່ແມ່ນ error — compile/ລັນໄດ້ ແຕ່ເປັນການ copy reference ບໍ່ແມ່ນ copy ຂໍ້ມູນ |

---

## 📝 ຄຳຖາມທົດສອບຕົນເອງ (ຄຳຕອບທົດສອບແລ້ວ ✅)

1. `int b = 5; int x = b++; int y = ++b;` → x, y, b = ? — **5, 7, 7**
2. `13 % 5` = ? / `-13 % 5` = ? — **3 / -3**
3. `7 / 2` = ? / `7 / 2.0` = ? — **3 / 3.5**
4. `(int) 3.99` = ? — **3**
5. `System.out.println(1 + 2 + "3");` — **33**
6. `System.out.println("1" + 2 + 3);` — **123**
7. `int[] a = new int[4];` → `a[0]` = ? ແລະ index ສຸດທ້າຍ = ? — **0 ແລະ 3**
8. `int[][] m = new int[3][4];` → `m.length` = ? — **3**
9. JDK, JRE, JVM ອັນໃດໃຫຍ່ສຸດ? — **JDK** (JDK ⊃ JRE ⊃ JVM)
10. `do-while` ກັບ `while` ຕ່າງກັນແນວໃດ? — do-while ລັນຢ່າງໜ້ອຍ **1 ຮອບ**
11. `showInputDialog` return ຊະນິດຫຍັງ? — **String**
12. `private` ເຂົ້າເຖິງໄດ້ຈາກໃສ? — **class ດຽວກັນເທົ່ານັ້ນ**
13. ຜົນບວກເລກຄີກ 1–10 = ? — **25**

---

## ອ້າງອີງ

- Primitive data types — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
- Operators ແລະ ລຳດັບຄວາມສຳຄັນ — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html
- Escape sequences (JLS §3.10.7) — https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.7
- Identifiers / keyword `_` (JLS §3.8–3.9) — https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.8
- Access control — https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html
- Arrays — https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html
- JOptionPane API — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/JOptionPane.html
- ArrayList API — https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html
- Jakarta EE (ຊື່ໃໝ່ຂອງ Java EE) — https://jakarta.ee/about/faq/
