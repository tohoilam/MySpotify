import React from 'react';
import './ViewTracks.css';

const emptyPlaylistImagePath = process.env.PUBLIC_URL + '/icons/empty/EmptyPlaylistImage.png';

export default class ViewTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: this.props.playlists,
      playlistID: this.props.playlistID,
      playlist: {},
      isLoading: true,
      isSubHeading: false,
      playlistTracksSectionRef: React.createRef()

    }

    const callbackFunction = entries => {
      const [ entry ] = entries;
      this.setState({isSubHeading: entry.isIntersecting});
    }

    const options = {
      root: null,
      rootMargin: "0px 0px -90% 0px",
      threshold: 0
    }

    this.observer = new IntersectionObserver(callbackFunction, options);
  }

  componentDidMount() {
    if (this.state.isLoading) {
      this.loadData();
    }
  }

  async loadData() {
    await this.fetchPlaylist(this.state.playlistID);
    this.setState({isLoading: false}, this.afterLoaded);
  }

  async fetchPlaylist(playlistID) {
    const response = await this.props.spotifyApi.getPlaylist(playlistID);
    this.setState({playlist: response});
  }

  afterLoaded() {
    this.observer.observe(this.state.playlistTracksSectionRef.current);
  }

  calculateDuration(duration_ms) {
    const duration = parseInt(duration_ms, 10) / 1000;

    let duration_s = duration % 60;
    duration_s = duration_s.toFixed(0).toString();
    duration_s = duration_s.length === 1 ? "0" + duration_s : duration_s;

    let duration_m = duration / 60;
    duration_m = duration_m.toString();
    duration_m = duration_m.slice(0, duration_m.indexOf('.'));
    duration_m = duration_m.length === 1 ? "0" + duration_m : duration_m;

    return duration_m + ":" + duration_s;
  }

  playThisTrack(playlistUri) {
    console.log(playlistUri);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    let trackNumber = -1;

    return (
      <div id="ViewTracks">
        <div id="playlistSmallHeader" className={this.state.isSubHeading ? "" : "smallHeaderVisible"}>
          <h1>{ this.state.playlist.name }</h1>
        </div>

        <div id="playlistHeaderSection">
          <div id="playlistImage" className="playlistHeaderItem">
            {
              (Object.keys(this.state.playlist.images).length)
                ? <img src={this.state.playlist.images[0].url} alt={this.state.playlist.name} />
                : <img src={emptyPlaylistImagePath} alt={this.state.playlist.name} />
            }
          </div>
          <div id="playlistInfo" className="playlistHeaderItem">
            <h5 class="playlistInfoItem">{ this.state.playlist.type }</h5>
            <h1 class="playlistInfoItem">{ this.state.playlist.name }</h1>
            <h5 class="playlistInfoItem">
              {
                (this.state.playlist.owner && this.state.playlist.owner.display_name)
                  ? "By " + this.state.playlist.owner.display_name
                  : "By Spotify"
              }
            </h5>
            <h5 class="playlistInfoItem">
              {
                (this.state.playlist.tracks.total === 1)
                  ? this.state.playlist.tracks.total + " song"
                  : this.state.playlist.tracks.total + " songs"
              }
            </h5>
          </div>
        </div>

        <div id="playlistTracksSection" ref={this.state.playlistTracksSectionRef}>
          {
            this.state.playlist && this.state.playlist.tracks
              ? this.state.playlist.tracks.items.map(item => {
                  const duration_string = this.calculateDuration(item.track.duration_ms);

                  trackNumber += 1;

                  return (
                    <div className="track" key={trackNumber.toString()}>
                      <div className="playTrackButton" onClick={(e) => this.playThisTrack(this.state.playlist.uri, e.target.parentNode.key)} >p</div>
                      <div className="trackName trackItems textOverflow">{ item.track.name }</div>
                      <div className="trackArtist trackItems textOverflow">{ item.track.artists.map(artist => artist.name) }</div>
                      <div className="trackAlbum trackItems textOverflow">{ item.track.album.name }</div>
                      <div className="trackAddedDate trackItems textOverflow">{ item.added_at.slice(0,10) }</div>
                      <div className="trackDuration trackItems textOverflow">{ duration_string }</div>
                    </div>
                  )
                })
              : ""
          }
        </div>
      </div>
    )
  }
}