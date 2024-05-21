const BASE_URL = 'http://localhost:3000/API/'; // Reemplaza esto con la URL de tu API

export const createUsuario = async (usuarioData) => {
    try {
        const response = await fetch(`${BASE_URL}usuarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo crear el usuario');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const getUsuarioById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}usuarios/${id}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el usuario');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateUsuario = async (id, usuarioData) => {
    try {
        const response = await fetch(`${BASE_URL}usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });
        if (!response.ok) {
            throw new Error('No se pudo actualizar el usuario');
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUsuario = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}usuarios/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('No se pudo eliminar el usuario');
        }
        return response.json(); // Puedes cambiar esto si la API devuelve un mensaje de éxito
    } catch (error) {
        console.error(error);
    }
}

export const authUsuario = async (authData) => {
    try {
        const response = await fetch(`${BASE_URL}auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });
        if (!response.ok) {
            throw new Error('No se pudo autenticar el usuario');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}