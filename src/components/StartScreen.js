import React, { PureComponent } from 'react'
import SubmitButton from './SubmitButton'
import styles from './StartScreen.module.scss'
import logo from '../logo.png'
import { isMobile } from 'react-device-detect'

class StartScreen extends PureComponent {
  onEnterPress = ev => {
    ev.preventDefault()

    if (ev.key === 'Enter' && !ev.shiftKey) {
      this.props.onSubmit()
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onEnterPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEnterPress)
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h1 className={styles.legend}>
          {`Thanks for shopping with Waves Inc. `}
          <br />
          {`We'd love to know a bit more about your experience with us.`}
        </h1>
        <SubmitButton onClick={this.props.onSubmit} noHint>
          I want to give feedback!
        </SubmitButton>
        {isMobile || <p>press ENTER</p>}
      </section>
    )
  }
}

export default StartScreen
