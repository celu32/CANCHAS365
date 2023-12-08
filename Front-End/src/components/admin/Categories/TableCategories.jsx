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
import {ENDPOINTS} from '../../../constants/endpoints'
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import useFetchDataApi from '../../../hooks/useFetchDataApi'
import { METHODS } from '../../../constants/methods';




const TableCategory = ({ handleUpdate }) => {
    
    const { data, isLoading, error} = useFetchApi(`${ENDPOINTS.CATEGORY}`);

    const { data: deleteData, isLoading: deleteIsloading, error: deleteError, fetchData } = useFetchDataApi();

    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (data) {
            setCategories(data)
        }
    }, [data]);

    const modificar = (category, action) => {
        handleUpdate(1, category, action)
    }

    const handleDelete =  (id, title) => {
    
        Swal.fire({
            title: `Estás por eliminar la categoría ${title}.`, 
            icon: 'warning',
            text: 'En caso que la misma esté siendo utilizada, se eliminarán todos los clubes que la tengan asignada. ¿Estás seguro de confirmar la  siguiente acción?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
        
            if (result.isConfirmed) {
                await fetchData(ENDPOINTS.CATEGORY, METHODS.DELETE, id)
                if (deleteError) {
                    console.error('Error al eliminar la categoría:', error)
                    Swal.fire({
                        title: 'Error al eliminar la categoría',
                        icon: 'error',
                      });
                } 
                else {
                    console.log('Categoría eliminada con éxito');
                    Swal.fire({
                        title: 'Categoría eliminada con éxito',
                        icon: 'success',
                      });
                    setCategories(categories.filter((club) => club.id !== id));
                }
            }      
        })
    }


   

    return (
        <Box sx={{ width: "100%" }}>  
            {
                isLoading || deleteIsloading ? <Loading /> :
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer component={Paper}>
                            {categories &&
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Id</TableCell>
                                            <TableCell align="center">Título</TableCell>
                                            <TableCell align="center">Descripcion</TableCell>
                                            <TableCell align='center'>ImagenUrl</TableCell>
                                            <TableCell align='center'>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categories?.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.title}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.url}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center' sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id, row.title)}>Eliminar</Button>
                                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => modificar(row,'MODIFICAR CATEGORÍA')}>Modificar</Button>
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
export default TableCategory