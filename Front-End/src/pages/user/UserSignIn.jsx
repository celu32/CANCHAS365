import { Container } from "@mui/material";
import FormUserSignIn from "../../components/user/login/FormUserSignIn";


const UserSignIn = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#FFFFFF",
          color: "#1F2E7B",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: "10px",
          mt: "150px" ,
          padding: "20px", // Ajuste del padding en dispositivos móviles
        }}
      >
        <FormUserSignIn />
      </Container>
    </div>
  );
};

export default UserSignIn;
