import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { obtenerProductosAPI, obtenerServiciosAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const Inicio = () => {
    const [servicios, setServicios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [profesionales, setProfesionales] = useState([]);

    useEffect(() => {
        const cargarServicios = async () => {
            const respuesta = await obtenerServiciosAPI();
            if(respuesta && respuesta.status === 200){
                const datos = await respuesta.json();
                setServicios(datos);
            }
        }
        cargarServicios();
    }, []);

    useEffect(() => {
        const cargarProductos = async () => {
            const respuesta = await obtenerProductosAPI();
            if(respuesta && respuesta.status === 200){
                const datos = await respuesta.json();
                setProductos(datos);
            }
        }
        cargarProductos();
    }, []);

    useEffect(() => {
        const cargarProfesionales = async () => {
            const respuesta = await obtenerProfesionalesAPI();
            if(respuesta && respuesta.status === 200){
                const datos = await respuesta.json();
                setProfesionales(datos);
            }
        }
        cargarProfesionales();
    }, []);

    
    const cardImageStyle = { height: '150px', objectFit: 'cover' };
    const avatarStyle = { width: '150px', height: '150px', objectFit: 'cover' };

    return (
        <>
           
            <section 
                className="py-5 text-white d-flex align-items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.masquevets.com/images/blog/post9/Plan_de_marketing_veterinario.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '85vh',
                }}
            >
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <h1 className="display-3 fw-bold">Cuidado experto y corazón para tu mejor amigo.</h1>
                            <p className="lead mb-4">
                                En RollingVet, tratamos a tus mascotas como si fueran nuestra propia familia. Medicina veterinaria avanzada con un toque humano en Tucumán.
                            </p>
                            
                            <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                                <Button as={Link} to="/reservar-turno" variant="primary" size="lg" className="rounded-pill px-4 fw-bold">
                                    RESERVAR TURNO
                                </Button>
                                <Button as={Link} to="/contacto" variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
                                    CONTACTARNOS
                                </Button>
                            </div>

                            <p className="mt-3 small text-white-50">
                                <i className="bi bi-telephone-fill me-2"></i>
                                ¿Es una emergencia? Llámanos al 123-456-7890
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

           
            <div className="bg-danger text-white py-3 text-center fw-bold">
                <Container>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    ¿EMERGENCIA VETERINARIA? Estamos disponibles 24/7. Llama inmediatamente al 911-VET-HELP.
                </Container>
            </div>

           
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Planes de Salud</h2>
                        <p className="text-muted">Cobertura médica integral para cada etapa.</p>
                    </div>
                    <Row className="justify-content-center">
                        
                        <Col md={4} className="mb-4">
                            <Card className="h-100 border-0 shadow text-center">
                                <Card.Header className="bg-primary text-white py-3 fw-bold border-0">Primeros Pasos</Card.Header>
                                <Card.Body className="d-flex flex-column p-4">
                                    <h3 className="my-3 display-6 fw-bold">0 - 5 Años</h3>
                                    <Card.Text>Vacunas completas, desparasitación y control de crecimiento.</Card.Text>
                                    <div className="mt-auto">
                                        <Link 
                                            to="/planes" 
                                            state={{ plan: 'Primeros Pasos' }} 
                                            className="btn btn-outline-primary rounded-pill w-100 fw-bold"
                                        >
                                            VER DETALLES
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="h-100 border-0 shadow text-center">
                                <Card.Header className="bg-success text-white py-3 fw-bold border-0">Madurando</Card.Header>
                                <Card.Body className="d-flex flex-column p-4">
                                    <h3 className="my-3 display-6 fw-bold">5 - 10 Años</h3>
                                    <Card.Text>Chequeos anuales, limpieza dental y análisis clínicos.</Card.Text>
                                    <div className="mt-auto">
                                        <Link 
                                            to="/planes" 
                                            state={{ plan: 'Madurando' }} 
                                            className="btn btn-outline-success rounded-pill w-100 fw-bold"
                                        >
                                            VER DETALLES
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4">
                            <Card className="h-100 border-0 shadow text-center">
                                <Card.Header className="bg-warning text-dark py-3 fw-bold border-0">Adultos Mayores</Card.Header>
                                <Card.Body className="d-flex flex-column p-4">
                                    <h3 className="my-3 display-6 fw-bold">+10 Años</h3>
                                    <Card.Text>Geriatría, control cardíaco y tratamiento articular.</Card.Text>
                                    <div className="mt-auto">
                                        <Link 
                                            to="/planes" 
                                            state={{ plan: 'Adultos' }} 
                                            className="btn btn-outline-warning text-dark rounded-pill w-100 fw-bold"
                                        >
                                            VER DETALLES
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Nuestros Servicios</h2>
                        <p className="text-muted">Lo mejor para el cuidado de tu amigo.</p>
                    </div>
                    <Row>
                        {servicios.length > 0 ? (
                            servicios.map((servicio) => (
                                <Col md={6} lg={3} className="mb-4" key={servicio._id}>
                                    <Card className="h-100 border-0 shadow-sm">
                                        <Card.Img 
                                            variant="top" 
                                            src={servicio.imagen} 
                                            alt={servicio.nombreServicio} 
                                            style={cardImageStyle}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">{servicio.nombreServicio}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {servicio.descripcion}
                                            </Card.Text>
                                            <div className="mt-2 d-grid">
                                                <Button variant="outline-primary" className="rounded-pill fw-bold" size="sm">
                                                    Ver Precio: ${servicio.precio}
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center">
                                <p className="text-muted">No hay servicios disponibles por el momento.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

             <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Tienda Online</h2>
                        <p className="text-muted">Productos seleccionados por expertos.</p>
                    </div>
                    <Row>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <Col md={6} lg={3} className="mb-4" key={producto._id}>
                                    <Card className="h-100 border-0 shadow-sm text-center">
                                        <div className="p-3">
                                            <Card.Img 
                                                variant="top" 
                                                src={producto.imagen} 
                                                alt={producto.nombreProducto} 
                                                style={{ height: '180px', objectFit: 'contain' }} 
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column pt-0">
                                            <Card.Title className="fs-6 fw-bold">{producto.nombreProducto}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {producto.descripcion}
                                            </Card.Text>
                                            <div className="mt-2 d-grid">
                                                <Button variant="outline-primary" className="rounded-pill fw-bold" size="sm">
                                                    Ver Precio: ${producto.precio}
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center">
                                <p className="text-muted">No hay productos disponibles por el momento.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Nuestro Equipo</h2>
                        <p className="text-muted">Profesionales apasionados.</p>
                    </div>
                    <Row className="justify-content-center">
                        {profesionales.length > 0 ? (
                            profesionales.map((pro) => (
                                <Col md={6} lg={3} key={pro._id} className="mb-4">
                                    <Card className="h-100 border-0 shadow-sm text-center py-4 bg-white">
                                        <div className="d-flex justify-content-center mb-3">
                                            <img 
                                                src={pro.imagen} 
                                                alt={pro.nombre} 
                                                className="rounded-circle shadow-sm border border-3 border-light"
                                                style={avatarStyle}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="fw-bold">{pro.nombre}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-info fw-bold">{pro.especialidad}</Card.Subtitle>
                                            <Card.Text className="small text-muted">
                                                {pro.email}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center">
                                <p className="text-muted">Cargando equipo...</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

             <section className="py-5 bg-primary text-white">
                <Container>
                    <h2 className="text-center fw-bold mb-5">Lo que dicen nuestros clientes</h2>
                    <Row className="justify-content-center">
                        <Col md={4} className="mb-3">
                            <Card className="bg-white text-dark border-0 shadow h-100">
                                <Card.Body>
                                    <div className="text-warning mb-2">★★★★★</div>
                                    <p className="fst-italic">"Salvaron a mi perro Firulais después de un accidente. La atención fue inmediata y muy humana. ¡Gracias RollingVet!"</p>
                                    <footer className="blockquote-footer mt-2">María González</footer>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Card className="bg-white text-dark border-0 shadow h-100">
                                <Card.Body>
                                    <div className="text-warning mb-2">★★★★★</div>
                                    <p className="fst-italic">"El plan de salud para cachorros es genial. Tengo todas las vacunas cubiertas y me olvido de los gastos sorpresa."</p>
                                    <footer className="blockquote-footer mt-2">Juan Pérez</footer>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Card className="bg-white text-dark border-0 shadow h-100">
                                <Card.Body>
                                    <div className="text-warning mb-2">★★★★☆</div>
                                    <p className="fst-italic">"Muy buena atención de la Dra. Chin. Se nota que aman lo que hacen. Las instalaciones son impecables."</p>
                                    <footer className="blockquote-footer mt-2">Sofía L.</footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5 bg-white">
                <Container className="text-center">
                    <p className="text-muted fw-bold mb-5 small">MARCAS QUE CONFÍAN EN NOSOTROS</p>
                    <Row className="align-items-center justify-content-center">
                        <Col xs={6} md={3} lg={2} className="mb-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/1280px-Royal-Canin-Logo.svg.png" 
                                alt="Royal Canin" 
                                className="img-fluid"
                                style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} 
                            />
                        </Col>
                        <Col xs={6} md={3} lg={2} className="mb-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Eukanuba_brand_logo.svg/2560px-Eukanuba_brand_logo.svg.png" 
                                alt="Eukanuba" 
                                className="img-fluid"
                                style={{ maxHeight: '40px', filter: 'grayscale(100%)', opacity: '0.6' }} 
                            />
                        </Col>
                        <Col xs={6} md={3} lg={2} className="mb-4">
                            <img 
                                src="https://allvectorlogo.com/img/2017/09/purina-pro-plan-logo.png" 
                                alt="Pro Plan" 
                                className="img-fluid"
                                style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} 
                            />
                        </Col>
                        <Col xs={6} md={3} lg={2} className="mb-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/1000px-Logo_Bayer.svg.png" 
                                alt="Bayer" 
                                className="img-fluid"
                                style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} 
                            />
                        </Col>
                        <Col xs={6} md={3} lg={2} className="mb-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Zoetis_logo.svg/1280px-Zoetis_logo.svg.png" 
                                alt="Zoetis" 
                                className="img-fluid"
                                style={{ maxHeight: '50px', filter: 'grayscale(100%)', opacity: '0.6' }} 
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Inicio;