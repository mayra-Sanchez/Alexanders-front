import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loginUser, registerUser } from '../../api/users.api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './RegisterModal.css';

const MySwal = withReactContent(Swal);

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    telefono: '',
    email: '',
    password: '',
    rol: 'Cliente',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showErrorAlert = (message) => {
    MySwal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#DC387F',
    });
  };

  const showSuccessAlert = (message) => {
    MySwal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      confirmButtonColor: '#DC387F',
      timer: 2000
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        const userData = await loginUser(formData.email, formData.password);
        localStorage.setItem('user', JSON.stringify(userData.user));
        showSuccessAlert('Inicio de sesión exitoso');
        onLoginSuccess(userData.user);
        if (userData.user.rol.toLowerCase() === 'administrador') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        await registerUser(formData);
        showSuccessAlert('Registro exitoso. Ahora puedes iniciar sesión');
        setAuthMode('login');
      }
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message;
      showErrorAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="auth-modal-header">
          <h2>{authMode === 'login' ? 'Inicia Sesión' : 'Regístrate'}</h2>
          <p>
            {authMode === 'login'
              ? 'Accede a tu cuenta para disfrutar de todas las ventajas'
              : 'Únete a nuestra comunidad y descubre un mundo de posibilidades'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === 'register' && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Nombre"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Apellido"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  required
                  className="auth-select"
                >
                  <option value="cliente">Cliente</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'
            )}
          </button>

          <div className="auth-mode-switch">
            {authMode === 'login' ? (
              <p>
                ¿No tienes cuenta?{' '}
                <button type="button" onClick={switchAuthMode}>
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{' '}
                <button type="button" onClick={switchAuthMode}>
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;