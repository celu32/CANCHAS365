
import { DataProvider } from './auth/context';
import { Navigation } from './routes/Navigation';
import './App.css';

const App = () => {

  return (
    <DataProvider>
      <Navigation />
    </DataProvider>
  );
};

export default App;


