import React, { useEffect, useState } from "react";
import { agregar, getMarca, modificar } from "./marcas-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormMarca() {
  const [error, setError] = useState(null);
  const params = useParams();
  const estadoInicial = {
    id: -1,
    nombre: "",
    eliminada: false
  };
  const [marca, setMarca] = useState(estadoInicial);

  useEffect(() => {
    if (params.id) {
      getMarca(parseInt(params.id, 10))
        .then((resp) => {
          setMarca(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.message));
    }
  }, []);

  const navigate = useNavigate();

  const handleEditChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setMarca((prevMarca) => ({ ...prevMarca, [id]: newValue }));
  };

  const aceptarCambios = async () => {
    if (marca.id === -1) await agregar(marca);
    else await modificar(marca);
    navigate(-1);
    setMarca((prevMarca) => ({ ...prevMarca, id: prevMarca.id === -1 ? -2 : -1 }));
  };

  const cancelarCambios = () => {
    navigate(-1);
  };

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos de la Marca</h2>

      <div className="mb-3 col-2">
        <label htmlFor="idMarca" className="form-label">
          Id
        </label>
        <input type="text" className="form-control" id="idMarca" value={marca.id} readOnly disabled />
      </div>

      <div className="mb-3 row" />
      <div className="col">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input type="text" className="form-control" id="nombre" value={marca.nombre} onChange={handleEditChange} />
      </div>
      <div className="mb-3 row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="eliminada"
              name="eliminada"
              checked={marca.eliminada}
              onChange={handleEditChange}
            />
            <label htmlFor="eliminada" className="form-check-label">
              Eliminada
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
