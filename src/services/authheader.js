export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    // for Node.js Express back-end
    return { 'x-token': user.token, 'x-method': 'conventional' }
  } else {
    return {}
  }
}