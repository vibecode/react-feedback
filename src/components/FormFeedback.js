import React, { PureComponent } from 'react'
import styles from './FormFeedback.module.scss'

export class FeedbackForm extends PureComponent {
  state = {
    answer: ''
  }

  onInputChange = ev => {
    const { value } = ev.target

    this.setState({
      answer: value
    })
  }

  onSubmit = ev => {
    ev.preventDefault()

    const answer = this.state.answer.trim()

    this.props.submitAnswer({
      answer,
      answered: !!answer,
      id: this.props.id,
      parentId: this.props.parentId
    })
  }

  render() {
    return (
      <form className={styles.form}>
        <textarea
          type="textarea"
          className={styles.input}
          onChange={this.onInputChange}
          placeholder="Type your answer here"
          rows="1"
        />
        <p className={styles.hint}>
          <strong>SHIFT</strong> + <strong>ENTER</strong> to make a line break
        </p>
        <button onClick={this.onSubmit} className={styles.submit}>
          <div className={styles.ok}>OK</div>
          <span className={styles.svg_container}>
            <svg
              class="SVGInline-svg"
              width="16"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillrule="nonzero"
                d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
              />
            </svg>
          </span>
        </button>
      </form>
    )
  }
}

export default FeedbackForm
