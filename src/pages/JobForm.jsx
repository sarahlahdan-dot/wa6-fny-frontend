import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import SkillPicker from '../components/SkillPicker'

//  THIS IS FOR HANDLING TWO PATH /:ID/EDIT AND /JOBS/NEW 
function JobForm() {
  
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    skillsRequired: [],
    jobType: 'full-time',
    location: '',
    isOpen: true
  })

  //gets the logged-in user’s token sends it to the backend, 
  // asks for a specific job using its ID. 
  // The backend checks the token and returns the job data if the user is authorized.

  async function getJob(){
    try{

      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`,
        { headers: {Authorization: `Bearer ${token}` } }
      )
      setFormData({
        title: res.data.title,
        company: res.data.company,
        description: res.data.description,
        skillsRequired: res.data.skillsRequired,
        jobType: res.data.jobType,
        location: res.data.location,
        isOpen: res.data.isOpen
      })

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if (id) getJob()},[id])
  
  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData({ ...formData, [event.target.name]: value })
  }

  function handleSkillsChange(newSkills){
    setFormData({...formData, skillsRequired: newSkills})
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const token = localStorage.getItem('token')
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`,formData,
          { headers: { Authorization: `Bearer ${token}`}}
        )

      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/jobs`,
          formData,
          { headers: { Authorization: `Bearer ${token}`}}
        )
      }
      navigate('/dashboard')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="job-form-page">
      <h1>{id ? 'Edit The Job' : 'Post a New Job'}</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Job Title:</label>
        <input name='title' value={formData.title} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}/>

        <label htmlFor="location">Location</label>
        <input name='location' value={formData.location} onChange={handleChange} />

        <label htmlFor="jobType">Job Type:</label>
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>

        <label>Skills Required:</label>
        <SkillPicker selectedSkills={formData.skillsRequired} onChange={handleSkillsChange}/>
        <div className='selected-skills-row'>

          {/*This section conditionally renders the selected skills. If there are skills in formData.skillsRequired, it maps over them and displays each skill in a span with the classes 'skill-tag' and 'selected'. If there are no skills selected, it displays a message saying "No skills selected yet." */}
          {formData.skillsRequired.length > 0 ? (
            formData.skillsRequired.map(skill => (
              <span key={skill} className='skill-tag selected'>{skill}</span>
            ))
          ) : (
            <p>No skills selected yet.</p>
          )}
        </div>
        {/* only show when editing — lets employer close/reopen the job */}
        {id && (
          <>
            <label htmlFor='isOpen'>Job is open:</label>
            <input type='checkbox' name='isOpen' checked={formData.isOpen} onChange={handleChange} />
          </>
        )}

      <button type='submit'>{id ? 'save changes' : 'Post Job'}</button>
      <button type='button' onClick={()=> navigate('/dashboard')}>Cancel</button>

        
      </form>
      
    </div>
  )
}

export default JobForm
