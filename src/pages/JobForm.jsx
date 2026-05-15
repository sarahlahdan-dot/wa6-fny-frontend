import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import skillPicker from '../components/SkillPicker'

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

  async function getJob(){
    try{

      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`,
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
  
  function handleChange(event){
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData({...formData, skillsRequired: newSkills })
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
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`,formData,
          { headers: { Authorization: `Bearer ${token}`}}
        )

      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs`,
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
    <div>
      <h1>{id ? 'Edit The Job' : 'Post a New Job'}</h1>
      <form onSubmit={handleSubmit}>
        
      </form>
      
    </div>
  )
}

export default JobForm
