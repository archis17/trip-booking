import axios from 'axios';

const API_URL = 'https://trip-booking-qo94.onrender.com/api';

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};
