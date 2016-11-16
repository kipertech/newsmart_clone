import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import NewsScene from './scenes/scene_news';
import ArticleScene from './scenes/scene_article';
import VideoScene from './scenes/scene_video';

export default class pandora extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="news" component={NewsScene} title="News" initial={true}/>
          <Scene key="article" component={ArticleScene} title="Article"/>
          <Scene key="video" component={VideoScene} title="Video"/>
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('pandora', () => pandora);
