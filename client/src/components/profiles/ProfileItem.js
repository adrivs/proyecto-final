import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar }
    },
    location
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} className='round-img' />
            <div>
                <h3>{name}</h3>
                <p>{location}</p>
            </div>
        </div>
    );
};

ProfileItem.propTypes = {};

export default ProfileItem;
