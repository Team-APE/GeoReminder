import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, IndexRoute } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

import Home from './layouts/Home.jsx'
import List from './layouts/List.jsx'
import Main from './layouts/Main.jsx'
import NewReminder from './components/NewReminder.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: {
        sup: 'hi'
      },
      modal: {
        title: "",
        note: "",
        address: ""
      }
    }

    this.handleModalSubmit = this.handleModalSubmit.bind(this)
    this.handleModalChange = this.handleModalChange.bind(this)
    this.MainRoute = this.MainRoute.bind(this)
  }

  MainRoute (props) {
    return (
      <Main {...props} markers={this.state.markers} />
    )
  }
  
  handleModalSubmit(event) {
    event.preventDefault()
    console.log("Submitted form!", this.state, event)
    // ajax calls
    // close the modal
    // update 
  } 

  handleModalChange(event, type) {
    console.log(type)
    console.log(event)
    const obj = {}

    obj[type] = event.target.value
    this.setState(Object.assign(this.state, {modal: obj}))
  }

  render () {
    return (
      <Router>
        <div>
          <Menu as='nav' style={{ margin: '10px' }}>
            <Menu.Item as={Link} name='home' to='/main' />
            <Menu.Menu position='right'>
              <Menu.Item as='a' name='list' onClick={(e) => {console.log(e)}} />
              <NewReminder handleChange = {this.handleModalChange} handleSubmit= {this.handleModalSubmit} data = {this.state.modal}/>
            </Menu.Menu>
          </Menu>

          <Route exact path='/' component={Home} />

          <Route path='/main' render={this.MainRoute} />
          { /* <Route path='/main' component={Main} components={{something: 'blah'}} >
            <IndexRoute />
          </Route> */ }

        </div>
      </Router>
    )
  }
}

export default App
