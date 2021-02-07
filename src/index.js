import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent'
import './index.css';

class CurrentSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null,
      title: null,
      cover: null
    };
  }

  get spoconHost() {
    // Adjust spoconHost to point to your spocon host
    return 'hifistereo.local:24879';
  }

  get apiUrl() {
    return `http://${this.spoconHost}`;
  }

  get webApiUrl() {
    return `${this.apiUrl}/web-api/v1`;
  }

  fetchCurrentSong() {
    Request.get(`${this.webApiUrl}/me/player/currently-playing`)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            artist: this.artistNames(response.body.item),
            title: response.body.item.name,
            cover: this.coverImageUrl(response.body.item)
          });
        }
      });
  }

  coverImageUrl(response) {
    const parentObject = response.album ? response.album : response;

    return parentObject.images.find(image => image.height == 640).url;
  }

  artistNames(response) {
    if (response.artists) {
      return response.artists.map(artist => artist.name).join(', ');
    }
  }

  previousTrack() {
    Request.post(`${this.apiUrl}/player/prev`)
      .then(response => {
        console.log('Previous track');
      });
  }

  nextTrack() {
    Request.post(`${this.apiUrl}/player/next`)
      .then(response => {
        console.log('Next track');
      });
  }

  componentDidMount() {
    var ws = new WebSocket(`ws://${this.spoconHost}/events`);

    ws.onopen = () => {
      this.fetchCurrentSong();
    };

    ws.onmessage = (evt) => {
      var eventData = JSON.parse(evt.data);

      switch (eventData.event) {
        case 'trackChanged':
          this.fetchCurrentSong();
          break;
        case 'playbackEnded':
        case 'inactiveSession':
        case 'sessionCleared':
        case 'connectionDropped':
        case 'panic':
          this.setState({
            artist: null,
            title: null,
            cover: null
          });
          break;
      }
    };

    ws.onclose = () => {
      console.log('Connection is closed.');
    };
  }

  render() {
    if (this.state.title) {
      return (
        <div className='spocon-display'>
          <button
            className='previous-track'
            onClick={this.previousTrack.bind(this)}
          />
          <button
            className='next-track'
            onClick={this.nextTrack.bind(this)}
          />
          <div className='track-cover'>
            <img className='cover-image' src={this.state.cover} />
          </div>
          <div className='track-info'>
            <div className='box'>
              <div className='title'>{this.state.title}</div>
              <div className='artist'>{this.state.artist}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <CurrentSong />
  </React.StrictMode>,
  document.getElementById('root')
);
