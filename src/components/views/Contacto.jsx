import { useState, useRef } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
    const navigate = useNavigate();
    const form = useRef();
    
    const [validated, setValidated] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formulario = e.currentTarget;

        if (formulario.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setEnviando(true);

        
        const SERVICE_ID = 'service_agn1fdc'; 
        const TEMPLATE_ID = 'template_2g9437b'; 
        const PUBLIC_KEY = 'xaKX1oyBUww0FNBgE';   

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    title: '¡Mensaje Enviado!',
                    text: 'Gracias por contactarnos. Te responderemos a la brevedad.',
                    icon: 'success',
                    confirmButtonColor: '#0d6efd'
                });
                formulario.reset();
                setValidated(false);
            }, (error) => {
                console.log(error.text);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.',
                    icon: 'error',
                });
            })
            .finally(() => setEnviando(false));
    };

    return (
        <Container className="mainSection my-5 d-flex justify-content-center">
            <Card className="shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Header className="bg-primary text-white fw-bold text-center">
                    <h4>Contáctanos</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-muted small mb-4 text-center">
                        ¿Tienes dudas o sugerencias? Escríbenos y nuestro equipo te ayudará.
                    </p>
                    
                    <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label className="fw-bold">Nombre Completo</Form.Label>
                            <Form.Control 
                                required 
                                type="text" 
                                name="user_name" 
                                maxLength={50}
                                placeholder="Ej: Juan Pérez" 
                            />
                            <Form.Control.Feedback type="invalid">Por favor ingresa tu nombre.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control 
                                required 
                                type="email" 
                                name="user_email" 
                                maxLength={40}
                                placeholder="Ej: juan@email.com" 
                            />
                            <Form.Control.Feedback type="invalid">Ingresa un email válido.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAsunto">
                            <Form.Label className="fw-bold">Asunto</Form.Label>
                            <Form.Select required name="subject">
                                <option value="">Selecciona un motivo</option>
                                <option value="Consulta General">Consulta General</option>
                                <option value="Sugerencia">Sugerencia</option>
                                <option value="Reclamo">Reclamo</option>
                                <option value="Otros">Otros</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona un asunto.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMensaje">
                            <Form.Label className="fw-bold">Mensaje</Form.Label>
                            <Form.Control 
                                required
                                as="textarea" 
                                name="message" 
                                maxLength={500}
                                rows={5} 
                                placeholder="Escribe tu mensaje aquí..." 
                            />
                            <Form.Control.Feedback type="invalid">El mensaje no puede estar vacío.</Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-end pt-3">
                            <Button 
                                variant="secondary" 
                                className="me-2" 
                                onClick={() => navigate('/')}
                                disabled={enviando}
                            >
                                Volver al Inicio
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="px-4"
                                disabled={enviando}
                            >
                                {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Contacto;