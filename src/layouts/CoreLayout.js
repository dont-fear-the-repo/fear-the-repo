import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import _ from 'underscore';
import Radium from 'radium';

import { Footer } from 'components/footer';
import { resetResume } from 'actions/resumeActions';
import { loginUser, signupUser, logout } from 'actions/titleBarActions';
import { enableSubmit,
         disableSubmit,
         displayAuthMessage } from 'actions/validationActions';
import { isDefined,
         isValidEmail,
         matches } from 'utils/validation';

import { FlatButton,
         Popover,
         TextField,
         RefreshIndicator,
         LeftNav,
         AppBar,
         IconButton,
         IconMenu,
         MoreVertIcon,
         MenuItem } from 'material-ui/lib';

import { styles } from 'styles/CoreLayoutStyles';


const ActionCreators = {
  disableSubmit,
  displayAuthMessage,
  enableSubmit,
  loginUser,
  logout,
  resetResume,
  signupUser
};
const mapStateToProps = (state) => ({
  canSubmitAuth: state.validationReducer.canSubmitAuth,
  currentAuthMessage: state.validationReducer.currentAuthMessage,
  loggedIn: state.titleBarReducer.loggedIn,
  userLoginInfo: state.email,
  pageYouAreOn: state.router.location.pathname
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

@Radium
class CoreLayout extends React.Component {
    static propTypes = {
      actions: React.PropTypes.object,
      canSubmitAuth: React.PropTypes.bool,
      currentAuthMessage: React.PropTypes.string,
      children: React.PropTypes.element,
      loggedIn: React.PropTypes.bool,
      userLoginInfo: React.PropTypes.string
    };

    state = {
      activePopover: '',
      anchorEl: {},
      failedAttempted: false,
      loginOrSignup: '',
      spinning: false,
      tempPassword: '',
      userAlreadyExists: false,
      validations: {
        login: {
          email: false,
          password: false
        },
        signup: {
          email: false,
          password: false,
          password2: false
        }
      }
    }

  // AUTH METHODS
  handleLogin() { // TODO: use actions here?
    this.setState({
      userAlreadyExists: false,
      spinning: true
    });
    const userLoginInfo = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify(userLoginInfo),
      contentType: 'application/json',
      success: (data) => {
        userLoginInfo.id = data.id;
        userLoginInfo.resumeId = data.resumeId;
        localStorage.setItem('email', userLoginInfo.email);
        this.closePopover('pop');
        this.props.actions.loginUser(userLoginInfo);
        this.setState({
          spinning: false
        });
        // transition to resume view here
        // this.props.pageYouAreOn = '/resume';
      },
      error: () => {
        this.setState({
          failedAttempted: true,
          spinning: false
        });
      }
    });
    // this.props.actions.loginUser(userLoginInfo);  // use for actions
  }

  handleLogout() { // TODO: use actions here?
    this.setState({
      spinning: true
    });
    $.ajax({
      url: '/logout',
      type: 'POST',
      success: () => {
        this.props.actions.logout();
        this.props.actions.resetResume();
        this.setState({
          spinning: false
        });
      }
    });
  }

  handleSignup() { // TODO: use actions here?
    this.setState({
      failedAttempted: false,
      spinning: true
    });
    const userSignupInfo = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    $.ajax({
      url: '/signup',
      type: 'POST',
      data: JSON.stringify(userSignupInfo),
      contentType: 'application/json',
      success: (data) => {
        userSignupInfo.id = data.id;
        userSignupInfo.resumeId = data.resumeId;
        this.closePopover('pop');
        this.props.actions.loginUser(userSignupInfo);
        this.setState({
          spinning: false
        });
      },
      error: () => {
        this.setState({
          userAlreadyExists: true,
          spinning: false
        });
      }
    });
  }

// POPOVER METHODS
showLoginPopover(key, e) {
  this.setState({
    activePopover: key,
    anchorEl: e.currentTarget,
    loginOrSignup: 'login'
  });
}

  showSignupPopover(key, e) {
    this.setState({
      activePopover: key,
      anchorEl: e.currentTarget,
      loginOrSignup: 'signup'
    });
  }

  closePopover(key) {
    if (this.state.activePopover !== key) {
      return;
    }
    this.setState({
      activePopover: 'none',
      failedAttempted: false,
      userAlreadyExists: false
    });
  }

  // VALIDATION METHODS
  validateField(event, validatorsArray, key) {
    const value = event.target.value;
    const validEntry = _.every(validatorsArray,
                          validator => validator(value) );
    if (validEntry) {
      this.state.validations[this.state.loginOrSignup][key] = true;
      this.props.actions.displayAuthMessage('');
    } else if (!validEntry) {
      this.state.validations[this.state.loginOrSignup][key] = false;
      this.props.actions.displayAuthMessage(key);
    }

    const shouldEnable = _.every(this.state.validations[this.state.loginOrSignup],
                            validation => validation === true );
    if (shouldEnable) {
      this.props.actions.enableSubmit('Auth');
    } else {
      this.props.actions.disableSubmit('Auth');
    }
  }

  saveTempPassword(event) {
    this.state.tempPassword = event.target.value;
  }
  /*iconClassNameRight="muidocs-icon-navigation-expand-more"*/


  render() {
    const { canSubmitAuth, currentAuthMessage, loggedIn } = this.props;

    return (
      <div className='page-container'>
        <div className='view-container'>
          <AppBar
                title={<Link to='/' style={styles.name}>rezable</Link>}
                style={styles.mainContainer}
                iconElementLeft={
                      <Link to='/' style={styles.name}>
                        <svg style={styles.logo} version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><g><circle cx="33.929" cy="21.406" r="3.214"></circle><rect x="43.571" y="63.191" width="25.715" height="6.429"></rect><circle cx="33.929" cy="50.334" r="3.214"></circle><rect x="43.571" y="76.048" width="25.715" height="6.429"></rect><rect x="43.571" y="50.334" width="25.715" height="6.43"></rect><path d="M82.143,18.845v-0.004l-0.303-0.306c-0.01-0.009-0.02-0.019-0.027-0.028L81.5,18.191L68.643,5.334H17.857v13.511   C9.905,26.961,5,38.074,5,50.334s4.905,23.373,12.857,31.489v13.511h64.286V81.823C90.096,73.707,95,62.594,95,50.334   S90.096,26.961,82.143,18.845z M75.714,88.906H24.286V11.763h38.571V24.62h12.856V88.906z"></path><circle cx="33.929" cy="79.262" r="3.215"></circle><rect x="43.571" y="37.477" width="25.715" height="6.428"></rect></g></svg>
                      </Link>
                  }
                iconElementRight={
                  <div>

                    <Link to='/resume'>

                    {Radium.getState(this.state, 'editResume', ':hover')}
                      <div style={styles.editResumeButton} key='editResume'>
                        Edit Resume
                      </div>

                    </Link>

                    {loggedIn &&

                      <Link to='/'>

                        <div style={styles.loginButton}
                             onClick={(e) => this.handleLogout(e)} key='logoutButton'>
                          Logout
                        </div>

                      </Link>}

                    {!loggedIn &&

                      <div style={styles.loginButton}
                           onClick={(e) => this.showLoginPopover('pop', e)} key='loginButton'>
                        Login
                      </div>}

                    {!loggedIn &&

                      <div style={styles.signupButton}
                           onClick={(e) => this.showSignupPopover('pop', e)} key='signupButton'>
                        Signup
                      </div>}

                  </div>
                  } /> {/* End of the AppBar */}

          <div>

          <Popover className='signup-popover'
                   open={this.state.activePopover === 'pop'}
                   anchorEl={this.state.anchorEl}
                   anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                   targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                   onRequestClose={this.closePopover.bind(this, 'pop')}
                   canAutoPosition={false}
                   style={{width: '300px' , marginTop: '16px'}} >
            <div style={{ padding: '20px' }}>
              <TextField ref='email'
                         hintText='Email'
                         onBlur={e => this.validateField(e, [isDefined, isValidEmail], 'email')}
                         />
              <TextField ref='password'
                         hintText='Password'
                         type='password'
                         onChange={e => this.validateField(e, [isDefined], 'password')}
                         onBlur={e => this.saveTempPassword(e)}
                         />
              {this.state.loginOrSignup === 'signup' ?
                <TextField ref='password2'
                           hintText='Re-enter password'
                           type='password'
                           onChange={e => this.validateField(e, [isDefined, matches(this.state.tempPassword)], 'password2')}
                           /> : ''}
              {this.state.spinning ?
                <RefreshIndicator status='loading'
                                  size={60}
                                  top={50}
                                  left={150}
                                  loadingColor={styles.spinnerColor} /> :
                <FlatButton label='Submit'
                            disabled={!canSubmitAuth}
                            onClick={this.state.loginOrSignup === 'login' ?
                              e => this.handleLogin(e) :
                              e => this.handleSignup(e)} />}

              {this.state.userAlreadyExists ?
                <p className='userAlreadyExists'
                   style={styles.errorText}>
                  Account already exists for this email.<br/>
                  Perhaps you meant to sign up?
                </p> : ''}
              {this.state.failedAttempted ?
                <p className='failedAttempted'
                   style={styles.errorText}>
                  Incorrect email or password - please try again.<br/>
                  Perhaps you meant to sign up?
                </p> : ''}
              {currentAuthMessage ?
                <p className='disabled-text'
                   style={styles.errorText}>
                  {currentAuthMessage}
                </p> : ''}

            </div>
        </Popover>

          </div>
          {this.props.children}
        <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
