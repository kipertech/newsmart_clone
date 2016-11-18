import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';


const window = Dimensions.get('window');

export default class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.menuItem}>
          <Text
            onPress={() => this.props.onItemSelected('news')}
            style={styles.item}>
            News
        </Text>

        </View>
        <View style={styles.devider} />
        <View style={styles.menuItem}>
          <Text
            onPress={() => this.props.onItemSelected('skills')}
            style={styles.item}>
            Skills
        </Text>
        </View>
        <View style={styles.devider} />
        <View style={styles.menuItem}>
          <Text
            onPress={() => this.props.onItemSelected('starred')}
            style={styles.item}>
            Starred
        </Text>
        </View>
        <View style={styles.devider} />
        <View style={styles.menuItem}>
          <Text
            onPress={() => this.props.onItemSelected('profile')}
            style={styles.item}>
            Profile
        </Text>
        </View>
        <View style={styles.devider} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#616161',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    padding: 5,
    color:'white'
  },
  menuItem: {
    flex: 1,
    backgroundColor: '#6B6B6B',
    padding: 10
  },
  devider: {
    height: 1,
    backgroundColor: '#F4F4F4',
    opacity: 0.2,
  }
});