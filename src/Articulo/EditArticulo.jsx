/* eslint-disable react/prop-types */
import { Modal, Typography, notification } from "antd";
import { updateArticulo } from "../API/articulo";
import FormArticulo from "./FormArticulo";

const EditArticulo = ({ isOpen, setIsModalOpen, setIsReloading, selectedArticulo, espacio_id }) => {

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

            const updatedArticulo = await updateArticulo(selectedArticulo.id, data);
            if (!updatedArticulo) {
                throw new Error('Hubo un error al actualizar el artículo');
            }
            notification.success({ message: 'El artículo fue actualizado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible actualizar el artículo' });
            console.log(error);
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
                Edita {selectedArticulo.nombre}
            </Typography.Title>
            <FormArticulo
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={selectedArticulo}
            />
        </Modal>
    );
};

export default EditArticulo