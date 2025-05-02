# HCT Survival Prediction

A robust machine learning-based system for predicting post-transplant survival outcomes in patients undergoing Hematopoietic Cell Transplantation (HCT). This project combines a FastAPI backend with a Next.js frontend to provide clinicians with an interactive, real-time decision-support tool that outputs personalized survival risk scores.

---

## 🚀 Features

- 🔍 Personalized survival risk prediction using clinical features
- 📊 Dashboard with variable definitions, data distribution, and model performance graphs
- 🧠 Ensemble of 10 ML models using LightGBM and CatBoost across five survival targets
- 📈 HLA-based feature engineering and fairness-aware training
- 🌐 FastAPI backend and Next.js frontend for real-time access and prediction

---
🎥 [Watch Demo Video](./demo_video.mp4)

## 🔧 Backend (FastAPI)

### 📋 Requirements

Make sure you have **Python 3.10** or later installed.

Install the required Python libraries by running:

```bash
cd backend
pip install -r requirements.txt
```


### ▶️ Running the Backend

Navigate to the backend directory:

```bash
cd backend/
```

Start the FastAPI server using:

```bash
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

> **Note**: Some model files are large (>100MB) and are tracked using [Git Large File Storage (LFS)](https://git-lfs.github.com/). If you're cloning this repo, ensure Git LFS is installed and run:
> 
> ```bash
> git lfs install
> git lfs pull
> ```

---

## 💻 Frontend (Next.js)

### 📋 Requirements

Ensure **Node.js (v18+)** and **npm** are installed.

### ▶️ Running the Frontend

Navigate to the frontend directory:

```bash
cd frontend/hct
```

Install the required packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

---

## ✅ Accessing the Application

- Go to `http://localhost:3000`
- Use the **Home** page to explore variable definitions and model insights.
- Use the **Predict** page to input patient data and generate a survival prediction score.

