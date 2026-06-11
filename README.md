# 🏠 KaifongAI — ระบบจัดการเรื่องร้องเรียน

> **ระบบ Back-Office สำหรับจัดการเรื่องร้องเรียนและสมาชิก** พัฒนาด้วย Next.js 16 + React 19 + TailwindCSS 4

---

## 📖 สารบัญ

- [ภาพรวมโปรเจกต์](#-ภาพรวมโปรเจกต์)
- [Tech Stack ที่ใช้](#-tech-stack-ที่ใช้)
- [โครงสร้างโฟลเดอร์](#-โครงสร้างโฟลเดอร์)
- [ระบบ Roles & สิทธิ์การเข้าถึง](#-ระบบ-roles--สิทธิ์การเข้าถึง)
- [หน้าเว็บทั้งหมด](#-หน้าเว็บทั้งหมด)
- [Data Flow — ข้อมูลไหลยังไง?](#-data-flow--ข้อมูลไหลยังไง)
- [API Routes](#-api-routes)
- [Services — ชั้น Business Logic](#-services--ชั้น-business-logic)
- [Components สำคัญ](#-components-สำคัญ)
- [Design System (สี / ธีม)](#-design-system-สี--ธีม)
- [วิธีติดตั้งและรันโปรเจกต์](#-วิธีติดตั้งและรันโปรเจกต์)
- [ข้อมูลจำลอง (Mock Data)](#-ข้อมูลจำลอง-mock-data)
- [สิ่งที่ควรรู้ก่อนแก้โค้ด](#-สิ่งที่ควรรู้ก่อนแก้โค้ด)

---

## 🔍 ภาพรวมโปรเจกต์

KaifongAI เป็นระบบ **Back-Office** สำหรับหน่วยงาน (NT) ที่ใช้จัดการ:

| ฟีเจอร์หลัก | รายละเอียด |
|---|---|
| 📊 **Dashboard** | แสดงสรุปจำนวนเรื่องร้องเรียน (วันนี้ / สัปดาห์ / เดือน), สถานะ pending/in_progress/resolved, เวลาเฉลี่ยในการปิดงาน, อันดับปัญหายอดนิยม |
| 👥 **จัดการสมาชิก** | อนุมัติ/ปฏิเสธสมาชิกใหม่, ดูสรุปจำนวนสมาชิกตาม role |
| 🔧 **จัดการประเภทปัญหา** | เพิ่ม/แก้ไข/เปิด-ปิด ประเภทปัญหาที่รับแจ้ง |
| 🔑 **จัดการสิทธิ์** | กำหนดสิทธิ์ให้สมาชิกแต่ละคน |
| 📋 **ประเมินผล** (Director) | ดูรายละเอียดและประเมิน case ร้องเรียน |

---

## 🛠 Tech Stack ที่ใช้

```
Next.js 16         → Framework หลัก (App Router)
React 19           → UI Library
TypeScript 5       → Type Safety
TailwindCSS 4      → Styling
MUI (Material UI) 9 → บาง Component เช่น Icon
Heroicons          → ไอคอน SVG
Lucide React       → ไอคอนเพิ่มเติม
React Icons        → ไอคอนจาก FontAwesome, Ionicons ฯลฯ
Emotion            → CSS-in-JS (dependency ของ MUI)
```

---

## 📂 โครงสร้างโฟลเดอร์

```
KaifongAI/
├── app/                          ← 🌐 หน้าเว็บทั้งหมด (App Router)
│   ├── page.tsx                  ← หน้า Login (หน้าแรก)
│   ├── layout.tsx                ← Root Layout (ฟอนต์ Inter + Noto Sans Thai)
│   ├── globals.css               ← CSS Variables + Design Tokens
│   ├── adminshell.tsx            ← Shell Layout ของ Admin (Navbar + Sidebar)
│   ├── directorshell.tsx         ← Shell Layout ของ Director
│   │
│   ├── admin/                    ← 👨‍💼 หน้าสำหรับ Admin
│   │   ├── layout.tsx            ← ใช้ AdminShell ครอบทุกหน้า
│   │   ├── dashboard/page.tsx    ← แดชบอร์ด
│   │   ├── member-approval/      ← อนุมัติสมาชิก
│   │   ├── problem-type/         ← จัดการประเภทปัญหา
│   │   ├── permission-management/← จัดการสิทธิ์
│   │   ├── manual/               ← คู่มือการใช้งาน
│   │   └── notfound/             ← หน้า 404
│   │
│   ├── director/                 ← 👔 หน้าสำหรับ Director
│   │   ├── layout.tsx            ← ใช้ DirectorShell ครอบทุกหน้า
│   │   ├── dashboard/page.tsx    ← แดชบอร์ด
│   │   ├── evaluate/             ← ประเมิน case
│   │   ├── manual/               ← คู่มือ
│   │   └── notfound/             ← หน้า 404
│   │
│   └── api/                      ← 🔌 API Routes (Server-side)
│       ├── summary/route.ts      ← GET สรุปข้อมูล Dashboard
│       ├── table/route.ts        ← GET ตาราง cases (เรียงวันที่)
│       ├── member-approval/      ← CRUD สมาชิก
│       ├── permission-management/← CRUD สิทธิ์
│       └── problem-type/         ← CRUD ประเภทปัญหา
│
├── components/ui/                ← 🧩 UI Components
│   ├── Admin_director/           ← Components ที่ Admin + Director ใช้ร่วมกัน
│   │   ├── AdminNavbar.tsx       ← แถบนำทางด้านบน (Admin)
│   │   ├── AdminSidebar.tsx      ← เมนูข้าง (Admin)
│   │   ├── DirectorNavbar.tsx    ← แถบนำทางด้านบน (Director)
│   │   ├── DirectorSidebar.tsx   ← เมนูข้าง (Director)
│   │   ├── SummaryCard.tsx       ← การ์ดสรุป (แถวบน Dashboard)
│   │   ├── SummaryCard2.tsx      ← การ์ดสรุป (แถวล่าง Dashboard)
│   │   ├── RankingCard.tsx       ← การ์ดอันดับปัญหา
│   │   ├── DataTable.tsx         ← ตารางข้อมูลทั่วไป
│   │   ├── PageNavigation.tsx    ← Pagination
│   │   ├── Search.tsx            ← ช่องค้นหา
│   │   ├── FilterModal.tsx       ← Modal กรองข้อมูล
│   │   ├── ProblemTypeModal.tsx  ← Modal เพิ่ม/แก้ไขประเภทปัญหา
│   │   ├── EditMemberModal.tsx   ← Modal แก้ไขสมาชิก
│   │   ├── Toggle.tsx            ← ปุ่ม Toggle เปิด/ปิด
│   │   └── ... (อื่นๆ)
│   │
│   └── Director/                 ← Components เฉพาะ Director
│       ├── CardDetail.tsx        ← รายละเอียด Case
│       ├── CardMap.tsx           ← แผนที่
│       ├── EmojiButton.tsx       ← ปุ่ม Emoji ประเมิน
│       ├── fileCard.tsx          ← การ์ดไฟล์แนบ
│       └── ... (อื่นๆ)
│
├── services/                     ← ⚙️ Business Logic / Data Access
│   ├── DataProvider.ts           ← ดึงข้อมูล cases, users, technicians, problems
│   ├── memberData.ts             ← CRUD สมาชิก (อ่าน/เขียน JSON file)
│   └── FilterData.ts             ← (ว่างอยู่ — ยังไม่ได้ implement)
│
├── lib/                          ← 📚 Utility Functions
│   └── summaryDashboard.ts       ← คำนวณสรุป Dashboard ทั้งหมด
│
├── data/                         ← 💾 ข้อมูลจำลอง (Mock Data)
│   ├── data.json                 ← ข้อมูลหลัก
│   ├── member.json               ← ข้อมูลสมาชิก
│   ├── case_status_logs.json     ← Log การเปลี่ยนสถานะ
│   ├── test.json                 ← ข้อมูลทดสอบ
│   ├── alternative/              ← ข้อมูลชุดสำรอง
│   │   ├── data2.json            ← ข้อมูลหลัก (ชุดที่ 2 — ตัวที่ใช้จริง)
│   │   ├── case_status_logs2.json
│   │   └── member1.json
│   ├── add_appr_at.js            ← Script เพิ่มฟิลด์ approve_at
│   └── cal_case_log.js           ← Script คำนวณ case log
│
└── public/                       ← 📁 Static Files
    └── logo/
        ├── NT_Logo.png
        └── Kaifong_logo.png
```

---

## 🔐 ระบบ Roles & สิทธิ์การเข้าถึง

ระบบมี **2 บทบาท** ที่เข้าถึงได้:

| Role | Email | Password | หน้าที่เข้าได้ |
|---|---|---|---|
| **Admin** | `admin@gmail.com` | `admin123` | Dashboard, จัดการสมาชิก, ประเภทปัญหา, จัดการสิทธิ์, คู่มือ |
| **Director** | `director@gmail.com` | `director123` | Dashboard, ประเมิน case, คู่มือ |

### การทำงานของ Authentication:

```
1. ผู้ใช้กรอก email + password ที่หน้า Login (app/page.tsx)
2. ตรวจสอบกับค่า hardcode ในโค้ด (ยังไม่ได้ต่อ database)
3. ถ้าถูก → เก็บ role ลง localStorage → redirect ไปหน้า dashboard
4. ถ้าผิด → แสดงข้อความ "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
```

### การป้องกันหน้า (Route Guard):

```
AdminShell / DirectorShell จะเช็ค localStorage("role")
ถ้า role ไม่ตรง → redirect กลับหน้า Login (/)
```

> ⚠️ **หมายเหตุ**: Authentication ตอนนี้เป็นแบบ client-side เท่านั้น ยังไม่มี session / JWT

---

## 📄 หน้าเว็บทั้งหมด

### หน้า Login (`/`)
- ใส่ email + password เพื่อเข้าสู่ระบบ
- แยก redirect ตาม role (admin → `/admin/dashboard`, director → `/director/dashboard`)

### Admin Pages (`/admin/...`)

| Path | หน้า | สิ่งที่ทำ |
|---|---|---|
| `/admin/dashboard` | แดชบอร์ด | สรุป cases (pending/resolved/avg close time), ร้องเรียนวันนี้/สัปดาห์/เดือน, อันดับปัญหา Top 3, ตาราง cases ล่าสุด |
| `/admin/member-approval` | อนุมัติสมาชิก | ตาราง pending members, ปุ่ม อนุมัติ/ปฏิเสธ, สรุปจำนวนคำขอ |
| `/admin/problem-type` | ประเภทปัญหา | CRUD ประเภทปัญหา, Toggle เปิด/ปิด, นับจำนวน case ของแต่ละประเภท |
| `/admin/permission-management` | จัดการสิทธิ์ | แก้ไข role/department/status ของสมาชิก |
| `/admin/manual` | คู่มือ | คู่มือการใช้งานระบบ |

### Director Pages (`/director/...`)

| Path | หน้า | สิ่งที่ทำ |
|---|---|---|
| `/director/dashboard` | แดชบอร์ด | เหมือน admin dashboard |
| `/director/evaluate` | ประเมิน case | ดูรายละเอียด + ประเมินผล case (มีปุ่ม Emoji) |
| `/director/manual` | คู่มือ | คู่มือการใช้งานระบบ |

---

## 🔄 Data Flow — ข้อมูลไหลยังไง?

```
┌──────────────────────────────────────────────────────────┐
│                      Frontend (Client)                    │
│                                                          │
│  หน้า Dashboard ──→ fetch("/api/summary") ──┐            │
│                  ──→ fetch("/api/table")   ──┤            │
│                                              ▼            │
│                                        แสดงผลบนหน้า       │
└─────────────────────────┬────────────────────────────────┘
                          │ HTTP Request
                          ▼
┌──────────────────────────────────────────────────────────┐
│                    API Routes (Server)                     │
│                                                          │
│  /api/summary/route.ts                                   │
│    → getData()              ← services/DataProvider.ts    │
│    → getSummaryDataDashboard()  ← lib/summaryDashboard.ts │
│    → return JSON                                         │
│                                                          │
│  /api/table/route.ts                                     │
│    → sortDate()             ← services/DataProvider.ts    │
│    → return JSON                                         │
│                                                          │
│  /api/member-approval/...                                │
│    → getMember() / updateMemberStatus()                   │
│                             ← services/memberData.ts      │
└─────────────────────────┬────────────────────────────────┘
                          │ อ่าน/เขียน
                          ▼
┌──────────────────────────────────────────────────────────┐
│                   Data Layer (JSON Files)                  │
│                                                          │
│  data/alternative/data2.json  ← cases, users, techs,    │
│                                  problems, logs          │
│  data/member.json             ← ข้อมูลสมาชิก             │
└──────────────────────────────────────────────────────────┘
```

**สรุปง่ายๆ:**
1. **Frontend** เรียก API ผ่าน `fetch()`
2. **API Routes** เรียก functions ใน `services/` และ `lib/`
3. **Services** อ่านข้อมูลจากไฟล์ JSON ใน `data/`
4. **Lib** คำนวณค่าสรุปต่างๆ แล้วส่งกลับ

---

## 🔌 API Routes

| Method | Endpoint | ทำอะไร |
|---|---|---|
| `GET` | `/api/summary` | ดึงข้อมูลสรุป Dashboard (topCards, bottomCards, RankingCards) |
| `GET` | `/api/table` | ดึง cases ทั้งหมด เรียงจากใหม่ → เก่า |
| `GET` | `/api/member-approval/summary` | สรุปจำนวนสมาชิก (คำขอวันนี้, pending, rejected, approved) |
| `GET` | `/api/member-approval/table` | ดึงตาราง members |
| `PATCH` | `/api/member-approval/update-table` | อัปเดตสถานะสมาชิก (approved/rejected) |
| `GET` | `/api/problem-type/summary` | สรุปจำนวนประเภทปัญหา |
| `GET` | `/api/problem-type/table` | ดึงตารางประเภทปัญหา + จำนวน case |
| `GET` | `/api/permission-management/summary` | สรุปจำนวนสมาชิกตาม role |
| `GET` | `/api/permission-management/table` | ดึงตารางสมาชิกสำหรับจัดการสิทธิ์ |

---

## ⚙️ Services — ชั้น Business Logic

### `services/DataProvider.ts`
> แหล่งข้อมูลหลักสำหรับ **cases, users, technicians, problems, case_status_logs**

| ฟังก์ชัน | คืนค่า | หน้าที่ |
|---|---|---|
| `getData()` | `DashboardData` | ดึงข้อมูลทุกตารางรวมกัน (ใช้ใน Dashboard) |
| `getCases()` | `Case[]` | ดึง cases ทั้งหมด |
| `getUsers()` | `User[]` | ดึง users ทั้งหมด |
| `getTechnicians()` | `Technician[]` | ดึง technicians ทั้งหมด |
| `getProblems()` | `Problem[]` | ดึง problems ทั้งหมด |
| `getCaseStatusLogs()` | `case_status_log[]` | ดึง log การเปลี่ยนสถานะ |
| `sortDate()` | `Case[]` | เรียง cases จากล่าสุด → เก่าสุด |
| `getProblemWithCounts()` | `ProblemWithCount[]` | ดึง problems พร้อมนับจำนวน case |
| `getProblemSummary()` | `{ total, active, inactive }` | สรุปจำนวน problems |

> 📝 **อ่าน JSON จาก `data/alternative/data2.json`** (ไม่ใช่ `data/data.json`)

---

### `services/memberData.ts`
> จัดการข้อมูล **สมาชิก** — อ่าน/เขียนไฟล์ `data/member.json` โดยตรง

| ฟังก์ชัน | คืนค่า | หน้าที่ |
|---|---|---|
| `getMember()` | `Member[]` | ดึงสมาชิกทั้งหมด |
| `getpendingMembers()` | `Member[]` | ดึงเฉพาะสมาชิกที่ status = "pending" |
| `getApprovedMembers()` | `Member[]` | ดึงเฉพาะสมาชิกที่ status = "approved" |
| `getMemberSummary()` | `MemberSummary` | นับจำนวนตาม role (admin/staff/auditor/inactive) |
| `getMemberApprovalSummary()` | `MemberApprovalSummary` | สรุปคำขอ (วันนี้/pending/rejected/approved/avg approve time) |
| `updateMemberStatus(id, status)` | `Member[]` | อัปเดตสถานะสมาชิก + บันทึก approve_at |

---

### `lib/summaryDashboard.ts`
> **คำนวณค่าสรุปสำหรับ Dashboard** — รับ `DashboardData` แล้วคืนค่าสรุป

| ฟังก์ชัน | คืนค่า | หน้าที่ |
|---|---|---|
| `summaryToday(data)` | `SummaryItem` | นับ cases วันนี้ |
| `summaryWeek(data)` | `SummaryItem` | นับ cases สัปดาห์นี้ (7 วันย้อนหลัง) |
| `summaryMonth(data)` | `SummaryItem` | นับ cases เดือนนี้ |
| `summaryPending(data)` | `SummaryItem` | นับ cases ที่ pending |
| `summaryResolved(data)` | `SummaryItem` | นับ cases ที่ resolved |
| `summaryAvgCloseTime(data)` | `SummaryItem` | คำนวณเวลาเฉลี่ยปิดงาน (วัน) |
| `getRanking(data)` | `RankingItem[]` | จัดอันดับปัญหา Top 3 |
| `getSummaryDataDashboard(data)` | `{ topCards, bottomCards, RankingCards }` | รวมทุกค่าสรุปเป็น object เดียว |

---

## 🧩 Components ทั้งหมด

---

### 🏗️ Shell Components (Layout Wrapper)

> Shell คือ component ที่ครอบทุกหน้าของแต่ละ role — มี Navbar + Sidebar + ระบบตรวจสิทธิ์

---

#### `AdminShell` — [adminshell.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/app/adminshell.tsx)

**หน้าที่**: ครอบทุกหน้าใน `/admin/*` ด้วย Navbar + Sidebar + ตรวจ role

**Props**:
| Prop | Type | คำอธิบาย |
|---|---|---|
| `children` | `React.ReactNode` | เนื้อหาของหน้าที่จะแสดง |

**การทำงาน**:
1. ตรวจ `localStorage("role")` → ถ้าไม่ใช่ `"admin"` จะ redirect ไป `/`
2. แสดง `AdminSidebar` + `AdminNavbar`
3. Sidebar มี toggle เปิด/ปิด → เมื่อเปิด main content จะเลื่อนไปทาง `ml-[276px]`

---

#### `DirectorShell` — [directorshell.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/app/directorshell.tsx)

**หน้าที่**: เหมือน AdminShell แต่ตรวจ role = `"director"`

**Props**: เหมือน `AdminShell`

---

### 📊 Components ใช้ร่วมกัน (`components/ui/Admin_director/`)

---

#### `AdminNavbar` — [AdminNavbar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/AdminNavbar.tsx)

**หน้าที่**: แถบนำทางด้านบนสำหรับ Admin — แสดงชื่อหน้าปัจจุบัน, ช่องค้นหา, ปุ่มแจ้งเตือน, ปุ่มตั้งค่า

**Props**:
| Prop | Type | คำอธิบาย |
|---|---|---|
| `isOpen` | `boolean` | Sidebar เปิดอยู่หรือไม่ (ปรับ position ตาม) |
| `onMenuClick` | `() => void` | เมื่อกดปุ่ม hamburger |

**การทำงาน**:
- ใช้ `usePathname()` ตรวจ URL → แสดง breadcrumb ที่ Navbar เช่น `สมาชิก / จัดการสิทธิ์`
- เมื่อ `isOpen = true` → Navbar จะเลื่อน left เป็น `276px`
- มี: ปุ่ม hamburger, ช่อง search, icon bell (แจ้งเตือน), icon gear (ตั้งค่า)

---

#### `AdminSidebar` — [AdminSidebar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/AdminSidebar.tsx)

**หน้าที่**: เมนูด้านข้างของ Admin — มี link ไปหน้าต่างๆ + submenu แบบ accordion

**Props**:
| Prop | Type | คำอธิบาย |
|---|---|---|
| `isOpen` | `boolean` | แสดง/ซ่อน sidebar |

**เมนูที่มี**:
```
📊 แดชบอร์ด            → /admin/dashboard
👤 สมาชิก (accordion)
   ├─ อนุมัติสมาชิก     → /admin/member-approval
   └─ จัดการสิทธิ์       → /admin/permission-management
📖 คู่มือการใช้งาน (accordion)
   ├─ คู่มือช่าง         → /admin/manual/staff
   ├─ คู่มือเจ้าหน้าที่   → /admin/manual/reporter
   └─ คู่มือประชาชน      → /admin/manual/user
⚙️ ประเภทปัญหา        → /admin/problem-type
```

**ด้านล่าง**: แสดง "ผู้ดูแลระบบ" พร้อม icon user

---

#### `DirectorNavbar` — [DirectorNavbar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/DirectorNavbar.tsx)

**หน้าที่**: เหมือน `AdminNavbar` แต่แสดง breadcrumb สำหรับ Director routes

---

#### `DirectorSidebar` — [DirectorSidebar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/DirectorSidebar.tsx)

**หน้าที่**: เมนูด้านข้างของ Director — มีเมนูน้อยกว่า Admin (dashboard, ประเมิน, คู่มือ)

---

#### `SummaryCard` — [SummaryCard.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/SummaryCard.tsx)

**หน้าที่**: การ์ดสรุปตัวเลข **แถวบน** ของ Dashboard (เช่น รอดำเนินการ, แก้ไขเสร็จ, เวลาเฉลี่ยปิดงาน)

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `title` | `string` | ✅ | ชื่อหัวข้อ เช่น "รอดำเนินการ" |
| `value` | `number \| string` | ✅ | ค่าตัวเลข (ถ้าเป็น number จะ padStart 2 หลัก) |
| `subvalue` | `string \| number` | ❌ | ค่ารอง เช่น "วัน" |
| `color` | `string` | ❌ | สี border-left ของการ์ด |

**ลักษณะ**: การ์ดสีขาว มีเส้นสีด้านซ้าย (`border-l-4`) + shadow-xs

---

#### `SummaryCard2` — [SummaryCard2.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/SummaryCard2.tsx)

**หน้าที่**: การ์ดสรุปตัวเลข **แถวล่าง** ของ Dashboard (เช่น ร้องเรียนวันนี้ / สัปดาห์ / เดือน) — **มี icon** ด้านซ้าย

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `icon` | `ComponentType \| string` | ❌ | icon เป็น React component หรือ URL รูป |
| `title` | `string` | ✅ | ชื่อหัวข้อ |
| `value` | `number \| string` | ✅ | ค่าตัวเลข |
| `subvalue` | `string \| number` | ❌ | ค่ารอง |
| `color` | `string` | ✅ | สีพื้นหลังของวงกลม icon |
| `className` | `string` | ❌ | override class ของ container |
| `styleIcon` | `string` | ❌ | override class ของวงกลม icon (เช่น เปลี่ยนจาก rounded-full) |
| `iconColor` | `string` | ❌ | สีของ icon |

**ลักษณะ**: การ์ดสีขาว มี วงกลมสี + icon ด้านซ้าย, ตัวเลขขนาดใหญ่ด้านขวา

---

#### `RankingCard` — [RankingCard.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/RankingCard.tsx)

**หน้าที่**: การ์ดแสดง **อันดับปัญหา Top 3** พร้อม progress bar

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `rank` | `number` | ✅ | ลำดับอันดับ (1, 2, 3) |
| `icon` | `ComponentType \| string` | ✅ | icon ของประเภทปัญหา |
| `title` | `string` | ✅ | ชื่อประเภทปัญหา เช่น "ไฟฟ้าขัดข้อง" |
| `value` | `string \| number` | ✅ | คำอธิบายปัญหา |
| `subvalue` | `string \| number` | ✅ | เปอร์เซ็นต์ (แสดงเป็น progress bar) |

**ลักษณะ**: badge "อันดับ X" สีเหลือง, icon มุมขวาบน, progress bar ด้านล่าง

---

#### `DataTable` — [DataTable.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/DataTable.tsx)

**หน้าที่**: ตารางข้อมูล **แบบ reusable** — กำหนด columns แล้วส่ง data เข้ามา

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `columns` | `Column[]` | ✅ | array ของคอลัมน์ (key, title, className, render) |
| `data` | `any[]` | ✅ | array ของข้อมูลแต่ละแถว |
| `theadClassName` | `string` | ❌ | class ของ `<thead>` (default: `text-[#64748B]`) |
| `className` | `string` | ❌ | class ของ `<td>` (เช่น เพิ่ม border-b) |

**Column type**:
```typescript
type Column = {
  key: string;       // key ที่ map กับ data object
  title: string;     // ชื่อหัวคอลัมน์
  className?: string; // class เฉพาะคอลัมน์
  render?: (value: any, row: any) => React.ReactNode; // custom render
}
```

**ตัวอย่างการใช้**:
```tsx
const columns = [
  { key: "id", title: "รหัส", className: "font-bold" },
  { key: "status", title: "สถานะ", render: (val) => <Badge>{val}</Badge> },
];
<DataTable columns={columns} data={tableData} />
```

---

#### `DataTableBase` — [DataTableBase.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/DataTableBase.tsx)

**หน้าที่**: ตารางฐาน (render เฉพาะ `<thead>`) — ส่ง `<tbody>` จากภายนอกผ่าน `children`

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `columns` | `Column[]` | ✅ | array ของคอลัมน์ |
| `theadClassName` | `string` | ❌ | class ของ thead |
| `children` | `React.ReactNode` | ✅ | `<tbody>` ที่กำหนดเอง |

**ต่างจาก DataTable ตรงไหน?**: `DataTable` render ทั้ง thead + tbody อัตโนมัติ แต่ `DataTableBase` render เฉพาะ thead แล้วให้ใส่ tbody เองผ่าน children (ยืดหยุ่นกว่าเวลาแถวมี logic ซับซ้อน)

---

#### `PageNavigation` (ComplaintPagination) — [PageNavigation.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/PageNavigation.tsx)

**หน้าที่**: ปุ่มเลื่อนหน้า (Pagination) — ลูกศรซ้าย-ขวา + ปุ่มตัวเลขหน้า

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `currentPage` | `number` | ✅ | หน้าปัจจุบัน |
| `totalPages` | `number` | ✅ | จำนวนหน้าทั้งหมด |
| `onPageChange` | `(page: number) => void` | ✅ | callback เมื่อเปลี่ยนหน้า |

**การทำงาน**: ถ้า `totalPages <= 1` จะ return null (ไม่แสดง), หน้าที่เลือกจะมีสีพื้น accent

---

#### `Search` (SearchInput) — [Search.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/Search.tsx)

**หน้าที่**: ช่องค้นหาแบบ controlled — มี icon แว่นขยาย ใช้ในหน้าจัดการ **ประเภทปัญหา**

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `value` | `string` | ✅ | ค่าปัจจุบันของ search |
| `onChange` | `(e: ChangeEvent) => void` | ✅ | callback เมื่อพิมพ์ |

**Placeholder**: `"ค้นหาชื่อประเภท..."`

---

#### `ComplainSearchInput` — [ComplainSearchInput.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/ComplainSearchInput.tsx)

**หน้าที่**: ช่องค้นหาอเนกประสงค์ — ใช้ในหน้า **อนุมัติสมาชิก** และ **จัดการสิทธิ์** (คล้าย Search แต่ props ยืดหยุ่นกว่า)

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `value` | `string` | ❌ | ค่าปัจจุบัน |
| `onChange` | `(value: string) => void` | ❌ | callback (ส่ง string ตรงๆ ไม่ใช่ event) |
| `placeholder` | `string` | ❌ | placeholder text |
| `className` | `string` | ❌ | class ของ container |
| `inputClassName` | `string` | ❌ | class ของ input |

---

#### `ComplainStatusTab` — [ComplainStatusTab.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/ComplainStatusTab.tsx)

**หน้าที่**: แท็บ 2 ปุ่ม — **"คำร้องทั้งหมด"** / **"รอดำเนินการ"** — ใช้กรองข้อมูลในตาราง

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `activeTab` | `"all" \| "pending"` | ✅ | แท็บที่ active อยู่ |
| `onChangeTab` | `(tab) => void` | ❌ | callback เมื่อเปลี่ยนแท็บ |

**ลักษณะ**: ปุ่ม rounded-full, active = สี accent, inactive = สีเทา

---

#### `ComplainToolbar` — [ComplainToolbar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/ComplainToolbar.tsx)

**หน้าที่**: **toolbar รวม** สำหรับหน้าจัดการสมาชิก/สิทธิ์ — ประกอบด้วย StatusTab + SearchInput + FilterButton + ExportButton

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `activeTab` | `"all" \| "pending"` | ✅ | แท็บที่ active |
| `onChangeTab` | `(tab) => void` | ❌ | เปลี่ยนแท็บ |
| `searchValue` | `string` | ❌ | ค่า search |
| `onSearchChange` | `(value) => void` | ❌ | พิมพ์ search |
| `onFilterClick` | `() => void` | ❌ | กดปุ่มกรอง |
| `onExportClick` | `() => void` | ❌ | กดปุ่มออกรายงาน |

**โครงสร้างภายใน**:
```
[คำร้องทั้งหมด] [รอดำเนินการ]  |  [🔍 ค้นหา...] [กรองข้อมูล] [ออกรายงาน]
```

---

#### `FilterModal` — [FilterModal.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/FilterModal.tsx)

**หน้าที่**: Modal กรองข้อมูลด้วย checkbox — กรองตาม **บทบาท** + **ประเภทช่าง**

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `isOpen` | `boolean` | ✅ | เปิด/ปิด modal |
| `onClose` | `() => void` | ✅ | ปิด modal |
| `roles` | `string[]` | ✅ | ตัวเลือกบทบาท |
| `types` | `string[]` | ✅ | ตัวเลือกประเภทช่าง |
| `selectedRoles` | `string[]` | ✅ | บทบาทที่เลือก |
| `selectedTypes` | `string[]` | ✅ | ประเภทที่เลือก |
| `setSelectedRoles` | `(v) => void` | ✅ | set บทบาท |
| `setSelectedTypes` | `(v) => void` | ✅ | set ประเภท |

**ปุ่ม**: "ล้าง" (เคลียร์ทั้งหมด) + "เสร็จสิ้น" (ปิด modal)

---

#### `ProblemTypeModal` (AddProblemTypeModal) — [ProblemTypeModal.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/ProblemTypeModal.tsx)

**หน้าที่**: Modal สำหรับ **เพิ่ม/แก้ไขประเภทปัญหา** — มี form กรอก ชื่อ + คำอธิบาย + เลือก Emoji

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `isOpen` | `boolean` | ✅ | เปิด/ปิด modal |
| `onClose` | `() => void` | ✅ | ปิด modal |
| `initialData` | `{ id?, name, description, emoji } \| null` | ❌ | ข้อมูลเริ่มต้น (ถ้ามี = โหมดแก้ไข) |

**การทำงาน**:
- ถ้ามี `initialData` → header เป็น "แก้ไขประเภทปัญหา", ปุ่ม = "บันทึก"
- ถ้าไม่มี → header เป็น "เพิ่มประเภทใหม่", ปุ่ม = "เพิ่มประเภท"
- ใช้ `emoji-picker-react` สำหรับเลือก emoji (แสดงเป็นภาษาไทย)
- ⚠️ ปุ่ม submit ยังไม่ได้ต่อ API (มีแค่ `onClose()`)

---

#### `EditMemberModal` — [EditMemberModal.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/EditMemberModal.tsx)

**หน้าที่**: Modal แก้ไขข้อมูลสมาชิก — แสดง form: ชื่อ, นามสกุล, อีเมล, หน่วยงาน, ประเภทช่าง

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `isOpen` | `boolean` | ✅ | เปิด/ปิด modal |
| `member` | `Member \| null` | ✅ | ข้อมูล member ที่จะแก้ไข |
| `onClose` | `() => void` | ✅ | ปิด modal |
| `onSave` | `(data: Member) => void` | ❌ | callback เมื่อกดบันทึก |

**⚠️ หมายเหตุ**: ใช้ `defaultValue` แทน `value` → form ไม่เป็น controlled (ค่าที่แก้ไขจะไม่ถูกส่งกลับจริงๆ ต้องปรับเป็น controlled)

---

#### `Toggle` (IOSSwitch) — [Toggle.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/Toggle.tsx)

**หน้าที่**: ปุ่ม Toggle แบบ iOS style — ใช้เปิด/ปิด สถานะ active ของประเภทปัญหา

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `checked` | `boolean` | ✅ | สถานะปัจจุบัน |
| `onChange` | `(e: ChangeEvent) => void` | ✅ | callback เมื่อ toggle |
| `disabled` | `boolean` | ❌ | ปิดการใช้งาน |

**ลักษณะ**: track สีเทา (#E9E9EA) → checked สี accent (#FFD100), thumb สีขาว slide ด้วย animation

---

#### `AddButton` — [AddButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/AddButton.tsx)

**หน้าที่**: ปุ่ม "เพิ่มประเภทใหม่" — สีเหลือง accent + icon plus

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `onClick` | `() => void` | ❌ | callback เมื่อกด |

---

#### `EditButton` — [EditButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/EditButton.tsx)

**หน้าที่**: ปุ่ม icon ดินสอ (แก้ไข) — ใช้ในตาราง

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `onClick` | `() => void` | ❌ | callback เมื่อกด |

---

#### `DeleteButton` — [DeleteButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/DeleteButton.tsx)

**หน้าที่**: ปุ่ม icon ถังขยะ (ลบ) — ใช้ในตาราง

**Props**: ไม่มี props (ยังไม่มี onClick handler)

---

#### `FilterButton` — [FilterButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/FilterButton.tsx)

**หน้าที่**: ปุ่ม "กรองข้อมูล" — สีเหลือง accent + icon filter

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `onClick` | `() => void` | ❌ | callback เมื่อกด |

---

#### `ExportDocumentButton` — [ExportDecumentButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/ExportDecumentButton.tsx)

**หน้าที่**: ปุ่ม "ออกรายงาน" — สีเข้ม (foreground3) + icon document

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `onClick` | `() => void` | ❌ | callback เมื่อกด |

---

#### `FabButton` — [FabButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/FabButton.tsx)

**หน้าที่**: Floating Action Button (ปุ่มลอย) — ปุ่มกลมมี shadow, hover scale effect

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `size` | `"sm" \| "default" \| "lg"` | ❌ | ขนาด (h-10/14/16) |
| `icon` | `React.ReactNode` | ❌ | icon custom (default: SquarePlus) |
| `className` | `string` | ❌ | class เพิ่มเติม |
| + `ButtonHTMLAttributes` | | | inherit props ของ button ทั้งหมด |

**ลักษณะ**: สี primary, rounded-full, shadow-lg, hover:scale-105, active:scale-95

---

#### `OptionMenu` — [OptionMenu.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/OptionMenu.tsx)

**หน้าที่**: เมนู dropdown แบบ 3 จุด (⋮) — ใช้ **MUI Menu** component

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `options` | `string[]` | ✅ | ตัวเลือกทั้งหมด |
| `defaultValue` | `string` | ❌ | ค่า default ที่เลือก |
| `onSelect` | `(value: string) => void` | ❌ | callback เมื่อเลือก |

**ลักษณะ**: กดปุ่ม ⋮ → popup menu จาก MUI แสดงตัวเลือก

---

#### `SimpleDropDown` — [SimpleDropDown.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/SimpleDropDown.tsx)

**หน้าที่**: Dropdown select กรองสถานะ — ใช้ **MUI Select** — มี 3 ตัวเลือก: ทุกสถานะ / เปิดใช้งาน / ปิดใช้งาน

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `value` | `string` | ✅ | ค่าที่เลือก (`""`, `"active"`, `"inactive"`) |
| `onChange` | `(value: string) => void` | ✅ | callback เมื่อเปลี่ยน |

---

#### `ViewToggle` — [View.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/View.tsx)

**หน้าที่**: ปุ่ม toggle สลับ **มุมมอง List / Grid** — มี sliding animation

**Props**: ไม่มี (state อยู่ภายใน)

**ลักษณะ**: 2 ปุ่ม (List + Grid) ใน container เทา, ปุ่มที่ active มี background ขาว slide ไป-มา

---

#### `Filter` — [Filter.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Admin_director/Filter.tsx)

**สถานะ**: ❌ **ไฟล์ว่าง** — ยังไม่ได้ implement

---

### 🎬 Components เฉพาะ Director (`components/ui/Director/`)

---

#### `CardDetail` — [CardDetail.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/CardDetail.tsx)

**หน้าที่**: แสดง **รายละเอียดคำร้อง** — header สีเข้ม + เนื้อหา 2 คอลัมน์ + ไฟล์แนบ

**Props**: ไม่มี (ข้อมูล hardcode อยู่ใน component)

**แสดงข้อมูล**:
```
┌─ Header (สี secondary) ─────── [LINE Official badge] ┐
│                                                        │
│  ซ้าย:                    ขวา:                        │
│  ├─ หัวข้อเรื่อง            ├─ ประเภทบริการ              │
│  └─ รายละเอียดปัญหา         └─ อุปกรณ์ที่เกี่ยวข้อง      │
│                                                        │
│  ไฟล์แนบเพิ่มเติม: [📄 screenshot_01.jpg] [📄 ...]     │
└────────────────────────────────────────────────────────┘
```

---

#### `CardMap` — [CardMap.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/CardMap.tsx)

**หน้าที่**: แสดง **แผนที่ตำแหน่ง** ของคำร้อง — header "ตำแหน่งที่ตั้ง" + รูปแผนที่

**Props**: ไม่มี (ใช้รูป static จาก `public/map/Background.png`)

---

#### `EmojiButton` — [EmojiButton.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/EmojiButton.tsx)

**หน้าที่**: ปุ่ม **"🧑‍💼 คู่มือการใช้งานเจ้าหน้าที่"** — สีเหลือง accent + badge ตัวเลข

**Props**: ไม่มี (ข้อมูล hardcode)

**ลักษณะ**: ปุ่มสีเหลือง, มี badge สีดำ "12" มุมขวา

---

#### `EmojiButton2` — [EmojiButton2.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/EmojiButton2.tsx)

**หน้าที่**: ปุ่ม **"📣 คู่มือการใช้งานผู้แจ้งเรื่อง"** — สีขาว + badge ตัวเลข

**Props**: ไม่มี (ข้อมูล hardcode)

**ลักษณะ**: ปุ่มสีขาว border เทา, มี badge สีม่วงอ่อน "05"

---

#### `FileCard` — [fileCard.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/fileCard.tsx)

**หน้าที่**: การ์ดแสดง **ไฟล์/เอกสาร** ในหน้าคู่มือ — มีรูปปก + ชื่อ + คำอธิบาย + วันที่ + ขนาด + ปุ่มแก้ไข/ลบ

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `item` | `FileItem` | ✅ | ข้อมูลไฟล์ |

**FileItem type**:
```typescript
type FileItem = {
  title: string       // ชื่อไฟล์
  description: string // คำอธิบาย
  date: string        // วันที่
  datasize: string    // ขนาดไฟล์
  filetype?: string   // "IMAGE" | อื่นๆ (กำหนดสี badge)
  viewcount: string   // จำนวนวิว
  image?: string      // URL รูปปก
}
```

**ลักษณะ**: การ์ด rounded-2xl มี hover effect (-translate-y), badge สีเขียว/แดง ตาม filetype, ปุ่ม edit + delete ด้านล่าง

---

#### `EvaluateFilterModal` — [Filtermodal.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/Filtermodal.tsx)

**หน้าที่**: Modal กรองข้อมูลสำหรับหน้าประเมิน — กรองตาม **สถานะ** + **ประเภทปัญหา** (มี emoji)

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `isOpen` | `boolean` | ✅ | เปิด/ปิด |
| `onClose` | `() => void` | ✅ | ปิด modal |
| `statusOptions` | `string[]` | ✅ | ตัวเลือกสถานะ |
| `selectedStatus` | `string[]` | ✅ | สถานะที่เลือก |
| `setSelectedStatus` | `(v) => void` | ✅ | set สถานะ |
| `problemOptions` | `string[]` | ✅ | ตัวเลือกปัญหา |
| `selectedProblems` | `string[]` | ✅ | ปัญหาที่เลือก |
| `setSelectedProblems` | `(v) => void` | ✅ | set ปัญหา |

**มี emoji map**: เช่น "ไฟฟ้าขัดข้อง" → ⚡, "ถนนชำรุด" → 🛣️

---

#### `ManualToolbar` — [ManualToolbar.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/ManualToolbar.tsx)

**หน้าที่**: toolbar สำหรับหน้า **คู่มือ** — มี search + toggle Grid/List

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `search` | `string` | ✅ | ค่า search |
| `setSearch` | `Dispatch<SetStateAction<string>>` | ✅ | set ค่า search |

**ลักษณะ**: พื้นสีเทาอ่อน (#E6E8F0) + ช่อง search + ปุ่ม toggle grid/list มี slide animation

---

#### `SearchInput` (Director) — [SearchInput.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/SearchInput.tsx)

**หน้าที่**: ช่องค้นหาสำหรับ Director — คล้าย `ComplainSearchInput` แต่ใช้ icon จาก `react-icons/hi2`

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `value` | `string` | ❌ | ค่า search |
| `onChange` | `(value: string) => void` | ❌ | callback |
| `placeholder` | `string` | ❌ | default: "ค้นหาเลขที่คำร้อง หรือชื่อผู้ยื่น..." |
| `className` | `string` | ❌ | class container |
| `inputClassName` | `string` | ❌ | class input |

---

#### `SummaryCardLong` — [SummaryCardLong.tsx](file:///c:/Users/tapan/OneDrive/Desktop/Kai/KaifongAI/components/ui/Director/SummaryCardLong.tsx)

**หน้าที่**: การ์ดสรุปแบบ **แนวนอนยาว** — แสดง 6 ข้อมูลในแถวเดียว พร้อมแถบเหลืองด้านซ้าย

**Props**:
| Prop | Type | Required | คำอธิบาย |
|---|---|---|---|
| `title_app` | `string` | ✅ | label "ช่องทาง" |
| `value_app` | `string` | ✅ | ค่า เช่น "LINE" |
| `title_number` | `string` | ✅ | label "เลขที่" |
| `value_number` | `string` | ✅ | ค่า เช่น "REQ-01/68" |
| `title_department` | `string` | ✅ | label "หน่วยงาน" |
| `value_department` | `string` | ✅ | ค่า หน่วยงาน |
| `title_status` | `string` | ✅ | label "สถานะ" |
| `value_status` | `string` | ✅ | สถานะ (เปลี่ยนสีตามค่า) |
| `title_comment` | `string` | ✅ | label "ความคิดเห็น" |
| `value_comment` | `string` | ✅ | ค่า ความคิดเห็น |
| `title_time` | `string` | ✅ | label "เวลา" |
| `value_time` | `string` | ✅ | ค่า เวลา |

**สี status**: "ประเมินผลเสร็จสิ้น" → สีเขียว, "กำลังดำเนินการ" → สีเหลือง, "ไม่รับเรื่อง" → สีแดง

---

## 🎨 Design System (สี / ธีม)

สีหลักถูกกำหนดไว้ใน `app/globals.css` เป็น **CSS Variables**:

```
🎨 สีพื้นฐาน
──────────────────────────
--background     #FFFFFF    พื้นหลังหลัก
--surface        #FFFFFF    พื้นผิว card
--surface2       #F5F6FA    พื้นผิวรอง (เช่น กล่อง Login)

✏️ สีข้อความ
──────────────────────────
--foreground     #161B29    ข้อความหลัก
--foreground2    #4D4632    ข้อความรอง (เช่น ใน table)
--foreground3    #3D4457    ข้อความเน้น
--muted-foreground #575E72  ข้อความจาง

🎯 สี Brand
──────────────────────────
--primary        #161B29    Sidebar + Header background
--secondary      #2B303F    Sidebar hover
--accent         #FFD100    สีเหลือง NT (ปุ่ม Login, highlight)

✅ สี Status
──────────────────────────
--success        #10B981    สีเขียว (resolved)
--warning        #D97706    สีส้ม (in_progress)
--danger         #E11D48    สีแดง (pending / error)
```

### ฟอนต์ที่ใช้:
- **Inter** — ข้อความภาษาอังกฤษ
- **Noto Sans Thai** — ข้อความภาษาไทย (หลัก)
- **Sarabun** — ใช้เฉพาะหน้า Dashboard

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง Dependencies

```bash
cd KaifongAI
npm install
```

### 2. รัน Development Server

```bash
npm run dev
```

### 3. เปิดเบราว์เซอร์

```
http://localhost:3000
```

### 4. ล็อกอินทดสอบ

| บทบาท | Email | Password |
|---|---|---|
| Admin | `admin@gmail.com` | `admin123` |
| Director | `director@gmail.com` | `director123` |

---

## 💾 ข้อมูลจำลอง (Mock Data)

โปรเจกต์ยังไม่ได้ต่อ Database จริง ข้อมูลทั้งหมดเก็บในไฟล์ JSON:

| ไฟล์ | เนื้อหา | ใช้โดย |
|---|---|---|
| `data/alternative/data2.json` | cases, users, technicians, problems, case_status_logs | `DataProvider.ts` |
| `data/member.json` | ข้อมูลสมาชิก (มีทั้งอ่านและเขียน) | `memberData.ts` |

> 💡 **`memberData.ts` ใช้ `fs.readFileSync` / `fs.writeFileSync`** เขียนไฟล์ JSON โดยตรง
> นั่นคือเมื่ออนุมัติ/ปฏิเสธสมาชิก ไฟล์ `member.json` จะถูกแก้ไขจริง

### โครงสร้างข้อมูลหลัก:

```typescript
// Case — เรื่องร้องเรียน
interface Case {
  id: number;
  user_id: number;         // ผู้แจ้ง
  problem_id: number;      // ประเภทปัญหา
  datetime: string;        // วันที่แจ้ง
  status: "pending" | "in_progress" | "resolved";
  description?: string;    // รายละเอียด
  location?: string;       // พื้นที่
  location_detail?: string;
  location_lat?: number;   // พิกัด
  location_lng?: number;
  picture_url?: string;    // รูปภาพ
}

// Member — สมาชิก
interface Member {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  status: "approved" | "rejected" | "pending";
  is_active: boolean;
  role: "ผู้ตรวจสอบ" | "เจ้าหน้าที่" | "แอดมิน";
  department: string;      // หน่วยงาน
  technician_type: string; // ประเภทช่าง
  approve_at?: string;     // วันที่อนุมัติ
}
```

---

## ⚡ สิ่งที่ควรรู้ก่อนแก้โค้ด

### 1. ข้อมูลมาจากไฟล์ JSON ไม่ใช่ Database
- `DataProvider.ts` → import JSON ตรง (static import)
- `memberData.ts` → อ่าน/เขียน JSON ด้วย `fs` (dynamic, server-side only)
- ถ้าจะเปลี่ยนเป็น DB แก้ที่ `getData()` และ functions ใน services

### 2. Authentication เป็น Hardcode
- Email/Password อยู่ในไฟล์ `app/page.tsx` โดยตรง
- ใช้ `localStorage` เก็บ role (ไม่มี session/token)
- Shell components ตรวจ role ฝั่ง client เท่านั้น

### 3. Shell Pattern
- ทุกหน้าใน `/admin/*` จะถูกครอบด้วย `AdminShell` (Navbar + Sidebar)
- ทุกหน้าใน `/director/*` จะถูกครอบด้วย `DirectorShell`
- Sidebar เป็นแบบ toggle (เปิด/ปิดด้วยปุ่ม hamburger)

### 4. สีและธีม
- CSS Variables อยู่ใน `globals.css`
- มี theme ซ้ำหลายจุด (`:root`, `.admin-theme`, `@theme admin`) — ระวังการแก้สี

### 5. ภาษาไทย
- UI ทั้งหมดเป็นภาษาไทย
- ใช้ฟอนต์ Noto Sans Thai + Sarabun

### 6. ไฟล์ที่ยังว่าง
- `services/FilterData.ts` — ยังไม่ได้ implement

---

## 📋 คำสั่งที่ใช้บ่อย

```bash
npm run dev       # รัน development server
npm run build     # build production
npm run start     # รัน production server
npm run lint      # ตรวจสอบ code style
```

---

> 📌 **เอกสารนี้อัปเดตล่าสุด**: มิถุนายน 2569 (2026)

