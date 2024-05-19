/* eslint-disable react/prop-types */
import { Button, Flex, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';

const FrmEspacio = ({ onFinish, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            onFinish={(values) => onFinish(values)}
            onCancel={onCancel}
            name={`EspacioFrm${initialValues.name}`}
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
                <Input placeholder="Ingresa el nombre del espacio" />
            </Form.Item>

            <Form.Item
                label='Tipo:'
                name='tipo'
                rules={[
                    {
                        required: true,
                        message: 'Debes seleccionar una opción'
                    }
                ]}
            >
                <Select placeholder='Elige el tipo de espacio' >
                    <Select.Option value="AULA">Aula</Select.Option>
                    <Select.Option value="OFICINA">Oficina</Select.Option >
                    <Select.Option value="LABORATORIO">Laboratorio</Select.Option >
                    <Select.Option value="AUDITORIO">Auditorio</Select.Option >
                    <Select.Option value="ALMACEN">Almacén</Select.Option >
                    <Select.Option value="BIBLIOTECA">Biblioteca</Select.Option >
                    <Select.Option value="AREA_COMUN">Área Común</Select.Option >
                    <Select.Option value="OTRO">Otro</Select.Option >
                </Select>
            </Form.Item>

            <Flex gap={16}>
                <Form.Item
                    label='Número de espacio:'
                    name='numero'
                    rules={[
                        {
                            required: true,
                            message: 'El número de espacio no es válido'
                        }
                    ]}
                >
                    <InputNumber max={100} min={0} />
                </Form.Item>

                <Form.Item
                    label='Capacidad del espacio:'
                    name='capacidad'
                    rules={[
                        {
                            required: true,
                            message: 'El número de capacidad no es válido'
                        }
                    ]}
                >
                    <InputNumber max={250000} min={0} />
                </Form.Item>
            </Flex>


            <Flex gap={8} justify="end">
                <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit" >{initialValues.nombre ? 'Editar' : 'Agregar'}</Button>
            </Flex>
        </Form>
    )
}

export default FrmEspacio