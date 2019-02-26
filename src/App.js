import React from 'react'
import Quize from './components/Quize'
import StartScreen from './components/StartScreen'
import { connect } from 'react-redux'
import { start } from './actions'
import { CSSTransition } from 'react-transition-group'
import { getRoute } from './reducers/route'

function App(props) {
  return (
    <div>
      <CSSTransition
        in={props.route === 'QUIZE'}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames="trans"
      >
        <Quize />
      </CSSTransition>

      <CSSTransition
        in={props.route === 'WELCOME'}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames="trans"
      >
        <StartScreen onSubmit={props.start} />
      </CSSTransition>
    </div>
  )
}

const mapStateToProps = state => ({
  route: getRoute(state)
})

export default connect(
  mapStateToProps,
  { start }
)(App)
