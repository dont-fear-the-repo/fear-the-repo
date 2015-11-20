import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import goHomeActions          from 'actions/goHome';
import RaisedButton           from 'material-ui/lib/raised-button';

const mapStateToProps = (state) => ({
  goHome : state.goHome,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(goHomeActions, dispatch)
});
export class ResumeView extends React.Component {
  static propTypes = {
    actions : React.PropTypes.object
  }

  render () {
    return (
      <div className='container'>
        <h1>is this thing on?</h1>
        <RaisedButton secondary={true} label='This button does nothing' onClick={this.props.actions.goHome} />
        <br/>
        <br/>
        <Link to='/'>but this link will take you back to the counter</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
