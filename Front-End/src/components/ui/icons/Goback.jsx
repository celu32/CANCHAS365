import { IconButton} from "@mui/material";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";


const Goback = ({handleClick}) => {

    return (
        <IconButton
          aria-label="Volver"
          sx={{color:"#1F2E7B",
             backgroundColor:'#FF914D',
             height:40,
             width:40,
             position:'relative',
             right:'5px',
             top:'5px',
            }}
          
          fontSize
          onClick={handleClick}
        >
          <ArrowCircleLeftTwoToneIcon fontSize="large" color="#EDEBEE" />
        </IconButton>

    )

}

export default Goback