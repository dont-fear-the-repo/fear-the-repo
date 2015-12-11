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
import { printStyles } from  'styles/PrinterStyles';
import $ from 'jquery';
import _ from 'underscore';

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

  handleExport() {
    const prtContent = { resume: document.getElementById('resumeContainer').innerHTML + printStyles };
    $.ajax({
        url: '/linkedin',
        method: 'get',
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

  handlePrint() {
    const prtContent = document.getElementById('resumeContainer')
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML+ printStyles);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  handleChangeTheme(event) {
    const userInput = event.target.textContent// event.target.value;
    const textFieldName = 'resumeTheme'
    this.props.actions.updateLocalState({textFieldName, userInput});
  }

  handleThesaurus() {
    this.props.actions.getThesaurusResultsAsync(this.props.resumeState.thesaurusQuery);
    console.log("searching for: ", this.props.resumeState.thesaurusQuery)
  }

  // This will cause a resume to automatically call the server and load the logged-in user's resume.
  // Do no run unless we decied to put some logic in to deal with unlogged in users, or clientIsDirty=true
  // componentDidMount() {
  //   console.log("Loading resume data from server...")
  //   this.handleLoad();
  // }
  showPopup(url) {
    var linkedin_window = window.open('http://localhost:3000/linkedin','window','width=640,height=480,resizable,scrollbars,toolbar,menubar')
    var that = this;
    var myInterval = setInterval(function(){
      if(localStorage.getItem('sendLinkedinData')){
        linkedin_window.close();
        $.ajax({
        url: '/cookie',
        method: 'post',
        success: function(data) {
          that.props.actions.populateDataFromLinkedIn(data);
          localStorage.removeItem('sendLinkedinData')
        }
      })
        clearInterval(myInterval);
      }
    },500)
    //newwindow=window.open(url,'name','height=190,width=520,top=200,left=300,resizable');
  }


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
      { text: <RaisedButton label='Print Resume'
                        style={this.props.styles.saveButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        onItemTouchTap={(e) => this.handlePrint(e)} /> },
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

        <Paper style={{width:'150px', position: 'fixed', left: '0px', top: '96.5px', boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'}}>

          <RaisedButton label='Print Resume'
                        style={this.props.styles.paperLeftNavButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        onClick={e => this.handlePrint(e)} />

          <RaisedButton label='Save Resume'
                        style={this.props.styles.paperLeftNavButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        disabled={!this.props.canSubmitResume}
                        onClick={e => this.handleSubmit(e, this.props.serverIsSavingUpdate, this.props.sendResumeToServerAsync)} />

          <RaisedButton label='Export Resume'
                        style={this.props.styles.paperLeftNavButton}
                        labelStyle={this.props.styles.buttonLabelStyle}
                        onClick={e => this.handlePrint(e)} />
                        <br />
                        <br />
                        <br />
                        <br />
                        
          <RaisedButton label='LinkedIn Import' 
            labelStyle={this.props.styles.buttonLabelStyle}
            onClick={(e)=>this.showPopup(e)} />       


          { this.showLoadButtonIf(this.props.loggedIn, this.props.resumeId, this.props.resumeState.serverIsSaving) &&
            <div><RaisedButton label='Reload Resume'
                          style={this.props.styles.paperLeftNavButton}
                          labelStyle={this.props.styles.buttonLabelStyle}
                          onClick={e => this.handleLoad(e)} />
            </div>
          }

          <div style={{marginTop: '30px', marginBottom: '20px'}}>
            <div style={this.props.styles.paperLeftNavLabel}>
            Resume Themes
            </div>
            {themes.map(theme => {
                            return (
                              <FlatButton label={theme.text}
                                          key={theme.text}
                                          style={this.props.styles.paperLeftNavThemeButton}
                                          labelStyle={this.props.styles.buttonLabelStyle}
                                          onClick={e => this.handleChangeTheme(e)}/>
                            );

            })}
          </div>

          <div style={{marginTop: '30px', marginBottom: '20px'}}>
            <div style={this.props.styles.paperLeftNavLabel}>
            Thesaurus
            </div>
            <TextField floatingLabelStyle={this.props.styles.floatingLabelStyle}
                       style={{width: '150px'}}
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       backgroundColor={'white'}
                       fullWidth={false}
                       hintStyle={this.props.styles.hintStyle}
                       hintText='Find Synonyms'
                       onBlur={e => this.props.handleUpdateLocalState(e, 'thesaurusQuery', 'savePrint')} />
            <RaisedButton label='Search'
                                   labelStyle={this.props.styles.buttonLabelStyle}
                                   onClick={e => this.handleThesaurus(e)} />
            <div style={this.props.styles.thesaurusResults}>
            { _.map(this.props.resumeState.thesaurusResults, verbOrNoun => {
              return (<span>{verbOrNoun.syn.toString().split(',').join(', ') + ' '}</span>)
              }
              )}
            </div>
          </div>
        </Paper>

          {/*

Junk code: remove on Friday clean up. Used to store various tests and ideas.



            { _.map(this.props.resumeState.thesaurusResults, verbOrNoun => {
              _.map(verbOrNoun, relOrSyn =>
                relOrSyn.forEach(word =>
                  console.log(word)
                  )
                )
              }
              )}

















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
