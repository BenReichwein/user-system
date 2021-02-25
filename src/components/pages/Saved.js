import React from 'react';
import { connect } from 'react-redux';
import { getSaved, deleteSaved } from '../../actions';

class Saved extends React.Component {

    componentDidMount = () => {
        this.props.getSaved();
    }

    render() {
        if (this.props.posts.length > 0) {
            return (
                <div>
                    <div>
                        <h3>Saved Posts</h3>
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
                                            </p>
                                        )
                                        : <label>No Comments</label>
                                    }
                                </p>
                                <br/>
                                <button onClick={()=> this.props.deleteSaved(post._id)}>Delete</button>
                                <button onClick={()=> this.props.history.push(`/userProfile/${post.postUid}`)}>User</button>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You have no saved posts...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post
    }
}

export default connect(
  mapStateToProps,
  { getSaved, deleteSaved }
)(Saved);
