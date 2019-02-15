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
    this.setFocused()
    window.addEventListener('scroll', this.onScrollThrottled)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollThrottled)
  }

  setFocused() {
    const focused = this.elems.find(ref => {
      const el = ref.current

      if (el) {
        const elTop = el.getBoundingClientRect().top
        const elBottom = el.getBoundingClientRect().bottom
        const centerWindow = document.documentElement.clientHeight / 2

        return elTop <= centerWindow && elBottom >= centerWindow
      } else {
        return false
      }
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
    this.setFocused()
  }

  scrollUpToNext = () => {
    //check if we are at the top
    if (window.pageYOffset === 0) {
      return
    }

    const { focusedId } = this.state

    const idx = this.elems.findIndex(ref => ref.current.id === focusedId) - 1

    if (idx < 0) return

    const centerWindow = document.documentElement.clientHeight / 2
    const el = this.elems[idx].current
    const top = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo({
      left: 0,
      top,
      behavior: 'smooth'
    })
  }

  scrollDownToNext = () => {
    //check if we are at the bottom
    if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
      return
    }

    const { focusedId } = this.state

    const idx = this.elems.findIndex(ref => ref.current.id === focusedId) + 1

    if (!idx || idx === this.elems.length) return

    const centerWindow = document.documentElement.clientHeight / 2
    const el = this.elems[idx].current
    const top = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo({
      left: 0,
      top,
      behavior: 'smooth'
    })
  }

  render() {
    const { questions } = this.props

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          {questions.map(({ id, type, total }) => (
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
              <Rating total={total} type={type} submitRating={() => null} />
            </section>
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
        <ScrollPanel
          handleDown={this.scrollDownToNext}
          handleUp={this.scrollUpToNext}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions
})

export default connect(mapStateToProps)(App)
