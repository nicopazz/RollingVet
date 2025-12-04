import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { borrarTurnoAPI, obtenerTurnosAPI } from "../../helpers/queries";
import { Link, useNavigate } from "react-router-dom";

const Administrador = () => {
  const [turnos, setTurnos] = useState([]);
  const navigate = useNavigate();

  const consultarAPI = async () => {
    const respuesta = await obtenerTurnosAPI();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      setTurnos(datos);
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
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      consultarAPI();
     
    }
  }, [navigate]);

  const borrarTurno = (id) => {
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
        const respuesta = await borrarTurnoAPI(id);
        if (respuesta && respuesta.status === 200) {
          Swal.fire("Borrado!", "El turno ha sido eliminado.", "success");
          consultarAPI();
        } else {
          Swal.fire("Error", "No se pudo eliminar el turno", "error");
        }
      }
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioRollingVet");
    navigate("/");
  };

  return (
    <Container className="mainSection my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 fw-bold">Panel de Administración</h1>
        <div>
          <Button
            variant="danger"
            className="me-2 rounded-pill"
            onClick={cerrarSesion}
          >
            <i className="bi bi-box-arrow-right me-2"></i>Salir
          </Button>
          <Button
            variant="primary"
            className="rounded-pill"
            as={Link}
            to="/administrador/crear-turno"
          >
            <i className="bi bi-calendar-plus me-2"></i>Nuevo Turno
          </Button>
        </div>
      </div>

      <hr />

      <h3 className="my-4 text-primary">
        <i className="bi bi-calendar-check me-2"></i>
        Listado de Turnos
      </h3>

      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm align-middle"
      >
        <thead className="bg-dark text-white">
          <tr>
            <th>Mascota</th>
            <th>Veterinario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <tr key={turno._id}>
                <td>{turno.mascota}</td>
                <td>{turno.veterinario}</td>
                <td>{new Date(turno.fecha).toLocaleDateString()}</td>
                <td>{turno.hora}</td>
                <td>
                  <span
                    className={`badge ${
                      turno.estado === "realizado"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {turno.estado}
                  </span>
                </td>
                <td className="text-center">
                  <Link
                    to={`/administrador/editar-turno/${turno._id}`}
                    className="btn btn-warning me-2 btn-sm text-white"
                    title="Editar"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => borrarTurno(turno._id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No hay turnos registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Administrador;
