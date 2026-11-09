# ອະທິບາຍໂຄ້ດ `PanelProduct.java` ແບບລະອຽດ ທີລະບັນທັດ

> class ທີ່ບໍ່ໄດ້ສົ່ງມາ (`BrandItem`, `CategoryItem`, `NumberComma`, `TableColumnAligner`, `MysqlConnect`) ຈະອະທິບາຍຕາມທີ່ເຫັນການເອີ້ນໃຊ້ເທົ່ານັ້ນ

---

## 0. ພາບລວມ — ໜ້ານີ້ເຮັດຫຍັງ?

ໜ້າ **ຈັດການຂໍ້ມູນສິນຄ້າ** ເຮັດວຽກຄົບ 4 ຢ່າງທີ່ເອີ້ນວ່າ **CRUD** (ຄຳນີ້ມັກອອກສອບ):

| CRUD | ຄວາມໝາຍ | SQL | ເມັດທອດໃນໜ້ານີ້ |
|---|---|---|---|
| **C**reate | ເພີ່ມ | `INSERT` | `btnAddActionPerformed` |
| **R**ead | ອ່ານ/ສະແດງ/ຄົ້ນຫາ | `SELECT` | `tableUpdate`, `txtSearchKeyReleased` |
| **U**pdate | ແກ້ໄຂ | `UPDATE` | `btnEditActionPerformed` |
| **D**elete | ລຶບ | `DELETE` | `btnDeleteActionPerformed` |

**ໂຄງສ້າງຖານຂໍ້ມູນ** (ອ່ານໄດ້ຈາກ SQL ໃນໂຄ້ດ):
```
brand                    product                       category
─────────────            ───────────────────           ───────────────
brand_id   (PK) ◄─────── brand_id     (FK)             category_id (PK)
brand_name               category_id  (FK) ──────────► category_name
                         barcode      (PK)
                         product_name, unit
                         quantity, quantity_min
                         cost_price, retail_price
                         status
```
- PK (Primary Key) = ລະຫັດຫຼັກ ຫ້າມຊ້ຳ / FK (Foreign Key) = ລະຫັດທີ່ອ້າງອີງໄປຕາຕະລາງອື່ນ
- ສິນຄ້າ 1 ລາຍການ ມີ 1 ຍີ່ຫໍ້ ແລະ 1 ປະເພດ

**ໜ້າຈໍ** (ຈາກ `jPanel1`):
```
┌──────────────────── ຈັດການຂໍ້ມູນສິນຄ້າ ─────────────────────┐
│ ລະຫັດບາໂຄ້ດ [txtBarcode]   ຈຳນວນຕ່ຳສຸດ [txtQuantity_min]  ຍີ່ຫໍ້ [txtBrand ▼]   │
│ ລາຍການສິນຄ້າ [txtProduct]  ລາຄາຕົ້ນທຶນ [txtCost_price]    ປະເພດ [txtCategory ▼]│
│ ຫົວໜ່ວຍ    [txtUnit]      ລາຄາຂາຍ   [txtRetail_price]   ສະຖານະ [txtStatus ▼]  │
│ ຈຳນວນ      [txtQuantity]  [ເພີ່ມ] [ແກ້ໄຂ] [ລຶບ] [ຍົກເລີກ]                     │
└───────────────────────────────────────────────────────────┘
[🔍 txtSearch]
┌ jTable1: ບາໂຄ້ດ | ສິນຄ້າ | ຫົວໜ່ວຍ | ຈຳນວນ | ... | ສະຖານະ ┐
```

---

## 1. `package` ແລະ `import`

```java
package applicationForm;
```
- class ນີ້ຢູ່ package `applicationForm` ດຽວກັບ `Login`

```java
import com.formdev.flatlaf.FlatClientProperties;
import com.formdev.flatlaf.extras.FlatSVGIcon;
import includeClass.BrandItem;
import includeClass.CategoryItem;
import includeClass.NumberComma;
import includeClass.TableColumnAligner;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import mysql_connect.MysqlConnect;
```
| import | ໃຊ້ເຮັດຫຍັງ |
|---|---|
| `FlatClientProperties`, `FlatSVGIcon` | placeholder ແລະ ໄອຄອນໃນຊ່ອງຄົ້ນຫາ, ໄອຄອນ ✔ ໃນກ່ອງ "ສຳເລັດ" |
| `BrandItem`, `CategoryItem` | class ຂອງໂປຣເຈັກ: ດຶງລາຍຊື່ຍີ່ຫໍ້/ປະເພດ (`getName()`) ແລະ ແປງຊື່ → id (`getId(ຊື່)`) |
| `NumberComma` | class ຂອງໂປຣເຈັກ: ໃສ່ຈຸດ `,` ຂັ້ນຫຼັກພັນໃນຊ່ອງຕົວເລກຕອນພິມ |
| `TableColumnAligner` | class ຂອງໂປຣເຈັກ: ຈັດຂໍ້ຄວາມໃນຖັນຕາຕະລາງໄວ້ກາງ |
| `Connection`, `PreparedStatement`, `ResultSet` | JDBC ສາມພີ່ນ້ອງ |
| `SQLException` | ຈັບ error ຂອງ SQL ໂດຍສະເພາະ (ໃຊ້ຕອນລຶບ) |
| `DecimalFormat` | ຈັດຮູບແບບຕົວເລກ `1,500,000` (ບົດທີ 4) |
| `JOptionPane` | ກ່ອງຂໍ້ຄວາມ / ຢືນຢັນ |
| `DefaultTableModel` | ຕົວຈັດການຂໍ້ມູນໃນ `JTable` (ເພີ່ມ/ລຶບແຖວ) |
| `MysqlConnect` | ເຊື່ອມຕໍ່ MySQL |

---

## 2. ປະກາດ class

```java
public class PanelProduct extends javax.swing.JPanel {
```
- ສືບທອດຈາກ **`JPanel`** (ບໍ່ແມ່ນ JFrame ຄື Login)
- `JPanel` = ແຜ່ນ/ກອບ ທີ່ **ເປີດເອງບໍ່ໄດ້** ຕ້ອງເອົາໄປວາງໃນໜ້າຕ່າງ (JFrame) ອື່ນ — ເຮັດໃຫ້ໜ້າຫຼັກສະຫຼັບສະແດງໜ້າສິນຄ້າ, ໜ້າຍີ່ຫໍ້ ... ໃນໜ້າຕ່າງດຽວໄດ້

---

## 3. Attribute

```java
Connection conn = null;         // ເກັບການເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
PreparedStatement pst = null;   // ກຽມຄຳສັ່ງ sql
ResultSet rs = null;            // ເກັບຜົນໄດ້ຮັບຈາກການປະມວນຜົນຄຳສັ່ງ sql
```
- JDBC 3 ຕົວ (ອະທິບາຍລະອຽດໃນໄຟລ໌ Login)

```java
BrandItem brand = new BrandItem();
CategoryItem category = new CategoryItem();
```
- ສ້າງ **object** ຈາກ class `BrandItem` ແລະ `CategoryItem` ທັນທີທີ່ສ້າງ PanelProduct
- ໃຊ້ 2 ໜ້າທີ່: `brand.getName()` → ລາຍຊື່ຍີ່ຫໍ້ທັງໝົດ (ສຳລັບ ComboBox), `brand.getId("ຊື່")` → ລະຫັດຍີ່ຫໍ້ (ສຳລັບບັນທຶກລົງ DB)

