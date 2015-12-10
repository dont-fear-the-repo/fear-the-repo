import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';

import { FlatButton, Paper } from 'material-ui/lib';
import { styles } from 'styles/HomeViewStyles';


const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(counterActions, dispatch)
});

class HomeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number
  }

  render() {
    return (
      <div className='landing main-body'
           style={styles.mainBody}>

        <img src={require('styles/assets/splash3.png')}
             style={styles.heroImg} />

        <div style={styles.copy}>

          <div style={styles.grayDivTop}>


          </div>

          <div style={styles.whiteDiv}>

            <div style={styles.topCopy}>
              <div>What-You-See-Is-What-You-Get.</div>
              <div>Drag-and-drop.</div>
              <div>See exactly what your printed resume looks like as you edit.</div>
            </div>

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

            <Link to='/resume'>
              <Paper style={styles.buttonPaper}>
                <FlatButton label="Let's get started!"
                            style={styles.button}
                            backgroundColor={styles.buttonColor}
                            labelStyle={styles.buttonLabelStyle} />
              </Paper>
            </Link>
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
