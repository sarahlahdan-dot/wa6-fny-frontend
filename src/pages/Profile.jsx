import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import SkillPicker from '../components/SkillPicker'




function Profile({user}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    company: '',
    skills: []
  })
  async function getProfile(){
  try{ 
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setFormData({
      bio: res.data.bio || '',
      location: res.data.location || '',
      company: res.data.company || '',
      skills: res.data.skills || []
    })

  }
  catch(err){
    console.log(err)}
  
  }

  useEffect(() =>{
    getProfile()
  },[])

  function handleChange(event){
    setFormData({...formData, [event.target.name]: event.target.value })
  }

  function handleSkillsChange(newSkills){
    setFormData({...formData, skills: newSkills})
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const token = localStorage.getItem('token')
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      navigate(user.role === 'seeker' ? '/jobs' : '/dashboard')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Edit your Profile</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell employers about yourself..." />

        <label htmlFor="location">Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} />

        {user.role === 'employer' && (
          <>
            <label htmlFor="company">Company Name:</label>
            <input name="company" value={formData.company} onChange={handleChange} />

          </>
        )}

        {user.role === 'seeker' && (
          <>
            <label>Your Skills:</label>
            <p>Select the skills you are confident in.</p>
            <SkillPicker selectedSkills={formData.skills} onChange={handleSkillsChange}/>
          </>
        )}


      <button type='submit'>Save Changes</button>

      </form>

    </div>
  )
}

export default Profile