```java
String barcode_old = null;
```
- ⭐ **ຕົວປ່ຽນສຳຄັນ** — ຈື່ລະຫັດບາໂຄ້ດ **ເດີມ** ຂອງແຖວທີ່ຄລິກເລືອກໃນຕາຕະລາງ
- ເປັນຫຍັງຕ້ອງມີ? ເພາະຜູ້ໃຊ້ອາດແກ້ບາໂຄ້ດໃນຊ່ອງ `txtBarcode` → ຕອນ UPDATE/DELETE ຕ້ອງໃຊ້ບາໂຄ້ດເດີມຫາແຖວໃນ DB

---

## 4. Constructor

```java
public PanelProduct() {
    initComponents();
```
- ສ້າງ component ທັງໝົດ (ຕ້ອງເອີ້ນກ່ອນໃຊ້ component ໃດໆ)

```java
    txtSearch.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ຄົ້ນຫາຂໍ້ມູນຍີ່ຫໍ້");
    txtSearch.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/search_text.svg"));
```
- ໃສ່ຂໍ້ຄວາມຈາງ ແລະ ໄອຄອນແວ່ນຂະຫຍາຍ 🔍 ໃນຊ່ອງຄົ້ນຫາ
- ⚠️ ຂໍ້ຄວາມຂຽນວ່າ "ຄົ້ນຫາຂໍ້ມູນ**ຍີ່ຫໍ້**" ແຕ່ຕົວຈິງຄົ້ນຫາ **ສິນຄ້າ** (ບາໂຄ້ດ/ຊື່ສິນຄ້າ) — ໜ້າຈະ copy ມາຈາກໜ້າຍີ່ຫໍ້

```java
    TableColumnAligner.alignCenter(jTable1, 0, 2, 3, 4, 9);
    TableColumnAligner.alignCenter(jTable1, 5, 6);
```
- ຈັດຖັນໄວ້ກາງ: ຖັນ 0 (ບາໂຄ້ດ), 2 (ຫົວໜ່ວຍ), 3 (ຈຳນວນ), 4 (ຈຳນວນຕ່ຳສຸດ), 9 (ສະຖານະ), 5–6 (ລາຄາ)
- ນັບຖັນເລີ່ມຈາກ **0** ຄືກັບ index ຂອງ array (ບົດທີ 6)
- ໃສ່ຕົວເລກໄດ້ຫຼາຍຕົວ ສະແດງວ່າເມັດທອດນີ້ໃຊ້ **varargs** (`int... columns`)

```java
    conn = MysqlConnect.connectDB();
```
- ເຊື່ອມຕໍ່ DB **ຄັ້ງດຽວ** ແລ້ວເກັບໄວ້ໃຊ້ຕະຫຼອດອາຍຸຂອງໜ້ານີ້

```java
    brandList();
    categoryList();
    tableUpdate();
}
```
- ໂຫຼດຍີ່ຫໍ້ໃສ່ ComboBox → ໂຫຼດປະເພດໃສ່ ComboBox → ໂຫຼດສິນຄ້າໃສ່ຕາຕະລາງ

---

## 5. `brandList()` ແລະ `categoryList()` — ເຕີມ ComboBox

```java
private void brandList() {
    txtBrand.removeAllItems();
    txtBrand.addItem(" -----------ເລືອກຍີ່ຫໍ້----------");
    for (String name : brand.getName()) {
        txtBrand.addItem(name);
    }
}
```
| ແຖວ | ຄຳອະທິບາຍ |
|---|---|
| `removeAllItems()` | ລ້າງລາຍການເກົ່າອອກກ່ອນ (ກັນຊ້ຳຖ້າເອີ້ນຫຼາຍຄັ້ງ) |
| `addItem(" ---ເລືອກຍີ່ຫໍ້---")` | ລາຍການທຳອິດ = **index 0** ເປັນຂໍ້ຄວາມແນະນຳ ບໍ່ແມ່ນຍີ່ຫໍ້ແທ້ |
| `for (String name : brand.getName())` | **for-each loop**: ວົນທຸກຊື່ໃນລາຍການ (`getName()` ສົ່ງຄືນ array ຫຼື ArrayList ຂອງ String) |
| `txtBrand.addItem(name)` | ເພີ່ມຊື່ຍີ່ຫໍ້ທີລະອັນ |

- `categoryList()` ເຮັດວຽກແບບດຽວກັນທຸກຢ່າງ ແຕ່ໃຊ້ກັບປະເພດ
- ⭐ ເພາະ index 0 ເປັນຂໍ້ຄວາມແນະນຳ → ໃນ `checkInputs()` ຈຶ່ງກວດ `getSelectedIndex() == 0` = "ຍັງບໍ່ໄດ້ເລືອກ"
- **for-each** vs **for ທຳມະດາ**: for-each ອ່ານງ່າຍກວ່າ ແຕ່ບໍ່ຮູ້ index; for ທຳມະດາ `for (int i = 0; i < n; i++)` ຮູ້ index

---

## 6. `tableUpdate()` — ສະແດງສິນຄ້າທັງໝົດໃນຕາຕະລາງ (Read)

```java
private void tableUpdate() {
    try {
        String sql = """
                     SELECT
                     p.barcode,
                     p.product_name,
                     p.unit,
                     p.quantity,
                     p.quantity_min,
                     p.cost_price,
                     p.retail_price,
                     b.brand_name,
                     c.category_name,
                     p.status
                     FROM product p
                     JOIN brand b ON p.brand_id = b.brand_id
                     JOIN category c ON p.category_id = c.category_id""";
```
**ອະທິບາຍ SQL:**
- `FROM product p` — ເອົາຂໍ້ມູນຈາກຕາຕະລາງ `product` ຕັ້ງຊື່ຫຍໍ້ (alias) ວ່າ `p`
- `JOIN brand b ON p.brand_id = b.brand_id` — **ເຊື່ອມຕາຕະລາງ**: ຈັບຄູ່ສິນຄ້າກັບຍີ່ຫໍ້ທີ່ `brand_id` ກົງກັນ → ເອົາ **ຊື່ຍີ່ຫໍ້** ມາສະແດງແທນລະຫັດ
- `JOIN category c ON ...` — ແບບດຽວກັນສຳລັບປະເພດ
- ເລືອກ 10 ຖັນ ລຽງຕາມລຳດັບຖັນຂອງ `jTable1`
- `JOIN` (= `INNER JOIN`) ສະແດງສະເພາະສິນຄ້າທີ່ **ມີຍີ່ຫໍ້ ແລະ ປະເພດຢູ່ແທ້**

```java
        pst = conn.prepareStatement(sql);
        rs = pst.executeQuery();
```
- ກຽມ SQL → ລັນ SELECT → ໄດ້ຜົນໃນ `rs`

```java
        DefaultTableModel d = (DefaultTableModel) jTable1.getModel();
        d.setRowCount(0);
```
- `jTable1.getModel()` ສົ່ງຄືນ `TableModel` → **Explicit Type Casting** `(DefaultTableModel)` ເພື່ອໃຊ້ເມັດທອດ `addRow`, `setRowCount` (ບົດທີ 3 ການແປງຊະນິດ)
- `setRowCount(0)` — **ລ້າງແຖວເກົ່າທັງໝົດ** ກ່ອນເຕີມໃໝ່ (ບໍ່ດັ່ງນັ້ນຂໍ້ມູນຈະຊ້ຳ)

```java
        DecimalFormat df1 = new DecimalFormat("#,##0");
        DecimalFormat df2 = new DecimalFormat("#,##0.##");
```
- `df1` — ຈຳນວນເຕັມ ມີ `,`: `1500` → `1,500`
- `df2` — ມີທົດສະນິຍົມ **ສູງສຸດ** 2 ຕຳແໜ່ງ: `1500.5` → `1,500.5`, `1500` → `1,500`
- `0` = ຕ້ອງສະແດງຕົວເລກສະເໝີ, `#` = ສະແດງເມື່ອມີຄ່າ

