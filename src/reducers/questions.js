import { v4 } from 'uuid'

const initialState = [
  {
    id: v4(),
    type: 'BOWL',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'BOWL',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'BOWL',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  }
]

const questions = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'lol':
      return state

    default:
      return state
  }
}

export default questions
