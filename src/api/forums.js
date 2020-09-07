import http from './http'

const URL = ``

export function listAllForums() {
  return http.get(`${URL}/obter-foruns`)
}

export function findDiscussionByForumId({ id }) {
  return http.get(`${URL}/obter-comentarios/${id}`)
}

export function createForum(forum) {
  return http.post(`${URL}/criar-forum`, forum)
}

export function createDiscussion(discussion) {
  return http.post(`${URL}/criar-comentario`, discussion)
}
