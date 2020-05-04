import React, {Component} from 'react'

export default class WelcomePage extends Component {
  render() {
    return (
      <div className="WelcomePage">
        <div className="welcomePhotoContainer">
          <img
            src="https://asset.montecarlosbm.com/styles/hero_desktop_wide_responsive/s3/media/orphea/ca_nighttime_facade_0005.jpg.jpeg?itok=xWM5q80b"
            className="welcomePhoto"
          />
          <div className="centerText">
            <h2>Welcome to the Casino Royale</h2>
          </div>
          <div className="lowerRightText">
            <h4>Where tomorrow's zillionaires are made!</h4>
            {/* <button
              type="button"
              onClick={handleClick}
              className="enterCasinoButton"
            >
              Enter Casino
            </button> */}
          </div>
        </div>
        <div className="landingPageContent">
          <h2>See if you can beat the legendary dealers of Monte Carlo</h2>
          <p className="welcomeText">
            Grab your tux or your finest evening gown and step into the world's
            best digital game floor. Our Black Jack tables have transformed
            skilled card players from rags to riches and even reduced some of
            the world's top 1-percent from riches to rags. Try your luck against
            our dealers if you dare.
          </p>
        </div>
      </div>
    )
  }
}
