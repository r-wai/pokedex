import { ThemeProvider } from 'styled-components';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Root from './screens/Root';
import Pokedex from './screens/Pokedex';
import TeamBuilder from './screens/TeamBuilder';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokemon from './screens/Pokemon';

function App() {
  const theme = {};
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
      <Route path="/" element={<Root />}>
        <Route path="pokedex" element={<Pokedex />} />
      </Route>,
      <Route path="/my-pokemon" element={<TeamBuilder />} />
      <Route path="/:pokemonName" element={<Pokemon />} />
      </>
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavigationBar />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
