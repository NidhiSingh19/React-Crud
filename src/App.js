// Importing React.
import React from 'react';

// Importing components.
import UserTable from './components/UserTable';
import Navbar from './components/Navbar';
import UserDetails from './components/UserDetails';

// Importing Route.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/userdetails/:userId" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

