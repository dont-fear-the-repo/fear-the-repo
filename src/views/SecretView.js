import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';
// import { RaisedButton } from 'mat[erial-ui/lib';

const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(counterActions, dispatch)
});
class SecretView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  render() {
    return (
      <div className='landing main-body' style={{textAlign: 'center'}}>
        "YOU FOUND THE SECRET PAGE"
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecretView);
