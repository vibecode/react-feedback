import React, { Component } from 'react'
import { connect } from 'react-redux'
import Rating from './components/Rating'
import { throttle } from 'lodash'
import styles from './App.module.scss'
import ScrollPanel from './components/ScrollPanel'

class App extends Component {
  constructor(props) {
    super(props)

    for (let ele of props.questions) {
      this[ele.id] = React.createRef()
    }
    this.footer = React.createRef()
    this.elems = props.questions
      .map(quest => this[quest.id])
      .concat(this.footer)

    this.onScrollThrottled = throttle(this.onScroll, 100)

    this.state = {
      focusedId: ''
    }
  }

  componentDidMount() {
    this.findFocused()
    window.addEventListener('scroll', this.onScrollThrottled)
  }

  findFocused() {
    const focused = this.elems.find(ref => {
      const el = ref.current
      const elTop = el.getBoundingClientRect().top
      const elBottom = el.getBoundingClientRect().bottom
      const centerWindow = document.documentElement.clientHeight / 2

      return elTop <= centerWindow && elBottom >= centerWindow
    })

    if (focused) {
      this.setState({
        focusedId: focused.current.id
      })
    } else {
      this.setState({
        focusedId: ''
      })
    }
  }

  onScroll = () => {
    this.findFocused()
  }

  scrollUp = () => {}

  scrollDown = () => {
    //check if we are already at the bottom
    if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
      return
    }

    const { focusedId } = this.state

    const idx = this.elems.findIndex(ref => ref.current.id === focusedId) + 1

    if (!idx || idx === this.elems.length) return

    const centerWindow = document.documentElement.clientHeight / 2
    const el = this.elems[idx].current
    const y = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo(0, y)
  }

  render() {
    const { questions } = this.props

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          {questions.map(({ id, type, total }) => (
            <div className={styles.question_container}>
              <section
                className={
                  id !== this.state.focusedId
                    ? styles.question_section
                    : styles.question_section_focused
                }
                key={id}
                ref={this[id]}
                id={id}
              >
                <Rating total={total} type={type} />
              </section>
            </div>
          ))}
        </main>
        <footer
          className={
            this.state.focusedId !== 'footer'
              ? styles.footer
              : styles.footer_focused
          }
          id="footer"
          ref={this.footer}
        >
          All DONE
        </footer>
        <ScrollPanel handleDown={this.scrollDown} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions
})

export default connect(mapStateToProps)(App)
