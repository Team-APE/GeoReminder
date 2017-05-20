import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'semantic-ui-react'
import MapWrapper from '../components/Map.jsx'

class Main extends Component {
  constructor(props) {
    super(props)

    console.log("hello", this.props)
  }
  render () {
    return (
      <div>
        <MapWrapper handleMapLoad={this.props.handleMapLoad}
          handleMapClick={this.props.handleMapClick}
          markers={this.props.markers}
          handleMarkerRightClick={this.props.handleMarkerRightClick}
          handleMarkerClick={this.props.handleMarkerClick}
          myPosition={this.props.myPosition}>
        </MapWrapper>
      </div>
    )
  }
}

export default Main
