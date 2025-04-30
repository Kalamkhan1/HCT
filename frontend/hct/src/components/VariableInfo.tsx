"use client";
import React from "react";
import styles from "../styles/variableInfo.module.css";
import variableData from "../data/variables.json";

export default function VariableInfo() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Variable Definitions</h1>

      {Object.entries(variableData).map(([groupName, variables]) => (
        <div key={groupName} className={styles.group}>
          <h2 className={styles.groupHeading}>{groupName}</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(variables).map(([varName, details]) => (
                  <tr key={varName}>
                    <td>{varName}</td>
                    <td>{details.description}</td>
                    <td>{details.type}</td>
                    <td>{details.values?.length ? details.values.join(", ") : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
