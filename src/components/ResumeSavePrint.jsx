import React from 'react';
import { RaisedButton, TextField, Paper, SelectField } from 'material-ui/lib';
import { resumeThemes } from 'styles/resumeThemes';

export default class ResumeSavePrint extends React.Component {

  handleLoad() {
    let wrappedForServer = Object.assign({}, this.props.resumeState);
    this.props.actions.serverIsSavingUpdate('loading');
    wrappedForServer.userID = this.props.userID;
    this.props.actions.getResumeFromServerDBAsync(wrappedForServer);
    console.log('clicked LOAD btn in ResumeSavePrint')

  }

  handleSubmit(e) {
    // if (this.props.loggedIn) {
    this.props.actions.serverIsSavingUpdate('saving');
    this.props.actions.sendResumeToServerAsync(this.props.resumeState);
    console.log('clicked SAVE btn in ResumeSavePrint')
    // } else {
    //   alert('To save a resume, please signup above');
    // }
  }

  handlePrint() {
    const prtContent = document.getElementById('resumeContainer');
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML + '<style>div {  border-radius: 0px !important; box-shadow: none !important; }</style>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  handleChangeTheme(event, index) {
    const userInput = event.target.value;
    const textFieldName = 'resumeTheme';
    this.props.actions.updateLocalState({textFieldName, userInput});
  }

  // This will cause a resume to automatically call the server and load the logged-in user's resume.
  // Do no run unless we decied to put some logic in to deal with unlogged in users, or clientIsDirty=true
  // componentDidMount() {
  //   console.log("Loading resume data from server...")
  //   this.handleLoad();
  // }


  render() {
    const themes = Object.keys(resumeThemes)
                    .map( (value, index) => ({
                      'index': index,
                      'text': value
                    }));
// the mystery text is not coming from the returned JSX of ResumeSavePrint
// but if you comment out all of the component ResumeSavePrint, then it does go away...
    return (
      <div style={this.props.styles.headerContainer}>
      <h4>ClientIsDirty: {JSON.stringify(this.props.resumeState.clientFormIsDirty)}</h4>

      <h4>Server is saving: {this.props.resumeState.serverIsSaving}</h4>
      <h4> userID: {JSON.stringify(this.props.userID)} {this.userID} </h4>
        <RaisedButton label='Reload Last Saved Resume'
                      style={this.props.styles.saveButton}
                      onClick={e => this.handleLoad(e)} />

        <SelectField floatingLabelText='Select a theme'
                     style={this.props.styles.themeSelectDropdown}
                     floatingLabelStyle={this.props.styles.floatingLabelStyle}
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     menuItems={themes}
                     menuItemStyle={this.props.styles.menuItemStyle}
                     value={this.props.resumeState.resumeTheme}
                     valueMember='text'
                     onChange={(e, index) => this.handleChangeTheme(e, index)} />

        <TextField floatingLabelText='Resume Version Name'
                   floatingLabelStyle={this.props.styles.floatingLabelStyle}
                   style={this.props.styles.resumeTitle}
                   underlineStyle={this.props.styles.underlineStyle}
                   underlineFocusStyle={this.props.styles.underlineFocusStyle}
                   hintStyle={this.props.styles.hintStyle}
                   hintText={this.props.resumeState.resumeTitle}
                   onBlur={e => this.props.handleUpdateLocalState(e, 'resumeTitle', 'savePrint')} />

        <RaisedButton label='Save Resume'
                      style={this.props.styles.saveButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handleSubmit(e, this.props.serverIsSavingUpdate, this.props.sendResumeToServerAsync)} />

        <RaisedButton label='Print Resume'
                      style={this.props.styles.printButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handlePrint(e)} />

      </div>
    );
  }
}