import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearTurnoAPI, obtenerTurnosAPI, obtenerProfesionalesAPI, obtenerServiciosAPI } from '../../helpers/queries';

const ReservarTurno = () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));

    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [servicio, setServicio] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [profesionales, setProfesionales] = useState([]);
    const [servicios, setServicios] = useState([]);
    
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [todosLosTurnos, setTodosLosTurnos] = useState([]); 

    const [confirmaEmail, setConfirmaEmail] = useState(false);
    const navigate = useNavigate();

    const generarHorariosRango = (horaInicio, horaFin) => {
        const horarios = [];
        for (let i = horaInicio; i < horaFin; i++) { 
            const horaString = i < 10 ? `0${i}` : i;
            horarios.push(`${horaString}:00`);
            horarios.push(`${horaString}:30`);
        }
        return horarios; 
    };

    
    useEffect(() => {
        if (!usuarioLogueado) {
            Swal.fire({
                title: 'Acceso Denegado',
                text: 'Debes iniciar sesión para reservar un turno.',
                icon: 'warning'
            }).then(() => navigate('/login'));
        }
    }, [usuarioLogueado, navigate]);

    
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                
                const respuestaProf = await obtenerProfesionalesAPI();
                if (respuestaProf && respuestaProf.status === 200) {
                    setProfesionales(await respuestaProf.json());
                }

                
                const respuestaServ = await obtenerServiciosAPI();
                if (respuestaServ && respuestaServ.status === 200) {
                    setServicios(await respuestaServ.json());
                }

                
                const respuestaTurnos = await obtenerTurnosAPI();
                if (respuestaTurnos && respuestaTurnos.status === 200) {
                    setTodosLosTurnos(await respuestaTurnos.json());
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (usuarioLogueado) {
            cargarDatos();
        }
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    
    useEffect(() => {
        if (fecha && veterinario) {
            const diaSemana = new Date(fecha + 'T00:00:00').getDay();

            
            if (diaSemana === 0 || diaSemana === 6) {
                Swal.fire("Fin de semana", "Nuestros veterinarios solo atienden de Lunes a Viernes.", "info");
                
                setFecha(''); 
                setHorariosDisponibles([]);
                return;
            }

           
            let inicio = 8;
            let fin = 16;

            
            if (veterinario === "Dra. Chin") {
                inicio = 16;
                fin = 24; 
            } else {
                
                inicio = 8;
                fin = 16;
            }

            let listaHorarios = generarHorariosRango(inicio, fin);

        
            const turnosOcupados = todosLosTurnos.filter(turno => {
                const fechaTurno = new Date(turno.fecha).toISOString().split('T')[0];
                return fechaTurno === fecha && turno.veterinario === veterinario;
            });

            const horasOcupadas = turnosOcupados.map(t => t.hora);
            const horariosLibres = listaHorarios.filter(h => !horasOcupadas.includes(h));

            setHorariosDisponibles(horariosLibres);

        } else {
            setHorariosDisponibles([]); 
        }
    }, [fecha, veterinario, todosLosTurnos]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mascota || !veterinario || !servicio || !detalleCita || !fecha || !hora || !confirmaEmail) {
            Swal.fire("Error", "Debes completar todos los campos.", "error");
            return;
        }

        const fechaActual = new Date();
        const fechaSeleccionada = new Date(`${fecha}T${hora}`);

        if (fechaSeleccionada < fechaActual) {
            Swal.fire({ icon: 'error', title: 'Fecha inválida', text: 'No puedes reservar en el pasado.' });
            return;
        }
        
        const nuevoTurno = {
            mascota,
            veterinario,
            servicio,
            detalleCita,
            fecha,
            hora,
            estado: 'pendiente',
            emailDueño: usuarioLogueado.email
        };

        Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const respuesta = await crearTurnoAPI(nuevoTurno);

        if (respuesta && respuesta.status === 201) {
            Swal.fire("Éxito", "Tu turno ha sido reservado.", "success");
            navigate('/mis-turnos');
        } else {
            const errorData = await respuesta.json();
            Swal.fire("Error", errorData.mensaje || "Ocurrió un error.", "error");
        }
    };

    if (!usuarioLogueado) return null;

    return (
        <Container className="mainSection my-5 d-flex justify-content-center">
            <Card className="shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <Card.Header className="bg-primary text-white fw-bold text-center">
                    <h4>Reservar Cita</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-muted small mb-4">
                        Hola <span className="fw-bold text-primary">{usuarioLogueado.nombre}</span>.
                    </p>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control type="email" value={usuarioLogueado.email} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mascota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de tu mascota"
                                value={mascota}
                                onChange={(e) => setMascota(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Servicio</Form.Label>
                            <Form.Select value={servicio} onChange={(e) => setServicio(e.target.value)}>
                                <option value="">Seleccione un servicio</option>
                                {servicios.map((s) => (
                                    <option key={s._id} value={s.nombreServicio}>{s.nombreServicio}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Profesional</Form.Label>
                            <Form.Select value={veterinario} onChange={(e) => setVeterinario(e.target.value)}>
                                <option value="">Seleccione un profesional</option>
                                {profesionales.map((p) => (
                                    <option key={p._id} value={p.nombre}>{p.nombre} ({p.especialidad})</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Observación</Form.Label>
                            <Form.Control
                                as="textarea" rows={2}
                                value={detalleCita} onChange={(e) => setDetalleCita(e.target.value)}
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
                                    <Form.Label>Horarios ({veterinario ? 'Disponibles' : 'Seleccione Vet'})</Form.Label>
                                    <Form.Select
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                        disabled={!fecha || !veterinario} 
                                    >
                                        <option value="">Seleccione horario</option>
                                        {horariosDisponibles.length > 0 ? (
                                            horariosDisponibles.map((h, index) => (
                                                <option key={index} value={h}>{h} hs</option>
                                            ))
                                        ) : (
                                            <option disabled>Sin horarios o seleccione fecha/vet</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Check
                                type="checkbox"
                                label="Confirmo que mi email es correcto."
                                checked={confirmaEmail}
                                onChange={(e) => setConfirmaEmail(e.target.checked)}
                                required
                            />
                        </Form.Group>

                        <div className="text-end pt-3">
                            <Button variant="secondary" className="me-2" onClick={() => navigate('/mis-turnos')}>Cancelar</Button>
                            <Button variant="primary" type="submit" className="px-4">Confirmar Reserva</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReservarTurno;