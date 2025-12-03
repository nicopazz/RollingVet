import Container from 'react-bootstrap/Container';

const Inicio = () => {
    return (
        <section className="mainSection">
            <div className="banner text-center py-5 bg-light">
                <h1 className="display-4">Bienvenido a RollingVet</h1>
                <p className="lead">Cuidamos lo que más quieres.</p>
            </div>
            
            <Container className="my-5">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>Nuestros Servicios</h2>
                        <p>Aquí pronto verás el listado de servicios, clima y profesionales.</p>
                        <hr />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Inicio;