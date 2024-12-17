import React, { useState } from 'react';
import axios from 'axios';
import Invoice from './Invoice'; // Import the Invoice component

const BookingForm = ({ packageId, price }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState(null); // State to store the booking response

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Calculate total price
      const totalPrice = price * formData.travelers;

      // Send POST request to backend
      const response = await axios.post('https://trip-booking-qo94.onrender.com/api/bookings', {
        packageId,
        ...formData,
        totalPrice,
      });

      // Set booking data and success
      setBooking(response.data); // Save the full booking data for the invoice
      setSuccess(true);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.response?.data?.message || 'Error creating booking');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* Success Message */}
      {success && !booking && (
        <p className="text-green-500 mb-4">Booking successful! Generating invoice...</p>
      )}

      {/* Show Invoice if booking is available */}
      {booking ? (
        <Invoice booking={{
          _id: booking._id,
          customerName: booking.name,
          email: booking.email,
          phoneNumber: booking.phone,
          package: {
            title: booking.packageTitle || 'Selected Package',
            price: price,
          },
          numberOfTravelers: booking.travelers,
          totalPrice: booking.totalPrice,
        }} />
      ) : (
        // Booking Form
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Number of Travelers</label>
            <input
              type="number"
              name="travelers"
              min="1"
              value={formData.travelers}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
          >
            Submit Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
