import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Card, Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { borrarUsuarioAPI, obtenerUsuariosAPI } from '../../helpers/queries';

const AdministrarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState(""); 
    const navigate = useNavigate();

    const consultarAPI = useCallback(async () => {
        const respuesta = await obtenerUsuariosAPI();
        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            setUsuarios(datos);
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

    const borrarUsuario = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el usuario y su acceso.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Borrar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await borrarUsuarioAPI(id);
                if (respuesta && respuesta.status === 200) {
                    Swal.fire('Borrado!', 'Usuario eliminado.', 'success');
                    consultarAPI(); 
                } else {
                    Swal.fire('Error', 'No se pudo eliminar', 'error');
                }
            }
        })
    };

    const usuariosFiltrados = usuarios.filter(user => 
        user.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        user.email.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Container fluid className="mainSection my-5 px-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-5 fw-bold text-dark">Gestión de Usuarios</h1>
                <div className="d-flex gap-3">
                    <InputGroup style={{ width: '300px' }}>
                        <InputGroup.Text className="bg-white border-end-0"><i className="bi bi-search text-muted"></i></InputGroup.Text>
                        <Form.Control className="border-start-0 ps-0 shadow-none" placeholder="Buscar..." onChange={(e) => setBusqueda(e.target.value)}/>
                    </InputGroup>
                    <Link to="/administrador/crear-usuario" className="btn btn-primary rounded-pill px-3 d-flex align-items-center">
                        <i className="bi bi-person-plus-fill me-2"></i>Nuevo Usuario
                    </Link>
                </div>
            </div>
            <hr className="mb-4" />
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="py-3 ps-4">Nombre</th>
                                <th className="py-3">Email</th>
                                <th className="py-3">Rol</th>
                                <th className="py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((user) => (
                                <tr key={user._id} className="border-bottom">
                                    <td className="ps-4 fw-bold text-primary">{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 py-2 ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/administrador/editar-usuario/${user._id}`} className="btn btn-warning btn-sm text-white rounded-2">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <Button variant="danger" className="btn-sm rounded-2" onClick={() => borrarUsuario(user._id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
                    Mostrando {usuariosFiltrados.length} usuarios
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default AdministrarUsuarios;