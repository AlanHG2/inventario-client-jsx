import '../node_modules/antd/dist/reset.css';
import './styles/landing.css'
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <>
            <header className='header'>
                <nav className="navbar">

                    <Link to="/"  draggable="false">
                        <div className='logo'>
                            <img src="/inventarioIcono.svg" alt="logo" draggable='false'/>
                            <h1>uni<span className='dot'>·</span><span className='last'>inventario</span></h1>
                        </div>
                    </Link>
                    <ul className="links">
                        <li className='login'><Link to="/"  draggable="false">Inicia Sesión <i className='bx bx-log-in-circle icon'></i></Link></li>
                        <li className='signin'><Link to="/"  draggable="false">Regístrate <i className='bx bx-user-plus icon'></i></Link></li>
                    </ul>
                </nav>
            </header>
            <main className='main_landing'>
                <div id='text'>
                    <h1>Optimiza, Organiza y Controla con <span>Eficiencia</span></h1>
                    <p>
                        Descubre la nueva forma de gestionar todos los recursos de la universidad. Nuestro sistema de inventario te permite llevar un control preciso y actualizado de todos los activos y materiales.
                    </p>

                    <Link to="/"  draggable="false">Comienza ahora</Link>

                </div>
                <div id='image'>
                    <img src="/landing.svg" alt="imagen" draggable='false'/>
                </div>
            </main>
        </>
    );
};
export default Landing;