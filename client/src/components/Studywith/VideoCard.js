import './VideoCard.css';
import React from 'react';

const VideoCard = (props) => {
    return (
      
             <div className="yt_container">
                 <iframe width="266" height="200" className="yt_video"
                src={`https://www.youtube.com/embed/${props.src.id.videoId}`}>
                </iframe>
                <a className="yt_name" href="/#">{(props.src.snippet.title.length > 70) ? `${props.src.snippet.title.substring(0,65)}...`: `${props.src.snippet.title}`}</a>
            </div>
      
    )
}

export default VideoCard;