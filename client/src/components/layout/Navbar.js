import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          User
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Medical History
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li><a onClick={logout} href="/">
        <i className="fas fa-sign-out-al"></i>{' '}
        <span className="hide-sm">Logout</span></a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li><Link to="/profiles">User Profiles</Link></li>

      <li>
        <Link to="/adminDashboard"><i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>

      <li><a onClick={logout} href="/"><i className="fas fa-sign-out-al"></i>{' '}
        <span className="hide-sm">Logout</span></a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
        <li><Link to="/profiles" style={{ color: '#fff', background: '#17a2b8'}}>Profiles</Link></li>
        <li><Link to="/register" style={{ color: '#fff', background: '#17a2b8'}}>User Registration</Link></li>
        <li><Link to="/login" style={{ color: '#fff', background: '#17a2b8'}}>User Login</Link></li>
        <li><Link to="/adminLogin">Admin Login</Link></li>
      </ul>
  );

    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Home
        </Link>
      </h1>
      {/* { !loading && user !== null ? (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) : (
        <Fragment> { adminLinks } </Fragment>
      ) } */}

      { !loading && isAuthenticated ? 
        (
          <Fragment>{ user ? authLinks : adminLinks }</Fragment>
        ) : 
        (
          <Fragment>{guestLinks}</Fragment>
        )
      }
    </nav>
    );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
