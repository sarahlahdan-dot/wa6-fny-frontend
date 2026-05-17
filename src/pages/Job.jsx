import { useState, useEffect } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'

function Job() {
  const [jobs, setJobs] = useState([])

  async function getAllJobs() {
    try {
      const token = localStorage.getItem('token')
      jobs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jobs`, { headers: { Authorization: `Bearer ${token}` } })
      setJobs(jobs.data)
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllJobs()
  }, [])

  return (
    <div>
      <h1>Jobs For You</h1>
      {jobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
      {jobs.length === 0 && <p>No jobs available right now.</p>}
    
    </div>
  )
}

export default Job
