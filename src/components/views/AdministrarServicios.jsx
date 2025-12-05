import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { borrarServicioAPI, obtenerServiciosAPI } from "../../helpers/queries";

const AdministrarServicios = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  
  const consultarAPI = async () => {
    const respuesta = await obtenerServiciosAPI();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setServicios(datos);
    } else {
      Swal.fire("Ocurrió un error", "Intente mas tarde", "error");
    }
  };

  useEffect(() => {
    
    const usuarioLogueado = JSON.parse(
      localStorage.getItem("usuarioRollingVet")
    );
    if (!usuarioLogueado) {
      navigate("/login");
    } else {
      consultarAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          consultarAPI(); // Recargamos la tabla
        } else {
          Swal.fire("Error", "No se pudo eliminar el servicio", "error");
        }
      }
    });
  };

  return (
    <Container className="mainSection my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 fw-bold">Gestión de Servicios</h1>
        <Link
          to="/administrador/crear-servicio"
          className="btn btn-success rounded-pill text-white ms-2"
        >
          <i className="bi bi-plus-circle me-2"></i>Nuevo Servicio
        </Link>
      </div>

      <hr />

      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm align-middle mt-4"
      >
        <thead className="bg-dark text-white">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <tr key={servicio._id}>
                <td className="text-center">
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombreServicio}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                  />
                </td>
                <td>{servicio.nombreServicio}</td>
                <td className="text-truncate" style={{ maxWidth: "300px" }}>
                  {servicio.descripcion}
                </td>
                <td>${servicio.precio}</td>
                <td className="text-center" style={{ width: "150px" }}>
                  <Link
                    to={`/administrador/editar-servicio/${servicio._id}`}
                    className="btn btn-warning me-2 btn-sm text-white"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm ms-2"
                    onClick={() => borrarServicio(servicio._id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No hay servicios registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="mt-4">
        <Link to="/administrador" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>Volver al Panel Principal
        </Link>
      </div>
    </Container>
  );
};

export default AdministrarServicios;
