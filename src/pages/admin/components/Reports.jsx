import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from '../../../api/users.api';

const Reports = () => {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        setUserCount(response.length);
      } catch (err) {
        setError('Error al cargar reportes');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserCount();
  }, []);

  return (
    <div className="admin-card">
      <h2>Reportes</h2>
      {isLoading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {!isLoading && !error && (
        <div className="admin-sections">
          <div className="admin-card">
            <h2>Total de Usuarios</h2>
            <p className="text-2xl font-bold text-[#DC387F]">{userCount}</p>
          </div>
          <div className="admin-card">
            <h2>Otros Reportes</h2>
            <p>Más estadísticas pueden añadirse aquí.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;