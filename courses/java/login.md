# ອະທິບາຍໂຄ້ດ `Login.java` ແບບລະອຽດ ທີລະບັນທັດ

> ໄຟລ໌ນີ້ອະທິບາຍຕາມລຳດັບທີ່ໂປຣແກຣມເຮັດວຽກແທ້ — ເລີ່ມແຕ່ `main()` ຈົນເຂົ້າສູ່ລະບົບສຳເລັດ
> class ທີ່ບໍ່ໄດ້ສົ່ງມາ (`MysqlConnect`, `ThemeConfig`, `SVGImage`, `Main`) ຈະອະທິບາຍຕາມທີ່ເຫັນການເອີ້ນໃຊ້ເທົ່ານັ້ນ

---

## 0. ພາບລວມ — ໜ້ານີ້ເຮັດຫຍັງ?

ໜ້າ Login ເປັນໜ້າທຳອິດຂອງ "ໂປຣແກຣມຂາຍເຄື່ອງໜ້າຮ້ານ" ໃຫ້ພະນັກງານປ້ອນ **ບັນຊີເຂົ້າໃຊ້ (username)** ແລະ **ລະຫັດຜ່ານ (password)** ແລ້ວກວດກັບຕາຕະລາງ `employee` ໃນ MySQL

```diagram-login-flow
ເປີດໂປຣແກຣມ
   │
   ▼
main()  →  ThemeConfig.config()  (ຕັ້ງທີມ FlatLaf)
   │
   ▼
new Login()  →  Constructor ຕົບແຕ່ງໜ້າຈໍ  →  setVisible(true)
   │
   ▼
ຜູ້ໃຊ້ພິມ username ກົດ Enter → ເຄີເຊີໄປຊ່ອງ password
ຜູ້ໃຊ້ພິມ password ກົດ Enter → ເທົ່າກັບກົດປຸ່ມ "ເຂົ້າໃຊ້ງານ"
   │
   ▼
btnLoginActionPerformed()
   ├─ ຊ່ອງຫວ່າງ?          → ແຈ້ງເຕືອນ "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"
   ├─ ບໍ່ພົບ username     → "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"
   ├─ ລະຫັດຜ່ານບໍ່ກົງ     → "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ"
   └─ ຖືກຕ້ອງ             → ເປີດໜ້າ Main ແລ້ວປິດໜ້າ Login
```

---

## 1. `package` ແລະ `import`

```java
package applicationForm;
```
- ບອກວ່າ class `Login` ຢູ່ໃນ **package** ຊື່ `applicationForm` (ຄືໂຟນເດີ `applicationForm/` ໃນ src)
- ຕ້ອງເປັນຄຳສັ່ງ **ແຖວທຳອິດ** ຂອງໄຟລ໌ (ກ່ອນ import) — ເຊື່ອມກັບບົດທີ 2 ເລື່ອງ Package

```java
import com.formdev.flatlaf.FlatClientProperties;
import com.formdev.flatlaf.extras.FlatSVGIcon;
import config.ThemeConfig;
import java.awt.Color;
import java.awt.Image;
import java.awt.Taskbar;
import java.awt.Toolkit;
import javax.swing.JOptionPane;
import java.sql.*;
import java.sql.Connection;
import mysql_connect.MysqlConnect;
import org.mindrot.jbcrypt.BCrypt;
```
`import` = ບອກ Java ວ່າຈະໃຊ້ class ຈາກ package ອື່ນ ເພື່ອຂຽນຊື່ສັ້ນໆໄດ້ (ບໍ່ຕ້ອງຂຽນຊື່ເຕັມ)

| import | ມາຈາກ | ໃຊ້ເຮັດຫຍັງໃນໄຟລ໌ນີ້ |
|---|---|---|
| `FlatClientProperties` | library FlatLaf | ຄ່າຄົງທີ່ສຳລັບຕົບແຕ່ງ (placeholder, ໄອຄອນໃນຊ່ອງ, ສີ title bar) |
| `FlatSVGIcon` | FlatLaf extras | ໂຫຼດໄອຄອນຈາກໄຟລ໌ `.svg` |
| `ThemeConfig` | class ຂອງໂປຣເຈັກເອງ (package `config`) | ຕັ້ງຄ່າທີມ FlatLaf ກ່ອນເປີດໜ້າຈໍ |
| `Color` | Java AWT | ກຳນົດສີ RGB |
| `Image`, `Toolkit` | Java AWT | ໂຫຼດຮູບໄອຄອນໂປຣແກຣມ |
| `Taskbar` | Java AWT (Java 9+) | ໃສ່ໄອຄອນທີ່ Dock ຂອງ macOS |
| `JOptionPane` | Java Swing | ກ່ອງແຈ້ງເຕືອນ (ບົດທີ 4) |
| `java.sql.*` | JDBC | `Connection`, `PreparedStatement`, `ResultSet` (`*` = ທຸກ class ໃນ package) |
| `java.sql.Connection` | JDBC | ຊ້ຳກັບ `java.sql.*` — ບໍ່ຜິດ ແຕ່ບໍ່ຈຳເປັນ |
| `MysqlConnect` | class ຂອງໂປຣເຈັກເອງ | ເມັດທອດ `connectDB()` ສົ່ງຄືນ `Connection` ໄປ MySQL |
| `BCrypt` | library jBCrypt | ກວດລະຫັດຜ່ານທີ່ຖືກ hash ໄວ້ |

