import React, { PropTypes } from 'react';
import _ from 'underscore';

import Editor from 'react-medium-editor';

import { exactLength,
         isDefined,
         isValidEmail } from 'utils/validation';


export default class ResumeHeader extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    currentErrorMessage: PropTypes.string,
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
    const { currentErrorMessage,
            currentTheme,
            resumeThemes } = this.props;
    const { resumeHeader } = this.props.resumeState;

    return (
      <div>

        {currentErrorMessage ?
          <div style={this.props.styles.errorMessageStyle}>
            {currentErrorMessage}
          </div> : ''}

        <div>

          <div style={resumeThemes[currentTheme].location}>

            <Editor style={resumeThemes[currentTheme].city}
                    text={resumeHeader.city || 'Your City'}
                    options={{toolbar: false}}
                    onBlur={e => this.validateField(e, [isDefined], 'city', 'header')} />

            <Editor style={resumeThemes[currentTheme].state}
                    text={resumeHeader.state || 'Your State Code'}
                    options={{toolbar: false}}
                    onBlur={e => this.validateField(e, [isDefined, exactLength(2)], 'state', 'header')} />

          </div>

          <Editor style={resumeThemes[currentTheme].name}
                  text={resumeHeader.name || 'Your Full Name'}
                  options={{toolbar: false}}
                  onBlur={e => this.validateField(e, [isDefined], 'name', 'header')} />

        </div>

        <Editor style={resumeThemes[currentTheme].profession}
                text={resumeHeader.profession || 'Your Profession or Job Title'}
                options={{toolbar: false}}
                onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />

        <Editor style={resumeThemes[currentTheme].email}
                text={resumeHeader.displayEmail || 'Your Email Address'}
                options={{toolbar: false}}
                onBlur={e => this.validateField(e, [isDefined, isValidEmail], 'email', 'header')} />


        <Editor style={resumeThemes[currentTheme].phone}
                text={resumeHeader.phone || 'Your Phone Number'}
                options={{toolbar: false}}
                onBlur={e => this.validateField(e, [isDefined], 'phone', 'header')} />


        <Editor style={resumeThemes[currentTheme].url}
                text={resumeHeader.webLinkedin || 'LinkedIn.com/in/...'}
                options={{toolbar: false}}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />


        <Editor style={resumeThemes[currentTheme].url}
                text={resumeHeader.webOther || 'Other web links (Github, Behance, etc)'}
                options={{toolbar: false}}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />

      </div>
    );
  }
}
