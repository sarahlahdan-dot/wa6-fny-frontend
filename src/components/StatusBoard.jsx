const COLUMNS = ['Applied','Reviewing','Accepted','Rejected']

function StatusBoard({ applications = [], onWithdraw }) {
  // GATHER APPLICATION BY STATUS

  function getByStatus(status) {
    return applications.filter((app) => app.status === status)
  }
  return (
    <div className='status-board'>
        {COLUMNS.map(status => (
            <div key={status} className='status-column'>
              <h3>{status} ({getByStatus(status).length})</h3>

              {getByStatus(status).map(app => (
                <div key={app._id} className='status-card'>
                    <h4>{app.job.title}</h4>
                    <p>{app.job.company}</p>
                    <p>{app.job.location} • {app.job.jobType}</p>
                    <span className='match-score-small'>{app.matchScore}% match</span>

                    {/* only show withdraw on Applied — no point withdrawing from Accepted/Rejected */}
                    {app.status === 'Applied' && (
                      <button onClick={() => onWithdraw(app._id)}>Withdraw</button>
                    )}

                </div>
              ))}

              {getByStatus(status).length === 0 && (
                <p className='empty-column'>Nothing here</p>
              )}

            </div>
        ))}
      
    </div>
  )
}

export default StatusBoard
