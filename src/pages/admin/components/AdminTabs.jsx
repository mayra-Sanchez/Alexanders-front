const AdminTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="admin-tabs">
      {['users', 'products', 'reports'].map(tab => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => setActiveTab(tab)}
        >
          {tab === 'users' && 'Usuarios'}
          {tab === 'products' && 'Productos'}
          {tab === 'reports' && 'Reportes'}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;