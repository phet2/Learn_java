/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JPanel.java to edit this template
 */
package applicationForm;

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

/**
 *
 * @author ASUS
 */
public class PanelProduct extends javax.swing.JPanel {

    Connection conn = null;         //ເກັບການເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
    PreparedStatement pst = null;   //ກຽມຄໍາສັ່ງ sql
    ResultSet rs = null;            //ເກັບຜົນໄດ້ຮັບຈາກການປະມວນຜົນຄໍາສັ່ງ sql

    BrandItem brand = new BrandItem();
    CategoryItem category = new CategoryItem();

    // ເກັບລະຫັດບາໂຄ້ດເກົ່າ
    String barcode_old = null;

    public PanelProduct() {
        initComponents();

        //Placeholder
        txtSearch.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ຄົ້ນຫາຂໍ້ມູນຍີ່ຫໍ້");
        txtSearch.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/search_text.svg"));

        //ກຳນົດໃຫ້ສະແດງຜົນກາງຖັນຕາຕະລາງ
        TableColumnAligner.alignCenter(jTable1, 0, 2, 3, 4, 9);
        TableColumnAligner.alignCenter(jTable1, 5, 6);

        conn = MysqlConnect.connectDB();

        brandList();
        categoryList();
        tableUpdate();
    }


    // ເມັດທອດສະແດງຊື່ຍີ່ຫໍ້
    private void brandList() {
        txtBrand.removeAllItems();
        txtBrand.addItem(" -----------ເລືອກຍີ່ຫໍ້----------");
        for (String name : brand.getName()) {
            txtBrand.addItem(name);
        }
    }

    private void categoryList() {
        txtCategory.removeAllItems();
        txtCategory.addItem(" -----------ເລືອກປະເພດ----------");
        for (String name : category.getName()) {
            txtCategory.addItem(name);
        }
    }

    //ສ້າງເມັດທອດສະແດງຄ່າຂໍ້ມູນໃນຕາຕະລາງ
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
            pst = conn.prepareStatement(sql);
            rs = pst.executeQuery();

            DefaultTableModel d = (DefaultTableModel) jTable1.getModel();
            d.setRowCount(0); // ລືບຂໍ້ມູນອອກຈາກຕາຕະລາງ jTable1

            // ສ້າງ ອ໋ອບເຈັກເພື່ອສະແດງຕົວເລກ
            DecimalFormat df1 = new DecimalFormat("#,##0");
            DecimalFormat df2 = new DecimalFormat("#,##0.##");


