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
GLOBAL = require('../global');

//Variables
let stW = Dimensions.get('window').width, stH = Dimensions.get('window').height;
let selectedMulti = [];
var obj = {}, curArray = [];

//Shuffle words with drag word question
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getObjSize(_obj)
{
    //Calculate the size of the object
    var size = 0, key;
    for (key in _obj) {
        if (_obj.hasOwnProperty(key)) size++;
    }

    return size;
}

export default class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curQuestion: Object,

            //Settings
            questionColor: GLOBAL.vocabColor,
            mouseDownColor: GLOBAL.vocabMouseDownColor,

            //Selected Radio
            selectedRadio: 0,

            //DragWord Mode
            shuffled: false,
        }
    }

    componentWillMount() {
        GLOBAL.ARTICLEMODAL = this;
    }

    open()
    {
        this.refs.mainModal.open();
    }

    //Manage all render styles
    pickRender()
    {   
        //Pick render mode for each type of question
        if (this.state.curQuestion.TYPE == 'SINGLECHOICE')
            return(this.renderSingleChoice())
        else if (this.state.curQuestion.TYPE == 'MULTIPLECHOICE')
            return(this.renderMultiChoice())
        else if (this.state.curQuestion.TYPE == 'DRAGWORD')
            return(this.renderDragQuestion())
    }

    onAdd(key, value)
    {
        //Add new item to the current object
        obj[`${getObjSize(obj)}`] = { KEY: key, WORD: value };

        //Force re-render
        this.setState();
    }

    onRemove(key)
    {
        var checkArr = Object.keys(obj);
        checkArr.forEach(data => {
            if (obj[data].KEY == key)
            {
                delete obj[data];
                this.setState();
            }
        })
    }

    //DRAGWORD - Single Item
    renderSingleDragWord(word, i)
    {
        return <DragButton key={i} content={word} onClick={() => this.onAdd(i, word)} />
    }

    //DRAGWORD - Map All
    renderDragQuestion()
    {
        let newArr = this.state.curQuestion.ANSWERS.slice();
        if (!this.state.shuffled)
        {
            newArr = shuffle(newArr);
            this.setState({ shuffled: true })
        }
        curArray = newArr;

        return(
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: stH * 0.8 - 130, width: stW }}>
                <SortableListView
                    style={{ width: stW, height: 150, backgroundColor: 'rgb(142, 147, 148)', borderRadius: 10, paddingLeft: 5, paddingRight: 5 }}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 1 }}
                    data={obj}
                    renderRow={(data) => <DragButton key={data.KEY} content={data.WORD} onClick={() => this.onRemove(data.KEY)}/>}
                />

                <View style={{ width: stW, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 5, marginLeft: -2 }}>
                    { curArray.map((value) => this.renderSingleDragWord(value.WORD, value.KEY)) }
                </View>
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
                    let index = selectedMulti.indexOf(i);
                    if (index < 0)
                        selectedMulti.push(i)
                    else
                        selectedMulti.splice(index, 1)
                }}
                isChecked={false}
                rightText={title}
                textSize={16}
            />
        )
    }

    //MULTIPLE - Map All Answers
    renderMultiChoice()
    {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: stH * 0.8 - 130 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>

                <Radio onSelect={this.onSelect.bind(this)}>
                    { this.state.curQuestion.ANSWERS.map((value, index) => this.renderMultiChoiceCheckbox(value, index)) }
                </Radio>
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
        this.setState({
            selectedRadio: index
        });
    }

    //RADIO - Map All Answers
    renderSingleChoice()
    {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: stH * 0.8 - 130 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>

                <Radio onSelect={this.onSelect.bind(this)} defaultSelect={0}>
                    { this.state.curQuestion.ANSWERS.map((value, index) => this.renderSingleChoiceRadio(value, index)) }
                </Radio>
            </ScrollView>
        )
    }

    //Main render function
    render()
    {
        return (
            <Modal {...this.props}
                style={{ height: stH * 0.8, width: stW, backgroundColor: '#F5F5F5' }}
                position={'bottom'} ref={'mainModal'} backButtonClose={true}
                backdropOpacity={0.7}
                backdropPressToClose={false}
                animationDuration={200}
                >

                {/* Title */}
                <View style={{ flexDirection: 'row', height: 50, width: stW, alignItems: 'center', padding: 15 }}>

                    {/* Point */}
                    <View style={[styles.pointContainer, {borderColor: this.state.questionColor}]}>
                        <Text>{this.state.curQuestion.POINT}</Text>
                    </View>

                    <Text style={{color: this.state.questionColor, marginLeft: 5, marginBottom: 3}}>points</Text>

                    {/* Vertical divider */}
                    <View style={{ width: 1, height: 40, backgroundColor: 'gray', opacity: 0.2, marginLeft: 10 }} />

                    {/* Requirement */}
                    <Text style={{color: 'black', marginLeft: 10, marginBottom: 3, width: stW - 150}}>
                        {this.state.curQuestion.REQUIREMENT}
                    </Text>

                    {/* Close button */}
                    <TouchableOpacity
                        onPress={() => this.refs.mainModal.close()}
                        style={{ width: 50, height: 50, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../images/button_close.png')}
                            style={{ width: 15, height: 15, opacity: 0.2 }}
                            resizeMode='stretch'
                        />
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={{ width: stW, height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                { this.pickRender() }

                {/* Check Button */}
                <View style={{ flexDirection: 'row', height: 80, width: stW, backgroundColor: this.state.questionColor, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, left: 0 }}>
                    <TouchableHighlight underlayColor={this.state.mouseDownColor} onPress={() => alert('hello')} style={{ backgroundColor: 'white', borderRadius: 4, width: stW - 30, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: this.state.questionColor }}>CHECK</Text>
                    </TouchableHighlight>
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
