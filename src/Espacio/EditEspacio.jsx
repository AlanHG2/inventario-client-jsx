/* eslint-disable react/prop-types */
import { Modal, Typography, notification } from "antd";
import { updateEspacio } from "../API/espacio";
import FrmEspacio from "./FrmEspacio";

const EditEspacio = ({ isOpen, setIsModalOpen, setIsReloading, selectedEspacio, edificioId }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, (typeof (value) == 'number') ? value : value.trim()])
            );

            const data = { ...trimmedValues, edificioId }

            const updatedEspacio = await updateEspacio(selectedEspacio.id, data);
            if (!updatedEspacio) {
                throw new Error('Hubo un error al actualizar el espacio');
            }
            notification.success({ message: 'El espacio fue actualizado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible actualizar el espacio' });
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
                Edita {selectedEspacio.nombre}
            </Typography.Title>
            <FrmEspacio
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={selectedEspacio}
            />
        </Modal>
    );
};

export default EditEspacio