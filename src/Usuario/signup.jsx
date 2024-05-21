import { Button, Flex, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUsuario } from '../API/usuario';
import '../styles/signup.css';
const Signup = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const data = { ...values, rol: 'admin' };
            const loggedUser = await createUsuario(data);
            if (!loggedUser) {
                throw new Error('Error al crear el usuario');
            }
            notification.success({ message: 'Bienvenid@' });
            navigate('/app');
        } catch (error) {
            notification.error({ message: 'Usuario no creado', description: 'Verifica la información o intenta más tarde' });
        }
    }

    const onFinishFailed = () => {
        notification.warning({ message: 'Información no válida', description: 'Verifica la información proporcionada' });
    }


    return (
        <main className='main_signup'>
            <section className="top">
                <img src="/inventarioIcono.svg" alt="logo" draggable='false' />
                <h1>Regístrate en <span className='first'>uni</span><span className='dot'>·</span><span>inventario</span></h1>
            </section>
            <Form
                layout='vertical'
                name='signup_form'
                className='signup_form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div id='item_nombre'>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[
                            {
                                required: true,
                                message: 'Ingresa un nombre válido',
                                pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/
                            },
                        ]}
                    >
                        <Input
                            placeholder='Nombre'
                        />
                    </Form.Item>
                </div>

                <Flex >

                </Flex>
                <Form.Item
                    label="Apellido paterno"
                    name="apellido_paterno"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa un apellido válido',
                            pattern: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+$/
                        },
                    ]}
                >
                    <Input
                        placeholder='Apellido paterno'
                    />
                </Form.Item>
                <Form.Item
                    label="Apellido materno"
                    name="apellido_materno"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa un apellido válido',
                            pattern: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+$/
                        },
                    ]}
                >
                    <Input
                        placeholder='Apellido materno'
                    />
                </Form.Item>
                <div id='item_email'>
                    <Form.Item
                        label="e-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Ingresa un e-mail válido',
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            },
                        ]}
                    >
                        <Input
                            placeholder='ejemplo@gmail.com'
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Nombre de usuario"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa un nombre de usuario válido',
                            pattern: /^[a-zA-Z0-9]+$/
                        },
                    ]}
                >
                    <Input
                        placeholder='Nombre de usuario'
                    />
                </Form.Item>
                <div id='item_password'>
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Ingresa una contraseña válida (al menos 6 caracteres)',
                                pattern: /^.{6,}$/
                            },
                        ]}
                    >
                        <Input.Password placeholder="********" />

                    </Form.Item>
                </div>

                <div id='item_boton'>
                    <Form.Item>
                        <Button htmlType="submit" id='boton_signup'>
                            Registrarse
                        </Button>
                    </Form.Item>
                </div>

            </Form>

            <div className="already-have-account">
                <h3>¿Ya tienes una cuenta? <span><Link to="/" draggable="false">Inicia sesión</Link></span></h3>
            </div>
        </main>
    );
};
export default Signup;