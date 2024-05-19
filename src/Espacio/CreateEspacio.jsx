import { Modal, Typography, notification } from 'antd';
import { createEspacio } from '../API/espacio';
import FrmEspacio from './FrmEspacio';

// eslint-disable-next-line react/prop-types
const CreateEspacio = ({ isOpen, setIsModalOpen, setIsReloading, edificioId }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, (typeof (value) == 'number') ? value : value.trim()])
            );

            const data = { ...trimmedValues, edificioId }

            const createdEdificio = await createEspacio(data);
            if (!createdEdificio) {
                throw new Error('Hubo un error al agregar el espacio');
            } notification.success({ message: 'El espacio fue agregado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible agregar el espacio' });
            console.error(error);
        }
    };

    const onCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            centered
            footer={null}
        >
            <Typography.Title level={2}>
                Agrea un Espacio
            </Typography.Title>
            <FrmEspacio onFinish={onFinish} onCancel={onCancel} initialValues={{ nombre: '', numero: 0, capacidad: 0, tipo: null }} />
        </Modal>
    )
}

export default CreateEspacio