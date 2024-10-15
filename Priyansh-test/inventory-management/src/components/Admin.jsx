import React, { useState } from 'react';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Settings from './Settings';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('userManagement'); 

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-nav">
        <button onClick={() => setActiveTab('userManagement')}>User Management</button>
        <button onClick={() => setActiveTab('reports')}>Reports</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </div>

      <div className="admin-content">
        {activeTab === 'userManagement' && <UserManagement />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default Admin;
