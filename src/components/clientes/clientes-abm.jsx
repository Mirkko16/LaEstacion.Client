import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getClientes } from "./clientes-services"
import { useEffect, useState } from "react";


export default function AbmClientes() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // aca usas useEffect para prevenir que se ejecute el codigo de manera inecesaria
  useEffect(() => {
    refrescarDatos();
  }, []);

  function refrescarDatos(){
    getClientes()
      .then((resp) => {
        if (resp.status === 200) {
          setDatos(resp.data);
        }
      })
      .catch(reason => setError(reason.message))
  }

  async function borrarCliente(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarCliente(id) {
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
            <th>Apellido</th>
            <th>CUIT</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Cta. Corriente</th>
            <th>Saldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((c) => (
            <tr key={c.id}>
              <td><Link to={`${c.id}`}>{c.id}</Link></td>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.cuit}</td>
              <td>{c.direccion}</td>
              <td>{c.telefono}</td>
              <td>{c.cuentaCorriente}</td>
              <td>{c.saldo}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarCliente(c.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarCliente(c.id)}>Borrar</button>
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