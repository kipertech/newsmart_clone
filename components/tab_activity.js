import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
const GLOBAL = require('../global')
const window = Dimensions.get('window')

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            article: GLOBAL.ARTICLE
        }
        pointVocab = 5;
        pointGrammar = 0;
        pointComp = 0;
    }

    renderTitle(ID) {
        GLOBAL.ARTICLE[0].map((item, index) => {
            if (item.ID == ID) {
                this.setState({
                    title: GLOBAL.ARTICLE.TITLE
                })
            }
        })
    }

    renderPoint(item) {
        if (item.TYPE_QUESTION == 'VOCAB') {
            pointVocab = item.POINT;
            pointGrammar = 0;
            pointComp = 0;
        }
        else if (item.TYPE_QUESTION == 'GRAMMAR') {
            pointVocab = 0;
            pointGrammar = item.POINT;
            pointComp = 0;
        }
        else if (item.TYPE_QUESTION == 'COMP') {
            pointVocab = 0;
            pointGrammar = 0;
            pointComp = item.POINT;
        }

        return (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={[styles.smallPoint, {backgroundColor:'orange'}]}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{pointVocab}</Text>
                </View>
                <View style={[styles.smallPoint, {backgroundColor:'#77B843'}]}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{pointGrammar}</Text>
                </View>
                <View style={[styles.smallPoint, {backgroundColor:'#31C1CC'}]}>
                    <Text style={{ color: 'black', fontSize: 12 }}>{pointComp}</Text>
                </View>
            </View>

        )

    }

    renderActivity(item, index) {
        if (item.POINTS_EARNED > 0) 
        {
            return (
                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', paddingBottom: 20 }}>
                    <View style={{ width: window.width * 1 / 3, justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 20 }}>
                        <Text>{item.ANSWERED_DATE}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F2F2F2', borderRadius: 4, flexDirection: 'row', width: window.width * 2 / 3 - 20, padding: 20 }}>
                        <View style={styles.pointContainer}>
                            <Text style={{ color: 'black' }}>{item.POINT}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', paddingLeft: 10 }}>
                            <Text style={{ width: window.width * 2 / 3 - 100 }}>
                                <Text style={{ color: 'black' }}>{item.POINTS_EARNED} points</Text> earned on
                            <Text style={{ color: '#ED6030' }}> {GLOBAL.ARTICLES[0].TITLE}</Text></Text>
                            {this.renderPoint(item)}
                        </View>
                    </View>
                    <View style={styles.devider} />
                </View>
            )
        }
    }

    //Main render function
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                {GLOBAL.QUESTION_DATA.map((item, index) => this.renderActivity(item, index))}
            </View >
        )
    }
}


var styles = StyleSheet.create({

    smallPoint: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    pointContainer:
    {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray'
    },
    devider: {
        height: 1,
        backgroundColor: 'black',
        opacity: 0.2,
    }
});