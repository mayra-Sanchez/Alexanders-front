import React, { useState } from 'react';
import './RegisterModal.css';
import { loginUser } from '../../../api/users.api';

const RegisterModal = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modo, setModo] = useState('login'); 
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const data = await loginUser(formData.email, formData.contraseña)
      console.log('Usuario autenticado:', data);
      localStorage.setItem('usuario', JSON.stringify(data));
      setIsOpen(false);
    } catch {
        alert('Error en el login, por favor verifica tus credenciales.');
    }
  };

  const toggleModo = () => {
    setModo(modo === 'registro' ? 'login' : 'registro');
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)} style={{ display: 'inline-block' }}>
        {trigger}
      </span>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modo === 'registro' ? 'Registro de Usuario' : 'Iniciar Sesión'}</h2>
            <form onSubmit={handleSubmit}>
              {modo === 'registro' && (
                <>
                  <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                  <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
                  <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                </>
              )}
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} required />

              <div className="modal-actions">
                <button type="submit">{modo === 'registro' ? 'Registrar' : 'Iniciar Sesión'}</button>
                <button type="button" onClick={() => setIsOpen(false)}>Cancelar</button>
              </div>

              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                {modo === 'registro' ? (
                  <>¿Ya tienes cuenta? <button type="button" className="link-button" onClick={toggleModo}>Inicia sesión</button></>
                ) : (
                  <>¿No tienes cuenta? <button type="button" className="link-button" onClick={toggleModo}>Regístrate</button></>
                )}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
