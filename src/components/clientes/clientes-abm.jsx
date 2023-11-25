import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getClientes } from "./clientes-services";
import { useEffect, useState } from "react";

export default function AbmClientes() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, []);

  async function refrescarDatos() {
    try {
      const resp = await getClientes();
      if (resp.status === 200) {
        setDatos([...resp.data]); // Usar una nueva referencia del array
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function borrarCliente(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarCliente(id) {
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
            <th className="text-center">Apellido</th>
            <th className="text-center">DNI</th>
            <th className="text-center">Debe</th>
            <th className="text-center">Haber</th>
            <th className="text-center">Activo</th>
            <th className="text-center">Cta. Corriente</th>
            <th className="text-center">Tarjeta Socio</th>
            <th className="text-center">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((c) => (
            <tr key={c.id}>
              <td className="text-center"><Link to={`${c.id}`}>{c.id}</Link></td>
              <td className="text-center">{c.nombre}</td>
              <td className="text-center">{c.apellido}</td>
              <td className="text-center">{c.dni}</td>              
              <td className="text-center">{c.debe}</td>
              <td className="text-center">{c.haber}</td>
              <td className="text-center">{renderSymbol(c.activo)}</td>
              <td className="text-center">{renderSymbol(c.cuentaCorriente)}</td>
              <td className="text-center">{renderSymbol(c.tarjetaSocio)}</td>
              <td className="text-center">{c.puntosTarjeta}</td>
              <td className="text-center">{c.saldo}</td>
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