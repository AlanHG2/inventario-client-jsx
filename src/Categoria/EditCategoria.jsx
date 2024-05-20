/* eslint-disable react/prop-types */
import { Modal, Typography, notification } from "antd";
import { updateCategoria } from "../API/categoria";
import FrmCategoria from "./FrmCategoria";

const EditCategoria = ({ isOpen, setIsModalOpen, setIsReloading, selectedCategoria }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value.trim()])
            );

            const updatedCategoria = await updateCategoria(selectedCategoria.id, trimmedValues);
            if (!updatedCategoria) {
                throw new Error('Hubo un error al actualizar la categoria');
            }
            notification.success({ message: 'La categoría fue actualizada correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible actualizar la categoría' });
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
        >
            <Typography.Title level={2}>
                Edita {selectedCategoria.nombre}
            </Typography.Title>
            <FrmCategoria
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={selectedCategoria}
            />
        </Modal>
    );
};

export default EditCategoria