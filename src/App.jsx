import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import '../node_modules/antd/dist/reset.css';
import { MainLayout } from './MainLayout';
import Login from './Usuario/login';
import Sigin from './Usuario/signup';
import Landing from './components/landing';

const App = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sigin' element={<Sigin />} />
        <Route path='/app/*' element={<MainLayout />} />
      </Routes>
    </Layout>
  );
};
export default App;