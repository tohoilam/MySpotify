function SpotifyApi() {
  
}

SpotifyApi.prototype = {
  setAccessToken: function(token) {
    this.access_token = token;
  },

  getAccessToken: function() {
    return this.access_token;
  },

  request: async function(method, endpoint, queryList = [], bodyParameter = {}) {
    let query = "";
    if (queryList.length > 0) {
      query = "?" + queryList[0][0] + "=" + queryList[0][1];

      if (queryList.length > 1) {
        for (let i = 1; i < queryList.length; i++) {
          query = query + "&" + queryList[i][0] + "=" + queryList[i][1];
        }
      }
    }

    const requestUrl = 'https://api.spotify.com' + endpoint + query;
    const requestHeader = {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + this.access_token,
        'Content-Type': 'application/json',
      },
    };

    let requestData = requestHeader;
    if (Object.keys(bodyParameter).length !== 0) {
      const requestBody = {"body": JSON.stringify(bodyParameter)};
      requestData = {...requestHeader, ...requestBody};
    }

    const response = await fetch(requestUrl, requestData);

    // No return content
    if (response.status === 204) {
      return {};
    }

    const returnVal = await response.json();

    return returnVal;
  },

  getUserInfo: async function() {
    return await this.request('GET', '/v1/me');
  },

  getUserPlaylists: async function() {
    return await this.request('GET', '/v1/me/playlists');
  },

  getCurrentlyPlaying: async function() {
    const response = await this.request('GET', '/v1/me/player/currently-playing');
    if (response) {
      return response;
    }
    return {};
  },

  getCurrentPlayer: async function() {
    const response = await this.request('GET', '/v1/me/player');
    if (response) {
      return response;
    }
    return {};
  },

  getSpecificTrack: async function(trackID) {
    return await this.request('GET', '/v1/tracks/' + trackID);
  },

  getRecentlyPlayed: async function() {
    return await this.request('GET', '/v1/me/player/recently-played');
  },

  getPlaylist: async function(playlistID) {
    return await this.request('GET', '/v1/playlists/' + playlistID);
  },

  resumeMusic: async function() {
    return await this.request('PUT', '/v1/me/player/play');
  },

  playSpecifiedMusic: async function(trackUri, trackNumber) {
    const bodyParameter = {"context_uri": trackUri, "position_ms": 0, "offset": {"position": trackNumber}};
    return await this.request('PUT', '/v1/me/player/play', [], bodyParameter);
  },

  pauseMusic: async function() {
    return await this.request('PUT', '/v1/me/player/pause');
  },

  nextTrack: async function() {
    return await this.request('POST', '/v1/me/player/next');
  },

  previousTrack: async function() {
    return await this.request('POST', '/v1/me/player/previous');
  },

  setVolume: async function(volume) {
    const queryList = [["volume_percent", volume.toString()]];
    return await this.request('PUT', '/v1/me/player/volume', queryList);
  },

  toggleShuffle: async function(shuffle_state) {
    const queryList = [["state", shuffle_state]];
    return await this.request('PUT', '/v1/me/player/shuffle', queryList);
  },

  toggleRepeat: async function(repeat_state) {
    const queryList = [["state", repeat_state]];
    return await this.request('PUT', '/v1/me/player/repeat', queryList);
  }
};

export default SpotifyApi;
