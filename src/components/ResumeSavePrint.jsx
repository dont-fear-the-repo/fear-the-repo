import React from 'react';
import { RaisedButton, TextField, Paper, SelectField } from 'material-ui/lib';
import { resumeThemes } from 'styles/resumeThemes';


export default class ResumeSavePrint extends React.Component {

  handleSubmit() {
    if (this.props.loggedIn) {
      this.props.actions.sendResumeToServerAsync(this.props.resumeState);
    } else {
      alert('To save a resume, please signup above');
    }
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

  render() {
    const themes = Object.keys(resumeThemes)
                    .map( (value, index) => ({
                      'index': index,
                      'text': value
                    }));

    return (
      <div style={this.props.styles.headerContainer}>

        <Paper>
          {JSON.stringify(this.props.handleUpdateLocalState)}
        </Paper>

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

        <RaisedButton label='Print'
                      style={this.props.styles.printButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handlePrint(e)} />

        <RaisedButton label='Save'
                      style={this.props.styles.saveButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handleSubmit(e)} />

      </div>
    );
  }
}
