import React from 'react';
import Overview from './Overview/Overview';
import './MySpotify.css';

export default class MySpotify extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      spotifyApi: this.props.spotifyApi,
      selectedTab: "Overview"
    }
  }

  tab() {
    if (this.state.selectedTab === "Overview") {
      return <Overview 
                  spotifyApi={this.state.spotifyApi}
                  setViewTracks={playlistID => this.props.setViewTracks(playlistID)}
                  />;
    }
  }

  render() {
    return (
      <section id="MySpotify">
        <div id="userInfoSection"></div>
        <div id="tabBar">
          <div className="userSelectionItem" onClick={() => {this.setState({selectedTab: "Overview"})}}>
            OVERVIEW
            <div className="lightUpBox"></div>
          </div>
          <div className="userSelectionItem" onClick={() => {this.setState({selectedTab: "PublicPlaylists"})}}>
            PUBLIC PLAYLISTS
            <div className="lightUpBox"></div>
          </div>
          <div className="userSelectionItem">
            FOLLOWING
            <div className="lightUpBox"></div>
          </div>
          <div className="userSelectionItem">
            FOLLOWERS
            <div className="lightUpBox"></div>
          </div>
        </div>
        <div id="smallInfoSection">
          <h2>Your Playlists</h2>
        </div>
        <div id="mySpotifyTab">
          { this.tab() }
        </div>
      </section>
    )
  }
}
