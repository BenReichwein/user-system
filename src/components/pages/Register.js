import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../actions';
import AuthForm from '../forms/AuthForm';

class Register extends Component {
  onSubmit = async formValues => {
    await this.props.register(formValues);
  };

  render() {
    return (
      <div>
        <h3>Register below! {this.props.auth}</h3>
        <AuthForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(
  null,
  { register }
)(Register);
