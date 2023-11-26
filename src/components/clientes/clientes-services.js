import axios from "axios";

export function getClientes() {
  return axios.get('https://localhost:7295/api/clientes');
}

export function getCliente(id) {
  return axios.get(`https://localhost:7295/api/clientes/${id}`);
}

export function agregar(clienteRequest) {

  axios.post(`https://localhost:7295/api/clientes`, {...clienteRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/clientes/${id}`);
}

export function modificar(cliente) {
  console.log(cliente);
  axios.put(`https://localhost:7295/api/clientes/`,cliente);
}
