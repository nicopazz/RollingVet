import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Inicio from './components/views/Inicio';
import Login from './components/views/Login'; 
import Registro from './components/views/Registro';
import Administrador from './components/views/Administrador';
import Error404 from './components/views/Error404';
import AcercaDeNosotros from './components/views/AcercaDeNosotros';
import CrearTurno from './components/views/CrearTurno';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          <Route path="/administrador/crear-turno" element={<CrearTurno />} />
          
          <Route path="*" element={<h1 className="text-center my-5">Error 404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;