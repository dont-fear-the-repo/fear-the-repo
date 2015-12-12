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
              start building your resume now!
            </div>
          </RouterLink>

             {Radium.getState(this.state, 'circle', 'hover')}
             <Link to='Features' spy={true} smooth={true} duration={600}>
               <div style={styles.circle} key='circle'>
                 <img src={require('styles/assets/downArrow.png')}
                   style={styles.downArrow} />
               </div>
             </Link>
         </div>

        <div style={styles.copy}>

          <div style={styles.grayDivTop}>
          </div>

          <div style={styles.whiteDiv}>

            <Element name='Features'>
              <div style={styles.topCopy}>
                <div>What-You-See-Is-What-You-Get.</div>
                <div>Drag-and-drop.</div>
                <div>See exactly what your printed resume will look like as you edit.</div>
              </div>
            </Element>


            <div style={styles.video}>
              <p style={{ paddingTop: '100px' }}>[insert video here]</p>
            </div>

            <div style={styles.middleCopy}>
              <div>Import your information from LinkedIn,</div>
              <div>save your progress to the cloud,</div>
              <div>then easily print or export to PDF when you're done.</div>
            </div>

          </div>

          <div style={styles.grayDivBottom}>
            <div style={styles.bottomCopy}>
              Are you ready for a beautiful new resume?
            </div>

            <RouterLink to='/resume'>
              <Paper style={styles.buttonPaper}>
                <FlatButton label="Let's get started!"
                            style={styles.button}
                            backgroundColor={styles.buttonColor}
                            labelStyle={styles.buttonLabelStyle} />
              </Paper>
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
