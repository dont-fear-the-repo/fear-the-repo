import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import testActions         from 'actions/test';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  test : state.test,
  someStupidProp: state.someStupidProp,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(testActions, dispatch)
});


export class TestView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    test  : React.PropTypes.string
  }

  constructor(props) {
    super();
    this.someprop = 'fuckin react';
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>FEAR THE REPO</h1>
        <h2>Here's a test object: {this.props.test}</h2>
        <button className='btn btn-default'
                onClick={this.props.actions.someFunc}>
          SUP
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestView);
