import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
  
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioRollingVet")) || null;

  
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  
   if (usuarioLogueado.rol !== 'admin') {
     return <Navigate to="/" replace />;
   }

 
  return children;
};

export default RutaProtegida;