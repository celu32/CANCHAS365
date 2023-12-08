import Container from "@mui/material/Box";
import CardProducts from "../products/CardProducts";
import Box from "@mui/material/Box";
import { AuthContext } from "../../auth/context";

const Favorites = () => {

  const { favorites } = AuthContext();

  return (
    <Container
      maxWidth="xl"
      sx={{
        color: "#1F2E7B",
        backgroundColor: "#FFFFFF",
        textAlign: "center",
        padding: { sm:"100px", xs: '20px'},
        pt:'30px'
      }}
    >
        <Box
          sx={{
            mx: "auto",
            backgroundColor: "#FFFFFF",
            color: "#1F2E7B",
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {favorites &&
            favorites?.map((club) => (
              <CardProducts
                key={club.id}
                club={club}
              />
            ))}
        </Box>
    </Container>
  );
};

export default Favorites;
