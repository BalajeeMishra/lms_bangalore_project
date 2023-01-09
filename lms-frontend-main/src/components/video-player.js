import React, { useEffect, useRef } from 'react'
import VideoJs from 'video.js'
import 'video.js/dist/video-js.css';

const videoJsOptions = {
    // techOrder: ['html5', 'flash'],
    controls: true,
    autoplay: false,
    fluid: false,
    loop: false,
    width: '100%',
    // height: '100%',
    aspectRatio: '12:5'
}

const VideoPlayer = ({ url, fileType }) => {
    const videoContainer = useRef()

    //  Setup the player
    useEffect(() => {
        //  Setting content like this because player.dispose() remove also the html content
        videoContainer.current.innerHTML = `
      <div data-vjs-player>
        <video class="video-js" />
      </div>
    `


        const player = VideoJs(videoContainer.current.querySelector('video'), videoJsOptions, async () => {
            player.src({ src: url, type: fileType })
        })

        //  When destruct dispose the player
        return () => player.dispose()
    }, [url, fileType])

    return <div ref={videoContainer} />
}

export default VideoPlayer