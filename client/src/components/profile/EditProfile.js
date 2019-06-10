import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    history,
    getCurrentProfile
}) => {
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        languages: []
    });

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            languages:
                loading || !profile.languages ? '' : profile.languages.join(',')
        });
    }, [getCurrentProfile, loading]);

    const { location, bio, languages } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return (
        <Fragment>
            <div className=' container profile-container'>
                <h2>Edit profile</h2>
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
                                    className='textarea-profile'
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
                        Edit
                    </button>
                    <Link to={`/dashboard`} className='btn btn-light'>
                        Go back
                    </Link>
                </form>
            </div>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
