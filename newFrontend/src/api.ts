import axios from 'axios';
import { Analysis, Finding } from './app/lib/mockData'; // we'll use same types but without mocking

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email?: string, password?: string) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data; // { token }
  },
  register: async (email?: string, password?: string) => {
    const res = await api.post('/auth/register', { email, password });
    return res.data; // { token }
  }
};

export const analysisApi = {
  getAnalyses: async (): Promise<Analysis[]> => {
    const res = await api.get('/analyses');
    return res.data;
  },
  
  createAnalysis: async (repositoryUrl: string): Promise<{ jobId: string }> => {
    const res = await api.post('/analyses', { repositoryUrl });
    return res.data;
  },

  getAnalysis: async (id: string): Promise<Analysis> => {
    const res = await api.get(`/analyses/${id}`);
    return res.data;
  },

  getFindings: async (id: string): Promise<Finding[]> => {
    const res = await api.get(`/analyses/${id}/findings`);
    return res.data;
  },

  reanalyze: async (id: string): Promise<{ jobId: string }> => {
    const res = await api.post(`/analyses/${id}/reanalyze`);
    return res.data;
  },

  downloadReport: (id: string) => {
    window.location.href = `${API_BASE_URL}/analyses/${id}/report?token=${localStorage.getItem('token')}`;
  },

  downloadCSV: (id: string) => {
    window.location.href = `${API_BASE_URL}/analyses/${id}/findings.csv?token=${localStorage.getItem('token')}`;
  }
};
