import React, { Component } from 'react';
import { Button, TextInput } from 'react-desktop/macOs';
import NetatmoReport  from './NetatmoReport';
const { ipcRenderer } = window.require('electron');

class NetatmoCredentials extends Component {
  constructor() {
    super();

    this.state = {
      account: '',
      password: '',
    };
  }

  componentDidMount = (event) => {
    ipcRenderer.on('findCredentials', (event, accounts) => {
      if (accounts.length) {
        ipcRenderer.send('debug', 'An account has been found');
        this.setState(accounts[0]);
      }
    });
  }

  submitCredentials = (event) => {
    if (this.state.account.length && this.state.password.length) {
      ipcRenderer.send('savePassword', this.state);

      event.preventDefault();
      this.setState({
        form: false,
      });
    }
  }

  setCredentials = () => {
    this.setState({
      form: true,
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    if (this.state.form === true) {
      return (
        <form onSubmit={this.submitCredentials}>
          <TextInput name="account" Label="User name" placeholder="user@example.org" onChange={this.handleChange}/>
          <TextInput name="password" password="true" Label="Password" onChange={this.handleChange} />
          <Button type="submit">Save</Button>
        </form>
      );
    } else if (this.state.account.length) {
      return (
        <div>
          <p className="connected-account">Netatmo connected account: {this.state.account}</p>
          <NetatmoReport account={this.state.account} password={this.state.password}/>
        </div>
      );
    } else {
      return (
        <div id="credentials">
          <Button color="blue" onClick={this.setCredentials}>Set your credentials</Button>
        </div>
      );
    }
  }
}

export default NetatmoCredentials;
