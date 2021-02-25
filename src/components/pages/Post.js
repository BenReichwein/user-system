import React from 'react';
import { connect } from 'react-redux';
import { createPost, getPost, deletePost, createComment, deleteComment, addSaved, getUid } from '../../actions';
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
                                <p>
                                    {post.title}<br/>
                                    {post.description}<br/>
                                    Comments: {
                                        post.comments.length >= 1 ?
                                        post.comments.map(comment =>
                                            <p>
                                                <br/>
                                                {comment.comment}
                                                <button onClick={()=> this.props.history.push(`/userProfile/${comment.commentUid}`)}>User</button>
                                                <button 
                                                onClick={()=> this.props.deleteComment(comment.comment, comment.commentUid, comment.postId)} 
                                                style={
                                                    comment.commentUid === this.props.auth ? {} : {display: 'none'} &&
                                                    comment.postUid === this.props.auth ? {} : {display: 'none'}}>Delete</button>
                                            </p>
                                        )
                                        : <label>No Comments</label>
                                    }
                                </p>
                                <br/>
                                <button onClick={()=> this.props.deletePost(post._id)} style={
                                    post.postUid === this.props.auth ? {} : {display: 'none'}}>Delete</button>
                                <button onClick={()=> this.props.history.push(`/userProfile/${post.postUid}`)}>User</button>
                                <button onClick={()=> this.props.createComment('Test Comment', post.postUid, post._id)}>Add Test Comment</button>
                                <button onClick={()=> this.props.addSaved(post._id)}>Save</button>
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
  { createPost, getPost, deletePost, createComment, deleteComment, addSaved, getUid }
)(Post);
