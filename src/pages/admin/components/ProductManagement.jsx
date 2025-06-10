import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getProducts, deleteProduct } from '../../../api/products.api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        setError('Error al cargar productos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        setError('Error al eliminar producto');
      }
    }
  };

  return (
    <div className="admin-card">
      <div className="flex justify-between items-center mb-4">
        <h2>Gestión de Productos</h2>
        <button className="admin-btn">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Añadir Producto
        </button>
      </div>
      {isLoading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {products.length === 0 && !isLoading && !error && (
        <p className="empty-state">No hay productos disponibles.</p>
      )}
      {products.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <button className="action-btn edit-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteProduct(p.id)}
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

export default ProductManagement;