import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/post" className="item">
        Post
      </Link>
      <Link to="/admin" className="item">
        Admin
      </Link>
      <div className="right menu">
        <Link to="/register" className="item">
          Register
        </Link>
        <Link to="/login" className="item">
          Login
        </Link>
        <Link to="/profile" className="item">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Header;
