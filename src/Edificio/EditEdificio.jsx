/* eslint-disable react/prop-types */
import { Modal, Typography, notification } from "antd";
import { updateEdificio } from "../API/edificio";
import FrmEdificio from "./FrmEdificio";

const EditEdificio = ({ isOpen, setIsModalOpen, setIsReloading, selectedEdificio, area_academica_id }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, (typeof (value) == 'number') ? value : value.trim()])
            );

            const data = { ...trimmedValues, area_academica_id }

            const updatedEdificio = await updateEdificio(selectedEdificio.id, data);
            if (!updatedEdificio) {
                throw new Error('Hubo un error al actualizar el edificio');
            }
            notification.success({ message: 'El edificio fue actualizado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible actualizar el edificio' });
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
                Edita {selectedEdificio.nombre}
            </Typography.Title>
            <FrmEdificio
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={selectedEdificio}
            />
        </Modal>
    );
};

export default EditEdificio