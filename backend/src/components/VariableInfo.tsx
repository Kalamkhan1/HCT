"use client";
import React from "react";
import variableData from "../data/variables.json";

export default function VariableInfo() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Variable Definitions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Description</th>
              <th className="border px-3 py-2 text-left">Type</th>
              <th className="border px-3 py-2 text-left">Values</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(variableData).map(([name, details]) => (
              <tr key={name} className="even:bg-gray-50">
                <td className="border px-3 py-2">{name}</td>
                <td className="border px-3 py-2">{details.description}</td>
                <td className="border px-3 py-2">{details.type}</td>
                <td className="border px-3 py-2 whitespace-pre-wrap">
                  {details?.values?.join(", ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
