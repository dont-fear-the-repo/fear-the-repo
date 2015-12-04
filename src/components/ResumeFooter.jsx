import React from 'react';
import { TextField, Paper } from 'material-ui/lib';


export default class ResumeFooter extends React.Component {
  render() {
    const { currentTheme, resumeThemes } = this.props;

    return (
      <div>
        <div style={resumeThemes[currentTheme].plain}>

          <TextField ref='school1-name'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.name}
                     style={resumeThemes[currentTheme].schoolName}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-name', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school1-degree'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.degree}
                     style={resumeThemes[currentTheme].schoolDegree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-degree', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school1-schoolEndYear'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.schoolEndYear}
                     style={resumeThemes[currentTheme].schoolYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-schoolEndYear', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school1-location'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.location}
                     style={resumeThemes[currentTheme].schoolLocation}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-location', 'footer')} />


          <TextField ref='school2-name'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.name}
                     style={resumeThemes[currentTheme].schoolName}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-name', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school2-degree'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.degree}
                     style={resumeThemes[currentTheme].schoolDegree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-degree', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school2-schoolEndYear'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.schoolEndYear}
                     style={resumeThemes[currentTheme].schoolYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-schoolEndYear', 'footer')} />

          <div style={resumeThemes[currentTheme].pipe}> | </div>

          <TextField ref='school2-location'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.location}
                     style={resumeThemes[currentTheme].schoolLocation}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-location', 'footer')} />

        </div>


        <div style={resumeThemes[currentTheme].plain}>

        </div>


        <div style={resumeThemes[currentTheme].plain}>

          <TextField ref='personalStatement'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText='Personal Statement'
                     style={resumeThemes[currentTheme].personalStatement}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'personalStatement', 'footer')} />

        </div>

      </div>
    );
  }
}
