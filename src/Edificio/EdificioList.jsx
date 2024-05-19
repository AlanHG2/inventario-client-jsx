import { Empty, Flex, FloatButton, Spin, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiAddLargeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEdificio } from "../API/edificio";
import DataCard from "../components/DataCard";
import CreateEdificio from "./CreateEdificio";
import EditEdificio from "./EditEdificio";


const EdificioList = () => {

    const { id_area } = useParams();

    const [Data, setData] = useState([]);
    const [isCreatedModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEdificio, setSelectedEdificio] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const fetchEdificios = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/API/edificios/area_academica/' + id_area);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id_area]);

    useEffect(() => {
        if (id_area) {
            fetchEdificios();
        }
    }, [fetchEdificios, id_area]);

    useEffect(() => {
        if (isLoading) {
            fetchEdificios();
        }
    }, [fetchEdificios, isLoading]);


    const handleDelete = async (id_edificio) => {
        try {
            const deletedEdificio = await deleteEdificio(id_edificio);
            if (!deletedEdificio) {
                throw new Error('No fue posible eliminar el edificio');
            }
            notification.success({ message: 'Edificio eliminado correctamente' });
            setIsLoading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible eliminar el edificio' });
        }
    }

    const handleEdit = (edificio) => {
        setIsEditModalOpen(true);
        setSelectedEdificio(edificio);
    }

    return (
        <Spin spinning={isLoading}>
            <Flex wrap gap={28} align="center" justify="center">
                {
                    Data.length
                        ? Data.map(edificio => (
                            <DataCard
                                key={edificio.id}
                                title={edificio.nombre}
                                description={edificio.codigo}
                                onClick={() => navigate(`/espacios/${edificio.id}`)}
                                onDelete={() => handleDelete(edificio.id)}
                                onEdit={() => handleEdit(edificio)}
                                icon={<HiBuildingOffice2 size={45} />}
                            />
                        ))
                        : <Empty description='No hay edificios registrados' >
                        </Empty>
                }
                <FloatButton
                    icon={<RiAddLargeFill />}
                    tooltip='Agregar edificio'
                    onClick={() => setIsCreateModalOpen(!isCreatedModalOpen)}
                />

                <CreateEdificio
                    area_academica_id={id_area} isOpen={isCreatedModalOpen}
                    setIsModalOpen={setIsCreateModalOpen} setIsReloading={setIsLoading}
                />
                <EditEdificio
                    area_academica_id={id_area} isOpen={isEditModalOpen}
                    setIsModalOpen={setIsEditModalOpen} setIsReloading={setIsLoading}
                    selectedEdificio={selectedEdificio}
                />
            </Flex>
        </Spin>

    )
}

export default EdificioList