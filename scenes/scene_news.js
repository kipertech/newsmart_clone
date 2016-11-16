import React, { Component } from 'react';
import ReactNative, {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Dimensions,
    AsyncStorage,
    Alert,
    ListView,
    ActivityIndicator,
    Platform,
    NetInfo,
    View,
    Image
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Actions, Scene, Router } from 'react-native-router-flux';
const GLOBAL = require('../global');

/* --- */
let st = Dimensions.get('window');
/* --- */

export default class NewsScene extends Component {
    
    //Render items in list
    renderCard(article) 
    {
        return (
            <TouchableOpacity key={article.ID} onPress={() => Actions.article()}>
                <View style={{ backgroundColor: 'white', width: st.width }}>

                    {/* Main Image */}
                    <Image
                        source={{ uri: article.IMAGE }}
                        style={{ width: st.width, height: st.width * 0.6, flexDirection: 'row' }}
                        resizeMode='stretch'>
                    </Image>

                    {/* Summarized Info */}
                    <View style={{ padding: 15 }}>

                        <View style={{ width: st.width - 30 }}>
                            {/* Title */}
                            <View style={{ width: st.width - 30 - 50, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{article.TITLE}</Text>
                                
                                <Image
                                    source={(article.STARRED) ? require('../images/button_star_check_orange.png') : require('../images/button_star_uncheck_orange.png')}
                                    style={{ width: 20, height: 20 }}
                                    resizeMode='stretch'
                                />
                            </View>

                            {/* Abstract */}
                            <Text style={{ marginTop: 5 }}>{article.ABSTRACT}</Text>
                        </View>

                        <View style={{ marginTop: 10, width: st.width - 30, flexDirection: 'row', alignItems: 'center' }}>
                            {/* Date and author */}
                            <View style={{ width: st.width - 30 - 40 }}>
                                <Text style={{ color: 'gray' }}>{article.DATE}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>by {article.AUTHOR}</Text>
                            </View>

                            {/* Level */}
                            <View style={{ width: 30 }}>
                                <Progress.Circle 
                                    size={30} 
                                    progress={1}
                                    showContentText={false}
                                    borderWidth={0}
                                    thickness={5}
                                    color='rgb(229, 229, 229)'
                                    style={{ position: 'absolute', top: 10, left: 10 }}
                                />

                                <Progress.Circle 
                                    size={30} 
                                    progress={article.LEVEL / 10 * 2}
                                    contentText={article.LEVEL.toString()}
                                    showContentText={true}
                                    borderWidth={0}
                                    thickness={5}
                                    borderColor='rgb(142, 147, 148)'
                                    textStyle={{ fontSize: 18, color: 'rgb(142, 147, 148)' }}
                                    style={{ position: 'absolute', top: 10, left: 10 }}
                                    color='rgb(116, 113, 227)'
                                />
                            </View>

                        </View>

                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    //Main render function
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                { this.renderCard(GLOBAL.ARTICLES[0]) }
            </View>
        );
  }
}
