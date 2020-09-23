import { H4, Header, Label, Box, Input, CheckBox, Button, DropZone, DropZoneProps, DropZoneItem, Loader } from 'admin-bro'
import React, { Component } from 'react'; // let's also import Component
import axios from "axios"
import validator from "email-validator"
import _ from "lodash"

type settingsState = {
  settings: any,
  originalSettings: any,
  isLoading: boolean,
  invalidInput: boolean,
  faviconIsLoaded: boolean,
  logoIsLoaded: boolean
}

export class SettingsPage extends Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      settings: null,
      originalSettings: null,
      isLoading: true,
      logoIsLoaded: false,
      faviconIsLoaded: false,
      invalidInput: false
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
    settings[settingsAttribute] = value

    let invalidInput = value === ""

    if (settingsAttribute === "contactEmail" && !invalidInput) {
      invalidInput = !validator.validate(value)
    }

    this.setState({ settings, invalidInput })
  }

  handleImageLoaded (e: any, isFavicon: boolean) {
    if (isFavicon) {
      this.setState({ faviconIsLoaded: true, invalidInput: false })
    } else {
      this.setState({ logoIsLoaded: true, invalidInput: false })
    }
    e.target.style.display = 'block'
  }

  handleImageError(e: any, isFavicon: boolean) {
    if (isFavicon) {
      this.setState({ faviconIsLoaded: false, invalidInput: true })
    } else {
      this.setState({ logoIsLoaded: false, invalidInput: true })
    }
    e.target.style.display = 'none'
  }

  getUploadSection (imageUrl: string) {
    const isFavicon = imageUrl == "faviconUrl"
    const isLoaded = isFavicon ? this.state.faviconIsLoaded : this.state.logoIsLoaded
    return (
      <Box style={{ margin: 10, marginBottom: 20 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '6%', minWidth: 100, maxHeight: 72, }}>
            {!isLoaded && <section style={{ marginLeft: -40, marginTop: -40 }}><Loader/></section>}
            <img
              src={this.state.settings[imageUrl]}
              style={{ width: 64, marginLeft: 10 }}
              onLoad={(e: any) => this.handleImageLoaded(e, isFavicon)}
              onError={(e: any) => this.handleImageError(e, isFavicon)}
            />
          </div>
          <div style={{ width: '94%' }}>
            <Label required={true}>Enter a valid {_.startCase(imageUrl)} below:</Label>
            <Input
              required={true}
              style={{ width: '100%', marginTop: 10 }}
              value={this.state.settings[imageUrl]}
              onChange={(e: any) => this.handleChange(imageUrl, e.target.value)}
            />
          </div>
        </div>

      </Box>
    )
  }

  render() {
    console.log(this.state.faviconToUpload)
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

              <H4 style={{ marginTop: 40, marginBottom: 20 }}>Site Images:</H4>
              { this.getUploadSection("faviconUrl")}
              { this.getUploadSection("logoUrl")}

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

          ) : <Loader/>}

          <Box style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            <Button variant="primary" style={{ marginRight: 10 }} disabled={this.state.invalidInput}>Save</Button>
          </Box>
        </Box>

        { JSON.stringify(this.state.settings)}
      </section>
    )
  }
}

export default SettingsPage
