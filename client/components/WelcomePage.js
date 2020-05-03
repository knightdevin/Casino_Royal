import React, {Component} from 'react'

export default class WelcomePage extends Component {
  render() {
    return (
      <div className="WelcomePage">
        <div className="welcomePhotoContainer">
          <img
            // src="https://travel.home.sndimg.com/content/dam/images/travel/fullset/2013/07/25/b1/monte-carlo-sweeps_ss_001.jpg.rend.hgtvcom.966.644.suffix/1491591900231.jpeg"
            // src="https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/06/Monte-Carlo-Casino.jpg"
            // src="https://sgamblingherald.gamblingzion.com/uploads/bfi_thumb/monte-carlo-casino-gambling-in-monaco-mtqo5ffux7uggpgoqhxx9guyjawq2t954mcsi3lq08.jpg"
            src="https://asset.montecarlosbm.com/styles/hero_desktop_wide_responsive/s3/media/orphea/ca_nighttime_facade_0005.jpg.jpeg?itok=xWM5q80b"
            className="welcomePhoto"
          />
          <div className="centerText">
            <h2>Welcome to the Casino Royale</h2>
          </div>
          <div className="lowerRightText">
            <h4>Where tomorrow's zillionaires are made!</h4>
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
