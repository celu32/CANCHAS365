import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from "react-router-dom";
import {  useState } from "react";
import { Box } from '@mui/material';
import useFetchApi from '../../hooks/useFetchApi';
import Loading from '../loading/Loading';
import { ENDPOINTS } from '../../constants/endpoints';
import useAvailability from '../../hooks/useAvailability';
import { useEffect } from 'react';
import ModalConfirm from './ModalConfirm';
import { AuthContext } from "../../auth/context";



const FormReservations = ({club}) => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const [date, setDate] = useState(queryParams.get('date')) 

    const [playfieldId, setPlayfieldId] = useState(queryParams.get('idPlayingfield')) 

    const [startDatetime, setStartDatetime] = useState(dayjs(`${date} ${queryParams.get('time')}`).format('YYYY-MM-DD HH:mm:ss'))

    const [endDatetime, setEndDatetime] = useState(dayjs(`${date} ${queryParams.get('time')}`).add(1,'h').format('YYYY-MM-DD HH:mm:ss'))

    const { data: playfields, isLoading: isLoadingPlayfields, error: errorPlayfields} = useFetchApi(`${ENDPOINTS.PLAYINGFIELD}/club/${club.id}`);

    const { reservations } = useAvailability(club.id, startDatetime, endDatetime);

    const { userData } = AuthContext();



    useEffect(() => {
        setStartDatetime(`${dayjs(date).format('YYYY-MM-DD')} ${dayjs(startDatetime).format('HH:mm:ss')}`)
        setEndDatetime(`${dayjs(date).format('YYYY-MM-DD')} ${dayjs(endDatetime).format('HH:mm:ss')}`)
    }, [date]);

    useEffect(() => {
       reservations
       isReserved
    }, [startDatetime, endDatetime]);


    const isReserved = (idPlayfield) => {

        return reservations?.some((reservation) => {

            const day = `${dayjs(startDatetime).format('YYYY-MM-DD')}`
            const dayR = `${dayjs(reservation.startDatetime).format('YYYY-MM-DD')}`

            const startHH = parseInt(dayjs(startDatetime).format('HH')) 
            const startRH = parseInt(dayjs(reservation.startDatetime).format('HH'))

            const endHH = parseInt(dayjs(endDatetime).format('HH')) 
            const endRH = parseInt(dayjs(reservation.endDatetime).format('HH'))
            const today = new Date()


            if ( 
                (reservation.playingField.id == idPlayfield && day === dayR && (startHH <= startRH  && endHH >= endRH)) || 
                (queryParams.get('date') == dayjs(today).format("YYYY-MM-DD") && today.getHours() >= startHH ) || 
                (startHH > endHH)
            ){
                return true
            }
            else{ return false}


            
        }) 
        
    };

    
    const values= {
        playingField: { id: parseInt(playfieldId) },
        usuario: {id: userData.id }, 
        startDatetime: startDatetime ,
        endDatetime: endDatetime
    };


return (
    <> 
        {(isLoadingPlayfields)?<Loading/>:
        <FormControl sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            }}>
            

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer 
                    components={['DatePicker', 'TimeField', 'TimeField']}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap:'wrap',
                        justifyContent: 'space-around',
                        alignItems:'center',
                        gap:'20px',
                        }}
                >
                    <DateCalendar
                        disablePast                           
                        label='Fecha'
                        views={['year', 'month', 'day']}
                        value={dayjs(date)}
                        onChange={(newValue) => {setDate(dayjs(newValue).format('YYYY-MM-DD HH:mm:ss'))}}
                        format="DD-MM-YYYY"
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        gap:'20px',
                    }}> 
                    <TimeField
                        sx={{width:'200px', textAlign:'center'}}
                        label="Hora de inicio"
                        value={dayjs(startDatetime)}
                        onChange={(newValue) => setStartDatetime(`${dayjs(date).format('YYYY-MM-DD')} ${dayjs(newValue).format('HH:mm:ss')}`)}
                        format="HH:00"
                    />
                    <TimeField
                        sx={{width:'200px', textAlign:'center'}}
                        label="Hora de finalización"
                        value={dayjs(endDatetime)}
                        onChange={(newValue) => setEndDatetime(`${dayjs(date).format('YYYY-MM-DD')} ${dayjs(newValue).format('HH:mm:ss')}`)}
                        format="HH:00"
                    />
                    <Select
                        sx={{width:'200px', textAlign:'center'}}
                        id="Playfield"
                        value={playfieldId}
                        onChange={(newValue) => setPlayfieldId(newValue.target.value)}
                    >
                    {playfields?.map((playfield) => (
                        <MenuItem 
                            value={isReserved(playfield.id)? '': playfield.id}
                            key={playfield.id}
                            disabled={isReserved(playfield.id)}
                        >
                        {isReserved(playfield.id)? 'Cancha no Disponible': playfield.description}
                        </MenuItem>
                    ))}
                    </Select>  
                    </Box>
                </DemoContainer>
            </LocalizationProvider>

            <ModalConfirm 
                values = {values}
                club = {club}
            />
       
        </FormControl>
        }
     </>
)}

export default FormReservations