---

## 2. ປະກາດ class

```java
public class Login extends javax.swing.JFrame {
```
- `public` — class ອື່ນເອີ້ນໃຊ້ໄດ້ (Access Modifier ບົດທີ 2)
- `class Login` — ຊື່ class ຕ້ອງກົງກັບຊື່ໄຟລ໌ `Login.java`
- `extends javax.swing.JFrame` — **Inheritance (ການສືບທອດ)**: Login ເປັນ class ລູກຂອງ `JFrame` (ໜ້າຕ່າງ) ຈຶ່ງໄດ້ເມັດທອດ `setTitle()`, `setVisible()`, `dispose()`, `pack()` ... ມາໃຊ້ໂດຍບໍ່ຕ້ອງຂຽນເອງ

---

## 3. Attribute (ຕົວປ່ຽນຂອງ class)

```java
Connection conn = null;         // ເກັບການເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
PreparedStatement pst = null;   // ກຽມຄຳສັ່ງ sql
ResultSet rs = null;            // ເກັບຜົນໄດ້ຮັບຈາກການປະມວນຜົນຄຳສັ່ງ sql
```
3 ຕົວນີ້ແມ່ນ "ສາມພີ່ນ້ອງ JDBC" — ຈື່ໃຫ້ໄດ້:

| ຕົວປ່ຽນ | ຊະນິດ | ໜ້າທີ່ | ປຽບທຽບ |
|---|---|---|---|
| `conn` | `Connection` | ສາຍເຊື່ອມຕໍ່ກັບ MySQL | ສາຍໂທລະສັບ |
| `pst` | `PreparedStatement` | ຄຳສັ່ງ SQL ທີ່ກຽມໄວ້ ມີ `?` ລໍຖ້າໃສ່ຄ່າ | ແບບຟອມທີ່ມີຊ່ອງວ່າງ |
| `rs` | `ResultSet` | ຜົນລັບທີ່ໄດ້ຈາກ `SELECT` | ຕາຕະລາງຄຳຕອບ |

- ຕັ້ງເປັນ `null` = ຍັງບໍ່ຊີ້ໄປຫາ object ໃດ (reference type ບົດທີ 3)
- ບໍ່ໄດ້ຂຽນ access modifier → ເປັນລະດັບ **package** (ໃຊ້ໄດ້ໃນ package `applicationForm`)

---

## 4. Constructor `public Login()`

**Constructor** = ເມັດທອດພິເສດ ຊື່ດຽວກັບ class, ບໍ່ມີ return type, ເຮັດວຽກ **ອັດຕະໂນມັດຄັ້ງດຽວ** ຕອນ `new Login()` → ໃຊ້ກຽມໜ້າຈໍໃຫ້ພ້ອມ

### 4.1 ສ້າງ component ກ່ອນ

```java
public Login() {
    initComponents();
```
- ເອີ້ນເມັດທອດທີ່ NetBeans ສ້າງໃຫ້ ເພື່ອ **ສ້າງປຸ່ມ ແລະ ຊ່ອງປ້ອນທັງໝົດ** (ເບິ່ງຫົວຂໍ້ 5)
- ຕ້ອງເອີ້ນ **ກ່ອນ** ໃຊ້ `txtUsername`, `btnLogin` ... ບໍ່ດັ່ງນັ້ນມັນຍັງເປັນ `null` → `NullPointerException`

### 4.2 ຕັ້ງຊື່ ແລະ ຕຳແໜ່ງໜ້າຕ່າງ

```java
    this.setTitle("ໂປຣແກຣມຂາຍເຄື່ອງໜ້າຮ້ານ");
    this.setLocationRelativeTo(this);
    this.setResizable(false);
```
- `this` = object ປັດຈຸບັນ (ໜ້າ Login)
- `setTitle(...)` — ຂໍ້ຄວາມໃນແຖບຫົວຂອງໜ້າຕ່າງ
- `setLocationRelativeTo(this)` — ຈັດໜ້າຕ່າງໄວ້ **ກາງຈໍ** (ຍ້ອນໜ້າຕ່າງຍັງບໍ່ສະແດງ Java ຈຶ່ງຈັດໄວ້ກາງຈໍ; ນິຍົມຂຽນ `setLocationRelativeTo(null)` ຈະຊັດເຈນກວ່າ)
- `setResizable(false)` — ຫ້າມຜູ້ໃຊ້ຍືດ/ຫົດໜ້າຕ່າງ

