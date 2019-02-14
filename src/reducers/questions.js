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
    type: 'STAR',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'PEN',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'LIGHTNING',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'HEART',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'THUMB',
    text: 'Design of the site',
    answered: false,
    total: 5,
    recieved: 0
  },
  {
    id: v4(),
    type: 'CHECK',
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
