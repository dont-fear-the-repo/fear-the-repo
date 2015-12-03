import React from 'react';
import { RaisedButton, TextField, Paper, SelectField } from 'material-ui/lib';


export default class ResumeSavePrint extends React.Component {
  render() {
    return (
      <div>
        <TextField className='resumeTitle'
                     style={this.props.styles.resumeTitle}
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintStyle={this.props.styles.hintStyle}
                     hintText={this.props.resumeState.resumeTitle}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'resumeTitle', 'savePrint')} />

          <RaisedButton label='Save Resume'
                        onClick={e => this.props.handleSubmit(e)} />
          <span> </span>
          <RaisedButton label='Print Resume'
                        onClick={e => this.props.handlePrint(e)} />
          <SelectField floatingLabelText='Select a theme'
                       menuItems={this.props.themes}
                       value={this.props.resumeState.resumeTheme}
                       valueMember='text'
                       style={this.props.styles.themeSelection}
                       onChange={(e, index) => this.props.handleChangeTheme(e, index)} />
      </div>
    );
  }
}
