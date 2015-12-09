import React from 'react';
import { RaisedButton,
         Paper,
         FlatButton,
         Popover,
         TextField,
         RefreshIndicator,
         LeftNav,
         AppBar,
         IconButton,
         IconMenu,
         MoreVertIcon,
         MenuItem,
         SelectField,
         CircularProgress } from 'material-ui/lib';
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

  showLoadButtonIf(loggedIn, resumeId, serverIsSaving){
    let results = false;
    if ( loggedIn && resumeId !== 'NA' ){
      results = true;
    } else if ( serverIsSaving === 'successful save!' ){
      results = true;
    }
    return results;
  }

  render() {

    const saveAnimation = <CircularProgress mode="indeterminate" color={"orange"} size={.3} />;
    const savedConfirm = 'Changes saved!'
    const menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Themes' },
      {
         type: MenuItem.Types.LINK,
         payload: 'https://github.com/callemall/material-ui',
         text: 'GitHub'
      },
      {
         text: 'Save',
         disabled: true
      }
    ];
    const themes = Object.keys(resumeThemes)
                         .map( (value, index) => ({
                            'index': index,
                            'text': value
                         }));

    return (
    <div>
    <LeftNav  ref="leftNav"
              docked={false}
              menuItems={menuItems}
              style={{paddingTop: '58px', width: '150px'}}/>


      <div style={this.props.styles.headerContainer}>

        <Paper style={{width:'150px', position: 'absolute', left: '0px', top: '65px', boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}}>

          <SelectField floatingLabelText='Theme'
                       style={{width: '150px'}}
                       floatingLabelStyle={this.props.styles.floatingLabelStyle}
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       menuItems={themes}
                       menuItemStyle={this.props.styles.menuItemStyle}
                       value={this.props.resumeState.resumeTheme}
                       valueMember='text'
                       fullWidth={false}
                       onChange={(e, index) => this.handleChangeTheme(e, index)} />
                       <br />
                       <br />
                       <br />
                       <br />



          <RaisedButton label='Save Resume'
                        style={this.props.styles.saveButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        disabled={!this.props.canSubmitResume}
                        onClick={e => this.handleSubmit(e, this.props.serverIsSavingUpdate, this.props.sendResumeToServerAsync)} />
                        <br />
                        <br />
                        <br />
                        <br />

          <RaisedButton label='Print Resume'
                        style={this.props.styles.printButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        onClick={e => this.handlePrint(e)} />
                        <br />
                        <br />
                        <br />
                        <br />

          { this.showLoadButtonIf(this.props.loggedIn, this.props.resumeId, this.props.resumeState.serverIsSaving) &&
            <div><RaisedButton label='Reload Resume'
                          style={this.props.styles.saveButton}
                          labelStyle={this.props.styles.buttonLabelStyle}
                          onClick={e => this.handleLoad(e)} />
                          <br />
                          <br />
                          <br />
                          <br />
            </div>
          }

        </Paper>

          {/*

        <h4> userID: {JSON.stringify(this.props.userID)} {this.userID} </h4>
        <h4> serverIsSaving: {JSON.stringify(this.props.resumeState.serverIsSaving)} </h4>
        <h4> resumeId: {JSON.stringify(this.props.resumeId)} </h4>

            <TextField floatingLabelText='ResumeName'
                       floatingLabelStyle={this.props.styles.floatingLabelStyle}
                       style={this.props.styles.resumeTitle}
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       backgroundColor={'white'}
                       fullWidth={false}
                       hintStyle={this.props.styles.hintStyle}
                       hintText={this.props.resumeState.resumeTitle}
                       onBlur={e => this.props.handleUpdateLocalState(e, 'resumeTitle', 'savePrint')} />
                       <br />
                       <br />
                       <br />
                       <br />

        <h1>{this.props.resumeState.clientFormIsDirty ? savedConfirm : saveAnimation} </h1>
        <h4>ClientIsDirty: {JSON.stringify(this.props.resumeState.clientFormIsDirty)}</h4>
        <h4>Server is saving: {this.props.resumeState.serverIsSaving}</h4>
        <h4> userID: {JSON.stringify(this.props.userID)} {this.userID} </h4>
        {this.props.resumeId &&
         <h4> you have a resume! </h4>
        }
         <h4> resumeId: {JSON.stringify(this.props.resumeId)}  </h4>
         <h4> userID: {JSON.stringify(this.props.userID)}  </h4>
          */}


      </div>
    </div>
    );
  }
}
