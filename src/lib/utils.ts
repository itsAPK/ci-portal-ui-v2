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
