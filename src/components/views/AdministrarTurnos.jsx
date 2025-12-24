import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { borrarTurnoAPI, obtenerTurnosAPI } from '../../helpers/queries';
import {  Link } from 'react-router-dom';

const AdministrarTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const consultarAPI = useCallback(async () => {
        const respuesta = await obtenerTurnosAPI();
        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            setTurnos(datos);
        } else {
            Swal.fire("Ocurrió un error", "Intente mas tarde", "error");
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        consultarAPI();
    }, [consultarAPI]);

    const borrarTurno = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir este paso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await borrarTurnoAPI(id);
                if (respuesta && respuesta.status === 200) {
                    Swal.fire('Borrado!', 'El turno ha sido eliminado.', 'success');
                    consultarAPI(); 
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el turno', 'error');
                }
            }
        })
    };


    const turnosFiltrados = turnos.filter(turno => 
        turno.mascota.toLowerCase().includes(busqueda.toLowerCase()) || 
        turno.veterinario.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="px-4 py-3">
           
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold text-dark">Gestión de Turnos</h1>
                <div className="d-flex gap-3">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><i className="bi bi-search text-muted"></i></InputGroup.Text>
                        <Form.Control 
                            placeholder="Buscar mascota o veterinario..." 
                            className="border-start-0 ps-0 shadow-none"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </InputGroup>
                    <Link to="/administrador/crear-turno" className="btn btn-primary rounded-pill px-3 d-flex align-items-center text-nowrap">
                        <i className="bi bi-plus-lg me-2"></i>Nuevo Turno
                    </Link>
                </div>
            </div>
            <hr className="mb-4" />
            
            
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 ps-4">Mascota</th>
                                <th className="py-3">Profesional</th>
                                 <th className="py-3">Descripcion</th>
                                <th className="py-3">Fecha</th>
                                <th className="py-3">Hora</th>
                                <th className="py-3">Estado</th>
                                <th className="py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnosFiltrados.length > 0 ? (
                                turnosFiltrados.map((turno) => (
                                    <tr key={turno._id} className="border-bottom">
                                        <td className="ps-4 fw-semibold text-primary">{turno.mascota}</td>
                                        <td>{turno.veterinario}</td>
                                        <td>{turno.detalleCita}</td>
                                        <td>{new Date(turno.fecha).toLocaleDateString('es-AR', { timeZone: 'UTC' })}</td>
                                        <td>{turno.hora} hs</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                turno.estado === 'realizado' ? 'bg-success' : 
                                                turno.estado === 'cancelado' ? 'bg-danger' : 
                                                'bg-warning text-dark'
                                            }`}>
                                                {turno.estado}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link 
                                                    to={`/administrador/editar-turno/${turno._id}`} 
                                                    className="btn btn-warning btn-sm text-white rounded-2" 
                                                    title="Editar"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <Button variant="danger" className="btn-sm rounded-2" onClick={() => borrarTurno(turno._id)} title="Borrar">
                                                    <i className="bi bi-trash-fill"></i>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">No hay turnos registrados</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
                    Mostrando {turnosFiltrados.length} resultados
                </Card.Footer>
            </Card>
        </div>
    );
};

export default AdministrarTurnos;