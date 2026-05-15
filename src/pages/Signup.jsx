import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seeker'
  })



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event){
    event.preventDefault()

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, formData);
      navigate('/sign-in');
    } catch (err) {
      setErrorMessage(err.response?.data?.err || 'An error occurred during sign up');
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name='username' value={formData.username} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input name='email' value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input name='password' value={formData.password} onChange={handleChange} />

        <label>I am a:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type='submit'>Sign Up</button>

         
      </form>
      </div>
     
  )
}

export default Signup;