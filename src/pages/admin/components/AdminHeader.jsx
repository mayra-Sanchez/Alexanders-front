import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ user, onLogout }) => {
  return (
    <nav className="admin-header">
      <h1>Panel de Administración</h1>
      <div className="user-info">
        <span>Bienvenido, {user.first_name} {user.last_name}</span>
        <button className="logout-btn" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;