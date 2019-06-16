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
            <div
                id='carouselExampleControls'
                className='carousel slide carousel-opinions '
                data-ride='carousel'
            >
                <h2>Opinions</h2>
                <div className='carousel-inner container'>
                    <div className='carousel-item active'>
                        <div class='card'>
                            <div class='card-body'>
                                <blockquote class='blockquote mb-0'>
                                    <p>
                                        This web is so good. I have made a lot
                                        of new friends and I have improved my
                                        english. I recommend it!
                                    </p>
                                    <footer class='blockquote-footer'>
                                        <cite title='Source Title'>
                                            John Doe
                                        </cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div class='card'>
                            <div class='card-body'>
                                <blockquote class='blockquote mb-0'>
                                    <p>
                                        The platform is awesome. I can visit new
                                        places with people that I don't know and
                                        communicate in the same language.
                                    </p>
                                    <footer class='blockquote-footer'>
                                        <cite title='Source Title'>
                                            Winston Smith
                                        </cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div class='card'>
                            <div class='card-body'>
                                <blockquote class='blockquote mb-0'>
                                    <p>
                                        I have to say that I have met my new
                                        girlfriend because of this web. I'm so
                                        happy with this, use it!
                                    </p>
                                    <footer class='blockquote-footer'>
                                        <cite title='Source Title'>
                                            Fulano Mengano
                                        </cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    className='carousel-control-prev '
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='prev'
                >
                    <span
                        className='carousel-control-prev-icon'
                        aria-hidden='true'
                    />
                    <span className='sr-only'>Previous</span>
                </a>
                <a
                    className='carousel-control-next'
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='next'
                >
                    <span
                        className='carousel-control-next-icon'
                        aria-hidden='true'
                    />
                    <span className='sr-only'>Next</span>
                </a>
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
