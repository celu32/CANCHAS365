import { Container, Box } from '@mui/material'
import useFetchApi from '../../hooks/useFetchApi';
import { ENDPOINTS } from '../../constants/endpoints';
import Loading from '../loading/Loading';


const ImagesCarousel = ({images, idClub}) =>{


    const imagesURL = images.map((image)=> ({id:`${image.id}`, url:`${import.meta.env.VITE_BACKEND_API}image/${idClub}/download/${image.id}`}))

    const newData = imagesURL.slice(0,4) 

    return(

        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: 800,
            backgroundColor:'#FFFFFF'

          }}>
          {
            newData?.map((image) => (
              <Box
                component="img"
                key={image.id}
                sx={{
                  maxWidth: 230,
                  maxHeight: 130,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={image.url}
              />
            ))
          }
        </Container>
    )
   
} 

export default ImagesCarousel