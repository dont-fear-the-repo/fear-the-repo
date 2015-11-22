import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveForm } from 'actions/userFormActions';
import { goHome } from 'actions/goHome';

import { RaisedButton, TextField } from 'material-ui/lib';


const ActionCreators = {
  goHome: goHome,
  saveForm: saveForm
};

const mapStateToProps = (state) => ({
  goHome : state.goHome,
  routerState : state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(ActionCreators, dispatch)
});
  // ^ bindActionCreators turns an object whose values are action creators, into an object
  // with the same keys, but with every action creator wrapped into a dispatch call
  // so they may be invoked directly. http://rackt.org/redux/docs/api/bindActionCreators.html


export class EditTextView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object
  }

  handleSubmit () {
    const userInput = {
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
      otherUrls: this.refs.otherUrls.getValue(),
      // temp links below
      project1Name: this.refs.project1Name.getValue(),
      project1Url: this.refs.project1Url.getValue(),
      project1Role: this.refs.project1Role.getValue(),
      project1Description: this.refs.project1Description.getValue(),
      project2Name: this.refs.project2Name.getValue(),
      project2Url: this.refs.project2Url.getValue(),
      project2Role: this.refs.project2Role.getValue(),
      project2Description: this.refs.project2Description.getValue(),
      job1Name: this.refs.job1Name.getValue(),
      job1Location: this.refs.job1Location.getValue(),
      job1Years: this.refs.job1Years.getValue(),
      job1Title: this.refs.job1Title.getValue(),
      job1Description: this.refs.job1Description.getValue(),
      job2Name: this.refs.job2Name.getValue(),
      job2Location: this.refs.job2Location.getValue(),
      job2Years: this.refs.job2Years.getValue(),
      job2Title: this.refs.job2Title.getValue(),
      job2Description: this.refs.job2Description.getValue()
    };

    console.log('userInput', userInput);
    this.props.actions.saveForm(userInput);

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
    // temp links below
    this.refs.project1Name.clearValue();
    this.refs.project1Url.clearValue();
    this.refs.project1Role.clearValue();
    this.refs.project1Description.clearValue();
    this.refs.project2Name.clearValue();
    this.refs.project2Url.clearValue();
    this.refs.project2Role.clearValue();
    this.refs.project2Description.clearValue();
    this.refs.job1Name.clearValue();
    this.refs.job1Location.clearValue();
    this.refs.job1Years.clearValue();
    this.refs.job1Title.clearValue();
    this.refs.job1Description.clearValue();
    this.refs.job2Name.clearValue();
    this.refs.job2Location.clearValue();
    this.refs.job2Years.clearValue();
    this.refs.job2Title.clearValue();
    this.refs.job2Description.clearValue();
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
            <li>
              We will never use or sell your contact info for any third-party use. No spam!
            </li>
            <li>
              You can enter as little or as much information as you like.
            </li>
            <li>
              Feel free to enter more information than you might want on a single resume; we'll hang on to the extras so you can easily use them later.
            </li>
          </ul>
        </div>

        <div className='userinfo-textfields'>
          <div>
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
          </div>

          <div>
            <TextField ref='project1Name' hintText='project1: Project Name' />
            <TextField ref='project1Url' hintText='project1: URL' />
            <TextField ref='project1Role' hintText='project1: Your Role' />
            <TextField ref='project1Description' hintText='project1: Description' />
          </div>

          <div>
            <TextField ref='project2Name' hintText='project2: Project Name' />
            <TextField ref='project2Url' hintText='project2: URL' />
            <TextField ref='project2Role' hintText='project2: Your Role' />
            <TextField ref='project2Description' hintText='project2: Description' />
          </div>

          <div>
            <TextField ref='job1Name' hintText='Job1: Company Name' />
            <TextField ref='job1Location' hintText='Job1: Location' />
            <TextField ref='job1Years' hintText='Job1: Years Worked' />
            <TextField ref='job1Title' hintText='Job1: Title' />
            <TextField ref='job1Description' hintText='Job1: Description' />
          </div>

          <div>
            <TextField ref='job2Name' hintText='Job2: Company Name' />
            <TextField ref='job2Location' hintText='Job2: Location' />
            <TextField ref='job2Years' hintText='Job2: Years Worked' />
            <TextField ref='job2Title' hintText='Job2: Title' />
            <TextField ref='job2Description' hintText='Job2: Description' />
          </div>

          <div>
            <TextField ref='educationSchool' hintText='University Name' />
            <TextField ref='educationLocation' hintText='University Location' />
            <TextField ref='educationYeargraduated' hintText='Year Graduated' />
          </div>

          <div>
            <TextField ref='personal' hintText='Personal interests, hobbies, etc' />
          </div>

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
