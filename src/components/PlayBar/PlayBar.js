import React from 'react';
import './PlayBar.css';

export default class PlayBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: this.props.spotifyApi,
      currentlyPlaying: {
        albumImageUrl: "https://www.htmlcsscolor.com/preview/gallery/2E2E2E.png",
        songName: "No Song Playing",
        artists: "N/A",
        songDuration: 0.0,
        songDurationString: "00.00",
        progress: 0.0,
        progressString: "00:00",
        progressPercentage: 0.0,
      },
      isPlaying: false,
      isShuffle: false,
      repeatState: "off",
    }
  }

  resumeOrPauseMusic() {
    if (this.state.isPlaying) {
      this.state.spotifyApi.pauseMusic();
    }
    else {
      this.state.spotifyApi.resumeMusic();
    }
  }

  nextTrack() {
    this.state.spotifyApi.nextTrack();
  }

  previousTrack() {
    this.state.spotifyApi.previousTrack();
  }

  toggleShuffle() {
    if (this.state.isShuffle) {
      this.setState({isShuffle: false});
      this.state.spotifyApi.toggleShuffle(false);
    }
    else {
      this.setState({isShuffle: true});
      this.state.spotifyApi.toggleShuffle(true);
    }
  }

  toggleRepeat() {
    if (this.state.repeatState === "off") {
      this.setState({repeatState: "context"});
      this.state.spotifyApi.toggleRepeat("context");
    }
    else if (this.state.repeatState === "context") {
      this.setState({repeatState: "track"});
      this.state.spotifyApi.toggleRepeat("track");
    }
    else {
      this.setState({repeatState: "off"});
      this.state.spotifyApi.toggleRepeat("off");
    }
  }

  async fetchCurrentlyPlaying() {
    const response = await this.props.spotifyApi.getCurrentlyPlaying();

    // Format the response
    let currentlyPlaying = {...this.state.currentlyPlaying};
    if (response) {
      if (response.item) {
        currentlyPlaying.albumImageUrl = response.item.album.images[0].url;
        currentlyPlaying.songName = response.item.name;
        currentlyPlaying.artists = response.item.artists.map(artist => artist.name).join(', ');
        
        currentlyPlaying.songDuration = response.item.duration_ms;
        currentlyPlaying.songDurationString = this.timeToString(currentlyPlaying.songDuration);
      }

      currentlyPlaying.progress = response.progress_ms;
      currentlyPlaying.progressString = this.timeToString(currentlyPlaying.progress);
      currentlyPlaying.progressPercentage = currentlyPlaying.progress / currentlyPlaying.songDuration * 100;

      this.setState({isPlaying: response.is_playing});
    }
    this.setState({currentlyPlaying});
  }

  async fetchCurrentPlayer() {
    const response = await this.props.spotifyApi.getCurrentPlayer();

    // Format the response
    if (response) {
      this.setState({shuffleState: response.shuffle_state});
      this.setState({repeatState: response.repeat_state});
    }
  }

  async loadData() {
    await this.fetchCurrentlyPlaying();
    await this.fetchCurrentPlayer();
    this.setState({iaLoaded: true});
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.loadData();
    }
  }

  componentWillMount() {
    setInterval(() => {
      this.loadData();
    }, 5000)
  }

  timeToString(ms) {
    const minute = Math.floor(ms / 1000 / 60)
    const minuteString = (minute < 10) ? "0" + minute.toString(10) : minute;
    const second = Math.floor(ms / 1000 % 60)
    const secondString = (second < 10) ? "0" + second.toString(10) : second;
    
    return minuteString + ":" + secondString;
  }

  render() {
    return (
      <aside id="PlayBar">
         <div id="currentlyPlaying">
          <div id="currentlyPlayingImage">
            <img src={this.state.currentlyPlaying.albumImageUrl} alt={this.state.currentlyPlaying.songName} />
          </div>
          <h3 className="textOverflow">{this.state.currentlyPlaying.songName}</h3>
          <h4 className="lightGreyFont textOverflow">{this.state.currentlyPlaying.artists}</h4>
        </div>
        <div id="playControl">
          <div id="playControlBox">
            {
              this.state.isShuffle ? (
                <div id="shuffleButton" onClick={(e) => this.toggleShuffle()} class="material-icons md-18 md-green playControlIcon hoverCursor nonPlayControl">shuffle</div>
              ) : (
                <div id="shuffleButton" onClick={(e) => this.toggleShuffle()} class="material-icons md-18 md-light playControlIcon hoverCursor nonPlayControl">shuffle</div>
              )
            }

            <div id="backButton" onClick={(e) => this.previousTrack()} class="material-icons md-18 md-light playControlIcon hoverCursor nonPlayControl">skip_previous</div>
            
            {
              this.state.isPlaying ? (
                <div id="playButton" onClick={(e) => this.resumeOrPauseMusic()} class="material-icons md-36 md-light playControlIcon hoverCursor">pause_circle</div>
              ) : (
                <div id="playButton" onClick={(e) => this.resumeOrPauseMusic()} class="material-icons md-36 md-light playControlIcon hoverCursor">play_circle</div>
              )
            }

            <div id="nextButton" onClick={(e) => this.nextTrack()} class="material-icons md-18 md-light playControlIcon hoverCursor nonPlayControl">skip_next</div>

            {
              this.state.repeatState === "off" ? (
                <div id="loopButton" onClick={(e) => this.toggleRepeat()} class="material-icons md-18 md-light playControlIcon hoverCursor nonPlayControl">repeat</div>
              ) : (
                this.state.repeatState === "context" ? (
                  <div id="loopButton" onClick={(e) => this.toggleRepeat()} class="material-icons md-18 md-green playControlIcon hoverCursor nonPlayControl">repeat</div>
                ) : (
                  <div id="loopButton" onClick={(e) => this.toggleRepeat()} class="material-icons md-18 md-green playControlIcon hoverCursor nonPlayControl">repeat_one</div>
                )
              )
            }
          </div>
          <div id="progressBarBox">
            <span class="songSecond lightGreyFont">{this.state.progressString}</span>
            <div class="sliderContainer">
              <input type="range" min="1" max="100" value={this.state.progressPercentage} class="slider hoverCursor" id="songProgress"></input>
            </div>
            <span class="songSecond lightGreyFont">{this.state.songDurationString}</span>
          </div>
          
        </div>
      </aside>
    )
  }
}
