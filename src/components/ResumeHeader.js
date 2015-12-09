import React, { PropTypes } from 'react';
import _ from 'underscore';
import Editor from 'react-medium-editor';
import { exactLength,
         isDefined,
         isInteger,
         isValidEmail } from 'utils/validation';

export default class ResumeHeader extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    currentTheme: PropTypes.string,
    handleUpdateLocalState: PropTypes.func,
    resumeThemes: PropTypes.object,
    resumeState: PropTypes.object,
    validations: PropTypes.object
  }

  validateField(event, validatorsArray, key, whereFrom) {
    const value = event.target.textContent;
    const validEntry = _.every(validatorsArray,
                          validator => validator(value) );
    if (validEntry) {
      this.props.validations[key] = true;
      this.props.handleUpdateLocalState(event, key, whereFrom);
    } else {
      this.props.validations[key] = false;
      // this.props.currentErrorMessage = this.props.errorMessages[key];
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
    const { currentTheme, resumeThemes } = this.props;

    return (
      <div style={resumeThemes[currentTheme].headerDiv}>

        <div style={resumeThemes[currentTheme].headerLeft}>

            <Editor style={resumeThemes[currentTheme].name}
                  text={this.props.resumeState.resumeHeader.name}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} />


            <Editor style={resumeThemes[currentTheme].location}
                    text={this.props.resumeState.resumeHeader.city}
                    options={{toolbar: false}}
                    onBlur={e => this.validateField(e, [isDefined], 'city', 'header')} />

        <div>
          <Editor style={resumeThemes[currentTheme].phone}
                  options={{toolbar: false}}
                  text={this.props.resumeState.resumeHeader.phone}
                  onBlur={e => this.validateField(e, [isDefined], 'phone', 'header')} />


            <div style={resumeThemes[currentTheme].headerPipe}>
              |
            </div>

          <Editor style={resumeThemes[currentTheme].email}
                  options={{toolbar: false}}
                  text={this.props.resumeState.resumeHeader.displayEmail}
                  onBlur={e => this.validateField(e, [isDefined, isValidEmail], 'email', 'header')} />

        </div>
        </div>

        <div style={resumeThemes[currentTheme].headerRight}>
           <Editor style={resumeThemes[currentTheme].webLinkedin}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.webLinkedin}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />

            <Editor style={resumeThemes[currentTheme].webOther}
                    options={{toolbar: false}}
                    text={this.props.resumeState.resumeHeader.webOther}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />
        </div>
      </div>
    );
  }
}