### 4.3 ໃສ່ໄອຄອນໂປຣແກຣມ (Windows / Linux / macOS)

```java
    try {
        String iconPath = "/images/icon.png";
        Image image = Toolkit.getDefaultToolkit().getImage(getClass().getResource(iconPath));
```
- `try { ... } catch` — ຖ້າໂຫຼດຮູບບໍ່ໄດ້ ໂປຣແກຣມຈະບໍ່ຢຸດ (Exception Handling)
- `getClass().getResource("/images/icon.png")` — ຫາໄຟລ໌ຮູບ **ພາຍໃນໂປຣເຈັກ** (`/` = ເລີ່ມຈາກ root ຂອງ src/resources) ສົ່ງຄືນເປັນ `URL`
- `Toolkit.getDefaultToolkit().getImage(url)` — ແປງ URL ເປັນ object `Image`

```java
        this.setIconImage(image);
```
- ໃສ່ໄອຄອນຢູ່ແຈຊ້າຍເທິງຂອງໜ້າຕ່າງ ແລະ Taskbar (Windows / Linux)

```java
        if (Taskbar.isTaskbarSupported()) {
            Taskbar taskbar = Taskbar.getTaskbar();
            if (taskbar.isSupported(Taskbar.Feature.ICON_IMAGE)) {
                taskbar.setIconImage(image);
            }
        }
```
- macOS ບໍ່ໃຊ້ `setIconImage` ສະແດງໃນ Dock → ຕ້ອງໃຊ້ `Taskbar`
- `if` ຊ້ອນ 2 ຊັ້ນ: ກວດວ່າ OS ຮອງຮັບ Taskbar ບໍ → ຮອງຮັບການປ່ຽນໄອຄອນບໍ → ຈຶ່ງປ່ຽນ (ບົດທີ 5 if)

```java
    } catch (Exception e) {
        System.out.println("Error:  " + e.getMessage());
    }
```
- ຖ້າຜິດພາດ ໃຫ້ພິມຂໍ້ຄວາມໃນ Console ແລ້ວເຮັດວຽກຕໍ່

### 4.4 ໂລໂກ້ ແລະ ສີ Title bar

```java
    sVGImage1.setSvgImage("images_svg/login-form.svg", 80, 80);
```
- `sVGImage1` ເປັນ component ທີ່ໂປຣເຈັກສ້າງເອງ (`includeClass.SVGImage`) — ສະແດງໂລໂກ້ SVG ຂະໜາດ 80×80 px

```java
    getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_BACKGROUND, new Color(28, 40, 51));
    getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_FOREGROUND, new Color(253, 254, 254));
```
- `putClientProperty(key, value)` = ວິທີຕັ້ງຄ່າພິເສດຂອງ FlatLaf
- ປ່ຽນ **ສີພື້ນ** title bar ເປັນ RGB(28, 40, 51) ສີນ້ຳເງິນເຂັ້ມ ແລະ **ສີຕົວໜັງສື** ເປັນເກືອບຂາວ

### 4.5 ຕົບແຕ່ງຊ່ອງປ້ອນ ແລະ ປຸ່ມ

```java
    txtUsername.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ບັນຊີເຂົ້າໃຊ້");
    txtPassword.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ລະຫັດຜ່ານ");
```
- **Placeholder** = ຂໍ້ຄວາມຈາງໆໃນຊ່ອງຕອນຍັງບໍ່ໄດ້ພິມ ຈະຫາຍເມື່ອເລີ່ມພິມ

```java
    txtUsername.putClientProperty(FlatClientProperties.TEXT_FIELD_SHOW_CLEAR_BUTTON, true);
    txtPassword.putClientProperty(FlatClientProperties.TEXT_FIELD_SHOW_CLEAR_BUTTON, true);
```
- ສະແດງປຸ່ມ ✕ ທ້າຍຊ່ອງ ກົດແລ້ວລຶບຂໍ້ຄວາມທັງໝົດ

```java
    txtUsername.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/username.svg"));
    txtPassword.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/password.svg"));
```
- ໃສ່ໄອຄອນ **ດ້ານໜ້າ** (leading) ຂອງຊ່ອງ: ຮູບຄົນ ແລະ ຮູບກະແຈ

```java
    btnLogin.setIcon(new FlatSVGIcon("images_svg/login.svg"));
```
- ໃສ່ໄອຄອນໃນປຸ່ມ "ເຂົ້າໃຊ້ງານ"

