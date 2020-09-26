import { H4, Header, Label, Box, Input, CheckBox, Button, Loader, MessageBox, DropZone, DropZoneItem } from 'admin-bro'
import React from 'react'
import axios from "axios"
import Quill from 'quill';

import _ from "lodash"
import { text } from 'body-parser';

type settingsState = {
  imageFields: any,
  textFields: any,
  checkboxFields: any,
  settingsId: any,

  isLoading: boolean,
  isLoadingMessage: string,

  invalidInput: boolean,

  responseMessage: any,

  quillEditors: any,
  quillEditorContainers: any,

  filesToUpload: any,
}


export class SettingsPage extends React.Component<{}, settingsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      imageFields: null,
      textFields: null,
      checkboxFields: null,
      settingsId: null,

      filesToUpload: [],

      quillEditors: null,
      quillEditorContainers: [],

      isLoading: true,
      isLoadingMessage: "mounting",
      responseMessage: null,

      invalidInput: false,

    }
  }

  async getSettings() {
    await axios.get("/api/settings")
      .then(response => {
        this.setState({
          imageFields: response.data.imageFields,
          textFields: response.data.textFields,
          checkboxFields: response.data.checkboxFields,
          settingsId: response.data._id,
          isLoading: false
        })
        console.log("got settings:", this.state)
      }).catch(err => {
        console.error(err)
      })
  }

  async resetSettings() {
    if (window.confirm("This will reset all settings to default. Are you sure?")) {
      this.setState({
        isLoading: true,
        isLoadingMessage: "Resetting settings...",
        responseMessage: null,
      })

      await axios.delete("/api/settings")
        .then(response => {
          this.setState({
            imageFields: response.data.imageFields,
            textFields: response.data.textFields,
            checkboxFields: response.data.checkboxFields,
            settingsId: response.data._id,
            responseMessage: {
              content: "Settings have been reset to default.",
              type: "success",
            },
            isLoading: false
          })
          console.log("reset settings:", response.data)
        }).catch(err => {
          console.error(err)
          this.setState({
            responseMessage: {
              content: "Settings could not be reset... Check console for details.",
              type: "error",
            },
            isLoading: false
          })
        })
    }
  }

  async saveSettings() {
    this.setState({
      isLoading: true,
      isLoadingMessage: "Saving settings...",
      responseMessage: null
    })

    let formData = new FormData();

    // TODO for loop imageFields -> image.file
    // formData.append("logoFile", this.state.logoFile)
    // formData.append("headerFile", this.state.headerFile)
    // formData.append("faviconFile", this.state.faviconFile)
    formData.append("imageFields", JSON.stringify(this.state.imageFields))
    formData.append("textFields", JSON.stringify(this.state.textFields))
    formData.append("checkboxFields", JSON.stringify(this.state.checkboxFields))
    formData.append("settingsId", this.state.settingsId)

    await axios.post("/api/settings", formData, { headers: { "Content-Type": "multipart/form-data"}})
      .then((response) => {
        this.setState({
          isLoading: false,
          responseMessage: {
            content: "Successfully saved settings!",
            type: "success",
          },
          imageFields: response.data.imageFields,
          textFields: response.data.textFields,
          checkboxFields: response.data.checkboxFields,
          settingsId: response.data._id,
        })
      }).catch(err => {
        this.setState({
          isLoading: false,
          responseMessage: {
            content: "Could not save settings... See console for details.",
            type: "error",
          },
        })
        console.error(err)
      })
  }

  buildQuillEditors() {
    let quillEditors: any = {}
    let quillEditorContainers: any = {}

    // Get keys of text area fields and
    const textAreaFieldKeys = Object.keys(this.state.textFields).filter((key) => {
      if (this.state.textFields[key].fieldType === "textarea") {
        // Create reference to container for textarea
        quillEditorContainers[key] = React.createRef()
        return true
      }
    })

    this.setState({ quillEditorContainers })

    // Build Quill editors
    for (const textFieldKey of textAreaFieldKeys) {
      let editor = new Quill(this.state.quillEditorContainers[textFieldKey].current, { theme: 'snow' })

      editor.clipboard.dangerouslyPasteHTML(0, this.state.textFields[textFieldKey].value)
      editor.on('text-change', (e: any) => {
        this.handleSettingsChange("textFields", textFieldKey, editor.root.innerHTML)
      })

      quillEditors[textFieldKey] = editor
    }

    this.setState({ quillEditors })
  }

  async componentDidMount() {
    await this.getSettings()
    this.buildQuillEditors()
  }

  componentWillUnmount() {
    for (const editor of this.state.quillEditors) {
      editor.off('selection-change', () => {})
    }
  }

  isValidEmail (email: string) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  handleSettingsChange (fieldType: string, key: string, value: any, isFile: boolean = false) {

    if (isFile) {
      this.state.filesToUpload[`${fieldType}__${key}`] = value
      this.setState({
        filesToUpload: this.state.filesToUpload
      })
    } else {
      switch (fieldType) {
        case "textFields":
          this.state.textFields[key].value = value
          this.setState({
            textFields: this.state.textFields
          })
          break
        case "checkboxFields":
          this.state.checkboxFields[key].value = value
          this.setState({
            checkboxFields: this.state.checkboxFields
          })
      }
    }

    console.log(this.state)
  }

  renderImageFields () {
    let imageFields = []

    for (const imageFieldKey of Object.keys(this.state.imageFields)) {
      const image = this.state.imageFields[imageFieldKey]
      const label = <Label required={true}>{image.description}</Label>
      const dropZone = <DropZone
        multiple={false}
        validate={{ mimeTypes: image.mimeTypes }}
        uploadLimitIn={'MB'}
        onChange={(files) => { this.handleSettingsChange("imageFields", imageFieldKey, files[0], true) }}
      />

      switch (image.previewType) {
        case "banner":
          imageFields.push(
            <section key={imageFieldKey}>
              { label }
              <img
                src={image.url}
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
              <section style={{ marginTop: -3 }}>
                { dropZone }
              </section>
            </section>
          )
          break
        case "small":
          imageFields.push(
            <Box style={{ marginTop: 20, marginBottom: 20 }} key={imageFieldKey}>
              { label }
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
                  <img
                    src={image.url}
                    style={{ width: 48, height: 48, backgroundSize: 'cover' }}
                  />
                </div>
                <div style={{ width: '94%' }}>
                  { dropZone }
                </div>
              </div>
            </Box>
          )
        break
      }
    }
    return imageFields
  }

  renderTextFields() {
    let textFields = []

    for (const textFieldKey of Object.keys(this.state.textFields)) {
      const textField = this.state.textFields[textFieldKey]

      let inputComponent = null

      switch (textField.fieldType) {

        case "textarea":
          inputComponent = <div ref={this.state.quillEditorContainers[textFieldKey]}></div>
          break

        default:
          inputComponent = <Input
            required={true}
            style={{ width: '100%' }}
            value={textField.value}
            onChange={(event: any) => { this.handleSettingsChange("textFields", textFieldKey, event.target.value) }}
          />
      }

      textFields.push(
        <Box style={{ marginTop: 10, marginBottom: 20 }} key={textFieldKey}>
          <Label required={true}>{textField.description}:</Label>
          {inputComponent}
        </Box>
      )
    }

    return textFields
  }

  renderCheckboxFields() {
    let checkboxFields = []

    for (const checkboxFieldKey of Object.keys(this.state.checkboxFields)) {
      const checkBoxField = this.state.checkboxFields[checkboxFieldKey]

      checkboxFields.push(
        <Box style={{ marginTop: 10, marginBottom: 20, display: "flex", flexDirection: "row" }} key={checkboxFieldKey}>
          <CheckBox
            required={true}
            checked={checkBoxField.value}
            onChange={() => { this.handleSettingsChange("checkboxFields", checkboxFieldKey, !checkBoxField.value) }}
          />
          <Label required={true}>{checkBoxField.description}</Label>
        </Box>
      )
    }

    return checkboxFields
  }

  render() {
    if (this.state.isLoading) return <Loader/>
    return (
      <section>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>

        { this.state.responseMessage &&
          <MessageBox
            variant={this.state.responseMessage.type}
            message={this.state.responseMessage.content}
            onCloseClick={() => this.setState({ responseMessage: null})}
          />
        }

        <Box style={{margin: 24, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Header>Settings Panel</Header>
          <Button variant="danger" onClick={async () => { await this.resetSettings() }}>Reset</Button>
        </Box>

        <Box style={{margin: 24, padding: 16, background: '#fff' }}>

          {this.state.imageFields && (
            <section>
              <H4 style={{ marginTop: 40, marginBottom: 20 }}>Image Settings</H4>
              {this.renderImageFields()}
            </section>
          )}

          {this.state.textFields && (
          <section>
            <H4 style={{ marginTop: 40, marginBottom: 20 }}>Editable Settings</H4>
            { this.renderTextFields() }
            <div id="editor"></div>
          </section>
          )}

          {this.state.checkboxFields && (
            <section>
              <H4 style={{ marginTop: 40, marginBottom: 20 }}>Toggleable Settings</H4>
              { this.renderCheckboxFields() }
              <div id="editor"></div>
            </section>
          )}

          <Box style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            {this.state.isLoading && <Button variant="success" style={{ marginRight: 10 }}>{this.state.isLoadingMessage}</Button>}
            {!this.state.isLoading && <Button variant="primary" style={{ marginRight: 10 }} disabled={this.state.invalidInput} onClick={async () => {await this.saveSettings()}}>Save settings</Button>}
          </Box>

        </Box>
      </section>
    )
  }
}

export default SettingsPage
