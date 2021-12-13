import React from 'react';
import VideoCard from './VideoCard';
import './VideoList.css';
// import Loader from '../Loaders/Loader'
import Loader from "react-loader-spinner";

const VideoList =(props) => {
    if(!props.err)
    {
        if(props.vids.length !== 0)
        {
        const vids = props.vids.videos.map(data => {
            return <VideoCard className="video_card" key = {data.id.videoId} src={data}/>
        });
        return (<div className="vids_container" >
            {vids}
        </div>);
        }
        else{
            return <p>
                <Loader
                    type="Watch"
                    color="#FF0000"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </p>
        }
    }
    else{
        return (<></>)
    }
}

export default VideoList;