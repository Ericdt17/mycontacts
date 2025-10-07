import axios from "axios";

const API_BASE_URL = "https://mycontacts-ozo1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token?: string;
}

export interface ContactsResponse {
  success: boolean;
  message: string;
  data: {
    contacts: Contact[];
  };
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: {
    contact: Contact;
  };
}

export const authAPI = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getProfile: async (): Promise<AuthResponse> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

export const contactsAPI = {
  getContacts: async (): Promise<ContactsResponse> => {
    const response = await api.get("/contacts");
    return response.data;
  },

  getContact: async (id: string): Promise<ContactResponse> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  createContact: async (
    contact: Omit<Contact, "id" | "createdAt" | "updatedAt">
  ): Promise<ContactResponse> => {
    const response = await api.post("/contacts", contact);
    return response.data;
  },

  updateContact: async (
    id: string,
    contact: Partial<Omit<Contact, "id" | "createdAt" | "updatedAt">>
  ): Promise<ContactResponse> => {
    const response = await api.patch(`/contacts/${id}`, contact);
    return response.data;
  },

  deleteContact: async (id: string): Promise<ContactResponse> => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },
};

export default api;
