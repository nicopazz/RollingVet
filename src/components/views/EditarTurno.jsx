import { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarTurnoAPI, obtenerTurnoPorIdAPI, obtenerProfesionalesAPI } from '../../helpers/queries';

const EditarTurno = () => {
    const [mascota, setMascota] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [detalleCita, setDetalleCita] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [estado, setEstado] = useState(''); 
    const [profesionales, setProfesionales] = useState([]); //
    
    const { id } = useParams();
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

    useEffect(() => {
        const cargarDatosTurno = async () => {
            try {
                const respuesta = await obtenerTurnoPorIdAPI(id);
                if(respuesta && respuesta.status === 200){
                    const turno = await respuesta.json();
                    setMascota(turno.mascota);
                    setVeterinario(turno.veterinario);
                    setDetalleCita(turno.detalleCita);
                    setEstado(turno.estado);
                    
                    const fechaObj = new Date(turno.fecha);
                    setFecha(fechaObj.toISOString().split('T')[0]);
                    setHora(turno.hora);
                } else {
                    Swal.fire("Error", "No se pudo obtener el turno", "error");
                }
            } catch (error) {
                console.error(error);
            }
        };

        cargarDatosTurno();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!mascota || !veterinario || !detalleCita || !fecha || !hora || !estado){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

        const turnoActualizado = {
            mascota,
            veterinario,
            detalleCita,
            fecha,
            hora,
            estado
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
                        <Form.Group className="mb-3 bg-light p-3 rounded border">
                            <Form.Label className="fw-bold">Estado del Turno</Form.Label>
                            <Form.Select 
                                value={estado} 
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="pendiente">Pendiente </option>
                                <option value="realizado">Realizado </option>
                                <option value="cancelado">Cancelado </option>
                            </Form.Select>
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <Form.Group>
                                    <Form.Label>Nombre de la Mascota</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={mascota}
                                        onChange={(e) => setMascota(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Group>
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
                            </div>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label>Detalle de la Cita</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
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

                        <div className="text-end mt-3">
                            <Button 
                                variant="secondary" 
                                className="me-2" 
                                onClick={handleCancelar}
                                type="button"
                            >
                                Cancelar
                            </Button>
                            <Button variant="warning" type="submit" className="px-4">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarTurno;