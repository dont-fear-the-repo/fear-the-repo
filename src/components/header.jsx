import React from 'react';
import { Link } from 'react-router';

import { FlatButton, RaisedButton } from 'material-ui/lib';

export class Header extends React.Component {

  render () {
    return (
      <div>
        <div className='header'>
          <Link to='/' style={{marginLeft: '30px'}}>Fear the Repo</Link>
          <Link to='/userform'>
            <FlatButton label='User Info' />
          </Link>
          <Link to='/resume'>
            <FlatButton label='Edit Resume' />
          </Link>
          <FlatButton label='export' />



          <RaisedButton style={{float: 'right', marginRight: '30px'}} label='Login' />
        </div>
      </div>
    );
  }

};


/***************************************************
*******     Useful code for the future      ********


// TO CREATE A POP-UP DIALOG (for Auth maybe?)
let customActions = [
  <FlatButton
    label="Cancel"
    secondary={true}
    onTouchTap={this._handleCustomDialogCancel} />,
  <FlatButton
    label="Submit"
    primary={true}
    onTouchTap={this._handleCustomDialogSubmit} />
];

<Dialog
  title="Dialog With Custom Actions"
  actions={customActions}
  open={this.state.showDialogCustomActions}
  onRequestClose={this._handleRequestClose}>
  The actions in this window were passed in as an array of react objects.
</Dialog>


// FOR RESPONSIVE DESIGN FOR MOBILE
  // replace the header with a Toolbar from Material-ui

// POTENTIALLY ALSO USEFUL:
  // Dropdown Menu
  // Popover (maybe instead of the dialog for auth?)
  // Refresh Indicator
  // Tabs?




  */