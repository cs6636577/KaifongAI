import torch
import torch.nn.functional as F
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

# =========================
# INIT MODEL
# =========================
device = "cuda" if torch.cuda.is_available() else "cpu"

model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
).to(device)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)

model.eval()

# =========================
# LABELS
# =========================
LABELS = [
    "broken street light",
    "electric pole",
    "road damage",
    "pothole road",
    "sidewalk damage",
    "drainage system",
    "flooded drainage",
    "water pipe leak",

    "garbage pile",
    "overflowing trash bin",
    "dirty public area",
    "park area",
    "green area",
    "stray animal",

    "air pollution smoke",
    "noise pollution",
    "wastewater leak",

    "traffic jam",
    "illegal parking",
    "street vendor",
    "illegal signage",

    "community activity",
    "elderly care center",
    "child care center",

    "government office",
    "public service counter"
]

# =========================
# CATEGORY MAP (FIXED)
# =========================
CATEGORY_MAP = {
    "broken street light": {"category": "INFRA"},
    "electric pole": {"category": "INFRA"},
    "road damage": {"category": "INFRA"},
    "pothole road": {"category": "INFRA"},
    "sidewalk damage": {"category": "INFRA"},
    "drainage system": {"category": "INFRA"},
    "flooded drainage": {"category": "INFRA"},
    "water pipe leak": {"category": "INFRA"},

    "garbage pile": {"category": "ENV"},
    "overflowing trash bin": {"category": "ENV"},
    "dirty public area": {"category": "ENV"},
    "park area": {"category": "ENV"},
    "green area": {"category": "ENV"},
    "stray animal": {"category": "ENV"},

    "air pollution smoke": {"category": "HEALTH"},
    "noise pollution": {"category": "HEALTH"},
    "wastewater leak": {"category": "HEALTH"},

    "traffic jam": {"category": "ORDER"},
    "illegal parking": {"category": "ORDER"},
    "street vendor": {"category": "ORDER"},
    "illegal signage": {"category": "ORDER"},

    "community activity": {"category": "SOCIAL"},
    "elderly care center": {"category": "SOCIAL"},
    "child care center": {"category": "SOCIAL"},

    "government office": {"category": "GOV"},
    "public service counter": {"category": "GOV"}
}

# =========================
# DOMAIN KEYWORDS
# =========================
DOMAIN_KEYWORDS = {
    "INFRA": ["ไฟ", "รั่ว", "ท่อ", "ถนน", "เสา", "ไฟฟ้า", "น้ำ"],
    "ENV": ["ขยะ", "สกปรก", "ควัน"],
    "ORDER": ["จราจร", "รถ", "จอด", "ถนน"],
    "HEALTH": ["เสียง", "ควัน", "น้ำเสีย"],
    "SOCIAL": ["ชุมชน", "ผู้สูงอายุ", "เด็ก"],
    "GOV": ["สำนักงาน", "บริการ", "ราชการ"]
}

# =========================
# IMAGE CLASSIFICATION
# =========================
@torch.no_grad()
def predict_image(image_path: str):

    image = Image.open(image_path).convert("RGB")

    inputs = processor(
        text=LABELS,
        images=image,
        return_tensors="pt",
        padding=True
    ).to(device)

    outputs = model(**inputs)

    probs = outputs.logits_per_image.softmax(dim=1)[0]

    best_idx = torch.argmax(probs).item()
    best_label = LABELS[best_idx]

    confidence = float(probs[best_idx].item() * 100)

    category = CATEGORY_MAP.get(best_label, {}).get("category", "UNKNOWN")

    return {
        "label": best_label,
        "confidence": round(confidence, 2),
        "category": category
    }

# =========================
# DOMAIN DETECTOR
# =========================
def detect_domain(description: str):

    desc = description.lower()

    for domain, keywords in DOMAIN_KEYWORDS.items():
        if any(k in desc for k in keywords):
            return domain

    return "UNKNOWN"

# =========================
# IMAGE-TEXT SCORING (FIXED)
# =========================
def build_candidates(description: str):

    return [
        f"a photo of {description}",
        "a photo of infrastructure issue",
        "a photo of road damage",
        "a photo of drainage system",
        "a photo of urban problem",
        "a photo of public service issue"
    ]


@torch.no_grad()
def image_text_score(image_path: str, description: str):

    image = Image.open(image_path).convert("RGB")

    candidates = build_candidates(description)

    inputs = processor(
        text=candidates,
        images=[image] * len(candidates),
        return_tensors="pt",
        padding=True
    ).to(device)

    outputs = model(**inputs)

    logits = outputs.logits_per_image

    probs = logits.softmax(dim=1)[0]

    # =========================
    # FIX 1: top-k mean (ลดหลอก)
    # =========================
    topk = torch.topk(probs, k=3).values
    score = float(topk.mean().item())

    # =========================
    # FIX 2: DOMAIN PENALTY (stronger)
    # =========================
    domain = detect_domain(description)

    if domain == "UNKNOWN":
        penalty = 0.5
    else:
        penalty = 1.0

    return round(max(0, min(score * 100 * penalty, 100)), 2)

# =========================
# FINAL SCORE ENGINE (FIXED WEIGHT)
# =========================
def calculate_final_score(image_score, text_score, image_text_score):

    # =========================
    # FIX 3: mismatch penalty
    # =========================
    if image_score < 20:
        image_text_score *= 0.4

    # =========================
    # FIX 4: weighted scoring
    # =========================
    total = (
        text_score * 0.3 +
        image_score * 0.4 +
        image_text_score * 0.3
    )

    return round(min(total, 100), 2)

# =========================
# TEST RUN
# =========================
if __name__ == "__main__":

    image_path = "test.jpg"
    description = "ไฟรั่ว"

    img_result = predict_image(image_path)
    img_text_score_val = image_text_score(image_path, description)

    text_score = 0
    image_score = img_result["confidence"] * 0.4  # normalize

    total = calculate_final_score(
        image_score,
        text_score,
        img_text_score_val
    )

    print("\n🤖 KAIFONG AI SCORE ENGINE")
    print("=" * 50)

    print("📂 Category:", img_result["category"])
    print("📝 Description:", description)

    print("\n📊 SCORE BREAKDOWN")
    print("Image:", round(image_score, 2))
    print("Image-Text:", img_text_score_val)

    print("\n🏆 TOTAL SCORE:", total)

    if total >= 60:
        print("DECISION: APPROVE")
    else:
        print("DECISION: REJECT")

    print("=" * 50)