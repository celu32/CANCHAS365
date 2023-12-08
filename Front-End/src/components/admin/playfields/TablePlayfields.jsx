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
import Swal from 'sweetalert2';
import Loading from '../../loading/Loading';
import { ENDPOINTS } from '../../../constants/endpoints';
import { useState, useEffect } from 'react';
import {METHODS}  from '../../../constants/methods'
import EditIcon from '@mui/icons-material/Edit';
import useFetchDataApi from '../../../hooks/useFetchDataApi'


const TablePlayfields = ({idClub, handleUpdate}) => {

    const { data, isLoading, error} = useFetchApi(`${ENDPOINTS.PLAYINGFIELD}/club/${idClub}`);

    const { data: deleteData, isLoading: deleteIsloading, error: deleteError, fetchData } = useFetchDataApi();

    const [canchas, setCanchas] = useState([])

    useEffect(() => {
        if (data) {
            setCanchas(data)
        }
    }, [data]);

    
    const handleDelete = (id) => {

        Swal.fire({
            title: '¿Estás seguro que querés confirmar la acción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (result.isConfirmed) {
                await fetchData(ENDPOINTS.PLAYINGFIELD, METHODS.DELETE, id)
    
                    if (deleteError) {
                        console.error('Error al eliminar la cancha:', error);
                        Swal.fire({
                            title: 'Error al eliminar la Cancha',
                            icon: 'error',
                          });
                       
                       
                    
                    } else { 
                        console.log('Cancha eliminada con éxito');
                        Swal.fire({
                            title: 'Cancha eliminada con éxito',
                            icon: 'success',
                        });
                        setCanchas(canchas.filter((cancha) => cancha.id !== id));
                    }
     
                
            }
        })
    }
   

    return (
        <Box sx={{ width: "100%" }}>
            {
               (isLoading || deleteIsloading) ? <Loading /> :
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer component={Paper}>
                            {canchas &&
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Id</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">Deporte</TableCell>
                                            <TableCell align='center'>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {canchas.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.category.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center' sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>Eliminar</Button>
                                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdate(1,row, 'MODIFICAR CANCHA')}>Modificar</Button>
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
export default TablePlayfields