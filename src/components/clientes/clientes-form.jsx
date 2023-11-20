import React, { useEffect, useState } from "react";
import { agregar, getCliente, modificar } from "./clientes-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormCliente() {
  const [error, setError] = useState(null);
  const params = useParams();
  const estadoInicial = {
    id: -1,
    nombre: "",
    apellido: "",
    cuit: "",
    direccion: "",
    telefono: "",
    cuentaCorriente: "",
    saldo: 0.0,
  };
  const [cliente, setCliente] = useState(estadoInicial);

  useEffect(() => {
    if (params.id) {
      getCliente(parseInt(params.id, 10))
        .then((resp) => {
          setCliente(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.message));
    }
  }, []);

  const navigate = useNavigate();

  function handleEditChange(e) {
    const { id, value, type, checked } = e.target;
  
    // Si es un checkbox, use checked directamente, de lo contrario, use value
    const newValue = type === 'checkbox' ? checked : value;
  
    setCliente((prevCliente) => ({
      ...prevCliente,
      [id]: newValue,
    }));
  }

  async function aceptarCambios() {
    if (cliente.id === -1) await agregar(cliente);
    else await modificar(cliente);
    navigate(-1);
  }

  function cancelarCambios() {
    navigate(-1);
  }

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos del cliente</h2>
      <div className="mb-3 col-2">
        <label htmlFor="idCliente" className="form-label">
          Id
        </label>
        <input
          type="text"
          className="form-control"
          id="idCliente"
          value={cliente.id}
          readOnly={true}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre Cliente
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={cliente.nombre}
          onChange={handleEditChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">
          Apellido
        </label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          value={cliente.apellido}
          onChange={handleEditChange}
        />
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="cuit" className="form-label">
          Cuit/Cuil
        </label>
        <input
          type="text"
          className="form-control"
          id="cuit"
          value={cliente.cuit}
          onChange={handleEditChange}
        />
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="direccion" className="form-label">
          Direccion
        </label>
        <input
          type="text"
          className="form-control"
          id="direccion"
          value={cliente.direccion}
          onChange={handleEditChange}
        />
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="telefono" className="form-label">
          Telefono
        </label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          value={cliente.telefono}
          onChange={handleEditChange}
        />
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="cuentaCorriente" className="form-label">
          Cuenta Corriente
        </label>
        <select
          className="form-select"
          id="cuentaCorriente"
          value={cliente.cuentaCorriente ? "SI" : "NO"}
          onChange={handleEditChange}
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-3 col-2">
        <label htmlFor="saldo" className="form-label">
          Saldo
        </label>
        <input
          type="number"
          className="form-control"
          id="saldo"
          value={cliente.saldo}
          onChange={handleEditChange}
        />
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
