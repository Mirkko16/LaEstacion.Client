import React, { useEffect, useState } from "react";
import { agregar, getVenta } from "./ventas-services";
import { VentaModel } from "../models/venta-model";
import { getCliente } from "../clientes/clientes-services";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';

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
          // Agrega otros campos según sea necesario
        },
      }));
    } catch (error) {
      console.error("Error al buscar cliente por ID:", error);
      // Manejar el error según sea necesario
    }
  };

  const buscarClientePorNombre = async (nombreCliente) => {
    try {
      // Lógica para buscar cliente por nombre
      // Actualizar el estado de venta con los datos del cliente encontrado
    } catch (error) {
      console.error("Error al buscar cliente por nombre:", error);
      // Manejar el error según sea necesario
    }
  };

  const handleClienteIdChange = (e) => {
    const { value } = e.target;
    setVenta((prevVenta) => ({ ...prevVenta, cliente: { id: value } }));
    buscarClientePorId(value);
  };

  const handleClienteNombreChange = (e) => {
    const { value } = e.target;
    setVenta((prevVenta) => ({ ...prevVenta, cliente: { nombre: value } }));
    buscarClientePorNombre(value);
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
          <input type="text" className="form-control" id="fecha" value={venta.fechaVenta} readOnly disabled />
        </Col>
        <Col xs={2}>
          <label htmlFor="clienteId" className="form-label">
            ID Cliente
          </label>
          <input type="text" className="form-control" id="clienteId" name="id" />
        </Col>
        <Col xs={3}>
          <label htmlFor="clienteNombre" className="form-label">
            Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteNombre"
            name="nombre"
            value={venta.cliente?.nombre || ""}
            readOnly
            disabled
          />
        </Col>
        <Col xs={3}>
          <label htmlFor="clienteCUIT" className="form-label">
            CUIT
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteCUIT"
            name="cuit"
            value={venta.cliente?.cuit || ""}
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
          <label htmlFor="clienteNumTarjeta" className="form-label">
            N° Tarj.
          </label>
          <input
            type="text"
            className="form-control"
            id="clienteNumTarjeta"
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
          <input type="text" className="form-control" id="tipoPago" name="tipoPago" value={venta.tipoPago} onChange={handleEditChange} />
        </Col>
        <Col>
          <label htmlFor="tipoComprobante" className="form-label">
            Tipo Comprobante
          </label>
          <input
            type="text"
            className="form-control"
            id="tipoComprobante"
            name="tipoComprobante"
            value={venta.tipoComprobante}
            onChange={handleEditChange}
          />
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
