import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';

const Root = () => {
  return (
    <>
      <NavigationBar />
      <Layout>
        <Outlet/>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;

  > h1 {
    font-size: 3rem;
    color: #000000;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      font-size: 2rem;
      width: 90vw;
    }
  }
`;

export default Root;
