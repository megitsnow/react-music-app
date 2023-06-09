import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../util.js'
const Player = ({setCurrentSong,currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setSongs}) => {

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return{
                    ...song,
                    active: true,
                }
            } else {
                return{
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong])
    
    
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play()
        }
        setIsPlaying(prevState => !prevState)
    }

    const getTime = (time) => {
        return(
            Math.floor(time/ 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})

    }

    const skipTrackerHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex+1) % songs.length])
        } else {
            setCurrentSong(songs[(currentIndex-1 + songs.length) %songs.length])
        }
        playAudio(isPlaying, audioRef);
    }


    return (
        <div className = "player">
            <div className = "time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track">
                    <input onChange = {dragHandler} min = {0} max = {songInfo.duration || 0} value = {songInfo.currentTime} type = "range"/>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
                <div className="animate-track"></div>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick = {() => skipTrackerHandler('skip-back')}className = "skip-back" size = "2x" icon = {faAngleLeft}/>
                <FontAwesomeIcon onClick = {playSongHandler} className = "play" size = "2x" icon = {isPlaying? faPause : faPlay}/>
                <FontAwesomeIcon onClick = {() => skipTrackerHandler('skip-forward')} className = "skip-forward" size = "2x" icon = {faAngleRight}/>
            </div>
        </div>
    );
}   

export default Player;