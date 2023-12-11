import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import LogoutButton from '../components/LogoutButton';
import { fetchEvents } from '../api/events';


function EventMainPage() {
    const [events, setEvents] = useState([]);

    const localizer = momentLocalizer(moment);

    useEffect(() => {
        fetchEvents().then(data => {
            // Transform the event data into the format expected by the calendar
            const calendarEvents = data.map(event => ({
                title: event.name,
                start: new Date(event.date_time),
                end: new Date(new Date(event.date_time).getTime() + parseDuration(event.duration)),
                allDay: false
            }));
            setEvents(calendarEvents);
        });
    }, []);

    // Helper function to convert duration string to milliseconds
    const parseDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return ((hours * 60 + minutes) * 60 + seconds) * 1000;
    };

    return (
        <div>
            <h1>Event Main Page</h1>
            <h3>Links:</h3>
            <div><Link to="/create_event">Create Event</Link></div>
            <div><Link to="/login">Login</Link></div>

            <LogoutButton />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default EventMainPage;
