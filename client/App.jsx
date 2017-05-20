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
      myPosition: {
        lat: null,
        lng: null
      },
      me: {username: null},
      //MAP MARKERS
      markers: [],

      //NEW REMINDERS
      modal: {
        title: "",
        note: "",
        address: "",
        hide: false
      },
      detailModal: {
        title: "",
        note: "",
        address: "",
        hide: false
      }
    }
    //METHOD BINDS+DECLARATIONS-------------------------------
    //MAP 
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.addNewMarker = this.addNewMarker.bind(this)
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)

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
        handleMarkerRightClick={this.handleMarkerRightClick}
        handleMarkerClick={this.handleMarkerClick}
        myPosition = {this.state.myPosition}
        detailModal = {this.state.detailModal}
        >
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
    // Disables map click drop pin
    // this.setState({
    //   markers: nextMarkers
    // })
  }


  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker)
    // youre suppose to do an ajax call to remove the reminder
    this.setState({
      markers: nextMarkers
    })
  }

  handleMarkerClick(target) {
    console.log('clicked marker', target)
    const {lat, lng} = target.position
    // console.log('my latlatlat', lat)
    let modalData = this.state.allReminders.filter((cur) => {
      if (cur.location.latitude.match(String(lat))) return true
        else return false
    })
    console.log('thisthisthit', modalData)
    let {title, notes, location} = modalData[0]
    alert(JSON.stringify({title, notes, location}, null, 2))
    // let modalData = {
    //   title: "",
    //   note: "",
    //   address: "",
    //   hide: false
    // }
    // this.setState()
  }


  //NEW REMINDERS-----------------------
  addNewMarker(location) {
    console.log('New Marker position: ', location)
    const nextMarkers = [
      ...this.state.markers,
      {
        position: location,
        defaultAnimation: 2,
        key: Date.now()
      }
    ]
    this.setState({
      markers: nextMarkers
    })
  }

  handleModalSubmit(event) {
    event.preventDefault()

    axios({
      method: 'post',
      url: '/api/reminders/5920be6397248624471835ca',
      data: {
        title: this.state.modal.title,
        notes: this.state.modal.note,
        location: {
          address: this.state.modal.address
        }
      }
    })
      //use response to create new marker
      .then((resp) => {
        console.log("RESPONSEEEEEE POSt", resp);
        resp.data.location.lat = Number(resp.data.location.latitude);
        resp.data.location.lng = Number(resp.data.location.longitude);
        console.log("WHILE POSTING", resp.data.location)
        this.addNewMarker(resp.data.location)

        // close the modal --TO DO
        // let newState = Object.assign(this.state);
        // newState.modal.hide = true;
        // this.setState()


      })


  }

  handleModalChange(event, type) {
    const newState = Object.assign(this.state)
    newState.modal[type] = event.target.value
    this.setState(newState)
  }

  //COMPONENT DID MOUNT-----------------------------------------------------
  componentDidMount() {

    //USER POSITION--------
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition((pos) => {
      const newState = Object.assign(this.state);
      newState.myPosition.lat = pos.coords.latitude;
      newState.myPosition.lng = pos.coords.longitude;
      this.setState(newState)
      console.log("MY POSITION", this.state.myPosition)
    }, error, options);

    //REMINDER LOCATIONS-------
    console.log("in component did mount!!")
    let that =this;
    axios.get('/api/users/5920be6397248624471835ca')
      .then(function (response) {
        const reminders = response.data.reminders;
        console.log("USER REMINDERS", reminders);
        that.setState(Object.assign(that.state, {allReminders: reminders}))
        reminders.forEach(el=>{

          //set position of each event
          console.log("ELEMENT", el)
          const pos  = {};
          pos.lat = Number(el.location.latitude);
          pos.lng = Number(el.location.longitude);
          that.addNewMarker(pos);
        })


      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
