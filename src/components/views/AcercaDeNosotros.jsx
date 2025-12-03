import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AcercaDeNosotros = () => {
    // Datos simulados del equipo
    const equipo = [
        {
            id: 1,
            nombre: "Nicolas Paz",
            rol: "CEO & Fundador / Desarrollador",
            descripcion: "Líder del proyecto RollingVet. Apasionado por la tecnología y el bienestar animal.",
            imagen: "https://media.licdn.com/dms/image/v2/D4D03AQGXxddCqJOnKQ/profile-displayphoto-scale_200_200/B4DZpUOs.bGsAY-/0/1762349733184?e=1766620800&v=beta&t=llVytLSU9GfB5slOKfoDNw-DKl0jzK_vOJEsuvsT39s"
        },
        {
            id: 2,
            nombre: "Dra. Ana García",
            rol: "Veterinaria Jefe",
            descripcion: "Especialista en cirugía de pequeños animales con más de 10 años de experiencia.",
            imagen: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            nombre: "Carlos López",
            rol: "Asistente Veterinario",
            descripcion: "Encargado del cuidado y atención primaria de nuestros pacientes peludos.",
            imagen: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
    ];

    return (
        <Container className="mainSection my-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary">Nuestro Equipo</h1>
                <p className="lead text-secondary">
                    Conoce a los profesionales que hacen de RollingVet un lugar seguro para tu mascota.
                </p>
            </div>

            <Row className="justify-content-center">
                {equipo.map((miembro) => (
                    <Col md={6} lg={4} key={miembro.id} className="mb-4">
                        <Card className="border-0 shadow-sm h-100 text-center hover-card">
                            <Card.Body className="d-flex flex-column align-items-center">
                                <img 
                                    src={miembro.imagen} 
                                    alt={miembro.nombre} 
                                    className="rounded-circle mb-3 object-fit-cover"
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <Card.Title className="fw-bold">{miembro.nombre}</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">{miembro.rol}</Card.Subtitle>
                                <Card.Text>
                                    {miembro.descripcion}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-white border-0 pb-3">
                                <div className="text-primary">
                                    <a href="https://www.linkedin.com/in/nicopazz/" className="bi bi-linkedin mx-2 fs-5" target='blank'></a>
                                    <a href="#" className="bi bi-twitter mx-2 fs-5"></a>
                                    <a href="#" className="bi bi-envelope-fill mx-2 fs-5"></a>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="bg-light p-5 rounded-3 mt-5 text-center">
                <h3 className="fw-bold mb-3">¿Te gustaría formar parte?</h3>
                <p>Siempre estamos buscando talento comprometido con la salud animal.</p>
                <button className="btn btn-outline-primary rounded-pill px-4">Contáctanos</button>
            </div>
        </Container>
    );
};

export default AcercaDeNosotros;