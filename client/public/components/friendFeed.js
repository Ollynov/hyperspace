import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import store from '../../store';
import {connect} from 'react-redux';
import MyCategories from './MyCategories';

class FriendFeed extends Component {
  constructor (props) {
    super(props);

    this.state = {
      feed: []
    };
  }

  componentWillMount() {
    this.updateViews();
  }

  updateViews () {
    var context = this;
    fetch('/getFeed', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: store.getState().username.username,
      })
    }).then(function(feed) {
      feed.json().then(function (feedJSON) {
        context.setState({feed: feedJSON}, function () {
          console.log('THIS IS WHAT WE ARE GETTING FROM FRIEND FEED', feedJSON);
        });
      });
    });
  }

  render () {
    { var context = this; }
    return (
      <div className="friendFeed">
        {context.state.feed.reverse().slice(0, 10).map(function (item) {
          return (
            <div className="feedHyper">
              <a href={item.url} target="_blank">
                <Card>
                  <CardMedia overlay={<CardTitle titleStyle={{fontSize: 10, wordWrap: 'break-word', lineHeight: 1.1}} title={item.title} subtitle={item.description}/>}>
                  {item.image.length > 3 ? <img className="hyperImage" src={item.image}/> : <div className="gradient2" style={{height: 100}}/>}
                  </CardMedia>
                </Card>
              </a>
            </div>
          );
        })}
      </div>  
    );
  }
}

export default FriendFeed;