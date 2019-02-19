import React, { PureComponent } from 'react'
import styles from './Chance.module.scss'

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
      <div>
        <form className={styles.form}>
          {this.totalArr.map(rating => {
            return (
              <div
                className={
                  answer === rating.toString()
                    ? styles.checkbox_container_checked
                    : styles.checkbox_container
                }
              >
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
        <div className={styles.legend}>
          <span>Not at all</span>
          <span>Hmm, maybe</span>
          <span>100%</span>
        </div>
      </div>
    )
  }
}

export default Chance
