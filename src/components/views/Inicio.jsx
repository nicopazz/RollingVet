import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { obtenerProductosAPI, obtenerServiciosAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const Inicio = () => {
   
    const [servicios, setServicios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [profesionales, setProfesionales] = useState([]);

    const [cargandoServicios, setCargandoServicios] = useState(true);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const [cargandoProfesionales, setCargandoProfesionales] = useState(true);

    
    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const respuesta = await obtenerServiciosAPI();
                if(respuesta && respuesta.status === 200){
                    const datos = await respuesta.json();
                    setServicios(datos);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setCargandoServicios(false);
            }
        }
        cargarServicios();
    }, []);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const respuesta = await obtenerProductosAPI();
                if(respuesta && respuesta.status === 200){
                    const datos = await respuesta.json();
                    setProductos(datos);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setCargandoProductos(false);
            }
        }
        cargarProductos();
    }, []);

    useEffect(() => {
        const cargarProfesionales = async () => {
            try {
                const respuesta = await obtenerProfesionalesAPI();
                if(respuesta && respuesta.status === 200){
                    const datos = await respuesta.json();
                    setProfesionales(datos);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setCargandoProfesionales(false);
            }
        }
        cargarProfesionales();
    }, []);

    
    const mostrarAlertaCompra = () => {
        Swal.fire({
            title: '¡Próximamente!',
            text: 'Muy pronto podrás adquirir nuestros productos directamente desde la web.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0d6efd',
            backdrop: `rgba(0,0,123,0.1)`
        });
    };

   
    return (
        <>
           
            <section 
                className="d-flex align-items-center position-relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.masquevets.com/images/blog/post9/Plan_de_marketing_veterinario.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', 
                    minHeight: '80vh', 
                    paddingTop: '3rem',
                    paddingBottom: '3rem'
                }}
            >
                <Container>
                    <Row className="justify-content-center justify-content-lg-start">
                        <Col md={10} lg={7} className="text-center text-lg-start text-white">
                            <h1 className="display-4 fw-bold mb-3">Cuidado experto y corazón para tu mejor amigo.</h1>
                            <p className="lead mb-4 opacity-75">
                                En RollingVet, tratamos a tus mascotas como si fueran nuestra propia familia. Medicina veterinaria avanzada con un toque humano en Tucumán.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-4">
                                <Button as={Link} to="/reservar-turno" variant="primary" size="lg" className="rounded-pill px-4 fw-bold shadow">
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

            <div 
                className="bg-danger text-white py-3 shadow-lg h-auto position-relative"
                style={{ 
                    marginTop: '-10px',  
                    zIndex: 10,          
                    borderTop: '1px solid rgba(255,255,255,0.2)' 
                }}
            >
                <Container>
                    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center text-center gap-2">
                        <div className="d-flex align-items-center justify-content-center text-nowrap">
                            <i className="bi bi-exclamation-triangle-fill fs-4 me-2"></i>
                            <span className="fw-bold fs-5">¿EMERGENCIA VETERINARIA?</span>
                        </div>
                        <div className="fs-6">
                            Estamos disponibles 24/7. Llama al <span className="fw-bold text-warning ms-1 fs-5">911-VET-HELP</span>
                        </div>
                    </div>
                </Container>
            </div>

            
            <section className="py-5 mt-4 bg-light bg-opacity-50"> 
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Planes de Salud</h2>
                        <p className="text-muted lead">Cobertura médica integral diseñada para cada etapa de su vida.</p>
                    </div>
                    <Row className="justify-content-center align-items-stretch g-4"> 
                        <Col md={4} className="mb-4 mb-lg-0">
                            <Card className="h-100 border-0 shadow-lg rounded-4 text-center overflow-hidden position-relative">
                                <div className="bg-primary position-absolute top-0 start-0 w-100" style={{height: '6px'}}></div>
                                <Card.Body className="d-flex flex-column p-4 p-lg-5 pt-5 mt-3">
                                    <div className="mb-3 text-primary"><i className="bi bi-balloon-heart-fill display-4"></i></div>
                                    <h5 className="text-primary fw-bold text-uppercase small ls-1 mb-2">Primeros Pasos</h5>
                                    <h3 className="my-2 display-5 fw-bolder text-dark">0 - 5 Años</h3>
                                    <hr className="text-muted my-4 opacity-25 w-50 mx-auto" />
                                    <Card.Text className="text-muted mb-5 flex-grow-1">Vacunas completas, desparasitación inicial y control exhaustivo de crecimiento.</Card.Text>
                                    <div className="mt-auto">
                                        <Link to="/planes" state={{ plan: 'Primeros Pasos' }} className="btn btn-primary rounded-pill w-100 fw-bold py-2 shadow-sm">SOLICITAR PLAN</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4} className="mb-4 mb-lg-0">
                            <Card className="h-100 border-0 shadow-lg rounded-4 text-center overflow-hidden position-relative">
                                <div className="bg-success position-absolute top-0 start-0 w-100" style={{height: '6px'}}></div>
                                <Card.Body className="d-flex flex-column p-4 p-lg-5 pt-5 mt-3">
                                    <div className="mb-3 text-success"><i className="bi bi-shield-fill-check display-4"></i></div>
                                    <h5 className="text-success fw-bold text-uppercase small ls-1 mb-2">Madurando</h5>
                                    <h3 className="my-2 display-5 fw-bolder text-dark">5 - 10 Años</h3>
                                    <hr className="text-muted my-4 opacity-25 w-50 mx-auto" />
                                    <Card.Text className="text-muted mb-5 flex-grow-1">Chequeos anuales preventivos, limpieza dental profunda y análisis clínicos de rutina.</Card.Text>
                                    <div className="mt-auto">
                                        <Link to="/planes" state={{ plan: 'Madurando' }} className="btn btn-success rounded-pill w-100 fw-bold py-2 shadow-sm">SOLICITAR PLAN</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4}>
                            <Card className="h-100 border-0 shadow-lg rounded-4 text-center overflow-hidden position-relative">
                                <div className="bg-warning position-absolute top-0 start-0 w-100" style={{height: '6px'}}></div>
                                <Card.Body className="d-flex flex-column p-4 p-lg-5 pt-5 mt-3">
                                    <div className="mb-3 text-warning"><i className="bi bi-heart-pulse-fill display-4"></i></div>
                                    <h5 className="text-warning fw-bold text-uppercase small ls-1 mb-2">Adultos Mayores</h5>
                                    <h3 className="my-2 display-5 fw-bolder text-dark">+10 Años</h3>
                                    <hr className="text-muted my-4 opacity-25 w-50 mx-auto" />
                                    <Card.Text className="text-muted mb-5 flex-grow-1">Atención geriátrica especializada, control cardíaco periódico y tratamiento articular.</Card.Text>
                                    <div className="mt-auto">
                                        <Link to="/planes" state={{ plan: 'Adultos' }} className="btn btn-warning text-dark rounded-pill w-100 fw-bold py-2 shadow-sm">SOLICITAR PLAN</Link>
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
                        <span className="text-primary fw-bold small text-uppercase ls-1">Atención Integral</span>
                        <h2 className="fw-bold display-5">Nuestros Servicios</h2>
                        <p className="text-muted lead">Tecnología de punta y calidez humana para tu mejor amigo.</p>
                    </div>

                    <Row>
                        {cargandoServicios ? (
                            <div className="text-center my-5">
                                <Spinner animation="border" variant="primary" role="status"><span className="visually-hidden">Cargando...</span></Spinner>
                            </div>
                        ) : servicios.length > 0 ? (
                            servicios.map((servicio) => (
                                <Col md={6} lg={3} className="mb-4" key={servicio._id}>
                                    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                        <div style={{ height: '200px' }}>
                                            <Card.Img 
                                                variant="top" 
                                                src={servicio.imagen} 
                                                alt={servicio.nombreServicio} 
                                                className="w-100 h-100"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column p-4">
                                            <Card.Title className="fw-bold mb-2">{servicio.nombreServicio}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">{servicio.descripcion}</Card.Text>
                                            <div className="mt-3 d-grid">
                                                <Button as={Link} to="/reservar-turno" variant="primary" className="rounded-pill fw-bold py-2 shadow-sm">
                                                    Reservar Turno <i className="bi bi-calendar-check ms-2"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <p className="text-muted">No hay servicios disponibles.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

           
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold small text-uppercase ls-1">Nuestra Selección</span>
                        <h2 className="fw-bold display-5">Tienda Online</h2>
                        <p className="text-muted lead">Productos de calidad premium para tu mascota.</p>
                    </div>
                    
                    <Row>
                        {cargandoProductos ? (
                            <div className="text-center my-5">
                                <Spinner animation="border" variant="primary" role="status"><span className="visually-hidden">Cargando...</span></Spinner>
                            </div>
                        ) : productos.length > 0 ? (
                            productos.map((producto) => (
                                <Col md={6} lg={3} className="mb-4" key={producto._id}>
                                    <Card 
                                        className="h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
                                        style={{ cursor: 'pointer' }}
                                        onClick={mostrarAlertaCompra}
                                    >
                                        <div className="position-absolute top-0 end-0 m-3 z-1">
                                            <span className="badge bg-white text-primary shadow-sm rounded-pill px-3 py-2"><i className="bi bi-star-fill me-1"></i> Destacado</span>
                                        </div>
                                        <div className="bg-light p-4 d-flex align-items-center justify-content-center" style={{height: '220px'}}>
                                            <Card.Img 
                                                variant="top" 
                                                src={producto.imagen} 
                                                alt={producto.nombreProducto} 
                                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column text-center p-4">
                                            <Card.Title className="fw-bold text-dark mb-1">{producto.nombreProducto}</Card.Title>
                                            <Card.Text className="text-muted small mb-3 flex-grow-1">{producto.descripcion}</Card.Text>
                                            <div className="mt-auto">
                                                <h4 className="fw-bolder text-primary mb-3">${producto.precio}</h4>
                                                <div className="d-grid">
                                                    <Button variant="primary" className="rounded-pill fw-bold py-2 shadow-sm">
                                                        <i className="bi bi-cart-plus me-2"></i> AGREGAR
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <p className="text-muted">Stock en renovación.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

            
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold small text-uppercase ls-1">Profesionales</span>
                        <h2 className="fw-bold display-5">Nuestro Equipo</h2>
                        <p className="text-muted lead">Expertos apasionados dedicados a la salud de tu mascota.</p>
                    </div>

                    <Row className="justify-content-center g-4">
                        {cargandoProfesionales ? (
                             <div className="text-center my-5">
                                <Spinner animation="border" variant="primary" role="status"><span className="visually-hidden">Cargando...</span></Spinner>
                            </div>
                        ) : profesionales.length > 0 ? (
                            profesionales.map((pro) => (
                                <Col md={6} lg={3} key={pro._id}>
                                    <Card className="h-100 border-0 shadow-sm rounded-4 text-center overflow-hidden">
                                        <div className="bg-primary opacity-75" style={{ height: '80px' }}></div>
                                        <Card.Body className="d-flex flex-column align-items-center pt-0 px-4 pb-4">
                                            <div className="position-relative" style={{ marginTop: '-60px' }}>
                                                <img 
                                                    src={pro.imagen} 
                                                    alt={pro.nombre} 
                                                    className="rounded-circle shadow border border-4 border-white"
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                />
                                                <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-light rounded-circle"></span>
                                            </div>
                                            <div className="mt-3">
                                                <h5 className="fw-bold text-dark mb-1">{pro.nombre}</h5>
                                                <span className="badge bg-light text-primary border border-primary-subtle rounded-pill mb-3 px-3">{pro.especialidad}</span>
                                            </div>
                                            <div className="mt-auto d-flex gap-2 justify-content-center w-100">
                                                <a href={`mailto:${pro.email}?subject=Consulta Veterinaria`} className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                                                    <i className="bi bi-envelope-fill"></i>
                                                </a>
                                                <button className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '40px', height: '40px' }}>
                                                    <i className="bi bi-linkedin"></i>
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <p className="text-muted">Aún no hay profesionales registrados.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>

            
            <section className="py-5 bg-primary bg-gradient text-white"> 
                <Container>
                    <div className="text-center mb-5">
                        <span className="text-white-50 text-uppercase ls-1 fw-bold small">Testimonios</span>
                        <h2 className="fw-bold display-5">Lo que dicen nuestros clientes</h2>
                    </div>
                    <Row className="justify-content-center g-4">
                        <Col md={4}>
                            <Card className="h-100 border-0 shadow-lg rounded-4 position-relative">
                                <Card.Body className="p-4 p-lg-5">
                                    <div className="text-warning mb-3"><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i></div>
                                    <p className="lead text-muted fst-italic mb-4">"Salvaron a mi perro Firulais después de un accidente. La atención fue inmediata y muy humana. ¡Gracias RollingVet!"</p>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style={{width: '50px', height: '50px'}}>MG</div>
                                        <div className="ms-3"><h6 className="mb-0 fw-bold text-dark">María González</h6><small className="text-muted">Dueña de Firulais</small></div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 border-0 shadow-lg rounded-4 position-relative">
                                <Card.Body className="p-4 p-lg-5">
                                    <div className="text-warning mb-3"><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i></div>
                                    <p className="lead text-muted fst-italic mb-4">"El plan de salud para cachorros es genial. Tengo todas las vacunas cubiertas y me olvido de los gastos sorpresa."</p>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style={{width: '50px', height: '50px'}}>JP</div>
                                        <div className="ms-3"><h6 className="mb-0 fw-bold text-dark">Juan Pérez</h6><small className="text-muted">Plan Cachorros</small></div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="h-100 border-0 shadow-lg rounded-4 position-relative">
                                <Card.Body className="p-4 p-lg-5">
                                    <div className="text-warning mb-3"><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-fill mx-1"></i><i className="bi bi-star-half mx-1"></i></div>
                                    <p className="lead text-muted fst-italic mb-4">"Muy buena atención de la Dra. Chin. Se nota que aman lo que hacen. Las instalaciones son impecables."</p>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0" style={{width: '50px', height: '50px'}}>SL</div>
                                        <div className="ms-3"><h6 className="mb-0 fw-bold text-dark">Sofía L.</h6><small className="text-muted">Cliente Frecuente</small></div>
                                    </div>
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
                        <Col xs={6} md={3} lg={2} className="mb-4"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/1280px-Royal-Canin-Logo.svg.png" alt="Royal Canin" className="img-fluid" style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} /></Col>
                        <Col xs={6} md={3} lg={2} className="mb-4"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Eukanuba_brand_logo.svg/2560px-Eukanuba_brand_logo.svg.png" alt="Eukanuba" className="img-fluid" style={{ maxHeight: '40px', filter: 'grayscale(100%)', opacity: '0.6' }} /></Col>
                        <Col xs={6} md={3} lg={2} className="mb-4"><img src="https://allvectorlogo.com/img/2017/09/purina-pro-plan-logo.png" alt="Pro Plan" className="img-fluid" style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} /></Col>
                        <Col xs={6} md={3} lg={2} className="mb-4"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Bayer.svg/1000px-Logo_Bayer.svg.png" alt="Bayer" className="img-fluid" style={{ maxHeight: '60px', filter: 'grayscale(100%)', opacity: '0.6' }} /></Col>
                        <Col xs={6} md={3} lg={2} className="mb-4"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Zoetis_logo.svg/1280px-Zoetis_logo.svg.png" alt="Zoetis" className="img-fluid" style={{ maxHeight: '50px', filter: 'grayscale(100%)', opacity: '0.6' }} /></Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Inicio;