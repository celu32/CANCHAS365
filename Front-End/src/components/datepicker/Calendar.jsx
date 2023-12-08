import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';





const Calendar = (props) => { 

    const { label, day, setStartdate, setEnddate} = props;

    const [date, setDate] = useState(day);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              disablePast                           
              label={label}
              views={['year', 'month', 'day']}
              defaultValue={day}
              sx={{ width:{sm:300, xs:200}  }}
              value={date}
              format="DD-MM-YYYY"
              onChange={(selectedDate) => {
                // Utiliza la función de devolución de llamada de setDate para asegurarte de que estás utilizando el valor más reciente
                setDate((prevDate) => {
                  // Actualiza el estado con el nuevo valor
                  const newDate = selectedDate || day; // Si selectedDate es nulo, utiliza el valor original de day
                  label === 'Fecha desde' ? setStartdate(dayjs(newDate)) : setEnddate(dayjs(newDate));
                  return newDate;
                });
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
    );
}

export default Calendar