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
                     hintText='Full Name'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'name', true)} />
          </div>
          <div style={this.props.styles.plain}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='profession'
                     hintText='Profession'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'profession', true)} />
          </div>
          <div style={this.props.styles.email}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='displayEmail'
                     hintText='Email'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'displayEmail', true)} />
          </div>
          <div style={this.props.styles.phone}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='phone'
                     hintText='(123) 456-7899'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'phone', true)} />
          </div>
          <div style={this.props.styles.city}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='city'
                     hintText='City'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'city', true)} />
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='state'
                     hintText='State'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'state', true)} />
          </div>
          <div style={this.props.styles.url}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='webLinkedin'
                     hintText='Linkedin'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', true)} />
          </div>
          <div style={this.props.styles.url}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='webOther'
                     hintText='Homepage'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', true)} />
          </div>
      </div>
    );
  }
}
