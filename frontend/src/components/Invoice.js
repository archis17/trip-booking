// src/components/Invoice.js
import React from 'react';
import jsPDF from 'jspdf';

const Invoice = ({ booking }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.text('Inceptioner Travels Booking Invoice', 10, 20);
    
    // Customer Details
    doc.setFontSize(12);
    doc.text(`Customer: ${booking.customerName}`, 10, 40);
    doc.text(`Email: ${booking.email}`, 10, 50);
    doc.text(`Phone: ${booking.phoneNumber}`, 10, 60);
    
    // Package Details
    doc.text(`Package: ${booking.package.title}`, 10, 80);
    doc.text(`Number of Travelers: ${booking.numberOfTravelers}`, 10, 90);
    
    // Price Breakdown
    doc.text(`Price per Person: $${booking.package.price}`, 10, 110);
    doc.text(`Total Price: $${booking.totalPrice}`, 10, 120);
    
    // Save the PDF
    doc.save(`invoice_${booking._id}.pdf`);
  };

  return (
    <div className="invoice bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      
      <div className="mb-4">
        <strong>Customer Name:</strong> {booking.customerName}
      </div>
      <div className="mb-4">
        <strong>Package:</strong> {booking.package.title}
      </div>
      <div className="mb-4">
        <strong>Total Travelers:</strong> {booking.numberOfTravelers}
      </div>
      <div className="mb-4">
        <strong>Total Price:</strong> ${booking.totalPrice}
      </div>
      
      <button 
        onClick={generatePDF}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Download Invoice PDF
      </button>
    </div>
  );
};

export default Invoice;