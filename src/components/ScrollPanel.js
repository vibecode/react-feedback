import React, { PureComponent } from 'react'
import styles from './ScrollPanel.module.scss'

export class ScrollPanel extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.props.handleUp}>Up</button>
        <button onClick={this.props.handleDown}>Down</button>
      </div>
    )
  }
}

export default ScrollPanel
