import { Empty, Flex, FloatButton, Spin, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { RiAddLargeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAreaAcademica, getAreaAcademicaByInstituto } from "../API/area";
import DataCard from "../components/DataCard";
import { useMenu } from "../context/Menu";
import CreateArea from "./CreateArea";
import EditArea from "./EditArea";


const AreaList = () => {

    const { id_instituto } = useParams();

    const [Data, setData] = useState([]);
    const [isFormEditOpen, setIsFormEditOpen] = useState(false);
    const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedArea, setSelectedArea] = useState({});

    const { setIsMenuLoading } = useMenu();

    const navigate = useNavigate();

    const fetchAreas = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAreaAcademicaByInstituto(id_instituto);
            setData(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id_instituto]);


    useEffect(() => {
        if (id_instituto) {
            fetchAreas();
        }
    }, [id_instituto, fetchAreas]);

    useEffect(() => {
        if (isLoading) {
            fetchAreas();
        }
    }, [isLoading, fetchAreas]);

    const handleDelete = async (id_area) => {
        try {
            const deletedArea = await deleteAreaAcademica(id_area);
            if (!deletedArea) {
                throw new Error('No fue posible eliminar el área académica');
            }
            notification.success({ message: 'Área académica eliminado correctamente' });
            setIsLoading(true);
            setIsMenuLoading(true);
        } catch (error) {
            notification.error({ message: 'No fue posible eliminar el área académica' });
        }
    }

    const handleEdit = (area) => {
        setIsFormEditOpen(true);
        setSelectedArea(area);
    }

    return (
        <Spin spinning={isLoading}>
            <Flex wrap gap={28} align="center" justify="center">
                {
                    Data.length
                        ? Data.map(area => (
                            <DataCard
                                key={area.id}
                                title={area.nombre}
                                description={area.codigo}
                                onClick={() => navigate(`/app/edificios/${area.id}`)}
                                onDelete={() => handleDelete(area.id)}
                                onEdit={() => handleEdit(area)}
                                icon={<HiOutlineAcademicCap size={45} />}
                            />
                        ))
                        : <Empty description='No hay áreas académicas registradas' >
                        </Empty>
                }
                <FloatButton
                    icon={<RiAddLargeFill />}
                    tooltip='Agregar área académica'
                    onClick={() => setIsFormCreateOpen(!isFormEditOpen)}
                />

                <CreateArea
                    isOpen={isFormCreateOpen} setIsModalOpen={setIsFormCreateOpen}
                    setIsReloading={setIsLoading} institutoId={id_instituto}
                />
                <EditArea
                    isOpen={isFormEditOpen} setIsModalOpen={setIsFormEditOpen}
                    setIsReloading={setIsLoading} institutoId={id_instituto}
                    selectedArea={selectedArea}
                />
            </Flex>
        </Spin>

    )
}

export default AreaList