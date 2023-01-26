import React from 'react';
import './SideBar.css';

export default class SideBar extends React.Component {

  switchScreen(selectedScreen) {
    this.props.setState({selectedScreen: selectedScreen});
  }

  render() {
    return (
      <nav id="SideBar">
        <div id="sideBarLogo" className="sideBarItem">
          <p>Logo</p>
        </div>
        <div className="sideBarItem sideBarNavItem hoverCursor" onClick={() => { this.switchScreen("MySpotify") }}>
          <p>My Spotify</p>
        </div>
        <div className="sideBarItem sideBarNavItem hoverCursor" onClick={() => { this.switchScreen("Statistics") }}>
          <p>Statistics</p>
        </div>
      </nav>
    )
  }
}
