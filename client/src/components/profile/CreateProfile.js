import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { /*Link */ withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        languages: []
    });

    const { location, bio, languages } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <div className=' container  profile-container'>
                <h2>Create profile</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='form-group'>
                                <label>Biography</label> <br />
                                <textarea
                                    required
                                    cols='50'
                                    rows='5'
                                    name='bio'
                                    value={bio}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='form-group'>
                                <label>City where you live</label>
                                <br />
                                <input
                                    required
                                    name='location'
                                    value={location}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>
                                    Introduce your favourites languages
                                </label>
                                <br />
                                <input
                                    type='text'
                                    name='languages'
                                    value={languages}
                                    onChange={e => onChange(e)}
                                />
                                <small className='form-text'>
                                    Please use comma separated values (eg.
                                    Spanish, Swedish, Polish)
                                </small>
                            </div>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='btn btn-primary btn-clover'
                    >
                        Create
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(
    null,
    { createProfile }
)(withRouter(CreateProfile));
