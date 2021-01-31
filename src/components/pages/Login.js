import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions';
import AuthForm from '../forms/AuthForm';

class Login extends Component {
  onSubmit = async formValues => {
    await this.props.login(formValues);
  };

  render() {
    return (
      <div>
        <h3>Login below! {this.props.auth}</h3>
        <AuthForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(
  null,
  { login }
)(Login);
