// ExportToPDF.js

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ExportToPDF = ({
  elementId,
  fileName = "document.pdf",
  logoUrl,
  watermarkText,
}) => {
  const handleExport = async () => {
    const input = document.getElementById(elementId);
    if (!input) return;

    // Convert HTML to canvas
    const canvas = await html2canvas(input);

    // Create a PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      addWatermark(pdf);
      heightLeft -= pageHeight;
    }

    // addWatermark(pdf);
    // pdf.save(fileName);
    // Add logo (assuming logoUrl is provided)
    if (logoUrl) {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = logoUrl;
      // await logoImg.decode(); // Ensure the logo is loaded

      logoImg.onload = () => {
        const logoWidth = 30; // Set the logo width (in mm)
        const logoHeight = (logoImg.height * logoWidth) / logoImg.width; // Maintain aspect ratio
        pdf.addImage(logoImg, "PNG", 10, 10, logoWidth, logoHeight);

        addWatermark(pdf);
        pdf.save(fileName);
      };
      logoImg.onerror = (error) => {
        console.error("error loading the image for watermark logo");
      };
    } else {
      addWatermark(pdf);
      pdf.save(fileName);
    }
  };

  // Add watermark text
  const addWatermark = (pdf) => {
    if (watermarkText) {
      pdf.setTextColor(150); // Set a light gray color for the watermark
      pdf.setFontSize(50); // Set the font size for the watermark
      pdf.text(
        watermarkText,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() / 2,
        {
          align: "center",
          angle: 45, // Rotate the text
        }
      );
    }
  };

  //   // Save the PDF
  //   pdf.save(fileName);
  // };

  return (
    <button className="button" onClick={handleExport}>
      Export All Comparision to PDF
    </button>
  );
};

export default ExportToPDF;
