import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../App.css';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <div className='container register-container'>
                <br />
                <h2>Create an account</h2>
                <br />
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <label>Full Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
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
                        />
                    </div>
                    <div className='form-group'>
                        <label>Confirm your password</label>
                        <input
                            type='password'
                            className='form-control'
                            name='password2'
                            id='password2'
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary btn-clover'
                    >
                        Create
                    </button>
                </form>
                <br />
                <p>
                    Already have an account? <Link to='/login'>Log In</Link>
                </p>
            </div>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
