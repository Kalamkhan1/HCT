import variableData from "../data/variables.json";
import { useState } from "react";

export default function VariableForm() {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      Object.entries(variableData).map(([key, val]) => [key, val.type === "Categorical" ? "Unknown" : 0])
    )
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Prediction Result:", result);
      alert(`Predicted Risk Score: ${result.prediction}`);
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error contacting the prediction service.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Input Variable Values</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(variableData).map(([key, val]) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold mb-1">{key} ({val.type})</label>
            {val.type === "Categorical" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              >
                {val.values.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>
    </div>
  );
}
