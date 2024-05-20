/* eslint-disable react/prop-types */
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

const FrmCategoria = ({ onFinish, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            name={`categoriaFrm${initialValues.name}`}
            onFinish={onFinish}
            layout="vertical"
            size="large"
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
                <Input placeholder="Ingresa el nombre de la categoría" />
            </Form.Item>

            <Form.Item
                label='Descripción:'
                name='descripcion'
                rules={[
                    {
                        required: true,
                        message: 'La descripción de la categoría es requerida'
                    }
                ]}
            >
                <TextArea placeholder="Ingresa la descripción de la categoría" rows={4}/>
            </Form.Item>

            <Flex gap={8} justify="end">
                <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit" >{initialValues.nombre ? 'Editar' : 'Agregar'}</Button>
            </Flex>
        </Form>
    )
}

export default FrmCategoria