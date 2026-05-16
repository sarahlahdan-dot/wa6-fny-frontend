import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    if (!import.meta.env.VITE_BACKEND_URL) {
      setErrorMessage('Missing backend URL: set VITE_BACKEND_URL in .env')
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, formData);
      navigate('/sign-in');
    } catch (err) {
      setErrorMessage(err.response?.data?.err || 'Signup failed. Check your backend connection.')
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Create an Account</h1>
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