const URL_USUARIO = import.meta.env.VITE_API_URL + '/auth';
const URL_TURNOS = import.meta.env.VITE_API_URL + '/turnos';

// --- USUARIOS ---

export const registrarUsuarioAPI = async (usuario) => {
    try {
        const respuesta = await fetch(URL_USUARIO + '/registro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        
        
        return respuesta;
        
    } catch (error) {
        console.log("Error en registrarUsuarioAPI:", error);
        return false;
    }
}

export const loginUsuarioAPI = async (usuario) => {
    try {
        const respuesta = await fetch(URL_USUARIO + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en loginUsuarioAPI:", error);
        return false;
    }
}


// --- TURNOS ---

export const obtenerTurnosAPI = async () => {
    try {
        const respuesta = await fetch(URL_TURNOS);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerTurnosAPI", error);
        return false;
    }
}

export const borrarTurnoAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;

        const respuesta = await fetch(`${URL_TURNOS}/${id}`, {
            method: "DELETE",
            headers: {
                "x-token": token 
            }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarTurnoAPI", error);
        return false;
    }
}

export const crearTurnoAPI = async (turno) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;

        const respuesta = await fetch(URL_TURNOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(turno)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearTurnoAPI", error);
        return false;
    }
}


export const editarTurnoAPI = async (turno, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;

        const respuesta = await fetch(`${URL_TURNOS}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(turno)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarTurnoAPI", error);
        return false;
    }
}


export const obtenerTurnoPorIdAPI = async (id) => {
    try {
        const respuesta = await fetch(`${URL_TURNOS}/${id}`);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerTurnoPorIdAPI", error);
        return false;
    }
}

// --- SERVICIOS ---

export const obtenerServiciosAPI = async () => {
    try {
        const respuesta = await fetch(URL_SERVICIOS);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerServiciosAPI", error);
        return false;
    }
}

export const crearServicioAPI = async (servicio) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_SERVICIOS, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(servicio)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearServicioAPI", error);
        return false;
    }
}

export const borrarServicioAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_SERVICIOS}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarServicioAPI", error);
        return false;
    }
}

export const obtenerServicioPorIdAPI = async (id) => {
    try {
        const respuesta = await fetch(`${URL_SERVICIOS}/${id}`);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerServicioPorIdAPI", error);
        return false;
    }
}

export const editarServicioAPI = async (servicio, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_SERVICIOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(servicio)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarServicioAPI", error);
        return false;
    }
}