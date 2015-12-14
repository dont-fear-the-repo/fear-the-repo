import React from 'react';
import { Link as RouterLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';
import Radium from 'radium';
import { Scroll, Link, Element, Events } from 'react-scroll';

import { FlatButton, Paper } from 'material-ui/lib';
import { styles } from 'styles/HomeViewStyles';


const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(counterActions, dispatch)
});

@Radium
class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  render() {
    return (
      <div className='landing main-body'
           style={styles.mainBody}>

        <div style={styles.heroDiv}>
          <img src={require('styles/assets/splash3.png')}
             style={styles.heroImg} draggable='false' />

          <div style={styles.heroText}>
            a simple, intuitive, <br/>drag-and-drop resume builder
          </div>

          {Radium.getState(this.state, 'callToAction', 'hover')}
          <RouterLink to='/resume'>
            <div style={styles.callToAction} key='callToAction'>
              get started
            </div>
          </RouterLink>

             {Radium.getState(this.state, 'circle', 'hover')}
             <Link to='Features' spy={true} smooth={true} duration={800}>
               <div style={styles.circle} key='circle'>
                 <img src={require('styles/assets/downArrow.png')}
                   style={styles.downArrow} />
               </div>
             </Link>

          <div style={styles.diagonalLine}></div>

         </div>

          <div style={styles.grayDivMiddle}>

            <div style={styles.copy}>
              <Element name='Features'>
                <div style={styles.wysiwyg}>what you see is what you get</div>

                <div style={styles.video}>
                  <p style={{ paddingTop: '120px' }}>[insert video here]<br/>500x281vimeo<br/>default embed dimensions</p>
                </div>

              </Element>

              <div style={styles.middleCopy}>
                <div>Import your information from LinkedIn</div>
                <div>Save your progress to the cloud</div>
                <div>Easily print or export to PDF when you're done</div>
              </div>

              <RouterLink to='/resume'>
                <div style={styles.getStartedButton}>
                  get started
                </div>
              </RouterLink>

            </div>

          </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

/* Here lies the counter. It was a good counter; it incremented when clicked.
But it was more than just a simple counter. It was a window into another world;
a stateful lighthouse to our souls. The counter is dead. Long live the counter!

<div style={{ margin: '20px' }}>
  <div style={{ margin: '5px' }}>
    For no reason, a counter: {this.props.counter}
  </div>
  <RaisedButton label='Increment'
                onClick={this.props.actions.increment} />
</div>
*/
