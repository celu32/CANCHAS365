import { useParams } from "react-router-dom";
import { Box, Button, Container} from "@mui/material";
import Images from "../../components/products/Images";
import useFetchApi from "../../hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/endpoints";
import { METHODS } from '../../constants/methods';
import Characteristic from '../../components/characteristics/Characteristics'
import Loading from "../../components/loading/Loading";
import Availability from "../../components/products/Availability";

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Goback from "../../components/ui/icons/Goback";


const Detail = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const { id } = useParams()

  const { data, isLoading, error } = useFetchApi(`${ENDPOINTS.CLUB}`,METHODS.GET, id)

  
  return (
    <Container  maxWidth="xl"
    sx={{
      mt: "120px",
      mb: "40px",
      color: "#011A5B",
      backgroundColor: "#FFFFFF",
      padding:'0px'
    }}>
    {(isLoading) ? <Loading /> :
    <>
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#1F2E7B",
          backgroundColor: "#FF914D",
          fontSize: "30px",
          fontWeight: "bold",
          paddingLeft: "20px",
          margin: '0px'
        }}
      >
        <h4>{data?.name}</h4>
        <Goback handleClick={handleClick}/>
      </Box>
      <Box
        maxWidth="xs"
        sx={{
          color: "#011A5B",
          backgroundColor: "#FFFFFF",
          textAlign: "left",
          padding: "10px",
          paddingLeft: {sm:"150px", xs:'30px'},
        }}
      >
        <p> Domicilio: {`${data?.address?.street} N° ${data?.address?.number}`}</p>
        <p> Ciudad: {data?.address?.city?.name}</p>
        <p> Provincia: {data?.address?.city?.state?.name}</p>
        <p> Teléfono: {data?.phone_number}</p>
        <Button href={`https://wa.me/${(data?.phone_number)?.replace(/[\s-]/g, '')}`} sx={{position: 'fixed', bottom: '50px', right: '30px', width: '40px', height: '60px', backgroundColor:'#25D366', borderRadius:'100%', boxShadow:'0 0 10px #676463'}} target="_blank">
          <WhatsAppIcon style={{color:"white", fontSize: '30px'}}/>
        </Button>
      </Box>
      <Images images={data.images} idClub={ id } />
      <Characteristic club={data} />
      <Availability idClub={id}/>
    </>
    }
    </Container>
  );
};

export default Detail;
