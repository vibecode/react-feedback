import React, { PureComponent } from 'react'
import Rating from './Rating'
import styles from './Question.module.scss'

export class Question extends PureComponent {
  submitRating = answer => {
    this.props.submitRating(answer)
  }

  renderQuest({ id, icon, type, title, total }) {
    return (
      <section
        className={
          id !== this.props.focusedId
            ? styles.sub_question_section
            : styles.sub_question_section_focused
        }
        key={id}
        id={id}
        ref={this.props.refsDic[id]}
      >
        <div>
          <h2 className={styles.sub_title}>{title}</h2>
          <Rating
            id={id}
            icon={icon}
            total={total}
            submitRating={this.submitRating}
          />
        </div>
      </section>
    )
  }
  render() {
    const { quests, title, focusedId } = this.props

    const focusedIdx = quests.findIndex(quest => quest.id === focusedId)

    return (
      <section className={styles.question_section}>
        <div className={styles.center_wrapper}>
          <h1
            className={focusedIdx === 0 ? styles.title_focused : styles.title}
          >
            {title}
          </h1>
          {quests.map(quest => {
            return this.renderQuest(quest)
          })}
        </div>
      </section>
    )
  }
}

export default Question
