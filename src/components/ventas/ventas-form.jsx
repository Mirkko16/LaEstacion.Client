import React, { useEffect, useState } from "react";
import { agregar, getVenta } from "./ventas-services";
import { VentaModel } from "../models/venta-model";
import { getCliente } from "../clientes/clientes-services";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

export function FormVenta() {
  const [error, setError] = useState(null);
  const params = useParams();

  const estadoInicial = new VentaModel();

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

  const buscarClientePorId = async (clienteId) => {
    try {
      const response = await getCliente(clienteId);
      const clienteEncontrado = response.data;

      setVenta((prevVenta) => ({
        ...prevVenta,
        cliente: {
          id: clienteEncontrado.id,
          nombre: clienteEncontrado.nombre,
          apellido: clienteEncontrado.apellido,
          CUIT: clienteEncontrado.cuit,
          direccion: clienteEncontrado.direccion,
          localidad: clienteEncontrado.localidad,
          numeroTarjeta: clienteEncontrado.numeroTarjeta,
        },
      }));
    } catch (error) {
      console.error("Error al buscar cliente por ID:", error);
      // Manejar el error según sea necesario
    }
  };


  const handleClienteIdChange = async (e) => {
    const { value } = e.target;
    setVenta((prevVenta) => ({ ...prevVenta, cliente: { id: value } }));
    await buscarClientePorId(value);
  };


  const formatearFecha = (fechaVenta) => {
    const date = new Date(fechaVenta);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear().toString();
    return `${dia}/${mes}/${año}`;
  };

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

  const eliminarProducto = (index) => {
    const nuevosProductos = [...venta.productos];
    nuevosProductos.splice(index, 1);
    setVenta((prevVenta) => ({
      ...prevVenta,
      productos: nuevosProductos,
    }));
  };

  // Calcular el total de la venta
  const totalVenta = venta.productos.reduce(
    (total, producto) => total + (parseFloat(producto.cantidad) * parseFloat(producto.precioUnitario)),
    0

  );


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
    <div className="text-start col-8 offset-2 border p-3">
      <h2 className="mt-3 text-center">Datos de la Venta</h2>

      <Row className="mb-3">
        <Col xs={2}>
          <label htmlFor="idVenta" className="form-label">
            Id
          </label>
          <input type="text" className="form-control" id="idVenta" value={venta.id} readOnly disabled />
        </Col>
        <Col xs={2}>
          <label htmlFor="numVenta" className="form-label">
            Num. Venta
          </label>
          <input type="text" className="form-control" id="numVenta" value={venta.numVenta} readOnly disabled />
        </Col>
        <Col xs={2}>
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
          <input type="text" className="form-control" id="fecha" value={formatearFecha(venta.fechaVenta)} readOnly disabled />
        </Col>
        <Col xs={2}>
          <label htmlFor="clienteId" className="form-label">
            ID Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteId"
            value={venta.cliente.id}
            onChange={handleClienteIdChange}
            name="id" />
        </Col>
        <Col xs={3} className="d-flex align-items-center">
          <label htmlFor="clienteNombre" className="form-label me-2">
            Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteNombre"
            name="nombre"
            value={`${venta.cliente.nombre ?? ''} ${venta.cliente.apellido ?? ''}`}
            readOnly
            disabled
          />
          <Link to="/clientes">
            <button className="btn btn-primary ms-2">
              <i className="bi bi-search"></i> {/* Ajusta el icono según tu elección */}
            </button>
          </Link>
        </Col>
        <Col xs={3}>
          <label htmlFor="clienteCuit" className="form-label">
            CUIT
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteCuit"
            name="cuit"
            value={venta.cliente.CUIT || ""}
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={4}>
          <label htmlFor="clienteDireccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteDireccion"
            name="direccion"
            value={venta.cliente?.direccion || ""}
            readOnly
            disabled
          />
        </Col>
        <Col xs={3}>
          <label htmlFor="clienteLocalidad" className="form-label">
            Localidad
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteLocalidad"
            name="localidad"
            value={venta.cliente?.localidad || ""}
            readOnly
            disabled
          />
        </Col>
        <Col xs={3}>
          <label htmlFor="numeroTarjeta" className="form-label">
            N° Tarj.
          </label>
          <input
            type="text"
            className="form-control"
            id="numeroTarjeta"
            name="numeroTarjeta"
            value={venta.cliente?.numeroTarjeta || ""}
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <label htmlFor="tipoPago" className="form-label">
            Tipo Pago
          </label>
          <select className="form-select" aria-label="Default select example" id="tipoPago" name="tipoPago" value={venta.tipoPago} onChange={handleEditChange}>
            <option selected>Contado</option>
            <option value="1">Debito</option>
            <option value="2">Tarj. Credito</option>
            <option value="3">Cta. Corriente</option>
          </select>
          
        </Col>
        <Col>
          <label htmlFor="tipoComprobante" className="form-label">
            Tipo Comprobante
          </label>
          <select className="form-select" aria-label="Default select example" id="tipoPago" name="tipoPago" value={venta.tipoComprobante} onChange={handleEditChange}>
            <option selected>A</option>
            <option value="1">B</option>
          </select>
        </Col>
        <Col>
          <label htmlFor="descuento" className="form-label">
            Descuento %
          </label>
          <input type="text" className="form-control" id="descuento" name="descuento" value={venta.descuento} onChange={handleEditChange} />
        </Col>
      </Row>
      <hr className="my-4" />

      <div className="mb-3">
        <h4>Agregar Productos</h4>
        {venta.productos.map((producto, index) => (
          <Row key={index} className="mb-2">
            <Col>
              <label className="mt-2">Producto {index + 1}</label>
            </Col>
            <Col xs={1} className="pe-0">
              <input
                className="form-control"
                type="text"
                name="cantidad"
                value={producto.cantidad}
                onChange={(e) => handleProductoInputChange(index, e)}
              />
            </Col>
            <Col xs={4}>
              <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={(e) => handleProductoInputChange(index, e)}
                placeholder="Producto"
                className="form-control"
              />
            </Col>
            <Col>
              <input
                type="text"
                name="precioUnitario"
                value={producto.precioUnitario}
                onChange={(e) => handleProductoInputChange(index, e)}
                placeholder="Precio Unitario"
                className="form-control"
                readOnly
              />
            </Col>
            <Col xs={2}>
              <input
                type="text"
                name="totalProducto"
                value={typeof producto.cantidad === 'number' && typeof producto.precioUnitario === 'number' ? producto.cantidad * producto.precioUnitario : ''}
                readOnly
                className="form-control"
              />
            </Col>
            <Col>
              <Button variant="danger" onClick={() => eliminarProducto(index)}>
                Eliminar
              </Button>
            </Col>
          </Row>
        ))}

      </div>
      <div className="d-flex justify-content-between">

        <Button className="btn btn-primary mt-3" onClick={agregarProducto}>
          Agregar Producto
        </Button>

        <div className="d-flex">
          <button className="btn btn-primary mt-3 me-1 align-self-center" onClick={aceptarCambios}>
            Aceptar
          </button>
          <button className="btn btn-secondary mt-3 ms-1 align-self-center" onClick={cancelarCambios}>
            Cancelar
          </button>
        </div>
      </div>


      <div className="mb-3 d-flex align-items-center mt-4">
        <label htmlFor="total" className="form-label me-2">
          Total de la Venta:
        </label>
        <div className="col-2">
          <input
            type="text"
            className="form-control mb-4"
            id="total"
            value={typeof totalVenta === 'number' && !isNaN(totalVenta) ? totalVenta : ''}
            readOnly
            disabled
          />
        </div>
      </div>

    </div>
  );
}
