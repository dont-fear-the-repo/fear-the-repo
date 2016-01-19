import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import { styles } from 'styles/footerStyles';


@Radium
export class Footer extends React.Component {

  render() {
    const githubIcon = require('styles/assets/github-circle-icon-white.png');

    return (
      <div>
        <div className='footer'
             style={styles.wholeComponent}>

          {Radium.getState(this.state, 'github', 'hover')}
          <a href='https://github.com/dont-fear-the-repo/fear-the-repo'>
            <div style={styles.githubButton} key='github'>
              Check us out on Github
              <img src={githubIcon}
                   style={styles.githubIcon} />
            </div>
          </a>

        </div>
      </div>
    );
  }

}
