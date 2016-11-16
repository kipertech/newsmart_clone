import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

export default class VideoScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={ () => Actions.article() }>Article</Text>
      </View>
    );
  }
}
