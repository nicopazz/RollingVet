import { useEffect, useState, useCallback } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarProfesionalAPI, obtenerProfesionalPorIdAPI } from '../../helpers/queries';

const EditarProfesional = () => {
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [imagen, setImagen] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    const cargarDatos = useCallback(async () => {
        const respuesta = await obtenerProfesionalPorIdAPI(id);
        if(respuesta && respuesta.status === 200){
            const datos = await respuesta.json();
            setNombre(datos.nombre);
            setEspecialidad(datos.especialidad);
            setImagen(datos.imagen);
        }
    }, [id]);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { cargarDatos(); }, [cargarDatos]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const proActualizado = { nombre, especialidad, imagen };
        
        Swal.fire({ title: 'Actualizando...', didOpen: () => Swal.showLoading() });
        const respuesta = await editarProfesionalAPI(proActualizado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "Profesional editado correctamente", "success");
            navigate('/administrador');
        } else {
            Swal.fire("Error", "No se pudo editar", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador');
    };

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark fw-bold"><h4>Editar Profesional</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
                                <option value="Veterinario">Veterinario</option>
                                <option value="Peluquero">Peluquero</option>
                                <option value="Asistente">Asistente</option>
                                <option value="Cirujano">Cirujano</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de Foto</Form.Label>
                            <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
                            <Button variant="warning" type="submit">Guardar Cambios</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditarProfesional;