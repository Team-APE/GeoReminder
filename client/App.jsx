import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './layouts/Home.jsx'
import List from './layouts/List.jsx'
import Main from './layouts/Main.jsx'
import NewReminder from './layouts/NewReminder.jsx'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/new' component={NewReminder} />
          <Route path='/main' component={Main} />
          <Route path='/list' component={List} />
        </Switch>
      </Router>
    )
  }
}

export default App
