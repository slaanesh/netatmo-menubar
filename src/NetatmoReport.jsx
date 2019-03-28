import React, { Component } from 'react';
import { ProgressCircle } from 'react-desktop/macOs';
import StationDetails  from './StationDetails';

const { ipcRenderer } = window.require('electron');
const netatmo = require('netatmo');

const CLIENT_ID = '5c7543a85c495e0c008c140f';
const CLIENT_SECRET = 'NYiOOD8sATm5mN7y7zweqX67Oi76cyy0PL4at4TFDYm';

class NetatmoReport extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount = () => {
    const auth = {
      "client_id": CLIENT_ID,
      "client_secret": CLIENT_SECRET,
      "username": this.props.account,
      "password": this.props.password,
    };

    const api = new netatmo(auth);

    // Get Stations Data
    // See docs: https://dev.netatmo.com/dev/resources/technical/reference/weatherstation/getstationsdata
    this.refresh(api);
  }

  refresh = (api) => {
    const self = this;

    ipcRenderer.send('debug', 'Fetching stations data...');

    api.getStationsData(function(err, devices) {
      ipcRenderer.send('debug', 'got station data!');
      ipcRenderer.send('debug', 'will refresh in 10mn');
      self.setState(devices);
      setTimeout(() => {
        self.refresh(api)
      }, 600000);
    });
  }

  render() {
    if (Object.keys(this.state).length) {
      return (
        <div id="details"><StationDetails stations={this.state} /></div>
      );
    } else {
      return (
        <div id="loading">
          <ProgressCircle size={25} color="white"/>
        </div>
      );
    }
  }
}

export default NetatmoReport;
