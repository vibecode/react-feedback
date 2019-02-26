import { v4 } from 'uuid'
import { createSelector } from 'reselect'

const initialState = [
  {
    id: 1,
    title: 'How would you rate our online store, based on:',
    quests: [
      {
        id: v4(),
        parentId: 1,
        type: 'RATING',
        icon: 'BOWL',
        title: 'Design of the site',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        parentId: 1,
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
        parentId: 1,
        type: 'RATING',
        icon: 'THUMB',
        title: 'Finding what you needed',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        parentId: 1,
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
    id: 2,
    title:
      'Thanks for that, now could you tell us a bit about the delivery process?',
    quests: [
      {
        id: v4(),
        parentId: 2,
        type: 'RATING',
        icon: 'LIGHTNING',
        title: 'How would you rate the delivery time?',
        answered: false,
        total: 5,
        rating: ''
      },
      {
        id: v4(),
        parentId: 2,
        type: 'RATING',
        icon: 'HEART',
        title: 'The friendliness of the delivery driver?',
        answered: false,
        total: 5,
        rating: 0
      },
      {
        id: v4(),
        parentId: 2,
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
    id: 3,
    title: 'Could you tell us from where you placed your order?',
    quests: [
      {
        id: v4(),
        parentId: 3,
        type: 'PLATFORM',
        answered: false,
        answer: ''
      }
    ]
  },
  {
    id: 4,
    title: 'Thanks, and would you recommend us to your friends?',
    quests: [
      {
        id: v4(),
        parentId: 4,
        type: 'CHANCE',
        answered: false,
        total: 10,
        rating: 0
      }
    ]
  },
  {
    id: 5,
    title: 'Now, do you have any suggestions for us?',
    quests: [
      {
        id: v4(),
        parentId: 5,
        type: 'FEEDBACK',
        answer: '',
        answered: false
      }
    ]
  },
  {
    id: 6,
    title: 'Finally, would you like 15% off your next shop?',
    quests: [
      {
        id: v4(),
        parentId: 6,
        type: 'EMAIL',
        answer: '',
        answered: false
      }
    ]
  }
]

const questions = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ANSWER':
      const parent = state.find(quest => quest.id === payload.parentId)

      const newParent = {
        ...parent,
        quests: parent.quests.map(quest => {
          return quest.id === payload.id ? { ...quest, ...payload } : quest
        })
      }

      return state.map(parent =>
        parent.id === newParent.id ? { ...parent, ...newParent } : parent
      )

    default:
      return state
  }
}

export const getQuestions = state => state.questions

export const getAllSubQuests = createSelector(
  getQuestions,
  questions =>
    questions.reduce((acc, cur) => {
      return [...acc, ...cur.quests]
    }, [])
)

export const getProgress = createSelector(
  getAllSubQuests,

  allSubQuests => {
    const answered = allSubQuests.filter(quest => quest.answered)
    return (100 / allSubQuests.length) * answered.length
  }
)

export default questions