```java
    txtPassword.putClientProperty(FlatClientProperties.STYLE, "showRevealButton:true;" + "showCapsLock:true");
}
```
- `showRevealButton:true` — ປຸ່ມຮູບຕາ 👁 ກົດເພື່ອເບິ່ງລະຫັດຜ່ານ
- `showCapsLock:true` — ສະແດງສັນຍາລັກເມື່ອເປີດ Caps Lock (ກັນພິມລະຫັດຜິດ)
- `"..." + "..."` ຕໍ່ String ດ້ວຍ `+` (ບົດທີ 4)

---

## 5. `initComponents()` — ໂຄ້ດທີ່ NetBeans ສ້າງໃຫ້

```java
@SuppressWarnings("unchecked")
// <editor-fold defaultstate="collapsed" desc="Generated Code">
private void initComponents() {
```
- ໂຄ້ດສ່ວນນີ້ **NetBeans GUI Builder ສ້າງອັດຕະໂນມັດ** ເມື່ອເຮົາລາກວາງໃນໜ້າ Design — **ບໍ່ຄວນແກ້ດ້ວຍມື** (ພື້ນສີເທົາໃນ NetBeans)
- `@SuppressWarnings("unchecked")` — ບອກ compiler ບໍ່ຕ້ອງເຕືອນເລື່ອງ generic type
- `private` — ເອີ້ນໄດ້ພາຍໃນ class ນີ້ເທົ່ານັ້ນ

### 5.1 ສ້າງ object ຂອງ component
```java
sVGImage1 = new includeClass.SVGImage();
txtUsername = new javax.swing.JTextField();
txtPassword = new javax.swing.JPasswordField();
btnLogin = new javax.swing.JButton();
```
| component | ຊະນິດ | ໜ້າທີ່ |
|---|---|---|
| `sVGImage1` | `SVGImage` (ສ້າງເອງ) | ສະແດງໂລໂກ້ |
| `txtUsername` | `JTextField` | ຊ່ອງພິມຂໍ້ຄວາມທົ່ວໄປ |
| `txtPassword` | `JPasswordField` | ຊ່ອງພິມລະຫັດ — ສະແດງເປັນ ●●● |
| `btnLogin` | `JButton` | ປຸ່ມກົດ |

### 5.2 ຕັ້ງຄ່າ ແລະ ຜູກ Event
```java
setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
```
- ກົດ ✕ ປິດໜ້າຕ່າງ = **ປິດໂປຣແກຣມທັງໝົດ**

```java
txtUsername.setFont(new java.awt.Font("Lao_SomVang", 0, 10));
txtUsername.addActionListener(this::txtUsernameActionPerformed);
```
- `new Font("Lao_SomVang", 0, 10)` — font ລາວ, ແບບ 0 = ທຳມະດາ (PLAIN), ຂະໜາດ 10
- `addActionListener(...)` — **ຜູກ event**: ເມື່ອກົດ **Enter** ໃນຊ່ອງນີ້ ໃຫ້ເອີ້ນເມັດທອດ `txtUsernameActionPerformed`
- `this::txtUsernameActionPerformed` = **method reference** (Java 8+) ຂຽນສັ້ນແທນການສ້າງ object `ActionListener`

```java
btnLogin.setBackground(new java.awt.Color(51, 51, 255));
btnLogin.setFont(new java.awt.Font("Lao_SomVang", 0, 14));
btnLogin.setText("ເຂົ້າໃຊ້ງານ");
btnLogin.addActionListener(this::btnLoginActionPerformed);
```
- ປຸ່ມສີນ້ຳເງິນ, ຂໍ້ຄວາມ "ເຂົ້າໃຊ້ງານ", ກົດແລ້ວເອີ້ນ `btnLoginActionPerformed`

### 5.3 ຈັດວາງ (Layout)
```java
javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
getContentPane().setLayout(layout);
layout.setHorizontalGroup( ... );   // ຈັດຕາມແນວນອນ
layout.setVerticalGroup( ... );     // ຈັດຕາມແນວຕັ້ງ
pack();
```
- `GroupLayout` = layout ທີ່ NetBeans ໃຊ້: ກຳນົດຕຳແໜ່ງທັງ **ແນວນອນ** ແລະ **ແນວຕັ້ງ**
- `addGap(38, 38, 38)` = ຍະຫວ່າງ 38 px, `addComponent(txtUsername, ..., 36, ...)` = ສູງ 36 px
- ແນວຕັ້ງລຽງຈາກເທິງລົງລຸ່ມ: ໂລໂກ້ (100px) → username → password → ປຸ່ມ
- `pack()` — ປັບຂະໜາດໜ້າຕ່າງໃຫ້ພໍດີກັບ component ທັງໝົດ

