/* eslint-disable react/prop-types */
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { getCategorias } from "../API/categoria";
import GenericSelect from "../components/GenericSelect";
import '../styles/formIngreso.css';
const FormArticulo = ({ onFinish, onCancel, initialValues }) => {

    const [form] = useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            name={`articuloFrm`}
            onFinish={onFinish}
            layout="vertical"
            style={{ width: '100%' }}
        >
            <Flex vertical justify="center" style={{ width: '100%' }}>

                <Typography.Title level={3} >
                    Información obligatoria
                </Typography.Title>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
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
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <Input placeholder="Nombre del artículo" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label='Código:'
                            name='codigo'
                            rules={[
                                {
                                    required: true,
                                    message: 'El código no es válido',
                                }
                            ]}
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <Input placeholder="Código del artículo" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label='Descripcion:'
                    name='descripcion'
                    rules={[
                        {
                            required: true,
                            message: 'La descripción del artículo es requerida',
                        }
                    ]}
                >
                    <Input.TextArea placeholder="Ingresa la descripción del artículo" rows={3} />
                </Form.Item>

                <Row gutter={16}>
                    <Col xs={24} sm={12} lg={8}>
                        <div id="item_precio">
                            <Form.Item
                                label="Precio:"
                                name="precio"
                                rules={[
                                    {
                                        required: true,
                                        message: 'El precio no es válido',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Precio" min={0} prefix="$" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div id='item_cantidad'>
                            <Form.Item
                                label="Cantidad:"
                                name="cantidad"
                                rules={[
                                    {
                                        required: true,
                                        message: 'La cantidad no es válida',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Cantidad" min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>

                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div id="item_posicion">
                            <Form.Item
                                label="Posición:"
                                name="posicion"
                                rules={[
                                    {
                                        required: true,
                                        message: 'La posición no es válida',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Posición" min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </div>

                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Estado:"
                            name="estado"
                            rules={[
                                {
                                    required: true,
                                    message: 'El estado no es válido',
                                },
                            ]}
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <Select placeholder='Estado del artículo'>
                                <Select.Option value="Nuevo">Nuevo</Select.Option>
                                <Select.Option value="Bueno">Bueno</Select.Option>
                                <Select.Option value="Regular">Regular</Select.Option>
                                <Select.Option value="Deteriorado">Deteriorado</Select.Option>
                                <Select.Option value="Inservible">Inservible</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Categoría:"
                            name="categoria_id"
                            rules={[
                                {
                                    required: true,
                                    message: 'La categoría no es válida',
                                },
                            ]}
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <GenericSelect
                                fetchData={getCategorias}
                                onChange={(value) => form.setFieldValue('categoria_id', value)}
                                value={form.getFieldValue('categoria_id')}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Typography.Title level={3} >
                    Información adicional
                </Typography.Title>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Marca:"
                            name={['caracteristicas', 'marca']}
                            rules={[
                                {
                                    message: 'La marca no es válida',
                                },
                            ]}
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <Input placeholder="Marca del artículo" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Color:"
                            name={['caracteristicas', 'color']}
                            rules={[
                                {
                                    message: 'El color no es válido',
                                },
                            ]}
                            style={{ width: '100%', minWidth: 200 }}
                        >
                            <Select placeholder='Color del artículo'>
                                <Select.Option value="Rojo">Rojo</Select.Option>
                                <Select.Option value="Azul">Azul</Select.Option>
                                <Select.Option value="Verde">Verde</Select.Option>
                                <Select.Option value="Amarillo">Amarillo</Select.Option>
                                <Select.Option value="Naranja">Naranja</Select.Option>
                                <Select.Option value="Negro">Negro</Select.Option>
                                <Select.Option value="Blanco">Blanco</Select.Option>
                                <Select.Option value="Gris">Gris</Select.Option>
                                <Select.Option value="Marrón">Marrón</Select.Option>
                                <Select.Option value="Rosa">Rosa</Select.Option>
                                <Select.Option value="Morado">Morado</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>


                <Flex gap={8} justify="end">
                    <Button type="default" onClick={onCancel}>Cancelar</Button>
                    <Button type="primary" htmlType="submit" >{initialValues.nombre ? 'Editar' : 'Agregar'}</Button>
                </Flex>
            </Flex>

        </Form>
    )
}

export default FormArticulo