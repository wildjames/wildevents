import React from 'react';


function LogoutButton() {
    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            // Remove access token from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            console.debug("Logged out successfully");
        } catch (err) {
            console.error('Logout failed. Please try again.');
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

export default LogoutButton;