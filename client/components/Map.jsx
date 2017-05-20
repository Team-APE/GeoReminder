import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


//stateless google map
const Map = withGoogleMap(props => (
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

//stateless map container
class MapWrapper extends Component {
  render () {
    return (
      <div className='ui container' style={{}}>
        <Map
          containerElement={
            <div style={{ height: '500px' }} />
          }
          mapElement={
            <div style={{ height: '500px' }} />
          }
          onMapLoad={this.props.handleMapLoad}
          onMapClick={this.props.handleMapClick}
          markers={this.props.markers}
          onMarkerRightClick={this.props.handleMarkerRightClick}>
        </Map>
      </div>
    )
  }
}

export default MapWrapper
