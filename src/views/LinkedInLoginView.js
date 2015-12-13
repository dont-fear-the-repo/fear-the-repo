import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { populateDataFromLinkedIn } from 'actions/resumeActions';
// import $ from 'jquery';


const ActionCreators = {
  populateDataFromLinkedIn
};

const mapStateToProps = (state) => ({
  resumeState: state.resumeReducer
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

class LinkedinLoginView extends React.Component {
  componentWillMount() {
    localStorage.setItem('sendLinkedinData', true);
  }
  render() {
    return <div>'hello'</div>;
  }
  //   $.ajax({
  //       url: '/cookie',
  //       method: 'post',
  //       success: function(data) {
  //         console.log(this.props.actions);
  //         this.props.actions.populateDataFromLinkedIn(data);
  //         console.log('This is the data',data);
  //       }.bind(this)
  //   })
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedinLoginView);
