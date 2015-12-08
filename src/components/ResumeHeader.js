import React, { PropTypes } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';

export default class ResumeHeader extends React.Component {

  static propTypes = {
    currentTheme: PropTypes.string,
    handleUpdateLocalState: PropTypes.func,
    resumeThemes: PropTypes.object,
    resumeState: PropTypes.object
  }

  render() {
    const { currentTheme, resumeThemes } = this.props;

    return (
      <div style={resumeThemes[currentTheme].headerDiv}>

        <div>

          <div style={resumeThemes[currentTheme].name}>

            <Editor
                  text={this.props.resumeState.resumeHeader.name}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} />

          </div>

          <div style={resumeThemes[currentTheme].location}>

            <Editor style={resumeThemes[currentTheme].city}
                    text={this.props.resumeState.resumeHeader.city}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'city', 'header')} />
          </div>


        </div>

        <Editor style={resumeThemes[currentTheme].profession}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.profession}
                onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />

<div>
        <Editor style={resumeThemes[currentTheme].phone}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.phone}
                onBlur={e => this.props.handleUpdateLocalState(e, 'phone', 'header')} />


          <div style={resumeThemes[currentTheme].headerPipe}>
            |
          </div>

        <Editor style={resumeThemes[currentTheme].email}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.displayEmail}
                onBlur={e => this.props.handleUpdateLocalState(e, 'email', 'header')} />

      </div>

        <Editor style={resumeThemes[currentTheme].url}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.webLinkedin}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />

        <Editor style={resumeThemes[currentTheme].url}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.webOther}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />

      </div>

      // </div>
    );
  }
}
