import axios from "axios";

export function getProductos() {
  
  return axios.get('https://localhost:7295/api/productos');
}

export function getProducto(id) {
  return axios.get(`https://localhost:7295/api/productos/${id}`);
}

export function getProductobyBarCode(codigoBarras) {
  return axios.get(`https://localhost:7295/api/productos/barcode/${codigoBarras}`);
}

export function agregar(nuevoProducto) {
  
  axios.post(`https://localhost:7295/api/productos`, {...nuevoProducto, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/productos/${id}`);
}

export function modificar(producto) {
  console.log(producto)
  axios.put(`https://localhost:7295/api/productos/`,producto);
}
