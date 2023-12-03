import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { borrar, getProductos } from "./productos-service";
import ReactPaginate from "react-paginate";

export default function AbmProductos() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(datos.length / productsPerPage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refrescarDatos();
  }, [searchTerm]);

  function refrescarDatos() {
    getProductos()
      .then((resp) => {
        if (resp.status === 200) {
          const filteredProducts = resp.data.filter((p) =>
            Object.values(p).some((value) =>
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          setDatos(filteredProducts);
        }
      })
      .catch((reason) => setError(reason.message));
  }

  async function borrarProducto(id) {
    await borrar(parseInt(id, 10));
    refrescarDatos();
  }

  function editarProducto(id) {
    navigate(`${id}`);
  }

  const displayProducts = datos
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((p) => (
      <tr key={p.id}>
        <td><Link to={`${p.id}`}>{p.id}</Link></td>
        <td>{p.nombre}</td>
        <td>{p.codBarra}</td>
        <td>{p.marca.nombre}</td>
        <td>{p.familia.nombre}</td>
        <td>{p.rubro.nombre}</td>
        <td>{p.unidad.unidad}</td>
        <td>{p.proveedor.nombre}</td>
        <td>{p.costo}</td>
        <td>{p.rentabilidad}</td>
        <td>{p.precioVenta}</td>
        <td>{p.stock}</td>
        <td>
          <button className="btn btn-warning" onClick={() => editarProducto(p.id)}>Editar</button>
          <button className="btn btn-danger ms-1" onClick={() => borrarProducto(p.id)}>Borrar</button>
        </td>
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="container">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre, ID o código de barras"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Cod.Barra</th>
            <th>Marca</th>
            <th>Familia</th>
            <th>Rubro</th>
            <th>Unidad</th>
            <th>Proveedor</th>
            <th>Costo</th>
            <th>Rentabilidad</th>
            <th>Precio Venta</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts}
        </tbody>
      </table>
      <div>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigate("/productos/agregar")}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
