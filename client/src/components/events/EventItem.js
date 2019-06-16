import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { takeOffEvent, joinEvent, deleteEvent } from '../../actions/event';

const EventItem = ({
    auth,
    takeOffEvent,
    joinEvent,
    deleteEvent,
    event: { _id, title, date, location, language, user, usersAttending }
}) => {
    useEffect(() => {
        getLatLang();
        setViewport({
            ...viewport,
            width: window.innerWidth < 761 ? 300 : 500
        });
    }, []);

    const [viewport, setViewport] = useState({
        width: null,
        height: 230,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 13
    });

    const getLatLang = async () => {
        try {
            const res = await axios.get(`/events/${_id}/latlang`);
            const latLon = [res.data[0].lat, res.data[0].lon];
            setViewport({
                ...viewport,
                latitude: parseFloat(res.data[0].lat),
                longitude: parseFloat(res.data[0].lon)
            });
            return latLon;
        } catch (err) {
            console.error(err.message);
        }
    };

    const changeWidth = () => {
        if (window.innerWidth <= 760) {
            setViewport({
                ...viewport,
                width: 250
            });
        } else {
            setViewport({
                ...viewport,
                width: 500
            });
        }
    };

    const TOKEN =
        'pk.eyJ1IjoiYWRyaXZzIiwiYSI6ImNqbnVmMmJqYjB2cnozcHM1Y2o4dHc4Z3QifQ.FibwG1DRrJ2LTDQfAcy99A';

    return (
        <div>
            <hr />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4'>
                        <p>
                            <strong>Title:</strong> {title}
                        </p>
                        <p>
                            <strong>Date: </strong>
                            <Moment format='YYYY-MM-DD HH:mm'>{date}</Moment>
                        </p>
                        <p>
                            <strong>Location:</strong> {location}
                        </p>
                        <p>
                            <strong>Language:</strong> {language}
                        </p>
                        <p>
                            <strong>Users attending:</strong>{' '}
                            {usersAttending.length}
                            {/* {usersAttending.map(u => {
                        return <span>{u.user}</span>;
                    })} */}
                        </p>
                    </div>
                    <div className='col-lg-8 map-div'>
                        <ReactMapGL
                            width={viewport.width}
                            height={viewport.height}
                            latitude={viewport.latitude}
                            longitude={viewport.longitude}
                            zoom={viewport.zoom}
                            mapboxApiAccessToken={TOKEN}
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className='attending set-buttons'>
                    <button
                        onClick={e => joinEvent(_id)}
                        className='btn btn-sm btn-clover btn-join'
                    >
                        <span>Join</span>
                    </button>
                    <button
                        onClick={e => takeOffEvent(_id)}
                        className='btn btn-sm btn-clover btn-take-off'
                    >
                        <span>Take off</span>
                    </button>
                </div>
                {!auth.loading && user === auth.user._id && (
                    <button
                        onClick={e => deleteEvent(_id)}
                        className='btn btn-sm btn-danger'
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

EventItem.propTypes = {
    event: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { joinEvent, takeOffEvent, deleteEvent }
)(EventItem);
