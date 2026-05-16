import { useNavigate } from "react-router-dom"

function Homepage({user}) {
  const navigate = useNavigate()

  return (
    <div className="homepage">
      <h1>وظفني · Wa6'fny</h1>
      <p className="tagline">Find jobs that actually fit you - based on your skills, not your luck.</p>

      {user ? (
        <>
          {user.role === 'seeker' && (
            <button onClick={() => navigate('/jobs')}> Browse My Matches</button>

          )}
          {user.role === 'employer' &&(
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          )}
      
        </>
      ) : (
        <>
          <button onClick={() => navigate('/sign-up')}>Get started</button>
          <button onClick={() => navigate('/sign-in')}>Sign In</button>

        </>
      )}
    </div>
  )
}

export default Homepage