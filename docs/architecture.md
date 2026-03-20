# 🏛️ System Architecture Guide

## 1. Tổng quan (Philosophy)
Hệ thống được thiết kế theo mô hình **Layered Monorepo**. Mục tiêu cao nhất là:
- **Scalability:** Có thể thêm 10-20 site mới (`apps/`) mà không làm phình to code.
- **Strict Isolation:** Mỗi Feature là một "ốc đảo" logic.
- **DRY (Don't Repeat Yourself):** Tái sử dụng tối đa qua lớp `packages/features`.

## 2. Bản đồ các lớp (The Layers)

### 🔴 Lớp 1: Apps (`/apps/*`)
- **Vai trò:** Entry point của từng sản phẩm (manager, company, agency).
- **Quy tắc:** Chỉ chứa Route, Pages (views) và các tùy chỉnh giao diện đặc thù. Không chứa logic nghiệp vụ cốt lõi.

### 🟠 Lớp 2: Shared Features (`/packages/features/*`)
- **Vai trò:** Chứa các tính năng hoàn chỉnh (UI + Logic + Schema).
- **Đặc điểm:** Phải thiết kế theo dạng "Plug-and-Play". Nếu một tính năng dùng ở >2 apps, nó phải nằm ở đây.

### 🟡 Lớp 3: Effects & Middleware (`/packages/effects/*`)
- **Vai trò:** Lớp trung gian điều phối.
  - `access`: Quản lý phân quyền và Menu.
  - `layouts`: Các mẫu giao diện (Sidebar, TopNav).
  - `request`: Trình điều khiển API (Axios wrapper).
  - `common-ui`: Các component UI phức tạp nhưng không mang nặng nghiệp vụ.

### 🟢 Lớp 4: @Core (`/packages/@core/*`)
- **Vai trò:** Nền tảng kỹ thuật thuần túy.
  - `ui-kit`: Wrapper cho Element Plus.
  - `preferences`: Quản lý cấu hình phản ứng (Dark mode, Theme).
  - `base`: Các helper function không phụ thuộc UI.

## 3. Quy trình xử lý dữ liệu (Data Flow)
Mọi luồng dữ liệu phải đi theo một chiều:
1. **View (.vue)**: Bắt sự kiện người dùng.
2. **Composable**: Xử lý logic, tính toán và gọi API.
3. **Zod Schema**: Validate dữ liệu đầu vào/đầu ra.
4. **Store (Pinia)**: Lưu trữ trạng thái toàn cục (nếu cần).

## 4. Quy tắc "Vàng" về Tái sử dụng
- **UI Atomic:** Nếu chỉ là cái Button, Table -> Để ở `@core/ui-kit`.
- **UI Molecule:** Nếu là bộ Search, bộ Filter -> Để ở `effects/common-ui`.
- **Full Feature:** Nếu là trang Login, Profile, Settings -> Để ở `packages/features`.

## 5. Tiêu chuẩn Coding (Strict Mode)
- **No Modules/Containers:** Sử dụng cấu trúc Feature-based.
- **Logic Limit:** File `.vue` không quá 20 dòng logic. Quá giới hạn phải đẩy vào `composables`.
- **Type Safety:** Cấm dùng `any`. Mọi Interface phải được sinh ra từ Zod Schema.