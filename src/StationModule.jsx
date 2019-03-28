import React, { Component } from 'react';
import StationModuleData from './StationModuleData';

class StationModule extends Component {
  render() {
    const module = this.props.value;
    let status;

    if (module.reachable) {
      if (module.dashboard_data.time_utc) {
        let date = new Date(module.dashboard_data.time_utc * 1000);
        date = date.toLocaleString();
        status = <span className="status">Last seen on {date}</span>
      } else {
        status = <span className="status">Reachable, but no data to report</span>
      }

      return (
        <div className="module">
          <p className="module-name">Module: {module.module_name} - {status}</p>
          <ul className="module-data">
            {module.data_type.map((data_type) => <StationModuleData key={data_type} data_type={data_type} value={module.dashboard_data} /> )}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="module">
          <span className="error">Module {module.module_name} is not reachable!</span>
        </div>
      );
    }
  }
}

export default StationModule;
