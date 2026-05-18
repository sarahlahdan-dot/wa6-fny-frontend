import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seeker'
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event){
    event.preventDefault()

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, formData);
      navigate('/sign-in')
    } catch (err) {
      console.log(err)
      setErrorMessage(
        err.response?.data?.err || 'Something went wrong'
      )
    }
  }

  return (
    <div>
      <h1>Join Wa6'fny</h1>
      <p> Bahrain's AI-powered job matching platform</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">I am a:</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type='submit'>Sign Up</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      </div>
     
  )
}

export default Signup;