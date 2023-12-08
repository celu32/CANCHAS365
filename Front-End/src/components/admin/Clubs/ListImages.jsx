import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



const ListImages = ({ images, setImages }) => {


    const handleDelete =  (name) => {
    setImages(images.filter((image) => image.name !== name));
    }


    return (
        <Box sx={{ width: '400px' }}>
            <Paper >
                <TableContainer component={Paper}> 
                    <Table aria-label="simple table">
                        <TableBody>
                            {images?.map((image) => (
                                <TableRow
                                    key={image.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:'10px' }}
                                >

                                    <TableCell component="th" scope="row" align='center' sx={{height:'10px', padding:'0px', margin:'0px'}}>
                                        {image.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center' sx={{height:'10px', padding:'0px', margin:'0px'}}> 
                                        <IconButton aria-label="Volver" color='#FFFFFF' size="large" onClick={() => handleDelete(image.name)} >
                                            <DeleteIcon fontSize="large" color='#FFFFFF' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
export default ListImages