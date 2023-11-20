import axios from "axios";

export function getProductos() {
  return axios.get('http://localhost:3000/productos');
}

export function getProducto(id) {
  return axios.get(`http://localhost:3000/productos/${id}`);
}

export function agregar(nuevoProducto) {
  //nuevoAuto.id = autos.reduce((max, actual) => actual.id > max ? actual.id : max, 0) + 1;
  //autos.push(nuevoAuto);
  axios.post(`http://localhost:3000/productos`, {...nuevoProducto, id:null});
}

export function borrar(id) {
  axios.delete(`http://localhost:3000/productos/${id}`);
}

export function modificar(producto) {
  axios.put(`http://localhost:3000/productos/${producto.id}`,producto);
}
