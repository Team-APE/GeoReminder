import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'semantic-ui-react'

class Main extends Component {
  render () {
    return (
      <div>
        <h1>Main</h1>
        <Button>
          Click Here
        </Button>
      </div>
    )
  }
}

export default Main
