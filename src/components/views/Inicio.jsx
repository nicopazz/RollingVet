import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { obtenerProductosAPI, obtenerServiciosAPI } from '../../helpers/queries';

const Inicio = () => {
    const [servicios, setServicios] = useState([]);
    const [productos, setProductos] = useState([]);

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
                                En [RollingVet], tratamos a tus mascotas como si fueran nuestra propia familia. Medicina veterinaria avanzada con un toque humano en Tucumán.
                            </p>
                            
                            <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                                <Button as={Link} to="/reservar-turno" variant="primary" size="lg" className="rounded-pill px-4 fw-bold">
                                    RESERVAR TURNO
                                </Button>
                                <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
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

           
            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Nuestros Servicios Principales</h2>
                        <p className="text-secondary">Ofrecemos una amplia gama de soluciones para la salud de tu mascota.</p>
                    </div>
                    
                    <Row>
                        {servicios.length > 0 ? (
                            servicios.map((servicio) => (
                                <Col md={6} lg={3} className="mb-4" key={servicio._id}>
                                    <Card className="border-0 h-100 text-center shadow-sm h-100">
                                        <div style={{ height: '150px', overflow: 'hidden' }} className="rounded-top">
                                            <Card.Img 
                                                variant="top" 
                                                src={servicio.imagen} 
                                                alt={servicio.nombreServicio}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-bold">{servicio.nombreServicio}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {servicio.descripcion}
                                            </Card.Text>
                                            <div className="mt-2">
                                                <span className="badge bg-primary rounded-pill px-3 py-2">
                                                    ${servicio.precio}
                                                </span>
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

            <section className="py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Productos que podés adquirir en el local</h2>
                        <p className="text-secondary">Tenemos disponibilidad de productos para tus mascotas.</p>
                    </div>
                    
                    <Row>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <Col md={6} lg={3} className="mb-4" key={producto._id}>
                                    <Card className="border-0 h-100 text-center shadow-sm h-100">
                                        <div style={{ height: '150px', overflow: 'hidden' }} className="rounded-top">
                                            <Card.Img 
                                                variant="top" 
                                                src={producto.imagen} 
                                                alt={producto.nombreProducto}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                        producto <Card.Title className="fw-bold">{producto.nombreProducto}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {producto.descripcion}
                                            </Card.Text>
                                            <div className="mt-2">
                                                <span className="badge bg-primary rounded-pill px-3 py-2">
                                                    ${producto.precio}
                                                </span>
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
        </>
    );
};

export default Inicio;