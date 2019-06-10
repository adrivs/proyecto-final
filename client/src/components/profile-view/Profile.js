import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({
    getProfileById,
    deleteAccount,
    profile: { profile, loading },
    auth
}) => {
    useEffect(() => {
        getProfileById(profile.user._id);
    }, [getProfileById, profile.user._id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className='container profile-view'>
                    <h2 className='name-profile'>{profile.user.name}</h2>
                    <p className='bio-profile'>{profile.bio}</p>
                    {profile.languages.join(', ')}
                    <p className='location-profile'>{profile.location}</p>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link
                                className='btn btn-sm btn-clover'
                                to='/edit-profile'
                            >
                                <span>Edit profile</span>
                            </Link>
                        )}
                    <button
                        className='btn btn-sm btn-danger'
                        onClick={() => deleteAccount()}
                    >
                        Delete account
                    </button>
                </div>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getProfileById, deleteAccount }
)(Profile);
