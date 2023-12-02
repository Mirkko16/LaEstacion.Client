import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getUnidades } from "./unidades-services";
import { useEffect, useState } from "react";

export default function AbmUnidades() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, []);

  async function refrescarDatos() {
    try {
      const resp = await getUnidades();
      if (resp.status === 200) {
        setDatos([...resp.data]); // Usar una nueva referencia del array
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function borrarUnidad(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarUnidad(id) {
    navigate(`${id}`);
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const renderSymbol = (value) => (value ? '✔️' : '❌');
  return (
    <div className="container">

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Eliminada</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((u) => (
            <tr key={u.id}>
              <td className="text-center"><Link to={`${u.id}`}>{u.id}</Link></td>
              <td className="text-center">{u.nombre}</td>
              <td className="text-center">{renderSymbol(u.eliminada)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarUnidad(u.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarUnidad(u.id)}>Borrar</button>
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