import axios from "axios";

export function getProveedores() {
  return axios.get('https://localhost:7295/api/proveedores');
}

export function getProveedor(id) {
  return axios.get(`https://localhost:7295/api/proveedores/${id}`);
}

export function agregar(proveedorRequest) {
  axios.post(`https://localhost:7295/api/proveedores`, {...proveedorRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/proveedores/${id}`);
}

export function modificar(proveedor) {
  console.log(proveedor);
  axios.put(`https://localhost:7295/api/proveedores/`,proveedor);
}