import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getMarcas } from "./marcas-services";
import { useEffect, useState } from "react";

export default function AbmMarcas() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, []);

  async function refrescarDatos() {
    try {
      const resp = await getMarcas();
      if (resp.status === 200) {
        setDatos([...resp.data]); // Usar una nueva referencia del array
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function borrarMarca(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarMarca(id) {
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
          {datos.map((m) => (
            <tr key={m.id}>
              <td className="text-center"><Link to={`${m.id}`}>{m.id}</Link></td>
              <td className="text-center">{m.nombre}</td>
              <td className="text-center">{renderSymbol(m.eliminada)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarMarca(m.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarMarca(m.id)}>Borrar</button>
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