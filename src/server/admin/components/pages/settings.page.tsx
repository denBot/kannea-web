import { H4, Header, Label, Box, Input, CheckBox, Button } from 'admin-bro'
import React, { Component } from 'react'; // let's also import Component
import axios from "axios"
import _ from "lodash"

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

  async getSettings() {
    console.log("ping!")
    await axios.get("/api/settings")
      .then(response => {
        console.log(response)
        this.setState({
          settings: response.data,
          isLoading: false
        })
      }).catch(err => {
        console.error(err)
      })
  }

  async componentDidMount() {
    await this.getSettings()
  }

  prepareSettings() {
    let inputGroup: any[] = []
    let checkBoxGroup: any[] = []
    let keyIndex = 0

    for (const setting in this.state.settings) {
      if (setting == "_id") continue

      switch (typeof this.state.settings[setting]) {
        case "boolean":
          checkBoxGroup.push(
            <Box style={{ margin: 10, display: "flex", flexDirection: "row" }} key={keyIndex}>
              <CheckBox required={true} value={this.state.settings[setting]}/>
              <Label required={true}>{_.startCase(setting)}</Label>
            </Box>

          )
          break
        default:
          inputGroup.push(
            <Box style={{ margin: 10 }} key={keyIndex}>
              <Label required={true}>{_.startCase(setting)}</Label>
              <Input required={true} style={{width: '100%'}} value={this.state.settings[setting]}></Input>
            </Box>
          )
      }
      keyIndex++
    }
    console.log("eeep")
    return [<H4 key={-2}>Input Options:</H4>].concat(inputGroup, <br/>, <H4 key={-1}>Toggleable Options:</H4>, checkBoxGroup)
  }

  render() {
    return (
      <section>
        <Box style={{margin: 32, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Header>Settings Panel</Header>
            <Button variant="danger">Reset</Button>
        </Box>

        <Box style={{margin: 32, padding: 32, background: '#fff' }}>

          { this.state.settings ? this.prepareSettings() : '' }

          <Box style={{display: "flex", justifyContent: "center"}}>
            <Button variant="primary" style={{ marginRight: 10 }}>Save</Button>
          </Box>
        </Box>
      </section>
    )
  }
}

export default SettingsPage
