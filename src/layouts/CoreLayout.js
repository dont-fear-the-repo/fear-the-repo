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

import { FlatButton, Popover, TextField, RefreshIndicator } from 'material-ui/lib';
import { styles } from 'styles/CoreLayoutStyles';
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
      spinning: false,
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
      success: () => {
        localStorage.setItem('email', userLoginInfo.email);
        this.closePopover('pop');
        this.props.actions.loginUser(userLoginInfo);
        this.setState({
          spinning: false
        });
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
      success: () => {
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

              <Link to='/' style={styles.name}>
                Fear the Repo
              </Link>

              <Link to='/resume'>
                <FlatButton label='Edit Your Resume' />
              </Link>

              {this.props.loggedIn ?
                <Link to='/secretpage'>
                  <FlatButton label='Secret Page' />
                </Link>
              : '' }

              {this.props.loggedIn &&
                <FlatButton style={styles.loginButton}
                            label='Logout'
                            onClick={e => this.handleLogout(e)} />}
              {!this.props.loggedIn &&
                <FlatButton style={styles.loginButton}
                            label='Login'
                            onClick={(e) => this.showLoginPopover('pop', e)} />}
              {!this.props.loggedIn &&
                <FlatButton style={styles.signupButton}
                            label='Signup'
                            onClick={(e) => this.showSignupPopover('pop', e)} />}
          </div>

          <Popover className='signup-popover'
                   open={this.state.activePopover === 'pop'}
                   anchorEl={this.state.anchorEl}
                   anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                   targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                   onRequestClose={this.closePopover.bind(this, 'pop')}
                   canAutoPosition={false} >
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
              {this.state.spinning ?
                <RefreshIndicator status='loading'
                                  size={80}
                                  top={30}
                                  left={250}
                                  loadingColor={'#009040'} /> :
                <FlatButton label='Submit'
                            disabled={!canSubmit}
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
              {!canSubmit ?
                <p className='disabled-text'
                   style={styles.disabledText}>
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
