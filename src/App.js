import React, {useState} from "react";
import './styles/app.scss';
import Song from './components/Song.js'
import Player from './components/Player.js'
import Library from './components/Library.js'
import data from './data.js'


function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong = {currentSong}/>
      <Player currentSong = {currentSong} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying}/>
      <Library songs = {songs}/>
    </div>
  );
}

export default App;
