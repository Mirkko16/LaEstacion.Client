import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getRubros } from "./rubros-services";
import { useEffect, useState } from "react";

export default function AbmRubros() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, []);

  async function refrescarDatos() {
    try {
      const resp = await getRubros();
      if (resp.status === 200) {
        setDatos([...resp.data]); // Usar una nueva referencia del array
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function borrarRubro(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarRubro(id) {
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
            <th className="text-center">Eliminado</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((r) => (
            <tr key={r.id}>
              <td className="text-center"><Link to={`${r.id}`}>{r.id}</Link></td>
              <td className="text-center">{r.nombre}</td>
              <td className="text-center">{renderSymbol(r.eliminado)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarRubro(r.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarRubro(r.id)}>Borrar</button>
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