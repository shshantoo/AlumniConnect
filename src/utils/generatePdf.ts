import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Ultra-high-resolution A4 PDF generator engine.
 * Locks the DOM element to standard A4 dimensions (794px width) before 
 * capturing via html2canvas to ensure crisp typography and 0 page clipping.
 */
export async function generateCvPdf(elementId: string, filename: string = 'AlumniConnect_CV.pdf'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id '${elementId}' not found.`);
    return false;
  }

  try {
    // Force standard A4 pixel width (794px @ 96 DPI) for capture
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    element.style.width = '794px';
    element.style.maxWidth = '794px';

    const canvas = await html2canvas(element, {
      scale: 3, // 3x Ultra-crisp resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: 794,
      logging: false,
    });

    // Restore original styles
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First Page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page pagination if content spans beyond 1 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Error generating CV PDF file:', err);
    return false;
  }
}
