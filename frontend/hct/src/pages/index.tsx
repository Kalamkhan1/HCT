import VariableInfo from "../components/VariableInfo";
import Link from "next/link";
import styles from "../styles/index.module.css";

const data_dsitri =[
  "figure_1.png",
  "figure_2.png",
  "figure_3.png",
  "figure_4.png",
  "figure_5.png",
  "figure_6.png",
]

const model_performance = [
  "figure_7.png",
  "figure_8.png",
  "figure_9.png",
  "figure_10.png",
  "figure_11.png",
  "figure_12.png",
  "figure_13.png",
  "figure_14.png",
];

export default function Home() {
  return (
   <div className={styles.page}>

        <h1 className={styles.heading}>HCT Survival Analysis</h1>

        <p className={styles.paragraph}>
        This project performs survival prediction for patients undergoing Hematopoietic Cell Transplantation (HCT)
    using a combination of clinical, genetic, and demographic variables. The model is trained to predict event-free survival (EFS)
    time and likelihood, based on advanced ensemble techniques and stratified evaluation metrics.
        </p>

        <p className={styles.paragraph}>
        <strong>Stratified Concordance Index (C-Index):</strong> The Concordance Index is a performance metric used in survival analysis to evaluate the rank correlation
    between predicted and actual survival times. In this project, it is computed in a stratified way across different race groups
    to ensure fairness and generalizability of the predictions across diverse populations.
        </p>

        <VariableInfo />
 

      <div className="mt-12">
        <h2 className={styles.subheading}>Data Distribution Graphs</h2>

        <div className={styles.diagramGrid}>
          {data_dsitri.map((file, index) => (
            <iframe
              key={index}
              src={`/data/diagrams/${file}`}
              className={styles.iframe}
              title={`Diagram ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className={styles.subheading}>Model Performance Graphs</h2>

        <div className={styles.diagramGrid}>
          {model_performance.map((file, index) => ( 
            <iframe
              key={index}
              src={`/data/diagrams/${file}`}
              className={styles.iframe}
              title={`Diagram ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={`${styles.content} ${styles.buttonWrapper}`}>
        <Link href="/predict">  
          <button className={styles.button}>Go to Prediction</button>
        </Link>
      </div>

      <p className={`${styles.footer} ${styles.content}`}>An initiative of Kalam Khan, MGIT.</p>
    </div>
  );
}
