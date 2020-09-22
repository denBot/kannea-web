import { Label, Box } from 'admin-bro'
import React, { Component } from 'react'; // let's also import Component

type settingsState = {
  settings: any,
  isLoading: boolean
}

export class SettingsPage extends Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      settings: null,
      isLoading: true
    }
  }

  getSettings() {
    this.setState({
      settings: {someSetting: 1},
      isLoading: false
    });
  }

  componentDidMount() {
    this.getSettings()
  }

  render() {
    return <p>The current time is {JSON.stringify(this.state.settings)}</p>
  }
}

export default SettingsPage
