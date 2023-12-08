/* eslint-disable react-hooks/exhaustive-deps */
import CardProducts from '../products/CardProducts';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import useFetchApi from '../../hooks/useFetchApi';
import { ENDPOINTS } from '../../constants/endpoints';
import { METHODS } from '../../constants/methods';
import dayjs from 'dayjs';
import Loading from '../loading/Loading';
import { useNavigate } from "react-router-dom";


const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filters = {
    city: { id: +queryParams.get('city') },
    category: { id: +queryParams.get('sport') },
    datetime: `${dayjs(queryParams.get('date')).format('YYYY-MM-DDT')}${dayjs(queryParams.get('time')).format('HH:mm:ss[Z]')}`,
    };

  const navigate = useNavigate()

  const { data, isLoading, error } = useFetchApi(ENDPOINTS.CLUB_SEARCH, METHODS.POST, filters);

  return (
    <Container
        maxWidth="xl"
        sx={{
            padding: '30px',
            backgroundColor: '#FFFFFF',
            mx: "auto",
            textAlign: 'center',
        }}
        id="home"
        >
           
            <h1 style={{ 
                    margin: '20px 0', color: '#1F2E7B' 
                }}>RESULTADOS DE TU BÚSQUEDA
            </h1>

            {isLoading && <Loading />}

            {!isLoading && data.length > 0 ? 
            <>  
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '40px',
                    marginY:'40px'
                }}>
                    {data.map((club) => (
                    <CardProducts
                        key={club.id}
                        club={club}
                    />
                ))}
                
                </Box>
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
                    variant="contained" 
                    onClick={()=>{navigate('/')}}>
                NUEVA BÚSQUEDA
                </Button>

            </>

         : (
            <Container
                sx={{
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" sx={{ color: 'red', mt: 2 }}>
                    {isLoading
                    ? ''
                    : 'No se encontraron turnos disponibles para tu búsqueda, por favor inténtalo nuevamente.'}
                </Typography>
               
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
                    variant="contained" onClick={()=>{navigate('/')}}>
                    NUEVA BÚSQUEDA
                </Button>
                
            </Container>
        )}
    </Container>
    );
};

export default SearchResults;
