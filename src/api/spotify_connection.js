// https://developer.spotify.com/
// GET to https://accounts.spotify.com/authorize
// Required Parameter: client_id, response_type: 'code', redirect_uri
// Optional Parameter: state, scope, show_dialog

const endpoint = 'https://accounts.spotify.com/authorize'
const client_id = 'e82f109675b04e228333c6d0509b44c1';
const response_type = 'token';
// const redirect_uri = 'http://localhost:3000/';
const redirect_uri = "https://myspotify-43556.web.app/";
// const PORT = process.env.PORT || '8080';
// const redirect_uri = 'http://localhost:' + PORT + '/';
// const redirect_uri = 'https://my-spotify-tohoilam.herokuapp.com/';

const scope = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)  //remove the hashtag in front (at string 0)
    .split('&')   //turn into an array, split at &
    .reduce((initial, current) => {
      let param = current.split('=');
      initial[param[0]] = decodeURIComponent(param[1]);

      return initial;
    }, {});
};

export const loginUrl = `${endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope.join("%20")}&show_dialog=true`;
