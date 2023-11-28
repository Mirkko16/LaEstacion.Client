import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getFamilias } from "./familias-services";
import { useEffect, useState } from "react";

export default function AbmFamilias() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, []);

  async function refrescarDatos() {
    try {
      const resp = await getFamilias();
      if (resp.status === 200) {
        setDatos([...resp.data]); // Usar una nueva referencia del array
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function borrarFamilia(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarFamilia(id) {
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
          {datos.map((f) => (
            <tr key={f.id}>
              <td className="text-center"><Link to={`${f.id}`}>{f.id}</Link></td>
              <td className="text-center">{f.nombre}</td>
              <td className="text-center">{renderSymbol(f.eliminada)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarFamilia(f.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarFamilia(f.id)}>Borrar</button>
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