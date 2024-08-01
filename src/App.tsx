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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const theme = {};
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Pokedex />} />
          <Route path="/my-pokemon" element={<TeamBuilder />} />
        </Route>
      </>
    ),
  );

  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}


export default App;
