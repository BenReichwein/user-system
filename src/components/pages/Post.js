import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost } from '../../actions';
import PostForm from '../forms/PostForm';

class Post extends React.Component {
    onSubmit = formValues => {
        this.props.createPost(formValues);
    };

    componentDidMount = () => {
        this.props.getPost();
    }

    render() {
        if (this.props.posts.length > 0) {
            return (
                <div>
                    <div>
                        <h3>Post List</h3>
                        <ul>
                            { this.props.posts.map(post =>
                            <li>
                                <label>
                                    {post.title}<br/>
                                    {post.description}<br/>
                                </label>
                                <button>Delete</button>
                                <button onClick={()=> alert(post.user)}>User</button>
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
                <div>Loading...</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {posts: state.post}
}

export default connect(
  mapStateToProps,
  { createPost, getPost }
)(Post);
