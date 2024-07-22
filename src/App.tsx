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

function App() {
  const theme = {};
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="pokedex" element={<Pokedex />} />
        <Route path="team-builder" element={<TeamBuilder />} />
      </Route>,
    ),
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
