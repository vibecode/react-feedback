import React, { Component } from 'react'
import Question from './Question'
import TopPanel from './TopPanel'
import ScrollPanel from './ScrollPanel'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import { throttle } from 'lodash'
import { answer, start } from '../actions'
import {
  getAllSubQuests,
  getQuestions,
  getProgress
} from '../reducers/questions'
import { CSSTransition } from 'react-transition-group'
import styles from './Quize.module.scss'

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
    window.addEventListener('keypress', this.onEnterPress)
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
    window.removeEventListener('keypress', this.onEnterPress)
    clearTimeout(this._timeout)
  }

  setFocused() {
    const { questions } = this.props

    const focused = this.refsArray.find(ref => {
      const el = ref.current

      if (el) {
        const elTop = el.getBoundingClientRect().top
        const elBottom = el.getBoundingClientRect().bottom
        const centerWindow = Math.floor(
          document.documentElement.clientHeight / 2
        )

        return elTop < centerWindow && elBottom > centerWindow
      } else {
        return false
      }
    })

    if (focused) {
      const focusedId = focused.current.id
      const focusedParent = questions.find(parent =>
        parent.quests.some(quest => quest.id === focusedId)
      )

      let showTop = false

      if (focusedParent) {
        const focusedChildIdx = focusedParent.quests.findIndex(
          quest => quest.id === focusedId
        )

        const parentTop = this[focusedParent.id].getBoundingClientRect().top

        showTop = parentTop < 0 || focusedChildIdx > 0
      }

      //first condition prevents render if focused id hasn't changed
      if (focusedId !== this.state.focusedId || showTop) {
        this.setState({
          focusedId: focusedId,
          focusedParentId: focusedParent && focusedParent.id,
          focusedMainTitle: focusedParent && focusedParent.title,
          showTop
        })
      }
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

  scrollToFocus = currentId => {
    if (currentId === this.state.focusedId) return

    const el = this.refsDic[currentId].current

    const centerWindow = document.documentElement.clientHeight / 2

    const top = el.offsetTop - centerWindow + el.offsetHeight / 2

    window.scrollTo({
      left: 0,
      top,
      behavior: 'smooth'
    })
  }

  submitAnswer = answer => {
    this.props.answer(answer)

    if (answer.id !== this.state.focusedId) {
      this.scrollToFocus(answer.id)

      return
    }

    this._timeout = setTimeout(() => this.scrollDownToNext(), 800)
  }

  submitFinish = () => {
    alert('Thank you! All the data has been sent to Mark Zuckerberg :P')
  }

  onEnterPress = ev => {
    if (ev.key === 'Enter' && this.state.focusedId === 'footer') {
      this.submitFinish()
    }
  }

  render() {
    const { questions, progress } = this.props
    const {
      activeUp,
      activeDown,
      focusedId,
      focusedMainTitle,
      showTop
    } = this.state

    return (
      <div className={styles.container}>
        <CSSTransition
          in={showTop}
          mountOnEnter
          unmountOnExit
          timeout={500}
          classNames="trans_top"
        >
          <TopPanel title={focusedMainTitle} />
        </CSSTransition>
        <div className={styles.center_wrapper}>
          <main className={styles.main}>
            {questions.map(({ title, quests, id }) => {
              return (
                <section
                  key={id}
                  ref={tag => (this[id] = tag)}
                  style={{ margin: 0, padding: 0 }}
                >
                  <Question
                    title={title}
                    quests={quests}
                    focusedId={focusedId}
                    submitAnswer={this.submitAnswer}
                    refsDic={this.refsDic}
                    onFormFocus={this.scrollToFocus}
                  />
                </section>
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
            <SubmitButton onClick={this.submitFinish}>All done!</SubmitButton>
          </footer>
        </div>
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
  questions: getQuestions(state),
  subQuests: getAllSubQuests(state),
  progress: getProgress(state)
})

export default connect(
  mapStateToProps,
  { answer, start }
)(App)
