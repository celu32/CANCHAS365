import Carousel from 'react-material-ui-carousel'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useFetchApi from '../../hooks/useFetchApi';
import { ENDPOINTS } from '../../constants/endpoints';
import Loading from '../loading/Loading';
import TitleClub from '../products/TitleClub';
import ImagesCarousel from './ImagesCarousel';
import { Typography } from '@mui/material';

const Recomendations = () => {

  const navigate = useNavigate();

  const handleClick = (id) => navigate(`/${ENDPOINTS.CLUB}/${id.toString()}`)

  const { data, isLoading, error } = useFetchApi(ENDPOINTS.RECOMMENDED);

  return (
    <> 
    {isLoading ? <Loading /> :
    <Container maxWidth="xl"
      sx={{
        mx: 'auto',
        pb: '30px',
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        color: '#1F2E7B',
      }}>
      <h2>Nuestras recomendaciones</h2>

      
          <Carousel animation='slide' duration={800} navButtonsAlwaysVisible fullHeightHover>
            {
              data && data.map((club, index) => (
                <div key={club.id}>
                  <Button onClick={() => handleClick(club.id)}>
                    <TitleClub id ={club.id} />
                  </Button>
                    <ImagesCarousel images ={club.images} idClub ={club.id}/>
                </div>
              ))
            }
          </Carousel>
      
    </Container>
    }
    </>
  )
}
export default Recomendations
