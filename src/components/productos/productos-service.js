import axios from "axios";

export function getProductos() {
  return axios.get('https://localhost:7295/api/productos');
}

export function getProducto(id) {
  return axios.get(`https://localhost:7295/api/productos/${id}`);
}

export function agregar(nuevoProducto) {
  //nuevoAuto.id = autos.reduce((max, actual) => actual.id > max ? actual.id : max, 0) + 1;
  //autos.push(nuevoAuto);
  axios.post(`https://localhost:7295/api/productos`, {...nuevoProducto, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/productos/${id}`);
}

export function modificar(producto) {
  axios.put(`https://localhost:7295/api/productos/`,producto);
}
