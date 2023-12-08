import { Box, Container} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DataClub from "../../components/Reservations/DataClub";
import FormReservations from "../../components/Reservations/FormReservations";
import useFetchApi from "../../hooks/useFetchApi";
import { METHODS } from "../../constants/methods";
import { ENDPOINTS } from "../../constants/endpoints";
import Goback from "../../components/ui/icons/Goback";

const Reservations = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const idClub = parseInt(queryParams.get('idClub'))

    const navigate = useNavigate();

    const { data:club, isLoading: isLoadingClub , error: errorClub } = useFetchApi(`${ENDPOINTS.CLUB}`, METHODS.GET, idClub)

    const handleGoback = () => {
        navigate(`/club/${idClub}`);
    };

    club && console.log(club)
    

    return(
        <Container
        maxWidth="xl"
        sx={{
            mt: "120px",
            mb: "40px",
            color: "#011A5B",
            backgroundColor: "#EDEBEE",
        }}
        >
            <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: "#FFFFFF",
            backgroundColor: "#FF914D",
            fontSize: "20px",
            fontWeight: "bold",
            paddingLeft: "10px",
            margin: '0px'
            }}>
                <h2> Reservá tu cancha </h2>
                <Goback handleClick={handleGoback}/>
            </Box>
            
            <Box sx={{
                color: "#011A5B",
                backgroundColor: "#FFFFFF",
                margin:'0px', 
                padding:'40px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly'
            }}>

                {club && 
                <> 
                    <DataClub club={club} />
                    
                    <FormReservations club={club} />
                </>
                }
            </Box> 
            
            
        
        </Container>
    )


}

export default Reservations