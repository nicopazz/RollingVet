import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';

// componentes comunes
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import RutaProtegida from './routes/RutaProtegida'; 

// vistas Públicas
import Inicio from './components/views/Inicio';
import Login from './components/views/Login';
import Registro from './components/views/Registro';
import AcercaDeNosotros from './components/views/AcercaDeNosotros';
import Contacto from './components/views/Contacto'; 
import DetallePlan from './components/views/DetallePlan'; 
import ReservarTurno from './components/views/ReservarTurno';
import MisTurnos from './components/views/MisTurnos';
import Error404 from './components/views/Error404';

// vistas Admin
import Administrador from './components/views/Administrador';
import AdministrarTurnos from './components/views/AdministrarTurnos';
import CrearTurno from './components/views/CrearTurno';
import EditarTurno from './components/views/EditarTurno';
import AdministrarServicios from './components/views/AdministrarServicios';
import CrearServicio from './components/views/CrearServicio';
import EditarServicio from './components/views/EditarServicio';
import AdministrarProductos from './components/views/AdministrarProductos';
import CrearProducto from './components/views/CrearProducto';
import EditarProducto from './components/views/EditarProducto';
import AdministrarProfesionales from './components/views/AdministrarProfesionales';
import CrearProfesional from './components/views/CrearProfesional';
import EditarProfesional from './components/views/EditarProfesional';
import AdministrarPacientes from './components/views/AdministrarPacientes';
import CrearPaciente from './components/views/CrearPaciente';
import EditarPaciente from './components/views/EditarPaciente';
import AdministrarUsuarios from './components/views/AdministrarUsuarios';
import CrearUsuario from './components/views/CrearUsuario';
import EditarUsuario from './components/views/EditarUsuario';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Menu />
      <main className="flex-grow-1">
        <Routes>
          
          {/* rutas publicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/planes" element={<DetallePlan />} />

          {/* rutas con inicio de sesion */}
          <Route path="/reservar-turno" element={<ReservarTurno />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
          
          {/* rutas privadas(admin) */}
          <Route 
            path="/administrador/*" 
            element={
              <RutaProtegida>
                <Administrador />
              </RutaProtegida>
            } 
          >
          </Route>
          <Route path="/administrador/turnos" element={<RutaProtegida><AdministrarTurnos /></RutaProtegida>} />
          <Route path="/administrador/crear-turno" element={<RutaProtegida><CrearTurno /></RutaProtegida>} />
          <Route path="/administrador/editar-turno/:id" element={<RutaProtegida><EditarTurno /></RutaProtegida>} />

          <Route path="/administrador/servicios" element={<RutaProtegida><AdministrarServicios /></RutaProtegida>} />
          <Route path="/administrador/crear-servicio" element={<RutaProtegida><CrearServicio /></RutaProtegida>} />
          <Route path="/administrador/editar-servicio/:id" element={<RutaProtegida><EditarServicio /></RutaProtegida>} />

          <Route path="/administrador/productos" element={<RutaProtegida><AdministrarProductos /></RutaProtegida>} />
          <Route path="/administrador/crear-producto" element={<RutaProtegida><CrearProducto /></RutaProtegida>} />
          <Route path="/administrador/editar-producto/:id" element={<RutaProtegida><EditarProducto /></RutaProtegida>} />

          <Route path="/administrador/profesionales" element={<RutaProtegida><AdministrarProfesionales /></RutaProtegida>} />
          <Route path="/administrador/crear-profesional" element={<RutaProtegida><CrearProfesional /></RutaProtegida>} />
          <Route path="/administrador/editar-profesional/:id" element={<RutaProtegida><EditarProfesional /></RutaProtegida>} />

          <Route path="/administrador/pacientes" element={<RutaProtegida><AdministrarPacientes /></RutaProtegida>} />
          <Route path="/administrador/crear-paciente" element={<RutaProtegida><CrearPaciente /></RutaProtegida>} />
          <Route path="/administrador/editar-paciente/:id" element={<RutaProtegida><EditarPaciente /></RutaProtegida>} />

          <Route path="/administrador/usuarios" element={<RutaProtegida><AdministrarUsuarios /></RutaProtegida>} />
          <Route path="/administrador/crear-usuario" element={<RutaProtegida><CrearUsuario /></RutaProtegida>} />
          <Route path="/administrador/editar-usuario/:id" element={<RutaProtegida><EditarUsuario /></RutaProtegida>} />
          
          {/* ruta de eror 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;