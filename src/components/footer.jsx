import React from 'react';
import { Link } from 'react-router';

import { styles } from 'styles/footerStyles';


export class Footer extends React.Component {

  render() {
    const githubIcon = require('styles/assets/github-circle-icon-white.png');

    return (
      <div>
        <div className='footer'
             style={styles.wholeComponent}>

          <Link to='/about'>
            <div style={styles.aboutButton}>
              About Us
            </div>
          </Link>

          <a href='https://github.com/dont-fear-the-repo/fear-the-repo'>
            <div style={styles.githubButton}>
              Check us out on Github
              <img src={githubIcon}
                   style={styles.githubIcon} />
            </div>
          </a>

        </div>
      </div>
    );
  }

};
