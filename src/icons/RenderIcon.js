import React from 'react'
import { ReactComponent as Bowl } from './bowl.svg'

function RenderIcon({ type }) {
  switch (type) {
    case 'BOWL':
      return <Bowl />
    default:
      break
  }
}

export default RenderIcon
