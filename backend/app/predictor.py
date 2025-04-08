import joblib
import json
import numpy as np
from scipy.stats import rankdata
from app.utils import sigmoid_scale

class EnsemblePredictor:
    def __init__(self, model_paths: list, weights_path: str):
        self.load_ensemble_models_and_weights(model_paths, weights_path)
        self.cat_cols= cat_cols = [
            "dri_score",
            "psych_disturb",
            "cyto_score",
            "diabetes",
            "tbi_status",
            "arrhythmia",
            "graft_type",
            "vent_hist",
            "renal_issue",
            "pulm_severe",
            "prim_disease_hct",
            "cmv_status",
            "tce_imm_match",
            "rituximab",
            "prod_type",
            "cyto_score_detail",
            "conditioning_intensity",
            "ethnicity",
            "obesity",
            "mrd_hct",
            "in_vivo_tcd",
            "tce_match",
            "hepatic_severe",
            "prior_tumor",
            "peptic_ulcer",
            "gvhd_proph",
            "rheum_issue",
            "sex_match",
            "race_group",
            "hepatic_mild",
            "tce_div_match",
            "donor_related",
            "melphalan_dose",
            "cardiac",
            "pulm_moderate"
        ]

    def load_ensemble_models_and_weights(self, model_paths, weights_path):
        """
        model_paths: list of .pkl files, each containing a list of k-fold models
        """
        self.ensemble_models = [joblib.load(path) for path in model_paths]
    
        with open(weights_path, 'r') as f:
            scaling_info = json.load(f)
            self.ensemble_weights = list(scaling_info["weights"].values())
            self.min_val - scaling_info["min_val"]
            self.max_val - scaling_info["max_val"]


    def infer_model(self, data, models):
        
        data = data.drop(['ID'], axis=1)

        for col in self.cat_cols:
            data[col] = data[col].astype('category')

        return np.mean([model.predict(data) for model in models], axis=0)


    def predict_with_ensemble(self, data):

        ranked_preds = []

        for model_group in self.ensemble_models:
            preds = self.infer_model(data.copy(), model_group)
            ranked_preds.append(rankdata(preds))

        ranked_preds = np.array(ranked_preds)
        preds = np.dot(self.ensemble_weights, ranked_preds)
        preds = 1 + 99 * ((preds - self.min_val) / 
                               (self.max_val - self.min_val))
        return preds
