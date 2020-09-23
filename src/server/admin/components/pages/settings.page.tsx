import { H4, Header, Label, Box, Input, CheckBox, Button, Loader, MessageBox } from 'admin-bro'
import React from 'react';
import axios from "axios"

import _ from "lodash"

type settingsState = {
  settings: any,
  originalSettings: any,
  isLoading: boolean,
  invalidInput: boolean,
  faviconIsLoaded: boolean,
  logoIsLoaded: boolean,
  requestIsLoading: boolean,
  successMessage: any,
  errorMessage: any
}

export class SettingsPage extends React.Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      settings: null,
      originalSettings: null,
      isLoading: true,
      logoIsLoaded: false,
      faviconIsLoaded: false,
      invalidInput: false,
      requestIsLoading: false,
      successMessage: null,
      errorMessage: null
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
        console.log(this.state.settings)
      }).catch(err => {
        console.error(err)
      })
  }

  async saveSettings() {
    this.setState({
      requestIsLoading: true,
      successMessage: null,
      errorMessage: null
    })
    const data = { ...this.state.settings }
    await axios.put("/api/settings", data, { headers: {'Content-Type': 'application/json'}})
      .then(() => {
        this.setState({
          requestIsLoading: false,
          successMessage: "Successfully saved settings!",
        })
      }).catch(err => {
        this.setState({
          requestIsLoading: false,
          errorMessage: "Could not save settings... See console for details.",
        })
        console.error(err)
      })
  }

  async componentDidMount() {
    await this.getSettings()
  }

  isValidEmail (email: string) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  handleChange (settingsAttribute: string, value: any) {
    const settings = this.state.settings
    console.log(value)
    settings[settingsAttribute] = value

    let invalidInput = false

    if (typeof value !== "boolean") {
      invalidInput = value === ""

      if (settingsAttribute === "contactEmail" && !invalidInput) {
        invalidInput = !this.isValidEmail(value)
      }
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
              style={{ width: 64, height: 64, backgroundSize: 'cover', marginLeft: 10 }}
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
    return (
      <section>
        {
          this.state.successMessage &&
          <MessageBox
            variant="success"
            message={this.state.successMessage}
            onCloseClick={() => this.setState({successMessage: null})}
          />
        }

        {
          this.state.errorMessage &&
          <MessageBox
            variant="danger"
            message={this.state.errorMessage}
            onCloseClick={() => this.setState({ errorMessage: null})}
          />
        }

        <Box style={{margin: 24, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Header>Settings Panel</Header>
            <Button variant="danger">Reset</Button>
        </Box>

        <Box style={{margin: 24, padding: 16, background: '#fff' }}>

          { this.state.settings ? (

            <section>
              <H4 style={{ marginBottom: 20 }}>Site Images:</H4>
              { this.getUploadSection("faviconUrl")}
              { this.getUploadSection("logoUrl")}

              <H4 style={{ marginTop: 40, marginBottom: 20 }}>Editable Settings</H4>
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

              <H4 style={{marginTop: 30, marginBottom: 20}}>Toggleable Settings</H4>
              <Box style={{ margin: 10, display: "flex", flexDirection: "row" }}>
                <CheckBox
                  required={true}
                  checked={this.state.settings.closeComments}
                  onChange={(event: any) => { this.handleChange("closeComments", !this.state.settings.closeComments) }}
                />
                <Label required={true}>Disable comments on all pages</Label>
              </Box>
            </section>

          ) : <Loader/>}

          <Box style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            { this.state.requestIsLoading ? (
                <Button variant="success" style={{ marginRight: 10 }}>Saving...</Button>
            ) : (
                <Button variant="primary" style={{ marginRight: 10 }} disabled={this.state.invalidInput} onClick={async () => {await this.saveSettings()}}>Save settings</Button>
            )}
          </Box>
        </Box>
      </section>
    )
  }
}

export default SettingsPage
