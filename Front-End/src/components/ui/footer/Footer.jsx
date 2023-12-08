import Box from '@mui/material/Box';

const Footer = () => {

  const logo = 'https://res.cloudinary.com/dreso9ye9/image/upload/v1701465116/logoNaranjaNeg_rd1s1x.png'

  return (
    <Box component="footer"
      maxWidth="xxl"
      sx={{
        display: 'flex',
        borderTop: '3px solid #FF914D',
        borderBottom: '3px solid #FF914D',
        backgroundColor: '#1F2E7B',
        height: '40px',
        position: 'fixed',
        bottom: 0,
        zIndex:'10',
        alignItems:'center',
        justifyContent:'flex-start',
        width: '100%',
      }}
    >
      <img src={logo} style={{ height: '30px', marginLeft:'10px',marginRight:'5px' }} />
      <span> © 2023 Todos los derechos reservados </span>
    </Box>
  );
}

export default Footer;