import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events, loading } }) => {
    useEffect(() => {
        getEvents();
    }, []);

    const [searchedEvent, setEvent] = useState({
        eventFiltered: ''
    });

    const { eventFiltered } = searchedEvent;

    // const [IAttend, checkIAttend] = useState({
    //     iAttend: true
    // });

    // const { iAttend } = IAttend;

    // const [eventsIAttend, setEventsIAttend] = useState({
    //     eventsIAttend: []
    // });

    // const handleEventsIAttend = () => {
    //     setEventsIAttend({eventsIAttend: events.filter(ev => ev.usersAttending.includes())});
    // };

    const handleSearch = e => {
        setEvent({ eventFiltered: e.target.value });
    };

    // const handleCheckbox = e => {
    //     checkIAttend({ iAttend: !e.target.checked });
    // };

    let filteredEvents = events.filter(ev => {
        return (
            ev.location.toLowerCase().includes(eventFiltered.toLowerCase()) ||
            ev.language.toLowerCase().includes(eventFiltered.toLowerCase())
        );
    });

    return loading ? (
        <h2>Loading....</h2>
    ) : (
        <Fragment>
            <div className='container events-container'>
                <div className='row event-search'>
                    <div className='col-lg-2'>
                        <h1 className='large '>Events</h1>
                    </div>
                    <div className='col-lg-3'>
                        <input
                            className='form-control search-events'
                            placeholder='Search...'
                            name='term'
                            value={eventFiltered}
                            onChange={e => handleSearch(e)}
                        />
                    </div>
                </div>
                {/* <div>
                    <label>Show events I am attending &nbsp;</label>
                    <input
                        type='checkbox'
                        name='eventsAttending'
                        checked={!iAttend}
                        onChange={e => handleCheckbox(e)}
                    />
                </div> */}
                <div className='events'>
                    {filteredEvents.map(e => {
                        return <EventItem key={e._id} event={e} />;
                    })}
                </div>
            </div>
        </Fragment>
    );
};

Events.propTypes = {
    getEvents: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
    events: state.events // Línea añadida para ver si funciona lo de que cargue del tirón el componente Events.
});
export default connect(
    mapStateToProps,
    { getEvents }
)(Events);
