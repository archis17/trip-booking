import axios from 'axios';

const API_URL = 'https://trip-booking-qo94.onrender.com/api';

export const getPackages = async () => {
  const response = await axios.get(`${API_URL}/packages`);
  return response.data;
};

export const getPackageById = async (id) => {
  const response = await axios.get(`${API_URL}/packages/${id}`);
  return response.data;
};
