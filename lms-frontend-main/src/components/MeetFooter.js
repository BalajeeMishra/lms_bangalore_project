

const MeetFooter = () => {

    let isLocalAudioEnabled = true;
    let isLocalVideoEnabled = true;
    let toggleAudio = true;
    let toggleVideo = true;

  return (
    <div className="main_control">
        <div className="main_controls_button" onClick={toggleAudio}>
            {isLocalAudioEnabled ? (
            <><i className="fa fa-microphone-slash" /><span 
                className="button_name">Mute</span></>
                
            ): (
            <><i className="fa fa-microphone" /><span 
                className="button_name">Unmute</span></>
            )}
            </div>
            <div className="main_controls_button" onClick={toggleVideo}>
            {isLocalVideoEnabled ? (
            <><i className="fa fa-camera" /><span 
                className="button_name">Stop Video</span></>
            ): (
            <><i className="fa fa-camera" /><span 
                className="button_name">Start Video</span></>
            )}
        </div>
        <div className="main_controls_section">
            <div className="main_controls_button">
                <div>
                <i className="fa fa-user-plus" /><>3</>
                </div>
                <span className="button_name">Participants</span>
            </div>
            <div className="main_controls_button">
                <i className="fa fa-share" />
                <span className="button_name">Share Screen</span>
            </div>
            <div className="main_controls_button">
                <i className="fa fa-comment" />
                <span className="button_name">Chat</span>
            </div>
            <div className="main_controls_button">
                <i className="fa fa-cog" />
                <span className="button_name">Settings</span>
            </div>
        </div>
        <div className="main_controls_section">
            <div className="main_controls_button">
                <button
                id="leave-btn"
                className="btn-danger"
                onClick=""
                >
                Leave
                </button>
            </div>
        </div>
</div>
  )
}

export default MeetFooter