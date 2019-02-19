import React, { PureComponent } from 'react'
import RenderIcon from '../icons/RenderIcon'
import styles from './Rating.module.scss'
import { v4 } from 'uuid'

export class Rating extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      boxes: new Array(props.total).fill(true).map((box, idx) => ({
        id: v4(),
        value: String(idx + 1),
        checked: false
      })),

      answerValue: ''
    }
  }

  handleChange = e => {
    const { value } = e.target
    const { id, parentId } = this.props
    const { boxes } = this.state

    const currentBox = boxes.find(box => box.value === value)

    this.setState(
      state => {
        const { boxes, answerValue } = state

        //cancel answer
        if (currentBox.value === answerValue && currentBox.checked) {
          return {
            boxes: boxes.map(box => ({
              ...box,
              checked: false
            })),
            answerValue: ''
          }
        }

        //set answer
        return {
          boxes: boxes.map(box => ({
            ...box,
            checked: box.value <= value
          })),
          answerValue: value
        }
      },
      () => {
        this.props.submitRating({
          rating: Number(this.state.answerValue),
          answered: !!this.state.answerValue,
          id,
          parentId
        })
      }
    )
  }

  render() {
    const { boxes, answerValue } = this.state
    const { icon } = this.props

    return (
      <form className={styles.rating_form}>
        {boxes.map(({ id, value, checked }) => (
          <div
            key={id}
            className={checked ? styles.box_wrapper_active : styles.box_wrapper}
          >
            <input
              type="checkbox"
              id={id}
              value={value}
              checked={checked}
              onChange={this.handleChange}
            />
            <label
              htmlFor={id}
              className={
                value === answerValue ? styles.label_anim : styles.label
              }
            >
              <RenderIcon icon={icon} />
            </label>
          </div>
        ))}
      </form>
    )
  }
}

export default Rating