```java
        while (rs.next()) {
            d.addRow(new Object[]{
                rs.getString(1),               // barcode
                rs.getString(2),               // product_name
                rs.getString(3),               // unit
                df1.format(rs.getInt(4)),      // quantity      → "1,200"
                df1.format(rs.getInt(5)),      // quantity_min
                df2.format(rs.getDouble(6)),   // cost_price    → "15,000.5"
                df2.format(rs.getDouble(7)),   // retail_price
                rs.getString(8),               // brand_name
                rs.getString(9),               // category_name
                rs.getString(10),              // status
            });
        }
```
- `while (rs.next())` — **ວົນທຸກແຖວ** ຂອງຜົນລັບ (ບົດທີ 5 while loop) ຈົນ `next()` ເປັນ false
- `new Object[]{...}` — **array** ຂອງ Object 10 ຕົວ = 1 ແຖວໃນຕາຕະລາງ (ບົດທີ 6)
- `Object` ເພາະແຕ່ລະຖັນເປັນຊະນິດຕ່າງກັນໄດ້ (Polymorphism: ທຸກ class ເປັນລູກຂອງ Object)
- `rs.getString(1)` — ອ່ານຖັນທີ 1 ຂອງ SELECT (ນັບຈາກ **1**)
- `rs.getInt(4)` / `rs.getDouble(6)` — ອ່ານເປັນຕົວເລກ ແລ້ວ `format` ເປັນ String ມີ `,`
- `,` ທ້າຍຕົວສຸດທ້າຍ `rs.getString(10),` — Java ອະນຸຍາດ (ບໍ່ error)

```java
    } catch (Exception e) {
        JOptionPane.showMessageDialog(this, e);
    }
}
```

---

## 7. `clearForm()` — ລ້າງຟອມ

```java
private void clearForm() {
    txtBarcode.setText("");
    txtProduct_name.setText("");
    txtUnit.setText("");
    txtQuantity.setText("");
    txtQuantity_min.setText("");
    txtCost_price.setText("");
    txtRetail_price.setText("");
    txtBrand.setSelectedIndex(0);
    txtCategory.setSelectedIndex(0);
    txtStatus.setSelectedIndex(0);
    jTable1.clearSelection();
}
```
- `setText("")` — ລ້າງຂໍ້ຄວາມໃນ TextField
- `setSelectedIndex(0)` — ກັບໄປລາຍການທຳອິດຂອງ ComboBox ("---ເລືອກ---" ສຳລັບຍີ່ຫໍ້/ປະເພດ, "ມີ" ສຳລັບສະຖານະ)
- `clearSelection()` — ຍົກເລີກການເລືອກແຖວໃນຕາຕະລາງ ⭐ ສຳຄັນ ເພາະປຸ່ມເພີ່ມ/ແກ້ໄຂ/ລຶບ ກວດ `getSelectedRow()`
- ຖືກເອີ້ນໃຊ້: ກົດຍົກເລີກ, ຫຼັງເພີ່ມ/ແກ້ໄຂ/ລຶບສຳເລັດ, ກົດ Cancel ໃນກ່ອງຢືນຢັນລຶບ

---

## 8. `checkInputs()` — ກວດວ່າປ້ອນຄົບບໍ

```java
private boolean checkInputs() {
    return txtBarcode.getText().isBlank()
            || txtProduct_name.getText().isBlank()
            || txtUnit.getText().isBlank()
            || txtQuantity.getText().isBlank()
            || txtQuantity_min.getText().isBlank()
            || txtCost_price.getText().isBlank()
            || txtRetail_price.getText().isBlank()
            || txtBrand.getSelectedIndex() == 0
            || txtCategory.getSelectedIndex() == 0;
}
```
- return type `boolean` — ສົ່ງຄືນ `true` / `false`
- ⭐ ຄວາມໝາຍ: ສົ່ງຄືນ **`true` = ມີຊ່ອງທີ່ຍັງບໍ່ຄົບ** (ຊື່ເມັດທອດອາດເຮັດໃຫ້ເຂົ້າໃຈຜິດ ຊື່ທີ່ຊັດກວ່າຄື `hasEmptyInput()`)
- ໃຊ້ `||` ເຊື່ອມ 9 ເງື່ອນໄຂ — ອັນໃດອັນໜຶ່ງເປັນ true ຜົນກໍເປັນ true
- **Short-circuit**: `||` ຢຸດກວດທັນທີເມື່ອພົບ true ທຳອິດ
- ບໍ່ກວດ `txtStatus` ເພາະມີຄ່າ "ມີ"/"ບໍ່ມີ" ເລືອກໄວ້ສະເໝີ
- ຂຽນເປັນເມັດທອດແຍກ → **ໃຊ້ຊ້ຳ** ໃນ btnAdd ແລະ btnEdit (ປະໂຫຍດຂອງ method)

---

## 9. `initComponents()` — ໂຄ້ດທີ່ NetBeans ສ້າງ

ໂຄ້ດສ່ວນນີ້ຍາວ ແຕ່ເຮັດແບບດຽວກັນຊ້ຳໆ — ຮຽນຮູ້ **ຮູບແບບ (pattern)** ກໍພຽງພໍ:

**9.1 ⚠️ ກຸ່ມ component ທີ່ບໍ່ໄດ້ໃຊ້**
```java
jPanel6 = new javax.swing.JPanel();
jTextField9 ... jTextField15, jComboBox4 ... jComboBox6,
btnAdd1, btnEdit1, btnDelete1, btnCancel1, jLabel5, jLabel9, jLabel13 ... jLabel20
```
- `jPanel6` ແລະ component ຂ້າງໃນ **ບໍ່ໄດ້ຖືກເພີ່ມເຂົ້າ layout** (ບໍ່ມີ `addComponent(jPanel6)`) ແລະ ປຸ່ມບໍ່ມີ ActionListener
- ໜ້າຈະເປັນ **ສຳເນົາເກົ່າ** ທີ່ copy ໄວ້ ແລ້ວລືມລຶບ → ບໍ່ສະແດງໃນໜ້າຈໍ ແຕ່ຍັງເປືອງໜ່ວຍຄວາມຈຳ → ຄວນລຶບໃນໜ້າ Design ຂອງ NetBeans

**9.2 ກອບທີ່ໃຊ້ແທ້ `jPanel1`**
```java
jPanel1.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "ຈັດການຂໍ້ມູນສິນຄ້າ\n", ...));
jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());
```
- `createTitledBorder` — ເສັ້ນຂອບມີຫົວຂໍ້ "ຈັດການຂໍ້ມູນສິນຄ້າ"
- `AbsoluteLayout` — layout ຂອງ NetBeans ວາງ component ຕາມ **ພິກັດ x, y** ຄົງທີ່

**9.3 ຮູບແບບການເພີ່ມ Label ແລະ TextField** (ຊ້ຳກັນທຸກຊ່ອງ)
```java
jLabel1.setFont(new java.awt.Font("Lao_SomVang", 0, 12));
jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
jLabel1.setText("ລະຫັດບາໂຄ້ດ");
jPanel1.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 50, -1, -1));

txtBarcode.setFont(new java.awt.Font("Lao_SomVang", 0, 12));
txtBarcode.addActionListener(this::txtBarcodeActionPerformed);
jPanel1.add(txtBarcode, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 50, 130, -1));
```
- `TRAILING` — ຈັດຂໍ້ຄວາມຊິດຂວາ (ໃກ້ຊ່ອງປ້ອນ)
- `AbsoluteConstraints(x, y, width, height)` — `-1` = ໃຊ້ຂະໜາດທີ່ເໝາະສົມອັດຕະໂນມັດ
  - `(120, 50, 130, -1)` = ວາງທີ່ x=120, y=50, ກວ້າງ 130px
