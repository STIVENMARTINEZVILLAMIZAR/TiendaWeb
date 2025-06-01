import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientCrud() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', numeroDocumento: '', idTipoDocumento: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchClients = async () => {
    const res = await axios.get('http://localhost:8080/api/clientes/list');
    setClients(res.data);
  };

  useEffect(() => { fetchClients(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editingId) {
      await axios.put('http://localhost:8080/api/clientes/', { ...form, id: editingId });
    } else {
      await axios.post('http://localhost:8080/api/clientes/', form);
    }
    setForm({ nombre: '', email: '', numeroDocumento: '', idTipoDocumento: '' });
    setEditingId(null);
    fetchClients();
  };

  const handleEdit = client => {
    setForm(client);
    setEditingId(client.id);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:8080/api/clientes/${id}`);
    fetchClients();
  };

  return (
    <div>
      <h4>Clients</h4>
      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input name="nombre" className="form-control" placeholder="Name" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="numeroDocumento" className="form-control" placeholder="Document Number" value={form.numeroDocumento} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="idTipoDocumento" className="form-control" placeholder="Document Type ID" value={form.idTipoDocumento} onChange={handleChange} required />
        </div>
        <div className="col-md-12">
          <button className="btn btn-success me-2" type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button className="btn btn-secondary" type="button" onClick={() => { setEditingId(null); setForm({ nombre: '', email: '', numeroDocumento: '', idTipoDocumento: '' }); }}>Cancel</button>}
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Document Number</th>
            <th>Document Type ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.nombre}</td>
              <td>{client.email}</td>
              <td>{client.numeroDocumento}</td>
              <td>{client.idTipoDocumento?.id_tipodocumento || client.idTipoDocumento}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(client)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientCrud;