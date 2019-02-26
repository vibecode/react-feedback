export default (state = 'WELCOME', { type }) => {
  switch (type) {
    case 'START':
      return 'QUIZE'
    default:
      return state
  }
}

export const getRoute = state => state.route
