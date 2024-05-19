/* eslint-disable react/prop-types */
import { Button, Flex, Form, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

const FrmEdificio = ({ onFinish, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            onFinish={(values) => onFinish(values)}
            onCancel={onCancel}
            name='EdificioFrm'
            layout='vertical'
            size='large'
        >
            <Form.Item
                label='Nombre:'
                name='nombre'
                rules={[
                    {
                        required: true,
                        message: 'El nombre no es válido',
                        pattern: /^(?!^\s+|\s+$)[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]+$/,
                    }
                ]}
            >
                <Input placeholder="Ingresa el nombre del edificio" />
            </Form.Item>
            <Form.Item
                className='codigoEspacio'
                label='Código:'
                name='codigo'
                rules={[
                    {
                        required: true,
                        message: 'El código no es válido',
                        pattern: /^(?!^\s+|\s+$)[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]+$/,
                    }
                ]}
            >
                <Input placeholder="Ingresa el código del edificio" />
            </Form.Item>
            <Form.Item
                label='No. de pisos:'
                name='numero_pisos'
                rules={[
                    {
                        required: true,
                        message: 'El número de pisos no es válido'
                    }
                ]}
            >
                <InputNumber max={50} min={0} />
            </Form.Item>

            <Flex gap={8} justify="end">
                <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit" >{initialValues.nombre ? 'Editar' : 'Agregar'}</Button>
            </Flex>
        </Form>
    )
}

export default FrmEdificio