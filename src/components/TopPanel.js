import React from 'react'
import styles from './TopPanel.module.scss'

function TopPanel({ title }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}

export default TopPanel
