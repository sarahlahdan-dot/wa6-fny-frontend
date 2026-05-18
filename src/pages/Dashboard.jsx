import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'

//  THE DASHBOARD IS FOR THE EMPLOYERS ONLY!
function Dashboard({ user }) {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  async function getMyJobs(){
    try{
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jobs`,
        { headers: {Authorization: `Bearer ${token}` } }
      )
      // this filters only this employer's jobs
      const myJobs = res.data.jobs.filter(job => job.postedBy._id.toString() === user._id.toString())
      setJobs(myJobs)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getMyJobs()
  }, [])

  async function handleDelete(jobId){
    try{
      const token = localStorage.getItem('token')
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/jobs/${jobId}`,
        { headers: {Authorization: `Bearer ${token}` } }
      )
      setJobs(jobs.filter(job => job._id !== jobId))
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div>
        <h1>My Job Postings</h1>
        <button onClick={() => navigate('/jobs/new')}>Post a new Job</button>
        {jobs.map(job => (
          <div key={job._id} className='dashboard-job-row'>
            <h3>{job.title}</h3>
            <p>{job.company} . {job.location} . {job.jobType}</p>
            <p>{job.isOpen ? 'open' : 'closed'}</p>
            <div>
              // The skills required section is conditionally rendered. If there are skills required, it maps over them and displays each skill in a span with the class 'skill-tag'. If there are no specific skills required, it displays a message saying so.
              <strong>Skills Required:</strong>
              {job.skillsRequired?.length > 0 ? (
                <div>
                  {job.skillsRequired.map(skill => (
                    <span key={skill} className='skill-tag'>{skill}</span>
                  ))}
                </div>
              ) : (
                <p>No specific skills required</p>
              )}
            </div>

            <Link to={`/jobs/${job._id}/applicants`}>View Applicants</Link>
            <Link to={`/jobs/${job._id}/edit`}>Edit</Link>
            <button onClick={() => { 
              const confirmed = window.confirm('Delete this job posting?')
              if (confirmed) {
                handleDelete(job._id)
              }
            }}>Delete</button>

          </div>
        ))}
        {jobs.length === 0 && <p>You haven't posted any jobs yet.</p>}
    </div>
  )
}

export default Dashboard