import { Container } from '@mui/material';
import Categories from '../../components/categories/Categories';
import Recomendations from '../../components/recomendations/Recomendations';
import SearchResults from '../../components/clubSearch/SearchResults';


const ClubSearch = () => {

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: '0',
        mt: '120px',
        mb: '40px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      }}
      id='home'
    >
      <Categories />
      <SearchResults />
      <Recomendations />
    </Container>
  );
}

export default ClubSearch;
