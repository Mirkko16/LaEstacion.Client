import React, { useEffect, useState } from "react";
import { agregar, getVenta } from "./ventas-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormVenta() {
  const [error, setError] = useState(null);
  const params = useParams();

  const estadoInicial = {
    id: -1,
    numVenta: "",
    puntoVenta: "",
    clienteId: "",
    clienteCuit: "",
    fecha: "",
    tipoPago: "",
    tipoComprobante: "",
    descuento: "",
    productos: [], // Agregamos un array para los productos
  };

  const [venta, setVenta] = useState(estadoInicial);

  useEffect(() => {
    if (params.id) {
      getVenta(parseInt(params.id, 10))
        .then((resp) => {
          setVenta(resp.data);
          setError(null);
        })
        .catch((reason) => setError(reason.message));
    }
  }, []);

  const navigate = useNavigate();

  const handleEditChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setVenta((prevVenta) => ({ ...prevVenta, [id]: newValue }));
  };

  // Manejar cambios en los campos del formulario para agregar un nuevo producto
  const handleProductoInputChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...venta.productos];
    nuevosProductos[index] = { ...nuevosProductos[index], [name]: value };
    setVenta((prevVenta) => ({ ...prevVenta, productos: nuevosProductos }));
  };

  // Agregar un nuevo producto al array de productos
  const agregarProducto = () => {
    setVenta((prevVenta) => ({
      ...prevVenta,
      productos: [...prevVenta.productos, { nombre: "", cantidad: "", precioUnitario: "" }],
    }));
  };

  const aceptarCambios = async () => {
    if (venta.id === -1) await agregar(venta);
    else await modificar(venta);
    navigate(-1);
    setVenta((prevVenta) => ({ ...prevVenta, id: prevVenta.id === -1 ? -2 : -1 }));
  };

  function cancelarCambios() {
    navigate(-1);
  }

  if (error) {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div className="text-start col-6 offset-3 border p-3">
      <h2 className="mt-3 text-center">Datos de la Venta</h2>

      <div className="mb-3 col-2">
        <label htmlFor="idVenta" className="form-label">
          Id
        </label>
        <input type="text" className="form-control" id="idVenta" value={venta.id} readOnly disabled />
      </div>

      {/* Resto de los campos del formulario... */}

      {/* Sección para agregar productos */}
      <div className="mb-3">
        <h4>Agregar Productos</h4>
        {venta.productos.map((producto, index) => (
          <div key={index} className="mb-3">
            <label>Producto {index + 1}</label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={(e) => handleProductoInputChange(index, e)}
              placeholder="Nombre del Producto"
            />
            <input
              type="text"
              name="cantidad"
              value={producto.cantidad}
              onChange={(e) => handleProductoInputChange(index, e)}
              placeholder="Cantidad"
            />
            <input
              type="text"
              name="precioUnitario"
              value={producto.precioUnitario}
              onChange={(e) => handleProductoInputChange(index, e)}
              placeholder="Precio Unitario"
            />
          </div>
        ))}
        <button className="btn btn-primary" onClick={agregarProducto}>
          Agregar Producto
        </button>
      </div>

      {/* Resto de los campos del formulario... */}

      <div className="mb-3 text-end">
        <button className="btn btn-primary me-1" onClick={aceptarCambios}>
          Aceptar
        </button>
        <button className="btn btn-secondary ms-1" onClick={cancelarCambios}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
