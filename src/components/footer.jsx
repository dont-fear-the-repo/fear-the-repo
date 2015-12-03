import React from 'react';
import { Link } from 'react-router';

import { FlatButton, FontIcon } from 'material-ui/lib';
import { styles } from 'styles/footerStyles';


export class Footer extends React.Component {

  render() {
    const githubIcon = require('styles/assets/github-icon-dark.png');

    return (
      <div>
        <div className='footer'
             style={styles.wholeComponent}>

          <Link to='/about'>
            <FlatButton label='About Us' />
          </Link>

          <a href='https://github.com/dont-fear-the-repo/fear-the-repo'>
            <FlatButton label='Check us out on Github' />
            <img src={githubIcon}
                 style={styles.githubIcon} />
          </a>

        </div>
      </div>
    );
  }

};
