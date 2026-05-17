import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import SkillPicker from '../components/SkillPicker'

function ProfileSetup({ user, setUser }) {

  const navigate = useNavigate()

   const [formData, setFormData] = useState({
    bio: '',
    location: '',
    companyName: '',
    skills: []
  })
  
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value }) 
  }

  function handleSkillsChange(newSkills) {
    setFormData({ ...formData, skills: newSkills })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put( `${import.meta.env.VITE_BACKEND_URL}/users/profile`,formData, { headers: { Authorization: `Bearer ${token}` } })

      if (user.role === 'seeker') navigate('/jobs')
      else navigate('/dashboard')
    } 
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Set Up Your Profile</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor='bio'>Bio:</label>
        <input name='bio' value={formData.bio} onChange={handleChange} />

        <label htmlFor='location'>Location:</label>
        <input name='location' value={formData.location} onChange={handleChange} />

        {user.role === 'employer' && (
          <>
            <label htmlFor='companyName'>Company Name:</label>
            <input name='companyName' value={formData.companyName} onChange={handleChange} />
          </>
        )}

        {user.role === 'seeker' && (
          <>
            <label>Your Skills:</label>
            <SkillPicker selectedSkills={formData.skills} onChange={handleSkillsChange} />
          </>
        )}

        <button type='submit'>Save & Continue</button>
      </form>
    </div>
  )
}

export default ProfileSetup
