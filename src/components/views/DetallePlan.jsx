import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const DetallePlan = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    
    const planSeleccionado = location.state?.plan || "Consulta General";

    const form = useRef();
    const [validated, setValidated] = useState(false);
    const [enviando, setEnviando] = useState(false);

   
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        const TEMPLATE_ID = 'template_wnr1wgy'; 
        const PUBLIC_KEY = 'xaKX1oyBUww0FNBgE';   

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                Swal.fire({
                    title: '¡Consulta Enviada!',
                    text: `Gracias por interesarte en el plan "${planSeleccionado}". Te contactaremos a la brevedad.`,
                    icon: 'success',
                    confirmButtonColor: '#0d6efd'
                });
                formulario.reset();
                setValidated(false);
                setTimeout(() => navigate('/'), 3000);
            }, (error) => {
                console.log(error.text);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu consulta. Por favor intenta más tarde.',
                    icon: 'error',
                });
            })
            .finally(() => setEnviando(false));
    };

    return (
        <Container className="mainSection my-5 d-flex justify-content-center">
            <Card className="shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Header className="bg-primary text-white fw-bold text-center">
                    <h4>Solicitud de Plan</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-muted small mb-4">
                        Estás consultando por el plan: <span className="fw-bold text-primary">{planSeleccionado}</span>.
                    </p>
                    
                    <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
                        
                        <input type="hidden" name="plan_nombre" value={planSeleccionado} />

                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label className="fw-bold">Nombre y Apellido</Form.Label>
                            <Form.Control 
                                required 
                                type="text" 
                                name="user_name" 
                                placeholder="Ej: Juan Pérez" 
                            />
                            <Form.Control.Feedback type="invalid">Por favor ingresa tu nombre.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className="fw-bold">Email de Contacto</Form.Label>
                            <Form.Control 
                                required 
                                type="email" 
                                name="user_email" 
                                placeholder="Ej: juan@email.com" 
                            />
                            <Form.Control.Feedback type="invalid">Ingresa un email válido.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTelefono">
                            <Form.Label className="fw-bold">Teléfono / WhatsApp</Form.Label>
                            <Form.Control 
                                required 
                                type="tel" 
                                name="user_phone" 
                                placeholder="Ej: 381 123 4567" 
                            />
                            <Form.Control.Feedback type="invalid">Ingresa un teléfono de contacto.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConsulta">
                            <Form.Label className="fw-bold">Comentarios o Dudas</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                name="message" 
                                rows={3} 
                                placeholder="Cuéntanos sobre tu mascota..." 
                            />
                        </Form.Group>

                        <div className="text-end pt-3">
                            <Button 
                                variant="secondary" 
                                className="me-2" 
                                onClick={() => navigate('/')}
                                disabled={enviando}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="px-4"
                                disabled={enviando}
                            >
                                {enviando ? 'Enviando...' : 'Enviar Consulta'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetallePlan;