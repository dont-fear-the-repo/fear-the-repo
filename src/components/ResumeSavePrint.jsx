import React from 'react';
import { RaisedButton, TextField, Paper, SelectField, CircularProgress, LeftNav, Dialog } from 'material-ui/lib';
import { resumeThemes } from 'styles/resumeThemes';

export default class ResumeSavePrint extends React.Component {

  handleLoad() {
    if (this.props.loggedIn) {
      this.props.actions.serverIsSavingUpdate('loading');
      let wrappedForServer = Object.assign({}, this.props.resumeState);
      wrappedForServer.userID = this.props.userID;
      this.props.actions.getResumeFromServerDBAsync(wrappedForServer);
      console.log('clicked LOAD btn in ResumeSavePrint')
    } else {
      alert('To load a resume, please signup above');
    }
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

  // const menuItems = [
  //   { route: 'get-started', text: 'Get Started' },
  //   { route: 'customization', text: 'Customization' },
  //   { route: 'components', text: 'Components' },
  //   { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  //   {
  //      type: MenuItem.Types.LINK,
  //      payload: 'https://github.com/callemall/material-ui',
  //      text: 'GitHub'
  //   },
  //   {
  //      text: 'Disabled',
  //      disabled: true
  //   },
  //   {
  //      type: MenuItem.Types.LINK,
  //      payload: 'https://www.google.com',
  //      text: 'Disabled Link',
  //      disabled: true
  //   },
  // ];

  // //Toggle the LeftNav
  // this needs to be restyled to not cover the header and footer
  // this.refs.leftNav.toggle();

  // this relies on a state flag (open=....) to be hidden or show.
  // //Standard Actions
  // let standardActions = [
  //   { text: 'Cancel' },
  //   { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
  // // // ];
  //       <Dialog
  //         title="Dialog With Standard Actions"
  //         actions={[{ text: 'Cancel' }]}
  //         actionFocus="submit"
  //         open={this.props.opendialogforyouneedtologin}
  //         onRequestClose={this._handleRequestClose}>
  //         The actions in this window are created from the json thats passed in.
  //       </Dialog>

  render() {

    // <LeftNav ref="leftNav" docked={true} menuItems={[{ route: 'get-started', text: 'Get Started' }] style={{top: '60px'}} />
    // <LeftNav ref="leftNav" docked={true} menuItems={menuItems} />
    const saveAnimation = <CircularProgress mode="indeterminate" color={"orange"} size={.3} />;
    const savedConfirm = 'Changes saved!'

    const themes = Object.keys(resumeThemes)
                         .map( (value, index) => ({
                            'index': index,
                            'text': value
                         }));

    return (
      <div style={this.props.styles.headerContainer}>

        <Paper style={{float:'left'}}>




        <RaisedButton label='Save Resume'
                      style={this.props.styles.saveButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      disabled={!this.props.canSubmitResume}
                      onClick={e => this.handleSubmit(e, this.props.serverIsSavingUpdate, this.props.sendResumeToServerAsync)} />

        <RaisedButton label='Print Resume'
                      style={this.props.styles.printButton}
                      labelStyle={this.props.styles.buttonLabelStyle}
                      onClick={e => this.handlePrint(e)} />

          <RaisedButton label='Reload Resume'
                        style={this.props.styles.saveButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        onClick={e => this.handleLoad(e)} />
                        <br />
                        <br />
                        <br />
                        <br />


          <SelectField floatingLabelText='Theme'
                       style={this.props.styles.themeSelectDropdown}
                       floatingLabelStyle={this.props.styles.floatingLabelStyle}
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       menuItems={themes}
                       menuItemStyle={this.props.styles.menuItemStyle}
                       value={this.props.resumeState.resumeTheme}
                       valueMember='text'
                       onChange={(e, index) => this.handleChangeTheme(e, index)} />
                       <br />
                       <br />
                       <br />
                       <br />
          <TextField floatingLabelText='Version'
                     floatingLabelStyle={this.props.styles.floatingLabelStyle}
                     style={this.props.styles.resumeTitle}
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintStyle={this.props.styles.hintStyle}
                     hintText={this.props.resumeState.resumeTitle}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'resumeTitle', 'savePrint')} />
        </Paper>

          {/*

        <h1>{this.props.resumeState.clientFormIsDirty ? savedConfirm : saveAnimation} </h1>
        <h4>ClientIsDirty: {JSON.stringify(this.props.resumeState.clientFormIsDirty)}</h4>
        <h4>Server is saving: {this.props.resumeState.serverIsSaving}</h4>
        <h4> userID: {JSON.stringify(this.props.userID)} {this.userID} </h4>
          */}


      </div>

    );
  }
}
