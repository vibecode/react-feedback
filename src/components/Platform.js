import React, { PureComponent } from 'react'
import styles from './Platform.module.scss'
import Smartwatch from '../icons/watch.png'
import Smartphone from '../icons/smart.png'
import Tablet from '../icons/tablet.png'
import Laptop from '../icons/laptop.png'

class Platform extends PureComponent {
  state = {
    answer: ''
  }

  types = ['Smartwatch', 'Smartphone', 'Tablet', 'Laptop']
  icons = { Tablet, Smartphone, Laptop, Smartwatch }
  letters = ['A', 'B', 'C', 'D']

  onChange = ev => {
    const { value } = ev.target
    const { id, parentId } = this.props

    this.setState(
      state => {
        if (state.answer && state.answer === value)
          return {
            answer: ''
          }
        return {
          answer: value
        }
      },
      () =>
        this.props.submitAnswer({
          id,
          parentId,
          answered: !!this.state.answer,
          answer: this.state.answer
        })
    )
  }

  render() {
    const { answer } = this.state

    return (
      <form className={styles.form}>
        {this.types.map((type, idx) => {
          return (
            <div key={type} className={styles.item_container}>
              <div className={styles.icon_container}>
                {answer === type && (
                  <div className={styles.check_icon}>
                    <div className={styles.svg_check_container}>
                      <svg
                        class="SVGInline-svg"
                        width="16"
                        height="13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillrule="nonzero"
                          d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className={styles.input_container}>
                  <input
                    type="checkbox"
                    id={type}
                    name={type}
                    value={type}
                    checked={answer === type}
                    onChange={this.onChange}
                  />
                  <label
                    htmlFor={type}
                    className={answer === type ? styles.label : styles.label}
                  >
                    <img src={this.icons[type]} alt={type} />
                  </label>
                  <div className={styles.title_container}>
                    <div className={styles.key}>
                      <span>{this.letters[idx]}</span>
                    </div>
                    <p className={styles.title}>{type}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </form>
    )
  }
}

export default Platform
