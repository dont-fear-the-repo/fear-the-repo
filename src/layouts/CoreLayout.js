import React from 'react';
import {Header} from 'components/header';
import 'styles/core.scss';
console.log(Header);
export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div className='page-container'>
        <Header />
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
