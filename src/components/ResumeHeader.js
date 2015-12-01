import React, {PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';

export default class ResumeHeader extends React.Component {
  static propTypes = {
    body: PropTypes.string
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  render() {

  const userInput = this.context.store.getState().userFormReducer;

  const styles = {
    name: {
      fontWeight: '700',
      fontSize: '28px',
      textAlign: 'center',
      marginLeft: '10px'
    },
    email: {
      color: 'blue',
      fontSize: '16px',
      marginLeft: '10px'

    },
    phone: {
      fontSize: '16px',
      marginLeft: '10px'
    },
    city: {
      marginLeft: '10px'
    },
    url: {
      textAlign: 'right',
      marginRight: '10px'
    }
  }

    return (
      <div>
        <Paper zDepth={1}>
          <div style={styles.name}>
            {userInput.name}
          </div>
          <div style={styles.email}>
            {userInput.email}
          </div>
          <div style={styles.phone}>
            {userInput.phone}
          </div>
          <div style={styles.city}>
            {userInput.city}, {userInput.state}
          </div>
          <div style={styles.url}>
            {userInput.linkedinUrl}
          </div>
          <div style={styles.url}>
            {userInput.githubUrl}
          </div>
        </Paper>
      </div>
    )
  }
}
