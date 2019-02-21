export const answer = answer => {
  return { type: 'ANSWER', payload: answer }
}

export const start = () => {
  return { type: 'START' }
}