- `addActionListener` — ກົດ Enter → ເອີ້ນເມັດທອດ

**9.4 ຊ່ອງຕົວເລກມີ KeyListener ເພີ່ມ**
```java
txtQuantity.addKeyListener(new java.awt.event.KeyAdapter() {
    public void keyReleased(java.awt.event.KeyEvent evt) {
        txtQuantityKeyReleased(evt);
    }
});
```
- `new KeyAdapter() { ... }` = **Anonymous class** (class ບໍ່ມີຊື່) ທີ່ສືບທອດ `KeyAdapter` ແລ້ວ **override** `keyReleased`
- `keyReleased` = ເຮັດວຽກທຸກຄັ້ງທີ່ **ປ່ອຍປຸ່ມຄີບອດ** → ໃສ່ `,` ໃຫ້ຕົວເລກທັນທີ
- ມີໃນ `txtQuantity`, `txtQuantity_min`, `txtCost_price`, `txtRetail_price`, `txtSearch`

**9.5 ComboBox ສະຖານະ**
```java
txtStatus.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "ມີ", "ບໍ່ມີ" }));
```
- ກຳນົດລາຍການຄົງທີ່ 2 ອັນດ້ວຍ **array ຂອງ String**; `<>` = diamond operator (generic)

**9.6 ປຸ່ມ** (ສີ ຕົວໜັງສື event)
```java
btnAdd.setBackground(new java.awt.Color(51, 51, 255));   // ສີນ້ຳເງິນ
btnAdd.setText("ເພີ່ມ");
btnAdd.addActionListener(this::btnAddActionPerformed);
```
| ປຸ່ມ | ສີ RGB | event |
|---|---|---|
| ເພີ່ມ | (51, 51, 255) ນ້ຳເງິນ | `btnAddActionPerformed` |
| ແກ້ໄຂ | (255, 153, 51) ສົ້ມ | `btnEditActionPerformed` |
| ລຶບ | (255, 0, 0) ແດງ ຕົວໜັງສືຂາວ | `btnDeleteActionPerformed` |
| ຍົກເລີກ | (0, 255, 204) ຂຽວອ່ອນ | `btnCancelActionPerformed` |

**9.7 ຕາຕະລາງ `jTable1`** ⭐ (ມີ Polymorphism ໃນນີ້)
```java
jTable1.setModel(new javax.swing.table.DefaultTableModel(
    new Object [][] {
        {null, null, ...}, {null, null, ...}, ...      // 4 ແຖວຫວ່າງເລີ່ມຕົ້ນ
    },
    new String [] {
        "ລະຫັດບາໂຄ້ດ", "ລາຍການສິນຄ້າ", "ຫົວໜ່ວຍ", "ຈຳນວນ", "ຈຳນວນຕຳສຸດ",
        "ລາຄາຕົ້ນທືນ", "ລາຄາຂາຍ", "ຍີ່ຫໍ້", "ປະເພດ", "ສະຖານະ"
    }
) {
    boolean[] canEdit = new boolean [] {
        false, false, false, true, false, false, false, false, false, false
    };

    public boolean isCellEditable(int rowIndex, int columnIndex) {
        return canEdit [columnIndex];
    }
});
```
- `new Object[][]` — **array 2 ມິຕິ** (ບົດທີ 6) = ຂໍ້ມູນເລີ່ມຕົ້ນ (ຖືກລ້າງດ້ວຍ `setRowCount(0)` ໃນ tableUpdate)
- `new String[]` — ຫົວຖັນ 10 ຖັນ
- `{ ... }` ຫຼັງ `new DefaultTableModel(...)` = **anonymous class** ສືບທອດ DefaultTableModel
- **Override** `isCellEditable` → ກຳນົດວ່າຖັນໃດແກ້ໃນຕາຕະລາງໄດ້ = **Polymorphism ແບບ overriding** (ຕົວຢ່າງດີສຳລັບຕອບອາຈານ)
- `canEdit` array: ມີແຕ່ຖັນ **index 3 (ຈຳນວນ)** ເປັນ `true`

```java
jTable1.addMouseListener(new java.awt.event.MouseAdapter() {
    public void mouseClicked(java.awt.event.MouseEvent evt) {
        jTable1MouseClicked(evt);
    }
});
jScrollPane1.setViewportView(jTable1);
```
- ຄລິກແຖວ → ເອີ້ນ `jTable1MouseClicked`
- ໃສ່ຕາຕະລາງໃນ `JScrollPane` → ມີແຖບເລື່ອນເມື່ອຂໍ້ມູນຫຼາຍ ແລະ ສະແດງຫົວຖັນ

**9.8 GroupLayout** — ຈັດ `jPanel7` (ທີ່ຫໍ່ `jPanel1`), `txtSearch`, `jScrollPane1` ລຽງຈາກເທິງລົງລຸ່ມ

---

## 10. ກົດ Enter ຍ້າຍຊ່ອງ

```java
private void txtBarcodeActionPerformed(...)      { txtProduct_name.requestFocus(); }
private void txtProduct_nameActionPerformed(...) { txtUnit.requestFocus(); }
private void txtUnitActionPerformed(...)         { txtQuantity.requestFocus(); }
private void txtQuantityActionPerformed(...)     { txtQuantity_min.requestFocus(); }
private void txtQuantity_minActionPerformed(...) { txtCost_price.requestFocus(); }
private void txtCost_priceActionPerformed(...)   { txtRetail_price.requestFocus(); }
private void txtRetail_priceActionPerformed(...) { }   // ຫວ່າງ — ຊ່ອງສຸດທ້າຍ
```
- ລຳດັບ: ບາໂຄ້ດ → ຊື່ສິນຄ້າ → ຫົວໜ່ວຍ → ຈຳນວນ → ຈຳນວນຕ່ຳສຸດ → ລາຄາຕົ້ນທຶນ → ລາຄາຂາຍ
- ປ້ອນຂໍ້ມູນໄວ ບໍ່ຕ້ອງຈັບເມົ້າ

---

## 11. ໃສ່ຈຸດ `,` ໃຫ້ຕົວເລກຕອນພິມ

```java
private void txtQuantityKeyReleased(...)     { NumberComma.numberFormat(txtQuantity, false); }
private void txtQuantity_minKeyReleased(...) { NumberComma.numberFormat(txtQuantity_min, false); }
private void txtCost_priceKeyReleased(...)   { NumberComma.numberFormat(txtCost_price, true); }
private void txtRetail_priceKeyReleased(...) { NumberComma.numberFormat(txtRetail_price, true); }
```
- `numberFormat(ຊ່ອງ, boolean)` — static method ຂອງໂປຣເຈັກ
- ຈາກການເອີ້ນໃຊ້: parameter ທີ 2 ໜ້າຈະໝາຍເຖິງ **ອະນຸຍາດທົດສະນິຍົມບໍ** — ຈຳນວນ = `false` (ເລກເຕັມ), ລາຄາ = `true` (ມີທົດສະນິຍົມໄດ້) — ກວດກັບໂຄ້ດ `NumberComma` ອີກຄັ້ງ
- ພິມ `1500000` → ສະແດງ `1,500,000`

---

## 12. ກົດ "ຍົກເລີກ"

```java
private void btnCancelActionPerformed(java.awt.event.ActionEvent evt) {
    clearForm();
}
```
- ເອີ້ນ `clearForm()` — ຕົວຢ່າງການ **ໃຊ້ method ຊ້ຳ**

---

## 13. ກົດ "ເພີ່ມ" (Create) ⭐

