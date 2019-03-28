import React, { Component } from 'react';
import Station  from './Station';

class StationDetails extends Component {
  render() {
    const devices = Object.values(this.props.stations);
    const items = devices.map((item, idx) => <Station key={idx} value={item} />);

    return (
      <div>{items}</div>
    );
  }
}

export default StationDetails;
