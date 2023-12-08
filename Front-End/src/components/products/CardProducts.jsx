import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/endpoints";
import FavoriteButton from "../favs/FavoriteButton";

const CardProducts = ({ club }) => {
  
  const navigate = useNavigate();

  const handleClick = () => navigate(`/${ENDPOINTS.CLUB}/${club.id}`);

  const imagesURL = club.images.map((image) => ({
    id: `${image.id}`,
    url: `${import.meta.env.VITE_BACKEND_API}image/${club.id}/download/${image.id}`,
  }));

  const imagenPrinc = imagesURL[0]

  return (
    <Card
      sx={{
        width: 250,
        height: 360,
        marginBottom:{sm:'50px', xs:'20px'},
        border: "solid 1px #FFFFFF",
        backgroundColor: "#EDEBEE",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        borderRadius:'5%',
        boxShadow: "0px 3px 3px grey",
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height={160}
          image={imagenPrinc.url}
        />
       
        <CardContent
          sx={{
            border: "none",
            color: "#1F2E7B",
            padding: "10px",
          }}
        > 
         <Box sx={{
          padding:'5px',
          gap:'10px',
          alignItems:'center',
          fontWeight:'bold',
          width:'100%',
          height:'35px',
          }}> 
          <img src={club.category.url} alt={club.category.title} width={'25px'} />
          <span> {club.category.title} </span>
        </Box>
        <Typography
          variant="p"
          component="p"
          sx={{
            height: "10px",
            padding: "10px",
            marginX: "auto",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1F2E7B",
          }}
        >
          {club.name}
        </Typography>
          <Typography variant="p" component="p">
            {`${club.address.street} N° ${club.address.number}`}
          </Typography>
          <Typography variant="p" component="p">
            {club.address.city.name}
          </Typography>
          <Typography variant="p" component="p">
            {club.phone_number}
          </Typography>
        </CardContent>
      </CardActionArea>

      <FavoriteButton
        sx={{
          padding: "10px",
        }}
        clubId={club.id}
      />
    </Card>
  );
};

export default CardProducts;