**ຂັ້ນທີ 1: ຫ້າມເພີ່ມຖ້າກຳລັງເລືອກແຖວ**
```java
if (jTable1.getSelectedRow() >= 0) {
    JOptionPane.showMessageDialog(this, "ເມື່ອທ່ານເລືອກຂໍ້ມູນໃນຕາຕະລາງທ່ານບໍ່ສາມາດກົດປຸ່ມເພີ່ມໄດ້ ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
    return;
}
```
- `getSelectedRow()` — ສົ່ງຄືນ index ແຖວທີ່ເລືອກ, **`-1` = ບໍ່ໄດ້ເລືອກ**
- `>= 0` = ກຳລັງເລືອກແຖວ (ໂໝດແກ້ໄຂ) → ຫ້າມເພີ່ມ ເພື່ອກັນສັບສົນ

**ຂັ້ນທີ 2: ກວດປ້ອນຄົບ**
```java
if (checkInputs()) {
    JOptionPane.showMessageDialog(this, "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນດ້ວຍ", "ແຈ້ງເຕືອນ", JOptionPane.WARNING_MESSAGE);
    return;
}
```

**ຂັ້ນທີ 3: ກວດບາໂຄ້ດຊ້ຳ**
```java
try {
    String sql = "SELECT *FROM Product WHERE barcode=?";
    pst = conn.prepareStatement(sql);
    pst.setString(1, txtBarcode.getText());
    rs = pst.executeQuery();
    if (rs.next()) {
        JOptionPane.showMessageDialog(this, "ລະຫັດບາໂຄ້ດ " + txtBarcode.getText() + " ຖືກນຳໃຊ້ແລ້ວ ", "ຜິດພາດ", JOptionPane.WARNING_MESSAGE);
        txtBarcode.requestFocus();
        return;
    }
} catch (Exception e) {
    JOptionPane.showMessageDialog(this, e);
    return;
}
```
- ຫາສິນຄ້າທີ່ມີບາໂຄ້ດນີ້ — `rs.next()` ເປັນ true = **ມີແລ້ວ** → ແຈ້ງເຕືອນ, ຍ້າຍເຄີເຊີໄປຊ່ອງບາໂຄ້ດ, ອອກ
- ບາໂຄ້ດເປັນ PK ຖ້າບໍ່ກວດ MySQL ກໍຈະ error "Duplicate entry" — ການກວດກ່ອນເຮັດໃຫ້ຂໍ້ຄວາມເປັນມິດກັບຜູ້ໃຊ້
- `return` ໃນ `catch` — ຖ້າກວດບໍ່ໄດ້ ກໍບໍ່ບັນທຶກຕໍ່

**ຂັ້ນທີ 4: INSERT**
```java
try {
    String sql = "INSERT INTO product VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    pst = conn.prepareStatement(sql);
    pst.setString(1, txtBarcode.getText());
    pst.setString(2, txtProduct_name.getText());
    pst.setString(3, txtUnit.getText());
    pst.setString(4, txtQuantity.getText().replace(",", ""));
    pst.setString(5, txtQuantity_min.getText().replace(",", ""));
    pst.setString(6, txtCost_price.getText().replace(",", ""));
    pst.setString(7, txtRetail_price.getText().replace(",", ""));
    pst.setString(8, brand.getId(txtBrand.getSelectedItem().toString()));
    pst.setString(9, category.getId(txtCategory.getSelectedItem().toString()));
    pst.setString(10, txtStatus.getSelectedItem().toString());
```
- `?` 10 ຕົວ = 10 ຖັນຂອງ product **ລຽງຕາມລຳດັບຖັນໃນຕາຕະລາງ** (ເພາະບໍ່ໄດ້ລະບຸຊື່ຖັນ)
- `.replace(",", "")` — **ເອົາ `,` ອອກ** ກ່ອນບັນທຶກ: `"1,500,000"` → `"1500000"` (DB ຮັບ `,` ບໍ່ໄດ້)
- `getSelectedItem().toString()` — ເອົາ **ຊື່** ທີ່ເລືອກໃນ ComboBox
- `brand.getId(ຊື່)` — ແປງ **ຊື່ຍີ່ຫໍ້ → brand_id** ເພາະ product ເກັບ FK ເປັນລະຫັດ
- ສະຖານະເກັບເປັນຂໍ້ຄວາມ "ມີ"/"ບໍ່ມີ"

```java
    if (pst.executeUpdate() > 0) {
        clearForm();
        tableUpdate();
        JOptionPane.showMessageDialog(this, "ຂໍ້ມູນຖືກບັນທຶກລົງໃນຖານຂໍ້ມູນສຳເລັດ", "ສຳເລັດ", JOptionPane.WIDTH, new FlatSVGIcon("images_svg/done.svg"));
    }
} catch (Exception e) {
    JOptionPane.showMessageDialog(this, e);
}
```
- `executeUpdate()` — ໃຊ້ກັບ INSERT/UPDATE/DELETE ສົ່ງຄືນ **ຈຳນວນແຖວທີ່ປ່ຽນ** → `> 0` = ສຳເລັດ
- ສຳເລັດ → ລ້າງຟອມ → ໂຫຼດຕາຕະລາງໃໝ່ (ເຫັນສິນຄ້າໃໝ່) → ກ່ອງ "ສຳເລັດ" ມີໄອຄອນ ✔ ທີ່ກຳນົດເອງ

---

## 14. ຄລິກແຖວໃນຕາຕະລາງ

```java
private void jTable1MouseClicked(java.awt.event.MouseEvent evt) {
    DefaultTableModel d = (DefaultTableModel) jTable1.getModel();
    int selectIndex = jTable1.getSelectedRow();

    txtBarcode.setText(d.getValueAt(selectIndex, 0).toString());
    txtProduct_name.setText(d.getValueAt(selectIndex, 1).toString());
    txtUnit.setText(d.getValueAt(selectIndex, 2).toString());
    txtQuantity.setText(d.getValueAt(selectIndex, 3).toString());
    txtQuantity_min.setText(d.getValueAt(selectIndex, 4).toString());
    txtCost_price.setText(d.getValueAt(selectIndex, 5).toString());
    txtRetail_price.setText(d.getValueAt(selectIndex, 6).toString());
    txtBrand.setSelectedItem(d.getValueAt(selectIndex, 7).toString());
    txtCategory.setSelectedItem(d.getValueAt(selectIndex, 8).toString());
    txtStatus.setSelectedItem(d.getValueAt(selectIndex, 9).toString());

    barcode_old = d.getValueAt(selectIndex, 0).toString();
}
```
- `getSelectedRow()` — ແຖວທີ່ຄລິກ
- `d.getValueAt(ແຖວ, ຖັນ)` — ເອົາຄ່າໃນຕາລາງ (ສົ່ງຄືນ `Object`) → `.toString()` ແປງເປັນ String
- ເອົາຂໍ້ມູນແຖວນັ້ນ **ໄປສະແດງໃນຟອມ** ເພື່ອແກ້ໄຂ/ລຶບ
- `setSelectedItem("ຊື່")` — ເລືອກລາຍການໃນ ComboBox ທີ່ກົງກັບຊື່
- ⭐ **`barcode_old = ...`** — ຈື່ບາໂຄ້ດເດີມໄວ້ ໃຊ້ໃນ UPDATE/DELETE
- ຄອມເມັນໃນໂຄ້ດຂຽນວ່າ "ລະຫັດບາໂຄ້ດແກ້ບໍ່ໄດ້" ແຕ່ຕົວຈິງ **ແກ້ໄດ້** ເພາະ UPDATE ມີ `barcode = ?`

---

## 15. ກົດ "ແກ້ໄຂ" (Update) ⭐

