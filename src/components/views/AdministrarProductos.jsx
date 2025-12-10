import { useEffect, useState, useCallback } from "react";
import { Container, Table, Button, Card, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { borrarProductoAPI, obtenerProductosAPI } from "../../helpers/queries";

const AdministrarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState(""); 
  const navigate = useNavigate();

  const consultarAPI = useCallback(async () => {
    const respuesta = await obtenerProductosAPI();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setProductos(datos);
    } else {
      Swal.fire("Ocurrió un error", "Intente mas tarde", "error");
    }
  }, []);

  useEffect(() => {
    const usuarioLogueado = JSON.parse(
      localStorage.getItem("usuarioRollingVet")
    );
    if (!usuarioLogueado) {
      navigate("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      consultarAPI();
    }
  }, [consultarAPI, navigate]);

  const borrarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoAPI(id);
        if (respuesta && respuesta.status === 200) {
          Swal.fire("Borrado!", "El producto ha sido eliminado.", "success");
          consultarAPI();
        } else {
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      }
    });
  };

  
  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold text-dark">Gestión de Productos</h1>
        
        
        <div className="d-flex gap-3">
            <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text className="bg-white border-end-0">
                    <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control 
                    placeholder="Buscar producto..." 
                    className="border-start-0 ps-0 shadow-none"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </InputGroup>

            <Link
            to="/administrador/crear-producto"
            className="btn btn-primary rounded-pill px-3 d-flex align-items-center"
            >
            <i className="bi bi-plus me-2"></i>Nuevo Producto
            </Link>
        </div>
      </div>

      <hr className="mb-4" />

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="py-3 ps-4">Imagen</th>
                <th className="py-3">Nombre</th>
                <th className="py-3" style={{ width: "40%" }}>
                  Descripción
                </th>
                <th className="py-3">Precio</th>
                <th className="py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
             
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto) => (
                  <tr key={producto._id} className="border-bottom">
                    <td className="ps-4">
                      <img
                        src={producto.imagen}
                        alt={producto.nombreProducto}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="rounded-circle border"
                      />
                    </td>
                    <td className="fw-semibold text-primary">
                      {producto.nombreProducto}
                    </td>
                    <td
                      className="text-muted small text-truncate"
                      style={{ maxWidth: "300px" }}
                    >
                      {producto.descripcion}
                    </td>
                    <td className="fw-bold">${producto.precio}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to={`/administrador/editar-producto/${producto._id}`}
                          className="btn btn-warning btn-sm text-white rounded-2"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm rounded-2"
                          onClick={() => borrarProducto(producto._id)}
                          title="Borrar"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No se encontraron productos coincidentes.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
          Mostrando {productosFiltrados.length} resultados
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdministrarProductos;