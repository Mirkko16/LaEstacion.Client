import axios from "axios";

export function getClientes() {
  return axios.get('http://localhost:3000/clientes');
}

export function getCliente(id) {
  return axios.get(`http://localhost:3000/clientes/${id}`);
}

export function agregar(nuevoCliente) {
  //nuevoAuto.id = autos.reduce((max, actual) => actual.id > max ? actual.id : max, 0) + 1;
  //autos.push(nuevoAuto);
  axios.post(`http://localhost:3000/clientes`, {...nuevoCliente, id:null});
}

export function borrar(id) {
  axios.delete(`http://localhost:3000/clientes/${id}`);
}

export function modificar(cliente) {
  axios.put(`http://localhost:3000/clientes/${cliente.id}`,cliente);
}
