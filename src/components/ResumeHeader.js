import React, { PropTypes } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';


export default class ResumeHeader extends React.Component {
  static propTypes = {
    // body: PropTypes.string
  }

  render() {
    const { currentTheme, resumeThemes } = this.props;

    return (
      <div>
        <div>

          <div style={resumeThemes[currentTheme].location}>
            <TextField ref='city'
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       style={resumeThemes[currentTheme].city}
                       hintText={this.props.resumeState.resumeHeader.city}
                       onBlur={e => this.props.handleUpdateLocalState(e, 'city', 'header')} />
            <TextField ref='state'
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       style={resumeThemes[currentTheme].state}
                       hintText='State'
                       defaultValue={this.props.resumeState.resumeHeader.state}
                       onBlur={e => this.props.handleUpdateLocalState(e, 'state', 'header')} />
          </div>

          <div style={resumeThemes[currentTheme].name}>
            <TextField ref='name'
                       underlineStyle={this.props.styles.underlineStyle}
                       underlineFocusStyle={this.props.styles.underlineFocusStyle}
                       hintText={this.props.resumeState.resumeHeader.name}
                       onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} />
          </div>

        </div>

        <div style={resumeThemes[currentTheme].profession}>
          <TextField ref='profession'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeHeader.profession}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />
        </div>

        <div style={resumeThemes[currentTheme].phone}>
          <TextField ref='phone'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeHeader.phone}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'phone', 'header')} />
        </div>

        <div style={resumeThemes[currentTheme].email}>
          <TextField ref='displayEmail'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeHeader.displayEmail}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'displayEmail', 'header')} />
        </div>

        <div style={resumeThemes[currentTheme].url}>
          <TextField ref='webLinkedin'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeHeader.webLinkedin}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />
        </div>

        <div style={resumeThemes[currentTheme].url}>
          <TextField ref='webOther'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeHeader.webOther}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />
        </div>

      </div>
    );
  }
}