---

## 6. Event Handler — ເມັດທອດທີ່ເຮັດວຽກເມື່ອຜູ້ໃຊ້ກະທຳ

### 6.1 ກົດ Enter ໃນຊ່ອງ username
```java
private void txtUsernameActionPerformed(java.awt.event.ActionEvent evt) {
    txtPassword.requestFocus();
}
```
- `requestFocus()` — ຍ້າຍເຄີເຊີໄປຊ່ອງ password ທັນທີ (ບໍ່ຕ້ອງໃຊ້ເມົ້າຄລິກ)

### 6.2 ກົດ Enter ໃນຊ່ອງ password
```java
private void txtPasswordActionPerformed(java.awt.event.ActionEvent evt) {
    btnLogin.doClick();
}
```
- `doClick()` — **ຈຳລອງການກົດປຸ່ມ** → ເຮັດໃຫ້ `btnLoginActionPerformed` ເຮັດວຽກ (ບໍ່ຕ້ອງຂຽນໂຄ້ດ login ຊ້ຳ)

### 6.3 ກົດປຸ່ມ "ເຂົ້າໃຊ້ງານ" — ຫົວໃຈຂອງໜ້ານີ້ ❤️

#### ຂັ້ນທີ 1: ກວດວ່າປ້ອນຄົບບໍ
```java
if (txtUsername.getText().isBlank() || txtPassword.getText().isBlank()) {
    JOptionPane.showMessageDialog(this, "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນດ້ວຍ", "ຫວ່າງເປົ່າ", JOptionPane.WARNING_MESSAGE);
    return;
}
```
- `getText()` — ເອົາຂໍ້ຄວາມໃນຊ່ອງ
- `isBlank()` (Java 11+) — `true` ຖ້າຫວ່າງ ຫຼື ມີແຕ່ຍະຫວ່າງ `"   "`
- `||` (Logical OR ບົດທີ 3) — ຫວ່າງ **ຊ່ອງໃດຊ່ອງໜຶ່ງ** ກໍແຈ້ງເຕືອນ
- `showMessageDialog(parent, ຂໍ້ຄວາມ, ຫົວຂໍ້, ຊະນິດ)` — ກ່ອງແຈ້ງເຕືອນແບບ WARNING (ບົດທີ 4)
- `return;` — **ອອກຈາກເມັດທອດທັນທີ** ບໍ່ເຮັດຄຳສັ່ງຂ້າງລຸ່ມ (ເອີ້ນວ່າ guard clause)

#### ຂັ້ນທີ 2: ເຊື່ອມຕໍ່ຖານຂໍ້ມູນ ແລະ ກຽມ SQL
```java
try {
    conn = MysqlConnect.connectDB();
```
- ເອີ້ນ **static method** `connectDB()` ຜ່ານຊື່ class ໂດຍບໍ່ຕ້ອງ `new` (static ບົດທີ 2) → ໄດ້ `Connection`

```java
    String sql = """
                 SELECT
                     emp_id,
                     CONCAT(emp_name, ' ', emp_lname) AS name,
                     status,
                     password
                 FROM employee
                 WHERE username = ?
                 """;
```
- `"""..."""` = **Text Block** (Java 15+) ຂຽນ String ຫຼາຍແຖວໄດ້ ບໍ່ຕ້ອງໃຊ້ `+` ແລະ `\n`
- SQL ນີ້ເອົາ 4 ຖັນຈາກຕາຕະລາງ `employee`:
  1. `emp_id` — ລະຫັດພະນັກງານ
  2. `CONCAT(emp_name, ' ', emp_lname) AS name` — ຕໍ່ ຊື່ + ຍະຫວ່າງ + ນາມສະກຸນ ຕັ້ງຊື່ຖັນໃໝ່ວ່າ `name`
  3. `status` — ສະຖານະ/ສິດ ຂອງພະນັກງານ
  4. `password` — ລະຫັດຜ່ານທີ່ **ຖືກ hash ແລ້ວ** (ບໍ່ແມ່ນລະຫັດແທ້)
- `WHERE username = ?` — `?` ແມ່ນ **placeholder** ລໍຖ້າໃສ່ຄ່າ
- ສັງເກດ: **ບໍ່ໄດ້ກວດລະຫັດຜ່ານໃນ SQL** — ເອົາ hash ອອກມາກວດໃນ Java ດ້ວຍ BCrypt

