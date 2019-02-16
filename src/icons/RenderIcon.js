import React from 'react'
import { ReactComponent as Bowl } from './bowl.svg'
import { ReactComponent as Star } from './star.svg'
import { ReactComponent as Thumb } from './thumb.svg'
import { ReactComponent as Pen } from './pen.svg'
import { ReactComponent as Lightning } from './lightning.svg'
import { ReactComponent as Heart } from './heart.svg'
import { ReactComponent as Check } from './check.svg'

function RenderIcon({ icon }) {
  switch (icon) {
    case 'BOWL':
      return <Bowl />
    case 'STAR':
      return <Star />
    case 'THUMB':
      return <Thumb />
    case 'PEN':
      return <Pen />
    case 'LIGHTNING':
      return <Lightning />
    case 'HEART':
      return <Heart />
    case 'CHECK':
      return <Check />
    default:
      return null
  }
}

export default RenderIcon