**ຂັ້ນທີ 1–2: ຕ້ອງເລືອກແຖວ ແລະ ປ້ອນຄົບ**
```java
if (jTable1.getSelectedRow() < 0) {
    JOptionPane.showMessageDialog(this, "ກະລຸນາເລືອກຂໍ້ມຼນໃນຕາຕະລາງກ່ອນ ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
    return;
}
if (checkInputs()) { ... return; }
```
- ກົງກັນຂ້າມກັບປຸ່ມເພີ່ມ: `< 0` = ບໍ່ໄດ້ເລືອກ → ຫ້າມແກ້ໄຂ

**ຂັ້ນທີ 3: ກວດບາໂຄ້ດໃໝ່ຊ້ຳກັບສິນຄ້າ "ອື່ນ" ບໍ**
```java
String sql = "SELECT *FROM Product WHERE barcode=? && barcode != ?";
pst.setString(1, txtBarcode.getText());   // ບາໂຄ້ດໃໝ່ (ທີ່ພິມໃນຊ່ອງ)
pst.setString(2, barcode_old);            // ບາໂຄ້ດເດີມ
```
- ຄວາມໝາຍ: "ຫາສິນຄ້າທີ່ບາໂຄ້ດ = **ບາໂຄ້ດໃໝ່** ແຕ່ **ບໍ່ແມ່ນ** ສິນຄ້າຕົວເອງ"
- ຕົວຢ່າງ: ສິນຄ້າ A (`001`), B (`002`); ເລືອກ A
  - ບໍ່ປ່ຽນບາໂຄ້ດ (`001`) → `barcode='001' AND barcode!='001'` → ບໍ່ພົບ → ຜ່ານ ✔
  - ປ່ຽນເປັນ `003` → ບໍ່ພົບ → ຜ່ານ ✔
  - ປ່ຽນເປັນ `002` → ພົບ B → "ຖືກນຳໃຊ້ແລ້ວ" ✘
- ຖ້າບໍ່ມີ `barcode != ?` → ແກ້ໄຂໂດຍບໍ່ປ່ຽນບາໂຄ້ດຈະ **ແຈ້ງວ່າຊ້ຳກັບຕົວເອງ** ທຸກຄັ້ງ

**ຂັ້ນທີ 4: UPDATE**
```java
String sql = """
             UPDATE product SET
                 barcode = ?, product_name=?, unit=?, quantity=?, quantity_min=?,
                 cost_price=?, retail_price=?, brand_id=?, category_id=?, status=?
             WHERE barcode=?
             """;
// setString(1..10) ຄືກັບ INSERT
pst.setString(11, barcode_old);
```
- `SET ຖັນ = ຄ່າ` — ປ່ຽນ 10 ຖັນ
- `WHERE barcode = ?` (ຕົວທີ 11) ໃຊ້ **`barcode_old`** → ຫາແຖວເດີມໃຫ້ເຈີ ເຖິງວ່າຈະປ່ຽນບາໂຄ້ດ
- ⚠️ ຖ້າບໍ່ມີ WHERE → **ທຸກແຖວ** ໃນຕາຕະລາງຈະຖືກປ່ຽນ!
- ສຳເລັດ → `clearForm()` → `tableUpdate()` → ກ່ອງ "ສຳເລັດ"

---

## 16. ກົດ "ລຶບ" (Delete) ⭐

**ຂັ້ນທີ 1: ຕ້ອງເລືອກແຖວ**
```java
if (jTable1.getSelectedRow() < 0) {
    JOptionPane.showMessageDialog(this, " ກະລຸນາເລືອກຂໍ້ມູນໃນຕາຕະລາງກ່ອນແກ້ໄຂດ້ວຍ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
    return;
}
```
- ⚠️ ຂໍ້ຄວາມຂຽນວ່າ "ກ່ອນ**ແກ້ໄຂ**" ແຕ່ຢູ່ໃນປຸ່ມ **ລຶບ** — ຄວນແກ້ເປັນ "ກ່ອນລຶບ"

**ຂັ້ນທີ 2: ຖາມຢືນຢັນ**
```java
int data = JOptionPane.showConfirmDialog(
        this,
        "ທ່ານຕ້ອງການລືບຂໍ້ມູນລາຍການນີ້ແທ້ ຫຼື ບໍ່?",
        "ຢືນຢັນ",
        JOptionPane.OK_CANCEL_OPTION,
        JOptionPane.QUESTION_MESSAGE
);
if (data != 0) {
    clearForm();
    return;
}
```
- `showConfirmDialog` — ກ່ອງມີປຸ່ມ OK / Cancel, ສົ່ງຄືນ `int` (ບົດທີ 4)
- ✅ ຄ່າທີ່ສົ່ງຄືນ (ທົດສອບແລ້ວ): OK = `0`, Cancel = `2`, ກົດ ✕ ປິດ = `-1`
- `data != 0` = ບໍ່ໄດ້ກົດ OK → ລ້າງຟອມ ແລ້ວອອກ (ອ່ານງ່າຍກວ່າຖ້າຂຽນ `data != JOptionPane.OK_OPTION`)
- ເປັນຫຍັງຕ້ອງຢືນຢັນ? ການລຶບ **ກູ້ຄືນບໍ່ໄດ້** ກັນກົດຜິດ

**ຂັ້ນທີ 3: DELETE**
```java
try {
    String sql = "DELETE FROM product WHERE barcode=?";
    pst = conn.prepareStatement(sql);
    pst.setString(1, barcode_old);
    if (pst.executeUpdate() > 0) {
        JOptionPane.showMessageDialog(this, "ຂໍ້ມູນຖືກລົບອອກຈາກຖານຂໍ້ມູນ ສຳເລັດ", "ສຳເລັດ", JOptionPane.WIDTH, new FlatSVGIcon("images_svg/done.svg"));
        clearForm();
        tableUpdate();
    }
```
- ລຶບແຖວທີ່ບາໂຄ້ດ = `barcode_old`

**ຂັ້ນທີ 4: ຈັດການ error ຂອງ Foreign Key** ⭐
```java
} catch (SQLException e) {
    if (e.getErrorCode() == 1451) {
        JOptionPane.showMessageDialog(this, "ບໍ່ສາມາດລືບສິນຄ້ານີ້ໄດ້ ເນື່ອງຈາກ ຖືກນຳໃຊ້ຢູ່", "ຜິດພາດ", JOptionPane.WARNING_MESSAGE);
    } else {
        JOptionPane.showMessageDialog(this, e);
    }
}
```
- ຈັບ **`SQLException`** ໂດຍສະເພາະ (ບໍ່ແມ່ນ Exception ທົ່ວໄປ) ເພື່ອໃຊ້ `getErrorCode()`
- **Error 1451** ຂອງ MySQL = "Cannot delete or update a parent row: a foreign key constraint fails" → ສິນຄ້ານີ້ຖືກອ້າງອີງຢູ່ຕາຕະລາງອື່ນ (ເຊັ່ນ ລາຍການຂາຍ) ລຶບແລ້ວຂໍ້ມູນການຂາຍຈະຂາດ MySQL ຈຶ່ງບໍ່ອະນຸຍາດ
- ແປງ error ທາງເທັກນິກເປັນ **ຂໍ້ຄວາມພາສາລາວທີ່ຜູ້ໃຊ້ເຂົ້າໃຈ** — ຈຸດນີ້ອາຈານມັກໃຫ້ຄະແນນ

---

## 17. ຄົ້ນຫາ (Read + ເງື່ອນໄຂ)

