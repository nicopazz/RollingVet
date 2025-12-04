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
          
          {/* Rutas de Administración */}
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/administrador/crear-turno" element={<CrearTurno />} />
          <Route path="/administrador/editar-turno/:id" element={<EditarTurno />} />
          <Route path="/administrador/crear-servicio" element={<CrearServicio />} />
          
          {/* Ruta de Error (Siempre al final) */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;