const BASE_URL = 'http://localhost:3000/API/'; // Reemplaza esto con la URL de tu API

export const createCategoria = async (categoriaData) => {
    try {
        const response = await fetch(`${BASE_URL}categorias/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoriaData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear la categoría');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateCategoria = async (id, categoriaData) => {
    try {
        const response = await fetch(`${BASE_URL}categorias/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoriaData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar la categoría');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCategoria = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}categorias/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar la categoría');
        }
        return response; // Puedes cambiar esto si la API devuelve un mensaje de éxito
    } catch (error) {
        console.error(error);
    }
}

export const getCategoriaById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}categorias/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la categoría');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getCategorias = async () => {
    try {
        const response = await fetch(`${BASE_URL}categorias/`);
        if (!response.ok) {
            throw new Error('No se pudo obtener las categorías');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
