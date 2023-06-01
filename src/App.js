import React, {useState, useRef} from "react";
import './styles/app.scss';
import Song from './components/Song.js'
import Player from './components/Player.js'
import Library from './components/Library.js'
import Nav from './components/Nav.js'
import data from './data.js'


function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState(
    {
        currentTime: 0,
        duration: 0,
    })

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration })
};

  return (
    <div className="App">
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus}/>
      <Song currentSong = {currentSong}/>
      <Player 
      currentSong = {currentSong} 
      isPlaying = {isPlaying} 
      setIsPlaying = {setIsPlaying}
      audioRef = {audioRef}
      setSongInfo = {setSongInfo}
      songInfo = {songInfo}
      setSongs = {setSongs}
      songs = {songs}
      setCurrentSong = {setCurrentSong}/>
      <Library 
      audioRef = {audioRef}
      songs = {songs} 
      setCurrentSong = {setCurrentSong}
      isPlaying = {isPlaying}
      setSongs = {setSongs}
      libraryStatus = {libraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata = {timeUpdateHandler} ref = {audioRef} src = {currentSong.audio}/>
    </div>
  );
}

export default App;
