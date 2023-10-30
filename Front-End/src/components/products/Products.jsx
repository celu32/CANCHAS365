import Container from '@mui/material/Box';
import CardProducts from './CardProducts';
import Box from '@mui/material/Box';
import useFetchApi from '../../hooks/useFetchApi';
import Loading from '../loading/Loading';
import { ENDPOINTS } from '../../constants/endpoints';


const Products = () => {

  const { data, isLoading, error } = useFetchApi(`${ENDPOINTS.CLUB}/list`);

  const imagenes = ["./futbol1.png", "./futbol2.png", "./futbol3.png", "./futbol4.png", "./futbol5.png", "./tenis4.png", "./tenis1.png", "./tenis2.png", "./tenis3.png", "./tenis4.png", "./padel1.jpg", "./padel2.jpg", "./padel3.jpg", "./padel4.jpg", "./padel5.jpg", "./nat1.png", "./nat2.png", "./nat4.jpg", "./nat5.jpg", "./nata3.jpg"
  ]

  return (
    <Container maxWidth="xl"
      sx={{
        color: '#1F2E7B',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        padding: '100px',
      }}
    >
      {
        isLoading ? <Loading />
          :
          <Box sx={{
            margin: '30px',
            backgroundColor: '#FFFFFF',
            color: '#1F2E7B',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>

            {
              data?.map((club) => (
                <CardProducts key={club.id} name={club.name} tel={club.phone_number} url={imagenes[club.id]} city={club.adress.street + " N° " + club.adress.number} id={club.id} />
              ))
            }
          </Box>
      }

    </Container>

  );
}

export default Products;

