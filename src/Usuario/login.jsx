import { Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { authUsuario } from '../API/usuario';
import '../styles/login.css';
const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const loggedUser = await authUsuario(values);
            if (!loggedUser) {
                throw new Error('Error al iniciar sesión');
            }
            notification.success({ message: 'Bienvenid@' });
            navigate('/app');
        } catch (error) {
            notification.error({ message: 'No fue posible inicar sesión', description: 'Verifica las credenciales o intenta más tarde' });
        }
    }

    const onFinishFailed = () => {
        notification.warning({ message: 'Credenciales Inválidas', description: 'Verifica la información proporcionada' });
    }

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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa tu email asociado',
                        },
                    ]}
                >
                    <Input
                        placeholder='example@example.com'
                    />
                </Form.Item>
                <Form.Item
                    label="Contraseña:"
                    name="password"
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
                <h3>¿Eres nuevo? <span><Link to="/sigin" draggable="false">Crea una cuenta</Link></span></h3>
            </div>
        </main>
    );
};
export default Login;