import React, { Component } from 'react';
import StationModule from './StationModule';

const { ipcRenderer } = window.require('electron');

class Station extends Component {
  render() {
    ipcRenderer.send('debug', 'Displaying modules:');

    const station = this.props.value;
    let modules = [];
    const keys_to_extract = [
      '_id',
      'module_name',
      'dashboard_data',
      'data_type',
      'reachable',
      'wifi_status',
      'battery_percent',
    ];
    let module = {};

    keys_to_extract.forEach(k => {
      if (station[k] !== undefined) {
        module[k] = station[k];
      }
    });
    modules.push(module);

    station.modules.forEach(sub_module => {
      module = {};
      keys_to_extract.forEach(k => {
        if (station[k] !== undefined) {
          module[k] = sub_module[k];
        }
      });
      modules.push(module);
    });

    ipcRenderer.send('debug', modules);

    const items = modules.map((item) => <StationModule key={item._id} value={item} />);

    return (
      <div className="station">{items}</div>
    );
  }
}

export default Station;
