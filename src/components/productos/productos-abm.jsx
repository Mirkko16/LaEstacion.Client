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
            <th>Nombre</th>
            <th>Cod.Barra</th>
            <th>Marca</th>
            <th>Familia</th>
            <th>Rubro</th>
            <th>Proveedor</th>
            <th>Costo</th>
            <th>Rentabilidad</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            
          </tr>
        </thead>
        <tbody>
          {datos.map((p) => (
            <tr key={p.id}>
              <td><Link to={`${p.id}`}>{p.id}</Link></td>
              <td>{p.nombre}</td>
              <td>{p.codBarra}</td>
              <td>{p.marcaId}</td>
              <td>{p.familiaId}</td>
              <td>{p.rubroId}</td>
              <td>{p.proveedor.nombre}</td>
              <td>{p.costo}</td>
              <td>{p.rentabilidad}</td>
              <td>{p.precioVenta}</td>
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