import React, { useEffect } from 'react';
import axios from 'axios';
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

    /// Fetch a list of the events from the backend
    const fetchEvents = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                // Redirect to login page
                navigate('/login');
            }

            const response = await axios.get('http://localhost:8000/api/events/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log('Events fetched successfully:', response.data);
            // Redirect to another page or show success message
        } catch (err) {
            console.error('Failed to fetch events', err);
        }
    }

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
            <div>
                <button onClick={fetchEvents}>Fetch Events</button>
            </div>
        </div>
    );
}

export default EventMainPage;