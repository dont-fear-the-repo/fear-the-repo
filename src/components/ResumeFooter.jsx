import React from 'react';
import { TextField, Paper } from 'material-ui/lib';


export default class ResumeFooter extends React.Component {
  render() {
    return (
      <div>
        <div style={this.props.styles.plain}>

          <TextField ref='school1-name'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.name}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-name', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school1-degree'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.degree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-degree', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school1-schoolEndYear'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.schoolEndYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-schoolEndYear', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school1-location'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school1.location}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-location', 'footer')} />


          <TextField ref='school2-name'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.name}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-name', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school2-degree'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.degree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-degree', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school2-schoolEndYear'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.schoolEndYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-schoolEndYear', 'footer')} />

          <div style={this.props.styles.pipe}> | </div>

          <TextField ref='school2-location'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText={this.props.resumeState.resumeFooter.school2.location}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-location', 'footer')} />

        </div>


        <div style={this.props.styles.plain}>

        </div>


        <div style={this.props.styles.plain}>

          <TextField ref='personalStatement'
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintText='Personal Statement'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'personalStatement', 'footer')} />

        </div>

      </div>
    );
  }
}
