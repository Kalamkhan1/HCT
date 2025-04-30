import VariableForm from "../components/VariableForm";
import styles from "../styles/predict.module.css";

export default function PredictPage() {
  return (
    <div className={styles.predictContainer}>
      <h1 className={styles.predictTitle}>Predict HCT current condition of patient</h1>
      <p className={styles.instructionText}>Please fill out this form with the required information</p>
      <VariableForm />
    </div>
  );
}