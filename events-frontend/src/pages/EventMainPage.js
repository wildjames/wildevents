import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EventMainPage() {
    let navigate = useNavigate();

    // On load, check for access token in local storage
    // If not found, redirect to login page
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // Redirect to login page
            navigate('/login');
        }

        console.log("EventMainPage: accessToken:", accessToken);
        // TODO: Check if access token is valid
    }, []);

    return (
        <div>
            <h1>Event Main Page</h1>
            <h3>Links:</h3>
            <div>
                <Link to="/create_event">Create Event</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/logout">Logout</Link>
            </div>
            // Then, have a calendar view of events
        </div>
    );
}

export default EventMainPage;