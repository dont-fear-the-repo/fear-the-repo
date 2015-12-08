import React from 'react';
import { RaisedButton, TextField, Paper, SelectField, CircularProgress } from 'material-ui/lib';
import { resumeThemes } from 'styles/resumeThemes';
import { printStyles }  from 'styles/PrinterStyles'
import $ from 'jquery'
export default class ResumeSavePrint extends React.Component {

  handleLoad() {
    this.props.actions.serverIsSavingUpdate('loading');
    let wrappedForServer = Object.assign({}, this.props.resumeState);
    wrappedForServer.userID = this.props.userID;
    this.props.actions.getResumeFromServerDBAsync(wrappedForServer);
    console.log('clicked LOAD btn in ResumeSavePrint')

  }

  handleSubmit(e) {
    if (this.props.loggedIn) {
    this.props.actions.serverIsSavingUpdate('saving');
    let wrappedForServer = Object.assign({}, this.props.resumeState);
    wrappedForServer.userID = this.props.userID;
    this.props.actions.sendResumeToServerAsync(wrappedForServer);
    console.log('clicked SAVE btn in ResumeSavePrint')
    } else {
      alert('To save a resume, please signup above');
    }
  }

  handlePrint() {
    console.log(document.getElementById('resumeContainer'))
    const prtContent = document.getElementById('resumeContainer');
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML +  printStyles);
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

  handleExport() {
  const prtContent = { resume: document.getElementById('resumeContainer').innerHTML + printStyles };
  $.ajax({
      url: '/api/resume/export',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(prtContent),
      success: function(data) {
        var link=document.createElement('a');
        link.href= data.filename.slice(-25);
        link.download="My_resume.pdf";
        link.click();
      }
    })
}

  render() {
    const saveAnimation = <CircularProgress mode="indeterminate" color={"orange"} size={.3} />;
    const savedConfirm = 'Changes saved!'

    const themes = Object.keys(resumeThemes)
                    .map( (value, index) => ({
                      'index': index,
                      'text': value
                    }));

    return (
      <div style={this.props.styles.headerContainer}>

<h1>{this.props.resumeState.clientFormIsDirty ? savedConfirm : saveAnimation} </h1>



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

        <RaisedButton label='Export Resume'
                      style={this.props.styles.ExportButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handleExport(e)} />                      


      </div>
    );
  }
}
