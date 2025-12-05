import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUsuarioAPI } from '../../helpers/queries';

const Login = () => {
    
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate(); 

    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
      
        if (!inputs.email || !inputs.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor completa todos los campos'
            });
            return;
        }

        
        Swal.fire({
            title: 'Iniciando sesión...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        
        const respuesta = await loginUsuarioAPI(inputs);

        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            
            localStorage.setItem('usuarioRollingVet', JSON.stringify({
                token: datos.token,
                nombre: datos.nombre,
                rol: datos.rol,
                uid: datos.uid
            }));

            
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Ingresaste correctamente',
                icon: 'success',
                timer: 1500, 
                showConfirmButton: false 
            }).then(() => {
                navigate('/');
            });
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de acceso',
                text: 'Email o contraseña incorrectos',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <Container className="mainSection d-flex justify-content-center align-items-center my-5">
            <Card className="shadow-lg border-0" style={{ width: '25rem' }}>
                <Card.Header className="bg-primary text-white text-center fw-bold py-3">
                    <h4 className="mb-0">Iniciar Sesión</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="ejemplo@rollingvet.com" 
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="********" 
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                required 
                                minLength={8}
                            />
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg" className="fw-bold">
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center py-3 bg-white border-top-0">
                    <small className="text-muted">¿No tienes cuenta? <Link to="/registro" className="fw-bold text-decoration-none">Regístrate aquí</Link></small>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Login;