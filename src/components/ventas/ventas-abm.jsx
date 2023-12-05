import { useNavigate, useLocation, Link } from "react-router-dom";
import { getVentas } from "./ventas-services"
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

  function refrescarDatos() {
    getVentas()
      .then((resp) => {
        if (resp.status === 200) {
          setDatos(resp.data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener ventas:', error);
        setError(error.message);
      });
  }

  const formatearFecha = (fechaVenta) => {
    const date = new Date(fechaVenta);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear().toString();
    return `${dia}/${mes}/${año}`;
  };

  if (error) {
    return <h1>Error:{error}</h1>
  }

  

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
              <td>{v.cliente.nombre}</td>
              <td>{v.cliente.cuit}</td>
              <td>{formatearFecha(v.fechaVenta)}</td>
              <td>{v.tipoPago}</td>
              <td>{v.tipoComprobante}</td>
              <td>{v.descuento}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editarVenta(v.id)}>Editar</button>
                {/* <button className="btn btn-danger ms-1" onClick={() => borrarVenta(v.id)}>Borrar</button> */}
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