import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registrarUsuarioAPI } from '../../helpers/queries';

const Registro = () => {
    const [inputs, setInputs] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errores, setErrores] = useState({});
    const navigate = useNavigate(); 

    const handleChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
    };

    const validate = () => {
        let errors = {};
        if (!inputs.nombre.trim()) errors.nombre = "El nombre es obligatorio";
        if (!inputs.email.trim()) errors.email = "El email es obligatorio";
        if (inputs.password.length < 6) errors.password = "La contraseña debe tener al menos 6 caracteres";
        if (inputs.password !== inputs.confirmPassword) errors.confirmPassword = "Las contraseñas no coinciden";
        return errors;
    };

   
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrores(errs);
            return; 
        }

        try {
            
            const respuesta = await registrarUsuarioAPI(inputs);

            
            if(respuesta.status === 201 || respuesta.status === 200){
                setErrores({});
                
                
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'Ahora puedes iniciar sesión con tu cuenta.',
                    icon: 'success',
                    confirmButtonText: 'Iniciar Sesión',
                    confirmButtonColor: '#0d6efd' 
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login'); 
                    }
                });

            } else {
                const data = await respuesta.json(); 
                Swal.fire({
                    title: 'Ocurrió un error',
                    text: data.mensaje || 'No se pudo crear el usuario',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error de conexión',
                text: 'Intente nuevamente más tarde',
                icon: 'error'
            });
        }
    };

    return (
        <Container className="mainSection d-flex justify-content-center align-items-center my-5">
            <Card className="shadow-lg" style={{ width: '30rem' }}>
                <Card.Header className="bg-primary text-white text-center fw-bold py-3">
                    <h4>Crear Cuenta</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: Juan Perez" 
                                name="nombre"
                                maxLength={50}
                                value={inputs.nombre}
                                onChange={handleChange}
                                isInvalid={!!errores.nombre}
                            />
                            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="ejemplo@rollingvet.com" 
                                name="email"
                                maxLength={50}
                                value={inputs.email}
                                onChange={handleChange}
                                isInvalid={!!errores.email}
                            />
                            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Mínimo 6 caracteres" 
                                name="password"
                                maxLength={40}
                                value={inputs.password}
                                onChange={handleChange}
                                isInvalid={!!errores.password}
                            />
                            <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Repite tu contraseña" 
                                name="confirmPassword"
                                maxLength={40}
                                value={inputs.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errores.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errores.confirmPassword}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Registrarse
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center py-3 text-muted">
                    ¿Ya tienes cuenta? <Link to="/login" className="fw-bold text-decoration-none">Ingresa aquí</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Registro;