import { Button, Container } from "@mui/material"
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from 'dayjs';


const TableAvailability = (props) => {

    const navigate = useNavigate()
    
    const {playingfields, reservations, date, idClub} = props
 
    const isReserved = (playingFieldId, hour) => {

        if (reservations.length === 0) {
            const today = new Date();
            return date === dayjs(today).format("YYYY-MM-DD") && today.getHours() >= hour;
        }

        return reservations.some((reservation) => {
            const startHour = new Date(reservation.startDatetime).getHours();
            const endHour = new Date(reservation.endDatetime).getHours();
            const today = new Date()
            

                if(
                    (reservation.playingField.id === playingFieldId && (hour >= startHour && hour < endHour)) ||  
                    (date == dayjs(today).format("YYYY-MM-DD") && today.getHours() >= hour )
                ) {return true}

                else{ return false}
                
            
        });
    };

    const handleClick = (idClub, idPlayingfield, date, time ) => {

        if (!localStorage.getItem("user")) {
            Swal.fire({
              title: "Para realizar una reserva por favor iniciá sesión",
              icon: "error",
            }).then(() => {
                navigate('/signin', { state: { fromReserveButton: true } });
            });
          } else {
              const queryParams = `idClub=${encodeURIComponent(idClub)}&idPlayingfield=${encodeURIComponent(idPlayingfield)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}:00:00`;
              navigate(`/reservations?${queryParams}`); 
          }

    }

    return(
        <Container sx={{ 
            margin:'0px', 
            backgroundColor: '#FFFFFF',
            color:'#011A5B',
            textAlign:'left',
            padding:'0px'
            }}> 
                <Paper sx={{ mb: 2, padding: '0px', overflowX: 'auto', maxWidth:'100%' }}>
                    <TableContainer component={Paper} sx={{padding:'0px'}}>
                        <Table sx={{
                                backgroundColor:'#FFFFFF',
                                padding:'0px',
                                color:'#011A5B'}} 
                                aria-label="simple table"
                                >
                            <TableHead>
                                <TableRow>                 
                                    <TableCell/>
                                    {[...Array(14)].map((_, index) => (
                                                <TableCell 
                                                    key={index}
                                                    sx={{position: 'relative',
                                                        right:'35px'}}
                                                >{`${index + 10}:00`}</TableCell>
                                                ))}
                                         
                                </TableRow>
                            </TableHead>
                                    <TableBody>
                                        {playingfields?.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.description}
                                                </TableCell>
                                                {[...Array(13)].map((_, index) => (
                                                <TableCell 
                                                    key={index} 
                                                    sx={{padding:'0px',
                                                        margin:'0px', 
                                                    }}
                                                    >
                                                    <Button 
                                                        sx={{
                                                            height: '30px',
                                                            backgroundColor: isReserved(row.id, index + 10)
                                                                ? '#D94D46' //rojo
                                                                : '#EDEBEE', //verde #48A65D
                                                            ":hover": {
                                                                backgroundColor: isReserved(row.id, index + 10) ? '#D94D46' : '#48A65D'
                                                            }
                                                        }}
                                                        title={isReserved(row.id, index + 10) ? "Turno no disponible" : "Reservar Turno"}
                                                        disabled={isReserved(row.id, index + 10)}
                                                        onClick={(e)=>handleClick(idClub, row.id, date, index + 10)}
                                                    />
                                                </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                    </TableContainer>
                </Paper>
                <Box sx={{
                        display:'flex',
                        flexWrap:'wrap',
                        flexDirection: { sm: 'row', xs: 'column' },
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'10px'
                        }}>
                    <p> <span style={{ backgroundColor: '#EDEBEE', color: '#EDEBEE', margin:'5px', fontSize:'15px', borderRadius:'2px' }}> ___ </span> Turnos Disponibles</p>
                    <p> <span style={{ backgroundColor: '#D94D46', color: '#D94D46', margin:'5px', fontSize:'15px', borderRadius:'2px' }}> ___ </span> Turnos No Disponibles</p>
                    <p> <span style={{ backgroundColor: '#48A65D', color: '#48A65D', margin:'5px', fontSize:'15px', borderRadius:'2px' }}> ___ </span> Reservar</p> 
                </Box>
                                                   
            
        </Container>
        


    )
}

export default TableAvailability