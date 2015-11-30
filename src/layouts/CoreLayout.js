import React from 'react';
import { Footer } from 'components/footer';
import 'styles/core.scss';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser, signupUser, logout } from 'actions/titleBarActions';
import $ from 'jQuery';
import { FlatButton, Popover, TextField } from 'material-ui/lib';

const ActionCreators = {
  loginUser: loginUser,
  signupUser: signupUser,
  logout: logout
};
const mapStateToProps = (state) => ({
  userLoginInfo: state.username,
  loggedIn: state.titleBarReducer.loggedIn
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export default class CoreLayout extends React.Component {
    static propTypes = {
      children: React.PropTypes.element,
      actions: React.PropTypes.object,
      loggedIn: React.PropTypes.bool,
      userLoginInfo: React.PropTypes.string
    };

    state = {
      activePopover: '',
      anchorEl: {},
      loginOrSignup: '',
      failedattempted: false,
      userAlreadyExists: false
    }

// AUTH METHODS
  handleLogin() {
    const userLoginInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };
    // jQuery defeat...not "the Redux Way"?
    $.ajax({ // TODO: eliminate jQuery!
      url: '/login',
      type: 'POST',
      data: JSON.stringify(userLoginInfo),
      contentType: 'application/json',
      success: function () {
        localStorage.setItem('username', userLoginInfo.username);
        this.closePopover('pop');
        this.props.actions.loginUser(userLoginInfo);
      }.bind(this),
      error: function () {
        this.setState({
          failedattempted: true
        });
      }.bind(this)
    });
    // this.props.actions.loginUser(userLoginInfo);  // TODO: make this work? Currently this component has no props, and so no actions are being bound and available
    // TODO: change button to show userinfo, maybe redirect? Possible async concerns
  }

    handleLogout() {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        if (cookie.slice(0, 11) === 'connect.sid' || cookie.slice(1, 12) === 'connect.sid') {
          document.cookie = cookie + '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
          break;
        }
      }
      localStorage.removeItem('username');
      this.props.actions.logout();
    }
  handleSignup() {
    const userSignupInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    $.ajax({ // TODO: eliminate jQuery!
      url: '/signup',
      type: 'POST',
      data: JSON.stringify(userSignupInfo),
      contentType: 'application/json',
      success: function () {
        localStorage.setItem('username', userSignupInfo.username);
        this.closePopover('pop');
        this.props.actions.loginUser(userSignupInfo);
      }.bind(this),
      error: function () {
        this.setState({
          userAlreadyExists: true
        });
      }.bind(this)
    });

// TODO: make this work? Currently this component has no props, and so no actions are being bound and available
    // TODO: change button to show userinfo, maybe redirect? Possible async concerns
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
      failedattempted: false,
      userAlreadyExists: false
    });
  }

  render() {
    return (
      <div className='page-container'>
        <div className='view-container'>
          <div>
            <div className='header'>

              <Link to='/' style={{marginLeft: '30px'}}>
                Fear the Repo
              </Link>

              <Link to='/userform'>
                <FlatButton label='User Info' />
              </Link>

              <Link to='/resume'>
                <FlatButton label='Edit Resume' />
              </Link>

              <FlatButton label='export' />
              {this.props.loggedIn ? <Link to='/secretpage'>
                  <FlatButton label='Secret Page' />
                </Link>
              : '' }

            {this.props.loggedIn &&
              <FlatButton style={{float: 'right', marginRight: '30px'}}
                          label='Logout'
                          onClick={e => this.handleLogout(e)} />}
            {!this.props.loggedIn &&
              <FlatButton style={{float: 'right', marginRight: '30px'}}
                          label='Login'
                          onClick={this.showLoginPopover.bind(this, 'pop')} />}
            {!this.props.loggedIn &&
              <FlatButton style={{float: 'right', marginRight: '10px'}}
                          label='Signup'
                          onClick={this.showSignupPopover.bind(this, 'pop')} />}
          </div>

          <Popover className='signup-popover'
                   open={this.state.activePopover === 'pop'}
                   anchorEl={this.state.anchorEl}
                   anchorOrigin={{horizontal: 'left', vertical: 'center'}}
                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                   onRequestClose={this.closePopover.bind(this, 'pop')} >
            <div style={{padding: 20}}>
              <TextField hintText='Username' ref='username' />
              <TextField hintText='Password' type='password'  ref='password' />
              <FlatButton label='Submit'
                          onClick={this.state.loginOrSignup === 'login' ?
                            e => this.handleLogin(e) :
                            e => this.handleSignup(e)} />
              {this.state.failedAttempted ? <p style={{color: 'red'}}> Wrong username or password</p> : ''}
              {this.state.userAlreadyExists ? <p style={{color: 'red'}}> Username already exists</p> : ''}
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
