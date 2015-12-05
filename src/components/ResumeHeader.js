import React, { PropTypes } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';


export default class ResumeHeader extends React.Component {

  render() {
    const { currentTheme, resumeThemes } = this.props;

    return (
      <div>

        <div>

          <div style={resumeThemes[currentTheme].location}>

            <Editor style={resumeThemes[currentTheme].city}
                    text={this.props.resumeState.resumeHeader.city}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'city', 'header')} />

            <Editor style={resumeThemes[currentTheme].state}
                    text={this.props.resumeState.resumeHeader.state}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'state', 'header')} />

          </div>

          <Editor style={resumeThemes[currentTheme].name}
                  text={this.props.resumeState.resumeHeader.name}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} />

        </div>

        <Editor style={resumeThemes[currentTheme].profession}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.profession}
                onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />

        <Editor style={resumeThemes[currentTheme].email}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.email}
                onBlur={e => this.props.handleUpdateLocalState(e, 'email', 'header')} />


        <Editor style={resumeThemes[currentTheme].phone}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.phone}
                onBlur={e => this.props.handleUpdateLocalState(e, 'phone', 'header')} />


        <Editor style={resumeThemes[currentTheme].url}
                options={{toolbar: false}}
                text={this.props.resumeState.resumeHeader.url}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />


        <Editor style={resumeThemes[currentTheme].url}
                options={{toolbar: false}}
                onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />

      </div>
    );
  }
}
