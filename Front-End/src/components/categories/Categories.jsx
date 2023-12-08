
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFetchApi from '../../hooks/useFetchApi';
import {ENDPOINTS} from '../../constants/endpoints'
import { useNavigate } from 'react-router-dom';



const Categories = () => {

  const { data: categories, isLoading, error} = useFetchApi(`${ENDPOINTS.CATEGORY}`);

  const navigate = useNavigate();

  const handleClick = (id) => {
    
    navigate(`/category/${id}`);
  };

  return (

        <Toolbar disableGutters  sx={{
          paddingTop: '10px',
          marginX: '0px',
          backgroundColor: '#FF914D',
          color:'#011A5B',
          height: '120px',
          }}
        >

          <Box 
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              mx: '0px',
              justifyContent: 'center',
              alignContent:'space-between',
            }}
          >
            {categories?.map((category) => (
              <Button
                onClick={()=>{handleClick(category.id)}}
                key={category.id}
                sx={{ 
                  margin:'20px', 
                  color: '#011A5B', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignContent:'space-around',
                  justifyContent: 'center',}}
              >
                <img src={category.url} alt={category.title} width={'60px'} />
                <h4> {category.title} </h4>
                
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-start',
            }}
          >
          
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel>Buscar por categorias</InputLabel>
              <Select
                labelId="categorias"
                input={<OutlinedInput label="Buscar por categorías" />}
              >
                {categories?.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={category.title}
                  >
                    < Button onClick={()=>{handleClick(category.id)}} >
                    {category.title} 
                    </Button>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>

        </Toolbar>

  );
}

export default Categories;