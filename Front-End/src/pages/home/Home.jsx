import { Container } from '@mui/material';
import Categories from '../../components/categories/Categories';
import Recomendations from '../../components/recomendations/Recomendations';
import SearchBar from '../../components/ui/search/SearchBar';
import Products from '../../components/products/Products';

const Home = () => {
  return (
    <Container maxWidth="xl"
      sx={{
        padding: '0',
        mt: '100px',
        mb: '40px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
      id='home'
    >
      <SearchBar />
      <Categories />
      <Recomendations />
      <Products/>
    </Container>
  );
}

export default Home;