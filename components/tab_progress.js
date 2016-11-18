import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as ProgressBar from 'react-native-progress';

const st = Dimensions.get('window').width;
const GLOBAL = require('../global')

export default class Progress extends Component {
    constructor(props) {
        super(props);
        vocabNum = 0;
        gramNum = 0;
        compNum = 0;

        vocabCorrectNum = 0;
        gramCorrectNum = 0;
        compCorrectNum = 0;

        vocabPoint = 0;
        grammarPoint = 0;
        compPoint = 0;

        questionAnswered = 0;
    }

    //Initilize data
    componentWillMount() 
    {
        //Normal Article
         GLOBAL.QUESTION_DATA.forEach((item, index) => {
            if (item.ANSWERED_DATE != '' && item.ANSWERED_DATE != null) 
            {
                questionAnswered++;
                if (item.TYPE_QUESTION == 'GRAMMAR') 
                {
                    gramNum++;
                    if (item.POINTS_EARNED > 0)  
                    {
                        gramCorrectNum++;
                        grammarPoint += item.POINTS_EARNED
                    }
                }
                else if (item.TYPE_QUESTION == 'VOCAB') 
                {
                    vocabNum++;
                    if (item.POINTS_EARNED > 0)  
                    {
                        vocabCorrectNum++;
                        vocabPoint += item.POINTS_EARNED
                    }
                }
            }
        });

				//Video Article
				GLOBAL.ARTICLES.forEach((data) => {
            if (data.ID.indexOf('VF') > -1)
            {
                data.QUESTIONS.forEach((item) => {
										if (item.ANSWERED_DATE != '' && item.ANSWERED_DATE != null) 
										{
												questionAnswered++;
												if (item.TYPE_QUESTION == 'VOCAB') 
												{
														vocabNum++;
														if (item.POINTS_EARNED > 0) 
														{
																vocabCorrectNum++;
																vocabPoint += item.POINTS_EARNED
														}
												}
												else if (item.TYPE_QUESTION == 'COMP') 
												{
														compNum++;
														if (item.POINTS_EARNED > 0) 
														{
																compCorrectNum++;
																compPoint += item.POINTS_EARNED
														}
												}
            				}
                })
            }
        })
    }

		//Main render function
    render() 
		{
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ padding: 20, paddingTop: 10 }}>
                    <Text style={{ paddingBottom: 20, fontSize: 20 }}>Point This Week</Text>

                    <View style={{flexDirection:'row'}}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#292929' }}> Vocab </Text>
                            <Text style={{ color: '#292929' }}> Grammar </Text>
                            <Text style={{ color: '#292929' }}> Comp </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', backgroundColor: '#F6C363' }}> {vocabPoint} </Text>
                            <Text style={{ color: 'white', backgroundColor: '#7CB549' }}> {grammarPoint} </Text>
                            <Text style={{ color: 'white', backgroundColor: '#3CC0DC' }}> {compPoint} </Text>
                        </View>
                    </View>
                    
                </View >

                <View style={styles.devider} />

                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20 }}>Velocity</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={styles.speedometer}
                            source={require('../images/speedometer.png')} />
                        <Text> excercises per week{'\n'} </Text>
                        <Text style={{ color: '#292929' }}> You can do it! </Text>
                    </View>
                </View>

                <View style={styles.devider} />

                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 20 }}>Excercises Accuracy</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <ProgressBar.Circle 
                            size={st / 3 - 20} 
                            progress={(vocabCorrectNum / vocabNum > 0) ? (vocabCorrectNum / vocabNum) : 1} 
                            color='#ED6030' 
                            showsText={true}
                            contentText='Vocab'
                            contentTextTop={10}
                            contentTextStyle={{ fontWeight: 'bold', fontSize: 15 }}
                            borderColor='#E5E5E5'
                            textStyle={{ fontSize: 25, fontWeight: '100' }}>
                        </ProgressBar.Circle>

                        <ProgressBar.Circle 
                            size={st / 3 - 20} 
                            progress={(gramCorrectNum / gramNum > 0) ? (gramCorrectNum / gramNum) : 1} 
                            color='green' 
                            showsText={true} 
                            contentText={'Grammar'}
                            contentTextTop={10}
                            contentTextStyle={{ fontWeight: 'bold', fontSize: 15 }}
                            borderColor='#E5E5E5'
                            textStyle={{ fontSize: 25, fontWeight: '100' }}>
                        </ProgressBar.Circle>

                        <ProgressBar.Circle 
                            size={st / 3 - 20} 
                            progress={(compCorrectNum / compNum > 0) ? (compCorrectNum / compNum) : 1} 
                            color='#3CC0DC' 
                            showsText={true} 
                            contentText={'Comp'} 
                            contentTextTop={10}
                            contentTextStyle={{ fontWeight: 'bold', fontSize: 15 }}
                            borderColor='#E5E5E5' 
                            textStyle={{ fontSize: 25, fontWeight: '100' }}>
                        </ProgressBar.Circle>
                    </View>
                </View >

                <View style={styles.devider} />

                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, paddingBottom: 20 }}>Badges</Text>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_figure.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_hacker.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_luck.png')} />
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_pioneer.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_president.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 5 }}>
                                <Image style={styles.imageStyle}
                                    source={require('../images/badge_starter.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >

            </View >
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: st / 3 - 20,
        height: st / 3 - 20,
        borderRadius: (st / 3 - 20) / 2,
        borderColor: '#ED6030',
        borderWidth: 2,
    },
    speedometer: {
        width: st / 3 - 20,
        height: st / 3 - 20,
        borderRadius: (st / 3 - 20) / 2,

    },
    devider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginLeft: 20,
        marginRight: 20
    }
})