# KaifongAI 🚀

KaifongAI เป็นแอปพลิเคชันเว็บที่พัฒนาขึ้นมาเพื่อใช้ในการบริหารจัดการ แจ้งปัญหา และติดตามสถานะการดำเนินงาน (Case Management System) โดยแบ่งการเข้าถึงข้อมูลตามบทบาทของผู้ใช้งาน ได้แก่ **ผู้ดูแลระบบ (Admin)** และ **ผู้อำนวยการ (Director)** 

---

## 🎯 ฟีเจอร์หลักแบ่งตามบทบาทผู้ใช้งาน (Features by Role)

ระบบถูกออกแบบให้แต่ละบทบาทมีหน้าต่างการทำงานที่สอดคล้องกับหน้าที่ความรับผิดชอบ:

### 1. ผู้ดูแลระบบ (Admin)
สามารถเข้าถึงเส้นทาง (Route) `/admin/*` โดยมีฟังก์ชันดังนี้:
- **Dashboard (`/admin/dashboard`):** หน้าหลักแสดงภาพรวมของระบบและสถิติต่างๆ
- **Member Approval (`/admin/member-approval`):** ตรวจสอบและอนุมัติการสมัครสมาชิก (เช่น ช่างเทคนิค)
- **Permission Management (`/admin/permission-management`):** จัดการสิทธิ์ผู้ใช้งานภายในระบบ
- **Problem Type (`/admin/problem-type`):** จัดการและตั้งค่าประเภทของปัญหาที่รับแจ้ง
- **Manual (`/admin/manual`):** คู่มือการใช้งานระบบสำหรับแอดมิน

### 2. ผู้อำนวยการ (Director)
สามารถเข้าถึงเส้นทาง (Route) `/director/*` โดยมีฟังก์ชันดังนี้:
- **Dashboard (`/director/dashboard`):** หน้าหลักสำหรับดูรายงาน สถิติภาพรวมของการแก้ปัญหา
- **Evaluate (`/director/evaluate`):** ประเมินผลและตรวจสอบประสิทธิภาพการทำงาน
- **Manual (`/director/manual`):** คู่มือการใช้งานระบบสำหรับผู้อำนวยการ

---

## 💻 เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Next.js 15+](https://nextjs.org/) (ใช้งาน App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4, Material UI (MUI), Emotion
- **Icons:** Heroicons, Lucide React, React Icons
- **Language:** TypeScript (`.tsx`, `.ts`)

---

## 📁 โครงสร้างโฟลเดอร์ที่สำคัญ (Project Structure)

- `app/` - ส่วนควบคุม Routing ทั้งหมดของแอป (App Router)
  - `page.tsx` - หน้า Login หลัก
  - `admin/` - หน้าจอและฟีเจอร์สำหรับ Admin
  - `director/` - หน้าจอและฟีเจอร์สำหรับ Director
- `components/` - ชิ้นส่วน UI (Components) ที่แยกไว้เพื่อให้สามารถนำกลับมาใช้ซ้ำได้ เช่น ส่วนของ `Admin_director` และ `Director`
- `services/` - ไฟล์สำหรับจัดการลอจิกและการดึงข้อมูล เช่น `DataProvider.ts` ที่ทำหน้าที่ดึงข้อมูล Case, User, Technician และ Problem
- `data/` - เก็บไฟล์ข้อมูลจำลองในรูปแบบ JSON (เช่น `case_status_logs.json`, `data.json`) ซึ่งใช้ทดแทน Database ชั่วคราวสำหรับการทดสอบ
- `public/` - ไฟล์ Static เช่น รูปภาพโลโก้ `NT_Logo.png` และ `Kaifong_logo.png`

---

## ⚙️ การจัดการข้อมูล (Data Management)

ในปัจจุบันระบบยังไม่ได้เชื่อมต่อกับ Database จริง ข้อมูลทั้งหมดจะถูกจำลอง (Mock Data) จากไฟล์ JSON ในโฟลเดอร์ `data/` และดึงมาใช้งานผ่าน `services/DataProvider.ts` (เช่น `getCases()`, `getUsers()`, `getTechnicians()`) ซึ่งหากในอนาคตมีการเชื่อมต่อ API หรือฐานข้อมูลจริง สามารถปรับแก้แค่ในไฟล์ service นี้ได้ทันที

---

## 🛠️ การติดตั้งและการรันโปรเจกต์ (Installation & Setup)

1. **โคลนหรือดาวน์โหลดโปรเจกต์ลงมาที่เครื่องของคุณ**
2. **ติดตั้ง Dependencies:**
   เปิด Terminal ไปที่โฟลเดอร์โปรเจกต์และพิมพ์คำสั่ง:
   ```bash
   npm install
   # หรือ yarn install
   # หรือ pnpm install
   ```
3. **รันเซิร์ฟเวอร์สำหรับการพัฒนา (Development Server):**
   ```bash
   npm run dev
   # หรือ yarn dev
   ```
4. **เปิดใช้งาน:**
   เข้าไปที่ [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## 🔐 ข้อมูลการเข้าสู่ระบบจำลอง (Mock Login Credentials)

หน้าเข้าสู่ระบบตั้งอยู่ที่ `/` ของแอปพลิเคชัน สามารถใช้ข้อมูลเหล่านี้เพื่อเข้าทดสอบแต่ละระบบ:

| บทบาท (Role) | อีเมล (Email) | รหัสผ่าน (Password) | ปลายทางหลังจากล็อกอิน |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` | `/admin/dashboard` |
| **Director** | `director@gmail.com` | `director123` | `/director/dashboard` |

> *หมายเหตุ: ระบบล็อกอินใช้การตรวจสอบแบบ Hardcode และจำลองการเก็บสถานะผ่าน `localStorage` ชั่วคราวในฝั่ง Client*
