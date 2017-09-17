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
      <span className = "address">
        {this.props.data.address} : 
      </span>
      <span className = "balance">
        {this.props.data.balance}
      </span>
      </li>
    );
  }
}

export default Account;

