import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  
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
    setLoading(false)
  }, []);

  if (loading) return <p>Loading...</p> 

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route path="/sign-up" element={
          !user ? <SignUp /> :
          !user.profileComplete ? <Navigate to='/profile/setup'/> :
          user.role === 'employer' ? <Navigate to='/dashboard'/> :
          <Navigate to='/jobs'/>
        }/>
        <Route path="/sign-in" element={
          !user ? <SignIn setUser={setUser} /> :
          !user.profileComplete ? <Navigate to='/profile/setup'/> :
          user.role === 'employer' ? <Navigate to='/dashboard'/> :
          <Navigate to='/jobs'/>
        }/>     
         <Route path="/dashboard" element={user && user.role === 'employer'? <Dashboard user={user} /> : <Navigate to='/sign-in'/>} />   
        <Route path="/profile/setup" element={user ? <ProfileSetup user={user} setUser={setUser} /> : <Navigate to='/sign-in'/>} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs" element={user ? <Jobs user={user} /> : <Navigate to='/sign-in'/>} />        
        <Route path="/jobs/new" element={user && user.role === 'employer' ? <JobForm /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id" element={user ? <JobDetail user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id/edit" element={user ? <JobForm /> : <Navigate to='/sign-in'/>} />
        <Route path="/jobs/:id/applicants" element={user && user.role === 'employer'? <Applicants /> : <Navigate to='/sign-in'/>} />
        <Route path="/applications" element={user && user.role === 'seeker' ? <Applications /> : <Navigate to='/sign-in'/>} />
      </Routes>
    </div>
  );
}

export default App;