import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Route, Routes } from 'react-router-dom';
import '../node_modules/antd/dist/reset.css';
import AreaList from './Area/AreaList';
import TabArticulos from './Articulo/tabArticulos';
import TabCaregorias from './Categoria/tabCategorias';
import EdificioList from './Edificio/EdificioList';
import EspacioList from './Espacio/EspacioList';
import InstitutosList from './Instituto/InstitutosList';
import SideMenu from './components/Menu';

export const MainLayout = () => {
    return (
        <>
            <SideMenu />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                    }}
                >
                    <Routes>
                        <Route path='/' element={<InstitutosList />} />
                        <Route path='/institutos' element={<InstitutosList />} />
                        <Route path='/areas_academicas/:id_instituto' element={<AreaList />} />
                        <Route path='/edificios/:id_area' element={<EdificioList />} />
                        <Route path='/espacios/:id_edificio' element={<EspacioList />} />
                        <Route path='/articulos/:id_espacio' element={<TabArticulos />} />
                        <Route path='/categorias' element={<TabCaregorias />} />
                    </Routes>

                </Content>
            </Layout>
        </>

    )
}
