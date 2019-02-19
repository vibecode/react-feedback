import React, { PureComponent } from 'react'
import style from './Chance.module.scss'

export class Chance extends PureComponent {
  constructor(props) {
    super(props)

    this.totalArr = new Array(this.props.total).fill(true).map((item, idx) => {
      return idx + 1
    })

    this.state = {
      answer: ''
    }
  }

  onChange = ev => {
    const { value } = ev.target
    const { id, parentId } = this.props

    this.setState(
      state => {
        if (state.answer && state.answer === value) {
          return {
            answer: ''
          }
        }

        return {
          answer: value
        }
      },
      () => {
        this.props.submitAnswer({
          answer: this.state.answer,
          answered: !!this.state.answer,
          id,
          parentId
        })
      }
    )
  }

  render() {
    const { answer } = this.state

    return (
      <form className={style.form}>
        {this.totalArr.map(rating => {
          return (
            <div className={style.checkbox_container}>
              <input
                type="checkbox"
                id={rating}
                value={rating}
                checked={answer === rating.toString()}
                onChange={this.onChange}
              />
              <label htmlFor={rating}>{rating}</label>
            </div>
          )
        })}
      </form>
    )
  }
}

export default Chance
