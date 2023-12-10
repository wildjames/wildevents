import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import EventCreationPage from './pages/EventCreationPage';
import EventMainPage from './pages/EventMainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EventMainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/create_event" element={<EventCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
