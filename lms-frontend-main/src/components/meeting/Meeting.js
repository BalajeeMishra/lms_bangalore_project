import React from 'react'
import MeetingHeader from './MeetingHeader'

const Meeting = () => {
  return (
    <>
    <MeetingHeader />
      <div className="meeting">
        <div className="meeting__left">
          <div id="call__screen"></div>
        </div>
        <div className="meeting__right">
          {/* <CometChatMessages chatWithGroup={meeting.meeting_uid} /> */}
        </div>
      </div>
    </>
  )
}

export default Meeting