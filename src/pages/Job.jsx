import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import JobCard from '../components/JobCard'

function Job({ user }) {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  async function getAllJobs() {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jobs`, { headers: { Authorization: `Bearer ${token}` } })
      console.log(res.data)
      setJobs(res.data.jobs)
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!user.profileComplete) {
      navigate('/profile/setup')
      return
    }
    getAllJobs()
  }, [])

  return (
    <div className="jobs-page">
      <h1>Your Best Job Matches</h1>
      {jobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
      {jobs.length === 0 && <p>No jobs available right now.</p>}
    
    </div>
  )
}

export default Job
