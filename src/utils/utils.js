export const isDown = () => {
  return window.innerHeight + window.pageYOffset >= document.body.scrollHeight
}

export const isUp = () => {
  return window.pageYOffset === 0
}
