from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import torch

print("Loading CLIP...")

model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)

print("Loading Image...")

image = Image.open(r"test.jpg/ประปา/ประปา1.jpg")

labels = [
    "electric pole",
    "water pipe",
    "road",
    "garbage"
]

CATEGORY_MAP = {
    "electric pole": "ไฟฟ้า",
    "water pipe": "ประปา",
    "road": "ถนน",
    "garbage": "ขยะ"
}

inputs = processor(
    text=labels,
    images=image,
    return_tensors="pt",
    padding=True
)

outputs = model(**inputs)

probs = outputs.logits_per_image.softmax(dim=1)

print("\nRESULT")

results = {}

for label, prob in zip(labels, probs[0]):
    score = prob.item() * 100

    results[label] = score

    print(f"{label}: {score:.2f}%")

# หาหมวดที่คะแนนสูงสุด
best_label = max(results, key=results.get)
best_score = results[best_label]

thai_category = CATEGORY_MAP.get(
    best_label,
    best_label
)

print("\n====================")
print("PREDICTION")
print("====================")
print("Category:", thai_category)
print(f"Confidence: {best_score:.2f}%")