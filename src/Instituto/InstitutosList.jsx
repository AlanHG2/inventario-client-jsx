import { Empty, Flex, FloatButton, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteInstituto, getInstitutos } from "../API/instituto";
import DataCard from "../components/DataCard";
import { useMenu } from "../context/Menu";
import CrearInstituto from "./CreateInstituto";
import EditInstituto from "./EditInstituto";


const InstitutosList = () => {

  const [institutosData, setInstitutosData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedInstituto, setselectedInstituto] = useState({});

  const { setIsMenuLoading } = useMenu();

  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoading) {
      return
    }

    const fetchInstitutos = async () => {
      setIsLoading(true);
      try {
        const data = await getInstitutos();
        setInstitutosData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInstitutos();
  }, [isLoading]);

  const handleDelete = async (id_instituto) => {
    try {
      const deletedInstituto = await deleteInstituto(id_instituto);
      if (!deletedInstituto) {
        throw new Error('No fue posible eliminar el instituto');
      }
      notification.success({ message: 'Instituto eliminado correctamente' });
      setIsLoading(true);
      setIsMenuLoading(true);
    } catch (error) {
      notification.error({ message: 'No fue posible eliminar el instituto' });
    }
  }

  const handleEdit = (instituto) => {
    setIsModalEditOpen(true);
    setselectedInstituto(instituto);
  }

  const handleCreate = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <Spin spinning={isLoading}>
        <Flex wrap gap={28} align="center" justify="center">

          {
            institutosData.length
              ? institutosData.map(instituto => (
                <DataCard
                  key={instituto.id}
                  title={instituto.nombre}
                  description={instituto.codigo}
                  onClick={() => navigate(`/app/areas_academicas/${instituto.id}`)}
                  onDelete={() => handleDelete(instituto.id)}
                  onEdit={() => handleEdit(instituto)}
                  icon={<FaUniversity size={45} />}
                />
              ))
              : <Empty description='No hay institutos registrados' >
              </Empty>
          }


          <FloatButton
            icon={<RiAddLargeFill />}
            tooltip='Agregar Instituto'
            onClick={handleCreate}
          />
          <CrearInstituto isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsReloading={setIsLoading} />
          <EditInstituto isOpen={isModalEditOpen} selectedInstituto={selectedInstituto} setIsModalOpen={setIsModalEditOpen} setIsReloading={setIsLoading} />
        </Flex>
      </Spin>
    </>
  )
}

export default InstitutosList