```java
private void txtSearchKeyReleased(java.awt.event.KeyEvent evt) {
    try {
        String sql = """
                     SELECT p.barcode, ... , p.status
                     FROM product p
                     JOIN brand b ON p.brand_id = b.brand_id
                     JOIN category c ON p.category_id = c.category_id
                     WHERE CONCAT(p.barcode, p.product_name) LIKE ?
                     """;
        pst = conn.prepareStatement(sql);
        pst.setString(1, "%" + txtSearch.getText() + "%");
        rs = pst.executeQuery();
        // ... ສ່ວນທີ່ເຫຼືອຄືກັບ tableUpdate() ທຸກຢ່າງ
```
- ເຮັດວຽກ **ທຸກຄັ້ງທີ່ປ່ອຍປຸ່ມ** ໃນຊ່ອງຄົ້ນຫາ → ຜົນປ່ຽນທັນທີ (live search)
- `CONCAT(p.barcode, p.product_name)` — ຕໍ່ບາໂຄ້ດກັບຊື່ສິນຄ້າ ເພື່ອຄົ້ນຫາທັງ 2 ຢ່າງໃນຄັ້ງດຽວ
- `LIKE '%ຄຳ%'` — `%` = ຕົວອັກສອນໃດກໍໄດ້ຈັກຕົວກໍໄດ້ → ຫາຄຳທີ່ **ຢູ່ບ່ອນໃດກໍໄດ້** ໃນຂໍ້ຄວາມ
  - ພິມ `ນ້ຳ` → `'%ນ້ຳ%'` → ພົບ "ນ້ຳດື່ມ", "ນ້ຳອັດລົມ", "ເຄື່ອງດື່ມນ້ຳຫວານ"
- ໃສ່ `%` ໃນ Java ແລ້ວສົ່ງຜ່ານ `?` → ຍັງປອດໄພຈາກ SQL Injection
- ຊ່ອງຄົ້ນຫາຫວ່າງ → `'%%'` → ສະແດງທັງໝົດ

---

## 18. ສະຫຼຸບການເຮັດວຽກທັງໝົດ

```
ເປີດໜ້າ → Constructor
          ├─ initComponents()      ສ້າງ component
          ├─ ຕົບແຕ່ງຊ່ອງຄົ້ນຫາ, ຈັດຖັນກາງ
          ├─ connectDB()           ເຊື່ອມ DB
          ├─ brandList()           ເຕີມ ComboBox ຍີ່ຫໍ້
          ├─ categoryList()        ເຕີມ ComboBox ປະເພດ
          └─ tableUpdate()         ເຕີມຕາຕະລາງ

ເພີ່ມ:   ບໍ່ເລືອກແຖວ → ປ້ອນຄົບ → ບາໂຄ້ດບໍ່ຊ້ຳ → INSERT → ລ້າງຟອມ + ໂຫຼດຕາຕະລາງ
ແກ້ໄຂ:  ຄລິກແຖວ (ຈື່ barcode_old) → ແກ້ຂໍ້ມູນ → ປ້ອນຄົບ → ບາໂຄ້ດບໍ່ຊ້ຳຄົນອື່ນ → UPDATE ... WHERE barcode=barcode_old
ລຶບ:    ຄລິກແຖວ → ຢືນຢັນ OK → DELETE ... WHERE barcode=barcode_old → (1451 = ຖືກໃຊ້ຢູ່)
ຄົ້ນຫາ: ພິມ → SELECT ... LIKE '%ຄຳ%' → ໂຫຼດຕາຕະລາງໃໝ່
```

---

## 19. ຄຳຖາມທີ່ອາຈານອາດຖາມ ພ້ອມຄຳຕອບ

| ຄຳຖາມ | ຄຳຕອບ |
|---|---|
| CRUD ແມ່ນຫຍັງ? ຢູ່ໃສໃນໂຄ້ດ? | Create/Read/Update/Delete → btnAdd / tableUpdate+search / btnEdit / btnDelete |
| JPanel ກັບ JFrame ຕ່າງກັນແນວໃດ? | JFrame ເປັນໜ້າຕ່າງເປີດເອງໄດ້; JPanel ເປັນກອບ ຕ້ອງວາງໃນ JFrame |
| `barcode_old` ມີໄວ້ເຮັດຫຍັງ? | ຈື່ບາໂຄ້ດເດີມ ເພື່ອໃຊ້ໃນ WHERE ຂອງ UPDATE/DELETE ເຖິງຜູ້ໃຊ້ຈະແກ້ບາໂຄ້ດໃນຊ່ອງ |
| ເປັນຫຍັງ SQL ແກ້ໄຂມີ `barcode != ?`? | ບໍ່ໃຫ້ນັບສິນຄ້າຕົວເອງວ່າຊ້ຳ |
| `setRowCount(0)` ເຮັດຫຍັງ? | ລ້າງແຖວເກົ່າໃນຕາຕະລາງກ່ອນເຕີມໃໝ່ |
| ເປັນຫຍັງຕ້ອງ `replace(",", "")`? | ຊ່ອງຕົວເລກມີ `,` ຈາກ NumberComma ແຕ່ DB ຮັບແຕ່ຕົວເລກ |
| `JOIN` ໃຊ້ເພື່ອຫຍັງ? | ເຊື່ອມ product ກັບ brand/category ເພື່ອສະແດງ **ຊື່** ແທນລະຫັດ |
| `LIKE '%...%'` ໝາຍຄວາມວ່າແນວໃດ? | ຄົ້ນຫາຄຳທີ່ຢູ່ບ່ອນໃດກໍໄດ້ໃນຂໍ້ຄວາມ |
| Error 1451 ແມ່ນຫຍັງ? | ລຶບບໍ່ໄດ້ເພາະມີ Foreign Key ອ້າງອີງຢູ່ |
| `executeQuery` vs `executeUpdate`? | SELECT → ResultSet / INSERT,UPDATE,DELETE → int ຈຳນວນແຖວ |
| `getSelectedRow()` ສົ່ງຄືນ -1 ເມື່ອໃດ? | ເມື່ອບໍ່ໄດ້ເລືອກແຖວໃດ |
| ຢູ່ໃສມີ Polymorphism? | override `isCellEditable` ໃນ DefaultTableModel, override `keyReleased`/`mouseClicked` ໃນ Adapter |
| ຢູ່ໃສມີ Inheritance? | `PanelProduct extends JPanel` |
| ຢູ່ໃສມີ Array? | `new Object[]{...}` ໃນ addRow, `canEdit` boolean array, `new Object[][]` ຂອງ table model |
| ເປັນຫຍັງຂຽນ `checkInputs()` ແຍກ? | ໃຊ້ຊ້ຳໄດ້ໃນປຸ່ມເພີ່ມ ແລະ ແກ້ໄຂ ບໍ່ຕ້ອງຂຽນຊ້ຳ |

---

## 20. ⚠️ ບັນຫາທີ່ພົບໃນໂຄ້ດ (ຄວນແກ້ກ່ອນສົ່ງ/ນຳສະເໜີ)

**ກ. ອາດເຮັດໃຫ້ໂປຣແກຣມເຮັດວຽກຜິດ**

