import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'semantic-ui-react'
import GettingStartedExample from '../components/Map.jsx'

class Main extends Component {
  constructor(props) {
    super(props)

    console.log("hello", this.props)
  }
  render () {
    return (
      <div>
        <GettingStartedExample />
      </div>
    )
  }
}

export default Main
