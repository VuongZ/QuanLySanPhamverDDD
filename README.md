
# HỆ THỐNG QUẢN LÝ Sản Phẩm Hệ thống Quản Lý Sản Phẩm
là một ứng dụng Web Full-stack được xây dựng nhằm mục đích hỗ trợ quản lý sản phẩm và loại sản phẩm.     
### I. CÔNG NGHỆ SỬ DỤNG Môi trường Backend: 
Ngôn ngữ: Java (JDK 17)  
Framework: Spring Boot, Spring Data JPA, Hibernate  
Công cụ hỗ trợ: Lombok  
Hệ quản trị: MySQL 8.0+  
Môi trường Frontend:  
Thư viện cốt lõi: React.js (Sử dụng Vite để đóng gói)  
Quản lý định tuyến: React Router DOM  
Giao tiếp API: Axios Giao diện (UI/UX): Bootstrap 5  
# II. HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH Để khởi chạy dự án trên môi trường máy chủ cục bộ (localhost), thực hiện tuần tự các bước dưới đây: 
**Bước 1:** Khời tạo cơ sở dữ liệu (Database) Sử dụng các công cụ quản trị MySQL (như HeidiSQL, MySQL Workbench, hoặc XAMPP). Tạo một cơ sở dữ liệu mới với tên gọi: CRMOnline_Pro (khuyến nghị định dạng UTF-8). Mở và thực thi (Execute) file script SQL được đính kèm trong mã nguồn: CRMOnline_Pro.sql.  
**Bước 2:** Cấu hình và khởi chạy Backend (Spring Boot) Sử dụng phần mềm IntelliJ IDEA để mở thư mục chứa mã nguồn Backend (crm-backend).
Điều hướng đến file cấu hình cơ sở dữ liệu tại: src/main/resources/application.yml.
Thay đổi thông tin username và password tại mục datasource để khớp với cấu hình MySQL trên máy tính của bạn: spring: datasource: url: "jdbc:mysql://localhost:3306/CRMOnline_Pro?useSSL=false&serverTimezone=UTC" username: [Nhap_Username_Cua_Ban] password: [Nhap_Password_Cua_Ban] Chờ tải hoàn tất các thư viện phụ thuộc (Dependencies). Thực thi lớp chính: Version1Application.java.   
**Bước 3:** Cài đặt và khởi chạy Frontend (React.js) Sử dụng phần mềm Visual Studio Code để mở thư mục chứa mã nguồn Frontend (crm-frontend). Mở Terminal tích hợp trong VS Code. Thực thi lệnh sau để cài đặt các thư viện Node.js cần thiết: npm install Sau khi cài đặt hoàn tất, khởi chạy máy chủ Frontend bằng lệnh: npm run dev Truy cập vào đường dẫn hiển thị trên Terminal (mặc định là http://localhost:5173) thông qua trình duyệt web để bắt đầu sử dụng hệ thống.
Backend khởi chạy thành công khi cửa sổ Console thông báo ứng dụng đang hoạt động tại cổng 8081.  
# III.CÁC PHÂN HỆ NGHIỆP VỤ CHÍNH  
Phân hệ Quản lý Kho hàng & Sản phẩm (Inventory) Quản lý danh mục Sản phẩm và số lượng tồn kho thực tế.  
**Giao Diện Sản Phẩm**  
<img width="1543" height="869" alt="image" src="https://github.com/user-attachments/assets/a599c1b2-92af-4bc2-b8a1-1e1fbb2b64a6" />  
<img width="888" height="789" alt="image" src="https://github.com/user-attachments/assets/955a70b9-9e48-4d77-a7f7-460f8afa160f" />