| # | ບັນຫາ | ຜົນກະທົບ | ວິທີແກ້ |
|---|---|---|---|
| 1 | ຖັນ "ຈຳນວນ" ໃນຕາຕະລາງ **ແກ້ໄດ້** (`canEdit[3] = true`) | ຜູ້ໃຊ້ດັບເບີ້ນຄລິກແກ້ຕົວເລກໃນຕາຕະລາງໄດ້ ແຕ່ **ບໍ່ໄດ້ບັນທຶກລົງ DB** → ຂໍ້ມູນທີ່ເຫັນບໍ່ກົງກັບ DB | ປ່ຽນເປັນ `false` ທັງໝົດ |
| 2 | `SELECT *FROM Product` (P ໃຫຍ່) ແຕ່ບ່ອນອື່ນໃຊ້ `product` | Windows ເຮັດວຽກປົກກະຕິ ແຕ່ຖ້າ MySQL ຢູ່ Linux ຊື່ຕາຕະລາງ **ແຍກຕົວພິມໃຫຍ່-ນ້ອຍ** → error "Table doesn't exist" | ໃຊ້ `product` ໃຫ້ຄືກັນທຸກບ່ອນ |
| 3 | ບໍ່ກວດວ່າເປັນຕົວເລກ / ຄ່າຕິດລົບ | ພິມ `abc` ໃນຊ່ອງລາຄາ → MySQL error (strict mode), ລາຄາຂາຍຕ່ຳກວ່າຕົ້ນທຶນກໍບັນທຶກໄດ້ | ກວດດ້ວຍ `Double.parseDouble` ໃນ try-catch ກ່ອນບັນທຶກ |
| 4 | ແກ້ໄຂບາໂຄ້ດຂອງສິນຄ້າທີ່ເຄີຍຂາຍແລ້ວ | ຖ້າ FK ບໍ່ມີ `ON UPDATE CASCADE` → error 1451 ແຕ່ btnEdit ບໍ່ໄດ້ຈັບ → ສະແດງ error ດິບ | ຈັບ `SQLException` 1451 ຄືປຸ່ມລຶບ ຫຼື ຫ້າມແກ້ບາໂຄ້ດ (`txtBarcode.setEditable(false)` ຕອນເລືອກແຖວ) |
| 5 | `INSERT INTO product VALUES(...)` ບໍ່ລະບຸຊື່ຖັນ | ຖ້າເພີ່ມ/ສະຫຼັບຖັນໃນ DB → ຂໍ້ມູນລົງຜິດຖັນ ຫຼື error | `INSERT INTO product (barcode, product_name, ...) VALUES (?, ?, ...)` |
| 6 | `pst`, `rs` ບໍ່ເຄີຍ `close()` ແລະ `conn` ເປີດຄ້າງຕະຫຼອດ | resource ຮົ່ວ; ຖ້າ MySQL ຕັດການເຊື່ອມຕໍ່ (timeout) ໜ້ານີ້ຈະໃຊ້ບໍ່ໄດ້ຈົນເປີດໃໝ່ | ໃຊ້ try-with-resources ແລະ ເປີດ connection ຕອນໃຊ້ |

**ຂ. ຄຸນນະພາບໂຄ້ດ**

| # | ບັນຫາ | ວິທີແກ້ |
|---|---|---|
| 7 | `jPanel6` + component ກຸ່ມ `...1`, `jTextField9–15`, `jComboBox4–6` ບໍ່ໄດ້ໃຊ້ | ລຶບໃນໜ້າ Design |
| 8 | `tableUpdate()` ກັບ `txtSearchKeyReleased()` ຊ້ຳກັນເກືອບ 100% | ລວມເປັນ `tableUpdate(String keyword)` ແລ້ວເອີ້ນ `tableUpdate("")` / `tableUpdate(txtSearch.getText())` |
| 9 | `JOptionPane.WIDTH` ເປັນ message type | ✅ ເຮັດວຽກເພາະ WIDTH = 1 = `INFORMATION_MESSAGE` ໂດຍບັງເອີນ → ໃຊ້ `JOptionPane.INFORMATION_MESSAGE` |
| 10 | `&&` ໃນ SQL (`barcode=? && barcode != ?`) | MySQL ປະກາດ deprecated ຕັ້ງແຕ່ 8.0.17 → ໃຊ້ `AND` (ມາດຕະຖານ SQL) |
| 11 | `showMessageDialog(this, e)` ສະແດງ error ດິບ | ສະແດງຂໍ້ຄວາມທີ່ຜູ້ໃຊ້ເຂົ້າໃຈ |
| 12 | `CONCAT(barcode, product_name) LIKE ?` | ອາດພົບຜົນແປກ ເມື່ອຄຳຄົ້ນຫາຄາບລະຫວ່າງບາໂຄ້ດກັບຊື່; ໃຊ້ `p.barcode LIKE ? OR p.product_name LIKE ?` ຊັດກວ່າ |
| 13 | ຄົ້ນຫາທຸກຄັ້ງທີ່ກົດປຸ່ມ | ສິນຄ້າຫຼາຍພັນລາຍການຈະຊ້າ — ພໍໃຊ້ໄດ້ສຳລັບໂປຣເຈັກຮຽນ |

**ຄ. ຂໍ້ຄວາມ / ຄອມເມັນ ສະກົດຜິດ ຫຼື ບໍ່ກົງ**

| ບ່ອນ | ປັດຈຸບັນ | ຄວນເປັນ |
|---|---|---|
| placeholder ຄົ້ນຫາ | ຄົ້ນຫາຂໍ້ມູນຍີ່ຫໍ້ | ຄົ້ນຫາບາໂຄ້ດ ຫຼື ຊື່ສິນຄ້າ |
| btnEdit ແຈ້ງເຕືອນ | ຂໍ້ມ**ຼ**ນ | ຂໍ້ມ**ູ**ນ |
| btnDelete ແຈ້ງເຕືອນ | ...ກ່ອນ**ແກ້ໄຂ**ດ້ວຍ | ...ກ່ອນ**ລຶບ** |
| ຫົວຖັນ / label | ລາຄາຕົ້ນທ**ື**ນ | ລາຄາຕົ້ນທ**ຶ**ນ |
| ຫົວຖັນ | ຈຳນວນຕ**ຳ**ສຸດ | ຈຳນວນຕ**່ຳ**ສຸດ |
| ຄອມເມັນ | ໃນ**ໂານ**ຂໍ້ມູນ | ໃນ**ຖານ**ຂໍ້ມູນ |
| ຄອມເມັນ btnEdit | ກົດປຸ່ມ**ເພີ່ມ**ໃຫ້ແຈ້ງເຕືອນ | ກົດປຸ່ມ**ແກ້ໄຂ** |
| ຄອມເມັນ btnDelete | ກົດປູ່ມ **ແກ້ໄຂ** | ກົດປຸ່ມ **ລຶບ** |
| ຄອມເມັນ jTable1MouseClicked | ລະຫັດບາໂຄ້ດແກ້ບໍ່ໄດ້ | ຈື່ລະຫັດບາໂຄ້ດເດີມ (ຕົວຈິງແກ້ໄດ້) |
| ປຸ່ມ ແລະ ຂໍ້ຄວາມລຶບ | ໃຊ້ "ລືບ" ແລະ "ລົບ" ປົນກັນ | ໃຊ້ຄຳດຽວກັນທຸກບ່ອນ — ສະກົດມາດຕະຖານແມ່ນ "ລຶບ" |

---

## ອ້າງອີງ

- JPanel — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/JPanel.html
- JTable / DefaultTableModel — https://docs.oracle.com/javase/tutorial/uiswing/components/table.html
- DefaultTableModel API — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/table/DefaultTableModel.html
- JComboBox — https://docs.oracle.com/javase/tutorial/uiswing/components/combobox.html
- JOptionPane (ຄ່າ OK_OPTION, CANCEL_OPTION, CLOSED_OPTION) — https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/JOptionPane.html
- DecimalFormat — https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/DecimalFormat.html
- Anonymous Classes — https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html
- JDBC: Processing SQL Statements — https://docs.oracle.com/javase/tutorial/jdbc/basics/processingsqlstatements.html
- try-with-resources — https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html
- MySQL JOIN — https://dev.mysql.com/doc/refman/8.0/en/join.html
- MySQL LIKE — https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like
- MySQL `&&` deprecated (8.0.17) — https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and
- MySQL ຕົວພິມໃຫຍ່-ນ້ອຍ ຂອງຊື່ຕາຕະລາງ — https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html
- MySQL error 1451 (ER_ROW_IS_REFERENCED_2) — https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
- FOREIGN KEY Constraints — https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
