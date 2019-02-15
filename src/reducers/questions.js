import { v4 } from 'uuid'

const initialState = [
  {
    id: v4(),
    type: 'BOWL',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  },
  {
    id: v4(),
    type: 'STAR',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  },
  {
    id: v4(),
    type: 'PEN',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  },
  {
    id: v4(),
    type: 'LIGHTNING',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: ''
  },
  {
    id: v4(),
    type: 'HEART',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  },
  {
    id: v4(),
    type: 'THUMB',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  },
  {
    id: v4(),
    type: 'CHECK',
    text: 'Design of the site',
    answered: false,
    total: 5,
    rating: 0
  }
]

const questions = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ANSWER':
      const quest = state.find(quest => quest.id === payload.id)

      if (!quest) throw new Error('unknown question id')

      return state.map(quest => {
        if (quest.id === payload.id) {
          return { ...quest, ...payload }
        } else {
          return quest
        }
      })
    default:
      return state
  }
}

export const getProgress = state => {
  const answered = state.questions.filter(quest => quest.answered)

  return (100 / state.questions.length) * answered.length
}

export default questions
