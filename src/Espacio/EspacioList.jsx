import { Empty, Flex, FloatButton, Spin, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { RiAddLargeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEspacio } from "../API/espacio";
import DataCard from "../components/DataCard";
import CreateEspacio from "./CreateEspacio";
import EditEspacio from "./EditEspacio";


const EspacioList = () => {

    const { id_edificio } = useParams();

    const [Data, setData] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEspacio, setselectedEspacio] = useState({});
    const [isLoading, setIsloading] = useState(false);

    const navigate = useNavigate();

    const fetchEspacios = useCallback(async () => {
        try {
            setIsloading(true);
            const response = await fetch('http://localhost:3000/API/espacios/edificio/' + id_edificio);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsloading(false);
        }
    }, [id_edificio]);

    useEffect(() => {
        if (id_edificio) {
            fetchEspacios();
        }
    }, [fetchEspacios, id_edificio]);

    useEffect(() => {
        if (isLoading) {
            fetchEspacios();
        }
    }, [fetchEspacios, isLoading])

    const handleEdit = (espacio) => {
        setselectedEspacio(espacio);
        setIsEditModalOpen(true);
    }

    const handleDelete = async (espacioId) => {
        try {
            const deletedEspacio = await deleteEspacio(espacioId);
            if (!deletedEspacio) {
                throw new Error('No fue posible eliminar el espacio');
            }
            notification.success({ message: 'Espacio eliminado correctamente' });
            setIsloading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible eliminar el espacio' });
            console.error(error);
        }
    }

    return (
        <Spin spinning={isLoading}>
            <Flex wrap gap={28} align="center" justify="center" >
                {
                    Data.length
                        ? Data.map(espacio => (
                            <DataCard
                                key={espacio.id}
                                title={espacio.nombre}
                                description={espacio.tipo}
                                onClick={() => navigate(`/articulos/${espacio.id}`)}
                                onDelete={() => handleDelete(espacio.id)}
                                onEdit={() => handleEdit(espacio)}
                                icon={<CiBoxList size={45} />}
                            />
                        ))
                        : <Empty description='No hay espacios registrados' >
                        </Empty>
                }
                <FloatButton
                    icon={<RiAddLargeFill />}
                    tooltip='Agregar espacio'
                    onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
                />

                <CreateEspacio
                    edificioId={id_edificio} isOpen={isCreateModalOpen}
                    setIsModalOpen={setIsCreateModalOpen} setIsReloading={setIsloading}
                />

                <EditEspacio
                    edificioId={id_edificio} isOpen={isEditModalOpen}
                    setIsModalOpen={setIsEditModalOpen} setIsReloading={setIsloading}
                    selectedEspacio={selectedEspacio}
                />
            </Flex>
        </Spin>
    )
}

export default EspacioList