import React from 'react';
import SideBar from '../SideBar/SideBar';
import PlayBar from '../PlayBar/PlayBar';
import MySpotify from '../MySpotify/MySpotify';
import Statistics from '../Statistics/Statistics';
import ViewTracks from '../Common/ViewTracks/ViewTracks';
import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: "MySpotify",
      spotifyApi: this.props.spotifyApi,
      selectedPlaylistID: "",
      // userPlaylists: {},
      userInfo: {},
      // currentlyPlaying: {},
      // currentPlayer: {},
      // recentlyPlayed: {},
      // playlist: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.loadInfo();
    }
  }

  async checkName() {
    const response = await this.state.spotifyApi.getSpecificTrack('4iH7negBYMfj2z0wDNmgdx');
    console.log(response);
  }

  async loadInfo() {
    this.checkName();
    this.setState({isLoading: false});
  }

  changeToViewTracks(playlistID) {
    this.setState({isLoading: true});
    this.setState({selectedPlaylistID: playlistID});
    this.setState({selectedScreen: "ViewTracks"});
    this.setState({isLoading: false});
  }

  mainContent() {
    if (this.state.selectedScreen === "MySpotify") {
      return <MySpotify spotifyApi={this.state.spotifyApi} setState={state => this.setState(state)} setViewTracks={playlistID => this.changeToViewTracks(playlistID)} />
    }
    else if (this.state.selectedScreen === "Statistics") {
      return <Statistics spotifyStates={this.state} />
    }
    else if (this.state.selectedScreen === "ViewTracks") {
      return <ViewTracks spotifyApi={this.state.spotifyApi} playlistID={this.state.selectedPlaylistID} />
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return ( 
      <div id="WebPage">
        <SideBar  setState={state => this.setState(state)} />
        <main id="MainContent">
          { this.mainContent() }
        </main>
        <PlayBar spotifyApi={this.state.spotifyApi} />
      </div>
    );
  }
}
