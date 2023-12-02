import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getVentas } from "./ventas-services"
import { useEffect, useState } from "react";


export default function AbmVentas() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // aca usas useEffect para prevenir que se ejecute el codigo de manera inecesaria
  useEffect(() => {
    refrescarDatos();
  }, []);

  function refrescarDatos(){
    getVentas()
      .then((resp) => {
        if (resp.status === 200) {
          setDatos(resp.data);
        }
      })
      .catch(reason => setError(reason.message))
  }

  if (error) {
    return <h1>Error:{error}</h1>
  }

  // const renderSymbol = (value) => (value ? '✔️' : '❌');

  return (
    <div className="container">

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Id</th>
            <th className="text-center">NumVenta</th>
            <th className="text-center">Cliente</th>
            <th className="text-center">CUIT</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Tipo Pago</th>
            <th className="text-center">Tipo Comprobante</th>
            <th className="text-center">Descuento</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((v) => (
            <tr key={v.id}>
              <td><Link to={`${v.id}`}>{v.id}</Link></td>
              <td>{v.numVenta}</td>
              <td>{v.puntoVenta}</td>
              <td>{v.cliente.nombre}</td>
              <td>{v.cliente.cuit}</td>
              <td>{v.fecha}</td>
              <td>{v.tipoPago}</td>
              <td>{v.tipoComprobante}</td>
              <td>{v.descuento}</td>
              <td className="text-center">{renderSymbol(v.activo)}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarVenta(v.id)}>Editar</button>
                <button className="btn btn-danger ms-1" onClick={() => borrarVenta(v.id)}>Borrar</button>
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