import { useState } from "react";
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TitleClub from '../../components/products/TitleClub'
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import { Box, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePlayfields from "../../components/admin/playfields/TablePlayfields"
import FormPlayfields from "../../components/admin/playfields/FormPlayfields";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

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

const Playfields = () => {

    const[playfield, setPlayfield] = useState({});

    const [action, setAction] = useState('AGREGAR CANCHA');

    const {id} = useParams();

    const [value, setValue] = useState(0);
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/admin');
      };

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const handleUpdate = (newValue, playfield, action) => {

        setValue(newValue)
        setPlayfield(playfield)
        setAction(action)
    }

    return (
        <>
            <Container maxWidth="xxl"
                sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#1F2E7B',
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'column',
                    direction: 'row',
                    textAlign: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                    mt: '150px',
                    padding: '40px'
                }}>

                <IconButton aria-label="Volver" color='#FFFFFF' size="large" onClick={handleClick} sx={{position:'absolute', right:'10px', top:'100px', display:'block'}} >
                    <ArrowCircleLeftTwoToneIcon fontSize="large" color='#FFFFFF' />
                </IconButton>
            
                <TitleClub id ={id}/>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Listado de Canchas" />
                        <Tab label={action} />
                    </Tabs>
                </Box>
                
                <CustomTabPanel value={value} index={0}>
                    <TablePlayfields idClub={id} handleUpdate={handleUpdate}  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <FormPlayfields idClub={id} action={action} playfield={playfield} handleUpdate={handleUpdate} />
                </CustomTabPanel>

            </Container>
            <Box
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    color: 'red',
                    padding: '30px',
                    textAlign: 'center',
                    fontSize: '15px',
                    marginY: '150px'
                }}
            >
                <p>Página no disponible desde el tipo de dispositivo desde el que desea acceder</p>
            </Box>

        </>
    )
}

export default Playfields
