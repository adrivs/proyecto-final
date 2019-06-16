import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout, loading }) => {
    const authLinks = (
        <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav logs'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/events'>
                        <span>Events</span>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' onClick={logout}>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );

    const guestLinks = (
        <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav logs'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                        <span>Register</span>
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        <span>Login</span>
                    </Link>
                </li>
            </ul>
        </div>
    );

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div>
                    <Link className='navbar-brand' to='/'>
                        <span className='brand-title'>Clover</span>
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>
                </div>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);
