import React, { useEffect, useState } from "react";
import { agregar, getVenta, modificar } from "./ventas-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormVenta() {
    const [error, setError] = useState(null);
    const params = useParams();
    
    const estadoInicial = {
        id: -1,
        numVenta: "",
        puntoVenta:"",
        clienteId:"",
        clienteCuit:"",
        fecha: "",
        tipoPago: "",
        tipoComprobante: "",
        descuento: "",
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
        const newValue = type === 'checkbox' ? checked : value;
        setVenta((prevVenta) => ({ ...prevVenta, [id]: newValue }));
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

            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="numVenta" className="form-label">
                        N° Venta
                    </label>
                    <input type="text" className="form-control" id="numVenta" value={venta.numVenta} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="puntoVenta" className="form-label">
                        Punto Venta
                    </label>
                    <input type="text" className="form-control" id="puntoVenta" value={venta.puntoVenta} onChange={handleEditChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="nombre" className="form-label">
                        Cliente
                    </label>
                    <input type="text" className="form-control" id="nombre" value={venta.clienteId.nombre} onChange={handleEditChange} />
                </div>
                <div className="col">
                    <label htmlFor="cuit" className="form-label">
                        Cuit
                    </label>
                    <input type="text" className="form-control" id="cuit" value={venta.clienteId.clienteCuit} onChange={handleEditChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="fecha" className="form-label">
                        Fecha
                    </label>
                    <input type="text" className="form-control" id="fecha" value={venta.fecha} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="tipoPago" className="form-label">
                        Tipo Pago
                    </label>
                    <input type="number" className="form-control" id="tipoPago" value={venta.tipoPago} onChange={handleEditChange} />
                </div>
            </div>           
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="tipoComprobante" className="form-label">
                        Tipo Comprobante
                    </label>
                    <input type="number" className="form-control" id="tipoComprobante" value={venta.tipoComprobante} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="descuento" className="form-label">
                        Descuento
                    </label>
                    <input type="number" className="form-control" id="descuento" value={venta.descuento} onChange={handleEditChange} />
                </div>
            </div>
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
