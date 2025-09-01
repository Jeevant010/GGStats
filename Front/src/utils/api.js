import axios from 'axios';
import { setAuthFromOutside } from './AuthContext';

const api = axios.create({
    baseURL: "http://localhost:9000/", // ✅ Fixed key name
    withCredentials: true, // ✅ Ensures cookies are sent for same-origin or CORS
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    r => r,
    async (err) => {
        const original = err.config;
        if(err.response?.status === 401 && !original._retry){
            original._retry = true;
            try {
                const {data} = await api.post('/admin/token');
                localStorage.setItem('accessToken' , data.accessToken);

                setAuthFromOutside(true);
                return api(original);
            }
            catch {
                localStorage.removeItem('accessToken');
                setAuthFromOutside(false);
                window.location.href = '\login';
            }
        }
        return Promise.reject(err);
    }
);

export default api;