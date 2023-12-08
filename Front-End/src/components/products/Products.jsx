import Container from "@mui/material/Box";
import CardProducts from "./CardProducts";
import Box from "@mui/material/Box";
import useFetchApi from "../../hooks/useFetchApi";
import Loading from "../loading/Loading";
import { ENDPOINTS } from "../../constants/endpoints";


const Products = () => {


  const { data , isLoading, error } = useFetchApi(`${ENDPOINTS.RANDOM}`);
  

  return (
    <Container
      maxWidth="xl"
      sx={{
        color: "#1F2E7B",
        textAlign: "center",
        padding: {sm: "100px", xs: '20px'},
        backgroundColor: "#FFFFFF",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            color: "#1F2E7B",
            marginY:'30px',
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {data?.map((club) => (
            <CardProducts
              key={club.id}
              club={club}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Products;
