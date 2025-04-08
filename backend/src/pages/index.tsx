import VariableInfo from "../components/VariableInfo";
import Link from "next/link";

const diagramFiles = [
    "figure_28.html",
    "figure_30.html",
    "figure_31.html",
    "figure_32.html",
    "figure_33.html",
    "figure_35.html",
    "figure_36.html",
    "figure_39.html",
    "figure_41.html",
    "figure_42.html",
    "figure_44.html",
    "figure_45.html",

  ];

export default function Home() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">HCT Survival Analysis</h1>

      <p className="text-gray-700">
        This project performs survival prediction for patients undergoing Hematopoietic Cell Transplantation (HCT)
        using a combination of clinical, genetic, and demographic variables. The model is trained to predict event-free survival (EFS)
        time and likelihood, based on advanced ensemble techniques and stratified evaluation metrics.
      </p>

      <p className="text-gray-700">
        <strong>Stratified Concordance Index (C-Index):</strong> The Concordance Index is a performance metric used in survival analysis to evaluate the rank correlation
        between predicted and actual survival times. In this project, it is computed in a stratified way across different race groups
        to ensure fairness and generalizability of the predictions across diverse populations.
      </p>


   {/* 🔹 Variable Definitions Table */}
   <VariableInfo />

    {/* 🔹 Diagrams (from HTML plots) */}
    <div className="mt-12">
    <h2 className="text-xl font-semibold mb-4">Model Performance Graphs</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {diagramFiles.map((file, index) => (
        <iframe
        key={index}
        src={`/data/diagrams/${file}`} 
        className="w-full h-[600px] border"
        title={`Diagram ${index + 1}`}
        ></iframe>
    ))}
    </div>
    </div>

      <div className="mt-8 text-center">
        <Link href="/predict">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go to Prediction
          </button>
        </Link>
      </div>

      <p className="italic text-right text-sm text-gray-500">
        An initiative of Kalam Khan, MGIT.
      </p>
    </div>
  );
}
