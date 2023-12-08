import { useState, useEffect } from 'react';

const useDataMock = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await import('../mock/data.json');
                const jsonData = response.default;

                await new Promise(resolve => setTimeout(resolve, 5));

                setData(jsonData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos JSON:', error);
                setIsLoading(false);
            }
        };

        fetchData();
        
    }, []);

    return { data, isLoading };
};

export default useDataMock;
