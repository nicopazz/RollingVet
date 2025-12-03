import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <>
            <section 
                className="py-5 text-white d-flex align-items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.masquevets.com/images/blog/post9/Plan_de_marketing_veterinario.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '85vh'
                }}
            >
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <h1 className="display-3 fw-bold">Cuidado experto y corazón para tu mejor amigo.</h1>
                            <p className="lead mb-4">
                                En [RollingVet], tratamos a tus mascotas como si fueran nuestra propia familia. Medicina veterinaria avanzada con un toque humano en Tucumán.
                            </p>
                            
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <Button as={Link} to="/registro" variant="primary" size="lg" className="rounded-pill px-4 fw-bold">
                                    RESERVAR TURNO
                                </Button>
                                <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
                                    CONTACTARNOS
                                </Button>
                            </div>

                            <p className="mt-4 small text-white-50">
                                <i className="bi bi-telephone-fill me-2"></i>
                                ¿Es una emergencia? Llámanos al 123-456-7890
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Banner de Emergencia */}
            <div className="bg-danger text-white py-3 text-center fw-bold">
                <Container>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    ¿EMERGENCIA VETERINARIA? Estamos disponibles 24/7. Llama inmediatamente al 911-VET-HELP.
                </Container>
            </div>

            {/* Sección de Servicios */}
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Nuestros Servicios Principales</h2>
                        <p className="text-secondary">Ofrecemos una amplia gama de soluciones para la salud de tu mascota.</p>
                    </div>
                    <Row>
                        <Col md={6} lg={3} className="mb-4">
                            <Card className="border-0 h-100 text-center shadow-sm hover-effect">
                                <Card.Body>
                                    <i className="bi bi-heart-pulse text-primary display-4 mb-3"></i>
                                    <Card.Title className="fw-bold">Medicina Preventiva</Card.Title>
                                    <Card.Text className="text-muted small">
                                        Chequeos regulares y vacunación para mantener a tu mascota sana y feliz por más tiempo.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3} className="mb-4">
                            <Card className="border-0 h-100 text-center shadow-sm">
                                <Card.Body>
                                    <i className="bi bi-bandaid text-primary display-4 mb-3"></i>
                                    <Card.Title className="fw-bold">Cirugía</Card.Title>
                                    <Card.Text className="text-muted small">
                                        Instalaciones modernas para intervenciones quirúrgicas y recuperación segura.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3} className="mb-4">
                            <Card className="border-0 h-100 text-center shadow-sm">
                                <Card.Body>
                                    <i className="bi bi-search text-primary display-4 mb-3"></i>
                                    <Card.Title className="fw-bold">Diagnóstico</Card.Title>
                                    <Card.Text className="text-muted small">
                                        Laboratorio propio y diagnóstico por imágenes para detectar problemas a tiempo.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={3} className="mb-4">
                            <Card className="border-0 h-100 text-center shadow-sm">
                                <Card.Body>
                                    <i className="bi bi-emoji-smile text-primary display-4 mb-3"></i>
                                    <Card.Title className="fw-bold">Odontología</Card.Title>
                                    <Card.Text className="text-muted small">
                                        Cuidado dental integral para prevenir enfermedades y mal aliento.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Inicio;