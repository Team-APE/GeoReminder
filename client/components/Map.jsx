import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps'


//stateless google map
const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={props.myPosition}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
    {props.myPosition.lat && props.myPosition.lng && (
      <Circle
        center={props.myPosition}
        radius={2000}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}>
      {console.log(props.myPosition)}
      </Circle>
    )}

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
          myPosition={this.props.myPosition}
          onMarkerRightClick={this.props.handleMarkerRightClick} >
        </Map>
      </div>
    )
  }
}

export default MapWrapper
