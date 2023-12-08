import Typography from "@mui/material/Typography";
import "./Politics.css"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

const Politics = () => {


  return (
    <>
    <hr className="title-line" />
    <Typography
          variant="h4"
          component="h4"
          sx={{
            height: "30px",
            padding: "30px",
            fontSize: "26px",
            fontWeight: "bold",
            color: "#1F2E7B",
            textDecoration: "underline",
            margin:"30px",
          }}
        >
          Políticas de uso
        </Typography>
    <div className="politics-container"> 
      <div className="section-container">
      <CalendarMonthOutlinedIcon sx={{color:"#1F2E7B"}}/> 
        <Typography
          variant="h5"
          component="h5"
          sx={{
            height: "30px",
            padding: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1F2E7B",
          }}
        >
         Reservas 
        </Typography>
        
        
        <Typography
          variant="body1"
          component="div"
          sx={{
            padding: "10px",
            fontSize: "14px",
            color: "#1F2E7B",
          }}
        >
          <p>Se puede realizar  o cancelar una reserva hasta una hora antes del inicio de la misma.</p>
          <p> Las cancealaciones que no cumplan este plazo serán cobradas.</p>
        </Typography>
      </div>

      <div className="section-container">
      <PaidOutlinedIcon sx={{color:"#1F2E7B"}}  />
        <Typography
          variant="h5"
          component="h5"
          sx={{
            height: "30px",
            padding: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1F2E7B",
          }}
        >
          Pagos 
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            padding: "10px",
            fontSize: "14px",
            color: "#1F2E7B",
          }}
        >
          <p>Los pagos se realizan personalmente en el lugar de la reserva antes de iniciar el turno.</p>
          <p>El precio es por cancha, no importa la cantidad de jugadores que asistan.</p>
        </Typography>
      </div>

      <div className="section-container">
      <HandshakeOutlinedIcon sx={{color:"#1F2E7B"}}/>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            height: "30px",
            padding: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1F2E7B",
          }}
        >
          Uniendo Pasiones, forjando Comunidad 
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            padding: "10px",
            fontSize: "14px",
            color: "#1F2E7B",
          }}
        >
          <p>
            Inclusividad: Queremos que todas las personas, principiantes y expertas, se sientan
            bienvenidas.
          </p>
          <p>
            Respeto Mutuo: Valoramos a las personas en su diversidad. En nuestra comunidad, nos brindamos siempre un trato respetuoso, cordial y justo.
          </p>
        </Typography>
      </div>
    </div>
    </>
  );
};

export default Politics;