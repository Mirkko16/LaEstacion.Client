import axios from "axios";

export function getRubros() {
  return axios.get('https://localhost:7295/api/rubros');
}

export function getRubro(id) {
  return axios.get(`https://localhost:7295/api/rubros/${id}`);
}

export function agregar(rubroRequest) {

  axios.post(`https://localhost:7295/api/rubros`, {...rubroRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/rubros/${id}`);
}

export function modificar(rubro) {
  console.log(rubro);
  axios.put(`https://localhost:7295/api/rubros/`,rubro);
}
