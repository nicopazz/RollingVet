import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Alert } from 'react-bootstrap';
import { obtenerTurnosAPI, obtenerPacientesAPI } from '../../helpers/queries';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [turnosHoy, setTurnosHoy] = useState([]);
    const [resumen, setResumen] = useState({ totalPacientes: 0, turnosPendientes: 0 });
    const usuario = JSON.parse(localStorage.getItem('usuarioRollingVet')) || { nombre: 'Admin' };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                
                const resTurnos = await obtenerTurnosAPI();
                if (resTurnos.status === 200) {
                    const dataTurnos = await resTurnos.json();
                    
                    
                    const hoyString = new Date().toISOString().split('T')[0]; 
                    const delDia = dataTurnos.filter(t => t.fecha.startsWith(hoyString));
                    
                    setTurnosHoy(delDia);
                    setResumen(prev => ({ ...prev, turnosPendientes: dataTurnos.length }));
                }

                
                const resPacientes = await obtenerPacientesAPI();
                if (resPacientes.status === 200) {
                    const dataPacientes = await resPacientes.json();
                    setResumen(prev => ({ ...prev, totalPacientes: dataPacientes.length }));
                }
            } catch (error) {
                console.log(error);
            }
        };
        cargarDatos();
    }, []);

    return (
        <div className="px-4 py-3">
            
            <div className="mb-4">
                <h1 className="display-5 fw-bold text-dark">Hola, {usuario.nombre}! 👋</h1>
                <p className="text-muted lead">Bienvenido al panel de administración de RollingVet.</p>
            </div>

            
            <Row className="mb-5 g-4">
                <Col md={6} lg={4}>
                    <Card className="border-0 shadow-sm h-100 border-start border-primary border-5">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase mb-2">Turnos para Hoy</h6>
                            <h2 className="display-4 fw-bold text-primary">{turnosHoy.length}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="border-0 shadow-sm h-100 border-start border-success border-5">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase mb-2">Pacientes Registrados</h6>
                            <h2 className="display-4 fw-bold text-success">{resumen.totalPacientes}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

           
            <h4 className="fw-bold mb-3 text-secondary">Agenda del Día ({new Date().toLocaleDateString()})</h4>
            
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    {turnosHoy.length > 0 ? (
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 ps-4">Hora</th>
                                    <th>Mascota</th>
                                    <th>Veterinario</th>
                                    <th>Motivo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnosHoy.sort((a,b) => a.hora.localeCompare(b.hora)).map(turno => (
                                    <tr key={turno._id}>
                                        <td className="ps-4 fw-bold">{turno.hora} hs</td>
                                        <td className="text-primary fw-semibold">{turno.mascota}</td>
                                        <td>{turno.veterinario}</td>
                                        <td className="small text-muted">{turno.detalleCita}</td>
                                        <td>
                                            <span className={`badge rounded-pill ${
                                                turno.estado === 'realizado' ? 'bg-success' : 'bg-warning text-dark'
                                            }`}>
                                                {turno.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="p-5 text-center">
                            <i className="bi bi-calendar-x text-muted fs-1 mb-3 d-block"></i>
                            <p className="text-muted">No hay turnos programados para hoy.</p>
                            <Link to="/administrador/crear-turno" className="btn btn-outline-primary rounded-pill">
                                Agendar Turno
                            </Link>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;