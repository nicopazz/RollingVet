import { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarServicioAPI, obtenerServicioPorIdAPI, obtenerServiciosAPI } from '../../helpers/queries';

const EditarServicio = () => {
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatosServicio = async () => {
            const respuesta = await obtenerServicioPorIdAPI(id);
            if(respuesta && respuesta.status === 200){
                const servicio = await respuesta.json();
                setNombreServicio(servicio.nombreServicio);
                setDescripcion(servicio.descripcion);
                setPrecio(servicio.precio);
                setImagen(servicio.imagen);
            } else {
                Swal.fire("Error", "No se pudo obtener el servicio", "error");
            }
        };
        cargarDatosServicio();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(!nombreServicio || !descripcion || !precio || !imagen){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }
        if(precio < 0){
            Swal.fire("Error", "El precio debe ser mayor a 0", "error");
            return;
        }

        
        const respuestaServicios = await obtenerServiciosAPI();
        if (respuestaServicios && respuestaServicios.status === 200) {
            const serviciosExistentes = await respuestaServicios.json();
            
            const servicioDuplicado = serviciosExistentes.find(
                (item) => item.nombreServicio.toLowerCase() === nombreServicio.toLowerCase() && item._id !== id
            );

            if (servicioDuplicado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Nombre no disponible',
                    text: `El servicio "${nombreServicio}" ya existe.`
                });
                return;
            }
        }

        
        const servicioActualizado = {
            nombreServicio,
            descripcion,
            precio: parseFloat(precio),
            imagen
        };

        
        Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await editarServicioAPI(servicioActualizado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "El servicio fue modificado correctamente", "success");
            navigate('/administrador', { state: { section: 'servicios' } });
        } else {
            Swal.fire("Error", "Ocurrió un error al editar el servicio", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador', { state: { section: 'servicios' } });
    }

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark fw-bold">
                    <h4>Editar Servicio</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Servicio</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={nombreServicio}
                                onChange={(e) => setNombreServicio(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Form.Group>

                        <div className="text-end">
                            <Button variant="secondary" className="me-2" onClick={handleCancelar}>Cancelar</Button>
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

export default EditarServicio;