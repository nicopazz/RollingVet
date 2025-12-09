import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { borrarProfesionalAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const AdministrarProfesionales = () => {
    const [profesionales, setProfesionales] = useState([]);
    const [busqueda, setBusqueda] = useState(""); 
    const navigate = useNavigate();

    const consultarAPI = useCallback(async () => {
        const respuesta = await obtenerProfesionalesAPI();
        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            setProfesionales(datos);
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

    const borrarProfesional = (id) => {
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
                const respuesta = await borrarProfesionalAPI(id);
                if (respuesta && respuesta.status === 200) {
                    Swal.fire('Borrado!', 'El profesional ha sido eliminado.', 'success');
                    consultarAPI();
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el profesional', 'error');
                }
            }
        })
    };

    // Filtrado
    const profFiltrados = profesionales.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        p.especialidad.toLowerCase().includes(busqueda.toLowerCase())
    );


    return (
        <div className="px-4 py-3">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold text-dark">Gestión de Personal</h1>
                <div className="d-flex gap-3">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><i className="bi bi-search text-muted"></i></InputGroup.Text>
                        <Form.Control 
                            placeholder="Buscar nombre o especialidad..." 
                            className="border-start-0 ps-0 shadow-none"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </InputGroup>
                    <Link to="/administrador/crear-profesional" className="btn btn-info text-white rounded-pill px-3 d-flex align-items-center">
                        <i className="bi bi-person-plus-fill me-2"></i>Nuevo Profesional
                    </Link>
                </div>
            </div>
            
            <hr className="mb-4" />

            
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 ps-4">Foto</th>
                                <th className="py-3">Nombre</th>
                                <th className="py-3">Especialidad</th>
                                <th className="py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profesionales.length > 0 ? (
                                profFiltrados.map((pro) => (
                                    <tr key={pro._id} className="border-bottom">
                                        <td className="ps-4">
                                            <img 
                                                src={pro.imagen} 
                                                alt={pro.nombre} 
                                                className="rounded-circle object-fit-cover border"
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td className="fw-semibold text-primary">{pro.nombre}</td>
                                        <td><span className="badge bg-info text-white">{pro.especialidad}</span></td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link to={`/administrador/editar-profesional/${pro._id}`} className="btn btn-warning btn-sm text-white rounded-2">
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
                                                <Button variant="danger" className="btn-sm rounded-2" onClick={() => borrarProfesional(pro._id)}>
                                                    <i className="bi bi-trash-fill"></i>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">No hay profesionales registrados</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
                    Mostrando {profFiltrados.length} resultados
                </Card.Footer>
            </Card>
        </div>
    );
};

export default AdministrarProfesionales;