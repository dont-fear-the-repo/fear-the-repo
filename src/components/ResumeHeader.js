import React, { PropTypes } from 'react';
import _ from 'underscore';
import Editor from 'react-medium-editor';
import { isDefined,
         isValidEmail } from 'utils/validation';


export default class ResumeHeader extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    currentTheme: PropTypes.string,
    handleUpdateLocalState: PropTypes.func,
    resumeThemes: PropTypes.object,
    resumeState: PropTypes.object,
    styles: PropTypes.object,
    validations: PropTypes.object
  }

  validateField(event, validatorsArray, key, whereFrom) {
    const value = event.target.textContent;
    const validEntry = _.every(validatorsArray,
                          validator => validator(value) );
    if (validEntry) {
      this.props.validations[key] = true;
      this.props.handleUpdateLocalState(event, key, whereFrom);
      this.props.actions.updateErrorMessage('');
    } else {
      this.props.validations[key] = false;
      this.props.actions.updateErrorMessage(key);
    }

    const shouldEnable = _.every(this.props.validations,
                            validation => validation === true );
    if (shouldEnable) {
      this.props.actions.enableSubmit('Resume');
    } else {
      this.props.actions.disableSubmit('Resume');
    }
  }

  render() {
    const { currentTheme,
            resumeThemes } = this.props;
    const { resumeHeader } = this.props.resumeState;

    return (
      <div style={resumeThemes[currentTheme].headerDiv}>


        <div style={resumeThemes[currentTheme].headerNameDiv}>
          <Editor style={resumeThemes[currentTheme].name}
                  text={resumeHeader.name || 'Your Full Name'}
                  options={{toolbar: false}}
                  onBlur={e => this.validateField(e, [isDefined], 'name', 'header')} />
        </div>


        <div style={resumeThemes[currentTheme].headerContactDiv}>
          <Editor style={resumeThemes[currentTheme].location}
                  text={resumeHeader.city || 'Your City, ST'}
                  options={{toolbar: false}}
                  onBlur={e => this.validateField(e, [isDefined], 'city', 'header')} />

          <Editor style={resumeThemes[currentTheme].phone}
                  text={resumeHeader.phone || 'Your Phone Number'}
                  options={{toolbar: false}}
                  onBlur={e => this.validateField(e, [isDefined], 'phone', 'header')} />

          <div style={resumeThemes[currentTheme].headerPipe}>|</div>

          <Editor style={resumeThemes[currentTheme].email}
                  text={resumeHeader.displayEmail || 'Your Email Address'}
                  options={{toolbar: false}}
                  onBlur={e => this.validateField(e, [isDefined, isValidEmail], 'email', 'header')} />
        </div>


        <div style={resumeThemes[currentTheme].headerLinksDiv}>
          <Editor style={resumeThemes[currentTheme].webLinkedin}
                  text={resumeHeader.webLinkedin || 'LinkedIn.com/in/YourLinkedIn'}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />

          <Editor style={resumeThemes[currentTheme].webOther}
                  text={resumeHeader.webOther || 'Other web links (Github, Behance, etc)'}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />
        </div>


        <div style={resumeThemes[currentTheme].headerDividerLine}></div>

      {/* END OF HEADER DIV */}
      </div>
    );
  }
}
