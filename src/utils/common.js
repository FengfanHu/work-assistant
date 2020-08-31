function getCookie (cookieName) {
  const cookies = document.cookie
  const cookiesArr = cookies.split(':')
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cookiesArr.length; i++) {
    const cookie = cookiesArr[i].split('=')
    if (cookie[0] === cookieName) {
      return cookie[1]
    }
  }
  return undefined
}

export default {
  getCookie
}
