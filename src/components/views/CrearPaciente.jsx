import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { crearPacienteAPI, obtenerPacientesAPI } from "../../helpers/queries";

const CrearPaciente = () => {

  const [nombreDueño, setNombreDueño] = useState("");
  const [apellidoDueño, setApellidoDueño] = useState("");
  const [emailDueño, setEmailDueño] = useState("");
  const [telefonoDueño, setTelefonoDueño] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [especie, setEspecie] = useState("");
  const [raza, setRaza] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (
      !nombreDueño ||
      !apellidoDueño ||
      !emailDueño ||
      !telefonoDueño ||
      !nombreMascota ||
      !especie ||
      !raza
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    
    Swal.fire({
      title: "Verificando...",
      didOpen: () => Swal.showLoading(),
    });

    const respuestaPacientes = await obtenerPacientesAPI();
    if (respuestaPacientes && respuestaPacientes.status === 200) {
      const pacientesExistentes = await respuestaPacientes.json();

      const pacienteDuplicado = pacientesExistentes.find(
        (paciente) =>
          paciente.nombreMascota.toLowerCase() ===
            nombreMascota.toLowerCase() &&
          
          (paciente.emailDueño || "").toLowerCase() === emailDueño.toLowerCase()
      );

      if (pacienteDuplicado) {
        Swal.fire({
          icon: "error",
          title: "Paciente existente",
          text: `La mascota "${nombreMascota}" ya está registrada con el email ${emailDueño}.`,
        });
        return;
      }
    }

   
    const telefonoNumerico = Number(telefonoDueño);

    const nuevoPaciente = {
      nombreDueño: nombreDueño,

      apellidoDueño: apellidoDueño,

      emailDueño: emailDueño,

      telefonoDueño: isNaN(telefonoNumerico) ? 0 : telefonoNumerico,
      nombreMascota,
      especie,
      raza,
    };

    
    Swal.fire({
      title: "Guardando...",
      didOpen: () => Swal.showLoading(),
    });

    const respuesta = await crearPacienteAPI(nuevoPaciente);

    if (respuesta && respuesta.status === 201) {
      Swal.fire("Éxito", "Paciente registrado correctamente", "success");
      navigate("/administrador");
    } else {
    
      const errorData = await respuesta.json();
      console.error("Error del Backend:", errorData);
      Swal.fire(
        "Error",
        errorData.mensaje ||
          "Ocurrió un error al crear el paciente. Revisa los datos.",
        "error"
      );
    }
  };

  const handleCancelar = () => {
    navigate("/administrador");
  };

  return (
    <Container className="mainSection my-5">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0 fw-bold">Nuevo Paciente</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <h5 className="mb-3 text-muted">Datos del Dueño</h5>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan"
                    onChange={(e) => setNombreDueño(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Perez"
                    onChange={(e) => setApellidoDueño(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="juan@mail.com"
                    onChange={(e) => setEmailDueño(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ej: 381123456"
                    onChange={(e) => setTelefonoDueño(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr />
            <h5 className="mb-3 text-muted">Datos de la Mascota</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Mascota</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Firulais"
                    onChange={(e) => setNombreMascota(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie</Form.Label>
                  <Form.Select onChange={(e) => setEspecie(e.target.value)}>
                    <option value="">Seleccione...</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Caniche"
                    onChange={(e) => setRaza(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={handleCancelar}
                type="button"
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Paciente
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CrearPaciente;
