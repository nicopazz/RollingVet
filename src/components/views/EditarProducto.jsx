import { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editarProductoAPI, obtenerProductoPorIdAPI, obtenerProductosAPI } from '../../helpers/queries';

const EditarProducto = () => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatosProducto = async () => {
            const respuesta = await obtenerProductoPorIdAPI(id);
            if(respuesta && respuesta.status === 200){
                const producto = await respuesta.json();
                setNombreProducto(producto.nombreProducto);
                setDescripcion(producto.descripcion);
                setPrecio(producto.precio);
                setImagen(producto.imagen);
            } else {
                Swal.fire("Error", "No se pudo obtener el producto", "error");
            }
        };
        cargarDatosProducto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(!nombreProducto || !descripcion || !precio || !imagen){
             Swal.fire("Error", "Todos los campos son obligatorios", "error");
             return;
        }
        if(precio < 0){
            Swal.fire("Error", "El precio debe ser mayor a 0", "error");
            return;
        }

        
        const respuestaProductos = await obtenerProductosAPI();
        if (respuestaProductos && respuestaProductos.status === 200) {
            const productosExistentes = await respuestaProductos.json();
            
            const productoDuplicado = productosExistentes.find(
                (item) => item.nombreProducto.toLowerCase() === nombreProducto.toLowerCase() && item._id !== id
            );

            if (productoDuplicado) {
                Swal.fire({
                    icon: 'error',
                    title: 'Nombre no disponible',
                    text: `El producto "${nombreProducto}" ya existe.`
                });
                return;
            }
        }

        
        const productoActualizado = {
            nombreProducto,
            descripcion,
            precio: parseFloat(precio),
            imagen
        };

        
        Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const respuesta = await editarProductoAPI(productoActualizado, id);

        if(respuesta && respuesta.status === 200){
            Swal.fire("Actualizado", "El producto fue modificado correctamente", "success");
            navigate('/administrador', { state: { section: 'productos' } });
        } else {
            Swal.fire("Error", "Ocurrió un error al editar el producto", "error");
        }
    };

    const handleCancelar = () => {
        navigate('/administrador', { state: { section: 'productos' } });
    }

    return (
        <Container className="mainSection my-5">
            <Card className="shadow">
                <Card.Header className="bg-warning text-dark fw-bold">
                    <h4>Editar Producto</h4>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={nombreProducto}
                                onChange={(e) => setNombreProducto(e.target.value)}
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

export default EditarProducto;