```java
    pst = conn.prepareStatement(sql);
    pst.setString(1, txtUsername.getText());
```
- `prepareStatement(sql)` — ສົ່ງ SQL ໄປກຽມໄວ້
- `setString(1, ...)` — ໃສ່ຄ່າ username ແທນ `?` **ຕົວທີ 1** (ນັບຈາກ 1 ບໍ່ແມ່ນ 0!)
- ⭐ **ເປັນຫຍັງໃຊ້ `?` ບໍ່ຕໍ່ String ເອົາ?** ກັນ **SQL Injection** — ຖ້າຂຽນ `"... WHERE username='" + txt + "'"` ຜູ້ບໍ່ຫວັງດີພິມ `' OR '1'='1` ກໍເຂົ້າລະບົບໄດ້. `PreparedStatement` ຖືວ່າຄ່າທີ່ໃສ່ເປັນຂໍ້ມູນເທົ່ານັ້ນ ບໍ່ແມ່ນຄຳສັ່ງ SQL

#### ຂັ້ນທີ 3: ລັນ SQL ແລະ ກວດຜົນ
```java
    rs = pst.executeQuery();
    if (rs.next()) {
```
- `executeQuery()` — ໃຊ້ກັບ **SELECT** ສົ່ງຄືນ `ResultSet`
- `rs.next()` — ເລື່ອນໄປແຖວຖັດໄປ: `true` = ມີແຖວ (ພົບ username), `false` = ບໍ່ພົບ

#### ຂັ້ນທີ 4: ກວດລະຫັດຜ່ານດ້ວຍ BCrypt
```java
        String storedHash = rs.getString("password");
        if (BCrypt.checkpw(txtPassword.getText(), storedHash)) {
```
- `rs.getString("password")` — ອ່ານຄ່າຖັນ password (ອ້າງດ້ວຍຊື່ຖັນ)
- **Hash ແມ່ນຫຍັງ?** ການແປງລະຫັດເປັນຂໍ້ຄວາມທີ່ **ແປງກັບຄືນບໍ່ໄດ້** ເຊັ່ນ `1234` → `$2a$10$N9qo8uLOickgx2ZMRZoMye...` ຖ້າຖານຂໍ້ມູນຮົ່ວ ຄົນອື່ນກໍບໍ່ຮູ້ລະຫັດແທ້
- `BCrypt.checkpw(ລະຫັດທີ່ພິມ, hash)` — hash ລະຫັດທີ່ພິມແລ້ວປຽບທຽບ ກົງກັນ = `true`

#### ຂັ້ນທີ 5: ສຳເລັດ → ເປີດໜ້າ Main
```java
            Main m = new Main(rs.getString(1), rs.getString(2), rs.getString(3));
            m.setVisible(true);
            dispose();
```
- `new Main(...)` — ສ້າງ object ໜ້າຫຼັກ ສົ່ງ 3 ຄ່າຜ່ານ **constructor**: `emp_id`, `name`, `status` (ອ້າງດ້ວຍລຳດັບຖັນ 1, 2, 3)
- `setVisible(true)` — ສະແດງໜ້າ Main
- `dispose()` — ປິດໜ້າ Login ແລະ ຄືນໜ່ວຍຄວາມຈຳ (ໂປຣແກຣມຍັງເຮັດວຽກຕໍ່ເພາະມີ Main ເປີດຢູ່)

#### ຂັ້ນທີ 6: ລົ້ມເຫຼວ
```java
        } else {
            JOptionPane.showMessageDialog(this, "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
        }
    } else {
        JOptionPane.showMessageDialog(this, "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
    }
```
- `else` ຊັ້ນໃນ = ພົບ username ແຕ່ລະຫັດຜິດ / `else` ຊັ້ນນອກ = ບໍ່ພົບ username
- ⭐ ສັງເກດ: **ຂໍ້ຄວາມດຽວກັນ** ທັງ 2 ກໍລະນີ — ເປັນການອອກແບບທີ່ດີດ້ານ security: ຄົນບໍ່ຫວັງດີບໍ່ຮູ້ວ່າ username ໃດມີຢູ່ແທ້

#### ຂັ້ນທີ 7: ຈັບຂໍ້ຜິດພາດ
```java
} catch (Exception e) {
    JOptionPane.showMessageDialog(this, e);
}
```
- ຖ້າເຊື່ອມຕໍ່ MySQL ບໍ່ໄດ້ ຫຼື SQL ຜິດ → ສະແດງ error ໃນກ່ອງຂໍ້ຄວາມ ໂປຣແກຣມບໍ່ crash

---

## 7. `main()` — ຈຸດເລີ່ມຕົ້ນຂອງໂປຣແກຣມ

```java
public static void main(String args[]) {
    ThemeConfig.config();
    java.awt.EventQueue.invokeLater(() -> new Login().setVisible(true));
}
```
- `public static void main(String args[])` — Java ເລີ່ມລັນໂປຣແກຣມຈາກບ່ອນນີ້ສະເໝີ
  - `public` — JVM ເອີ້ນໄດ້ / `static` — ເອີ້ນໄດ້ໂດຍບໍ່ຕ້ອງສ້າງ object / `void` — ບໍ່ສົ່ງຄ່າກັບ / `String args[]` — array ຂອງ argument ຈາກ command line (ບົດທີ 6)
