import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getProveedores } from "./proveedores-services"
import { useEffect, useState } from "react";


export default function AbmProveedores() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // aca usas useEffect para prevenir que se ejecute el codigo de manera inecesaria
  useEffect(() => {
    refrescarDatos();
  }, []);

  function refrescarDatos(){
    getProveedores()
      .then((resp) => {
        if (resp.status === 200) {
          setDatos(resp.data);
        }
      })
      .catch(reason => setError(reason.message))
  }

  async function borrarProveedor(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarProveedor(id) {
    navigate(`${id}`);
  }

  if (error) {
    return <h1>Error:{error}</h1>
  }

  const renderSymbol = (value) => (value ? '✔️' : '❌');

  return (
    <div className="container">

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Apellido</th>
            <th className="text-center">CUIT</th>
            <th className="text-center">Correo</th>
            <th className="text-center">Telefono</th>
            <th className="text-center">Debe</th>
            <th className="text-center">Haber</th>
            <th className="text-center">Saldo</th>
            <th className="text-center">Activo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((p) => (
            <tr key={p.id}>
              <td><Link to={`${p.id}`}>{p.id}</Link></td>
              <td>{p.nombre}</td>
              <td>{p.apellido}</td>
              <td>{p.cuit}</td>
              <td>{p.correo}</td>
              <td>{p.telefono}</td>
              <td>{p.debe}</td>
              <td>{p.haber}</td>
              <td>{p.saldo}</td>
              <td className="text-center">{renderSymbol(p.activo)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarProveedor(p.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarProveedor(p.id)}>Borrar</button>
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