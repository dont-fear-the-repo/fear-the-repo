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
    };

    return (
      <div>
        <Paper zDepth={1}>
          <div style={styles.name}>
            Your Name Here
          </div>
          <div style={styles.email}>
            email@website.com
          </div>
          <div style={styles.phone}>
            123-456-7890
          </div>
          <div style={styles.city}>
            San Francisco, CA
          </div>
          <div style={styles.url}>
            linkedin.com/michaeljordan
          </div>
          <div style={styles.url}>
            github.com/number23
          </div>
        </Paper>
      </div>
    );
  }
}
