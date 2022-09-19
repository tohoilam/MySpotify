import React from 'react';
import './ViewPlaylists.css';

const emptyPlaylistImagePath = process.env.PUBLIC_URL + '/icons/empty/EmptyPlaylistImage.png';

export default class ViewPlaylists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: this.props.playlists,
    }
  }

  selectPlaylist(playlistID) {
    this.props.setViewTracks(playlistID);
  } 

  render() {
    return (
      <div className="ViewPlaylists">
        <div className="playlistsContainer">
          {this.state.playlists.items ? this.state.playlists.items.map((playlist) => {
            return (
              <div key={playlist.id} className="playlist hoverCursor" onClick={() => this.selectPlaylist(playlist.id)}>
                <div className="playlistImage">
                  {
                    (Object.keys(playlist.images).length)
                      ? <img src={playlist.images[0].url} alt={playlist.name} />
                      : <img src={emptyPlaylistImagePath} alt={playlist.name} />
                  }
                </div>
                <div className="playlistInfo">
                  <h3>{playlist.name}</h3>
                  <h4>{playlist.tracks.total} {playlist.tracks.total === 1 ? "track" : "tracks"}</h4>
                </div>
              </div>
            )
          }) : "No Playlists"}
        </div>
      </div>
    )
  }
}