import { useState, useEffect } from 'react';
import { METHODS } from '../constants/methods';

const useFetchApi = (endpoint, method = METHODS.GET, payload = '') => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token')?.replace(/"/g, '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                setError(null)

                let url = `${import.meta.env.VITE_BACKEND_API}${endpoint}`;

                if (payload && method !== METHODS.POST) {
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

        fetchData();

    }, []);

    return { data, isLoading, error };
};

export default useFetchApi;
