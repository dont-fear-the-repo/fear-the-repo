import React, { PropTypes } from 'react';
import $ from 'jquery';
import _ from 'underscore';

import { FlatButton,
         Paper,
         SelectField,
         TextField } from 'material-ui/lib';
import { resumeThemes } from 'styles/resumeThemes';
import { printStyles } from  'styles/PrinterStyles';
// import { MasterTheme } from 'styles/MasterTheme';


export default class ResumeSavePrint extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    canSubmitResume: PropTypes.bool,
    handleUpdateLocalState: PropTypes.func,
    loggedIn: PropTypes.bool,
    resumeId: PropTypes.number,
    resumeState: PropTypes.object,
    sendResumeToServerAsync: PropTypes.func,
    serverIsSavingUpdate: PropTypes.func,
    styles: PropTypes.object,
    validations: PropTypes.object,
    userID: PropTypes.string
  }

  handleLoad() {
    if (this.props.loggedIn) {
      this.props.actions.serverIsSavingUpdate('loading');
      const wrappedForServer = { ...this.props.resumeState };
      wrappedForServer.userID = this.props.userID;
      this.props.actions.getResumeFromServerDBAsync(wrappedForServer);

      _.map(this.props.validations, (validation, key) => this.props.validations[key] = true);
      this.props.actions.enableSubmit('Resume');
    } else {
      alert('To load a resume, please signup above');
    }
  }

  handleSubmit() {
    if (this.props.loggedIn) {
      this.props.actions.serverIsSavingUpdate('saving');
      const wrappedForServer = { ...this.props.resumeState };
      wrappedForServer.userID = this.props.userID;
      this.props.actions.sendResumeToServerAsync(wrappedForServer);
    } else {
      alert('To save a resume, please signup above');
    }
  }

  handleExport() {
    const prtContent = { resume: document.getElementById('resumeContainer').innerHTML + printStyles };
    $.ajax({
        url: '/api/resume/export',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify(prtContent),
        success: data => {
          const link = document.createElement('a');
          link.href = data.filename.slice(-25);
          link.download = 'My_resume.pdf';
          link.click();
        }
    });
  }

  handlePrint() {
    const prtContent = document.getElementById('resumeContainer');
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML + printStyles);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  handleChangeTheme(event) {
    const userInput = event.target.textContent;  // event.target.value;
    const textFieldName = 'resumeTheme';
    this.props.actions.updateLocalState({textFieldName, userInput});
  }

  handleThesaurus() {
    const target = this.props.resumeState.thesaurusQuery;
    this.props.actions.wordSearch(target);
    this.props.actions.getThesaurusResultsAsync(target);
  }

  // This will cause a resume to automatically call the server and load the logged-in user's resume.
  // Do no run unless we decied to put some logic in to deal with unlogged in users, or clientIsDirty=true
  // componentDidMount() {
  //   console.log("Loading resume data from server...")
  //   this.handleLoad();
  // }
  showPopup() {
    const linkedInWindow = window.open('http://' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port + '/linkedin', 'window', 'width=640,height=480,resizable,scrollbars,toolbar,menubar');
    const that = this;
    const myInterval = setInterval(() => {
      if (localStorage.getItem('sendLinkedinData')) {
        linkedInWindow.close();
        $.ajax({
          url: '/cookie',
          method: 'post',
          success: data => {
            that.props.actions.populateDataFromLinkedIn(data);
            localStorage.removeItem('sendLinkedinData');
          }
        });
        clearInterval(myInterval);
      }
    }, 500);
  }


  showLoadButtonIf(loggedIn, resumeId, serverIsSaving) {
    let results = false;
    if ( loggedIn && resumeId !== 'NA' ) {
      results = true;
    } else if ( serverIsSaving === 'successful save!' ) {
      results = true;
    }
    return results;
  }

  render() {
    const { resumeState,
            styles } = this.props;

    // const saveAnimation = <CircularProgress mode='indeterminate' color={MasterTheme.orange} size={0.3} />;
    // const savedConfirm = 'Changes saved!';
    const themes = Object.keys(resumeThemes)
                         .map( (value, index) => ({
                            'index': index,
                            'text': value
                         }));

    return (
    <div>

      <div style={styles.headerContainer}>

        <Paper style={styles.leftNav}>

          <FlatButton label='Save Resume'
                      style={styles.paperLeftNavButton}
                      labelStyle={styles.buttonLabelStyle}
                      disabled={!this.props.canSubmitResume}
                      onClick={e => this.handleSubmit(e, this.props.serverIsSavingUpdate, this.props.sendResumeToServerAsync)} />

          <FlatButton label='Print Resume'
                      style={styles.paperLeftNavButton}
                      labelStyle={styles.buttonLabelStyle}
                      onClick={e => this.handlePrint(e)} />

          <FlatButton label='Export to PDF'
                      style={styles.paperLeftNavButton}
                      labelStyle={styles.buttonLabelStyle}
                      onClick={e => this.handleExport(e)} />

          <FlatButton label='LinkedIn Import'
                      style={styles.paperLeftNavButton}
                      labelStyle={styles.buttonLabelStyle}
                      onClick={(e)=>this.showPopup(e)} />

          { this.showLoadButtonIf(this.props.loggedIn, this.props.resumeId, this.props.resumeState.serverIsSaving) &&
            <div><FlatButton label='Load Resume'
                          style={styles.paperLeftNavButton}
                          labelStyle={styles.buttonLabelStyle}
                          onClick={e => this.handleLoad(e)} />
            </div>
          }

          <div style={styles.paperLeftDiv}>
            <SelectField floatingLabelText='Select a Theme'
                         style={styles.themeSelectDropdown}
                         floatingLabelStyle={styles.floatingLabelStyle}
                         underlineStyle={styles.underlineStyle}
                         underlineFocusStyle={styles.underlineFocusStyle}
                         menuItems={themes}
                         menuItemStyle={styles.menuItemStyle}
                         value={resumeState.resumeTheme}
                         valueMember='text'
                         fullWidth={false}
                         onChange={(e, index) => this.handleChangeTheme(e, index)} />
          </div>

          <div style={styles.paperLeftDiv}>
            <div style={styles.thesaurus}>
              <TextField floatingLabelText='Thesaurus'
                         floatingLabelStyle={styles.floatingLabelStyle}
                         style={styles.thesaurusSearchBox}
                         underlineStyle={styles.underlineStyle}
                         underlineFocusStyle={styles.underlineFocusStyle}
                         backgroundColor={'white'}
                         fullWidth={false}
                         hintStyle={styles.hintStyle}
                         hintText='Find Synonyms'
                         onBlur={e => this.props.handleUpdateLocalState(e, 'thesaurusQuery', 'savePrint')} />
              <FlatButton label='Search'
                          style={styles.thesaurusSearchButton}
                          labelStyle={styles.buttonLabelStyle}
                          onClick={e => this.handleThesaurus(e)} />

              {resumeState.thesaurusResults ?
              <div style={styles.thesaurusResults}>

                <div style={styles.wordCount}>
                  You've used this word {resumeState.wordCount} times so far.
                </div>

                <div>

                  <span style={styles.suggestions}>Suggestions:</span>
                  { _.map(resumeState.thesaurusResults, (type, index) => {
                        return (<div key={index} style={styles.wordList}>
                          <span style={styles.wordType}>{index}</span>: {type}</div>);
                    }) }

                </div>

              </div>
              : '' }
            </div>

          </div>
        </Paper>

      </div>
    </div>
    );
  }
}
