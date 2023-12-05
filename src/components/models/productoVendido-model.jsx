import {ProductoModel} from '../models/producto-model';

export class ProductoVendidoModel {
    constructor() {
        this.producto = new ProductoModel();
        this.cantidad = 0;
        this.ventaId = 0;
    }
}