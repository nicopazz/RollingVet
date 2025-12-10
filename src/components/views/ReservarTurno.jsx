import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearTurnoAPI, obtenerTurnosAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const ReservarTurno = () => {
    // Tomamos la info del cliente logueado
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));

    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [profesionales, setProfesionales] = useState([]);
    
    const navigate = useNavigate();

    // Redirección si no está logueado
    useEffect(() => {
        if (!usuarioLogueado) {
            Swal.fire({
                title: 'Acceso Denegado',
                text: 'Debes iniciar sesión para reservar un turno.',
                icon: 'warning'
            }).then(() => navigate('/login'));
        }
    }, [usuarioLogueado, navigate]);


    // Cargar los profesionales al iniciar el componente
    useEffect(() => {
        const cargarProfesionales = async () => {
            const respuesta = await obtenerProfesionalesAPI();
            if (respuesta && respuesta.status === 200) {
                const lista = await respuesta.json();
                setProfesionales(lista);
            }
        };
        
        if (usuarioLogueado) {
            cargarProfesionales();
        }
    }, [usuarioLogueado]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!mascota || !veterinario || !detalleCita || !fecha || !hora){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

        // Validación de fecha (No permitir pasado)
        const fechaActual = new Date();
        const fechaSeleccionada = new Date(`${fecha}T${hora}`);

        if (fechaSeleccionada < fechaActual) {
            Swal.fire({ icon: 'error', title: 'Fecha inválida', text: 'No puedes reservar un turno en una fecha u hora pasada' });
            return;
        }

        // Validación de duplicados
        Swal.fire({ title: 'Verificando disponibilidad...', didOpen: () => Swal.showLoading() });

        const respuestaTurnos = await obtenerTurnosAPI();
        if (respuestaTurnos && respuestaTurnos.status === 200) {
            const turnosExistentes = await respuestaTurnos.json();
            
            const turnoDuplicado = turnosExistentes.find((turno) => {
                const fechaTurnoBD = new Date(turno.fecha).toISOString().split('T')[0];
                return (fechaTurnoBD === fecha && turno.hora === hora && turno.veterinario === veterinario);
            });

            if (turnoDuplicado) {
                Swal.fire({ icon: 'error', title: 'Turno no disponible', text: `El profesional ${veterinario} ya tiene un turno asignado.` });
                return;
            }
        } else {
            Swal.fire("Error", "No se pudo verificar la disponibilidad", "error");
            return;
        }
        
        // Objeto a enviar
        const nuevoTurno = {
            mascota: mascota, 
            veterinario, 
            detalleCita,
            fecha,
            hora,
            estado: 'pendiente',
            // --- CAMBIO CLAVE: ENVIAMOS EL EMAIL Dueño con ñ ---
            emailDueño: usuarioLogueado.email 
        };

        // 5. Guardar
        Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const respuesta = await crearTurnoAPI(nuevoTurno);

        if(respuesta && respuesta.status === 201){
            Swal.fire("Éxito", "Tu turno ha sido reservado. Te esperamos pronto.", "success");
            navigate('/mis-turnos'); // Regresamos a la lista de sus turnos
        } else {
            const errorData = await respuesta.json(); 
            Swal.fire("Error", errorData.mensaje || "Ocurrió un error al reservar el turno", "error");
        }
    };

    if (!usuarioLogueado) return null; // No renderizamos si no hay usuario

    return (
        <Container className="mainSection my-5 d-flex justify-content-center">
            <Card className="shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Header className="bg-primary text-white fw-bold text-center">
                    <h4>Reservar Cita</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-muted small mb-4">
                        Hola <span className="fw-bold text-primary">{usuarioLogueado.nombre}</span>, tu email (<span className="fst-italic">{usuarioLogueado.email}</span>) será usado para confirmar la cita.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>¿Para qué mascota?</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nombre de tu mascota (Ej: Firulais)"
                                value={mascota}
                                onChange={(e) => setMascota(e.target.value)}
                            />
                            <Form.Text className="text-muted">Si tienes varios, usa su nombre para identificar el turno.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Profesional</Form.Label>
                            <Form.Select 
                                value={veterinario}
                                onChange={(e) => setVeterinario(e.target.value)}
                            >
                                <option value="">Seleccione un veterinario o servicio</option>
                                {profesionales.map((profesional) => (
                                    <option key={profesional._id} value={profesional.nombre}>
                                        {profesional.nombre} ({profesional.especialidad})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Motivo de la Cita</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                placeholder="Ej: Vacunación anual / Chequeo general / Corte de pelo"
                                value={detalleCita}
                                onChange={(e) => setDetalleCita(e.target.value)}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora</Form.Label>
                                    <Form.Control 
                                        type="time"
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="text-end pt-3">
                            <Button variant="secondary" className="me-2" onClick={() => navigate('/mis-turnos')}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" className="px-4">
                                Confirmar Reserva
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReservarTurno;