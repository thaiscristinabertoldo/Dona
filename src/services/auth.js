import * as usersService from 'api/users'

export function getToken() {
  return window.localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY)
}

export function setToken(token) {
  return window.localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY, token)
}

export function removeToken() {
  return window.localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY)
}

export function getUserAutenticatedId() {
  return window.localStorage.getItem(process.env.REACT_APP_AUTH_USER_AUTENTICATED_ID_KEY)
}

export function setUserAutenticatedId(id) {
  return window.localStorage.setItem(process.env.REACT_APP_AUTH_USER_AUTENTICATED_ID_KEY, id)
}

export function removeUserAutenticatedId() {
  return window.localStorage.removeItem(process.env.REACT_APP_AUTH_USER_AUTENTICATED_ID_KEY)
}

export function bootstrap() {
  const token = getToken()

  if (!token) {
    return Promise.resolve(null)
  }

  const a = usersService.findUserById({ id: getUserAutenticatedId() }).catch(() => Promise.resolve(null))

  return a
}

export async function login(login) {
  return usersService.login(login).then((data) => {
    console.log('data', data.id)
    setToken(data.token)
    setUserAutenticatedId(data.id)

    return data
  })
}

export function logout() {
  removeToken()
  removeUserAutenticatedId()

  return Promise.resolve(null)
}
