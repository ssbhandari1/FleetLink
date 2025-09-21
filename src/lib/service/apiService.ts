
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      error.message = error.response.data?.error || 'Invalid request parameters';
    } else if (error.response?.status === 500) {
      error.message = 'Server error. Please try again later.';
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please try again.';
    }
    return Promise.reject(error);
  }
);

export const vehicleAPI = {
    
  searchAvailable: async (params: {
    capacityRequired: number;
    fromPincode: string;
    toPincode: string;
    startTime: string;
  }) => {
    const response = await api.get('/vehicles/available', { params });
    return response.data;
  },


  addVehicle: async (vehicleData: {
    name: string;
    capacityKg: number;
    tyres: number;
    description?:string;
  }) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  bookVehicle: async (bookingData: {
    vehicleId?: string;
    fromPincode: string;
    toPincode: string;
    startTime: string | any;
  }) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },


  getAllVehicle: async () => {
    const response = await api.get('/vehicles/all')
    return response.data;
  },
};

export default api;