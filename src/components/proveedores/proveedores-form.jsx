import React, { useEffect, useState } from "react";
import { agregar, getProveedor, modificar } from "./proveedores-services";
import { useNavigate, useParams } from "react-router-dom";

export function FormProveedor() {
    const [error, setError] = useState(null);
    const params = useParams();
    const estadoInicial = {
        id: -1,
        nombre: "",
        apellido: "",
        cuit: "",
        correo: "",
        rubro: "",
        cuentaCorriente: "",
        saldoEnCta: 0.0,
    };
    const [proveedor, setProveedor] = useState(estadoInicial);

    useEffect(() => {
        if (params.id) {
            getProveedor(parseInt(params.id, 10))
                .then((resp) => {
                    setProveedor(resp.data);
                    setError(null);
                })
                .catch((reason) => setError(reason.message));
        }
    }, []);

    const navigate = useNavigate();

    function handleEditChange(e) {
        setProveedor({ ...proveedor, [e.target.id]: e.target.value });
    }

    async function aceptarCambios() {
        if (proveedor.id === -1) await agregar(proveedor);
        else await modificar(proveedor);
        navigate(-1);
    }

    function cancelarCambios() {
        navigate(-1);
    }

    if (error) {
        return <h1>Error:{error}</h1>;
    }

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos del proveedor</h2>
            <div className="mb-3 col-2">
                <label htmlFor="id" className="form-label">
                    Id
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="id"
                    value={proveedor.id}
                    readOnly={true}
                    disabled
                />
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                    Nombre Proveedor
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={proveedor.nombre}
                    onChange={handleEditChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                    Apellido
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={proveedor.apellido}
                    onChange={handleEditChange}
                />
            </div>
            <div className="mb-3 col-2">
                <label htmlFor="cuit" className="form-label">
                    Cuit/Cuil
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cuit"
                    value={proveedor.cuit}
                    onChange={handleEditChange}
                />
            </div>
            <div className="mb-3 col-2">
                <label htmlFor="correo" className="form-label">
                    Correo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="correo"
                    value={proveedor.correo}
                    onChange={handleEditChange}
                />
            </div>
            <div className="mb-3 col-2">
                <label htmlFor="rubro" className="form-label">
                    Rubro
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="rubro"
                    value={proveedor.rubro}
                    onChange={handleEditChange}
                />
            </div>
            <div className="mb-3 col-2">
                <label htmlFor="cuentaCorriente" className="form-label">
                    Cuenta Corriente
                </label>
                <select
                    className="form-select"
                    id="cuentaCorriente"
                    value={proveedor.cuentaCorriente ? "SI" : "NO"}
                    onChange={handleEditChange}
                >
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="mb-3 col-2">
                <label htmlFor="saldoEnCta" className="form-label">
                    Saldo
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="saldoEnCta"
                    value={proveedor.saldoEnCta}
                    onChange={handleEditChange}
                />
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
