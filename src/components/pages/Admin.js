import { connect } from 'react-redux';
import React, { Component } from 'react'
import {loadAdmin, deleteAdmin} from '../../actions'

class Admin extends Component {
    componentDidMount() {
        this.props.loadAdmin();
    }
    render() {
        console.log(this.props.admin)
        if (this.props.admin.length > 0) {
            return (
                <div>
                    <h3>Users List</h3>
                    <ul>
                        { this.props.admin.map(user =>
                        <li key={user._id}>
                            <label>
                                {user.email}<br/>
                                {user.password}<br/>
                                {user.createdAt}<br/>
                            </label>
                            <button onClick={()=> this.props.deleteAdmin(user._id)}>Delete</button>
                        </li>
                        )}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <p>There's no users to view...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {admin: state.admin}
}

export default connect(mapStateToProps, {loadAdmin, deleteAdmin})(Admin)