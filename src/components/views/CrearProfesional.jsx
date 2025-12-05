import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearProfesionalAPI } from '../../helpers/queries';

const CrearProfesional = () => {
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [imagen, setImagen] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nombre || !especialidad || !imagen){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }

        const nuevoProfesional = { nombre, especialidad, imagen };

        Swal.fire({
            title: 'Guardando...',
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await crearProfesionalAPI(nuevoProfesional);

        if(respuesta && respuesta.status === 201){
            Swal.fire("Éxito", "Profesional creado correctamente", "success");
            navigate('/administrador', { state: { section: 'profesionales' } });
        } else {
            const errorData = await respuesta.json();
            Swal.fire("Error", errorData.mensaje || "Ocurrió un error", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador', { state: { section: 'profesionales' } });
    };


    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white fw-bold"><h4>Nuevo Profesional</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control type="text" placeholder="Ej: Dra. Ana Grey" onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Select onChange={(e) => setEspecialidad(e.target.value)}>
                                <option value="">Seleccione una opción</option>
                                <option value="Veterinario">Veterinario</option>
                                <option value="Peluquero">Peluquero</option>
                                <option value="Asistente">Asistente</option>
                                <option value="Cirujano">Cirujano</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de Foto</Form.Label>
                            <Form.Control type="text" placeholder="https://..." onChange={(e) => setImagen(e.target.value)} />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CrearProfesional;