import { H4, Header, Label, Box, Input, CheckBox, Button, Loader, MessageBox, DropZone, DropZoneItem } from 'admin-bro'
import React from 'react'
import axios from "axios"
import Quill from 'quill';

import _ from "lodash"

type settingsState = {
  settings: any,
  originalSettings: any,
  isLoading: boolean,
  invalidInput: boolean,

  faviconIsLoaded: boolean,
  logoIsLoaded: boolean,
  headerIsLoaded: boolean,

  requestIsLoading: boolean,
  successMessage: any,
  errorMessage: any,

  logoFile: any,
  faviconFile: any,
  headerFile: any,

  editor: any,
  editorContainer: any
}

export class SettingsPage extends React.Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      editor: null,
      editorContainer: React.createRef(),

      settings: null,
      originalSettings: null,
      isLoading: true,

      logoIsLoaded: false,
      faviconIsLoaded: false,
      headerIsLoaded: false,

      invalidInput: false,
      requestIsLoading: false,
      successMessage: null,
      errorMessage: null,

      logoFile: null,
      faviconFile: null,
      headerFile: null
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

  async resetSettings() {
    if (window.confirm("This will reset all settings to default. Are you sure?")) {
      this.setState({
        isLoading: true,
        successMessage: null,
        errorMessage: null
      })

      await axios.delete("/api/settings")
        .then(response => {
          this.setState({
            settings: response.data,
            originalSettings: response.data,
            successMessage: "Settings have been reset to default.",
            isLoading: false
          })
        }).catch(err => {
          console.error(err)
          this.setState({
            errorMessage: "Settings could not be reset... Check console for details.",
            isLoading: false
          })
        })
    }
  }

  async saveSettings() {
    this.setState({
      requestIsLoading: true,
      successMessage: null,
      errorMessage: null
    })

    let formData = new FormData();

    formData.append("logoFile", this.state.logoFile)
    formData.append("headerFile", this.state.headerFile)
    formData.append("faviconFile", this.state.faviconFile)
    formData.append("settings", JSON.stringify(this.state.settings))

    console.log(this.state.settings)

    await axios.post("/api/settings", formData, { headers: { "Content-Type": "multipart/form-data"}})
      .then((res) => {
        console.log("eep")
        this.setState({
          requestIsLoading: false,
          successMessage: "Successfully saved settings!",
          settings: res.data
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

    this.setState({
      editor: new Quill(this.state.editorContainer.current, {
        theme: 'snow'
      })
    })

    this.state.editor.clipboard.dangerouslyPasteHTML(0, this.state.settings.websiteDescription)

    this.state.editor.on('text-change', (e: any) => {
      this.handleChange(
        "websiteDescription",
        this.state.editor.root.innerHTML)
      })
  }

  componentWillUnmount() {
    this.state.editor.off('selection-change', (e: any) => console.log(e))
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

  handleImageLoading (e: any, imageUrl: string, isLoaded: boolean) {
    e.target.style.display = (isLoaded) ? "block" : "none"

    switch (imageUrl) {
      case "faviconUrl":
        this.setState({ faviconIsLoaded: isLoaded }); break
      case "logoUrl":
        this.setState({ logoIsLoaded: isLoaded }); break
      case "headerUrl":
        this.setState({ headerIsLoaded: isLoaded }); break
    }
  }

  handleFileSelection(file: any, imageUrl: string) {
    switch (imageUrl) {
      case "faviconUrl":
        this.setState({ faviconFile: file }); break
      case "logoUrl":
        this.setState({ logoFile: file }); break
      case "headerUrl":
        this.setState({ headerFile: file }); break
    }
  }

  renderImageSetting (imageUrl: string, label: string) {
    let isLoaded = false
    let mimeTypes: any[] = []

    switch (imageUrl) {
      case "faviconUrl":
        mimeTypes = [
          'image/x-icon',
          'image/png'
        ]
        isLoaded = this.state.faviconIsLoaded; break
      case "logoUrl":
        mimeTypes = [
          'image/jpeg',
          'image/png',
          'image/svg+xml'
        ]
        isLoaded = this.state.logoIsLoaded; break
      case "headerUrl":
        mimeTypes = [
          'image/jpeg',
          'image/png'
        ]
        isLoaded = this.state.headerIsLoaded; break
    }

    if (imageUrl == "headerUrl") return (
      <section>
        <Label required={true}>{label}:</Label>
        {!isLoaded && <Loader />}
        <img
          src={this.state.settings.headerUrl}
          onLoad={(e: any) => this.handleImageLoading(e, imageUrl, true)}
          onError={(e: any) => this.handleImageLoading(e, imageUrl, false)}
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            width: "100%",
            height: "18vw",
            maxHeight: 300,
            objectFit: "cover"
          }}
          />
          <section style={{marginTop: -3}}>
            <DropZone
              validate={{mimeTypes}}
              onChange={(files) => {this.handleFileSelection(files[0], imageUrl)}}
              uploadLimitIn={'MB'}
              multiple={false}
            />
          </section>
      </section>
    )

    return (
      <Box style={{ marginTop: 20, marginBottom: 20 }}>
        <Label required={true}>{label}</Label>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '6%',
            minWidth: 64,
            border: "1px dashed #454655",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10
          }}>
            {!isLoaded && <Loader/>}
            <img
              src={this.state.settings[imageUrl]}
              style={{ width: 48, height: 48, backgroundSize: 'cover' }}
              onLoad={(e: any) => this.handleImageLoading(e, imageUrl, true)}
              onError={(e: any) => this.handleImageLoading(e, imageUrl, false)}
            />
          </div>
          <div style={{ width: '94%' }}>
            <DropZone
              multiple={false}
              validate={{ mimeTypes }}
              uploadLimitIn={'MB'}
              onChange={(files) => { this.handleFileSelection(files[0], imageUrl) }}
            />
          </div>
        </div>
      </Box>
    )
  }

  renderEditableSetting(handleChangeType: string, value: string) {
    return (
      <Box style={{ marginTop: 10, marginBottom: 20 }}>
        <Label required={true}>{_.startCase(handleChangeType)}:</Label>
        <Input
          required={true}
          style={{ width: '100%' }}
          value={value}
          onChange={(event: any) => { this.handleChange(handleChangeType, event.target.value) }}
        />
      </Box>
    )
  }

  renderTextFieldSetting(handleChangeType: string, value: string) {
    return (
      <Box style={{ marginTop: 10, marginBottom: 20 }}>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
        <Label required={true}>{_.startCase(handleChangeType)}:</Label>
        <div ref={this.state.editorContainer}></div>
      </Box>
    )
  }

  renderToggleableSetting(handleChangeType: string, value: boolean, description: string) {
    return (
      <Box style={{ marginTop: 10, marginBottom: 20, display: "flex", flexDirection: "row" }}>
        <CheckBox
          required={true}
          checked={value}
          onChange={(event: any) => { this.handleChange(handleChangeType, !value) }}
        />
        <Label required={true}>{description}</Label>
      </Box>
    )
  }

  render() {
    if (this.state.isLoading) return <Loader/>

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
          <Button variant="danger" onClick={async () => { await this.resetSettings() }}>Reset</Button>
        </Box>

        <Box style={{margin: 24, padding: 16, background: '#fff' }}>

          { this.state.settings ? (

            <section>

              <section>
                { this.renderImageSetting("headerUrl", "Website Header Image:") }
                { this.renderImageSetting("faviconUrl", "Website Favicon Image:") }
                { this.renderImageSetting("logoUrl", "Website Logo:") }
              </section>

              <section>
                <H4 style={{ marginTop: 40, marginBottom: 20 }}>Editable Settings</H4>
                { this.renderEditableSetting("websiteName", this.state.settings.websiteName) }
                { this.renderEditableSetting("contactEmail", this.state.settings.contactEmail) }
                <div id="#editor"></div>
                { this.renderTextFieldSetting("websiteDescription", this.state.settings.websiteDescription) }
              </section>

              <section>
                <H4 style={{marginTop: 30, marginBottom: 20}}>Toggleable Settings</H4>
                { this.renderToggleableSetting("closeComments", this.state.settings.closeComments, "Disable comments on all pages") }
              </section>
            </section>

          ) : <Loader/>}

          <Box style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            {(this.state.requestIsLoading)  && <Button variant="secondary" style={{ marginRight: 10 }} disabled={true}>Saving settings...</Button>}
            {(this.state.isLoading) && <Button variant="success" style={{ marginRight: 10 }}>Loading settings...</Button>}
            {(!this.state.requestIsLoading && !this.state.isLoading) && <Button variant="primary" style={{ marginRight: 10 }} disabled={this.state.invalidInput} onClick={async () => {await this.saveSettings()}}>Save settings</Button>}
          </Box>

        </Box>
      </section>
    )
  }
}

export default SettingsPage
