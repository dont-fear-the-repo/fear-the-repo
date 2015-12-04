import React, { PropTypes } from 'react';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';


export default class ResumeHeader extends React.Component {
  static propTypes = {
    // body: PropTypes.string
  }

  render() {

    return (
      <div>
        <div style={this.props.styles.firstLine}>

          <div style={this.props.styles.location}>

            <Editor style={this.props.styles.city}
            text={this.props.resumeState.resumeHeader.city}
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'city', 'header')} />

            <Editor style={this.props.styles.state}
            text={this.props.resumeState.resumeHeader.state}            
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'state', 'header')} />
          </div>

          <Editor style={this.props.styles.name}
          text={this.props.resumeState.resumeHeader.name}
          onBlur={e => this.props.handleUpdateLocalState(e, 'name', 'header')} 
          options={{toolbar: false}}/> 

        </div> 

        <Editor style={this.props.styles.profession}
          options={{toolbar: false}}
          text={this.props.resumeState.resumeHeader.profession}
          onBlur={e => this.props.handleUpdateLocalState(e, 'profession', 'header')} />

          <Editor style={this.props.styles.email} 
          options={{toolbar: false}}
          text={this.props.resumeState.resumeHeader.email}
          onBlur={e => this.props.handleUpdateLocalState(e, 'email', 'header')} />


          <Editor style={this.props.styles.phone} 
          options={{toolbar: false}}
          text={this.props.resumeState.resumeHeader.phone}
          onBlur={e => this.props.handleUpdateLocalState(e, 'phone', 'header')} />


          <Editor style={this.props.styles.url} 
          options={{toolbar: false}}
          text={this.props.resumeState.resumeHeader.url}
          onBlur={e => this.props.handleUpdateLocalState(e, 'webLinkedin', 'header')} />


          <Editor style={this.props.styles.url} 
           options={{toolbar: false}}
           onBlur={e => this.props.handleUpdateLocalState(e, 'webOther', 'header')} />

      </div>
    );
  }
}

