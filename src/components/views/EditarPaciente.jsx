import { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarPacienteAPI, obtenerPacientePorIdAPI, obtenerPacientesAPI } from '../../helpers/queries';

const EditarPaciente = () => {
    const [nombreDueño, setNombreDueño] = useState('');
    const [apellidoDueño, setApellidoDueño] = useState('');
    const [emailDueño, setEmailDueño] = useState('');
    const [telefonoDueño, setTelefonoDueño] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await obtenerPacientePorIdAPI(id);
            if(respuesta && respuesta.status === 200){
                const datos = await respuesta.json();
                setNombreDueño(datos.nombreDuenio || datos.nombreDueño);
                setApellidoDueño(datos.apellidoDuenio || datos.apellidoDueño);
                setEmailDueño(datos.emailDuenio || datos.emailDueño);
                setTelefonoDueño(datos.telefonoDuenio || datos.telefonoDueño);
                setNombreMascota(datos.nombreMascota);
                setEspecie(datos.especie);
                setRaza(datos.raza);
            } else {
                Swal.fire("Error", "No se pudo obtener el paciente", "error");
            }
        };
        cargarDatos();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(!nombreDueño || !apellidoDueño || !emailDueño || !telefonoDueño || !nombreMascota || !especie || !raza){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

        Swal.fire({
            title: 'Verificando...',
            didOpen: () => Swal.showLoading()
        });

        const respuestaPacientes = await obtenerPacientesAPI();
        
        if (respuestaPacientes && respuestaPacientes.status === 200) {
            const pacientesExistentes = await respuestaPacientes.json();
            
            const pacienteDuplicado = pacientesExistentes.find((paciente) => 
                paciente.nombreMascota.toLowerCase() === nombreMascota.toLowerCase() && 
                (paciente.emailDuenio || paciente.emailDueño).toLowerCase() === emailDueño.toLowerCase() &&
                paciente._id !== id
            );

            if (pacienteDuplicado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Paciente existente',
                    text: `La mascota "${nombreMascota}" ya está registrada con el email ${emailDueño}.`
                });
                return;
            }
        }
        const pacienteEditado = {
            nombreDuenio: nombreDueño, 
            nombreDueño: nombreDueño,
            apellidoDuenio: apellidoDueño, 
            apellidoDueño: apellidoDueño,
            emailDuenio: emailDueño, 
            emailDueño: emailDueño,
            telefonoDuenio: Number(telefonoDueño), 
            telefonoDueño: Number(telefonoDueño),
            nombreMascota, 
            especie, 
            raza
        };

        
        Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await editarPacienteAPI(pacienteEditado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "El paciente fue editado correctamente", "success");
            navigate('/administrador', { state: { section: 'pacientes' } });
        } else {
            Swal.fire("Error", "No se pudo editar el paciente", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador', { state: { section: 'pacientes' } });
    }

    return (
        <Container className="mainSection my-5">
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-warning text-dark py-3">
                    <h4 className="mb-0 fw-bold">Editar Paciente</h4>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <h5 className="mb-3 text-muted">Datos del Dueño</h5>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" value={nombreDueño} onChange={(e) => setNombreDueño(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" value={apellidoDueño} onChange={(e) => setApellidoDueño(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={emailDueño} onChange={(e) => setEmailDueño(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="number" value={telefonoDueño} onChange={(e) => setTelefonoDueño(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <hr />
                        <h5 className="mb-3 text-muted">Datos de la Mascota</h5>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre Mascota</Form.Label>
                                    <Form.Control type="text" value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Especie</Form.Label>
                                    <Form.Select value={especie} onChange={(e) => setEspecie(e.target.value)}>
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
                                    <Form.Control type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
                            <Button variant="warning" type="submit">Guardar Cambios</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarPaciente;