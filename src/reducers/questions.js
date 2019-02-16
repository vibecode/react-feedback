import { v4 } from 'uuid'

const initialState = [
  {
    id: v4(),
    title: 'How would you rate our online store, based on:',
    quests: [
      {
        id: v4(),
        type: 'RATING',
        icon: 'BOWL',
        title: 'Design of the site',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        type: 'RATING',
        icon: 'STAR',
        title: 'The range of products',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        type: 'RATING',
        icon: 'THUMB',
        title: 'Finding what you needed',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        type: 'RATING',
        icon: 'PEN',
        title: 'Product description',
        answered: false,
        total: 5,
        rating: 0
      }
    ]
  },
  {
    id: v4(),
    title:
      'Thanks for that, now could you tell us a bit about the delivery process?',
    quests: [
      {
        id: v4(),
        type: 'RATING',
        icon: 'LIGHTNING',
        title: 'How would you rate the delivery time?',
        answered: false,
        total: 5,
        rating: ''
      },
      {
        id: v4(),
        type: 'RATING',
        icon: 'HEART',
        title: 'The friendliness of the delivery driver?',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        type: 'RATING',
        icon: 'CHECK',
        title: 'And the quality and condition of the received product?',
        answered: false,
        total: 5,
        rating: 0
      }
    ]
  },
  {
    id: v4(),
    title: 'Could you tell us from where you placed your order?',
    quests: [
      {
        id: v4(),
        type: 'PLATFORM',
        answered: false,
        answer: ''
      }
    ]
  },
  {
    id: v4(),
    title: 'Thanks, and would you recommend us to your friends?',
    quests: [
      {
        id: v4(),
        type: 'CHANCE',
        answered: false,
        total: 10,
        rating: 0
      }
    ]
  },
  {
    id: v4(),
    title: 'Now, do you have any suggestions for us?',
    quests: [
      {
        id: v4(),
        type: 'FORM',
        answer: ''
      }
    ]
  },
  {
    id: v4(),
    title: 'Finally, would you like 15% off your next shop?',
    quests: [
      {
        id: v4(),
        type: 'FORM',
        answer: ''
      }
    ]
  }
]

const questions = (state = initialState, { icon, payload }) => {
  switch (icon) {
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

export const getAllSubQuests = state => {
  return state.questions.reduce((acc, cur) => {
    return [...acc, ...cur.quests]
  }, [])
}

export const getProgress = state => {
  const answered = state.questions.filter(quest => quest.answered)

  return (100 / state.questions.length) * answered.length
}

export default questions
