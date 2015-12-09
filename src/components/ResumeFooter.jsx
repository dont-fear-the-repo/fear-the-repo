import React from 'react';
import { TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';


export default class ResumeFooter extends React.Component {
  render() {
    const { currentTheme, resumeThemes } = this.props;
    const { resumeFooter } = this.props.resumeState;

    return (
      <div>
        <div style={resumeThemes[currentTheme].plain}>

      <Paper>
      <div style={resumeThemes[currentTheme].footerText}>
          <Editor text={resumeFooter.school1.name}
                  style={resumeThemes[currentTheme].schoolName}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-name', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor text={resumeFooter.school1.degree}
                  style={resumeThemes[currentTheme].schoolDegree}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-degree', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor text={resumeFooter.school1.schoolEndYear}
                  style={resumeThemes[currentTheme].schoolYear}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-schoolEndYear', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor style={resumeThemes[currentTheme].schoolLocation}
                  text={this.props.resumeState.resumeFooter.school1.location}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-location', 'footer')} />

          <br/>

          <Editor style={resumeThemes[currentTheme].schoolName}
                  text={this.props.resumeState.resumeFooter.school2.name}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-name', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor style={resumeThemes[currentTheme].schoolDegree}
                  text={this.props.resumeState.resumeFooter.school2.degree}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-degree', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor style={resumeThemes[currentTheme].schoolYear}
                  text={this.props.resumeState.resumeFooter.school2.schoolEndYear}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-schoolEndYear', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <Editor style={resumeThemes[currentTheme].schoolLocation}
                  text={this.props.resumeState.resumeFooter.school2.location}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-location', 'footer')} />

            </div>
            </Paper>

        </div>


        <div style={resumeThemes[currentTheme].plain}>

        <Paper>
          <div style={resumeThemes[currentTheme].footerText}>
          <Editor text={this.props.resumeState.resumeFooter.personalStatement}
                  style={resumeThemes[currentTheme].personalStatement}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'personalStatement', 'footer')} />
          </div>
          </Paper>
        </div>

      </div>
    );
  }
}
