import { Modal, Typography, notification } from "antd";
import { createArticulo } from "../API/articulo";
import FrmArticulo from "./FormArticulo";

// eslint-disable-next-line react/prop-types
const CreateCategoria = ({ isOpen, setIsModalOpen, setIsReloading, espacio_id }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, (typeof (value) == 'string') ? value.trim() : value])
            );

            const data = {
                ...trimmedValues,
                espacio_id,
                fecha_adquisicion: '2024-04-10 14:09:49',
                numero_serie: 'hola',
                fecha_baja: '2024-04-10 14:09:49'
            }

            const createdArticulo = await createArticulo(data);

            if (!createdArticulo) {
                throw new Error('Hubo un error al agregar el artículo');
            } notification.success({ message: 'El artículo fue agregado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible agregar el artículo' });
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            centered
            footer={null}
            width={800}
        >
            <Typography.Title level={2}>
                Agrega un Artículo
            </Typography.Title>
            <FrmArticulo
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={
                    {
                        "nombre": null,
                        "codigo": null,
                        "descripcion": null,
                        "precio": null,
                        "cantidad": null,
                        "estado": null,
                        "categoria_id": null,
                        "caracteristicas": {
                            "color": null,
                            "marca": null
                        }
                    }
                }
            />
        </Modal>
    );
};

export default CreateCategoria