import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  findNodeHandle,
  WebView
} from 'react-native';
const GLOBAL = require('../global');
const EXTRA = require('../components/extra_functions');
import QuestionModal from './modal';
import ShareModal from './shareModal';
import * as Progress from 'react-native-progress';
import { Actions, Scene, Router } from 'react-native-router-flux';

/* --- */
let st = Dimensions.get('window');
var ignoreList = [];
var offset = 0, currentOffset = 0;
var totalVocabPoint = 0, totalEarnedVocabPoint = 0, totalCompPoint = 0, totalEarnedCompPoint = 0;
var scrollHeight = 0;
/* --- */

export default class VideoScene extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            //ScrollView
            topPanelColor: 'transparent',
            scrollDirection: true,
            passedImage: true,

            //Action bar
            closeButton: require('../images/button_close_white.png'),
            starButton: require('../images/button_star_uncheck.png'),
        };

        this.scrollHeight = 0;
        this.overScroll = false;
    }

    componentWillMount() {
        //Initilize data
        this.calculatePoints();
        GLOBAL.ARTICLESCENE = this;
    }

    componentWillUnmount() {
        GLOBAL.ARTICLESCENE = null;
    }

    //Calculate total points
    calculatePoints() 
    {
        totalVocabPoint = 0;
        totalEarnedVocabPoint = 0;
		totalCompPoint = 0;
		totalEarnedCompPoint = 0;
		let q = this.props.curArticle.QUESTIONS;
        for (var i = 0; i < q.length; ++i)
        {
            if (q[i].TYPE_QUESTION == 'VOCAB')
            {
                totalVocabPoint = totalVocabPoint + q[i].POINT;
                totalEarnedVocabPoint = totalEarnedVocabPoint + q[i].POINTS_EARNED;
            }
            else if (q[i].TYPE_QUESTION == 'COMP')
            {
                totalCompPoint = totalCompPoint + q[i].POINT;
                totalEarnedCompPoint = totalEarnedCompPoint + q[i].POINTS_EARNED;
            }
                
        }
    }

    //onPress event for each word
    onWordPress(id, type)
    {
        let modalQuestion;
        let qColor, mColor;

        //Assign question data for modal
        modalQuestion = this.props.curArticle.QUESTIONS[id];
        qColor = (type == 'COMP') ? GLOBAL.compColor : GLOBAL.vocabColor;
        mColor = (type == 'COMP') ? GLOBAL.compMouseDownColor : GLOBAL.vocabMouseDownColor;

        //Open the modal
        function openModal()
        {
             //Open the modal
            if (modalQuestion.TYPE == 'DRAGWORD')
            {
                let newArr = modalQuestion.ANSWERS.slice();
                newArr = EXTRA.shuffle(newArr);
                this.refs.qModal.open(true, newArr);
            }
            else this.refs.qModal.open(false);
        }

        //Inform the use about the result
        function informUser(isCorrect)
        {
            let inform = (isCorrect) ? 'Correct! ' : 'Incorrect answer. ';
            
            //Set colors
            GLOBAL.ARTICLEMODAL.setState({
                informText: inform + modalQuestion.INFORM,
                generalColor: 'white',
                pointColor: 'white',
                titleColor: qColor,
                pointText: 'points earned',
                checkText: 'NEXT',
                checkBorderWidth: 2
            }, openModal.bind(GLOBAL.ARTICLESCENE));
        };

        GLOBAL.ARTICLEMODAL.setState({ 
            curQuestion: modalQuestion, wordID: id,
            questionColor: qColor, mouseDownColor: mColor,
            triangleStyle: { left: -20 } },
            () => {
                //Check if the ANSWERED question is correct
                if (modalQuestion.USER_ANSWERS == -1 || modalQuestion.USER_ANSWERS.length == 0)
                    GLOBAL.ARTICLEMODAL.setState({ 
                        informText: '',
                        generalColor: qColor,
                        pointColor: 'black',
                        titleColor: 'white',
                        pointText: 'points',
                        checkText: 'CHECK',
                        checkBorderWidth: 0
                    }, openModal.bind(GLOBAL.ARTICLESCENE));
                else
                {
                    if (modalQuestion.TYPE == 'SINGLECHOICE')
                    {
                        if (modalQuestion.USER_ANSWERS == modalQuestion.CORRECT_ANS)
                            informUser(true)
                        else informUser(false);
                    }
                    else if (modalQuestion.TYPE == 'MULTIPLECHOICE')
                    {
                        if (EXTRA.compareArrays(modalQuestion.USER_ANSWERS, modalQuestion.CORRECT_ANS))
                            informUser(true)
                        else informUser(false);
                    }
                    else if (modalQuestion.TYPE == 'DRAGWORD')
                    {
                        let checkArr = true;
                        for (var i = 0; i < modalQuestion.USER_ANSWERS.length; ++i)
                        {
                            if (modalQuestion.USER_ANSWERS[i] < modalQuestion.USER_ANSWERS[i - 1])
                            {
                                checkArr = false;
                                break;
                            }
                        }
                        if (checkArr)
                            informUser(true)
                        else informUser(false);
                    }
                }

                //Scroll to just under the video
                this.refs.mainPanel.scrollTo({ y: st.width * 0.5625 });
        });  

        
                
              
    }

    //Render highlighted word
    renderHighlight(value, id)
    {
        const bColor = (value.TYPE_QUESTION == 'COMP') ? GLOBAL.compPointUnderColor : GLOBAL.vocabPointUnderColor
        const uColor = (value.TYPE_QUESTION == 'COMP') ? GLOBAL.compPointUpperColor : GLOBAL.vocabPointUpperColor

        //Highlight
        return (
			<TouchableHighlight
				ref={'word_' + id}
				key={id}
				onPress={() => this.onWordPress(id, value.TYPE_QUESTION)}
				style={{ backgroundColor: bColor, borderRadius: 5, marginBottom: 5, padding: 5, width: st. width - 30 }}
				underlayColor={uColor}>

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={require('../images/icon_undone.png')}
						style={{ width: 10, height: 10, marginLeft: 2, marginRight: 2 }}
						resizeMode='stretch'/>

					<Text style={{ color: 'white', marginRight: 2 }}>
						{value.TIME_START}{'-'}{value.TIME_END}{' | '}
						<Text style={{ fontWeight: 'bold' }}>
							{value.TYPE_QUESTION == 'COMP' ? 'Comp' : 'Vocab'}{' | '}{value.POINT}{' pts.'}
						</Text>
					</Text>

				</View>

			</TouchableHighlight>
        )
    }

    //TOP PANEL - Render Title
    renderSmallTitle() 
    {
        if (this.state.topPanelColor == 'white')
        {
            return(
                <View style={{ marginLeft: 55, marginRight: 55, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                    {/* Title */}
                    <Text 
                        numberOfLines={1} 
                        style={{ fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                        {this.props.curArticle.TITLE}
                    </Text>
                </View>
            );
        }
        else return(<View/>);
    }

    //TOP PANEL - Render Progress
    renderSmallProgress()
    {
        if (!this.state.passedImage)
        {
            return(
                <View style={{ flexDirection: 'row', position: 'absolute', left: 0, bottom: 0 }}>
                    <Progress.Bar 
                        progress={totalEarnedVocabPoint / totalVocabPoint} 
                        width={st.width / 2} height={5}
                        borderRadius={0}
                        borderWidth={0}
                        color={GLOBAL.vocabPointUpperColor}
                        unfilledColor={GLOBAL.vocabPointUnderColor}>
                    </Progress.Bar>

                    <Progress.Bar 
                        progress={totalEarnedCompPoint / totalCompPoint}
                        width={st.width / 2} height={5}
                        borderRadius={0}
                        borderWidth={0}
                        color={GLOBAL.compPointUpperColor}
                        unfilledColor={GLOBAL.compPointUnderColor}>
                    </Progress.Bar>
                </View>
            )
        }
        else return(<View/>);
    }

    //TOP PANEL - Main Render
    renderTopPanel()
    {
        if (this.state.scrollDirection)
        {
            return(
                <View style={{ width: st.width, height: 50, backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0 }}>
                    <View style={{ width: st.width, height: 45, backgroundColor: this.state.topPanelColor, position: 'absolute', top: 0, left: 0 }}>
                        {/* Close button */}
                        <TouchableOpacity
                            onPress={() => Actions.pop()}
                            style={{ width: 50, height: 45, position: 'absolute', top: 0, left: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={this.state.closeButton}
                                style={{ width: 15, height: 15 }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>

                        { this.renderSmallTitle() }

                        {/* Star button */}
                        <TouchableOpacity
                            onPress={() => { this.props.curArticle.STARRED = !this.props.curArticle.STARRED; this.onScroll() }}
                            style={{ width: 50, height: 45, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={this.state.starButton}
                                style={{ width: 20, height: 20 }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                    </View>

                    { this.renderSmallProgress() }
                </View>
            )
        }
        else
        {
            return(
                <View style={{ width: st.width, height: 5, position: 'absolute', top: 0, left: 0 }}>
                    { this.renderSmallProgress() }
                </View>
            )
        }
    }

    onScroll(event)
    {
        if (event != undefined && event != null)
        {
            currentOffset = event.nativeEvent.contentOffset.y;        
            if (currentOffset < 0)
                currentOffset = 0;
            var direction = currentOffset > offset ? false : true;
            offset = currentOffset;
            
            this.setState({ scrollDirection: direction });
        }
        
        //Set color when it passes through the image
        if (currentOffset <= (st.width * 0.6 - 45))
        {
            this.setState({ topPanelColor: 'transparent', closeButton: require('../images/button_close_white.png') });
            if (this.props.curArticle.STARRED)
                this.setState({ starButton: require('../images/button_star_check.png') })
            else this.setState({ starButton: require('../images/button_star_uncheck.png') })
        }
        else
        {
            this.setState({ topPanelColor: 'white', closeButton: require('../images/button_close_orange.png') });
            if (this.props.curArticle.STARRED)
                this.setState({ starButton: require('../images/button_star_check_orange.png') })
            else this.setState({ starButton: require('../images/button_star_uncheck_orange.png') })
        }

        //Indicate when it passes thorugh the progress indicators
        if (currentOffset <= (st.width * 0.6 - 5))
            this.setState({ passedImage: true });
        else
            this.setState({ passedImage: false });
    }

    //Main render function
    render()
    {
        return (
            <View style={{ flex: 1 }}>
                {/* Main content */}
                <ScrollView
                    ref='mainPanel'
                    onContentSizeChange={(contentWidth, contentHeight) => { scrollHeight = contentHeight; this.scrollHeight = contentHeight }}
                    onScroll={this.onScroll.bind(this)}
                    style={{ flex: 1 }} 
                    scrollEventThrottle={1}
                    contentContainerStyle={{ overflow: 'hidden' }}>

                    {/* Hide status bar */}                        
                    <StatusBar
                        hidden={true}
                    />

                    <View style={{ backgroundColor: '#F4F4F4' }}>
                        {/* Main Image */}
						<View style={{ width: st.width, height: st.width * 0.5625 }}>
							<WebView 
								source={{uri: 'http://m.wsj.net/video/20161114/111416samsungharman/111416samsungharman_v2_ec664k.mp4'}} 
							/>
						</View>

                        {/* Point progress */}
                        <View style={{ width: st.width, flexDirection: 'row' }}>
                            <Progress.Bar 
                                progress={totalEarnedVocabPoint / totalVocabPoint} 
                                width={st.width / 2} height={40}
                                borderRadius={0}
                                borderWidth={0}
                                color={GLOBAL.vocabPointUpperColor}
                                unfilledColor={GLOBAL.vocabPointUnderColor}>
                                
                                <Text style={{ color: 'white', marginLeft: 15 }}>
                                    {totalEarnedVocabPoint}/{totalVocabPoint} 
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {' '}Vocab
                                    </Text>
                                </Text>
                            </Progress.Bar>

                            <Progress.Bar 
                                progress={totalEarnedCompPoint / totalCompPoint}
                                width={st.width / 2} height={40}
                                borderRadius={0}
                                borderWidth={0}
                                color={GLOBAL.compPointUpperColor}
                                unfilledColor={GLOBAL.compPointUnderColor}>

                                <Text style={{ color: 'white', marginLeft: 15 }}>
                                    {totalEarnedCompPoint}/{totalCompPoint}
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {' '}Comp
                                    </Text>
                                </Text>
                            </Progress.Bar>
                        </View>

						{/* Title */}
						<View>
							<Text style={{ fontWeight: 'bold', fontSize: 25, fontFamily: 'Cochin', color: 'black', alignSelf: 'flex-end', padding: 15 }}>{this.props.curArticle.TITLE}</Text>
						</View>
						

                        {/* Objective Info */}
                        <View style={{ padding: 15, paddingTop: 0, flexDirection: 'row' }}>

                            {/* Objective */}
                            <View style={{ width: st.width - 30 - 50, paddingRight: 5 }}>
                                <Text style={{ color: 'rgb(142, 147, 148)' }}>LEARNING OBJECTIVE</Text>
                                <Text style={{ fontWeight: 'bold' }}>{this.props.curArticle.OBJECTIVE}</Text>
                                <Text>{this.props.curArticle.DESCRIPTION}</Text>
                            </View>

                            {/* Level */}
                            <View style={{ width: 50 }}>
                                <Progress.Circle 
                                    size={40} 
                                    progress={1}
                                    showContentText={false}
                                    borderWidth={0}
                                    thickness={5}
                                    color='rgb(229, 229, 229)'
                                    style={{ position: 'absolute', top: 10, left: 10 }}
                                />

                                <Progress.Circle 
                                    size={40} 
                                    progress={this.props.curArticle.LEVEL / 10 * 2}
                                    contentText={this.props.curArticle.LEVEL.toString()}
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

                    <View style={{ margin: 15 }}>
                        {/* Title */}
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>{this.props.curArticle.TITLE}</Text>

                        {/* Article Content */}
                        <View style={{ flex: 1, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            { this.props.curArticle.QUESTIONS.map((value, index) => this.renderHighlight(value, index)) }
                        </View>

                        {/* Footer Content */}
                        <View style={{ width: st.width, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                            {/* Date and author */}
                            <View>
                                <Text style={{ color: 'gray' }}>{this.props.curArticle.DATE}</Text>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>by {this.props.curArticle.AUTHOR}</Text>
                            </View>

                            {/* Share button */}
                            <TouchableOpacity 
                                style={{ position: 'absolute', top: 10, right: 40 }}
                                onPress={() => this.refs.sModal.open()}>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../images/button_share.png')}
                                        style={{ width: 20, height: 20 }}
                                        resizeMode='stretch'
                                    />

                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, marginLeft: 5 }}>SHARE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>

                { this.renderTopPanel() }

                <QuestionModal ref='qModal'/>

                <ShareModal ref='sModal'/>
            </View>
        );
    }
}