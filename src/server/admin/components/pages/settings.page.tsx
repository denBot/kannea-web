import { H4, Header, Label, Box, Input, CheckBox, Button, DropZone, DropZoneProps, DropZoneItem } from 'admin-bro'
import React, { Component } from 'react'; // let's also import Component
import axios from "axios"
import _ from "lodash"

type settingsState = {
  settings: any,
  originalSettings: any,
  isLoading: boolean,
  faviconToUpload: boolean,
  faviconLoaded: boolean
}

const validationOptions = {
  mimeTypes: [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/webp'
  ],
}

export class SettingsPage extends Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      settings: null,
      originalSettings: null,
      isLoading: true,
      faviconToUpload: false,
      faviconLoaded: false
    }
  }

  async getSettings() {
    await axios.get("/api/settings")
      .then(response => {
        this.setState({
          settings: response.data,
          originalSettings: response.data,
          isLoading: false
        })
      }).catch(err => {
        console.error(err)
      })
  }

  async componentDidMount() {
    await this.getSettings()
  }

  handleChange (settingsAttribute: string, value: any) {
    const settings = this.state.settings
    if (settings) {
      settings[settingsAttribute] = value
      this.setState({ settings })
    }
  }

  handleFaviconImageLoaded () {
    this.setState({faviconLoaded: true})
  }

  handleFaviconImageError() {
    this.setState({ faviconLoaded: false })
  }

  getUploadSection (imageUrl: string) {
    return (
      <Box style={{ margin: 10, marginBottom: 20 }}>
        <Label required={true}>{_.startCase(imageUrl)}:</Label>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '6%', minWidth: 100, maxHeight: 72, }}>
            {!this.state.faviconLoaded && <p>Placeholder</p>}
            <img
              src={this.state.settings[imageUrl]}
              style={{ width: 84 }}
              onLoad={this.handleFaviconImageLoaded.bind(this)}
              onError={this.handleFaviconImageError.bind(this)}
            />
          </div>
          <div style={{ width: '94%' }}>
            <DropZone onChange={(event: any) => { console.log(event) }}
              uploadLimitIn={'MB'}
              multiple={false}
              validate={validationOptions}
            />
            {this.state.faviconToUpload && (
              <DropZoneItem
                src={this.state.settings.faviconUrl}
              />
            )}
          </div>
        </div>
        <Input
          required={true}
          style={{ width: '100%', marginTop: 10 }}
          value={this.state.settings.faviconUrl}
          onChange={(event: any) => { this.handleChange(imageUrl, event.target.value) }}
        />
      </Box>
    )
  }

  render() {
    return (
      <section>
        <Box style={{margin: 32, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Header>Settings Panel</Header>
            <Button variant="danger">Reset</Button>
        </Box>

        <Box style={{margin: 32, padding: 32, background: '#fff' }}>

          { this.state.settings ? (

            <section>
              <H4 style={{ marginBottom: 20 }}>Editable Settings</H4>
              <Box style={{ margin: 10, marginBottom: 20 }}>
                <Label required={true}>Website Name:</Label>
                <Input
                  required={true}
                  style={{ width: '100%' }}
                  value={this.state.settings.websiteName}
                  onChange={(event: any) => { this.handleChange("websiteName", event.target.value) }}
                />
              </Box>
              <Box style={{ margin: 10, marginBottom: 20 }}>
                <Label required={true}>Contact Email:</Label>
                <Input
                  required={true}
                  style={{ width: '100%' }}
                  value={this.state.settings.contactEmail}
                  onChange={(event: any) => { this.handleChange("contactEmail", event.target.value) }}
                />
              </Box>

              <H4 style={{ marginTop: 30, marginBottom: 20 }}>Site Images:</H4>
              { this.getUploadSection("faviconUrl")}

              <H4 style={{marginTop: 30, marginBottom: 20}}>Toggleable Settings</H4>
              <Box style={{ margin: 10, display: "flex", flexDirection: "row" }}>
                <CheckBox
                  required={true}
                  checked={false}
                  onChange={(event: any) => { this.handleChange("websiteName", event.target.value) }}
                />
                <Label required={true}>Disable comments on all pages</Label>
              </Box>
            </section>

          ) : ''}

          <Box style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            <Button variant="primary" style={{ marginRight: 10 }}>Save</Button>
          </Box>
        </Box>

        { JSON.stringify(this.state.settings)}
      </section>
    )
  }
}

export default SettingsPage
