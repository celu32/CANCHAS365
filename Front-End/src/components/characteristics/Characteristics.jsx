import { Typography, Box} from "@mui/material"




const Characteristic = ({club}) => {

  

    return (
      <> 
        <Typography variant="p" sx={{ margin:'10px', fontWeight: 'bold' }}>Características del club:</Typography>
         
        <Box
          sx={{
            display:'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignContent: 'center',
            gap:'20px',
            justifyContent: 'center',
            color: "#011A5B",
            backgroundColor: "#FFFFFF",
            textAlign: "left",
            padding: "40px 80px 40px 80px"
          }}
        >
          
            {club?.characteristics?.map((characteristic) => (
                <Box 
                  key={characteristic.id}
                  sx={{ display: "flex", flexWrap:'wrap', alignItems: "center", gap:'3px'}}>
                  <img
                    src={characteristic.url}
                    alt={characteristic.name}
                    style={{ width: "50px", height: "50px", marginRight: "10px" }}
                  />
                  <Typography>{characteristic.name}</Typography>
                </Box>
            ))}
       
        </Box>
      </>
    )
}
export default Characteristic