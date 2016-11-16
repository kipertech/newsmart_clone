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
  findNodeHandle
} from 'react-native';
const GLOBAL = require('../global');
const EXTRA = require('../components/extra_functions');
import QuestionModal from './modal';
import ShareModal from './shareModal';
import * as Progress from 'react-native-progress';
import { Actions, Scene, Router } from 'react-native-router-flux';

/* --- */
let words = [], wordsToHighlight = [];
let st = Dimensions.get('window');
var ignoreList = [];
var offset = 0, currentOffset = 0;
var totalVocabPoint = 0, totalGrammarPoint = 0, totalEarnedVocabPoint = 0, totalEarnedGrammarPoint;
var scrollHeight = 0;
/* --- */

export default class ArticleScene extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            //ScrollView
            topPanelColor: 'transparent',
            scrollDirection: true,
            passedImage: true,

            //Question Data
            qCode: '',

            //Action bar
            closeButton: require('../images/button_close_white.png'),
            starButton: require('../images/button_star_uncheck.png'),

            //scrollHeight
            spaceViewHeight: 0
        };

        this.scrollHeight = 0;
        this.overScroll = false;
    }

    componentWillMount() {
        //Initilize data
        this.calculatePoints();
        GLOBAL.ARTICLESCENE = this;

        words = this.props.curArticle.CONTENT.split(' ');
        wordsToHighlight = this.props.curArticle.WORDS_DATA;
    }

    componentWillUnmount() {
        GLOBAL.ARTICLESCENE = null;
    }

    //Calculate total points
    calculatePoints() 
    {
        totalVocabPoint = 0;
        totalGrammarPoint = 0;
        totalEarnedVocabPoint = 0;
        totalEarnedGrammarPoint = 0;
        for (var i = 0; i < GLOBAL.QUESTION_DATA.length; ++i)
        {
            if (GLOBAL.QUESTION_DATA[i].TYPE_QUESTION == 'VOCAB')
            {
                totalVocabPoint = totalVocabPoint + GLOBAL.QUESTION_DATA[i].POINT;
                totalEarnedVocabPoint = totalEarnedVocabPoint + GLOBAL.QUESTION_DATA[i].POINTS_EARNED;
            }
            else if (GLOBAL.QUESTION_DATA[i].TYPE_QUESTION == 'GRAMMAR')
            {
                totalGrammarPoint = totalGrammarPoint + GLOBAL.QUESTION_DATA[i].POINT;
                totalEarnedGrammarPoint = totalEarnedGrammarPoint + GLOBAL.QUESTION_DATA[i].POINTS_EARNED;
            }
                
        }
    }

    //onPress event for each word
    onWordPress(id, type, code)
    {
        let modalQuestion;

        //Assign question data for modal
        GLOBAL.QUESTION_DATA.forEach((value, index) => {
            if (value.CODE == code)
            {
                modalQuestion = value;
                GLOBAL.ARTICLEMODAL.setState({ curQuestion: value, wordID: id });
            }
        });

        //Set the color for the modal
        if (type == 'GRAMMAR')
            GLOBAL.ARTICLEMODAL.setState({ questionColor: GLOBAL.grammarColor, mouseDownColor: GLOBAL.grammarMouseDownColor })
        else GLOBAL.ARTICLEMODAL.setState({ questionColor: GLOBAL.vocabColor, mouseDownColor: GLOBAL.vocabMouseDownColor });
        
        //Scroll the view to the word
        var nHandler = findNodeHandle(this.refs.mainPanel);
        this.refs['word_' + id].measureLayout(nHandler, (x, y, width, height) => {

            //Check if 
            if ((y - (st.height * 0.2) + height + 20 + (st.height * 0.8)) > scrollHeight)
            {
                this.setState({ spaceViewHeight: scrollHeight + (st.height * 0.8) });
                this.overScroll = true;
            }
            else
            {
                this.setState({ spaceViewHeight: 0 });
                this.overScroll = false;
            }

            //Re-measure the layout to scroll
            this.refs['word_' + id].measureLayout(nHandler, (x2, y2, width2, height2) => {
                this.refs.mainPanel.scrollTo({ y: y2 - (st.height * 0.2) + height2 + 20 });

                //Set the position for the triangle
                this.refs['word_' + id].measureInWindow((xWindow) => {
                    GLOBAL.ARTICLEMODAL.setState({ triangleStyle: { left: xWindow + (width / 2) } })    
                })

                function informUser(isCorrect)
                {
                    if (isCorrect)
                        GLOBAL.ARTICLEMODAL.setState({ informText: 'Correct! ' + modalQuestion.INFORM })
                    else GLOBAL.ARTICLEMODAL.setState({ informText: 'Incorrect answer. ' + modalQuestion.INFORM })
                    
                    //Set colors
                    GLOBAL.ARTICLEMODAL.setState({
                        generalColor: 'white',
                        pointColor: 'white',
                        titleColor: GLOBAL.ARTICLEMODAL.state.questionColor,
                        pointText: 'points earned',
                        checkText: 'NEXT',
                        checkBorderWidth: 2
                    })
                };
                
                //Check if the ANSWERED question is correct
                if (modalQuestion.USER_ANSWERS == -1 || modalQuestion.USER_ANSWERS.length == 0)
                    GLOBAL.ARTICLEMODAL.setState({ 
                        informText: '',
                        generalColor: GLOBAL.ARTICLEMODAL.state.questionColor ,
                        pointColor: 'black',
                        titleColor: 'white',
                        pointText: 'points',
                        checkText: 'CHECK',
                        checkBorderWidth: 0
                    })
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

                //Open the modal
                if (modalQuestion.TYPE == 'DRAGWORD')
                {
                    let newArr = modalQuestion.ANSWERS.slice();
                    newArr = EXTRA.shuffle(newArr);
                    this.refs.qModal.open(true, newArr);
                }
                else this.refs.qModal.open(false);
                
            })

        });
    }

    //Render highlighted word
    renderHighlight(id, content, type, code)
    {
        const bColor = (type == 'GRAMMAR') ? 'rgb(221, 233, 209)' : 'rgb(252, 235, 197)'
        const uColor = (type == 'GRAMMAR') ? 'rgb(119, 184, 62)' : 'rgb(223, 150, 119)'

        //Detect if end of word has a special character to exclude it from being highlighted
        var tempChar = '', newContent = '';
        if (content.substring(content.length - 1).match(/[^a-zA-Z ]/g))
        {
            tempChar = content.substring(content.length - 1);
            newContent = content.substring(0, content.length - 1);
        }
        else
        {
            tempChar = '';
            newContent = content;
        }

        //Highlight
        return (
            <View key={id} style={{ flexDirection: 'row' }}>

                {/* Actual highlighted word */}
                <TouchableHighlight
                    ref={'word_' + id}
                    onPress={() => this.onWordPress(id, type, code)}
                    style={{ backgroundColor: bColor, borderRadius: 5, marginTop: 2, marginBottom: 2 }}
                    underlayColor={uColor}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../images/icon_undone.png')}
                            style={{ width: 10, height: 10, marginLeft: 2, marginRight: 2 }}
                            resizeMode='stretch'/>

                        <Text style={{ color: 'black', fontSize: 15, marginRight: 2 }}>{newContent}</Text>

                    </View>

                </TouchableHighlight>

                {/* Special character at the end */}
                <Text>{tempChar}{' '}</Text>
            </View>
        )
    }

    //Render each word
    renderWord(word, i)
    {
        if (ignoreList.indexOf(i) > -1)
            return(<View key={i}/>);

        if (word == '\n')
            return (<Text key={i} style={{ marginTop: 2, marginBottom: 2, width: st.width }}>{' '}</Text>);

        //Search for phrase with multiple words
        for (var j = 0; j < wordsToHighlight.length; ++j)
        {
            if (wordsToHighlight[j].POS === i)
            {
                var tempWord = '';

                for (var c = i; c < (i + wordsToHighlight[j].COUNT); ++c)
                {
                    //Put next word to ignore list, so that map() will skip this word
                    ignoreList.push(c);

                    //Pending all words together
                    if (tempWord != '')
                        tempWord = tempWord + ' ' + words[c]
                    else tempWord = words[c];
                };

                //return highlighted phrase/word
                return(this.renderHighlight(i, tempWord, wordsToHighlight[j].TYPE, wordsToHighlight[j].QUESTIONCODE));
            }
        }

        //else just return normal word
        return (<Text key={i} onPress={() => alert(`Selected: "` + word + `" - Location: ` + i)} style={{ color: 'black', fontSize: 15, marginTop: 2, marginBottom: 2 }}>{word}{' '}</Text>);
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
                        progress={totalEarnedGrammarPoint / totalGrammarPoint}
                        width={st.width / 2} height={5}
                        borderRadius={0}
                        borderWidth={0}
                        color={GLOBAL.grammarPointUpperColor}
                        unfilledColor={GLOBAL.grammarPointUnderColor}>
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

    clearList()
    {
        ignoreList.splice(0, ignoreList.length);
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
                        <Image
                            source={{ uri: this.props.curArticle.IMAGE }}
                            style={{ width: st.width, height: st.width * 0.6, flexDirection: 'row' }}
                            resizeMode='stretch'>

                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black', opacity: 0.2 }}/>

                            <Text style={{ fontWeight: 'bold', fontSize: 25, fontFamily: 'Cochin', color: 'white', alignSelf: 'flex-end', padding: 15 }}>{this.props.curArticle.TITLE}</Text>

                        </Image>

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
                                progress={totalEarnedGrammarPoint / totalGrammarPoint}
                                width={st.width / 2} height={40}
                                borderRadius={0}
                                borderWidth={0}
                                color={GLOBAL.grammarPointUpperColor}
                                unfilledColor={GLOBAL.grammarPointUnderColor}>

                                <Text style={{ color: 'white', marginLeft: 15 }}>
                                    {totalEarnedGrammarPoint}/{totalGrammarPoint}
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {' '}Grammar
                                    </Text>
                                </Text>
                            </Progress.Bar>
                        </View>

                        {/* Objective Info */}
                        <View style={{ padding: 15, flexDirection: 'row' }}>
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
                        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start' }}>
                            { this.clearList() }
                            { words.map((word, index) => this.renderWord(word, index)) }
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

                    {/* Space View */}
                    <View style={{ width: st.width, height: this.state.spaceViewHeight }} />

                </ScrollView>

                { this.renderTopPanel() }

                <QuestionModal ref='qModal'/>

                <ShareModal ref='sModal'/>
            </View>
        );
    }
}