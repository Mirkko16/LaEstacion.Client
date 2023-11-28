import axios from "axios";

export function getFamilias() {
  return axios.get('https://localhost:7295/api/familias');
}

export function getFamilia(id) {
  return axios.get(`https://localhost:7295/api/familias/${id}`);
}

export function agregar(familiaRequest) {

  axios.post(`https://localhost:7295/api/familias`, {...familiaRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/familias/${id}`);
}

export function modificar(familia) {
  console.log(familia);
  axios.put(`https://localhost:7295/api/familias/`,familia);
}
