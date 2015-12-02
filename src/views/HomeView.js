import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';

import { RaisedButton } from 'material-ui/lib';

const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(counterActions, dispatch)
});
class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  render() {
    return (
      <div className='landing main-body'
           style={{ textAlign: 'center' }}>
        <img src={require('styles/assets/writing-resume.jpg')}
             style={{ width: '100%' }} />
        <h1 className='main-title'>
          FEAR THE REPO
        </h1>

        <h3 className='main-tagline'>
          Resume Version Control and Templating
        </h3>

        <div className='main-copy'>
          All other resume tools suck. Ours is the best.
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>For no reason, a counter: {this.props.counter}</div>
        <RaisedButton label='Increment' onClick={this.props.actions.increment} />

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
