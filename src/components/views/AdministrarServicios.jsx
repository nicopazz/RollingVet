import { useEffect, useState, useCallback } from "react";
import { Container, Table, Button, Card, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { borrarServicioAPI, obtenerServiciosAPI } from "../../helpers/queries";

const AdministrarServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState(""); 
  const navigate = useNavigate();

  const consultarAPI = useCallback(async () => {
    const respuesta = await obtenerServiciosAPI();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setServicios(datos);
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

  const borrarServicio = (id) => {
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
        const respuesta = await borrarServicioAPI(id);
        if (respuesta && respuesta.status === 200) {
          Swal.fire("Borrado!", "El servicio ha sido eliminado.", "success");
          consultarAPI();
        } else {
          Swal.fire("Error", "No se pudo eliminar el servicio", "error");
        }
      }
    });
  };

  const serviciosFiltrados = servicios.filter((servicio) =>
    servicio.nombreServicio.toLowerCase().includes(busqueda.toLowerCase()) ||
    servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5 fw-bold text-dark">Gestión de Servicios</h1>
        
        <div className="d-flex gap-3">
            <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text className="bg-white border-end-0">
                    <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control 
                    placeholder="Buscar servicio..." 
                    className="border-start-0 ps-0 shadow-none"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </InputGroup>
            
            <Link
            to="/administrador/crear-servicio"
            className="btn btn-primary rounded-pill px-3 d-flex align-items-center text-nowrap"
            >
            <i className="bi bi-plus-lg me-2"></i>Nuevo Servicio
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
              
              {serviciosFiltrados.length > 0 ? (
                serviciosFiltrados.map((servicio) => (
                  <tr key={servicio._id} className="border-bottom">
                    <td className="ps-4">
                      <img
                        src={servicio.imagen}
                        alt={servicio.nombreServicio}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                        className="rounded-circle border"
                      />
                    </td>
                    <td className="fw-semibold text-primary">
                      {servicio.nombreServicio}
                    </td>
                    <td
                      className="text-muted small text-truncate"
                      style={{ maxWidth: "300px" }}
                    >
                      {servicio.descripcion}
                    </td>
                    <td className="fw-bold">${servicio.precio}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to={`/administrador/editar-servicio/${servicio._id}`}
                          className="btn btn-warning btn-sm text-white rounded-2"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm rounded-2"
                          onClick={() => borrarServicio(servicio._id)}
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
                    No se encontraron servicios coincidentes.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className="bg-white border-0 py-3 text-end text-muted small">
          Mostrando {serviciosFiltrados.length} resultados
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdministrarServicios;