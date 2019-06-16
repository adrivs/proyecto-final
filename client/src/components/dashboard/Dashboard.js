import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { getEvents } from '../../actions/event';
import EventForm from '../events/EventForm';
import Profile from '../profile-view/Profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile },
    event: { events },
    loading
}) => {
    /* useEffect(() => {
        getEvents();
    }, [getEvents]); */

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <div className='container'>Loading...</div>
    ) : (
        <div className='container'>
            <div>
                {profile !== null ? (
                    <Fragment>
                        <div className=''>
                            <Profile />
                            <EventForm />
                            <div>{console.log(profile.user._id)}</div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        You have not yet your profile finished, please do it.{' '}
                        <br />
                        <Link to='/create-profile' className=''>
                            Create Profile
                        </Link>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    event: state.event
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, getEvents }
)(Dashboard);
