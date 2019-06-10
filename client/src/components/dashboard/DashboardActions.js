import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div>
            <Link className='btn btn-sm btn-clover' to='/edit-profile'>
                <span>Edit Profile</span>
            </Link>
        </div>
    );
};

export default DashboardActions;
