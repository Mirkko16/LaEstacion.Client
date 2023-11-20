import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getProductos } from "./productos-service"
import { useEffect, useState } from "react";


export default function AbmProductos() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // aca usas useEffect para prevenir que se ejecute el codigo de manera inecesaria
  useEffect(() => {
    refrescarDatos();
  }, []);

  function refrescarDatos(){
    getProductos()
      .then((resp) => {
        if (resp.status === 200) {
          setDatos(resp.data);
        }
      })
      .catch(reason => setError(reason.message))
  }

  async function borrarProducto(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarProducto(id) {
    navigate(`${id}`);
  }

  if (error) {
    return <h1>Error:{error}</h1>
  }

  return (
    <div className="container">

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cod.Barra</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Rubro</th>
            <th>Proveedor</th>
            <th>Costo</th>
            <th>Precio</th>
            <th>Unidad</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((p) => (
            <tr key={p.id}>
              <td><Link to={`${p.id}`}>{p.id}</Link></td>
              <td>{p.codBarra}</td>
              <td>{p.nombre}</td>
              <td>{p.marca}</td>
              <td>{p.rubro}</td>
              <td>{p.idProveedor}</td>
              <td>{p.costo}</td>
              <td>{p.precio}</td>
              <td>{p.unidad}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarProducto(p.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarProducto(p.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary" onClick={() => navigate("agregar")}>Agregar</button>
      </div>
    </div>
  )
}