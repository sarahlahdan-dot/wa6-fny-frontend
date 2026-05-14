import { Link, useNavigate} from 'react-router'

function Navbar({ user, setUser }) {
  

  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
    
  }

  return (
    <nav>
      {/* Routes seen by everyone */}
      <Link className='nav-item' to='/'>Wa6'fny</Link>

      {user ? (
        <>
          {user.role === 'seeker' && (
            <>
              <Link className='nav-item' to='/jobs'>Browse Jobs</Link>
              <Link className='nav-item' to='/applications'>My Applications</Link>
            </>
          )}

          {user.role === 'employer' && (
            <>
              <Link className='nav-item' to='/dashboard'>Dashboard</Link>
              <Link className='nav-item' to='/jobs/new'>Post a Job</Link>
            </>
          )}

        <Link className='nav-item' to='/profile'>{user.username}</Link>
        <button className='nav-item' onClick={logOut}>Log Out</button>

        </>
      ) :
      (
        <>
        <Link className='nav-item' to='/sign-up'>Sign Up</Link>
        <Link className='nav-item' to='/sign-in'>Sign In</Link>

        </>
      )
      }
    </nav>
  )
}

export default Navbar