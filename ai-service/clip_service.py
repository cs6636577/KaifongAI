import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

print("Loading CLIP Model...")

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
    # INFRA
    "street light",
    "broken street light",
    "electric pole",
    "road damage",
    "pothole road",
    "sidewalk damage",
    "drainage",
    "flooded drainage",
    "public building damage",

    # ENV
    "garbage",
    "trash pile",
    "overflowing trash bin",
    "dirty area",
    "park",
    "green area",
    "stray animal",

    # HEALTH
    "air pollution",
    "smoke",
    "wastewater",
    "noise pollution",
    "food market",

    # ORDER
    "traffic",
    "traffic congestion",
    "illegal parking",
    "street vendor",
    "stray dog",
    "illegal sign",

    # SOCIAL
    "community activity",
    "elderly welfare",
    "child development center",

    # GOV
    "government office",
    "public service desk",
    "digital service"
]

# =========================
# CATEGORY MAP
# =========================
CATEGORY_MAP = {
    "street light": {"category": "INFRA", "subcategory": "INFRA_LIGHT"},
    "electric pole": {"category": "INFRA", "subcategory": "INFRA_LIGHT"},
    "broken street light": {"category": "INFRA", "subcategory": "INFRA_LIGHT"},

    "drainage": {"category": "INFRA", "subcategory": "INFRA_DRAIN"},
    "flooded drainage": {"category": "INFRA", "subcategory": "INFRA_DRAIN"},

    "road damage": {"category": "INFRA", "subcategory": "INFRA_ROAD"},
    "pothole road": {"category": "INFRA", "subcategory": "INFRA_ROAD"},
    "sidewalk": {"category": "INFRA", "subcategory": "INFRA_ROAD"},
    "sidewalk damage": {"category": "INFRA", "subcategory": "INFRA_ROAD"},

    "garbage": {"category": "ENV", "subcategory": "ENV_WASTE"},
    "trash pile": {"category": "ENV", "subcategory": "ENV_WASTE"},
    "overflowing trash bin": {"category": "ENV", "subcategory": "ENV_WASTE"},

    "dirty area": {"category": "ENV", "subcategory": "ENV_CLEAN"},

    "park": {"category": "ENV", "subcategory": "ENV_GREEN"},
    "green area": {"category": "ENV", "subcategory": "ENV_GREEN"},

    "stray animal": {"category": "ENV", "subcategory": "ENV_ANIMAL"},

    "air pollution": {"category": "HEALTH", "subcategory": "HEALTH_POLLUTION"},
    "smoke": {"category": "HEALTH", "subcategory": "HEALTH_POLLUTION"},
    "wastewater": {"category": "HEALTH", "subcategory": "HEALTH_POLLUTION"},

    "noise pollution": {"category": "HEALTH", "subcategory": "HEALTH_NOISE"},

    "traffic": {"category": "ORDER", "subcategory": "ORDER_TRAFFIC"},
    "traffic congestion": {"category": "ORDER", "subcategory": "ORDER_TRAFFIC"},
    "illegal parking": {"category": "ORDER", "subcategory": "ORDER_TRAFFIC"},

    "street vendor": {"category": "ORDER", "subcategory": "ORDER_VENDOR"},
    "illegal sign": {"category": "ORDER", "subcategory": "ORDER_SIGN"},
    "stray dog": {"category": "ORDER", "subcategory": "ORDER_STRAY"},

    "community activity": {"category": "SOCIAL", "subcategory": "SOCIAL_COMMUNITY"},

    "government office": {"category": "GOV", "subcategory": "GOV_SERVICE"},
    "public service desk": {"category": "GOV", "subcategory": "GOV_SERVICE"},
    "digital service": {"category": "GOV", "subcategory": "GOV_DIGITAL"},
}
# =========================
# IMAGE CLASSIFICATION (CLIP)
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

    results = {
        label: float(prob.item() * 100)
        for label, prob in zip(LABELS, probs)
    }

    best_label = max(results, key=results.get)
    confidence = results[best_label]

    mapping = CATEGORY_MAP.get(best_label)

    if not mapping:
        return {
            "category": "UNKNOWN",
            "subcategory": "UNKNOWN",
            "confidence": round(confidence, 2),
            "label": best_label
        }

    return {
        "category": mapping["category"],
        "subcategory": mapping["subcategory"],
        "confidence": round(confidence, 2),
        "label": best_label
    }


# =========================
# IMAGE - TEXT SIMILARITY SCORE (0–100)
# =========================
@torch.no_grad()
def image_text_score(image_path: str, description: str):

    image = Image.open(image_path).convert("RGB")

    # prompt tuning (สำคัญมาก ทำให้ CLIP แม่นขึ้น)
    text = f"a photo of {description}"

    inputs = processor(
        text=[text],
        images=image,
        return_tensors="pt",
        padding=True
    ).to(device)

    outputs = model(**inputs)

    # CLIP similarity score
    logits = outputs.logits_per_image[0]

    # normalize to 0–100
    score = torch.sigmoid(logits).item() * 100

    return round(score, 2)