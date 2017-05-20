import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, IndexRoute } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import Home from './layouts/Home.jsx'
import List from './layouts/List.jsx'
import Main from './layouts/Main.jsx'
import NewReminder from './components/NewReminder.jsx'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    //STATE PROPERTIES----------------------------------
    this.state = {
      //MAP MARKERS
      markers: [{
        position: {
          lat: 33.979581,
          lng: -118.422478
        },
        key: 'LA',
        defaultAnimation: 2
      }],

      //NEW REMINDERS
      modal: {
        title: "",
        note: "",
        address: ""
      }
    }
    //METHOD BINDS+DECLARATIONS-------------------------------
    //MAP 
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this)

    //NEW REMINDER 
    this.handleModalSubmit = this.handleModalSubmit.bind(this)
    this.handleModalChange = this.handleModalChange.bind(this)
    this.MainRoute = this.MainRoute.bind(this)
  }


  //METHOD DEFINITIONS--------------------------------------------------
  //MAP 
  MainRoute(props) {
    return (
      <Main {...props}
        handleMapLoad={this.handleMapLoad}
        handleMapClick={this.handleMapClick}
        markers={this.state.markers}
        handleMarkerRightClick={this.handleMarkerRightClick}>
      </Main>
    )
  }

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick(event) {
    console.log('New Marker position: ', event.latLng.lat(), event.latLng.lng())
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now() // Add a key property for: http://fb.me/react-warning-keys
      }
    ]
    this.setState({
      markers: nextMarkers
    })
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker)
    this.setState({
      markers: nextMarkers
    })
  }

  //NEW REMINDERS
  handleModalSubmit(event) {
    event.preventDefault()
    console.log("Submitted form!", this.state, event.target)
    // // ajax calls
    // axios({
    //   method: 'post',
    //   url: '/user/',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   }
    // });
    //0 -on submit create a new reminder on the database by POST request to  
    //use response to create new marker

    // close the modal

    // update 
  }

  handleModalChange(event, type) {
    console.log(type)
    console.log(event)
    const obj = {}

    obj[type] = event.target.value
    this.setState(Object.assign(this.state, { modal: obj }))
  }


  // //COMPONENT DID MOUNT-----------------------------------------
  // componentDidMount() {

  // }

  //RENDER-----------------------------------------------------
  render() {
    return (
      <Router>
        <div>
          <Menu as='nav' style={{ margin: '10px' }}>
            <Menu.Item as={Link} name='home' to='/main' />
            <Menu.Menu position='right'>
              <Menu.Item as='a' name='list' onClick={(e) => { console.log(e) }} />
              <NewReminder handleChange={this.handleModalChange} handleSubmit={this.handleModalSubmit} data={this.state.modal} />
            </Menu.Menu>
          </Menu>



          <Route exact path='/' component={Home} />
          <Route path='/main' render={this.MainRoute} />
        </div>
      </Router>
    )
  }
}

export default App
