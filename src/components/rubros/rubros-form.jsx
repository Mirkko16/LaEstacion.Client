import React, { useEffect, useState } from "react";
import { agregar, getRubro, modificar } from "./rubros-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormRubro() {
  const [error, setError] = useState(null);
  const params = useParams();
  const estadoInicial = {
    id: -1,
    nombre: "",
    eliminado: false
  };
  const [rubro, setRubro] = useState(estadoInicial);

  useEffect(() => {
    if (params.id) {
      getRubro(parseInt(params.id, 10))
        .then((resp) => {
          setRubro(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.message));
    }
  }, []);

  const navigate = useNavigate();

  const handleEditChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setRubro((prevRubro) => ({ ...prevRubro, [id]: newValue }));
  };

  const aceptarCambios = async () => {
    if (rubro.id === -1) await agregar(rubro);
    else await modificar(rubro);
    navigate(-1);
    setRubro((prevRubro) => ({ ...prevRubro, id: prevRubro.id === -1 ? -2 : -1 }));
  };

  const cancelarCambios = () => {
    navigate(-1);
  };

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos del Rubro</h2>

      <div className="mb-3 col-2">
        <label htmlFor="idRubro" className="form-label">
          Id
        </label>
        <input type="text" className="form-control" id="idRubro" value={rubro.id} readOnly disabled />
      </div>

      <div className="mb-3 row" />
      <div className="col">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input type="text" className="form-control" id="nombre" value={rubro.nombre} onChange={handleEditChange} />
      </div>
      <div className="mb-3 row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="eliminado"
              name="eliminado"
              checked={rubro.eliminado}
              onChange={handleEditChange}
            />
            <label htmlFor="eliminado" className="form-check-label">
              Eliminado
            </label>
            <div className="mb-3 text-end">
              <button className="btn btn-primary me-1" onClick={aceptarCambios}>
                Aceptar
              </button>
              <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
