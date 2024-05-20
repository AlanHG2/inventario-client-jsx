
import { FaUniversity } from 'react-icons/fa';

import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { BiCategory, BiExit, BiUser } from 'react-icons/bi';
import { GrSettingsOption } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import '../../node_modules/antd/dist/reset.css';
import { getInstitutoDetail } from '../API/instituto';
import { useMenu } from '../context/Menu';
import '../styles/sidebar.css';
const { Sider } = Layout;



const SideMenu = () => {
    const [menuData, setMenuData] = useState([]);

    const { isMenuLoading, setIsMenuLoading } = useMenu();

    const navigate = useNavigate();

    const testItems = [
        {
            key: '/app/institutos',
            label: 'Institutos',
            title: 'Institutos',
            icon: <GrSettingsOption />,
        },
        ...menuData.map(instituto => ({
            key: 'instituto_' + instituto.id,
            label: instituto.nombre,
            title: instituto.nombre,
            icon: <FaUniversity />,
            children: instituto.area_academicas ? [

                ...instituto.area_academicas.map(areaAcademica => ({
                    key: '/app/edificios/' + areaAcademica.id,
                    label: areaAcademica.nombre,
                }))

            ] : [] // Opción predeterminada para áreas académicas
        })),
        {
            key: '/app/Categorias',
            label: 'Categorías',
            icon: <BiCategory />,
        },
        {
            key: '/app/Usuario',
            label: 'Usuario',
            icon: <BiUser />,
        },
        {
            key: '/app/logout',
            label: 'Cerrar Sesión',
            icon: <BiExit />
        },
    ]


    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getInstitutoDetail();
                setMenuData(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setIsMenuLoading(false);
            }
        }
        if (isMenuLoading) {
            fetchMenu();
        }
    }, [isMenuLoading])


    return (
        <Sider style={{
            backgroundColor: 'white', // add more styles here
        }}
            breakpoint='md'
            collapsible
        >
            <div className='logo'>
                <img src="/inventarioLogo.svg" alt="logo" />
            </div>
            <Menu

                style={{
                    fontWeight: '600',
                }}
                onClick={(info) => navigate(info.key)}
                mode="inline"
                items={testItems}
            />
        </Sider>
    );
};
export default SideMenu;