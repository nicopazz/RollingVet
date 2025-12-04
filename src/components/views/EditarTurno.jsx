import { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarTurnoAPI, obtenerTurnoPorIdAPI } from '../../helpers/queries';

const EditarTurno = () => {
    
    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    
    
    const { id } = useParams(); 
    const navigate = useNavigate();

    
    useEffect(() => {
        cargarDatosTurno();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cargarDatosTurno = async () => {
        const respuesta = await obtenerTurnoPorIdAPI(id);
        if(respuesta && respuesta.status === 200){
            const turno = await respuesta.json();
            
            setMascota(turno.mascota);
            setVeterinario(turno.veterinario);
            setDetalleCita(turno.detalleCita);
           
            const fechaObj = new Date(turno.fecha);
           
            setFecha(fechaObj.toISOString().split('T')[0]);
            setHora(turno.hora);
        } else {
            Swal.fire("Error", "No se pudo obtener el turno", "error");
        }
    };

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

        const turnoActualizado = {
            mascota,
            veterinario,
            detalleCita,
            fecha,
            hora,
            estado: 'pendiente' 
        };

       
        Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await editarTurnoAPI(turnoActualizado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "El turno fue modificado correctamente", "success");
            navigate('/administrador');
        } else {
            Swal.fire("Error", "Ocurrió un error al editar el turno", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador');
    };

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark fw-bold">
                    <h4>Editar Turno</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de la Mascota</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={mascota}
                                onChange={(e) => setMascota(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Veterinario</Form.Label>
                            <Form.Select 
                                value={veterinario}
                                onChange={(e) => setVeterinario(e.target.value)}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Dr. House">Dr. House</option>
                                <option value="Dra. Grey">Dra. Grey</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Detalle de la Cita</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
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
                                Guardar cambios
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarTurno;