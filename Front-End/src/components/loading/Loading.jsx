import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ 
            display: 'flex', 
            backgroundColor:'#FFFFFF',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            color: '#011A5B',
            width:'100%', 
            zIndex:'10' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;