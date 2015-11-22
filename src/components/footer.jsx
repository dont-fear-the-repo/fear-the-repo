import React from 'react';
import { Link } from 'react-router';

import { FlatButton, FontIcon } from 'material-ui/lib';

export class Footer extends React.Component {

  render () {
    return (
      <div>
        <div className='footer' style={{textAlign: 'center'}}>
          <Link to='/about'>
            <FlatButton label='About Us' />
          </Link>

          <a href='https://github.com/dont-fear-the-repo/fear-the-repo'>
            <FlatButton label='Check us out on Github' />
            <img src={require('styles/assets/github-icon-dark.png')} height='40' width='40' />
          </a>
        </div>
      </div>
    );
  }

};
