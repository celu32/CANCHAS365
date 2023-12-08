import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import useFetchDataApi from '../../hooks/useFetchDataApi';
import { METHODS } from '../../constants/methods';
import { ENDPOINTS } from '../../constants/endpoints';
import Swal from 'sweetalert2';
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../../auth/context";
import Loading from '../loading/Loading'
import { Box } from '@mui/material';
import dayjs from "dayjs";
import useFetchApi from '../../hooks/useFetchApi';



const ModalConfirm = ({values, club}) => {

    const { userData } = AuthContext();

    const navigate = useNavigate();
    
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isOpen, setIsOpen] = useState(false);

    const {fetchData, isLoading, error} = useFetchDataApi()

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const { data: playingField } = useFetchApi(`${ENDPOINTS.PLAYINGFIELD}`, METHODS.GET, values.playingField.id)

    const confirm = async() => {

       await fetchData(ENDPOINTS.RESERVATION, METHODS.POST, values)

        if (error){
            
            Swal.fire({
                title: error,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
               console.log(error)
            }
            )
        }
        else{
            Swal.fire({
                title: "Reserva agregada con éxito",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Confirmar',
            }).then(() => {
               console.log("Reserva agregada con éxito")
            }).then(
                navigate(`/club/${club.id}`)
            )
        } 

    }
    

    return(
        <> 
        { (isLoading)? <Loading/> :
        <React.Fragment>
            <Button 
                variant="contained" 
                onClick={handleClick} 
                type='submit'
                sx={{
                    padding: '10px',
                    backgroundColor:'#1F2E7B',
                    border:'solid 3px #FF914D',
                    margin:'10px',
                    color:'#ffffff',
                    ':hover': {
                      backgroundColor:'#EDEBEE',
                      color: '#1F2E7B'
                    } 
                  }}
            >
                Reservar
            </Button>
            
            <Dialog
                open={isOpen}
                onClose={handleClick}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"
                    sx={{
                        color: '#011A5B',
                        backgroundColor:'#FF914D',
                        textAlign: 'center',
                        fontWeight:'bold',
                    }}>
                   Confirmación de Reserva 
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{
                        color: '#011A5B',
                        textAlign: 'left',
                        margin:'0px',
                        padding:'0px',
                        fontSize:'16px'

                    }} >
                        <Box sx={{
                            fontSize:'20px',
                            textAlign: 'center',
                            margin:'0px',
                            padding:'20px',
                            display:'flex',
                            flexDirection: 'column',
                            border: 'solid 1px #EDEBEE'
                            }} > 
                            <h5>{`${userData.name} ${userData.lastname}`}</h5>
                            <span>{`${userData.username}`}</span>
                        </Box>
                        <Box sx={{
                            fontSize:'20px',
                            textAlign: 'center',
                            margin:'0px',
                            padding:'20px',
                            display:'flex',
                            flexDirection: 'column',
                            border: 'solid 1px #EDEBEE'
                            }} >
                            <span> {`Día ${dayjs(values.startDatetime).format('DD/MM/YYYY')} `} </span> 
                            <span> {`Hora de inicio ${dayjs(values.startDatetime).format('HH:mm')} Hs. `}</span>
                            <span> {`Hora de finalización ${dayjs(values.endDatetime).format('HH:mm')} Hs. `}</span>
                        </Box>
                        

                        <Box sx={{
                            fontSize:'16px',
                            textAlign: 'center',
                            margin:'0px',
                            padding:'20px',
                            display:'flex',
                            flexDirection: 'column',
                            border: 'solid 1px #EDEBEE'
                            }} > 
        
                            <h3> {club.name} </h3>
                            <span> {club.address?.street} N° {club.address?.number} </span>
                            <span> {club.address?.city?.name} </span>
                           {/* <span> {playingField?.description} </span> */}
                        </Box>

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                        color: '#011A5B',
                        textAlign: 'center',
                        fontWeight:'bold',
                        display:'flex',
                        flexWrap:'wrap',
                        justifyContent:'space-around',
                        margin:'20px'
                    }}  >
                    <Button sx={{
                    padding: '10px',
                    backgroundColor:'#1F2E7B',
                    border:'solid 3px #FF914D',
                    color:'#ffffff',
                    ':hover': {
                      backgroundColor:'#EDEBEE',
                      color: '#1F2E7B'
                    } 
                  }} autoFocus onClick={handleClick} variant="contained" >
                        Cancelar
                    </Button>
                    <Button sx={{
                    padding: '10px',
                    backgroundColor:'#1F2E7B',
                    border:'solid 3px #FF914D',
                    color:'#ffffff',
                    ':hover': {
                      backgroundColor:'#EDEBEE',
                      color: '#1F2E7B'
                    } 
                    }}
                    onClick={confirm} autoFocus variant="contained" >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            
        </React.Fragment>
        }
        </>
    )
}

export default ModalConfirm