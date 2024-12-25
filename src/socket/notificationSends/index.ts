import sendNewPostNotif from "./publicNotification/sendNewPostNotif";
import sendNewCommentNotif from "./publicNotification/sendNewCommentNotif";
import newFollowerNotif from './privateNotification/newFollowerNotif'

export {
    //  send a new post notification
    sendNewPostNotif,
    //  send new comment notification
    sendNewCommentNotif,
    //  send notification of a new follower
    newFollowerNotif
}