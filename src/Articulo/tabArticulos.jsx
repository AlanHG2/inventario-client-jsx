import { Button, Flex, FloatButton, Table, notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { RiAddLargeFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { deleteArticulo, getArticulosByEspacio } from '../API/articulo';
import CreateArtículo from './CreateArticulo';
import EditArticulo from './EditArticulo';


const TabArticulos = () => {
  const [data, setData] = useState([]);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id_espacio } = useParams();

  const fetchArticulos = useCallback(async () => {
    try {
      const data = await getArticulosByEspacio(id_espacio);
      setData(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id_espacio]);

  useEffect(() => {
    if (id_espacio) {
      fetchArticulos();
    }
  }, [fetchArticulos, id_espacio]);

  useEffect(() => {
    if (isLoading) {
      fetchArticulos();
    }
  }, [fetchArticulos, isLoading]);

  const handleEdit = (value) => {
    setIsFormEditOpen(true);
    setSelectedArticulo(value)
  }

  const handleDelete = async (id_articulo) => {
    try {
      const deletedArticulo = await deleteArticulo(id_articulo);
      if (!deletedArticulo) {
        throw new Error('No fue posible eliminar el artículo');
      }
      notification.success({ message: 'Artículo eliminado correctamente' });
      setIsLoading(true);
    } catch (error) {
      notification.error({ message: 'No fue posible eliminar el artículo' });
    }
  }

  const columns = [
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
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
      render: (text, record) => {
        const categoriaNombre = record.categoria.nombre;
        return categoriaNombre;
      },
    },
    {
      title: 'Posición',
      dataIndex: 'posicion',
      key: 'posicion',
    },
    {
      title: 'Características',
      dataIndex: 'caracteristicas',
      key: 'caracteristicas',
      render: (text, record) => {
        const caracteristicas = record.caracteristicas;
        const caracteristicasString = Object.entries(caracteristicas).map(([key, value], index) => (
          <p key={`${record.id}-${key}-${index}`}>{key}: {value}<br /></p>
        ));
        return <div key={record.nombre + record.id}>{caracteristicasString}</div>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Flex gap={8} vertical key={record.id}>
          <Button type="primary" onClick={() => handleEdit(record)} icon={<BiEdit />}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)} icon={<BiTrash />}>
            Delete
          </Button>
        </Flex>
      ),
    }
  ];

  return (
    <Flex wrap gap={28} align="center" justify="center" >
      <Table columns={columns} scroll={{ x: true }} dataSource={data} loading={isLoading} />
      <FloatButton
        icon={<RiAddLargeFill />}
        tooltip='Agregar articulo'
        onClick={() => setIsFormCreateOpen(!isFormCreateOpen)}
      />

      <CreateArtículo
        isOpen={isFormCreateOpen} setIsModalOpen={setIsFormCreateOpen}
        setIsReloading={setIsLoading} espacio_id={id_espacio}
      />
      <EditArticulo
        isOpen={isFormEditOpen} setIsModalOpen={setIsFormEditOpen}
        setIsReloading={setIsLoading} espacio_id={id_espacio}
        selectedArticulo={selectedArticulo}
      />
    </Flex>
  )

};

export default TabArticulos;