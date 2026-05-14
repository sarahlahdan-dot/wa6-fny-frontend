import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile';
import Jobs from './pages/Job';
import JobDetail from './pages/JobDetails';
import JobForm from './pages/JobForm';
import Applications from './pages/Applications';
import Applicants from './pages/Applicants';

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/'/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/profile/setup" element={user ? <ProfileSetup user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs" element={user ? <Jobs /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/new" element={user ? <JobForm /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id" element={user ? <JobDetail user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id/edit" element={user ? <JobForm /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id/applicants" element={user ? <Applicants /> : <Navigate to='/sign-in'/>} />
        <Route path="/applications" element={user ? <Applications /> : <Navigate to='/sign-in'/>} />
      </Routes>
    </div>
  );
}

export default App;