import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 33.979581, lng: -118.422478 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
))

class GettingStartedExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      markers: [{
        position: {
          lat: 33.979581,
          lng: -118.422478
        },
        key: 'LA',
        defaultAnimation: 2
      }]
    }
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this)
  }

  handleMapLoad (map) {
    this._mapComponent = map
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick (event) {
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

  handleMarkerRightClick (targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker)
    this.setState({
      markers: nextMarkers
    })
  }

  render () {
    return (
      <div className='ui container' style={{}}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: '500px' }} />
          }
          mapElement={
            <div style={{ height: '500px' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    )
  }
}

export default GettingStartedExample
