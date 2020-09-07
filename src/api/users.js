import http from './http'

const URL = `/usuaria`

export function findUserById({ id }) {
  return http.get(`${URL}/obter-usuaria-por-id/${id}`)
}

export function listAllUsers() {
  return http.get(`${URL}/listar-usuarias`)
}

export function updateUser({ id, user }) {
  return http.post(`${URL}/atualizar-usuaria/${id}`, user)
}

export function createUser(user) {
  return http.post(`${URL}/criar-usuaria`, user)
}

export function deleteUser(id) {
  return http.delete(`${URL}/deletar-usuaria/${id}`)
}

export function login(login) {
  return http.post(`${URL}/authenticar`, login)
}
