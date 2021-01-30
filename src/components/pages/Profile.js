import { connect } from 'react-redux';
import React, { Component } from 'react'
import {loadProfile} from '../../actions'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
        email : '',
        password: ''
        }
    }

    componentDidMount = async () => {
        await this.props.loadProfile();
        this.setState({
            email: this.props.profile.email,
            password: this.props.profile.password
        })
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
        [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        fetch('/user/update', {
        method: 'PATCH',
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.text())
        .then(res => alert(res))
    }

    logout = () => {
        fetch('/user/logout')
        .then(res => {
        if (res.status === 200) {
            alert('Logged Out')
            this.props.history.push('/')
        } else {
            const error = new Error(res.error);
            throw error;
        }
        })
    }

    render() {
        return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={this.onSubmit}>
            <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
            />
            <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
            />
            <button type="submit" value="Submit">Update</button>
            </form>
            <button onClick={this.logout}>Logout</button>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {profile: state.profile}
}

export default connect(mapStateToProps, {loadProfile})(Profile)