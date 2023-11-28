import axios from "axios";

export function getMarcas() {
  return axios.get('https://localhost:7295/api/marcas');
}

export function getMarca(id) {
  return axios.get(`https://localhost:7295/api/marcas/${id}`);
}

export function agregar(marcaRequest) {

  axios.post(`https://localhost:7295/api/marcas`, {...marcaRequest, id:null});
}

export function borrar(id) {
  axios.delete(`https://localhost:7295/api/marcas/${id}`);
}

export function modificar(marca) {
  console.log(marca);
  axios.put(`https://localhost:7295/api/marcas/`,marca);
}
