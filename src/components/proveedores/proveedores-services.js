import axios from "axios";

export function getProveedores() {
  return axios.get('http://localhost:3000/proveedores');
}

export function getProveedor(id) {
  return axios.get(`http://localhost:3000/proveedores/${id}`);
}

export function agregar(nuevoProveedor) {
  //nuevoAuto.id = autos.reduce((max, actual) => actual.id > max ? actual.id : max, 0) + 1;
  //autos.push(nuevoAuto);
  axios.post(`http://localhost:3000/proveedores`, {...nuevoProveedor, id:null});
}

export function borrar(id) {
  axios.delete(`http://localhost:3000/proveedores/${id}`);
}

export function modificar(proveedor) {
  axios.put(`http://localhost:3000/proveedores/${proveedor.id}`,proveedor);
}