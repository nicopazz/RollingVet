import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { obtenerMisTurnosAPI } from '../../helpers/queries';

const MisTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const navigate = useNavigate();
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));

    
    useEffect(() => {
        if (!usuarioLogueado) {
            navigate('/login');
        }
    }, [usuarioLogueado, navigate]);

    
    const consultarAPI = useCallback(async () => {
        if (!usuarioLogueado || !usuarioLogueado.email) return;

        try {
           
            const urlFiltro = `/turnos?email=${usuarioLogueado.email}`;
            const respuesta = await fetch(obtenerMisTurnosAPI + urlFiltro);

            if (respuesta && respuesta.status === 200) {
                const datos = await respuesta.json();
                setTurnos(datos);
            } else {
                Swal.fire("Error", "No se pudieron cargar tus turnos.", "error");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            Swal.fire("Error", "Ocurrió un error de conexión.", "error");
        }
        
    }, [usuarioLogueado]);

    useEffect(() => {
        if (usuarioLogueado) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            consultarAPI();
        }
    }, [consultarAPI, usuarioLogueado]);

    if (!usuarioLogueado) return null; 

    return (
        <Container className="mainSection my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 fw-bold">Mis Turnos</h1>
                <Link to="/reservar-turno" className="btn btn-primary rounded-pill px-4">
                    <i className="bi bi-calendar-plus me-2"></i>Reservar Nuevo
                </Link>
            </div>
            <hr className="mb-4" />

            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 ps-4">Mascota</th>
                                <th className="py-3">Veterinario</th>
                                <th className="py-3">Fecha</th>
                                <th className="py-3">Hora</th>
                                <th className="py-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.length > 0 ? (
                                turnos.map((turno) => (
                                    <tr key={turno._id} className="border-bottom">
                                        <td className="ps-4 fw-semibold text-primary">{turno.mascota}</td>
                                        <td>{turno.veterinario}</td>
                                        <td>{new Date(turno.fecha).toLocaleDateString()}</td>
                                        <td>{turno.hora} hs</td>
                                        <td className="text-center">
                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                turno.estado === 'realizado' ? 'bg-success' : 
                                                turno.estado === 'cancelado' ? 'bg-danger' : 
                                                'bg-warning text-dark'
                                            }`}>
                                                {turno.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">Aún no tienes turnos reservados.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
                    Turnos encontrados: {turnos.length}
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default MisTurnos;