import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { parseISO, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToExcel(fetchedData: any[], file: string) {
  const headers = Object.keys(fetchedData[0]).map((key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
  );

  // Create data rows with headers
  const dataWithHeaders = [
    headers,
    ...fetchedData.map((item: any) =>
      headers.map((header) => item[header.toLowerCase().replace(/ /g, '_')]),
    ),
  ];

  // Create a new worksheet
  const ws = XLSX.utils.aoa_to_sheet(dataWithHeaders);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, file);

  // Write the workbook to a file
  XLSX.writeFile(wb, `${file}.xlsx`);
}

export function exportToPDF(
  columns: { header: string; dataKey: string }[],
  data: any[],
  fileName: string,
) {
  // Create a new PDF document
  const doc = new jsPDF('landscape');

  // Generate the table rows from the fetched data
  const rows = data.map((row: any) =>
    columns.map((col) => {
      if (col.dataKey === 'date') {
        return `${new Date(row[col.dataKey]).toLocaleDateString()}`;
      }
      return row[col.dataKey];
    }),
  );

  // Add the table to the PDF with custom column widths and other settings
  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rows,
    startY: 10,
    theme: 'striped',
    styles: {
      overflow: 'linebreak',
      halign: 'center',
      cellPadding: 2,
      lineColor: [0, 0, 0], // Black color for the border
      lineWidth: 0.1, // Thickness of the border
    },
    headStyles: { fillColor: [22, 160, 133] },
    margin: { top: 20 },
    pageBreak: 'auto',
    tableLineWidth: 0.1,
    tableLineColor: [0, 0, 0],
  });

  // Save the PDF with the specified file name
  doc.save(fileName);
}


type CategoryItem = {
  name: string;
  score: number;
  weightage: number;
};

type OpportunityCategories = Record<string, CategoryItem[]>;

export const opportunityCategories: OpportunityCategories = {
  baseline: [
    { name: "<=10,000 ppm", score: 0.2, weightage: 15 },
    { name: ">10,000 and <=30,000 ppm", score: 0.6, weightage: 15 },
    { name: ">30,000 and <=100,000 ppm", score: 0.8, weightage: 15 },
    { name: ">100,000 ppm", score: 1.0, weightage: 15 },
  ],
  cross_function_rating: [
    { name: "Low", score: 0.2, weightage: 10 },
    { name: "Medium", score: 0.5, weightage: 10 },
    { name: "High", score: 1, weightage: 10 },
  ],
  data_analysis: [
    { name: "No Data", score: 0.1, weightage: 15 },
    { name: "Less Data", score: 0.4, weightage: 15 },
    { name: "Medium Data", score: 0.7, weightage: 15 },
    { name: "Data Intensive", score: 1, weightage: 15 },
  ],
  project_nature: [
    { name: "Problem Solving", score: 0.2, weightage: 10 },
    { name: "Process Optimization", score: 0.6, weightage: 10 },
    { name: "Innovation", score: 0.8, weightage: 10 },
    { name: "Perceived Quality", score: 1, weightage: 10 },
  ],
  expected_savings: [
    { name: "<= 1 Lakh", score: 0.2, weightage: 10 },
    { name: ">1 and <=5 Lakh", score: 0.6, weightage: 10 },
    { name: ">5 and <=10 Lakh", score: 0.8, weightage: 10 },
    { name: ">10 Lakh", score: 1, weightage: 10 },
  ],
  external_customer: [
    { name: "Nil", score: 0, weightage: 0 },
    { name: "Low", score: 0.2, weightage: 10 },
    { name: "Medium", score: 0.5, weightage: 10 },
    { name: "High", score: 1, weightage: 10 },
  ],
  internal_customer: [
    { name: "Nil", score: 0, weightage: 0 },
    { name: "Low", score: 0.2, weightage: 10 },
    { name: "Medium", score: 0.5, weightage: 10 },
    { name: "High", score: 1, weightage: 10 },
  ],
  project_type: [
    { name: "Type -1", score: 0.4, weightage: 15 },
    { name: "Type -2", score: 0.6, weightage: 15 },
    { name: "Type -3", score: 0.8, weightage: 15 },
    { name: "Type -4", score: 1, weightage: 15 },
  ]
  
};

type InputValues = Record<string, string | undefined>;

export function calculateImpactScore(
  inputValues: InputValues,
  
): number {
  let totalScore = 0;
  let totalWeightage = 0;

  console.log("Input Values:", inputValues);

  for (const [category, items] of Object.entries(opportunityCategories)) {
    const inputValue = inputValues[category];
    const match = items.find((item) => item.name === inputValue);

    const score = match?.score || 0;
    const weightage = match?.weightage || 0;

    console.log(`Category: ${category}, Input: ${inputValue}, Score: ${score}, Weightage: ${weightage}`);

    totalScore += score + weightage;
    totalWeightage += weightage;
  }

  console.log("Total Score:", totalScore, "Total Weightage:", totalWeightage);

  return totalWeightage > 0 ? totalScore : 0;
}
