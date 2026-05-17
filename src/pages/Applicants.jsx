import { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



function Applicants() {
  const { id } = useParams()
  const [applicants, setApplicants] = useState([])
  const [jobTitle, setJobTitle] = useState('')

  //1. GET THE SAVED LOGIN TOKEN 
  //2. SEND GET REQUEST TO THE BACKEND
  //3. BACKEND RETURNS APPLICANTS FOR THE THIS JOB
  //4. SAVES THEM IN THE STATE setApplicants 


  async function getApplicants(){
    try{
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jobs/${id}/applicants`,
        { headers: {Authorization: `Bearer ${token}` } }
      )
      setApplicants(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
// run once when the page loads empty array mean run only on first render

  useEffect(()=>{
    getApplicants()
  },[])


  async function handleStatusChange(applicantionId, newStatus) {
    try{
      const token = localStorage.getItem('token')
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/applications/${applicantionId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      //this will update status without refetching data
      // this here will loop through all the applicants find the one the was updated
      // change only the status of it 

      setApplicants(applicants.map(app =>
        app._id === applicantionId ? {...app, status: newStatus } : app
      ))
    }
    catch(err){
      console.log(err)
    }
  }



  return (
    <div>
      <h1>Applicants</h1>
      <p>Ranked by best match</p>

      {applicants.map(app =>(
        <div key={app._id} className='applicant-row'>
          <h3>{app.applicant.username}</h3>
          <p>{app.applicant.bio}</p>
          <p>Location: {app.applicant.location}</p>

          <div>
            {app.applicant.skills.map(skill => (
              <span key={skill} className='skill-tag'>{skill}</span>
            ))}
          </div>

          <p className='match-score'>{app.matchScore}% match</p>
          <p>Cover note: {app.coverNote || 'None'}</p>
          <label htmlFor="status">Status</label>
          // shows current status and when we change it will call handleStatusChange function with the new status and the application id
          
          <select value={app.status} onChange={e => handleStatusChange(app._id, e.target.value)}>

            <option value="Applied">Applied</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>

          </select>

        </div>
      ))}
      {applicants.length === 0 && <p>No applicants yet!</p>}
    </div>
  )
}

export default Applicants
