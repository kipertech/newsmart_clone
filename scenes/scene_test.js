import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Modal from 'react-native-modalbox'
import Radio from 'react-native-radio-button-classic';
import CheckBox from 'react-native-check-box';
import { Actions } from 'react-native-router-flux'

const Option = Radio.Option;
const GLOBAL = require('../global')
const window = Dimensions.get('window')

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curQuestion: GLOBAL.QUESTION_TEST[0],
            indexQuestion: 1,
            //Settings
            questionColor: '#EE6032',
            mouseDownColor: GLOBAL.vocabMouseDownColor,

            //Selected Radio
            selectedRadio: 0
        },
            selectedMulti = [];
        count = 0;
        question = GLOBAL.QUESTION_TEST
    }

    componentWillMount() {
        GLOBAL.ARTICLEMODAL = this;
    }
    //Manage all render styles
    pickRender(indexQuestion) {
        if (question[indexQuestion].TYPE == 'SINGLECHOICE')
            return (this.renderSingleChoice())
        else if (question[indexQuestion].TYPE == 'MULTIPLECHOICE')
            return (this.renderMultiChoice())
        else return (null);
    }

    //MULTIPLE - Render Item
    renderMultiChoiceCheckbox(title, i) {
        return (
            <CheckBox
                key={i}
                onClick={() => {
                    let index = selectedMulti.indexOf(i);
                    if (index < 0)
                        selectedMulti.push(i)
                    else
                        selectedMulti.splice(index, 1)
                } }
                isChecked={false}
                rightText={title}
                textSize={16}
                />
        )
    }

    //MULTIPLE - Map All Answers
    renderMultiChoice() {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: window.height * 0.8 - 130 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>
                <Image style={{ width: window.width*-20, height: 300 }} source={this.state.curQuestion.IMAGE} />
                <Radio onSelect={this.onSelect.bind(this)} defaultSelect={0}>
                    {this.state.curQuestion.ANSWERS.map((value, index) => this.renderMultiChoiceCheckbox(value, index))}
                </Radio>
            </ScrollView>
        )
    }

    //RADIO - Renger Item
    renderSingleChoiceRadio(title, i) {
        return (
            <Option color="gray" selectedColor="gray" key={i}>
                <Text style={{ fontSize: 16 }}>{title}</Text>
            </Option>
        )
    }

    //RADIO - onSelect Event Handler
    onSelect(index) {
        this.setState({
            selectedRadio: index
        });
    }

    //RADIO - Map All Answers
    renderSingleChoice() {

        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: window.height * 0.8 - 130 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>
                <Image style={{ width: window.width-20, height: 300 }} source={this.state.curQuestion.IMAGE} />
                <Radio onSelect={this.onSelect.bind(this)} defaultSelect={null}>
                    {this.state.curQuestion.ANSWERS.map((value, index) => this.renderSingleChoiceRadio(value, index))}
                </Radio>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ paddingLeft: 30 }}>
                        <Text style={{ color: '#ED6030', fontSize: 18 }} >Close</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
                    {this.pickRender(this.state.indexQuestion)}
                </View>
                <View style={[styles.buttonContainer, { backgroundColor: this.state.questionColor, }]}>
                    <TouchableHighlight
                        underlayColor={this.state.mouseDownColor}
                        onPress={() => {
                            if (count > GLOBAL.QUESTION_TEST.length) {
                                return;
                            }

                            this.setState({
                                indexQuestion: count++,
                                curQuestion: GLOBAL.QUESTION_TEST[count]
                            })
                        } }
                        style={styles.checkButton}>
                        <Text style={{ color: this.state.questionColor }}>CHECK</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        width: window.width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    checkButton:
    {
        backgroundColor: 'white',
        borderRadius: 4,
        width: window.width - 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    devider: {
        height: 1,
        backgroundColor: '#F4F4F4',
        opacity: 0.2,
    }

});