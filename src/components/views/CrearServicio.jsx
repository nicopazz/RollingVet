import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearServicioAPI, obtenerServiciosAPI } from '../../helpers/queries';

const CrearServicio = () => {
    const [nombreServicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    
    const navigate = useNavigate();

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

       
        Swal.fire({
            title: 'Verificando...',
            didOpen: () => Swal.showLoading()
        });

        const respuestaServicios = await obtenerServiciosAPI();
        
        if (respuestaServicios && respuestaServicios.status === 200) {
            const serviciosExistentes = await respuestaServicios.json();
            
           
            const servicioDuplicado = serviciosExistentes.find(
                (servicio) => servicio.nombreServicio.toLowerCase() === nombreServicio.toLowerCase()
            );

            if (servicioDuplicado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Servicio existente',
                    text: `El servicio "${nombreServicio}" ya existe en la base de datos.`
                });
                return; 
            }
        } else {
            Swal.fire("Error", "No se pudo verificar la disponibilidad", "error");
            return;
        }

        
        const nuevoServicio = {
            nombreServicio,
            descripcion,
            precio: parseFloat(precio),
            imagen
        };

        
        Swal.fire({
            title: 'Guardando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await crearServicioAPI(nuevoServicio);

        if(respuesta && respuesta.status === 201){
            Swal.fire("Éxito", "El servicio fue creado correctamente", "success");
            navigate('/administrador/servicios');
        } else {
            const errorData = await respuesta.json();
            Swal.fire("Error", errorData.mensaje || "Ocurrió un error al crear el servicio", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador');
    };

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-success text-white fw-bold">
                    <h4>Nuevo Servicio</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Servicio</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: Baño y Corte"
                                value={nombreServicio}
                                onChange={(e) => setNombreServicio(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Ej: 5000"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ej: https://..."
                                value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Copia y pega una URL de imagen válida (terminada en .jpg, .png)
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Breve descripción del tratamiento..."
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </Form.Group>

                        <div className="text-end">
                            <Button 
                                variant="secondary" 
                                className="me-2" 
                                onClick={handleCancelar}
                                type="button"
                            >
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit" className="px-4">
                                Guardar Servicio
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CrearServicio;