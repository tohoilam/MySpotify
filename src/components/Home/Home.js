import React from 'react';
import SideBar from '../SideBar/SideBar';
import PlayBar from '../PlayBar/PlayBar';
import MySpotify from '../MySpotify/MySpotify';
import './Home.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: "MySpotify",
      selectedPlaylistID: "",
      userPlaylists: {},
      userInfo: {},
      currentlyPlaying: {},
      currentPlayer: {},
      recentlyPlayed: {},
      playlist: {},
      isLoaded: false,
    }
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.loadInfo();
    }
  }

  async loadInfo() {
    this.setState({isLoaded: true});
  }

  mainContent() {
    if (this.state.selectedScreen === "MySpotify") {
      return <MySpotify />
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div id="loading fontFamily">Loading...</div>
      )
    }

    return ( 
      <div id="WebPage">
        <SideBar />
        <main id="MainContent">
          { this.mainContent() }
        </main>
        <PlayBar />
      </div>
    );
  }
}
