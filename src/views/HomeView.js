import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';
import Radium from 'radium';
import { Scroll, Link, Element, Events } from 'react-scroll';

import { RaisedButton } from 'material-ui/lib';
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
             style={styles.heroImg} />

          {Radium.getState(this.state, 'circle', 'hover')}
          <Link to='AboutUs' spy={true} smooth={true} duration={600}>
            <div style={styles.circle} key='circle'>
              <img src={require('styles/assets/downArrow.png')}
                style={styles.downArrow} />
            </div>
          </Link>

        </div>

        <Element name='AboutUs' style={styles.copy}>
          Simple, intuitive, drag-and-drop resume builder to easily create and export beautiful resumes. Focus on your content, not on your margins.           Simple, intuitive, drag-and-drop resume builder to easily create and export beautiful resumes. Focus on your content, not on your margins.           Simple, intuitive, drag-and-drop resume builder to easily create and export beautiful resumes. Focus on your content, not on your margins.
        </Element>

      </div>
    );
  }
}

//// Long live the counter; a lighthouse to our souls for how to use state
// <div style={{ margin: '20px' }}>
//   <div style={{ margin: '5px' }}>
//     For no reason, a counter: {this.props.counter}
//   </div>
//   <RaisedButton label='Increment'
//                 onClick={this.props.actions.increment} />
// </div>

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
