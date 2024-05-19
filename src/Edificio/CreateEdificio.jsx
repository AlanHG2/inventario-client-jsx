import { Modal, Typography, notification } from 'antd';
import { createEdificio } from '../API/edificio';
import FrmEdificio from './FrmEdificio';

// eslint-disable-next-line react/prop-types
const CreateEdificio = ({ isOpen, setIsModalOpen, setIsReloading, area_academica_id }) => {

    const onFinish = async (values) => {
        try {
            const trimmedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, (typeof (value) == 'number') ? value : value.trim()])
            );

            const data = { ...trimmedValues, area_academica_id }

            const createdEdificio = await createEdificio(data);
            if (!createdEdificio) {
                throw new Error('Hubo un error al agregar el edificio');
            } notification.success({ message: 'El edificio fue agregado correctamente' });
            setIsModalOpen(false);
            setIsReloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible agregar el edificio' });
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
                Agrea un Edificio
            </Typography.Title>
            <FrmEdificio onFinish={onFinish} onCancel={onCancel} initialValues={{ nombre: '', codigo: '', numero_pisos: '0' }} />
        </Modal>
    )
}

export default CreateEdificio