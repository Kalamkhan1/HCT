from fastapi import FastAPI
from app.model import InputData
from app.predictor import EnsemblePredictor
import pandas as pd
from app.utils import update_hla_columns
import polars as pl
from fastapi.middleware.cors import CORSMiddleware 


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Load model once at startup
predictor = EnsemblePredictor(
    model_paths=["models/lgb1_models.pkl", "models/ctb1_models.pkl","models/lgb2_models.pkl",
                  "models/ctb2_models.pkl","models/lgb3_models.pkl", "models/ctb3_models.pkl","models/cox1_models.pkl", "models/cox2_models.pkl"],
    weights_path="models/ensemble_weights.json"
)


@app.post("/predict")
def predict(data: InputData):
    # Convert pydantic model to Pandas
    input_df = pd.DataFrame([data.model_dump()])
    print(input_df)
    # Use Polars to apply HLA logic
    pl_df = pl.DataFrame(input_df)
    pl_df = update_hla_columns(pl_df)

    updated_df = pl_df.to_pandas()

    # Make prediction
    prediction = predictor.predict_with_ensemble(updated_df)
    return {"prediction": prediction.tolist()}
