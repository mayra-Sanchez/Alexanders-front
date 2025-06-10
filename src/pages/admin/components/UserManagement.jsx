import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getUsers, deleteUser } from '../../../api/users.api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (err) {
        setError('Error al cargar usuarios');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  return (
    <div className="admin-card">
      <h2>Gestión de Usuarios</h2>
      {isLoading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {users.length === 0 && !isLoading && !error && (
        <p className="empty-state">No hay usuarios disponibles.</p>
      )}
      {users.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <button className="action-btn edit-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;