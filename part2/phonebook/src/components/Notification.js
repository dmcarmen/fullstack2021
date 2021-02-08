import react from 'react'

const Notification = ({ msg, msgType }) => {
    if (msg === null) {
      return null
    }
  
    return (
      <div className={msgType}>
        {msg}
      </div>
    )
  }

export default Notification
