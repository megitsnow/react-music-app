import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    const audioRef = useRef(null);

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play()
        }
        setIsPlaying(prevState => !prevState)
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration })
    };

    const getTime = (time) => {
        return(
            Math.floor(time/ 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const [songInfo, setSongInfo] = useState(
        {
            currentTime: 0,
            duration: 0,
        })

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})

    }


    return (
        <div className = "player">
            <div className = "time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange = {dragHandler}
                min = {0} max = {songInfo.duration} value = {songInfo.currentTime} type = "range"/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className = "skip-back" size = "2x" icon = {faAngleLeft}/>
                <FontAwesomeIcon onClick = {playSongHandler} className = "play" size = "2x" icon = {isPlaying? faPause : faPlay}/>
                <FontAwesomeIcon className = "skip-forward" size = "2x" icon = {faAngleRight}/>
                <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata = {timeUpdateHandler} ref = {audioRef} src = {currentSong.audio}/>
            </div>
        </div>
    );
}   

export default Player;