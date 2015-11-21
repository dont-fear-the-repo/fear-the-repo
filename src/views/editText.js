import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
// import goHomeActions          from 'actions/goHome';
// changed into the following to get multiple actions:
import * as ActionCreators from 'actions/goHome';

import RaisedButton           from 'material-ui/lib/raised-button';
import TextField              from 'material-ui/lib/text-field';

const mapStateToProps = (state) => ({
  goHome : state.goHome,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  // There are TWO actions coming from ActionCreators via 'actions/goHome.js'
  actions : bindActionCreators(ActionCreators, dispatch)
  // ^ bindActionCreators turns an object whose values are action creators, into an object
  // with the same keys, but with every action creator wrapped into a dispatch call
  // so they may be invoked directly. http://rackt.org/redux/docs/api/bindActionCreators.html
});


export class EditTextView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object
  }

  handleSubmit (e) {
    var userInput = {
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      phone: this.refs.phone.getValue(),
      streetAddress: this.refs.streetAddress.getValue(),
      city: this.refs.city.getValue(),
      state: this.refs.state.getValue(),
      zipCode: this.refs.zipCode.getValue(),
      homepageOrBlog: this.refs.homepageOrBlog.getValue(),
      linkedinUrl: this.refs.linkedinUrl.getValue(),
      githubUrl: this.refs.githubUrl.getValue(),
      facebookUrl: this.refs.facebookUrl.getValue(),
      twitterUrl: this.refs.twitterUrl.getValue(),
      otherUrls: this.refs.otherUrls.getValue()
    };

    console.log('userInput', userInput);
    this.props.actions.saveText(userInput);

    this.clearInfo();
  }

  clearInfo () {
    this.refs.name.clearValue();
    this.refs.email.clearValue();
    this.refs.phone.clearValue();
    this.refs.streetAddress.clearValue();
    this.refs.city.clearValue();
    this.refs.state.clearValue();
    this.refs.zipCode.clearValue();
    this.refs.homepageOrBlog.clearValue();
    this.refs.linkedinUrl.clearValue();
    this.refs.githubUrl.clearValue();
    this.refs.facebookUrl.clearValue();
    this.refs.twitterUrl.clearValue();
    this.refs.otherUrls.clearValue();
  }

  render () {

    return (
      <div className='container'>
      <br />
        <h1 className='userinfo-header'>
          Your Information
        </h1>

        <div className='userinfo-copy'>
          <p>
            Please enter your information below. We've filled in any information you've entered previously.
          </p>
          <p>
            A few things to remember:
          </p>
          <ul>
            <li>We will never use or sell your contact info for any third-party use. No spam!</li>
            <li>You can enter as little or as much information as you like.</li>
            <li>Feel free to enter more information than you might want on a single resume; we'll hang on to the extras so you can easily use them later.</li>
          </ul>
        </div>

        <div className='userinfo-textfields'>
          <TextField ref='name' hintText='Full Name' />
          <TextField ref='email' hintText='Email' />
          <TextField ref='phone' hintText='Phone Number' />
          <TextField ref='streetAddress' hintText='Street Address' />
          <TextField ref='city' hintText='City' />
          <TextField ref='state' hintText='State' />
          <TextField ref='zipCode' hintText='ZIP Code' />
          <TextField ref='homepageOrBlog' hintText='Homepage or Blog' />
          <TextField ref='linkedinUrl' hintText='LinkedIn.com/in/...' />
          <TextField ref='githubUrl' hintText='Github.com/...' />
          <TextField ref='facebookUrl' hintText='Facebook.com/...' />
          <TextField ref='twitterUrl' hintText='Twitter.com/...' />
          <TextField ref='otherUrls' hintText='Other URLs, comma-separated' />

          <RaisedButton label='Save' onClick={e => this.handleSubmit(e)} />
        </div>

        <br/>
        <Link to='/'>
          Back to the homepage
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTextView);
