import { ClienteModel } from "./cliente-model";
import { ProductoVendidoModel } from "./productoVendido-model";

export class VentaModel {
    constructor() {
        this.numVenta = 0;
        this.puntoVenta = 0;
        this.cliente = new ClienteModel();
        this.productos = [new ProductoVendidoModel()];
        this.fechaVenta = new Date();
        this.tipoPago = "";
        this.tipoComprobante = "";
        this.descuento = 0;
        this.gananciaCuentasCorriente = 0;
        this.total = 0;
    }
}
