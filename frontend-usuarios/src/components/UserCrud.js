import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserCrud() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ nombre: '', nombreUsuario: '', password: '', email: '', numeroDocumento: '', idTipoDocumento: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8080/api/usuarios/list');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await axios.put('http://localhost:8080/api/usuarios/', { ...form, id: editingId });
    } else {
      await axios.post('http://localhost:8080/api/usuarios/', form);
    }
    setForm({ nombre: '', nombreUsuario: '', password: '', email: '', numeroDocumento: '', idTipoDocumento: '' });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = user => {
    setForm(user);
    setEditingId(user.id);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:8080/api/usuarios/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h4>Users</h4>
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <input name="nombre" className="form-control" placeholder="Name" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="nombreUsuario" className="form-control" placeholder="Username" value={form.nombreUsuario} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="password" type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="numeroDocumento" className="form-control" placeholder="Document Number" value={form.numeroDocumento} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input name="idTipoDocumento" className="form-control" placeholder="Document Type ID" value={form.idTipoDocumento} onChange={handleChange} required />
        </div>
        <div className="col-md-12">
          <button className="btn btn-success me-2" type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button className="btn btn-secondary" type="button" onClick={() => { setEditingId(null); setForm({ nombre: '', nombreUsuario: '', password: '', email: '', numeroDocumento: '', idTipoDocumento: '' }); }}>Cancel</button>}
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Document Number</th>
            <th>Document Type ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.nombreUsuario}</td>
              <td>{user.email}</td>
              <td>{user.numeroDocumento}</td>
              <td>{user.idTipoDocumento?.id_tipodocumento || user.idTipoDocumento}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCrud;