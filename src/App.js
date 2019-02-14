import React, { Component } from 'react'
import { connect } from 'react-redux'
import Rating from './components/Rating'
import styles from './App.module.scss'

class App extends Component {
  constructor(props) {
    super(props)

    for (let ele of props.questions) {
      this[ele.id] = React.createRef()
    }
  }

  scroll = () => {
    window.scrollTo({
      top: this['3'].current.offsetTop,
      left: 100,
      behavior: 'smooth'
    })
  }

  render() {
    const { questions } = this.props

    return (
      <main>
        <button onClick={this.scroll}>Scroll To 3</button>

        {questions.map(({ id, type, total }) => (
          <section className={styles.question_section} key={id} ref={this[id]}>
            <Rating total={total} type={type} />
          </section>
        ))}
      </main>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.questions
})

export default connect(mapStateToProps)(App)
