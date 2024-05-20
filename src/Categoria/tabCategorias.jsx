import { Button, Flex, FloatButton, Table, notification } from 'antd';
import { useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { RiAddLargeFill } from 'react-icons/ri';
import { deleteCategoria, getCategorias } from '../API/categoria';
import '../styles/tabCategoria.css';
import CreateCategoria from './CreateCategoria';
import EditCategoria from './EditCategoria';

const TabCateg = () => {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isloading) {
      fetchCategorias();
    }
  }, [isloading]);

  const editRow = (record) => {
    setIsFormEditOpen(true);
    setSelectedCategoria(record);
  };

  const deleteRow = async (key) => {
    try {
      const deletedCategoria = await deleteCategoria(key);
      if (!deletedCategoria) {
        throw new Error('No fue posible eliminar la categoría');
      }
      notification.success({ message: 'Categoría eliminada correctamente' });
      setIsLoading(true);
    } catch (error) {
      notification.error({ message: 'No fue posible eliminar la categoría' });
      console.error(error)
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Flex gap={8} key={record.id}>
          <Button type="primary" onClick={() => editRow(record)} icon={<BiEdit />} block>
            Edit
          </Button>
          <Button danger onClick={() => deleteRow(record.id)} icon={<BiTrash />} block>
            Delete
          </Button>
        </Flex>
      ),
    }
  ];

  return (
    <>
      <Table
        dataSource={data} scroll={{ x: true }} columns={columns}
        tableLayout='auto' className='tabla-categoria' loading={isloading}
      />
      <FloatButton
        icon={<RiAddLargeFill />}
        tooltip='Agregar categoría'
        onClick={() => setIsFormCreateOpen(!isFormCreateOpen)}
      />
      <CreateCategoria
        isOpen={isFormCreateOpen} setIsModalOpen={setIsFormCreateOpen}
        setIsReloading={setIsLoading}
      />
      <EditCategoria
        isOpen={isFormEditOpen} setIsModalOpen={setIsFormEditOpen}
        setIsReloading={setIsLoading} selectedCategoria={selectedCategoria}
      />
    </>
  );
};

export default TabCateg;
