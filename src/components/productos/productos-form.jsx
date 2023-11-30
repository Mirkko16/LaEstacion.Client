import { useEffect, useState } from "react";
import { agregar, getProducto, modificar } from "./productos-service";
import { getMarcas } from "../marcas/marcas-services";
import { getFamilias } from "../familias/familias-services";
import { getRubros } from "../rubros/rubros-services";
import { getProveedores } from "../proveedores/proveedores-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormProducto() {
  const [error, setError] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [loadingMarcas, setLoadingMarcas] = useState(true);
  const [familias, setFamilias] = useState([]);
  const [loadingFamilias, setLoadingFamilias] = useState(true);
  const [rubros, setRubros] = useState([]);
  const [loadingRubros, setLoadingRubros] = useState(true);
  const [proveedores, setProveedores] = useState([]);
  const [loadingProveedores, setLoadingProveedores] = useState(true);


  const params = useParams();
  const estadoInicial = {
    id: -1,
    nombre: "",
    codBarra: "",
    marcaId: "",
    familiaId: "",
    rubroId: "",
    proveedorId: "",
    costo: 0,
    rentabilidad: 0,
    precioVenta: 0,
    stock: 0,
  };
  const [producto, setProducto] = useState(estadoInicial);
  const [searchTermMarca, setSearchTermMarca] = useState("");
  const [searchTermFamilia, setSearchTermFamilia] = useState("");
  const [searchTermRubro, setSearchTermRubro] = useState("");
  const [searchTermProveedor, setSearchTermProveedor] = useState("");
  const [precioCalculado, setPrecioCalculado] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.id) {
          const resp = await getProducto(parseInt(params.id, 10));
          setProducto(resp.data);
          setError(null);
        }

        const marcasResp = await getMarcas();
        setMarcas(marcasResp.data);
        setLoadingMarcas(false);

        const familiasResp = await getFamilias();
        setFamilias(familiasResp.data);
        setLoadingFamilias(false);

        const rubrosResp = await getRubros();
        setRubros(rubrosResp.data);
        setLoadingRubros(false);

        const proveedoresResp = await getProveedores();
        setProveedores(proveedoresResp.data);
        setLoadingProveedores(false);

        // Calcular y establecer el precio de venta inicial
        const nuevoPrecio = ((producto.costo * producto.rentabilidad) / 100) + producto.costo;
        setProducto((prevProducto) => ({
          ...prevProducto,
          precioVenta: nuevoPrecio,
        }));
        setPrecioCalculado(nuevoPrecio);

      } catch (reason) {
        setError(reason.message);
      }
    };

    fetchData();

  }, [params.id]);



  const navigate = useNavigate();

  function handleEditChange(e) {
    setProducto({ ...producto, [e.target.id]: e.target.value });
  }

  function handleRentabilidadBlur() {
    // Asegúrate de que rentabilidad y costo sean números
    const rentabilidad = parseFloat(producto.rentabilidad);
    const costo = parseFloat(producto.costo);

    // Verifica si los valores son números válidos antes de realizar el cálculo
    if (!isNaN(rentabilidad) && !isNaN(costo)) {
      // Calcular el nuevo precio de venta cuando se pierde el foco en el campo de rentabilidad
      const nuevoPrecio = ((costo * rentabilidad) / 100) + costo;
      setProducto((prevProducto) => ({
        ...prevProducto,
        precioVenta: nuevoPrecio,
      }));
      setPrecioCalculado(nuevoPrecio);
    }
  }

  async function aceptarCambios() {
    console.log(producto);

    if (producto.id === -1) {
      // Solo pasa las IDs de las entidades relacionadas, no los objetos completos
      await agregar(producto);
    } else {
      // Extraer IDs de las entidades relacionadas y convertir a enteros si es necesario
      const {
        marcaId,
        familiaId,
        rubroId,
        proveedorId,
        ...productoSinEntidades
      } = producto;

      const ids = {
        marcaId: parseInt(marcaId, 10),
        familiaId: parseInt(familiaId, 10),
        rubroId: parseInt(rubroId, 10),
        proveedorId: parseInt(proveedorId, 10),
      };

      // Eliminar propiedades innecesarias si no son necesarias para el servidor
      await modificar({ ...productoSinEntidades, ...ids });
    }

    navigate(-1);
  }

  function cancelarCambios() {
    navigate(-1);
  }



  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos del producto</h2>

      <div className="mb-3 row">
        <div className="col-2">
          <label htmlFor="id" className="form-label">Id</label>
          <input type="text" className="form-control" id="id" value={producto.id} readOnly disabled />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" value={producto.nombre} onChange={handleEditChange} />
        </div>

        <div className="col">
          <label htmlFor="codBarra" className="form-label">Cod. Barra</label>
          <input type="text" className="form-control" id="codBarra" value={producto.codBarra} onChange={handleEditChange} />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col">
          <div className="col">
            <label htmlFor="marcaId" className="form-label">
              Marca
            </label>
            {loadingMarcas ? (
              <p>Cargando marcas...</p>
            ) : (
              <div>
                <select
                  className="form-select"
                  id="marcaId"
                  value={producto.marcaId}
                  onChange={(e) => handleEditChange(e)}
                >
                  <option value="" disabled>Selecciona una marca</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {`${marca.id} - ${marca.nombre}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="col">
          <div className="col">
            <label htmlFor="familiaId" className="form-label">
              Familia
            </label>
            {loadingFamilias ? (
              <p>Cargando familias...</p>
            ) : (
              <div>
                <select
                  className="form-select"
                  id="familiaId"
                  value={producto.familiaId}
                  onChange={(e) => handleEditChange(e)}
                >
                  <option value="" disabled>Selecciona una familia</option>
                  {familias.map((familia) => (
                    <option key={familia.id} value={familia.id}>
                      {`${familia.id} - ${familia.nombre}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label htmlFor="rubroId" className="form-label">
            Rubro
          </label>
          {loadingRubros ? (
            <p>Cargando rubros...</p>
          ) : (
            <div>
              <select
                className="form-select"
                id="rubroId"
                value={producto.rubroId}
                onChange={(e) => handleEditChange(e)}
              >
                <option value="" disabled>Selecciona una rubro</option>
                {rubros.map((rubro) => (
                  <option key={rubro.id} value={rubro.id}>
                    {`${rubro.id} - ${rubro.nombre}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="col">
          <label htmlFor="proveedorId" className="form-label">
            Proveedor
          </label>
          {loadingProveedores ? (
            <p>Cargando proveedores...</p>
          ) : (
            <div>
              <select
                className="form-select"
                id="proveedorId"
                value={producto.proveedorId}
                onChange={(e) => handleEditChange(e)}
              >
                <option value="" disabled>Selecciona un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {`${proveedor.id} - ${proveedor.nombre}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col-6">
          <label htmlFor="costo" className="form-label">Costo</label>
          <input type="number" className="form-control" id="costo" value={producto.costo} onChange={handleEditChange} />
        </div>

        <div className="col-6">
          <label htmlFor="rentabilidad" className="form-label">Rentabilidad</label>
          <input
            type="number"
            className="form-control"
            id="rentabilidad"
            value={producto.rentabilidad}
            onChange={handleEditChange}
            onBlur={handleRentabilidadBlur}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col-6">
          <label htmlFor="precioVenta" className="form-label">Precio</label>
          {/* Desactiva la edición y muestra el valor calculado */}
          <input
            type="number"
            className="form-control"
            id="precioVenta"
            value={precioCalculado}
            readOnly
            disabled
          />
        </div>
        <div className="col-6">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input type="number" className="form-control" id="stock" value={producto.stock} onChange={handleEditChange} />
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="eliminado"
              name="eliminado"
              checked={producto.eliminado}
              onChange={(e) => setProducto({ ...producto, eliminado: e.target.checked })}
            />
            <label htmlFor="eliminado" className="form-check-label">Eliminado</label>
          </div>
        </div>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary me-1" onClick={aceptarCambios}>Aceptar</button>
        <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>Cancelar</button>
      </div>
    </div>
  )
}