import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearTurnoAPI, obtenerTurnosAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const CrearTurno = () => {
    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [profesionales, setProfesionales] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProfesionales = async () => {
            const respuesta = await obtenerProfesionalesAPI();
            if (respuesta && respuesta.status === 200) {
                const lista = await respuesta.json();
                setProfesionales(lista);
            }
        };
        cargarProfesionales();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if(!mascota || !veterinario || !detalleCita || !fecha || !hora){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

       
        const fechaActual = new Date();
        const fechaSeleccionada = new Date(`${fecha}T${hora}`);

        if (fechaSeleccionada < fechaActual) {
            Swal.fire({
                icon: 'error',
                title: 'Fecha inválida',
                text: 'No puedes asignar un turno en una fecha u hora pasada'
            });
            return;
        }

       
        Swal.fire({
            title: 'Verificando disponibilidad...',
            didOpen: () => Swal.showLoading()
        });

        const respuestaTurnos = await obtenerTurnosAPI();
        
        if (respuestaTurnos && respuestaTurnos.status === 200) {
            const turnosExistentes = await respuestaTurnos.json();
            
            const turnoDuplicado = turnosExistentes.find((turno) => {
                const fechaTurnoBD = new Date(turno.fecha).toISOString().split('T')[0];
                return (
                    fechaTurnoBD === fecha && 
                    turno.hora === hora && 
                    turno.veterinario === veterinario
                );
            });

            if (turnoDuplicado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Turno no disponible',
                    text: `El profesional ${veterinario} ya tiene un turno asignado para esa fecha y hora.`
                });
                return;
            }
        } else {
            Swal.fire("Error", "No se pudo verificar la disponibilidad", "error");
            return;
        }
        
        
        const nuevoTurno = {
            mascota,
            veterinario, 
            detalleCita,
            fecha,
            hora,
            estado: 'pendiente' 
        };

        
        Swal.fire({
            title: 'Guardando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await crearTurnoAPI(nuevoTurno);

        if(respuesta && respuesta.status === 201){
            Swal.fire("Éxito", "El turno fue creado correctamente", "success");
            navigate('/administrador');
        } else {
            const errorData = await respuesta.json(); 
            Swal.fire("Error", errorData.mensaje || "Ocurrió un error al crear el turno", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador');
    };

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white fw-bold">
                    <h4>Nuevo Turno</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Mascota</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: Firulais"
                                value={mascota}
                                onChange={(e) => setMascota(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Veterinario / Profesional</Form.Label>
                            <Form.Select 
                                value={veterinario}
                                onChange={(e) => setVeterinario(e.target.value)}
                            >
                                <option value="">Seleccione una opción</option>
                                
                                {profesionales.map((profesional) => (
                                    <option key={profesional._id} value={profesional.nombre}>
                                        {profesional.nombre} ({profesional.especialidad})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Detalle de la Cita</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Ej: Vacunación anual y corte de uñas"
                                value={detalleCita}
                                onChange={(e) => setDetalleCita(e.target.value)}
                            />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Label>Fecha</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Label>Hora</Form.Label>
                                    <Form.Control 
                                        type="time"
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="text-end">
                            <Button 
                                variant="secondary" 
                                className="me-2" 
                                onClick={handleCancelar}
                                type="button"
                            >
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit" className="px-4">
                                Guardar Turno
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CrearTurno;