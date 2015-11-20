import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import counterActions         from 'actions/counter';
import RaisedButton           from 'material-ui/lib/raised-button';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

/* var mapStateToProps = function(state) {
  counter = state.counter;
  routerState = state.router;
}*/
const mapStateToProps = (state) => ({
  counter : state.counter,
  routerState : state.router
});

/* var mapDispatchToProps = function(dispatch) {
  actions = bindActionCreators(counterActions, dispatch);
}*/
const mapDispatchToProps = (dispatch) => ({
  // wrap counter action creators with a dispatch call so they may be invoked directly
  // allows action creator to immediately dispatch action after returning said action
  actions : bindActionCreators(counterActions, dispatch)
});

/*
var HomeView = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  },

  render: function() {
    etc etc
})
*/
export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>Sample Counter: {this.props.counter}</h2>
        <RaisedButton label='Increment' onClick={this.props.actions.increment} />
        <br/>
        <br/>
        <Link to='/resume'>Go to resume view</Link>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
