import React from 'react';
import ViewPlaylists from '../../Common/ViewPlaylists/ViewPlaylists';

export default class Overview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      spotifyApi: this.props.spotifyApi,
      userPlaylists: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.loadData();
    }
  }

  async loadData() {
    await this.fetchUserPlaylists();
    this.setState({isLoading: false});
  }

  async fetchUserPlaylists() {
    const response = await this.state.spotifyApi.getUserPlaylists();
    if (response) {
      this.setState({userPlaylists: response});
    }
    
    return true;
  }

  render() {
    return(
      (this.state.isLoading)
        ? <div>Loading...</div>
        : <ViewPlaylists playlists={this.state.userPlaylists} setViewTracks={playlistID => this.props.setViewTracks(playlistID)} />
    )
  }
}
