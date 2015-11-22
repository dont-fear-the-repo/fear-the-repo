import React from 'react';
import { Header } from 'components/header';
import { Footer } from 'components/footer';
import 'styles/core.scss';


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
        <Footer />
      </div>
    );
  }
}
