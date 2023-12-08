import { useState, useEffect } from 'react';
import useFetchDataApi from './useFetchDataApi'
import { METHODS } from '../constants/methods'
import dayjs from 'dayjs';
import { ENDPOINTS } from '../constants/endpoints';

const useAvailability = (idClub, startDate, endDate) => {
    const { data: reservations, fetchData } = useFetchDataApi();
    const [period, setPeriod] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const searchReservations = async () => {
        const dateFrom = dayjs(startDate).format('YYYY-MM-DD 00:00:01');
        const dateTo = dayjs(endDate).format('YYYY-MM-DD 23:59:59');

        const values = {
            idClub: parseInt(idClub),
            dateFrom,
            dateTo,
        };

        await fetchData(ENDPOINTS.RESERVATIONS_BY_CLUB, METHODS.POST, values);
    };

    



    const uploadPeriod = () => {
        let newEndDate = dayjs(endDate);
        let currentDate = dayjs(startDate);
        currentDate = currentDate.hour(0);
        const newPeriod = [];

        while (currentDate <= newEndDate) {
            newPeriod.push(currentDate);
            currentDate = currentDate.add(1, 'day');
        }

        setPeriod(newPeriod);
    };


    

    useEffect(() => {
        if (dayjs(endDate).isBefore(dayjs(startDate), 'day')) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
            searchReservations();
            uploadPeriod();
        }
    }, [startDate, endDate]);

    return { reservations, period, showMessage };
};

export default useAvailability;