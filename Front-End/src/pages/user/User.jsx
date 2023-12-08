import FormUser from '../../components/user/signup/FormUser';
import { Container } from "@mui/material";

const User = () => {
  return (
    <div>
      <Container maxWidth="xl"
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#1F2E7B',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          gap: '10px',
          mt: '150px', // Ajuste del margen en dispositivos móviles
          padding: '20px', // Ajuste del padding en dispositivos móviles
        }}>
        <FormUser />
      </Container>
    </div>
  )
}

export default User