from mappings import CATEGORY_TH_MAP, SUBCATEGORY_TH_MAP

def convert_liff_issue(category_th: str, subcategory_th: str):
    category_code = CATEGORY_TH_MAP.get(category_th)
    subcategory_code = SUBCATEGORY_TH_MAP.get(subcategory_th)

    return category_code, subcategory_code