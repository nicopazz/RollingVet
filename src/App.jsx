import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Inicio from './components/views/Inicio';
// Importamos los componentes de enrutamiento
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Usamos flexbox para que el footer siempre quede abajo (min-vh-100 ocupa toda la altura)
    <div className="App d-flex flex-column min-vh-100">
      
      <Menu />
      
      {/* main con flex-grow-1 empuja el footer hacia abajo si hay poco contenido */}
      <main className="flex-grow-1">
        <Routes>
          {/* Cuando la URL es exacta "/", mostramos el componente Inicio */}
          <Route path="/" element={<Inicio />} />
          
          {/* El * captura cualquier ruta que no exista (Error 404) */}
          <Route path="*" element={<h1 className="text-center my-5">Error 404 - Página no encontrada</h1>} />
        </Routes>
      </main>
      
      <Footer />
      
    </div>
  );
}

export default App;