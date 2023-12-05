import { useParams } from "react-router-dom";
import { Box, Button, Container, IconButton} from "@mui/material";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import Images from "../../components/products/Images";
import useFetchApi from "../../hooks/useFetchApi";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/endpoints";
import { METHODS } from '../../constants/methods';
import Characteristic from '../../components/characteristics/Characteristics'
import Loading from "../../components/loading/Loading";
import Availability from "../../components/products/Availability";
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const Detail = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const { id } = useParams();

  const { data, isLoading, error } = useFetchApi(`${ENDPOINTS.CLUB}`,METHODS.GET, id);

  return (
    <> 
    {(isLoading) ? <Loading /> :
    <Container
     maxWidth="xl"
      sx={{
        mt: "120px",
        mb: "40px",
        color: "#011A5B",
        backgroundColor: "#FFFFFF",
      }}
    >
    
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#FFFFFF",
          backgroundColor: "#FF914D",
          fontSize: "30px",
          fontWeight: "bold",
          paddingLeft: "20px",
          margin: '0px'
        }}
      >
        <h4>{data?.name}</h4>
        <IconButton
          aria-label="Volver"
          color="#FFFFFF"
          size="large"
          onClick={handleClick}
        >
          <ArrowCircleLeftTwoToneIcon fontSize="large" color="#FFFFFF" />
        </IconButton>
      </Box>
      <Box
        maxWidth="xs"
        sx={{
          color: "#011A5B",
          backgroundColor: "#FFFFFF",
          textAlign: "left",
          padding: "10px",
          paddingLeft: "150px",
        }}
      >
        <p>
          {" "}
          Domicilio: {`${data?.address?.street} N° ${data?.address?.number}`}
        </p>
        <p> Ciudad: {data?.address?.city?.name}</p>
        <p> Provincia: {data?.address?.city?.state?.name}</p>
        <p> Teléfono: {data?.phone_number}</p>
        <Button href={`https://wa.me/${(data?.phone_number)?.replace(/[\s-]/g, '')}`} sx={{position: 'fixed', bottom: '50px', right: '20px', width: '100px', height: '100px', backgroundColor:'#075e54'}} target="_blank">
          <WhatsAppIcon style={{color:"#25D366", fontSize: '48px'}}/>
        </Button>
      </Box>
        
      <Images id={id} />
      <Characteristic club={data} />
      <Availability idClub={id}/>
    </Container>
      }
    </>
  );
};

export default Detail;
