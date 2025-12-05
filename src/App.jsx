import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Inicio from './components/views/Inicio';
import Login from './components/views/Login';
import Registro from './components/views/Registro';
import Administrador from './components/views/Administrador';
import Error404 from './components/views/Error404';
import AcercaDeNosotros from './components/views/AcercaDeNosotros';
import CrearTurno from './components/views/CrearTurno';
import EditarTurno from './components/views/EditarTurno';
import CrearServicio from './components/views/CrearServicio';
import AdministrarServicios from './components/views/AdministrarServicios';
import EditarServicio from './components/views/EditarServicio';
import AdministrarProfesionales from './components/views/AdministrarProfesionales';
import CrearProfesional from './components/views/CrearProfesional';
import EditarProfesional from './components/views/EditarProfesional';
import AdministrarPacientes from './components/views/AdministrarPacientes';
import CrearPaciente from './components/views/CrearPaciente';
import EditarPaciente from './components/views/EditarPaciente';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          
          {/* Ruta de Administración */}
          <Route path="/administrador" element={<Administrador />} />

          {/* Rutas de turnos */}
          <Route path="/administrador/crear-turno" element={<CrearTurno />} />
          <Route path="/administrador/editar-turno/:id" element={<EditarTurno />} />

          {/* Rutas de servicios */}
          <Route path="/administrador/crear-servicio" element={<CrearServicio />} />
          <Route path="/administrador/servicios" element={<AdministrarServicios />} />
          <Route path="/administrador/editar-servicio/:id" element={<EditarServicio />} />

          {/* Rutas de profesionales */}
          <Route path="/administrador/profesionales" element={<AdministrarProfesionales />} />
          <Route path="/administrador/crear-profesional" element={<CrearProfesional />} />
          <Route path="/administrador/editar-profesional/:id" element={<EditarProfesional />} />

          {/* Rutas de pacientes */}
          <Route path="/administrador/pacientes" element={<AdministrarPacientes />} />
          <Route path="/administrador/crear-paciente" element={<CrearPaciente />} />
          <Route path="/administrador/editar-paciente/:id" element={<EditarPaciente />} />
          
          {/* Ruta de Error */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;