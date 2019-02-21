import React from 'react'
import styles from './SubmitButton.module.scss'

function SubmitButton({ text }) {
  return (
    <div className={styles.container}>
      <button className={styles.submit} key="submit_button" type="submit">
        <div className={styles.ok}>
          <span>{text || 'OK'}</span>
        </div>
        <span className={styles.svg_container}>
          <svg width="16" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="nonzero"
              d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
            />
          </svg>
        </span>
      </button>
      <p className={styles.legend}>
        press <strong>ENTER</strong>
      </p>
    </div>
  )
}

export default SubmitButton
