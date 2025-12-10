import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto border-top border-secondary">
      <Container>
        <Row>
         
         <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h4 className="text-primary fw-bold mb-3 d-flex align-items-center">
              <div 
                className="bg-primary me-2" 
                style={{
                  width: '40px',            
                  height: '40px',           
                  maskImage: `url(/imgpng.png)`,
                  WebkitMaskImage: `url(/imgpng.png)`, 
                  maskSize: 'contain',       
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  display: 'inline-block'    
                }}
              ></div>
              RollingVet
            </h4>
            <p className="text-secondary small pe-lg-4">
              Comprometidos con la salud y el bienestar de tus mascotas. 
              Brindamos atención veterinaria de excelencia con un equipo humano y tecnología de punta.
            </p>
          </Col>

          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 text-white">Contacto</h5>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-3 d-flex">
                <i className="bi bi-geo-alt-fill text-primary me-2 fs-6"></i>
                <span>General Paz 576, Piso 9, Of 2<br />San Miguel de Tucumán</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-telephone-fill text-primary me-2 fs-6"></i>
                <span>(381) 123-4567</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-envelope-fill text-primary me-2 fs-6"></i>
                <span>info@rollingvet.com</span>
              </li>
            </ul>
          </Col>

           
           <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3 text-white">Síguenos</h5>
            <p className="text-secondary small mb-3">Mantente conectado en nuestras redes:</p>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/RollingCodeSchool" className="text-white fs-4" target="blank" ><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/rollingcodeschool/#" className="text-white fs-4" target="blank" ><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/school/rollingcodeschool/posts/?feedView=all" className="text-white fs-4" target="blank" ><i className="bi bi-linkedin"></i></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <small className="text-secondary">&copy; {new Date().getFullYear()} <b>RollingVet</b>. Todos los derechos reservados.</small>
          </Col>
          <Col md={6} className="text-center text-md-end">
             <small className="text-secondary">Diseñado por Nicolás Paz</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;