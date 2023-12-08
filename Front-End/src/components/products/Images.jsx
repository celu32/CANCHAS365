import { Container, Box} from '@mui/material';
import ImageModal from './ImageModal';
import useFetchApi from '../../hooks/useFetchApi';
import { ENDPOINTS } from '../../constants/endpoints';
import Loading from '../loading/Loading';


const Images = ({images, idClub}) => {

 // const {data, isLoading} = useFetchApi(`${ENDPOINTS.IMAGES}/${id}`);

  const imagesURL = images?.map((image)=> ({id:`${image.id}`, url:`${import.meta.env.VITE_BACKEND_API}image/${idClub}/download/${image.id}`}))

  const imagenPrinc = imagesURL? imagesURL.slice(0,1) : []

  const imagenes = imagesURL? imagesURL.slice(1,5) : []


  return (

    <>
      <Container maxWidth="xl"
        sx={{
          mx: 'auto',
          marginY:'0px',
          backgroundColor: '#FFFFFF',
          display:'flex',
          padding: {sm:'50px', xs:'0px'},
          gap:'0px',
          justifyContent:'center',
          alignItems:'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{
          width: {sm:'400px', xs:'300px'}, height: {sm:'400px', xs:'300px'}
        }} >
          <img src={imagenPrinc[0]?.url} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%'} } />
        </Box>

          <Box  
            sx={{
              height: {sm:'400px', xs:'300px'}, 
            width: {sm:'400px', xs:'300px'},
            display:'flex',
            flexWrap: 'wrap',
            
          }}>
              {imagenes?.map((image) => (
                 <img key={image.id} src={image.url} alt="" style={{ objectFit: 'cover', width: '50%', height: '50%'}} />
              ))}
          </Box>
      </Container>
      <ImageModal images={imagesURL} />
    </>

  );
}

export default Images;