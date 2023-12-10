import React, { useState } from 'react';


function LogoutPage() {
    const [error, setError] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            // Remove access token from local storage
            localStorage.removeItem('accessToken');
            // Redirect to login page
            window.location.href = '/login';
        } catch (err) {
            setError('Logout failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    );
}

export default LogoutPage;