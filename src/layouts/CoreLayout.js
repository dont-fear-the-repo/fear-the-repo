import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jQuery';
import _ from 'underscore';

import { Footer } from 'components/footer';
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
         RefreshIndicator } from 'material-ui/lib';
import { styles } from 'styles/CoreLayoutStyles';


const ActionCreators = {
  disableSubmit,
  displayAuthMessage,
  enableSubmit,
  loginUser,
  logout,
  signupUser
};
const mapStateToProps = (state) => ({
  canSubmitAuth: state.validationReducer.canSubmitAuth,
  currentAuthMessage: state.validationReducer.currentAuthMessage,
  loggedIn: state.titleBarReducer.loggedIn,
  userLoginInfo: state.email
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

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

  render() {
    const { canSubmitAuth, currentAuthMessage, loggedIn } = this.props;

    return (
      <div className='page-container'>
        <div className='view-container'>
          <div>
            <div className='header' style={styles.mainContainer}>

              <Link to='/' style={styles.name}>
                Rezable
              </Link>

              <Link to='/resume'>
                <FlatButton label='Edit Resume'
                            style={styles.resumeButton}
                            backgroundColor={styles.buttonColor}
                            labelStyle={styles.buttonLabelStyle}
                            hoverColor={styles.buttonHoverColor} />
              </Link>

              {loggedIn &&
                <FlatButton label='Logout'
                            style={styles.loginButton}
                            backgroundColor={styles.buttonColor}
                            hoverColor={styles.buttonHoverColor}
                            labelStyle={styles.buttonLabelStyle}
                            onClick={e => this.handleLogout(e)} />}
              {!loggedIn &&
                <FlatButton label='Login'
                            style={styles.loginButton}
                            backgroundColor={styles.buttonColor}
                            hoverColor={styles.buttonHoverColor}
                            labelStyle={styles.buttonLabelStyle}
                            onClick={(e) => this.showLoginPopover('pop', e)} />}
              {!loggedIn &&
                <FlatButton label='Signup'
                            style={styles.signupButton}
                            backgroundColor={styles.buttonColor}
                            hoverColor={styles.buttonHoverColor}
                            labelStyle={styles.buttonLabelStyle}
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
                                  size={80}
                                  top={30}
                                  left={250}
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
