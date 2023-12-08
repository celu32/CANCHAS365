import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const textBaseStyle = {
    fontWeight: '600',
    color: '#1F2E7B', // Cambia esto al color deseado
    textAlign: 'center',
};

const pageTitleStyle = {
    marginTop: '16px',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'black', // Cambia esto al color deseado
    textAlign: 'center',
};

const textMessageStyle = {
    marginTop: '24px',
    fontSize: '1rem',
    lineHeight: '1.75',
    color: 'gray', // Cambia esto al color deseado
    textAlign: 'center',
};

const actionButtonsStyle = {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column', // Cambia a column
    alignItems: 'center',
};

const homeButtonStyle = {
    backgroundColor: '#1F2E7B', // Cambia esto al color deseado
    color: 'white',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: '10px', // Separación vertical entre botones
};

const supportLinkStyle = {
    textDecoration: 'none',
    color: 'black', // Cambia esto al color deseado
    fontWeight: 'bold',
};

const NotFound = () => {
    return (
        <Grid container style={containerStyle} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h1" style={textBaseStyle}>
                    404
                </Typography>
                <Typography variant="h2" style={pageTitleStyle}>
                    Página no disponible :(
                </Typography>
                <Typography variant="body1" style={textMessageStyle}>
                    Lo sentimos, no pudimos encontrar la página que estás buscando.
                </Typography>
                <div style={actionButtonsStyle}>
                    <Button >
                        <a href="/" style={homeButtonStyle}>
                            Regresar al inicio
                        </a>
                    </Button>
                    <a href="/" style={supportLinkStyle}>
                        Contactar a soporte <span>&rarr;</span>
                    </a>
                </div>
            </Grid>
        </Grid>
    );
}
export default NotFound;