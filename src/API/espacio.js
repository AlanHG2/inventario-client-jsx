const BASE_URL = 'http://localhost:3000/API/'; // Reemplaza esto con la URL de tu API

export const createEspacio = async (espacioData) => {
    try {
        const response = await fetch(`${BASE_URL}espacios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(espacioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear el espacio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateEspacio = async (id, espacioData) => {
    try {
        const response = await fetch(`${BASE_URL}espacios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(espacioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar el espacio');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteEspacio = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}espacios/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el espacio');
        }
        return response; // Puedes cambiar esto si la API devuelve un mensaje de éxito
    } catch (error) {
        console.error(error);
    }
}

export const getEspacioById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}espacios/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el espacio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getEspaciosByEdificioId = async (edificioId) => {
    try {
        const response = await fetch(`${BASE_URL}espacios/edificio/${edificioId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los espacios por edificio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getEspacios = async () => {
    try {
        const response = await fetch(`${BASE_URL}espacios/`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los espacios');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
