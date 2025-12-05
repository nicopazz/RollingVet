import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { borrarProfesionalAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const AdministrarProfesionales = () => {
    const [profesionales, setProfesionales] = useState([]);
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


    return (
        <Container className="mainSection my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 fw-bold">Gestión de Profesionales</h1>
                <Link to="/administrador/crear-profesional" className="btn btn-primary rounded-pill">
                    <i className="bi bi-person-plus-fill me-2"></i>Nuevo Profesional
                </Link>
            </div>
            
            <hr />
            
            <Table striped bordered hover responsive className="shadow-sm align-middle mt-4">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {profesionales.length > 0 ? (
                        profesionales.map((pro) => (
                            <tr key={pro._id}>
                                <td className="text-center">
                                    <img 
                                        src={pro.imagen} 
                                        alt={pro.nombre} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        className="rounded-circle"
                                    />
                                </td>
                                <td>{pro.nombre}</td>
                                <td><span className="badge bg-info text-dark">{pro.especialidad}</span></td>
                                <td className="text-center" style={{ width: '150px' }}>
                                    <Link to={`/administrador/editar-profesional/${pro._id}`} className="btn btn-warning me-2 btn-sm text-white">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Button variant="danger" className="btn-sm" onClick={() => borrarProfesional(pro._id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No hay profesionales registrados</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            
            <div className="mt-4">
                <Link to="/administrador" className="btn btn-secondary">
                    <i className="bi bi-arrow-left me-2"></i>Volver al Panel Principal
                </Link>
            </div>
        </Container>
    );
};

export default AdministrarProfesionales;