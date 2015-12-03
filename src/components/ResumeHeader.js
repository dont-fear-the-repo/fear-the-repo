import React, {PropTypes} from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';

export default class ResumeHeader extends React.Component {
  static propTypes = {
    // body: PropTypes.string
  }

  render() {

    return (
      <div>
        <div style={this.props.styles.name}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='name'
                     hintText={this.props.resumeState.resumeHeader.name}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} />
        </div>
        <div style={this.props.styles.plain}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='profession'
                     hintText={this.props.resumeState.resumeHeader.profession}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />
        </div>
        <div style={this.props.styles.email}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='displayEmail'
                     hintText={this.props.resumeState.resumeHeader.displayEmail}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'displayEmail', 'header')} />
        </div>
        <div style={this.props.styles.phone}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='phone'
                     hintText={this.props.resumeState.resumeHeader.phone}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'phone', 'header')} />
        </div>
        <div style={this.props.styles.city}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='city'
                     hintText={this.props.resumeState.resumeHeader.city}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'city', 'header')} />
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='state'
                     hintText={this.props.resumeState.resumeHeader.state}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'state', 'header')} />
        </div>
        <div style={this.props.styles.url}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='webLinkedin'
                     hintText={this.props.resumeState.resumeHeader.webLinkedin}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />
        </div>
        <div style={this.props.styles.url}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='webOther'
                     hintText={this.props.resumeState.resumeHeader.webOther}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />
        </div>
      </div>
    );
  }
}
