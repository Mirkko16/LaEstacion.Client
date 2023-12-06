import { useNavigate, Link } from "react-router-dom";
import { borrar, getClientes } from "./clientes-services";
import { useEffect, useState } from "react";

export default function AbmClientes() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const clientsPerPage = 10;
  const pagesVisited = pageNumber * clientsPerPage;
  const pageCount = Math.ceil(datos.length / clientsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    refrescarDatos();
  }, [searchTerm, pageNumber]);

  function refrescarDatos() {
    getClientes()
      .then((resp) => {
        if (resp.status === 200) {
          const filteredClientes = resp.data.filter((p) =>
            Object.values(p).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          setDatos(filteredClientes);
        }
      })
      .catch((reason) => setError(reason.message));
  }

  async function borrarCliente(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarCliente(id) {
    navigate(`${id}`);
  }

  

  const renderSymbol = (value) => (value ? '✔️' : '❌');

  const changePage = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
          {datos
            .slice(pagesVisited, pagesVisited + clientsPerPage)
            .map((c) => (
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
        {/* Botones de paginación */}
        <button onClick={() => changePage(pageNumber - 1)} disabled={pageNumber === 0}>
          Anterior
        </button>
        <button onClick={() => changePage(pageNumber + 1)} disabled={pageNumber === pageCount - 1}>
          Siguiente
        </button>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => navigate("agregar")}>Agregar</button>
      </div>
    </div>
  );
}
