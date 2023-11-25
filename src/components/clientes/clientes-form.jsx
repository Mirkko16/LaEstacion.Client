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
    dni: "",
    cuit: "",
    direccion: "",
    localidad: "",
    telefono: "",
    debe: 0.0,
    haber: 0.0,
    activo: false,
    cuentaCorriente: false,
    tarjetaSocio: false,
    puntosTarjeta: 0,
    numeroTarjeta: ""
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

  const handleEditChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setCliente((prevCliente) => ({ ...prevCliente, [id]: newValue }));
  };

  const aceptarCambios = async () => {
    if (cliente.id === -1) await agregar(cliente);
    else await modificar(cliente);
    navigate(-1);
    setCliente((prevCliente) => ({ ...prevCliente, id: prevCliente.id === -1 ? -2 : -1 }));
  };

  const cancelarCambios = () => {
    navigate(-1);
  };

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
        <input type="text" className="form-control" id="idCliente" value={cliente.id} readOnly disabled />
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="nombre" value={cliente.nombre} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input type="text" className="form-control" id="apellido" value={cliente.apellido} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="dni" className="form-label">
            DNI
          </label>
          <input type="text" className="form-control" id="dni" value={cliente.dni} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="cuit" className="form-label">
            CUIT
          </label>
          <input type="text" className="form-control" id="cuit" value={cliente.cuit} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="direccion" className="form-label">
            Direccion
          </label>
          <input type="text" className="form-control" id="direccion" value={cliente.direccion} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="localidad" className="form-label">
            Localidad
          </label>
          <input type="text" className="form-control" id="localidad" value={cliente.localidad} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input type="text" className="form-control" id="telefono" value={cliente.telefono} onChange={handleEditChange} />
        </div>
        <div className="col">
          <label htmlFor="numeroTarjeta" className="form-label">
            Numero Tarjeta
          </label>
          <input type="text" className="form-control" id="numeroTarjeta" value={cliente.numeroTarjeta} onChange={handleEditChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="debe" className="form-label">
            Debe
          </label>
          <input type="text" className="form-control" id="debe" value={cliente.debe} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="haber" className="form-label">
            Haber
          </label>
          <input type="text" className="form-control" id="haber" value={cliente.haber} onChange={handleEditChange} />
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
              checked={cliente.activo}
              onChange={handleEditChange}
            />
            <label htmlFor="activo" className="form-check-label">
              Activo
            </label>
          </div>
        </div>

        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="cuentaCorriente"
              name="cuentaCorriente"
              checked={cliente.cuentaCorriente}
              onChange={handleEditChange}
            />
            <label htmlFor="cuentaCorriente" className="form-check-label">
              Cuenta Corriente
            </label>
          </div>
        </div>

        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="tarjetaSocio"
              name="tarjetaSocio"
              checked={cliente.tarjetaSocio}
              onChange={handleEditChange}
            />
            <label htmlFor="tarjetaSocio" className="form-check-label">
              Tarjeta Socio
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
