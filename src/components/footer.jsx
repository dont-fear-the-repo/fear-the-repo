import React from 'react';
import { Link } from 'react-router';

import { FlatButton, FontIcon } from 'material-ui/lib';
import { styles } from 'styles/footerStyles';


export class Footer extends React.Component {

  render() {
    const githubIcon = require('styles/assets/github-circle-icon-white.png');

    return (
      <div>
        <div className='footer'
             style={styles.wholeComponent}>

          <Link to='/about'>
            <FlatButton label='About Us'
                        style={styles.aboutButton}
                        backgroundColor={styles.buttonColor}
                        hoverColor={styles.buttonHoverColor} />
          </Link>

          <a href='https://github.com/dont-fear-the-repo/fear-the-repo'>
            <FlatButton label='Check us out on Github'
                        style={styles.githubButton}
                        backgroundColor={styles.buttonColor}
                        hoverColor={styles.buttonHoverColor} />

            <img src={githubIcon}
                 style={styles.githubIcon} />
          </a>

        </div>
      </div>
    );
  }

};
