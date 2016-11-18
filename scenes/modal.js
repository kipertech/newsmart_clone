import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    NativeModules,
    Dimensions,
    AppRegistry,
    Alert
} from 'react-native';
import Modal from 'react-native-modalbox';
import Radio from 'react-native-radio-button-classic';
var Option = Radio.Option;
import CheckBox from 'react-native-check-box';
import DragButton from '../components/dragButton';
import SortableListView from 'react-native-sortable-listview';
import SortableList from 'react-native-sortable-list';
import Triangle from '../components/Triangle';
GLOBAL = require('../global');
EXTRA = require('../components/extra_functions')
import moment from 'moment';

//Variables
let st = Dimensions.get('window');
var selectedMulti = [], selectedRadio = -1;
var obj = {}, curArray = [];

export default class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curQuestion: Object,
            wordID: 0,

            //Settings
            questionColor: GLOBAL.vocabColor,
            mouseDownColor: GLOBAL.vocabMouseDownColor,

            //Triangle
            triangleStyle: { top: -20, left: -20 },

            //Inform text
            informText: '',

            //Title area settings
            generalColor: 'white',
            titleColor: GLOBAL.vocabColor,
            pointColor: 'white',
            pointText: 'points earned',
            checkText: 'NEXT',
            checkBorderWidth: 5,
        }
    }

    componentWillMount() {
        GLOBAL.ARTICLEMODAL = this;
    };

    componentWillUnmount() {
        GLOBAL.ARTICLEMODAL = null;
    };

    informUser(isCorrect)
    {
        if (isCorrect)
            this.setState({ informText: 'Correct! ' + this.state.curQuestion.INFORM })
        else this.setState({ informText: 'Incorrect answer. ' + this.state.curQuestion.INFORM })
        
        //Set colors
        this.setState({
            generalColor: 'white',
            pointColor: 'white',
            titleColor: this.state.questionColor,
            pointText: 'points earned',
            checkText: 'NEXT',
            checkBorderWidth: 2
        })
    };

    open(isDrag, dragArray)
    {
        if (isDrag)
        {
            obj = {}

            if (this.state.informText != '')
                curArray = []
            else curArray = dragArray;

            //Load user question data
            this.state.curQuestion.USER_ANSWERS.forEach((value) => {
                this.state.curQuestion.ANSWERS.forEach((value2) => {
                    if (value2.KEY == value)
                        obj[`${EXTRA.getObjSize(obj) + 1}`] = { KEY: value, WORD: value2.WORD };
                });
            });

            this.forceUpdate();
        }

        //Reset all data
        selectedMulti = [];
        selectedRadio = -1;

        //Open the modal
        this.refs.mainModal.open();
    }

    //Manage all render modes
    pickRender()
    {   
        if (this.state.curQuestion.TYPE == 'SINGLECHOICE')
            return(this.renderSingleChoice())
        else if (this.state.curQuestion.TYPE == 'MULTIPLECHOICE')
            return(this.renderMultiChoice())
        else if (this.state.curQuestion.TYPE == 'DRAGWORD')
            return(this.renderDragQuestion())
    }

    onAdd(value)
    {
        //Add new item to the current object
        obj[`${EXTRA.getObjSize(obj) + 1}`] = { KEY: value.KEY, WORD: value.WORD };

        console.log(obj);

        //Force re-render
        this.forceUpdate();

        //Remove from list
        curArray.forEach((data, index) => {
            if (data == value)
                curArray.splice(index, 1);
        })
    }

    onRemove(value)
    {
        if (this.state.informText != '')
            return;

        //Push word out of the box
        var checkArr = Object.keys(obj);
        checkArr.forEach(data => {
            if (obj[data].KEY == value.KEY)
            {
                delete obj[data];
                this.forceUpdate();
            }
        })

        //Put back to original list
        curArray.push(value);
    }

    //DRAGWORD - Single Item
    renderSingleDragWord(value)
    {
        return <DragButton key={value.KEY} content={value.WORD} onClick={() => this.onAdd(value)} />
    }

    //DRAGWORD - Map All
    renderDragQuestion()
    {
        console.log(curArray);
        return(
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ flex: 1 }}>
                <SortableListView
                    style={{ width: st.width - 30, height: 150, backgroundColor: 'rgb(142, 147, 148)', borderRadius: 4 }}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 5, width: st.width - 40 }}
                    data={obj}
                    renderRow={(data) => <DragButton key={data.KEY} content={data.WORD} onClick={() => this.onRemove(data)}/>}
                />

                <View style={{ width: st.width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 5, marginLeft: -2 }}>
                    { curArray.map((value) => this.renderSingleDragWord(value)) }
                </View>

                {this.renderInformText()}
            </ScrollView>
        )
    }

    //MULTIPLE - Render Item
    renderMultiChoiceCheckbox(title, i)
    {
        return(
             <CheckBox
                key={i}
                onClick={() => {
                    let index = selectedMulti.indexOf(i + 1);
                    if (index < 0)
                        selectedMulti.push(i + 1)
                    else
                        selectedMulti.splice(index, 1)
                }}
                isChecked={this.state.curQuestion.USER_ANSWERS.indexOf(i + 1) > -1}
                rightText={title}
                textSize={16}
                disabled={this.state.informText != ''}
            />
        )
    }

    //MULTIPLE - Map All Answers
    renderMultiChoice()
    {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>

                <Radio onSelect={this.onSelect.bind(this)}>
                    { this.state.curQuestion.ANSWERS.map((value, index) => this.renderMultiChoiceCheckbox(value, index)) }
                </Radio>

                {this.renderInformText()}
            </ScrollView>
        )
    }

    //RADIO - Renger Item
    renderSingleChoiceRadio(title, i)
    {
        return(
            <Option color="gray" selectedColor="gray" key={i}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </Option>
        )
    }

    //RADIO - onSelect Event Handler
    onSelect(index)
    {
        selectedRadio = index + 1;
    }

    //RADIO - Map All Answers
    renderSingleChoice()
    {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>

                <Radio 
                    onSelect={this.onSelect.bind(this)} 
                    defaultSelect={this.state.curQuestion.USER_ANSWERS - 1}
                    disabled={this.state.informText != ''}
                    >
                    { this.state.curQuestion.ANSWERS.map((value, index) => this.renderSingleChoiceRadio(value, index)) }
                </Radio>

                {this.renderInformText()}
            </ScrollView>
        )
    }

    //onClick event for check button
    onCheck()
    {
        let value = this.state.curQuestion;

        if (this.state.checkText == 'CHECK')
        {
            if (this.state.curQuestion.TYPE == 'SINGLECHOICE')
            {
                if (selectedRadio == -1)
                {
                    Alert.alert('Pandora Enki', 'Please finish your question first');
                    return;
                }

                //Save to data
                value.USER_ANSWERS = selectedRadio;
                value.ANSWERED_DATE = moment(new Date()).format('MM/DD/YYYY');;

                //Update render
                if (selectedRadio == value.CORRECT_ANS)
                {
                    this.informUser(true)
                    value.POINTS_EARNED = value.POINT;
                }
                else
                {
                    this.informUser(false);
                    value.POINTS_EARNED = 0;
                }
            }
            else if (this.state.curQuestion.TYPE == 'MULTIPLECHOICE')
            {
                if (selectedMulti.length == 0)
                {
                    Alert.alert('Pandora Enki', 'Please finish your question first');
                    return;
                }

                //Save to data
                value.USER_ANSWERS = selectedMulti.slice();
                value.ANSWERED_DATE = new Date();

                //Update render
                if (EXTRA.compareArrays(selectedMulti, this.state.curQuestion.CORRECT_ANS))
                {
                    this.informUser(true)
                    value.POINTS_EARNED = value.POINT;
                }
                else
                {
                    this.informUser(false);

                    //Calculate total corrected answers
                    var total = 0;
                    selectedMulti.forEach((v1) => {
                        value.CORRECT_ANS.forEach((v2) => {
                            if (v1 == v2)
                                ++total;
                            else --total;
                        })
                    });
                    
                    total = (total < 0) ? 0 : total;
                    //Save point to data
                    value.POINTS_EARNED = Math.round(value.POINT * (total / value.CORRECT_ANS.length));
                }
            }
            else if (this.state.curQuestion.TYPE == 'DRAGWORD')
            {
                //Check if user has finished the question
                if (Object.keys(obj).length != this.state.curQuestion.ANSWERS.length)
                {
                    alert('Plese finish the question by putting all the words into the box!');
                    return;
                };

                //Check if the words are in correct order
                var check = true;
                Object.keys(obj).forEach((data) => {
                    if (obj[data].WORD != this.state.curQuestion.ANSWERS[data - 1].WORD)
                        check = false;
                });

                //Save to data
                var tempArr = [];
                Object.keys(obj).forEach((data) => tempArr.push(obj[data].KEY) );
                value.USER_ANSWERS = tempArr.slice();
                value.ANSWERED_DATE = new Date();

                //Set render
                this.informUser(check);
                value.POINTS_EARNED = (check) ? value.POINT : 0;
            }
            else Alert.alert('Pandora Enki', 'Unsupported question type, please contact the developer for more information');

            //Update points on article scene
            GLOBAL.ARTICLESCENE.calculatePoints();
            GLOBAL.ARTICLESCENE.forceUpdate();
        }
        else
        {
            //Go to next question
            if (GLOBAL.ARTICLESCENE.props.curArticle.ID.indexOf('AF') > -1)
            {
                const arr = GLOBAL.ARTICLESCENE.props.curArticle.WORDS_DATA;
                for (var i = 0; i < arr.length; ++i)
                {
                    if (arr[i].POS == this.state.wordID)
                    {
                        if (i >= arr.length - 1)
                            GLOBAL.ARTICLESCENE.setState({ spaceViewHeight: 0 }, () => {
                                this.refs.mainModal.close()
                            })
                        else
                        {
                            this.refs.mainModal.close();
                            setTimeout(
                                () => GLOBAL.ARTICLESCENE.onWordPress(arr[i + 1].POS, arr[i + 1].TYPE, arr[i + 1].QUESTIONCODE)
                            , 200);
                        };
                        break;   
                    }
                }
            }
            else
            {
                const arr = GLOBAL.ARTICLESCENE.props.curArticle.QUESTIONS;
                if (this.state.wordID >= arr.length - 1)
                    this.refs.mainModal.close()
                else
                {
                    this.refs.mainModal.close();
                    setTimeout(
                        () => GLOBAL.ARTICLESCENE.onWordPress(this.state.wordID + 1, arr[this.state.wordID + 1].TYPE_QUESTION)
                    , 300);
                }
            }
        }
    }

    //Scroll back to main article
    scrollBack()
    {
        if (GLOBAL.ARTICLESCENE.overScroll)
            GLOBAL.ARTICLESCENE.mainPanel.scrollTo({ y: GLOBAL.ARTICLESCENE.scrollHeight })
    }

    //Render the inform text after user has answered
    renderInformText()
    {
        if (this.state.informText != '')
            return(
                <View style={{ padding: 15, backgroundColor: 'white', borderRadius: 4, marginTop: 15 }}>
                    <Text>{this.state.informText}</Text>
                </View>
            )
        else return(<View/>)
    }

    //Render divider and requirement text
    renderRequirement()
    {
        if (this.state.informText == '')
            return(
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                    {/* Vertical divider */}
                    <View style={{ width: 1, height: 40, backgroundColor: 'gray', opacity: 0.2, marginLeft: 10 }} />

                    {/* Requirement */}
                    <Text style={{color: 'black', marginLeft: 10, marginBottom: 5, marginTop: 5, width: st.width - 150}}>
                        {this.state.curQuestion.REQUIREMENT}
                    </Text>
                </View>
            )
        else return(<View style={{ flex: 1 }}/>);
    }

    //Render disabled view
    renderDisabledView()
    {
        if (this.state.informText == '')
            return(<View/>)
        else
        {
            return(
                <View style={{ 
                    position: 'absolute', top: 0, 
                    height: st * 0.8 - 20 - 50 - 90, width: st.width, 
                    backgroundColor: 'transparent' }}
                />
            )   
        }
    }

    //Main render function
    render()
    {
        return (
            <Modal {...this.props}
                style={{ height: st.height * 0.8 + 20, width: st.width, backgroundColor: 'transparent' }}
                position={'bottom'} ref={'mainModal'} backButtonClose={true}
                backdropOpacity={0.7}
                backdropPressToClose={false}
                backButtonClose={false}
                animationDuration={100}
                onClosed={this.scrollBack.bind(this)}
                >

                {/* Triangle */}
                <Triangle
                    width={20}
                    height={20}
                    color={this.state.titleColor}
                    direction={'up'}
                    style={[this.state.triangleStyle]}
                />

                {/* Wrap view */}
                <View style={{ height: st.height * 0.8, width: st.width, backgroundColor: '#F5F5F5' }}>
                    {/* Title */}
                    <View style={{ flexDirection: 'row', height: 50, width: st.width, alignItems: 'center', padding: 15, backgroundColor: this.state.titleColor }}>

                        {/* Point */}
                        <View style={[styles.pointContainer, {borderColor: this.state.generalColor}]}>
                            <Text style={{ color: this.state.pointColor }}>{(this.state.informText == '') ? this.state.curQuestion.POINT : this.state.curQuestion.POINTS_EARNED}</Text>
                        </View>

                        <Text style={{color: this.state.generalColor, marginLeft: 5, marginBottom: 3}}>{this.state.pointText}</Text>

                        { this.renderRequirement() }

                        {/* Close button */}
                        <TouchableOpacity
                            onPress={() => {
                                GLOBAL.ARTICLESCENE.setState({ spaceViewHeight: 0 }, () => {
                                    this.refs.mainModal.close()
                                });
                            }}
                            style={{ width: 50, height: 50, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../images/button_close_black.png')}
                                style={{ width: 15, height: 15, opacity: 0.2 }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={{ width: st.width, height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                    { this.pickRender() }

                    {/* Check Button */}
                    <View style={{ 
                        flexDirection: 'row', height: 80, width: st.width, 
                        backgroundColor: this.state.questionColor, alignItems: 'center', justifyContent: 'center', 
                        }}>

                        <TouchableHighlight 
                            underlayColor={this.state.mouseDownColor} 
                            onPress={() =>  this.onCheck()} 
                            style={{ 
                                backgroundColor: this.state.titleColor, borderRadius: 4, width: st.width - 30, height: 50, 
                                alignItems: 'center', justifyContent: 'center',
                                borderWidth: this.state.checkBorderWidth, borderColor: 'white' }}>

                            <Text style={{ color: this.state.generalColor }}>{this.state.checkText}</Text>

                        </TouchableHighlight>
                    </View>
                </View>

            </Modal>
        );
    }
}

var styles = StyleSheet.create({

    pointContainer:
    {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
