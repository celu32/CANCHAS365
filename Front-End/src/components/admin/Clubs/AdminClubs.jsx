import { useState } from "react";
import { Container, Box } from "@mui/material";
import FormClubs from "./FormClubs";
import TableClubs from "./TableClubs";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

const AdminClubs = () => {

    const [value, setValue] = useState(0);

    const [club, setClub] = useState({});

    const [action, setAction] = useState('AGREGAR CLUB');

    const handleChange = (event, newValue ) => {
        setValue(newValue);
    };

    const handleUpdate = (newValue, club, action) => {
        setClub (club)
        setAction(action)
        setValue(newValue);
    };

    return (
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
                    padding: '20px'
                }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Listado de Clubes" />
                        <Tab label={action} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TableClubs handleUpdate={handleUpdate}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <FormClubs action={action} club={club} handleUpdate={handleUpdate} />
                </CustomTabPanel>
               
            </Container>

    )
}

export default AdminClubs;