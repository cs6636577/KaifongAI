from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from clip_service import predict_image, image_text_score

import os

import json
def save_report(data):

    try:
        with open("data.json", "r", encoding="utf-8") as f:
            reports = json.load(f)
    except:
        reports = []

    reports.append(data)

    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(
            reports,
            f,
            ensure_ascii=False,
            indent=2
        )

app = FastAPI()

# =========================
# CONFIG
# =========================
DEBUG = True
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

# =========================
# INPUT MODEL (TEXT ONLY TEST)
# =========================
class Report(BaseModel):
    category: str
    description: str


# =========================
# CATEGORY KEYWORDS
# =========================
CATEGORY_KEYWORDS = {
    "INFRA": ["ไฟ", "เสาไฟ", "ไฟดับ", "น้ำ", "ท่อน้ำ", "ประปา", "ถนน", "หลุม"],
    "ENV": ["ขยะ", "กลิ่น", "สกปรก"],
    "HEALTH": ["ควัน", "มลพิษ", "ฝุ่น"],
    "ORDER": ["จราจร", "รถจอด"]
}

# =========================
# 🔥 ADDED: THAI → CODE MAPPING
# =========================
CATEGORY_TH_MAP = {
    "โครงสร้างพื้นฐานและสาธารณูปโภค": "INFRA",
    "สิ่งแวดล้อมและสุขาภิบาล": "ENV",
    "สาธารณสุขและมลพิษ": "HEALTH",
    "ความเป็นระเบียบเรียบร้อยและจราจร": "ORDER",
    "สวัสดิการสังคมและพัฒนาชุมชน": "SOCIAL",
    "การบริการเจ้าหน้าที่และธรรมาภิบาล": "GOV"
}

# =========================
# 🔥 ADDED: CONVERTER FUNCTION
# =========================
def convert_category(category_th: str):
    return CATEGORY_TH_MAP.get(category_th, "UNKNOWN")


# =========================
# DESCRIPTION SCORE (0–20 smooth)
# =========================
def description_category_score(category, description):

    keywords = CATEGORY_KEYWORDS.get(category, [])

    if not keywords:
        return 0, []

    matched = [k for k in keywords if k in description]

    ratio = len(matched) / len(keywords)

    score = round(ratio * 20, 2)

    return score, matched


# =========================
# IMAGE CATEGORY SCORE (0–40 smooth)
# =========================
def image_category_score(selected_category, ai_category, confidence):

    if selected_category == ai_category:
        return round(confidence * 0.4, 2)

    return round(confidence * 0.15, 2)


# =========================
# IMAGE-TEXT SCORE (0–40 smooth)
# =========================
def image_description_score(image_path, description):

    raw = image_text_score(image_path, description)

    return round(raw * 0.4, 2)


# =========================
# SCORE ENGINE
# =========================
def calculate_score(category, description, ai_result, image_path):

    desc_score, matched_words = description_category_score(
        category,
        description
    )

    img_cat_score = image_category_score(
        category,
        ai_result["category"],
        ai_result["confidence"]
    )

    img_text_score = image_description_score(
        image_path,
        description
    )

    total = round(
        desc_score +
        img_cat_score +
        img_text_score,
        2
    )

    total = max(0, min(total, 100))

    if total >= 80:
        decision = "ACCEPT"
    elif total >= 60:
        decision = "REVIEW"
    else:
        decision = "REJECT"

    if DEBUG:
        print("\n" + "=" * 50)
        print("🤖 KAIFONG AI SCORE ENGINE")
        print("=" * 50)

        print(f"📂 Category      : {category}")
        print(f"📝 Description   : {description}")

        print("\n🔍 AI ANALYSIS")
        print(f"   Predicted     : {ai_result['category']}")
        print(f"   Confidence    : {ai_result['confidence']:.2f}")
        print(f"   Keywords      : {', '.join(matched_words) if matched_words else '-'}")

        print("\n📊 SCORE BREAKDOWN")
        print(f"   Description   : {desc_score:.2f} / 20")
        print(f"   Image         : {img_cat_score:.2f} / 40")
        print(f"   Image-Text    : {img_text_score:.2f} / 40")

        print("\n🏆 RESULT")
        print(f"   TOTAL SCORE   : {total:.2f} / 100")
        print(f"   DECISION      : {decision}")
        print("=" * 50 + "\n")

    return {
        "score": total,
        "decision": decision,
        "breakdown": {
            "description_score": desc_score,
            "image_score": img_cat_score,
            "image_text_score": img_text_score
        },
        "debug": {
            "matched_keywords": matched_words
        }
    }


# =========================
# HOME
# =========================
@app.get("/")
def home():
    return {"message": "Kaifong AI Service Running"}


# =========================
# TEST TEXT ONLY
# =========================
@app.post("/verify")
def verify(report: Report):

    desc_score, matched_words = description_category_score(
        report.category,
        report.description
    )

    return {
        "description_score": desc_score,
        "matched_keywords": matched_words
    }


# =========================
# MAIN AI API (LIFF)
# =========================
@app.post("/verify-image")
async def verify_image(
    category: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):

    # save image
    path = os.path.join(UPLOAD_DIR, image.filename)

    with open(path, "wb") as f:
        f.write(await image.read())

    # 🔥 ADD: convert Thai → code
    category_code = convert_category(category)

    # AI prediction
    ai_result = predict_image(path)

    # scoring
    result = calculate_score(
        category_code,
        description,
        ai_result,
        path
    )

    save_report({
    "category": category,
    "description": description,
    "score": result["score"],
    "decision": result["decision"],
    "ai_prediction": ai_result
    })
    
    return {
        **result,
        "category_code": category_code,
        "ai_prediction": ai_result
    }
@app.post("/webhook")
async def webhook(request: Request):

    body = await request.json()

    print(body)

    return {"status": "ok"}