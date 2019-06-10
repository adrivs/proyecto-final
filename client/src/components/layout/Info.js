import React from 'react';

const Info = props => {
    return (
        <div className='info-section-landing'>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
        </div>
    );
};

export default Info;
