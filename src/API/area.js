const BASE_URL = 'http://localhost:3000/API/';

export const createAreaAcademica = async (areaData) => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(areaData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear el área académica');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateAreaAcademica = async (id, areaData) => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(areaData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar el área académica');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteAreaAcademica = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el área académica');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getAreaAcademicaById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el área académica');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getAreaAcademicaByInstituto = async (institutoId) => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/instituto/${institutoId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener las áreas académicas por instituto');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getAreasAcademicas = async () => {
    try {
        const response = await fetch(`${BASE_URL}areas_academicas/`);
        if (!response.ok) {
            throw new Error('No se pudo obtener las áreas académicas');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
