package applicationForm;

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

/**
 *
 * @author ASUS
 */
public class Login extends javax.swing.JFrame {

    Connection conn = null;         //ເກັບການເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
    PreparedStatement pst = null;   //ກຽມຄໍາສັ່ງ sql
    ResultSet rs = null;            //ເກັບຜົນໄດ້ຮັບຈາກການປະມວນຜົນຄໍາສັ່ງ sql

    public Login() {
        initComponents();
        this.setTitle("ໂປຣແກຣມຂາຍເຄື່ອງໜ້າຮ້ານ");
        this.setLocationRelativeTo(this);
        this.setResizable(false);
        //setIconImage(Toolkit.getDefaultToolkit().getImage(getClass().getResource("/images/icon.png")));
        /* ໃສ່ຮູບ ໄອຄອນໂປຣແກຣມ */
        try {
            // ** ສໍາຄັນ: ກວດສອບນາມສະກຸນຂອງໄຟລ໌ດ້ວຍ ເຊັ່ນ  .png ຫຼື .jpg **
            String iconPath = "/images/icon.png";
            Image image = Toolkit.getDefaultToolkit().getImage(getClass().getResource(iconPath));

            // ສໍາລັບ Windows / Linux (ສະແດງແຈຊ້າຍເທິງ)
            this.setIconImage(image);

            // ສໍາລັບ macOS (ສະແດງທີ່ Dock ດ້ານລຸ່ມ)
            if (Taskbar.isTaskbarSupported()) {
                Taskbar taskbar = Taskbar.getTaskbar();
                if (taskbar.isSupported(Taskbar.Feature.ICON_IMAGE)) {
                    taskbar.setIconImage(image);
                }

            }
        } catch (Exception e) {
            System.out.println("Error:  " + e.getMessage());
        }
        //ໃສ່ຮູບໂລໂກ໋ລ໋ອກອິນ
        sVGImage1.setSvgImage("images_svg/login-form.svg", 80, 80);

        //sVGImage2.setSvgImage("images_svg/new.svg", 50, 50);
        //sVGImage2.animation(50);

        //ປຽນສີແຖບ Title bar ດ້ານເທິງ
       getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_BACKGROUND, new Color(28, 40, 51));
        getRootPane().putClientProperty(FlatClientProperties.TITLE_BAR_FOREGROUND, new Color(253, 254, 254));

        //PlaceHolder
        txtUsername.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ບັນຊີເຂົ້າໃຊ້");
        txtPassword.putClientProperty(FlatClientProperties.PLACEHOLDER_TEXT, "ລະຫັດຜ່ານ");

        //ລືບ
        txtUsername.putClientProperty(FlatClientProperties.TEXT_FIELD_SHOW_CLEAR_BUTTON, true);
        txtPassword.putClientProperty(FlatClientProperties.TEXT_FIELD_SHOW_CLEAR_BUTTON, true);

        //ໃສ່ຮູບໃນ txtUsername ແລະ txtPassword
        txtUsername.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/username.svg"));
        txtPassword.putClientProperty(FlatClientProperties.TEXT_FIELD_LEADING_ICON, new FlatSVGIcon("images_svg/password.svg"));

        //ໃສຮູບທີ່ປຸ່ມ ເຂົ້າໃຊ້ງານ
        btnLogin.setIcon(new FlatSVGIcon("images_svg/login.svg"));

        //ສະແດງລະຫັດຜ່ານ ແລະ ສະຖານະປຸ່ມ capslock
        txtPassword.putClientProperty(FlatClientProperties.STYLE, "showRevealButton:true;" + "showCapsLock:true");
    }


    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">
    private void initComponents() {

        sVGImage1 = new includeClass.SVGImage();
        txtUsername = new javax.swing.JTextField();
        txtPassword = new javax.swing.JPasswordField();
        btnLogin = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        sVGImage1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        sVGImage1.setOpaque(true);

        txtUsername.setFont(new java.awt.Font("Lao_SomVang", 0, 10)); // NOI18N
        txtUsername.addActionListener(this::txtUsernameActionPerformed);

        txtPassword.setFont(new java.awt.Font("Lao_SomVang", 0, 10)); // NOI18N
        txtPassword.addActionListener(this::txtPasswordActionPerformed);

        btnLogin.setBackground(new java.awt.Color(51, 51, 255));
        btnLogin.setFont(new java.awt.Font("Lao_SomVang", 0, 14)); // NOI18N
        btnLogin.setText("ເຂົ້າໃຊ້ງານ");
        btnLogin.addActionListener(this::btnLoginActionPerformed);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(sVGImage1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addGap(38, 38, 38)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                    .addComponent(txtPassword, javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(txtUsername, javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(btnLogin, javax.swing.GroupLayout.DEFAULT_SIZE, 304, Short.MAX_VALUE))
                .addContainerGap(46, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(39, 39, 39)
                .addComponent(sVGImage1, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(txtUsername, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(txtPassword, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(37, 37, 37)
                .addComponent(btnLogin, javax.swing.GroupLayout.PREFERRED_SIZE, 34, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(52, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>

    private void txtPasswordActionPerformed(java.awt.event.ActionEvent evt) {
        btnLogin.doClick();
    }

    private void txtUsernameActionPerformed(java.awt.event.ActionEvent evt) {
        txtPassword.requestFocus();
    }

    private void btnLoginActionPerformed(java.awt.event.ActionEvent evt) {
        //ຖ້າບໍ່ປ້ອນບັນຊີເຂົ້າໃຊ້ ຫຼື ລະຫັດຜ່ານ ໃຫ້ແຈ້ງເຕຶອນ
        if(txtUsername.getText().isBlank() || txtPassword.getText().isBlank()){
            JOptionPane.showMessageDialog(this, "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນດ້ວຍ","ຫວ່າງເປົ່າ",JOptionPane.WARNING_MESSAGE);
            return;
        }
        try{
            conn = MysqlConnect.connectDB();
            String sql = """
                                                                                 SELECT
                                                                                     emp_id,
                                                                                     CONCAT(emp_name, ' ', emp_lname) AS name,
                                                                                    status,
                                                                                      password
                                                                                 FROM
                                                                                     employee
                                                                                 WHERE
                                                                                     username = ?
                                                                         """;
            pst = conn.prepareStatement(sql);
            pst.setString(1, txtUsername.getText());

            rs = pst.executeQuery();
            if (rs.next()) {
               String storedHash = rs.getString("password");

                if (BCrypt.checkpw(txtPassword.getText(), storedHash)) {
                    Main m = new Main(rs.getString(1),rs.getString(2),rs.getString(3));
                    m.setVisible(true);
                    dispose(); //ປິດໜ້າ Login
                } else {
                    JOptionPane.showMessageDialog(this, "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
                }
            } else {
                JOptionPane.showMessageDialog(this, "ບັນຊີເຂົ້າໃຊ້ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", "ຜິດພາດ", JOptionPane.ERROR_MESSAGE);
            }
        }catch(Exception e){
            JOptionPane.showMessageDialog(this,e);
        }

    }

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* ເອິ້ນໃຊ້ງານ FlatLaf */
        ThemeConfig.config();

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(() -> new Login().setVisible(true));
    }

    // Variables declaration - do not modify
    private javax.swing.JButton btnLogin;
    private includeClass.SVGImage sVGImage1;
    private javax.swing.JPasswordField txtPassword;
    private javax.swing.JTextField txtUsername;
    // End of variables declaration
}
