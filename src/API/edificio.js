const BASE_URL = 'http://localhost:3000/API/';

export const createEdificio = async (edificioData) => {
    try {
        const response = await fetch(`${BASE_URL}edificios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edificioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear el edificio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateEdificio = async (id, edificioData) => {
    try {
        const response = await fetch(`${BASE_URL}edificios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edificioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar el edificio');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteEdificio = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}edificios/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el edificio');
        }
        return response; // Puedes cambiar esto si la API devuelve un mensaje de éxito
    } catch (error) {
        console.error(error);
    }
}

export const getEdificioById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}edificios/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el edificio');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getEdificiosByAreaId = async (areaId) => {
    try {
        const response = await fetch(`${BASE_URL}edificios/area_academica/${areaId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los edificios por área académica');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getEdificios = async () => {
    try {
        const response = await fetch(`${BASE_URL}edificios/`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los edificios');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
