import { useState, useEffect } from 'react'
import axios from 'axios'
import StatusBoard from '../components/StatusBoard'

function Applications() {
  const [applications, setApplications] = useState([])

  async function getMyApplications(){
      try{
        const token = localStorage.getItem('token')
        const myApplications = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/applications/mine`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setApplications(myApplications.data)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
      getMyApplications()
    }, [])

    async function handleWithDraw(applicationId){
      try{
        const token = localStorage.getItem('token')
        const confirmed = window.confirm('Withdraw this application?')
        if (!confirmed) return
        
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/applications/${applicationId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )

          setApplications(applications.filter(app => app._id !== applicationId))
        
      }
      catch(err){
        console.log(err)
      }
    }
  
  return (
    <div className="applications-page">
      <h1>My Applications</h1>
      {applications.length === 0
        ? <p>You haven't applied to any jobs yet.</p>
        : <StatusBoard applications={applications} onWithdraw={handleWithDraw} />
         }
      
    </div>
  )
}

export default Applications
