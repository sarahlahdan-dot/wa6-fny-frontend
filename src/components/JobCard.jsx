import React from 'react'
import { Link } from 'react-router-dom'

function JobCard({job}) {

    function matchColor(match){
        if (match >= 70) return 'high-match'
        if (match >= 40) return 'mid-match'
        return 'low-match'
    }
  return (
    <div className='job-card'>
        <div className='job-card-header'>
            <div>
                <h3>{job.title}</h3>
                <p>{job.company} . {job.location}</p>
                <span className='job-type-tag'>{job.jobType}</span>
            </div>
            <div className={`match-score${matchColor(job.matchScore)}`}></div>
            <span>{job.matchScore}%</span>
            <small>match</small>
        </div>
        <div className='skills-row'>
            {job.matchedSkills.map(skill =>(
                <span key={skill} className='skill-tag matched'>{skill}</span>
            ))}
            {job.missingSkills.map(skill => (
                <span key={skill} className='skill-tag missing'>{skill}</span>
            ))}

            <Link to={`/jobs/${job._id}`}>View this job and apply!</Link>

        </div>
    </div>
     
  )
}

export default JobCard
