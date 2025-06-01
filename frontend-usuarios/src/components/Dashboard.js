import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserCrud from './UserCrud';
import ClientCrud from './ClientCrud';
import ProviderCrud from './ProviderCrud';
import { useAuth } from './AuthContext';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Dashboard</Link>
          <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container mt-4">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clients">Clients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/providers">Providers</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/users" element={<UserCrud />} />
          <Route path="/clients" element={<ClientCrud />} />
          <Route path="/providers" element={<ProviderCrud />} />
          <Route path="/" element={<div>Welcome to the Dashboard!</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;