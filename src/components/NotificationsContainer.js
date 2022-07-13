import React, {useContext} from 'react'
import Snackbar from './Snackbar';

function NotificationsContainer({notifications}) {
    const notificationsList = notifications;

    return (
        <div className='notifications-container'>
            {notifications.map((n) => {
                return(
                    <Snackbar type={n.type} content={n.content} key={n.content}></Snackbar>
                )
            })}
        </div>
    )
}

export default NotificationsContainer