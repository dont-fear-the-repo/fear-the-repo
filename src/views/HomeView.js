import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import counterActions from 'actions/counter';

import { RaisedButton } from 'material-ui/lib';
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

        <img src={require('styles/assets/writing-resume.jpg')}
             style={styles.heroImg} />

        <div style={styles.heroDiv}>
          <div style={{ height: '1px' }} />
          <div style={styles.mainTitle}>
            [insert app name here]
          </div>

          <p style={styles.tagline}>
            An easy, intuitive, drag-and-drop resume builder
          </p>
        </div>

        <div style={styles.copy}>
          [insert copy talking about WYSIWYG, the user, how we solve their needs, how our app is the best, yada yada yada]
        </div>


        <div style={{ margin: '20px' }}>
          <div style={{ margin: '5px' }}>
            For no reason, a counter: {this.props.counter}
          </div>
          <RaisedButton label='Increment'
                        onClick={this.props.actions.increment} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
