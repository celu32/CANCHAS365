import { Container, Box } from '@mui/material'
import Calendar from '../datepicker/Calendar'
import { useState } from 'react'
import Loading from '../loading/Loading'
import TableAvailability from '../products/TableAvailability'
import useFetchApi from '../../hooks/useFetchApi'
import { ENDPOINTS } from '../../constants/endpoints'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import dayjs from 'dayjs';
import useAvailability from '../../hooks/useAvailability'
import Politics from "../../components/politics/Politics";



  function CustomTabPanel(props) {
        const { children, value, index, ...other } = props
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        )
    }


    const Availability = (props) => {
        
        const { idClub } = props;
        const today = dayjs(new Date());
        const [startDate, setStartdate] = useState(today);
        const [endDate, setEnddate] = useState(today);
        const { data: playingfields, isLoading } = useFetchApi(`${ENDPOINTS.PLAYINGFIELD}/club/${idClub}`);
        const { reservations, period, showMessage } = useAvailability(idClub, startDate, endDate);
        const [value, setValue] = useState(0);
    
        const handleChange = (event, newValue) => {
            setValue(newValue);
        };
    
        const message = "En este momento no es posible mostrar la disponibilidad. Por favor verificá que la fecha Desde no sea superior a la fecha hasta. En caso que las fechas sean correctas, por favor intentá nuevamente más tarde.";
    
        return (
            <>
                {(isLoading) ? (
                    <Loading />
                ) : (
                    <Container
                        maxWidth="xl"
                        sx={{
                            paddingX:'auto',
                            color: "#1F2E7B",
                            backgroundColor: "#FFFFFF",
                            textAlign:'center',
                        }}
                    >
                        <h2>Consultar Disponibilidad</h2>
                        <Box
                            sx={{
                                padding:'20px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '30px',
                                alignItems:'center',
                                justifyContent: 'space-evenly',
                                color: "#011A5B",
                                backgroundColor: "#FFFFFF",
                            }}
                        >
                            <Calendar label={'Fecha desde'} day={today} setStartdate={setStartdate} type={'start'} />
                            <Calendar label={'Fecha hasta'} day={today} setEnddate={setEnddate} type={'end'} />
                        </Box>
    
                        {showMessage ? (
                            <h3>{message}</h3>
                        ) : (
                            <Box
                                maxWidth="xxl"
                                sx={{
                                    backgroundColor: '#FFFFFF',
                                    color: '#1F2E7B',
                                    textAlign: 'center',
                                    mt: '40px',
                                    padding: '20px'
                                }}
                            >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        {period.map((date, index) => (
                                            <Tab key={index} label={(date.toString()).slice(0, 16)} />
                                        ))}
                                    </Tabs>
                                </Box>
                                {period.map((date, index) => (
                                    <CustomTabPanel key={index} value={value} index={index}>
                                        <TableAvailability
                                            date={dayjs(date).format("YYYY-MM-DD")}
                                            playingfields={playingfields}
                                            idClub={idClub}
                                            reservations={(reservations && reservations.length > 0)
                                                ? reservations.filter((reservation) => {
                                                    return reservation && reservation.startDatetime && dayjs(reservation.startDatetime).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD");
                                                })
                                                : []
                                            }
                                        />
                                    </CustomTabPanel>
                                ))}
                            </Box>
                        )}
                        <Politics/>
                    </Container>
                )}
            </>
        );
    };
    
    export default Availability;