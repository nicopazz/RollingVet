import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { borrarPacienteAPI, obtenerPacientesAPI } from '../../helpers/queries';

const AdministrarPacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState(""); 
    const navigate = useNavigate();

    const consultarAPI = useCallback(async () => {
        const respuesta = await obtenerPacientesAPI();
        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            setPacientes(datos);
        } else {
            Swal.fire("Ocurrió un error", "Intente mas tarde", "error");
        }
    }, []);

    useEffect(() => {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));
        if (!usuarioLogueado) {
            navigate('/login');
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            consultarAPI();
        }
    }, [consultarAPI, navigate]);

    const borrarPaciente = (id) => {
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
                const respuesta = await borrarPacienteAPI(id);
                if (respuesta && respuesta.status === 200) {
                    Swal.fire('Borrado!', 'El paciente ha sido eliminado.', 'success');
                    consultarAPI(); 
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el paciente', 'error');
                }
            }
        })
    };

    
    const pacientesFiltrados = pacientes.filter(paciente => 
        paciente.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()) || 
        (paciente.apellidoDuenio || paciente.apellidoDueño || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Container fluid className="mainSection my-5 px-5">
           
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold text-dark">Gestión de Pacientes</h1>
                
                <div className="d-flex gap-3">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control 
                            placeholder="Buscar..." 
                            className="border-start-0 ps-0 shadow-none"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </InputGroup>
                    
                    
                    <Link to="/administrador/crear-paciente" className="btn btn-success rounded-pill px-3 d-flex align-items-center text-white">
                        <i className="bi bi-plus-circle me-2"></i>Nuevo Paciente
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
                                <th className="py-3">Especie / Raza</th>
                                <th className="py-3">Dueño</th>
                                <th className="py-3">Contacto</th>
                                <th className="py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientesFiltrados.length > 0 ? (
                                pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente._id} className="border-bottom">
                                        <td className="ps-4 fw-bold text-primary fs-5">{paciente.nombreMascota}</td>
                                        <td>
                                            <span className="badge bg-secondary me-2">{paciente.especie}</span>
                                            <span className="text-muted small">{paciente.raza}</span>
                                        </td>
                                        <td className="fw-semibold">
                                            
                                            {paciente.apellidoDuenio || paciente.apellidoDueño}, {paciente.nombreDuenio || paciente.nombreDueño}
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column small text-muted">
                                                <span><i className="bi bi-envelope me-2"></i>{paciente.emailDuenio || paciente.emailDueño}</span>
                                                <span><i className="bi bi-telephone me-2"></i>{paciente.telefonoDuenio || paciente.telefonoDueño}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link 
                                                    to={`/administrador/editar-paciente/${paciente._id}`} 
                                                    className="btn btn-warning btn-sm text-white rounded-2" 
                                                    title="Editar"
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <Button 
                                                    variant="danger" 
                                                    className="btn-sm rounded-2" 
                                                    onClick={() => borrarPaciente(paciente._id)}
                                                    title="Borrar"
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No se encontraron pacientes que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
                
                <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
                    Mostrando {pacientesFiltrados.length} resultados
                </Card.Footer>
            </Card>
            
            <div className="mt-4">
                <Link to="/administrador" className="btn btn-secondary px-4">
                    <i className="bi bi-arrow-left me-2"></i>Volver al Panel Principal
                </Link>
            </div>
        </Container>
    );
};

export default AdministrarPacientes;