import React, { useEffect, useState } from "react";
import { agregar, getUsuario, modificar } from "./usuarios-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormUsuario() {
  const [error, setError] = useState(null);
  const params = useParams();
  const estadoInicial = {
    id: -1,
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    correo: "",
    rol: "",
    activo: false
  };
  const [usuario, setUsuario] = useState(estadoInicial);

  useEffect(() => {
    if (params.id) {
      getUsuario(parseInt(params.id, 10))
        .then((resp) => {
          setUsuario(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.message));
    }
  }, []);

  const navigate = useNavigate();

  const handleEditChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUsuario((prevUsuario) => ({ ...prevUsuario, [id]: newValue }));
  };

  const aceptarCambios = async () => {
    if (usuario.id === -1) await agregar(usuario);
    else await modificar(usuario);
    navigate(-1);
    setUsuario((prevUsuario) => ({ ...prevUsuario, id: prevUsuario.id === -1 ? -2 : -1 }));
  };

  const cancelarCambios = () => {
    navigate(-1);
  };

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos del Usuario</h2>

      <div className="mb-3 col-2">
        <label htmlFor="idUsuario" className="form-label">
          Id
        </label>
        <input type="text" className="form-control" id="idUsuario" value={usuario.id} readOnly disabled />
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="nombre" value={usuario.nombre} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input type="text" className="form-control" id="apellido" value={usuario.apellido} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input type="text" className="form-control" id="username" value={usuario.username} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="text" className="form-control" id="password" value={usuario.password} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input type="text" className="form-control" id="correo" value={usuario.correo} onChange={handleEditChange} />
        </div>
        <div className="col">
          <label htmlFor="rol" className="form-label">
            Rol
          </label>
          <select
            className="form-select"
            id="rol"
            value={usuario.rol}
            onChange={handleEditChange}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="activo"
              name="activo"
              checked={usuario.activo}
              onChange={handleEditChange}
            />
            <label htmlFor="activo" className="form-check-label">
              Activo
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary me-1" onClick={aceptarCambios}>
          Aceptar
        </button>
        <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
