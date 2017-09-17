import React, { Component } from 'react';

class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <li className="Account">
        {this.props.data.address} : 
        {this.props.data.balance}
      </li>
    );
  }
}

export default Account;

