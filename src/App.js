import React, { Component } from 'react'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import styles from './App.module.scss'
import ScrollPanel from './components/ScrollPanel'
import { getProgress } from './reducers/questions'
import { answer } from './actions'
import Question from './components/Question'
import { getAllSubQuests } from './reducers/questions'
class App extends Component {
  constructor(props) {
    super(props)

    this.refsDic = {
      footer: React.createRef()
    }

    for (let el of props.subQuests) {
      this.refsDic[el.id] = React.createRef()
    }

    this.refsArray = props.subQuests
      .map(quest => this.refsDic[quest.id])
      .concat(this.refsDic.footer)

    this.onScrollThrottled = throttle(this.onScroll, 100)

    this.state = {
      focusedId: '',
      activeUp: false,
      activeDown: true
    }
  }

  componentDidMount() {
    this.setFocused()
    window.addEventListener('scroll', this.onScrollThrottled)
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedId, activeDown, activeUp } = this.state

    if (prevState.focusedId !== focusedId) {
      const focusedIdx = this.refsArray.findIndex(
        ref => ref.current.id === focusedId
      )

      if (focusedIdx === 0) {
        this.setState({
          activeUp: false,
          activeDown: true
        })

        return
      }

      if (focusedIdx === this.refsArray.length - 1) {
        this.setState({
          activeUp: true,
          activeDown: false
        })

        return
      }

      if (!activeDown || !activeUp)
        this.setState({
          activeUp: true,
          activeDown: true
        })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollThrottled)
  }

  setFocused() {
    const focused = this.refsArray.find(ref => {
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
    const { focusedId } = this.state

    const idx =
      this.refsArray.findIndex(ref => ref.current.id === focusedId) - 1

    if (idx < 0) return

    const centerWindow = document.documentElement.clientHeight / 2
    const el = this.refsArray[idx].current

    const top = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo({
      left: 0,
      top,
      behavior: 'smooth'
    })
  }

  scrollDownToNext = () => {
    const { focusedId } = this.state

    const idx =
      this.refsArray.findIndex(ref => ref.current.id === focusedId) + 1

    if (!idx || idx === this.refsArray.length) return

    const centerWindow = document.documentElement.clientHeight / 2
    const el = this.refsArray[idx].current
    const top = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo({
      left: 0,
      top,
      behavior: 'smooth'
    })
  }

  submitRating = answer => {
    this.props.answer(answer)

    if (answer.answered) {
      setTimeout(() => this.scrollDownToNext(), 800)
    }
  }

  render() {
    const { questions, progress } = this.props
    const { activeUp, activeDown, focusedId } = this.state

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          {questions.map(({ title, quests, id }) => {
            return (
              <Question
                key={id}
                title={title}
                quests={quests}
                focusedId={focusedId}
                submitRating={this.submitRating}
                refsDic={this.refsDic}
              />
            )
          })}
        </main>
        <footer
          className={
            this.state.focusedId !== 'footer'
              ? styles.footer
              : styles.footer_focused
          }
          id="footer"
          ref={this.refsDic.footer}
        >
          All DONE
        </footer>
        <ScrollPanel
          activeUp={activeUp}
          activeDown={activeDown}
          handleDown={this.scrollDownToNext}
          handleUp={this.scrollUpToNext}
          progress={progress}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  //TODO: use reselect
  subQuests: getAllSubQuests(state),
  progress: getProgress(state)
})

export default connect(
  mapStateToProps,
  { answer }
)(App)
