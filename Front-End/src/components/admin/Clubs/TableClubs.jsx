import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetchApi from '../../../hooks/useFetchApi';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import Loading from '../../loading/Loading';
import {ENDPOINTS} from '../../../constants/endpoints'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {METHODS}  from '../../../constants/methods'
import useFetchDataApi from '../../../hooks/useFetchDataApi'



const TableAdmin = ({ handleUpdate }) => {
    
    const { data, isLoading, error} = useFetchApi(`${ENDPOINTS.CLUB}`);

    const { data: deleteData, isLoading: deleteIsloading, error: deleteError, fetchData } = useFetchDataApi();

    const navigate = useNavigate();

    const [clubs, setClubs] = useState([])

    useEffect(() => {
        if (data) {
            setClubs(data)
        }
    }, [data]);

    const modificar = (club, action) => {
        handleUpdate(1, club, action)
    }

    const handleDelete =  (id) => {
    
        Swal.fire({
            title: 'Estás seguro que querés confirmar la acción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
        
            if (result.isConfirmed) {
                await fetchData(ENDPOINTS.CLUB, METHODS.DELETE, id)
                if (deleteError) {
                    console.error('Error al eliminar el club:', error)
                    Swal.fire({
                        title: 'Error al eliminar el Club',
                        icon: 'error',
                      });
                } 
                else {
                    console.log('Club eliminado con éxito');
                    Swal.fire({
                        title: 'Club eliminado con éxito',
                        icon: 'success',
                      });
                    setClubs(clubs.filter((club) => club.id !== id));
                }
            }      
        })
    }
   

    const handleView = (id) => navigate(`/admin/club/${id}`);

    return (
        <Box sx={{ width: "100%" }}>
            {
                isLoading || deleteIsloading ? <Loading /> :
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer component={Paper}>
                            {clubs &&
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Id</TableCell>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Deporte</TableCell>
                                            <TableCell align='center'>Domicilio</TableCell>
                                            <TableCell align='center'>Recomendado</TableCell>
                                            <TableCell align='center'>Características</TableCell>
                                            <TableCell align='center'>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {clubs?.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.category.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    <p> {row.address.street + " N° " + row.address.number}</p>
                                                    <p>{row.address.city.name }</p>
                                                    <p> {row.phone_number}</p>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.recommended ? "Si" : "No"}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.characteristics.map((char)=>(<p key={char.id}> {char.name} </p>))}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center' width={'120px'} >
                                                    <Button sx={{display: 'inline-block', margin:'10px', width:'200px'}} variant="outlined" startIcon={<SendIcon />} onClick={() => handleView(row.id)}>Canchas</Button>
                                                    <Button sx={{display: 'inline-block', margin:'10px', width:'200px'}} variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>Eliminar</Button>
                                                    <Button sx={{display: 'inline-block', margin:'10px', width:'200px'}} variant="outlined" startIcon={<EditIcon />} onClick={() => modificar(row,'MODIFICAR CLUB')}>Modificar</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            }
                        </TableContainer>
                    </Paper>
            }
        </Box>
    );
}
export default TableAdmin