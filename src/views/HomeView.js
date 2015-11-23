import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import counterActions from 'actions/counter';

import { RaisedButton } from 'material-ui/lib';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.router,
  resumeTitle: state.title
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(counterActions, dispatch)
});
export class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  render () {
    return (
      <div className='container text-center'>
        <Link to='/login'><RaisedButton label='Login' /></Link>
        <Link to='/userForm'><RaisedButton label = 'Signup'/></Link>
        <h1>FEAR THE REPO</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <RaisedButton label='Increment' onClick={this.props.actions.increment} />

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