- `ThemeConfig.config()` — ຕັ້ງທີມ FlatLaf **ກ່ອນ** ສ້າງໜ້າຈໍ (ຖ້າຕັ້ງຫຼັງ ໜ້າຈໍຈະບໍ່ປ່ຽນທີມ)
- `EventQueue.invokeLater(...)` — ສັ່ງໃຫ້ສ້າງໜ້າຈໍໃນ **Event Dispatch Thread (EDT)** ເຊິ່ງເປັນ thread ດຽວທີ່ Swing ອະນຸຍາດໃຫ້ແຕະ component
- `() -> new Login().setVisible(true)` — **Lambda expression**: ສ້າງ Login (constructor ເຮັດວຽກ) ແລ້ວສະແດງ

---

## 8. ປະກາດຕົວປ່ຽນ component

```java
// Variables declaration - do not modify
private javax.swing.JButton btnLogin;
private includeClass.SVGImage sVGImage1;
private javax.swing.JPasswordField txtPassword;
private javax.swing.JTextField txtUsername;
```
- NetBeans ສ້າງໃຫ້ອັດຕະໂນມັດ (`do not modify` = ຢ່າແກ້)
- ເປັນ `private` → **Encapsulation**: class ອື່ນແຕະ component ຂອງໜ້ານີ້ໂດຍກົງບໍ່ໄດ້

---

## 9. ສະຫຼຸບລຳດັບການເຮັດວຽກທັງໝົດ

1. JVM ເອີ້ນ `main()`
2. `ThemeConfig.config()` ຕັ້ງທີມ
3. `invokeLater` → `new Login()` → constructor ເຮັດວຽກ:
   `initComponents()` → ຕັ້ງຊື່/ຕຳແໜ່ງ → ໄອຄອນ → ໂລໂກ້ → ສີ title bar → placeholder → ປຸ່ມລຶບ → ໄອຄອນໃນຊ່ອງ → ປຸ່ມເບິ່ງລະຫັດ
4. `setVisible(true)` ສະແດງໜ້າຈໍ ລໍຖ້າຜູ້ໃຊ້
5. ພິມ username + Enter → ໄປຊ່ອງ password
6. ພິມ password + Enter → `doClick()` → `btnLoginActionPerformed`
7. ກວດຫວ່າງ → ເຊື່ອມ DB → SELECT ດ້ວຍ username → ກວດ hash ດ້ວຍ BCrypt
8. ຖືກ → `new Main(id, name, status)` → ປິດ Login / ຜິດ → ແຈ້ງເຕືອນ

---

## 10. ຄຳຖາມທີ່ອາຈານອາດຖາມ ພ້ອມຄຳຕອບ

| ຄຳຖາມ | ຄຳຕອບ |
|---|---|
| `extends JFrame` ໝາຍຄວາມວ່າແນວໃດ? | Login ສືບທອດຈາກ JFrame (Inheritance) ຈຶ່ງໃຊ້ `setTitle`, `setVisible`, `dispose` ໄດ້ |
| Constructor ຂອງໜ້ານີ້ເຮັດຫຍັງ? | ສ້າງ component (`initComponents`) ແລະ ຕົບແຕ່ງໜ້າຈໍ ເຮັດວຽກຕອນ `new Login()` |
| `Connection`, `PreparedStatement`, `ResultSet` ຕ່າງກັນແນວໃດ? | ສາຍເຊື່ອມ DB / ຄຳສັ່ງ SQL ທີ່ກຽມໄວ້ / ຜົນລັບຂອງ SELECT |
| ເປັນຫຍັງໃຊ້ `?` ໃນ SQL? | ກັນ SQL Injection |
| `executeQuery()` ກັບ `executeUpdate()` ຕ່າງກັນແນວໃດ? | `executeQuery` ໃຊ້ກັບ SELECT ສົ່ງຄືນ ResultSet; `executeUpdate` ໃຊ້ກັບ INSERT/UPDATE/DELETE ສົ່ງຄືນຈຳນວນແຖວທີ່ປ່ຽນ (int) |
| `rs.next()` ເຮັດຫຍັງ? | ເລື່ອນໄປແຖວຖັດໄປ ສົ່ງຄືນ true ຖ້າມີແຖວ |
| ເປັນຫຍັງບໍ່ເກັບລະຫັດຜ່ານແທ້ໃນ DB? | ຖ້າ DB ຮົ່ວ ລະຫັດຈະບໍ່ຖືກເປີດເຜີຍ — BCrypt hash ແປງກັບຄືນບໍ່ໄດ້ |
| ເປັນຫຍັງບໍ່ກວດ password ໃນ `WHERE`? | ເພາະ BCrypt hash ແຕ່ລະຄັ້ງໄດ້ຄ່າບໍ່ຄືກັນ (ມີ salt) ຕ້ອງໃຊ້ `checkpw` ກວດ |
| `doClick()` ໃຊ້ເພື່ອຫຍັງ? | ກົດ Enter ໃນຊ່ອງ password ແລ້ວ login ໄດ້ເລີຍ ບໍ່ຕ້ອງຂຽນໂຄ້ດຊ້ຳ |
| `dispose()` ກັບ `System.exit(0)` ຕ່າງກັນແນວໃດ? | `dispose` ປິດສະເພາະໜ້ານີ້; `System.exit(0)` ປິດໂປຣແກຣມທັງໝົດ |
| `return;` ໃນ if ເຮັດຫຍັງ? | ອອກຈາກເມັດທອດທັນທີ ບໍ່ເຮັດຄຳສັ່ງຕໍ່ໄປ |
| `invokeLater` ໃຊ້ເພື່ອຫຍັງ? | ສ້າງ GUI ໃນ Event Dispatch Thread ຕາມກົດຂອງ Swing |

