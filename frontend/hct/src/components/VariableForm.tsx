import variableData from "../data/variables.json";
import { useState } from "react";
import styles from "../styles/variableForm.module.css";

export default function VariableForm() {
  // Flatten all variables into one formData state

  const [prediction, setPrediction] = useState<string | null>(null);

  const initialFormData = Object.entries(variableData).reduce((acc, [groupName, groupVars]) => {
    Object.entries(groupVars).forEach(([varName, meta]) => {
      acc[varName] = meta.type === "Categorical" ? "Unknown" : 0;
    });
    return acc;
  }, {} as Record<string, string | number>);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Submitted Data:", formData);

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Prediction Result:", result);
      setPrediction(`Predicted Risk Score: ${result.prediction}`);

    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error contacting the prediction service.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {Object.entries(variableData).map(([groupName, groupVars]) => (
          <div key={groupName} className={styles.group}>
            <h2 className={styles.groupHeading}>{groupName}</h2>
            {Object.entries(groupVars).map(([key, val]) => (
              <div key={key} className={styles.field}>
                <label htmlFor={key} className={styles.label}>
                  {key}:
                </label>
                {val.type === "Categorical" ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={styles.select}
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
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className={styles.input}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>
      </form>
      {prediction && (
  <div className={styles.resultBox}>
    <p>{prediction}</p>
  </div>
)}

    </div>
  );
}
