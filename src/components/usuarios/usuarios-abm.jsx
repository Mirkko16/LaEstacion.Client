import { useNavigate, Link } from "react-router-dom";
import { borrar, getUsuarios } from "./usuarios-services";
import { useEffect, useState } from "react";

export default function AbmUsuarios() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(datos.length / usersPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    refrescarDatos();
  }, [searchTerm, pageNumber]);

  function refrescarDatos() {
    getUsuarios()
      .then((resp) => {
        if (resp.status === 200) {
          const filteredUsuarios = resp.data.filter((user) =>
            Object.values(user).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          setDatos(filteredUsuarios);
        }
      })
      .catch((reason) => setError(reason.message));
  }

  async function borrarUsuario(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarUsuario(id) {
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
            <th className="text-center">UserName</th>
            <th className="text-center">Password</th>
            <th className="text-center">Correo</th>
            <th className="text-center">Rol</th>
            <th className="text-center">Activo</th>
          </tr>
        </thead>
        <tbody>
          {datos
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((us) => (
              <tr key={us.id}>
                <td className="text-center"><Link to={`${us.id}`}>{us.id}</Link></td>
                <td className="text-center">{us.nombre}</td>
                <td className="text-center">{us.apellido}</td>
                <td className="text-center">{us.username}</td>
                <td className="text-center">{us.password}</td>
                <td className="text-center">{us.correo}</td>
                <td className="text-center">{us.rol}</td>
                <td className="text-center">{renderSymbol(us.activo)}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => editarUsuario(us.id)}>Editar</button>
                  <button className="btn btn-danger ms-1" onClick={() => borrarUsuario(us.id)}>Borrar</button>
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
