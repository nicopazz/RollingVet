import { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarUsuarioAPI, obtenerUsuarioPorIdAPI } from '../../helpers/queries';

const EditarUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await obtenerUsuarioPorIdAPI(id);
            if(respuesta && respuesta.status === 200){
                const usuario = await respuesta.json();
                setNombre(usuario.nombre);
                setEmail(usuario.email);
                setRole(usuario.role);
            } else {
                Swal.fire("Error", "No se pudo obtener el usuario", "error");
            }
        };
        cargarDatos();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nombre || !email || !role){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

        const usuarioEditado = { nombre, email, role };
        
        Swal.fire({ title: 'Actualizando...', didOpen: () => Swal.showLoading() });
        const respuesta = await editarUsuarioAPI(usuarioEditado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "Usuario editado correctamente", "success");
            navigate('/administrador', { state: { section: 'usuarios' } });
        } else {
            Swal.fire("Error", "No se pudo editar", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador', { state: { section: 'usuarios' } });
    };

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark fw-bold"><h4>Editar Usuario</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="usuario">Usuario</option>
                                <option value="admin">Administrador</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
                            <Button variant="warning" type="submit">Guardar Cambios</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarUsuario;