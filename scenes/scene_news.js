import React, { Component } from 'react';
import ReactNative, {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Dimensions,
    Alert,
    ListView,
    ActivityIndicator,
    Platform,
    NetInfo,
    View,
    Image,
    ScrollView
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
            <TouchableOpacity 
                key={article.ID} 
                onPress={(article.TYPE == 'NORMAL') ? () => Actions.article({ curArticle: article }) : () => Actions.video()}>

                <View style={{ backgroundColor: 'white', width: st.width, marginBottom: 10 }}>

                    {/* Main Image */}
                    <Image
                        source={{ uri: article.IMAGE }}
                        style={{ width: st.width, height: st.width * 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        resizeMode='stretch'>

                        <Image
                            source={(article.TYPE == 'VIDEO') ? require('../images/button_play.png') : null}
                            style={{ width: 80, height: 80, opacity: 0.5 }}
                            resizeMode='stretch'
                        />

                    </Image>

                    {/* Summarized Info */}
                    <View style={{ padding: 15 }}>

                        <View style={{ width: st.width - 30 }}>
                            {/* Title */}
                            <View style={{ width: st.width - 30, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', width: st.width - 30 - 50 }}>{article.TITLE}</Text>
                                
                                <Image
                                    source={(article.STARRED) ? require('../images/button_star_check_orange.png') : require('../images/button_star_uncheck_orange.png')}
                                    style={{ width: 20, height: 20, position: 'absolute', top: 0, right: 0, marginRight: 10, marginTop: 5 }}
                                    resizeMode='stretch'
                                />
                            </View>

                            {/* Abstract */}
                            <Text style={{ marginTop: 5, color: 'black' }}>{article.ABSTRACT}</Text>
                        </View>

                        <View style={{ marginTop: 20, width: st.width - 30, flexDirection: 'row', alignItems: 'center' }}>
                            {/* Date and author */}
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Text style={{ color: 'gray' }}>{article.DATE}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>by {article.AUTHOR}</Text>
                            </View>

                            {/* Empty space */}
                            <View style={{ flex: 1 }} />

                            {/* Level */}
                            <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 5 }}>Level</Text>

                                <Progress.Circle
                                    size={30} 
                                    progress={1}
                                    showContentText={false}
                                    borderWidth={0}
                                    thickness={3}
                                    color='rgb(229, 229, 229)'
                                    style={{ position: 'absolute', top: 0, right: 0 }}
                                />

                                <Progress.Circle
                                    size={30} 
                                    progress={article.LEVEL / 10 * 2}
                                    contentText={article.LEVEL.toString()}
                                    showContentText={true}
                                    borderWidth={0}
                                    thickness={3}
                                    borderColor='rgb(142, 147, 148)'
                                    textStyle={{ fontSize: 13, color: 'rgb(142, 147, 148)' }}
                                    style={{ alignSelf: 'flex-end' }}
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
            <ScrollView style={{ flex: 1, alignItems: 'center' }}>
                { GLOBAL.ARTICLES.map((value, index) => this.renderCard(value)) }
            </ScrollView>
        );
  }
}
