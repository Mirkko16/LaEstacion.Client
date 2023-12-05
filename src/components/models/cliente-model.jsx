export class ClienteModel {
    constructor() {
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.CUIT = "";
        this.Direccion = "";
        this.Localidad = "";
        this.Telefono = "";
        this.Debe = 0;
        this.Haber = 0;
        this.Activo = false;
        this.CuentaCorriente = false;
        this.TarjetaSocio = false;
        this.PuntosTarjeta = 0;
        this.NumeroTarjeta = "";
    }
}
