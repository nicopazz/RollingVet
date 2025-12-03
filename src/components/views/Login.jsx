import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    // Función para actualizar el estado cuando el usuario escribe
    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Datos a enviar:', inputs);
        
    };

    return (
        <Container className="mainSection d-flex justify-content-center align-items-center my-5">
            <Card className="shadow-lg" style={{ width: '25rem' }}>
                <Card.Header className="bg-primary text-white text-center fw-bold py-3">
                    <h4>Iniciar Sesión</h4>
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
                            <Button variant="primary" type="submit" size="lg">
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center py-3 text-muted">
                    ¿No tienes cuenta? <Link to="/registro" className="fw-bold text-decoration-none">Regístrate aquí</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Login;