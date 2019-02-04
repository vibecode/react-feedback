import React, { Component } from 'react'

const data = ['one', 'two', 'three', 'four']
class App extends Component {
  constructor(props) {
    super(props)

    for (let ele of data) {
      this[ele] = React.createRef()
      console.log(ele)
    }
  }

  scroll = () => {
    window.scrollTo({
      top: this.three.current.offsetTop,
      left: 100,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <main>
        <button onClick={this.scroll}>Scroll To 3</button>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data.map(el => (
            <li
              style={{
                height: '100vh',
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`
              }}
              key={data}
              ref={this[el]}
            >
              {el}
            </li>
          ))}
        </ul>
      </main>
    )
  }
}

export default App
