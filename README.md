<img width="1680" alt="Ảnh màn hình 2024-11-21 lúc 18 27 41" src="https://github.com/user-attachments/assets/9d8f6d41-2b32-4582-9352-b49a3af22e36">
Ứng dụng Điều Khiển Nhà Thông Minh Bằng React Native
Giới thiệu
Ứng dụng Điều Khiển Nhà Thông Minh được phát triển bằng React Native nhằm mang đến trải nghiệm điều khiển các thiết bị trong gia đình thông qua điện thoại di động. Với giao diện trực quan, ứng dụng giúp người dùng dễ dàng quản lý các thiết bị như đèn, quạt, bình nóng lạnh, cửa cuốn và còi cảnh báo từ bất kỳ đâu.

Tính năng chính
Điều khiển ánh sáng:
Bật/tắt đèn trong nhà qua ứng dụng.
Điều khiển quạt:
Bật/tắt và theo dõi trạng thái quạt.
Giám sát an ninh:
Theo dõi trạng thái cửa cuốn, đóng/mở từ xa.
Điều khiển bình nóng lạnh:
Tắt/mở thiết bị theo nhu cầu.
Cảnh báo an ninh:
Kích hoạt hoặc tắt còi cảnh báo qua ứng dụng khi phát hiện trạng thái bất thường.
Kiến trúc ứng dụng
Ứng dụng React Native kết nối với hệ thống thông qua API và giao thức MQTT để quản lý và điều khiển các thiết bị IoT:

Giao diện người dùng (UI):
Được xây dựng bằng React Native với giao diện thân thiện và tối ưu cho cả Android và iOS.
Giao tiếp backend:
Kết nối với .NET Core API để lấy dữ liệu và điều khiển thiết bị.
Sử dụng MQTT để giao tiếp thời gian thực.
Tích hợp thời gian thực:
WebSocket/MQTT giúp cập nhật trạng thái thiết bị một cách nhanh chóng.
