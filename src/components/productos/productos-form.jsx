import { useEffect, useState } from "react";
import { agregar, getProducto, modificar } from "./productos-service";

import { useNavigate, useParams } from "react-router-dom";

export function FormProducto() {
  const [error, setError] = useState(null);
  const params = useParams();
  const estadoInicial =
  {
    id: -1, 
    nombre: '',
    codBarra: '',
    marcaId: '',
    familiaId: '',
    rubroId: '',
    proveedorId: '',
    costo: '',
    rentabilidad: '',
    precio: '',
    stock: ''
  };
  const [producto, setProducto] = useState(estadoInicial);


  useEffect(() => {
    if (params.id) {
      getProducto(parseInt(params.id, 10))
        .then(resp => {
          setProducto(resp.data);
          setError(null);
        })
        .catch(reason => setError(reason.message))
    }
  }, [])

  const navigate = useNavigate();

  function handleEditChange(e) {
    setProducto({ ...producto, [e.target.id]: e.target.value });
  }

  async function aceptarCambios() {
    if (producto.id === -1)
      await agregar(producto);
    else
      await modificar(producto)
    navigate(-1);
  }

  function cancelarCambios() {
    navigate(-1);
  }

  if (error) {
    return <h1>Error:{error}</h1>
  }
  return (
    <div className="text-start col-6 offset-3 border p-3">
  <h2 className="mt-3 text-center">Datos del producto</h2>

  <div className="mb-3 row">
    <div className="col-2">
      <label htmlFor="id" className="form-label">Id</label>
      <input type="text" className="form-control" id="id" value={producto.id} readOnly disabled />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col">
      <label htmlFor="nombre" className="form-label">Nombre</label>
      <input type="text" className="form-control" id="nombre" value={producto.nombre} onChange={handleEditChange} />
    </div>

    <div className="col">
      <label htmlFor="codBarra" className="form-label">Cod. Barra</label>
      <input type="text" className="form-control" id="codBarra" value={producto.codBarra} onChange={handleEditChange} />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col">
      <label htmlFor="marcaId" className="form-label">Marca</label>
      <input type="number" className="form-control" id="marcaId" value={producto.marcaId} onChange={handleEditChange} />
    </div>

    <div className="col">
      <label htmlFor="familiaId" className="form-label">Familia</label>
      <input type="number" className="form-control" id="familiaId" value={producto.familiaId} onChange={handleEditChange} />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col">
      <label htmlFor="rubroId" className="form-label">Rubro</label>
      <input type="number" className="form-control" id="rubroId" value={producto.rubroId} onChange={handleEditChange} />
    </div>

    <div className="col">
      <label htmlFor="proveedorId" className="form-label">Proveedor</label>
      <input type="number" className="form-control" id="proveedorId" value={producto.proveedorId} onChange={handleEditChange} />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col-6">
      <label htmlFor="costo" className="form-label">Costo</label>
      <input type="number" className="form-control" id="costo" value={producto.costo} onChange={handleEditChange} />
    </div>

    <div className="col-6">
      <label htmlFor="rentabilidad" className="form-label">Rentabilidad</label>
      <input type="number" className="form-control" id="rentabilidad" value={producto.rentabilidad} onChange={handleEditChange} />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col-6">
      <label htmlFor="precio" className="form-label">Precio</label>
      <input type="number" className="form-control" id="precio" value={producto.precio} onChange={handleEditChange} />
    </div>

    <div className="col-6">
      <label htmlFor="stock" className="form-label">Stock</label>
      <input type="number" className="form-control" id="stock" value={producto.stock} onChange={handleEditChange} />
    </div>
  </div>

  <div className="mb-3 row">
    <div className="col">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="eliminado"
          name="eliminado"
          checked={producto.eliminado}
          onChange={handleEditChange}
        />
        <label htmlFor="eliminado" className="form-check-label">Eliminado</label>
      </div>
    </div>
  </div>

  <div className="mb-3 text-end">
    <button className="btn btn-primary me-1" onClick={aceptarCambios}>Aceptar</button>
    <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>Cancelar</button>
  </div>
</div>
  )
}