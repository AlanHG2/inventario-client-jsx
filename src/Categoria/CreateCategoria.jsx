import { Modal, Typography, notification } from "antd";
import { createCategoria } from "../API/categoria";
import FrmCategoria from "./FrmCategoria";

// eslint-disable-next-line react/prop-types
const CreateCategoria = ({ isOpen, setIsModalOpen, setIsReloading }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value.trim()])
            );

            const createdCategoria = await createCategoria(trimmedValues);
            if (!createdCategoria) {
                throw new Error('Hubo un error al agregar la categoría');
            } notification.success({ message: 'La categoría fue agregada correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible agregar la categoría' });
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
        >
            <Typography.Title level={2}>
                Agrega una Categoría
            </Typography.Title>
            <FrmCategoria
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={{ nombre: '', descripcion: '' }}
            />
        </Modal>
    );
};

export default CreateCategoria