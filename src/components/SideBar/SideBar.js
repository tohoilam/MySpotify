import React from 'react';
import './SideBar.css';

export default class SideBar extends React.Component {

  render() {
    return (
      <nav id="SideBar">
        <div id="sideBarLogo" className="sideBarItem">
          <p>Logo</p>
        </div>
        <div className="sideBarItem sideBarNavItem">
          <p>My Spotify</p>
        </div>
        <div className="sideBarItem sideBarNavItem">
          <p>Statistics</p>
        </div>
      </nav>
    )
  }
}
