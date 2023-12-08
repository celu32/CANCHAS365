import Typography from '@mui/material/Typography';
import { ENDPOINTS } from '../../constants/endpoints';
import useFetchApi from '../../hooks/useFetchApi';



const TitleClub = ({id}) =>{

    const { data, isLoading, error } = useFetchApi(`${ENDPOINTS.CLUB}/${id}`)


    return(
        <Typography variant="h3" component="h3" 
        sx={{
            height:'30px', 
            padding:'10px',
            margin:'auto',
            fontSize:'16px',
            fontWeight:'bold',
            color: '#1F2E7B',
        }}>
            {data? data.name : ''}
        </Typography>
    )

}

export default TitleClub