import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import fs from 'fs';

// Convert Excel to PDF
export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { excelFilePath } = req.body;
    // Load the Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    // Create a PDF document with a font supporting Japanese characters
    const pdfPath = excelFilePath.replace('.xlsx', '.pdf');
    const pdfStream = fs.createWriteStream(pdfPath);
    const pdfDoc = new PDFDocument();
    pdfDoc.font('./fonts/Arial-Unicode-Regular.ttf'); 
    pdfDoc.pipe(pdfStream);

    // Convert each sheet from the Excel file to a PDF page
    workbook.eachSheet((sheet) => {
      pdfDoc.addPage();
      const columns = [];
      sheet.eachRow({ includeEmpty: true }, (row) => {     

      row.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell && cell.text ? cell.text : '';
          columns.push(cellValue);
        });
        pdfDoc.text(columns.join(' '), 50, pdfDoc.y);
        columns.length = 0;

        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const cellValue = cell && cell.text ? cell.text : '';
          const columnWidth = sheet.getColumn(colNumber).width;
          pdfDoc.text(columns.join(' '), 50, pdfDoc.y, { width: columnWidth });
        });
  
        row.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell && cell.text ? cell.text.replace(/\n/g, ' ') : '';
          columns.push(cellValue);
        });
        pdfDoc.text(columns.join(' '), 50, pdfDoc.y, { continued: true });
        
      });      
    });

    // Finalize the PDF document
    pdfDoc.end();
    
    // Respond with the PDF file path
    console.log("pdfPath:", pdfPath);
    res.status(200).json({ pdfPath });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
