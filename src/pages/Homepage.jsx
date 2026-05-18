import { useNavigate } from "react-router"

function Homepage({user}) {
  const navigate = useNavigate()

  return (
    <div className="homepage">
      <h1>وظفني · Wa6'fny</h1>
      <p className="tagline">  Bahrain 's AI-powered platform matching job seekers with the right opportunities.</p>
      <p className='homepage-description'> Built specifically for Bahrain 's job market to help seekers and employers connect more efficiently.</p>
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