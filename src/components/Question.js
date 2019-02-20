import React, { PureComponent } from 'react'
import Rating from './Rating'
import Platform from './Platform'
import Chance from './Chance'
import FormFeedback from './FormFeedback'
import FormEmail from './FormEmail'
import styles from './Question.module.scss'

export class Question extends PureComponent {
  submitAnswer = answer => {
    this.props.submitAnswer(answer)
  }

  renderQuest({ id, parentId, icon, type, title, total }, mapIdx) {
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
        <>
          {mapIdx === 0 ? (
            <h1 className={styles.title}>{this.props.title}</h1>
          ) : null}
          <h2 className={styles.sub_title}>{title}</h2>
          {(() => {
            switch (type) {
              case 'RATING':
                return (
                  <Rating
                    id={id}
                    parentId={parentId}
                    icon={icon}
                    total={total}
                    submitRating={this.submitAnswer}
                  />
                )
              case 'PLATFORM':
                return (
                  <Platform
                    id={id}
                    parentId={parentId}
                    submitAnswer={this.submitAnswer}
                  />
                )
              case 'CHANCE':
                return (
                  <Chance
                    id={id}
                    parentId={parentId}
                    submitAnswer={this.submitAnswer}
                    total={total}
                  />
                )
              case 'FEEDBACK':
                return (
                  <FormFeedback
                    id={id}
                    parentId={parentId}
                    submitAnswer={this.submitAnswer}
                  />
                )
              case 'EMAIL':
                return (
                  <FormEmail
                    id={id}
                    parentId={parentId}
                    submitAnswer={this.submitAnswer}
                  />
                )
              default:
                return null
            }
          })()}
        </>
      </section>
    )
  }
  render() {
    const { quests } = this.props

    return quests.map((quest, mapIdx) => {
      return this.renderQuest(quest, mapIdx)
    })
  }
}

export default Question
