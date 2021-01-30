import { connect } from 'react-redux';
import React, { Component } from 'react'
import {loadProfile, updateProfile, logout} from '../../actions'
import AuthForm from '../forms/AuthForm'

class Profile extends Component {
    onSubmit = async formValues => {
        await this.props.updateProfile(formValues);
        this.props.loadProfile()
    };

    componentDidMount = async () => {
        await this.props.loadProfile();
    }

    render() {
        return (
        <div>
            <h3>Email: {this.props.profile.email}</h3>
            <h3>Hashed Password: {this.props.profile.password}</h3>
            <h2>Update Profile below</h2>
            <AuthForm onSubmit={this.onSubmit} />
            <br/>
            <button onClick={()=>this.props.logout()}>Logout</button>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {profile: state.auth}
}

export default connect(mapStateToProps, {loadProfile, updateProfile, logout})(Profile)