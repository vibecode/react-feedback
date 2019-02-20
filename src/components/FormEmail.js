import React, { PureComponent } from 'react'
import styles from './FormEmail.module.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import isEmail from 'validator/lib/isEmail'
import SubmitButton from './SubmitButton'

export class FormEmail extends PureComponent {
  state = {
    answer: '',
    error: false
  }

  onInputChange = ev => {
    const { value } = ev.target

    this.setState({
      answer: value,
      error: false
    })
  }

  onSubmit = ev => {
    ev.preventDefault()

    const answer = this.state.answer.trim()

    if (answer && !isEmail(answer)) {
      this.setState({
        error: true
      })

      return
    }

    this.props.submitAnswer({
      answer,
      answered: !!answer,
      id: this.props.id,
      parentId: this.props.parentId
    })
  }

  onEnterPress = ev => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      this.onSubmit(ev)
    }
  }

  render() {
    const { answer, error } = this.state
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <h2 className={styles.legend}>
          Drop us your email address if you want us to send you a coupon.
        </h2>

        <input
          type="text"
          className={styles.input}
          onChange={this.onInputChange}
          placeholder="Type your email here..."
          ref={tag => (this.input = tag)}
          onKeyPress={this.onEnterPress}
        />

        <div className={styles.trans_container}>
          <CSSTransition
            in={!!answer && !error}
            mountOnEnter
            unmountOnExit
            timeout={500}
            classNames="trans"
          >
            <SubmitButton />
          </CSSTransition>

          <CSSTransition
            in={error}
            mountOnEnter
            unmountOnExit
            timeout={500}
            classNames="trans"
          >
            <div className={styles.error}>Invalid email format</div>
          </CSSTransition>
        </div>
      </form>
    )
  }
}

export default FormEmail
