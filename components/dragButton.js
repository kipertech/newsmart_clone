import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class DragButton extends Component 
{
    render() 
    {
        return (
            <TouchableOpacity
                style={[this.props.style, { padding: 2 }]}
                onPress={this.props.onClick}
                >
                <View elevation={1} style={{ backgroundColor: 'white', borderRadius: 4, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, alignItems: 'center' }}>
                    <Text>{this.props.content}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}