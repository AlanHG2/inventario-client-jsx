/* eslint-disable react/prop-types */
import { Modal, Typography, notification } from "antd";
import { updateAreaAcademica } from "../API/area";
import { useMenu } from "../context/Menu";
import FrmArea from "./FrmArea";

const EditArea = ({ isOpen, setIsModalOpen, setIsReloading, selectedArea, institutoId }) => {

    const { setIsMenuLoading } = useMenu();

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value.trim()])
            );

            const data = { ...trimmedValues, institutoId }
            
            const updatedArea = await updateAreaAcademica(selectedArea.id, data);
            if (!updatedArea) {
                throw new Error('Hubo un error al actualizar el área acádemica');
            }
            notification.success({ message: 'El área acádemica fue actualizada correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
            setIsMenuLoading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible actualizar el área acádemica' });
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
                Edita {selectedArea.nombre}
            </Typography.Title>
            <FrmArea
                onFinish={onFinish}
                onCancel={handleCancel}
                initialValues={selectedArea}
            />
        </Modal>
    );
};

export default EditArea