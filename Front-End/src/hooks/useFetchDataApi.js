import { useState } from 'react';
import { METHODS } from '../constants/methods';

const useFetchDataApi = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')?.replace(/"/g, '');

    const fetchData = async (endpoint, method = METHODS.GET, payload = '') => {
        try {
            setIsLoading(true)
            setError(null)

            let url = `${import.meta.env.VITE_BACKEND_API}${endpoint}`;

            if (method !== METHODS.POST && method !== METHODS.PUT && payload) {
                url += `/${payload}`;
            }

            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }

            if (method !== METHODS.GET && payload) {
                options.body = JSON.stringify(payload);
            }

            const response = await fetch(url, options);
            const jsonData = await response.json();

            if (jsonData?.error) {
                setError(jsonData);
            } else {
                setData(jsonData);
            }

            setIsLoading(false);
        } catch (error) {
            setError('Error al obtener los datos JSON:', error);
            setIsLoading(false);
        }
    };
    return { data, isLoading, error, fetchData };
};

export default useFetchDataApi;