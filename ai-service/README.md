# KAIFONG AI SERVICE

AI Service สำหรับตรวจสอบคำร้องเรียนจาก LIFF

---

## ⚙️ การติดตั้ง (Installation)

### 1. สร้าง Virtual Environment (ต้องทำก่อน)

📌 ทุกคนที่รันโปรเจกต์ต้องทำขั้นตอนนี้

**Windows**

python -m venv venv  
venv\Scripts\activate  

**Mac / Linux**

python3 -m venv venv  
source venv/bin/activate  

---

## 📦 Install dependencies

pip install -r requirements.txt  

---
cd ai-service

## 🚀 Run Project

uvicorn main:app --reload  

---

## 🌐 Open Swagger UI

http://localhost:8000/docs  

---

## 📌 Project Description

ระบบ AI Service ใช้สำหรับ  
- ตรวจสอบคำร้องเรียนจาก LIFF  
- วิเคราะห์ข้อความ  
- ให้คะแนนความสอดคล้อง (0–100)  
- ส่งผลลัพธ์กลับเป็น JSON  

---

## 🧠 API Flow

1. รับข้อมูลจาก LIFF  
2. ส่งเข้า AI Service  
3. วิเคราะห์ข้อความ  
4. คืนค่า score  

---

## 🛠 Tech Stack

- Python 3  
- FastAPI  
- Uvicorn  
- Pydantic  

---

## ❗ หมายเหตุ

- ต้อง activate virtual environment ก่อนทุกครั้ง  
- ถ้า port 8000 ใช้งานไม่ได้ ใช้คำสั่งนี้:

uvicorn main:app --port 8001 --reload  

---

## 👨‍💻 KAIFONG PROJECT

AI Service Module for Complaint System