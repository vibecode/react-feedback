import React, { PureComponent } from 'react'
import styles from './ScrollPanel.module.scss'

export class ScrollPanel extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.progress} />
        <div className={styles.buttons_container}>
          <button
            onClick={this.props.handleUp}
            className={
              this.props.activeUp ? styles.button : styles.button_disabled
            }
          >
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="grey"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="nonzero"
                d="M11.996 8.121l1.414-1.414L6.705 0 0 6.707l1.414 1.414 5.291-5.293z"
              />
            </svg>
          </button>
          <button
            onClick={this.props.handleDown}
            className={
              this.props.activeDown ? styles.button : styles.button_disabled
            }
          >
            <svg
              width="14"
              height="9"
              fill="grey"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="nonzero"
                d="M12.293.293l1.414 1.414L7 8.414.293 1.707 1.707.293 7 5.586z"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }
}

export default ScrollPanel
