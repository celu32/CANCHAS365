import { Container, Paper, Typography, Box } from "@mui/material";
import { AuthContext } from "../../auth/context";
import Favorites from "../../components/favs/Favorites";
import Goback from "../../components/ui/icons/Goback";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { userData } = AuthContext();

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/");
  };

  return (

    <Container
    maxWidth="xl"
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#1F2E7B",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: "10px",
        marginTop:'120px',
        marginBottom:'40px'
      }}
    >
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
        <h4>Hola {userData.name}!</h4>
        <Goback handleClick={handleClick}/>
      </Box>
     

      <Paper
        elevation={3} // Puedes ajustar el nivel de elevación según tu preferencia
        sx={{
          p: 2,
          width: {sm:'400px', xs:'250px'},
          marginX:'auto',
          marginY:'40px',
          backgroundColor: "#FFFFFF", // Color de fondo del Paper
        }}
      >
        <Typography variant="h5" sx={{ color: "#1F2E7B", fontWeight: 'bold' }}>
          Información personal
          <br />
        </Typography>
        <Typography variant="body1" sx={{ color: "#1F2E7B" }}>
          Nombre: {userData.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#1F2E7B" }}>
          Apellido: {userData.lastname}
        </Typography>
        <Typography variant="body1" sx={{ color: "#1F2E7B" }}>
          Username: {userData.username}
        </Typography>
      </Paper>

      <div>
        <h2>Tus favoritos</h2>
        <Favorites/>
      </div>

    </Container>

  );
};

export default UserProfile;
