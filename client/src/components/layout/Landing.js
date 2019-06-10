import React from 'react';
import Info from './Info';
import Footer from './Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div>
            <div className='first-section-landing'>
                <div className='container main-text-landing'>
                    <h1>
                        Are you new to your city and do <br /> not know anyone?
                    </h1>
                    <p>Meet new people who speaks your same language!</p>
                </div>
            </div>
            <div className=' second-section-landing'>
                <Info
                    title={'Create your account'}
                    text={
                        'It will take less than a minute to have your account'
                    }
                />
                <Info
                    title={'Fill your profile'}
                    text={
                        'Introduce the languages that you talk and where you are living'
                    }
                />
                <Info
                    title={'Find or create an event'}
                    text={
                        'Find or create an event in your city and you will meet new people'
                    }
                />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
