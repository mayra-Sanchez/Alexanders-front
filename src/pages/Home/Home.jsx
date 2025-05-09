import { useEffect, useState } from 'react';
import RegisterModal from '../../components/Home/Modals/RegisterModal';
import './Home.css';

const Home = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      console.log(usuarioGuardado);
      
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Home</h2>

      {usuario ? (
        <>
          <p className='user-name'>Bienvenido, {usuario.user.first_name}!</p>
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </>
      ) : (
        <RegisterModal trigger={<button className="register-button">Inicia Sesión</button>} />
      )}
    </div>
  );
};

export default Home;
