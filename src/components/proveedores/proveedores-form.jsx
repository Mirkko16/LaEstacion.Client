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
        telefono: "",
        debe: "",
        haber: "",
        saldo: 0.0,
        activo: false
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

    const handleEditChange = (e) => {
        const { id, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setProveedor((prevProveedor) => ({ ...prevProveedor, [id]: newValue }));
      };

    const aceptarCambios = async () => {
        if (proveedor.id === -1) await agregar(proveedor);
        else await modificar(proveedor);
        navigate(-1);
        setProveedor((prevProveedor) => ({ ...prevProveedor, id: prevProveedor.id === -1 ? -2 : -1 }));
      };
    

    function cancelarCambios() {
        navigate(-1);
    }

    if (error) {
        return <h1>Error:{error}</h1>;
    }

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos del Proveedor</h2>

            <div className="mb-3 col-2">
                <label htmlFor="idProveedor" className="form-label">
                    Id
                </label>
                <input type="text" className="form-control" id="idProveedor" value={proveedor.id} readOnly disabled />
            </div>

            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input type="text" className="form-control" id="nombre" value={proveedor.nombre} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="apellido" className="form-label">
                        Apellido
                    </label>
                    <input type="text" className="form-control" id="apellido" value={proveedor.apellido} onChange={handleEditChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="cuit" className="form-label">
                        CUIT
                    </label>
                    <input type="text" className="form-control" id="cuit" value={proveedor.cuit} onChange={handleEditChange} />
                </div>
                <div className="col">
                    <label htmlFor="correo" className="form-label">
                        Correo
                    </label>
                    <input type="text" className="form-control" id="correo" value={proveedor.correo} onChange={handleEditChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="telefono" className="form-label">
                        Telefono
                    </label>
                    <input type="text" className="form-control" id="telefono" value={proveedor.telefono} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="debe" className="form-label">
                        Debe
                    </label>
                    <input type="number" className="form-control" id="debe" value={proveedor.debe} onChange={handleEditChange} />
                </div>
            </div>           
            <div className="mb-3 row">
                <div className="col">
                    <label htmlFor="debe" className="form-label">
                        Haber
                    </label>
                    <input type="number" className="form-control" id="haber" value={proveedor.haber} onChange={handleEditChange} />
                </div>

                <div className="col">
                    <label htmlFor="saldo" className="form-label">
                        Saldo
                    </label>
                    <input type="number" className="form-control" id="saldo" value={proveedor.saldo} onChange={handleEditChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="activo"
                            name="activo"
                            checked={proveedor.activo}
                            onChange={handleEditChange}
                        />
                        <label htmlFor="activo" className="form-check-label">
                            Activo
                        </label>
                    </div>
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