            while (rs.next()) {
                d.addRow(new Object[]{
                    rs.getString(1),
                    rs.getString(2),
                    rs.getString(3),
                    df1.format(rs.getInt(4)),
                    df1.format(rs.getInt(5)),
                    df2.format(rs.getDouble(6)),
                    df2.format(rs.getDouble(7)),
                    rs.getString(8),
                    rs.getString(9),
                    rs.getString(10),
                });
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
        }
    }

    //ສ້າງເມັດທອດຍົກເລີກຄ່າ
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

    //ກວດສອບທຸກຊ່ອງຂອງຟອມໄດ້ຖືກເລືອກຫຼືບໍ່
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


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">
    private void initComponents() {

        jPanel6 = new javax.swing.JPanel();
        jLabel5 = new javax.swing.JLabel();
        jTextField9 = new javax.swing.JTextField();
        jLabel9 = new javax.swing.JLabel();
        jTextField10 = new javax.swing.JTextField();
        jLabel13 = new javax.swing.JLabel();
        jTextField11 = new javax.swing.JTextField();
        jLabel14 = new javax.swing.JLabel();
        jTextField12 = new javax.swing.JTextField();
        jLabel15 = new javax.swing.JLabel();
        jTextField13 = new javax.swing.JTextField();
        jLabel16 = new javax.swing.JLabel();
        jTextField14 = new javax.swing.JTextField();
        jLabel17 = new javax.swing.JLabel();
        jLabel18 = new javax.swing.JLabel();
        jLabel19 = new javax.swing.JLabel();
        jLabel20 = new javax.swing.JLabel();
        jComboBox4 = new javax.swing.JComboBox<>();
        jComboBox5 = new javax.swing.JComboBox<>();
        jComboBox6 = new javax.swing.JComboBox<>();
        jTextField15 = new javax.swing.JTextField();
        btnCancel1 = new javax.swing.JButton();
        btnDelete1 = new javax.swing.JButton();
        btnEdit1 = new javax.swing.JButton();
        btnAdd1 = new javax.swing.JButton();
        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        txtSearch = new javax.swing.JTextField();
        jPanel7 = new javax.swing.JPanel();
        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        txtBarcode = new javax.swing.JTextField();
        jLabel2 = new javax.swing.JLabel();
        txtProduct_name = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        txtUnit = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();
        txtRetail_price = new javax.swing.JTextField();
        jLabel6 = new javax.swing.JLabel();
        txtCost_price = new javax.swing.JTextField();
        jLabel7 = new javax.swing.JLabel();
        txtQuantity_min = new javax.swing.JTextField();
        jLabel8 = new javax.swing.JLabel();
        jLabel10 = new javax.swing.JLabel();
        jLabel11 = new javax.swing.JLabel();
        jLabel12 = new javax.swing.JLabel();
        txtStatus = new javax.swing.JComboBox<>();
        txtBrand = new javax.swing.JComboBox<>();
        txtCategory = new javax.swing.JComboBox<>();
        txtQuantity = new javax.swing.JTextField();
        btnCancel = new javax.swing.JButton();
        btnDelete = new javax.swing.JButton();
        btnEdit = new javax.swing.JButton();
        btnAdd = new javax.swing.JButton();

        jPanel6.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "ຈັດການຂໍ້ມູນສິນຄ້າ\n", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Lao_SomVang", 0, 12))); // NOI18N
        jPanel6.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel5.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel5.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel5.setText("ລະຫັດບາໂຄ້ດ");
        jPanel6.add(jLabel5, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 50, -1, -1));

        jTextField9.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField9, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 50, 130, -1));

        jLabel9.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel9.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel9.setText("ລາຍການສິນຄ້າ");
        jPanel6.add(jLabel9, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 90, -1, -1));

        jTextField10.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField10, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 90, 130, -1));

        jLabel13.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel13.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel13.setText("ຈຳນວນ");
        jPanel6.add(jLabel13, new org.netbeans.lib.awtextra.AbsoluteConstraints(70, 170, -1, -1));

        jTextField11.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField11, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 130, 130, -1));

        jLabel14.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel14.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel14.setText("ຫົວໜ່ວຍ");
        jPanel6.add(jLabel14, new org.netbeans.lib.awtextra.AbsoluteConstraints(60, 130, -1, -1));

        jTextField12.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField12, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 130, 130, -1));

        jLabel15.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel15.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel15.setText("ລາຄາຂາຍ");
        jPanel6.add(jLabel15, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 130, -1, -1));

        jTextField13.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField13, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 90, 130, -1));

        jLabel16.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel16.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel16.setText("ລາຄາຕົ້ນທືນ");
        jPanel6.add(jLabel16, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 90, -1, -1));

        jTextField14.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField14, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 50, 130, -1));

        jLabel17.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel17.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel17.setText("ຈຳນວນຕ່ຳສຸດ");
        jPanel6.add(jLabel17, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 50, -1, -1));

        jLabel18.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel18.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel18.setText("ສະຖານະ");
        jPanel6.add(jLabel18, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 130, -1, -1));

        jLabel19.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel19.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel19.setText("ປະເພດ ");
        jPanel6.add(jLabel19, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 90, -1, -1));

        jLabel20.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel20.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel20.setText("ຍີ່ຫໍ້ ");
        jPanel6.add(jLabel20, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 50, -1, -1));

        jComboBox4.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jComboBox4.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "ມີ", "ບໍ່ມີ" }));
        jPanel6.add(jComboBox4, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 130, 140, -1));

        jComboBox5.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jComboBox5, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 50, 140, -1));

        jComboBox6.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jComboBox6, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 90, 140, -1));

        jTextField15.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel6.add(jTextField15, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 170, 130, -1));

        btnCancel1.setBackground(new java.awt.Color(0, 255, 204));
        btnCancel1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnCancel1.setForeground(new java.awt.Color(0, 0, 0));
        btnCancel1.setText("ຍົກເລີກ");
        jPanel6.add(btnCancel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(580, 180, 80, -1));

        btnDelete1.setBackground(new java.awt.Color(255, 0, 0));
        btnDelete1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnDelete1.setForeground(new java.awt.Color(0, 0, 0));
        btnDelete1.setText("ລືບ");
        jPanel6.add(btnDelete1, new org.netbeans.lib.awtextra.AbsoluteConstraints(490, 180, 80, -1));

        btnEdit1.setBackground(new java.awt.Color(255, 153, 51));
        btnEdit1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnEdit1.setForeground(new java.awt.Color(0, 0, 0));
        btnEdit1.setText("ແກ້ໄຂ");
        jPanel6.add(btnEdit1, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 180, 80, -1));

        btnAdd1.setBackground(new java.awt.Color(51, 51, 255));
        btnAdd1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnAdd1.setText("ເພີ່ມ");
        jPanel6.add(btnAdd1, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 180, 80, -1));

        jTable1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null, null, null, null, null, null},
                {null, null, null, null, null, null, null, null, null, null},
                {null, null, null, null, null, null, null, null, null, null},
                {null, null, null, null, null, null, null, null, null, null}
            },
            new String [] {
                "ລະຫັດບາໂຄ້ດ", "ລາຍການສິນຄ້າ", "ຫົວໜ່ວຍ", "ຈຳນວນ", "ຈຳນວນຕຳສຸດ", "ລາຄາຕົ້ນທືນ", "ລາຄາຂາຍ", "ຍີ່ຫໍ້", "ປະເພດ", "ສະຖານະ"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, true, false, false, false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jTable1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                jTable1MouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(jTable1);

        txtSearch.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtSearch.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtSearchKeyReleased(evt);
            }
        });

        jPanel1.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "ຈັດການຂໍ້ມູນສິນຄ້າ\n", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION, javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("Lao_SomVang", 0, 12))); // NOI18N
        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel1.setText("ລະຫັດບາໂຄ້ດ");
        jPanel1.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(50, 50, -1, -1));

        txtBarcode.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtBarcode.addActionListener(this::txtBarcodeActionPerformed);
        jPanel1.add(txtBarcode, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 50, 130, -1));

        jLabel2.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel2.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel2.setText("ລາຍການສິນຄ້າ");
        jPanel1.add(jLabel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(40, 90, -1, -1));

        txtProduct_name.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtProduct_name.addActionListener(this::txtProduct_nameActionPerformed);
        jPanel1.add(txtProduct_name, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 90, 130, -1));

        jLabel3.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel3.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel3.setText("ຈຳນວນ");
        jPanel1.add(jLabel3, new org.netbeans.lib.awtextra.AbsoluteConstraints(70, 170, -1, -1));

        txtUnit.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtUnit.addActionListener(this::txtUnitActionPerformed);
        jPanel1.add(txtUnit, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 130, 130, -1));

        jLabel4.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel4.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel4.setText("ຫົວໜ່ວຍ");
        jPanel1.add(jLabel4, new org.netbeans.lib.awtextra.AbsoluteConstraints(60, 130, -1, -1));

        txtRetail_price.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtRetail_price.addActionListener(this::txtRetail_priceActionPerformed);
        txtRetail_price.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtRetail_priceKeyReleased(evt);
            }
        });
        jPanel1.add(txtRetail_price, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 130, 130, -1));

        jLabel6.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel6.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel6.setText("ລາຄາຂາຍ");
        jPanel1.add(jLabel6, new org.netbeans.lib.awtextra.AbsoluteConstraints(320, 130, -1, -1));

        txtCost_price.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtCost_price.addActionListener(this::txtCost_priceActionPerformed);
        txtCost_price.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtCost_priceKeyReleased(evt);
            }
        });
        jPanel1.add(txtCost_price, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 90, 130, -1));

        jLabel7.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel7.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel7.setText("ລາຄາຕົ້ນທືນ");
        jPanel1.add(jLabel7, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 90, -1, -1));

        txtQuantity_min.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtQuantity_min.addActionListener(this::txtQuantity_minActionPerformed);
        txtQuantity_min.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtQuantity_minKeyReleased(evt);
            }
        });
        jPanel1.add(txtQuantity_min, new org.netbeans.lib.awtextra.AbsoluteConstraints(370, 50, 130, -1));

        jLabel8.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel8.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel8.setText("ຈຳນວນຕ່ຳສຸດ");
        jPanel1.add(jLabel8, new org.netbeans.lib.awtextra.AbsoluteConstraints(300, 50, -1, -1));

        jLabel10.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel10.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel10.setText("ສະຖານະ");
        jPanel1.add(jLabel10, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 130, -1, -1));

        jLabel11.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel11.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel11.setText("ປະເພດ ");
        jPanel1.add(jLabel11, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 90, -1, -1));

        jLabel12.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jLabel12.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel12.setText("ຍີ່ຫໍ້ ");
        jPanel1.add(jLabel12, new org.netbeans.lib.awtextra.AbsoluteConstraints(570, 50, -1, -1));

        txtStatus.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtStatus.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "ມີ", "ບໍ່ມີ" }));
        jPanel1.add(txtStatus, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 130, 140, -1));

        txtBrand.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel1.add(txtBrand, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 50, 140, -1));

        txtCategory.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        jPanel1.add(txtCategory, new org.netbeans.lib.awtextra.AbsoluteConstraints(620, 90, 140, -1));

        txtQuantity.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        txtQuantity.addActionListener(this::txtQuantityActionPerformed);
        txtQuantity.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtQuantityKeyReleased(evt);
            }
        });
        jPanel1.add(txtQuantity, new org.netbeans.lib.awtextra.AbsoluteConstraints(120, 170, 130, -1));

        btnCancel.setBackground(new java.awt.Color(0, 255, 204));
        btnCancel.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnCancel.setForeground(new java.awt.Color(0, 0, 0));
        btnCancel.setText("ຍົກເລີກ");
        btnCancel.addActionListener(this::btnCancelActionPerformed);
        jPanel1.add(btnCancel, new org.netbeans.lib.awtextra.AbsoluteConstraints(580, 180, 80, -1));

        btnDelete.setBackground(new java.awt.Color(255, 0, 0));
        btnDelete.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnDelete.setForeground(new java.awt.Color(255, 255, 255));
        btnDelete.setText("ລືບ");
        btnDelete.addActionListener(this::btnDeleteActionPerformed);
        jPanel1.add(btnDelete, new org.netbeans.lib.awtextra.AbsoluteConstraints(490, 180, 80, -1));

        btnEdit.setBackground(new java.awt.Color(255, 153, 51));
        btnEdit.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnEdit.setForeground(new java.awt.Color(0, 0, 0));
        btnEdit.setText("ແກ້ໄຂ");
        btnEdit.addActionListener(this::btnEditActionPerformed);
        jPanel1.add(btnEdit, new org.netbeans.lib.awtextra.AbsoluteConstraints(400, 180, 80, -1));

        btnAdd.setBackground(new java.awt.Color(51, 51, 255));
        btnAdd.setFont(new java.awt.Font("Lao_SomVang", 0, 12)); // NOI18N
        btnAdd.setText("ເພີ່ມ");
        btnAdd.addActionListener(this::btnAddActionPerformed);
        jPanel1.add(btnAdd, new org.netbeans.lib.awtextra.AbsoluteConstraints(310, 180, 80, -1));

        javax.swing.GroupLayout jPanel7Layout = new javax.swing.GroupLayout(jPanel7);
        jPanel7.setLayout(jPanel7Layout);
        jPanel7Layout.setHorizontalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel7Layout.createSequentialGroup()
                .addContainerGap(20, Short.MAX_VALUE)
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, 846, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(20, Short.MAX_VALUE))
        );
        jPanel7Layout.setVerticalGroup(
            jPanel7Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel7Layout.createSequentialGroup()
                .addGap(14, 14, 14)
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, 233, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(14, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(64, 64, 64)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(jScrollPane1)
                                .addGap(58, 58, 58))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(txtSearch, javax.swing.GroupLayout.PREFERRED_SIZE, 226, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(0, 0, Short.MAX_VALUE))))
                    .addComponent(jPanel7, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap(20, Short.MAX_VALUE)
                .addComponent(jPanel7, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(txtSearch, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 320, Short.MAX_VALUE)
                .addContainerGap(20, Short.MAX_VALUE))
        );
    }// </editor-fold>

    private void btnEditActionPerformed(java.awt.event.ActionEvent evt) {
        //ຖ້າເລືອກຂໍ້ມູນໃນຕາຕະລາງແລ້ວ ກົດປຸ່ມເພີ່ມໃຫ້ແຈ້ງເຕືອນ
        if (jTable1.getSelectedRow() < 0) {
            JOptionPane.showMessageDialog(this, "ກະລຸນາເລືອກຂໍ້ມຼນໃນຕາຕະລາງກ່ອນ ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
            return;
        }
        //ກວດວ່າປ້ອນຂໍ້ມູນຄົບ ຫຼື ບໍ່
        if (checkInputs()) {
            JOptionPane.showMessageDialog(this, "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນດ້ວຍ", "ແຈ້ງເຕືອນ", JOptionPane.WARNING_MESSAGE);
            return;
        }

        //ກວດສອບລະຫັດບາໂຄ້ດວ່າມີໃນໂານຂໍ້ມູນແລ້ວ ຫຼື ບໍ
        try {
            String sql = "SELECT *FROM Product WHERE barcode=? && barcode != ?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, txtBarcode.getText());
            pst.setString(2, barcode_old);
            rs = pst.executeQuery();
            if (rs.next()) {
                JOptionPane.showMessageDialog(this, "ລະຫັດບາໂຄ້ດ " + txtBarcode.getText() + " ຖືກນໍາໃຊ້ແລ້ວ ", "ຜິດພາດ", JOptionPane.WARNING_MESSAGE);
                txtBarcode.requestFocus();
                return;
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
            return;
        }

        //ພິມ trycatch ແລ້ວກົດປຸ່ມ tab
        try {
            String sql = """
                                                                            UPDATE product SET
                                                                                    barcode = ?,
                                                                                    product_name=?,
                                                                                    unit=?,
                                                                                    quantity=?,
                                                                                    quantity_min=?,
                                                                                    cost_price=?,
                                                                                    retail_price=?,
                                                                                    brand_id=?,
                                                                                    category_id=?,
                                                                                    status=?
                                                                                    WHERE barcode=?
                         """;
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
            pst.setString(11, barcode_old);

            if (pst.executeUpdate() > 0) {
                clearForm();
                tableUpdate();
                JOptionPane.showMessageDialog(this, "ຂໍ້ມູນຖືກແກ້ໄຂໃນຖານຂໍ້ມູນສໍາເລັດ", "ສໍາເລັດ", JOptionPane.WIDTH, new FlatSVGIcon("images_svg/done.svg"));
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
        }

    }

    private void txtBarcodeActionPerformed(java.awt.event.ActionEvent evt) {
        txtProduct_name.requestFocus();
    }

    private void txtProduct_nameActionPerformed(java.awt.event.ActionEvent evt) {
        txtUnit.requestFocus();
    }

    private void txtUnitActionPerformed(java.awt.event.ActionEvent evt) {
        txtQuantity.requestFocus();
    }

    private void txtQuantityActionPerformed(java.awt.event.ActionEvent evt) {
        txtQuantity_min.requestFocus();
    }

    private void txtQuantity_minActionPerformed(java.awt.event.ActionEvent evt) {
        txtCost_price.requestFocus();
    }

    private void txtCost_priceActionPerformed(java.awt.event.ActionEvent evt) {
        txtRetail_price.requestFocus();
    }

    private void txtRetail_priceActionPerformed(java.awt.event.ActionEvent evt) {

    }

    private void txtQuantityKeyReleased(java.awt.event.KeyEvent evt) {
        NumberComma.numberFormat(txtQuantity, false);
    }

    private void txtQuantity_minKeyReleased(java.awt.event.KeyEvent evt) {
        NumberComma.numberFormat(txtQuantity_min, false);
    }

    private void txtCost_priceKeyReleased(java.awt.event.KeyEvent evt) {
        NumberComma.numberFormat(txtCost_price, true);
    }

    private void txtRetail_priceKeyReleased(java.awt.event.KeyEvent evt) {
        NumberComma.numberFormat(txtRetail_price, true);
    }

    private void btnCancelActionPerformed(java.awt.event.ActionEvent evt) {
        clearForm();
    }

    private void btnAddActionPerformed(java.awt.event.ActionEvent evt) {
        //ຖ້າເລືອກຂໍ້ມູນໃນຕາຕະລາງແລ້ວ ກົດປຸ່ມເພີ່ມໃຫ້ແຈ້ງເຕືອນ
        if (jTable1.getSelectedRow() >= 0) {
            JOptionPane.showMessageDialog(this, "ເມື່ອທ່ານເລືອກຂໍ້ມູນໃນຕາຕະລາງທ່ານບໍ່ສາມາດກົດປຸ່ມເພີ່ມໄດ້ ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
            return;
        }
        //ກວດວ່າປ້ອນຂໍ້ມູນຄົບ ຫຼື ບໍ່
        if (checkInputs()) {
            JOptionPane.showMessageDialog(this, "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນດ້ວຍ", "ແຈ້ງເຕືອນ", JOptionPane.WARNING_MESSAGE);
            return;
        }

        //ກວດສອບລະຫັດບາໂຄ້ດວ່າມີໃນໂານຂໍ້ມູນແລ້ວ ຫຼື ບໍ
        try {
            String sql = "SELECT *FROM Product WHERE barcode=?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, txtBarcode.getText());
            rs = pst.executeQuery();
            if (rs.next()) {
                JOptionPane.showMessageDialog(this, "ລະຫັດບາໂຄ້ດ " + txtBarcode.getText() + " ຖືກນໍາໃຊ້ແລ້ວ ", "ຜິດພາດ", JOptionPane.WARNING_MESSAGE);
                txtBarcode.requestFocus();
                return;
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
            return;
        }

        //ພິມ trycatch ແລ້ວກົດປຸ່ມ tab
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

            if (pst.executeUpdate() > 0) {
                clearForm();
                tableUpdate();
                JOptionPane.showMessageDialog(this, "ຂໍ້ມູນຖືກບັນທຶກລົງໃນຖານຂໍ້ມູນສໍາເລັດ", "ສໍາເລັດ", JOptionPane.WIDTH, new FlatSVGIcon("images_svg/done.svg"));
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
        }


    }

    private void jTable1MouseClicked(java.awt.event.MouseEvent evt) {
        DefaultTableModel d = (DefaultTableModel) jTable1.getModel();
        int selectIndex = jTable1.getSelectedRow(); //ລໍາດັບແຖວທີ່ເລືອກ

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

        //ລະຫັດບາໂຄ້ດແກ້ບໍ່ໄດ້
        barcode_old = d.getValueAt(selectIndex, 0).toString();

    }

    private void btnDeleteActionPerformed(java.awt.event.ActionEvent evt) {
        //ຖ້າບໍ່ເລືອກຂໍ້ມູນໃນຕາຕະລາງແລ້ວກົດປູ່ມ ແກ້ໄຂ ໃຫ້ແຈ້ງເຕືອນ
        if (jTable1.getSelectedRow() < 0) {
            JOptionPane.showMessageDialog(this, " ກະລຸນາເລືອກຂໍ້ມູນໃນຕາຕະລາງກ່ອນແກ້ໄຂດ້ວຍ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
            return;
        }

        // ຢືນຢັນກ່ອນລືບຂໍ້ມູນ
        int data = JOptionPane.showConfirmDialog(
            this,
                "ທ່ານຕ້ອງການລືບຂໍ້ມູນລາຍການນີ້ແທ້ ຫຼື ບໍ່?",
                "ຢືນຢັນ",
                JOptionPane.OK_CANCEL_OPTION,
                JOptionPane.QUESTION_MESSAGE

        );

        if(data != 0){
            clearForm();
            return;
        }
        try {
            String sql = "DELETE FROM product WHERE barcode=?";
            pst = conn.prepareStatement(sql);
            pst.setString(1, barcode_old);

            if (pst.executeUpdate() > 0) {
                JOptionPane.showMessageDialog(
                        this,
                        "ຂໍ້ມູນຖືກລົບອອກຈາກຖານຂໍ້ມູນ ສຳເລັດ",
                        "ສຳເລັດ",
                        JOptionPane.WIDTH,
                        new FlatSVGIcon("images_svg/done.svg")
                );

                clearForm();
                tableUpdate();
            }
        } catch (SQLException e) {
            if (e.getErrorCode() == 1451) {
                JOptionPane.showMessageDialog(
                        this,
                        "ບໍ່ສາມາດລືບສິນຄ້ານີ້ໄດ້ ເນື່ອງຈາກ ຖືກນຳໃຊ້ຢູ່",
                        "ຜິດພາດ",
                        JOptionPane.WARNING_MESSAGE
                );
            } else {
                JOptionPane.showMessageDialog(this, e);
            }
        }
    }

    private void txtSearchKeyReleased(java.awt.event.KeyEvent evt) {
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
                         JOIN category c ON p.category_id = c.category_id
                         WHERE CONCAT(p.barcode, p.product_name) LIKE ?
                         """;
            pst = conn.prepareStatement(sql);
            pst.setString(1, "%" + txtSearch.getText() +"%");
            rs = pst.executeQuery();

            DefaultTableModel d = (DefaultTableModel) jTable1.getModel();
            d.setRowCount(0); // ລືບຂໍ້ມູນອອກຈາກຕາຕະລາງ jTable1

            // ສ້າງ ອ໋ອບເຈັກເພື່ອສະແດງຕົວເລກ
            DecimalFormat df1 = new DecimalFormat("#,##0");
            DecimalFormat df2 = new DecimalFormat("#,##0.##");


            while (rs.next()) {
                d.addRow(new Object[]{
                    rs.getString(1),
                    rs.getString(2),
                    rs.getString(3),
                    df1.format(rs.getInt(4)),
                    df1.format(rs.getInt(5)),
                    df2.format(rs.getDouble(6)),
                    df2.format(rs.getDouble(7)),
                    rs.getString(8),
                    rs.getString(9),
                    rs.getString(10),
                });
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, e);
        }
    }


    // Variables declaration - do not modify
    private javax.swing.JButton btnAdd;
    private javax.swing.JButton btnAdd1;
    private javax.swing.JButton btnCancel;
    private javax.swing.JButton btnCancel1;
    private javax.swing.JButton btnDelete;
    private javax.swing.JButton btnDelete1;
    private javax.swing.JButton btnEdit;
    private javax.swing.JButton btnEdit1;
    private javax.swing.JComboBox<String> jComboBox4;
    private javax.swing.JComboBox<String> jComboBox5;
    private javax.swing.JComboBox<String> jComboBox6;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel14;
    private javax.swing.JLabel jLabel15;
    private javax.swing.JLabel jLabel16;
    private javax.swing.JLabel jLabel17;
    private javax.swing.JLabel jLabel18;
    private javax.swing.JLabel jLabel19;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel20;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel6;
    private javax.swing.JPanel jPanel7;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextField jTextField10;
    private javax.swing.JTextField jTextField11;
    private javax.swing.JTextField jTextField12;
    private javax.swing.JTextField jTextField13;
    private javax.swing.JTextField jTextField14;
    private javax.swing.JTextField jTextField15;
    private javax.swing.JTextField jTextField9;
    private javax.swing.JTextField txtBarcode;
    private javax.swing.JComboBox<String> txtBrand;
    private javax.swing.JComboBox<String> txtCategory;
    private javax.swing.JTextField txtCost_price;
    private javax.swing.JTextField txtProduct_name;
    private javax.swing.JTextField txtQuantity;
    private javax.swing.JTextField txtQuantity_min;
    private javax.swing.JTextField txtRetail_price;
    private javax.swing.JTextField txtSearch;
    private javax.swing.JComboBox<String> txtStatus;
    private javax.swing.JTextField txtUnit;
    // End of variables declaration
}
