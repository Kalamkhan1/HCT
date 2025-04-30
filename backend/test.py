from catboost import CatBoostClassifier, CatBoostRegressor
import sys
import joblib


# Load the model
try:
    model = joblib.load("E:/random/HCT/hct_project/backend/models/ctb2_models.pkl")
    model = model[0]
    print("📋 Model expects the following input features:")
    for i, feature in enumerate(model.feature_names_, 1):
        print(f"{i}. {feature}")


except Exception as e:
    print("❌ Error loading or inspecting the model:")
    print(e)
    sys.exit(1)
