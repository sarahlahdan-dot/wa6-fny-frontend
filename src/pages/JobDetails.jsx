import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'

function JobDetails({ user }) {

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [coverNote, setCoverNote] = useState('')

  async function getJob() {
    try {
      const token = localStorage.getItem('token')
      const oneJob = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      
      setJob(oneJob.data)
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getJob()
  }, [])

  async function handleApply(event) {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post( `${import.meta.env.VITE_BACKEND_URL}/applications/${id}/apply`, { coverNote }, { headers: { Authorization: `Bearer ${token}` } })

      navigate('/applications')

    } 
    catch (err) {
      console.log(err)
    }
  }

  if (!job) return <h2>Loading...</h2>

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company} · {job.location} · {job.jobType}</p>
      <p>{job.description}</p>

      {job.matchScore !== undefined && (
        <>
          <h3>Your Match: {job.matchScore}%</h3>
          <div>
            <h4>Skills you have:</h4>
            {job.matchedSkills?.map(skill => (
              <span key={skill} className='skill-tag matched'>{skill}</span>
            ))}
          </div>
          <div>
            <h4>Skills you're missing:</h4>
            {job.missingSkills?.length > 0
              ? job.missingSkills.map(skill => (
                  <span key={skill} className='skill-tag missing'>{skill}</span>
                ))
              : <p>None — you have all the required skills!</p>
            }
          </div>
        </>
      )}
   
      {user.role === 'seeker' && (
        job.alreadyApplied ? (
          <p>You already applied to this job.</p>
        ) : (
          <form onSubmit={handleApply}>
            <label htmlFor='coverNote'>Cover Note:</label>
            <textarea
              name='coverNote'
              value={coverNote}
              onChange={e => setCoverNote(e.target.value)}
              placeholder='Tell them why you are a great fit...'
            />
            <button type='submit'>Apply Now</button>
          </form>
        )
      )}
    </div>
  )
}

export default JobDetails
