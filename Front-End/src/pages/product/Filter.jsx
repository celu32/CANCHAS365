import Container from '@mui/material/Box';
import CardProducts from '../../components/products/CardProducts';
import Box from '@mui/material/Box';
import useFetchDataApi from '../../hooks/useFetchDataApi';
import useFetchApi from '../../hooks/useFetchApi';
import Loading from '../../components/loading/Loading'
import { ENDPOINTS } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { METHODS } from '../../constants/methods';
import { useEffect, useState } from 'react';
import { FormControlLabel, Checkbox} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Goback from '../../components/ui/icons/Goback';



const Filter = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const { data, isLoading, error, fetchData } = useFetchDataApi();

  const { data: clubsData, isLoading: isLoadingClubsData, error: clubsErrorData } = useFetchApi(`${ENDPOINTS.CLUB}`);
  
  const [ids, setIds] = useState([{ id: parseInt(id) }]);

  const [total, setTotal] = useState(data?.length);

  const makeNewCategories = (clubs) => {
    var categories = {};
    clubs.forEach(function(club) {
    let categoryId = club.category.id;
    let categoryTitle = club.category.title;
    if (categories[categoryId]) {
      categories[categoryId].cant++;
    } else {
      categories[categoryId] = {
        id: categoryId,
        title: categoryTitle,
        cant: 1
      };
    }
  });

  let result = Object.values(categories);

  return result;

  }

 const newCategories = clubsData && makeNewCategories(clubsData) 
    
  const clubs = async () => {
    try {
      const result = await fetchData(ENDPOINTS.CLUB_BY_CATEGORY, METHODS.POST, ids);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    clubs();
  }, [ids]);

  useEffect(() => {
    setTotal(data?.length);
  }, [data]);

  const goBack = () => {
    navigate("/");
  };

  const isChecked = (categoryId) => {
    return ids.some(obj => obj.id === categoryId); 
  };

  const handleChange = (categoryId) => {
    setIds(prevIds => {
      if (isChecked (categoryId)) {
        return prevIds.filter(obj => obj.id !== categoryId);
      } else {
        return [...prevIds, { id: categoryId }];
      }
    });
  };

  return (
    <Container maxWidth="xl"
      sx={{
        color: "#011A5B",
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        paddingX:'40px',
        margin: '120px auto 40px'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: "#1F2E7B",
          backgroundColor: "#FF914D",
          fontSize: "30px",
          fontWeight: "bold",
          paddingLeft: "20px",
          margin: '0px'
        }}
      >
        <h4>Resultados de búsqueda</h4>
        <Goback handleClick={goBack}/>
      </Box>
        
          <Container
            sx={{
              display:'flex',
              mt: '40px',
              flexDirection:{ xs: 'column', md: 'row' },
              flexWrap:'nowrap',
              gap:'50px',
              }}
          >
            <Box
              sx={{
                flexDirection:'column',
                alignItems:'flex-start',
                width:'400px',
                display: { xs: 'none', md: 'flex' },
                }}
            >
              <h5>DEPORTES</h5>

              {
                newCategories?.map((category) => (
                  
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={isChecked(category.id)}
                        onChange={()=>handleChange(category.id)}
                      /> 
                    }
                    label={`${category.title} (${category.cant})`}
                  />
                      
                ))
              }
            </Box>
            <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-start',
            }}
          >
           
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>DEPORTES</InputLabel>
              <Select
                labelId="categorias"
                input={<OutlinedInput label="Buscar por Deporte" />}
              >
                {newCategories?.map((category) => (
                  <MenuItem key={category.id}>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={isChecked(category.id)}
                        onChange={()=>handleChange(category.id)}
                        /> 
                      }
                      label={`${category.title} (${category.cant})`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>



            {
                (isLoading) ? <Loading /> :
            <div> 
              <h3>{`${total} Clubes encontrados`}</h3>
              <Box sx={{
                mx: 'auto',
                mt:'60px',
                backgroundColor: '#FFFFFF',
                color: '#1F2E7B',
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                textAlign: 'center',
                gap: '40px',
                flexWrap: 'wrap'
              }}>
                  {
                  clubs && data?.map((club) => (
                    <CardProducts key={club.id} club={club} />
                  ))
                  }
                
              </Box>
            </div>
            }
          </Container>
        
      

    </Container>

  );


}

export default Filter