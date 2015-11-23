import React from 'react';
import { connect } from 'react-redux';

import { RaisedButton } from 'material-ui/lib';

const mapStateToProps = (state) => ({
  showKitten: state.showKitten
});
export class AboutView extends React.Component {

  state = {
    showKitten: false
  }

  handleToggleKitten() {
    this.setState({showKitten: !this.state.showKitten});
  }

  render () {
    const {showKitten} = this.state;
    return (
      <div className='about-page'>
        <div className='team-members'>
          This project was created by
          <a href='http://github.com/AndrewTHuang'> Andrew Huang</a>,
          <a href='http://github.com/melodylu'> Melody Lu</a>,
          <a href='http://github.com/ericsonmichaelj'> Michael Ericson</a>,
          <a href='http://github.com/dangerismycat'> Ryan James</a>, and
          <a href='http://github.com/sujaypatel16'> Sujay Patel</a>.
        </div>
        <div className='davezuko'>
          We built off the wonderful <a href='https://github.com/davezuko/react-redux-starter-kit'>React-Redux starter kit</a> by <a href='https://github.com/davezuko'>David Zukowski</a>.
        </div>

        <div className='kitten'>
          Psst! Would you like to see a kitten?

          <RaisedButton className={'kitten button' + (showKitten ? 'nope' : 'yep')}
                  style={{marginLeft: 30}}
                  onClick={this.handleToggleKitten.bind(this)}>
            {showKitten ? 'No! I\'m a monster!' : 'Of course!'}</RaisedButton>
        </div>

        {showKitten && <div><img src={require('styles/assets/kitten.jpg')}/></div>}

      </div>
    );
  }

}

export default connect(mapStateToProps)(AboutView);

// TODO: this seems like bad style, to declare and update the state on this view. Should this be refactored to use Actions?
