import React from 'react';
import { connect } from 'react-redux';
import { getUsersPosts } from '../../actions';

class UserProfile extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getUsersPosts(id);
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
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => {
    return {posts: state.post}
};

export default connect(
  mapStateToProps,
  { getUsersPosts }
)(UserProfile);