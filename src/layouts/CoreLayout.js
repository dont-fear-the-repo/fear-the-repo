import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jQuery';
import _ from 'underscore';

import { Footer } from 'components/footer';
import { loginUser, signupUser, logout } from 'actions/titleBarActions';
import { enableSubmit, disableSubmit } from 'actions/validationActions';
import { isDefined, isValidEmail, matches } from 'utils/validation';

import { FlatButton, Popover, TextField } from 'material-ui/lib';
import 'styles/core.scss';


const ActionCreators = {
  loginUser: loginUser,
  signupUser: signupUser,
  logout: logout,
  enableSubmit: enableSubmit,
  disableSubmit: disableSubmit
};
const mapStateToProps = (state) => ({
  userLoginInfo: state.email,
  loggedIn: state.titleBarReducer.loggedIn,
  canSubmit: state.validationReducer.canSubmit
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

class CoreLayout extends React.Component {
    static propTypes = {
      children: React.PropTypes.element,
      actions: React.PropTypes.object,
      loggedIn: React.PropTypes.bool,
      userLoginInfo: React.PropTypes.string,
      canSubmit: React.PropTypes.bool
    };

    state = {
      activePopover: '',
      anchorEl: {},
      loginOrSignup: '',
      failedAttempted: false,
      userAlreadyExists: false,
      tempPassword: '',
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
      userAlreadyExists: false
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
      success: () => {
        localStorage.setItem('email', userLoginInfo.email);
        this.closePopover('pop');
        this.props.actions.loginUser(userLoginInfo);
      },
      error: () => {
        this.setState({
          failedAttempted: true
        });
      }
    });
    // this.props.actions.loginUser(userLoginInfo);  // use for actions
  }

  handleLogout() { // TODO: use actions here?
    $.ajax({
      url: '/logout',
      type: 'POST',
      success: () => {
        this.props.actions.logout();
      }
    });
  }

  handleSignup() { // TODO: use actions here?
    this.setState({
      failedAttempted: false
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
      success: () => {
        this.closePopover('pop');
        this.props.actions.loginUser(userSignupInfo);
      },
      error: () => {
        this.setState({
          userAlreadyExists: true
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
    } else if (!validEntry) {
      this.state.validations[this.state.loginOrSignup][key] = false;
    }

    const shouldEnable = _.every(this.state.validations[this.state.loginOrSignup],
                            validation => validation === true );
    if (shouldEnable) {
      this.props.actions.enableSubmit();
    } else {
      this.props.actions.disableSubmit();
    }
  }

  saveTempPassword(event) {
    this.state.tempPassword = event.target.value;
  }

  render() {
    const { canSubmit } = this.props;
    return (
      <div className='page-container'>
        <div className='view-container'>
          <div>
            <div className='header'>

              <Link to='/' style={{ marginLeft: '30px', marginRight: '20px' }}>
                Fear the Repo
              </Link>

              <Link to='/resume'>
                <FlatButton label='Edit Your Resume' />
              </Link>

              {this.props.loggedIn ? <Link to='/secretpage'>
                  <FlatButton label='Secret Page' />
                </Link>
              : '' }

              {this.props.loggedIn &&
                <FlatButton style={{ float: 'right', marginRight: '30px' }}
                            label='Logout'
                            onClick={e => this.handleLogout(e)} />}
              {!this.props.loggedIn &&
                <FlatButton style={{ float: 'right', marginRight: '30px' }}
                            label='Login'
                            onClick={this.showLoginPopover.bind(this, 'pop')} />}
              {!this.props.loggedIn &&
                <FlatButton style={{ float: 'right', marginRight: '10px' }}
                            label='Signup'
                            onClick={this.showSignupPopover.bind(this, 'pop')} />}
          </div>

          <Popover className='signup-popover'
                   open={this.state.activePopover === 'pop'}
                   anchorEl={this.state.anchorEl}
                   anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
                   targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                   onRequestClose={this.closePopover.bind(this, 'pop')} >
            <div style={{ padding: '20px' }}>
              <TextField ref='email'
                         hintText='Email'
                         onChange={e => this.validateField(e, [isDefined, isValidEmail], 'email')}
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
              <FlatButton label='Submit'
                          disabled={!canSubmit}
                          onClick={this.state.loginOrSignup === 'login' ?
                            e => this.handleLogin(e) :
                            e => this.handleSignup(e)} />

              {this.state.userAlreadyExists ?
                <p className='userAlreadyExists'
                   style={{ marginTop: '20px', marginLeft: '30px', color: 'red' }}>
                  Account already exists for this email.<br/>
                  Perhaps you meant to sign up?
                </p> : ''}
              {this.state.failedAttempted ?
                <p className='failedAttempted'
                   style={{ marginTop: '20px', marginLeft: '30px', color: 'red' }}>
                  Incorrect email or password - please try again.<br/>
                  Perhaps you meant to sign up?
                </p> : ''}
              {!canSubmit ?
                <p className='disabled-text'
                   style={{ marginTop: '20px', marginLeft: '30px', color: 'blue' }}>
                  Please enter valid email and password
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
