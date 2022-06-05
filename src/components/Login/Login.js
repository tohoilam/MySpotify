import React from 'react';
import './Login.css';
import { loginUrl } from '../../api/spotify_connection';

function Login() {
  return (
    <div className="login">
      {/* <h1>My Spotify</h1> */}
      <img src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' alt='' />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Login;
