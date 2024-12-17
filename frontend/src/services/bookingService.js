import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};
