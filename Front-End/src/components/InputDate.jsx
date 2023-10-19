import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const today = new Date()
const inicialDay = (today.getFullYear() + '-'+ today.getMonth + '-'+ today.getDay)

export default function InputDate() {
    const [date, setDate] = React.useState(dayjs(inicialDay));

  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Elige un día"
              sx={{ width: 200 }}
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </DemoContainer>
      </LocalizationProvider>
    );
  }

