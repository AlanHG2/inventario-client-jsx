import '../styles/signup.css'
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
const Profile = () => {

    return (
        <>
            <section className="top">
                <h1>Mi perfil</h1>
            </section>
            <Form
                layout='vertical'
                name='signup_form'
                className='signup_form'
            >
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
                            disabled
                            placeholder='ejemplo@gmail.com'
                        />
                    </Form.Item>
                </div>
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

                <Form.Item
                    label="Apellido paterno"
                    name="apellido_p"
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
                    name="apellido_m"
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





                <Form.Item>
                    <Button id='boton_cancel'>
                        Cancelar
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" id='boton_save'>
                        Guardar
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};
export default Profile;