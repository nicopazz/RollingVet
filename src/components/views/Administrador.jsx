import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Administrador = () => {
    const turnos = [
        { id: 1, mascota: "Firulais", duenio: "Juan Perez", veterinario: "Dr. House", fecha: "2023-12-25", hora: "10:30", estado: "pendiente" },
        { id: 2, mascota: "Mishi", duenio: "Maria Gomez", veterinario: "Dra. Grey", fecha: "2023-12-26", hora: "15:00", estado: "realizado" },
        { id: 3, mascota: "Boby", duenio: "Carlos Ruiz", veterinario: "Dr. House", fecha: "2023-12-27", hora: "09:15", estado: "pendiente" },
    ];

    return (
        <Container className="mainSection my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 fw-bold">Panel de Administración</h1>
                <div>
                    {/* Botones para futuras funcionalidades */}
                    <Button variant="primary" className="me-2 rounded-pill">
                        <i className="bi bi-calendar-plus me-2"></i>Nuevo Turno
                    </Button>
                    <Button variant="success" className="rounded-pill">
                        <i className="bi bi-person-plus-fill me-2"></i>Nuevo Paciente
                    </Button>
                </div>
            </div>
            
            <hr />

            {/* Sección de Turnos */}
            <h3 className="my-4 text-primary">
                <i className="bi bi-calendar-check me-2"></i>
                Listado de Turnos
            </h3>
            
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Mascota</th>
                        <th>Dueño</th>
                        <th>Veterinario</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map((turno) => (
                        <tr key={turno.id} className="align-middle">
                            <td>{turno.mascota}</td>
                            <td>{turno.duenio}</td>
                            <td>{turno.veterinario}</td>
                            <td>{turno.fecha}</td>
                            <td>{turno.hora}</td>
                            <td>
                                {/* Badge condicional según el estado */}
                                <span className={`badge ${turno.estado === 'realizado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                    {turno.estado}
                                </span>
                            </td>
                            <td className="text-center">
                                <Button variant="warning" className="me-2 text-white btn-sm" title="Editar">
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button variant="danger" className="btn-sm" title="Borrar">
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Aquí abajo podrías agregar otra tabla para Pacientes o Servicios */}
        </Container>
    );
};

export default Administrador;