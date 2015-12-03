import React from 'react';
import { connect } from 'react-redux';

import { styles } from 'styles/AboutViewStyles';
import { RaisedButton, Paper } from 'material-ui/lib';


const mapStateToProps = (state) => ({
  showKitten: state.showKitten
});
class AboutView extends React.Component {

  state = {
    showKitten: false
  }

  handleToggleKitten() {
    this.setState({showKitten: !this.state.showKitten});
  }

  render() {
    const { showKitten } = this.state;

    return (
      <div className='about-page' style={styles.wholeView}>
        <div className='team-members' style={styles.team}>
          <div style={styles.leadText}>
            This project was created by:
          </div>

          <div style={styles.teamCard}>
            <Paper zDepth={styles.teamCardDepth}>
              <a href='http://github.com/AndrewTHuang'>
                <img src='styles/assets/Andrew-balloon-square.jpg'
                     style={styles.teamImg} />
              Andrew Huang
              </a>
            </Paper>
          </div>

          <div style={styles.teamCard}>
            <Paper zDepth={styles.teamCardDepth}>
              <a href='http://github.com/melodylu'>
                <img src='styles/assets/Melody-hat-square.jpg'
                     style={styles.teamImg} />
              Melody Lu
              </a>
            </Paper>
          </div>

          <div style={styles.teamCard}>
            <Paper zDepth={styles.teamCardDepth}>
              <a href='http://github.com/ericsonmichaelj'>
                <img src='styles/assets/Michael-climbing-square.jpg'
                     style={styles.teamImg} />
              Michael Ericson
              </a>
            </Paper>
          </div>

          <div style={styles.teamCard}>
            <Paper zDepth={styles.teamCardDepth}>
              <a href='http://github.com/dangerismycat'>
                <img src='styles/assets/Ryan-Danger-square.jpg'
                     style={styles.teamImg} />
              Ryan James
              </a>
            </Paper>
          </div>

          <div style={styles.teamCard}>
            <Paper zDepth={styles.teamCardDepth}>
              <a href='http://github.com/sujaypatel16'>
                <img src='styles/assets/Sujay-monopoly-square.jpg'
                     style={styles.teamImg} />
              Sujay Patel
              </a>
            </Paper>
          </div>

        </div>

        <div className='davezuko' style={styles.starterKit}>
          We built off the wonderful <a href='https://github.com/davezuko/react-redux-starter-kit'>React-Redux starter kit</a> by <a href='https://github.com/davezuko'>David Zukowski</a>.
        </div>

        <div className='kitten' style={styles.secretText}>
          Psst! Would you like to see a kitten?

          <RaisedButton className={'kitten button' + (showKitten ? 'nope' : 'yep')}
                        style={styles.kittenButton}
                        onClick={this.handleToggleKitten.bind(this)}>
            {showKitten ? 'No! I\'m a monster!' : 'Of course!'}
          </RaisedButton>
        </div>

        {showKitten &&
          <Paper style={styles.kittenCard}>
            <img src={require('styles/assets/kitten.jpg')} style={styles.kitten}/>
          </Paper>}

      </div>
    );
  }
}

export default connect(mapStateToProps)(AboutView);
