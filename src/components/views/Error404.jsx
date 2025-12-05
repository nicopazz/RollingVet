import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <Container className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <img 
                src="https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1931.jpg" 
                alt="Error 404 Perrito" 
                className="img-fluid mb-4"
                style={{ maxHeight: '300px' }}
            />
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">¡Ups! Página no encontrada</h2>
            <p className="lead text-muted mb-4">
                Parece que la página que buscas no existe o fue movida. 
                Tal vez tu mascota se la comió...
            </p>
            <Button as={Link} to="/" variant="primary" size="lg" className="rounded-pill px-4">
                Volver al Inicio
            </Button>
        </Container>
    );
};

export default Error404;