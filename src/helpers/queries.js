const URL_USUARIO = import.meta.env.VITE_API_URL + '/auth';
const URL_TURNOS = import.meta.env.VITE_API_URL + '/turnos';
const URL_SERVICIOS = import.meta.env.VITE_API_URL + '/servicios';
const URL_PRODUCTOS = import.meta.env.VITE_API_URL + '/productos';
const URL_PROFESIONALES = import.meta.env.VITE_API_URL + '/profesionales';
const URL_PACIENTES = import.meta.env.VITE_API_URL + '/pacientes';
const URL_GESTION_USUARIOS = import.meta.env.VITE_API_URL + '/auth/usuarios';

// --- USUARIOS ---

export const registrarUsuarioAPI = async (usuario) => {
    try {
        const respuesta = await fetch(URL_USUARIO + '/registro', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en loginUsuarioAPI:", error);
        return false;
    }
}

// --- GESTIÓN DE USUARIOS ---

export const obtenerUsuariosAPI = async () => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_GESTION_USUARIOS, {
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerUsuariosAPI", error);
        return false;
    }
}

export const crearUsuarioAdminAPI = async (usuario) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_GESTION_USUARIOS, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(usuario)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearUsuarioAdminAPI", error);
        return false;
    }
}

export const borrarUsuarioAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_GESTION_USUARIOS}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarUsuarioAPI", error);
        return false;
    }
}

export const obtenerUsuarioPorIdAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_GESTION_USUARIOS}/${id}`, {
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerUsuarioPorIdAPI", error);
        return false;
    }
}

export const editarUsuarioAPI = async (usuario, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_GESTION_USUARIOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(usuario)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarUsuarioAPI", error);
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

export const crearTurnoAPI = async (turno) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_TURNOS, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(turno)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearTurnoAPI", error);
        return false;
    }
}

export const borrarTurnoAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_TURNOS}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarTurnoAPI", error);
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

export const editarTurnoAPI = async (turno, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_TURNOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(turno)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarTurnoAPI", error);
        return false;
    }
}

export const obtenerMisTurnosAPI = async () => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const email = usuarioLogueado.email; 

       
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/turnos?email=${email}`, {
            method: "GET",
            headers: {
                "x-token": token, 
                "Content-Type": "application/json"
            }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerMisTurnosAPI", error);
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

// --- PRODUCTOS ---

export const obtenerProductosAPI = async () => {
    try {
        const respuesta = await fetch(URL_PRODUCTOS);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerProductoAPI", error);
        return false;
    }
}

export const crearProductoAPI = async (producto) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_PRODUCTOS, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(producto)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearProductoAPI", error);
        return false;
    }
}

export const borrarProductoAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarProductoAPI", error);
        return false;
    }
}

export const obtenerProductoPorIdAPI = async (id) => {
    try {
        const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerProductoPorIdAPI", error);
        return false;
    }
}

export const editarProductoAPI = async (producto, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(producto)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarProductoAPI", error);
        return false;
    }
}

// --- PROFESIONALES ---

export const obtenerProfesionalesAPI = async () => {
    try {
        const respuesta = await fetch(URL_PROFESIONALES);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerProfesionalesAPI", error);
        return false;
    }
}

export const crearProfesionalAPI = async (profesional) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_PROFESIONALES, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(profesional)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearProfesionalAPI", error);
        return false;
    }
}

export const borrarProfesionalAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PROFESIONALES}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarProfesionalAPI", error);
        return false;
    }
}

export const obtenerProfesionalPorIdAPI = async (id) => {
    try {
        const respuesta = await fetch(`${URL_PROFESIONALES}/${id}`);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerProfesionalPorIdAPI", error);
        return false;
    }
}

export const editarProfesionalAPI = async (profesional, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PROFESIONALES}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(profesional)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarProfesionalAPI", error);
        return false;
    }
}

// --- PACIENTES ---

export const obtenerPacientesAPI = async () => {
    try {
        const respuesta = await fetch(URL_PACIENTES);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerPacientesAPI", error);
        return false;
    }
}

export const crearPacienteAPI = async (paciente) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(URL_PACIENTES, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(paciente)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en crearPacienteAPI", error);
        return false;
    }
}

export const borrarPacienteAPI = async (id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PACIENTES}/${id}`, {
            method: "DELETE",
            headers: { "x-token": token }
        });
        return respuesta;
    } catch (error) {
        console.log("Error en borrarPacienteAPI", error);
        return false;
    }
}

export const obtenerPacientePorIdAPI = async (id) => {
    try {
        const respuesta = await fetch(`${URL_PACIENTES}/${id}`);
        return respuesta;
    } catch (error) {
        console.log("Error en obtenerPacientePorIdAPI", error);
        return false;
    }
}

export const editarPacienteAPI = async (paciente, id) => {
    try {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet')) || {};
        const token = usuarioLogueado.token;
        const respuesta = await fetch(`${URL_PACIENTES}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-token": token },
            body: JSON.stringify(paciente)
        });
        return respuesta;
    } catch (error) {
        console.log("Error en editarPacienteAPI", error);
        return false;
    }
}

