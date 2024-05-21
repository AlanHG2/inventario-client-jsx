const BASE_URL = 'http://localhost:3000/API/'; 

export const createArticulo = async (articuloData) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear el artículo');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateArticulo = async (id, articuloData) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar el artículo');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteArticulo = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el artículo');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getArticuloById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el artículo');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getArticulosByCategoria = async (categoriaId) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/categoria/${categoriaId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los artículos por categoría');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getArticulosByEspacio = async (espacioId) => {
    try {
        const response = await fetch(`${BASE_URL}articulos/espacio/${espacioId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los artículos por espacio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getArticulos = async () => {
    try {
        const response = await fetch(`${BASE_URL}articulos/`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los artículos');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
