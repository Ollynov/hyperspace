import React, {Component} from 'react';

class HyperspaceWorker extends Component {
  constructor (props) {
    super(props);

    this.state = {
      authenticated: true,
      username: '',
      url: null,
      title: null,
      category: '',
      tags: ''
    };

    this.sendLink = this.sendLink.bind(this);
  }

  componentWillMount() {
    this.setState({
      username: this.props.username
    });
  }

  sendLink (e) {
    e.preventDefault();
    
    let username = this.state.username;

    let getCurrentTabUrl = function () {
      let queryInfo = {
        active: true,
        currentWindow: true
      };

      chrome.tabs.query(queryInfo, function (tabs) {
        let tab = tabs[0];
        let url = tab.url;
        let title = tab.title;
        let category = document.getElementById('category').value;
        let tags = document.getElementById('tags').value;

        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:3000/link', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(encodeURI('url=' + url + '&title=' + title + '&category=' + category + '&tags=' + tags + '&username=' + username));
      });
    };

    getCurrentTabUrl();
  }

  render () {
    return (
      <div className="workerBody">
        this right here is our worker body
        <form className="addLinkForm">
          <input id="category" placeholder="hyper category" />
          <input id="tags" placeholder="hyper tags"/>
          <button onClick={this.sendLink} className="addTo">add to hyperspace</button>
        </form>
      </div>
    );
  }
}

export default HyperspaceWorker;