import React from 'react';
import { TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';

export default class ResumeFooter extends React.Component {
  render() {
    return (
      <div>
        <div style={this.props.styles.plain}>

          <Editor text={this.props.resumeState.resumeFooter.school1.name}
                  style={this.props.styles.school1Name}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-name', 'footer')} 
                  options={{toolbar: false}}/>
          <div style={this.props.styles.pipe}> | </div>

          <Editor text={this.props.resumeState.resumeFooter.school1.degree}
                  style={this.props.styles.school1Degree}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-degree', 'footer')} 
                  options={{toolbar: false}}/>

          <div style={this.props.styles.pipe}> | </div>

          <Editor text={this.props.resumeState.resumeFooter.school1.schoolEndYear}
                  style={this.props.styles.school1SchoolEndYear}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-schoolEndYear', 'footer')} 
                  options={{toolbar: false}}/>

          <div style={this.props.styles.pipe}> | </div>

          <Editor style={this.props.styles.school1Location}
                  text={this.props.resumeState.resumeFooter.school1.location}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school1-location', 'footer')} 
                  options={{toolbar: false}}/>
          <br/>

          <Editor  style={this.props.styles.school2Name}
                    text={this.props.resumeState.resumeFooter.school2.name}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'school2-name', 'footer')} 
                    options={{toolbar: false}}/>
 
          <div style={this.props.styles.pipe}> | </div>

          <Editor style={this.props.styles.school2Degree}
                  text={this.props.resumeState.resumeFooter.school2.degree}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-degree', 'footer')} 
                  options={{toolbar: false}}/>

          <div style={this.props.styles.pipe}> | </div>

          <Editor style={this.props.styles.school2SchoolEndYear}
                  text={this.props.resumeState.resumeFooter.school2.schoolEndYear}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-schoolEndYear', 'footer')} 
                  options={{toolbar: false}}/>

          <div style={this.props.styles.pipe}> | </div>

          <Editor style={this.props.styles.school2Location}
                  text={this.props.resumeState.resumeFooter.school2.location}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'school2-location', 'footer')} 
                  options={{toolbar: false}}/>
        </div>
        <div style={this.props.styles.plain}>
        </div>
        <div style={this.props.styles.plain}>
          <Editor text='personalStatement'
                  onBlur={e => this.props.handleUpdateLocalState(e, 'personalStatement', 'footer')} options={{toolbar: false}}/>

        </div>

      </div>
    );
  }
}
