import React, { Component } from 'react';

class StationModuleData extends Component {
  render() {
    const key = this.props.data_type;
    const dashboard_data = this.props.value;
    let symbol;
    let value = '-';

    switch (key) {
    case 'Temperature':
      symbol = '°C';
      break;

    case 'CO2':
      symbol = 'ppm';
      break;

    case 'Humidity':
      symbol = '%';
      break;

    case 'Noise':
      symbol = 'db';
      break;

    case 'Pressure':
      symbol = 'mb';
      break;

    case 'Rain':
      symbol = 'mm';
      break;

    case 'Wind':
      symbol = 'km/h';
      break;

    default:
      symbol = '';
    }

    if (dashboard_data) {
      if (dashboard_data[key] !== undefined) {
        value = key + ': ' + dashboard_data[key] + ' ' + symbol;

        if (key === 'Rain' && dashboard_data['sum_rain_24'] !== undefined) {
          value += ', ' + dashboard_data['sum_rain_24'] + ' ' + symbol + ' in the last 24 hours';
        }
      } else if (key === 'Wind' && dashboard_data['WindStrength'] !== undefined) {
        value = dashboard_data['WindStrength'] + ' ' + symbol;

        if (dashboard_data['WindAngle'] !== undefined) {
          value += ' from ' + dashboard_data['WindAngle'] + '°';
        }

        if (dashboard_data['GustStrength'] !== undefined) {
          value += ', gusting at ' + dashboard_data['GustStrength'] + ' ' + symbol;
        }

        if (dashboard_data['GustAngle'] !== undefined) {
          value += ' from ' + dashboard_data['GustAngle'] + '°';
        }
      }
    }

    return (
      <li className="metric">{value}</li>
    );
  }
}

export default StationModuleData;
