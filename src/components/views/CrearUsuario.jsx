import { useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearUsuarioAdminAPI, obtenerUsuariosAPI } from '../../helpers/queries';

const CrearUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('usuario');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!nombre || !email || !password){
             Swal.fire("Error", "Todos los campos son obligatorios", "error"); return;
        }
        
        
        const res = await obtenerUsuariosAPI();
        if(res.status === 200){
            const users = await res.json();
            if(users.find(u => u.email === email)){
                Swal.fire("Error", "El email ya existe", "error"); return;
            }
        }

        const nuevoUsuario = { nombre, email, password, role };
        
        Swal.fire({ title: 'Guardando...', didOpen: () => Swal.showLoading() });
        const respuesta = await crearUsuarioAdminAPI(nuevoUsuario);

        if(respuesta && respuesta.status === 201){
            Swal.fire("Éxito", "Usuario creado", "success");
            navigate('/administrador', { state: { section: 'usuarios' } });
        } else {
            Swal.fire("Error", "No se pudo crear el usuario", "error");
        }
    };

    const handleCancelar = () => navigate('/administrador', { state: { section: 'usuarios' } });

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white fw-bold"><h4>Nuevo Usuario</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" onChange={(e)=>setNombre(e.target.value)}/></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" onChange={(e)=>setEmail(e.target.value)}/></Form.Group>
                        <Row>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>Contraseña</Form.Label><Form.Control type="password" onChange={(e)=>setPassword(e.target.value)}/></Form.Group></Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Select value={role} onChange={(e)=>setRole(e.target.value)}>
                                        <option value="usuario">Usuario</option>
                                        <option value="admin">Administrador</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
export default CrearUsuario;