import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearTurnoAPI } from '../../helpers/queries';


const CrearTurno = () => {
    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(!mascota || !veterinario || !detalleCita || !fecha || !hora){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
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