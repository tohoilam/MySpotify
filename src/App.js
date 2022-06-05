import React from 'react';
import './App.css';
import { getTokenFromUrl } from './api/spotify_connection';
import SpotifyApi from './api/spotify_api';

import Login from './components/Login/Login';
import Home from './components/Home/Home';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spotifyApi: new SpotifyApi(),
      token: "",
    }
  }

  // Mount after collecting the token
  componentWillMount() {
    const response = getTokenFromUrl()
    window.location.hash = ""; // Hide token in url bar
    const _token = response.access_token;

    if (_token) {
      this.setState({token: _token});
      this.state.spotifyApi.setAccessToken(_token);
    }
  }

  render() {
    return (
      <div className="">
        { // if token exist, go to main page, if not, go to login page
          this.state.token !== "" ? (
            <div>
              <Home spotifyApi={this.state.spotifyApi}/>
            </div>
          ) : (
            <Login />
          )
        }
        
      </div>
    );
  }
}