---

## 11. ⚠️ ຈຸດທີ່ຄວນປັບປຸງ (ຖ້າອາຈານຖາມວ່າ "ມີຫຍັງຄວນແກ້")

| # | ບັນຫາ | ຜົນກະທົບ | ວິທີແກ້ |
|---|---|---|---|
| 1 | `txtPassword.getText()` | ✅ ເປັນ **deprecated** (ທົດສອບກັບ JDK 21 ແລ້ວ compiler ເຕືອນ) ເພາະ String ຄ້າງຢູ່ໃນໜ່ວຍຄວາມຈຳ | ໃຊ້ `new String(txtPassword.getPassword())` ຫຼື `txtPassword.getPassword().length == 0` |
| 2 | `conn` ເປີດທຸກຄັ້ງທີ່ກົດ ແຕ່ບໍ່ເຄີຍປິດ | login ຜິດຫຼາຍຄັ້ງ → connection ຄ້າງ | ໃຊ້ try-with-resources: `try (Connection conn = ...; PreparedStatement pst = ...)` |
| 3 | `showMessageDialog(this, e)` | ສະແດງ error ດິບໃຫ້ຜູ້ໃຊ້ເຫັນ (ອາດມີຊື່ຕາຕະລາງ/ຖັນ) | ສະແດງຂໍ້ຄວາມທົ່ວໄປ ແລະ ບັນທຶກ log ແທນ |
| 4 | `setLocationRelativeTo(this)` | ເຮັດວຽກໄດ້ ແຕ່ອ່ານແລ້ວສັບສົນ | `setLocationRelativeTo(null)` |
| 5 | import `java.sql.*` ແລະ `java.sql.Connection` ຊ້ຳກັນ | ບໍ່ມີຜົນ ແຕ່ບໍ່ສະອາດ | ລຶບແຖວ `java.sql.Connection` |
| 6 | ບໍ່ໄດ້ກວດ `status` ຂອງພະນັກງານ | ພະນັກງານທີ່ຖືກປິດບັນຊີອາດຍັງເຂົ້າໄດ້ (ຂຶ້ນກັບວ່າ status ໃຊ້ເກັບຫຍັງ) | ເພີ່ມເງື່ອນໄຂໃນ SQL ຫຼື ກວດກ່ອນເປີດ Main |
| 7 | ຄອມເມັນ "ແຈ້ງເຕຶອນ" | ສະກົດຜິດ | "ແຈ້ງເຕືອນ" |

---

## ອ້າງອີງ

- JFrame — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/JFrame.html
- JPasswordField (`getText` deprecated, ໃຊ້ `getPassword`) — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/JPasswordField.html
- Window.setLocationRelativeTo — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/java/awt/Window.html#setLocationRelativeTo(java.awt.Component)
- Taskbar — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/java/awt/Taskbar.html
- Swing ແລະ Event Dispatch Thread — https://docs.oracle.com/javase/tutorial/uiswing/concurrency/dispatch.html
- GroupLayout — https://docs.oracle.com/javase/tutorial/uiswing/layout/group.html
- PreparedStatement — https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html
- Text Blocks (JEP 378) — https://openjdk.org/jeps/378
- FlatLaf Client Properties — https://www.formdev.com/flatlaf/client-properties/
- FlatLaf Password Field (showRevealButton, showCapsLock) — https://www.formdev.com/flatlaf/components/passwordfield/
- jBCrypt — https://www.mindrot.org/projects/jBCrypt/
- OWASP SQL Injection Prevention — https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- OWASP Password Storage — https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
