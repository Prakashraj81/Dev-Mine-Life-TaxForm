import { writeFile, readFile } from 'fs';
import { join } from 'path';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { excelData } = req.body;

    // Create an Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    
    // Populate Excel data (example: assuming 'excelData' is an array of arrays)
    excelData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Save the Excel workbook to a file
    const excelFilePath = join(process.cwd(), 'temp.xlsx');
    await workbook.xlsx.writeFile(excelFilePath);

    // Read the Excel file as a buffer
    const excelBuffer = await new Promise((resolve, reject) => {
      readFile(excelFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    // Convert Excel to PDF using jsPDF
    const pdf = new jsPDF();
    pdf.addPage();
    pdf.text('Converted PDF from Excel', 10, 10);
    pdf.addImage(new Uint8Array(excelBuffer), 'XLSX', 10, 20, 180, 160);

    // Save the PDF
    const pdfFilePath = join(process.cwd(), 'public', 'converted.pdf');
    writeFile(pdfFilePath, pdf.output(), (err) => {
      if (err) {
        console.error('Error saving PDF:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ pdfFilePath });
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
