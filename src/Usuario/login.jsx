import '../styles/login.css'
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
const Login = () => {
    return (
        <main className='main_login'>
            <section className="top">
                <img src="/inventarioIcono.svg" alt="logo" draggable='false' />
                <h1>Inicia sesión en <span className='first'>uni</span><span className='dot'>·</span><span>inventario</span></h1>
            </section>
            <Form
                layout='vertical'
                name='login_form'
                className='login_form'
            >
                <Form.Item
                    label="Usuario"
                    name="user"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa tu nombre de usuario',
                        },
                    ]}
                >
                    <Input 
                    placeholder='Usuario'
                    />
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name="pass"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa tu contraseña',
                        },
                    ]}
                >
                    <Input 
                    placeholder='Contraseña'
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" id='boton_login'>
                        Iniciar sesión
                    </Button>
                </Form.Item>
            </Form>

            <div className="nuevo">
                <h3>¿Eres nuevo? <span><Link to="/"  draggable="false">Crea una cuenta</Link></span></h3>
            </div>
        </main>
    );
};
export default Login;