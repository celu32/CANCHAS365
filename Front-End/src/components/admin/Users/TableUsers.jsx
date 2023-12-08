import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetchApi from '../../../hooks/useFetchApi';
import { Box } from '@mui/material';
import Loading from '../../loading/Loading';
import { ENDPOINTS } from '../../../constants/endpoints'
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { METHODS } from '../../../constants/methods';
import useFetchDataApi from '../../../hooks/useFetchDataApi';




const TableUsers = () => {

    const { data, isLoading, error } = useFetchApi(`${ENDPOINTS.USER}`);

    const { data: updateUser, isLoading: updateUserIsLoading, error: updateUserError, fetchData } = useFetchDataApi();

    const [users, setUsers] = useState([]);



    useEffect(() => {
        if (data) {
            setUsers(data)
        }
        if (updateUser) {
            setUsers(
                data.map(user => user.id === updateUser.id ? { ...user, ...updateUser } : user)
            )
        }

    }, [data, updateUser]);


    const [checked, setChecked] = useState(false);

    const handleChange = (id) => async (event) => {
        setChecked(event.target.checked)
        await fetchData(`${ENDPOINTS.USER}/${id}/update-roles?id=${id}`, METHODS.PUT)
    };


    return (
        <Box sx={{ width: "100%" }}>
            {
                (isLoading || updateUserIsLoading) ? <Loading /> :
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer component={Paper}>
                            {users &&
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Id</TableCell>
                                            <TableCell align='center'>UserName</TableCell>
                                            <TableCell align="center">Nombre</TableCell>
                                            <TableCell align="center">Apellido</TableCell>
                                            <TableCell align='center'>Roles</TableCell>
                                            <TableCell align='center'>Administrador</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users?.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.username}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.lastname}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {row.rol?.map((rol) => (
                                                        <p key={rol.id}> {rol.name} </p>
                                                    ))
                                                    }
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    <Switch
                                                        checked={row.isAdmin}
                                                        onChange={handleChange(row.id)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />

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
export default TableUsers