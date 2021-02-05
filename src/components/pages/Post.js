import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, deletePost, getUid } from '../../actions';
import PostForm from '../forms/PostForm';

class Post extends React.Component {
    onSubmit = formValues => {
        this.props.createPost(formValues);
    };

    componentDidMount = () => {
        this.props.getPost();
        this.props.getUid();
    }

    render() {
        if (this.props.posts.length > 0) {
            return (
                <div>
                    <div>
                        <h3>Post List</h3>
                        <ul>
                            { this.props.posts.map(post =>
                            <li key={post._id}>
                                <label>
                                    {post.title}<br/>
                                    {post.description}<br/>
                                </label>
                                <button onClick={()=> this.props.deletePost(post._id)} style={post.user === this.props.auth ? {} : {display: 'none'}}>Delete</button>
                                <button onClick={()=> this.props.history.push(`/userProfile/${post.user}`)}>User</button>
                            </li>
                            )}
                        </ul>
                    </div>
                    <br/>
                    <div>
                        <h3>Create a Post</h3>
                        <PostForm onSubmit={this.onSubmit} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>There's no posts to view...</p>
                    <br/>
                    <div>
                        <h3>Create a Post</h3>
                        <PostForm onSubmit={this.onSubmit} />
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post,
        auth: state.auth
    }
}

export default connect(
  mapStateToProps,
  { createPost, getPost, deletePost, getUid }
)(Post);
