import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../../App.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/events' />;
    }

    return (
        <Fragment>
            <div className='container register-container'>
                <br />
                <h2>Log In</h2>
                <br />
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <label>Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password'
                            id='password'
                            value={password}
                            onChange={e => onChange(e)}
                            required
                            minLength='6'
                        />
                    </div>

                    <button
                        type='submit'
                        className='btn btn-primary btn-clover'
                    >
                        Log In
                    </button>
                </form>
                <br />
                <p>
                    Don't have an account? <Link to='/register'>Sign In</Link>
                </p>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
