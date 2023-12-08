import { useState, useEffect } from 'react';
import Container from '@mui/material/Box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from '../../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../selectinput/SelectInput';
import { ENDPOINTS } from '../../../constants/endpoints';
import useFetchApi from '../../../hooks/useFetchApi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';

const SearchBar = () => {
  const navigate = useNavigate();
  const { data: categories } = useFetchApi(`${ENDPOINTS.CATEGORY}`);
  const { data: cities } = useFetchApi(`${ENDPOINTS.CITY}`);
  const today = new Date();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const { values, handleChange } = useForm({
    city: '',
    sport: '',
    date: '',
    time: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleFieldChange = () => {
    const areAllFieldsFilled = Object.values(values).every((value) => (value !== '' && value !== null ));
    setIsButtonDisabled(!areAllFieldsFilled);
    return areAllFieldsFilled;
  };
  
  useEffect(() => {
    handleFieldChange();
  }, [values]);

  const shouldDisableTime = (selectedTime) => {

    const d = `${dayjs(date).format('YYYY-MM-DD')}`
    const t = dayjs(selectedTime).format('HH')
    
    if ( (d == `${dayjs(today).format('YYYY-MM-DD')}`) && `${dayjs(today).format('HH')}` >= t ) {
      setIsButtonDisabled(true)
      return true
    }
    else{
      
       return false}

  };

  useEffect(() => {
    shouldDisableTime(time);
  }, [date, time]);


  const handleClick = () => {
    const queryParams = `city=${encodeURIComponent(values.city.id)}&sport=${encodeURIComponent(values.sport.id)}&date=${encodeURIComponent(values.date)}&time=${encodeURIComponent(values.time)}`;
    navigate(`/club/search?${queryParams}`);
  };

  console.log(values)

  return (
    <Container
      sx={{
        color: '#1F2E7B',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        paddingBottom:'100px',
      }}
    >
      <h2>Buscá un turno para tu cancha</h2>

      <Box sx={{
        color: '#1F2E7B',
        display: 'flex',
        backgroundColor: '#FFFFFF',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '20px'
      }}>
      <SelectInput handleChange={handleChange} options={cities} name="city" />
      <SelectInput handleChange={handleChange} options={categories} name="sport" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Ingresá un día"
            sx={{ width: 200, textAlign:'center' }}
            value={date}
            format="DD-MM-YYYY"
            onChange={(selectedDate) => {
              setDate(selectedDate)
              handleChange({name: 'date', value:`${dayjs(selectedDate).format('YYYY-MM-DD')}` })
            }}
            disablePast
          />
        </DemoContainer>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimeField']}>
          <TimeField
            error={false}
            label="Ingresá una hora"
            sx={{ width: 200, textAlign:'center' }}
            format="HH:00"
            value = {dayjs(time)}
            shouldDisableTime = {shouldDisableTime}
            onChange={(selectedTime) => {
              setTime(selectedTime)      
              handleChange({ name: 'time', value:`${dayjs(selectedTime).format('YYYY-MM-DD HH:00')}`}) 
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      </Box>
      <Button sx={{
            padding: '10px',
            backgroundColor:'#1F2E7B',
            border:'solid 3px #FF914D',
            color:'#ffffff',
            ':hover': {
              backgroundColor:'#EDEBEE',
              color: '#1F2E7B'
            },
            ':disabled': {
              backgroundColor:'#EDEBEE',
              color: '#1F2E7B'
            }  
          }} 
          variant="contained" onClick={handleClick} type='submit' disabled={isButtonDisabled}>
        Buscar Turno
      </Button>
    </Container>
  );
};

export default SearchBar;
