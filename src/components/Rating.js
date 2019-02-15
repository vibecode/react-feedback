import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

  static propTypes = {
    total: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    submitRating: PropTypes.func.isRequired
  }

  handleChange = e => {
    const { value } = e.target
    const { boxes, answerValue } = this.state

    const currentBox = boxes.find(box => box.value === value)

    if (currentBox.value === answerValue && currentBox.checked) {
      this.setState(
        {
          boxes: boxes.map(box => ({
            ...box,
            checked: false
          })),
          answerValue: ''
        },
        () => {
          this.props.submitRating({
            rating: 0,
            answered: false,
            id: this.props.id
          })
        }
      )

      return
    }

    this.setState(
      {
        boxes: boxes.map(box => ({
          ...box,
          checked: box.value <= value
        })),
        answerValue: value
      },
      () => {
        const { answerValue } = this.state

        this.props.submitRating({
          rating: Number(answerValue) || 0,
          answered: true,
          id: this.props.id
        })
      }
    )
  }

  render() {
    const { boxes, answerValue } = this.state
    const { type } = this.props

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
              <RenderIcon type={type} />
            </label>
          </div>
        ))}
      </form>
    )
  }
}

export default Rating
