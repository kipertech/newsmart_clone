/* @flow */

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
GLOBAL = require('../global');

//Variables
let stW = Dimensions.get('window').width, stH = Dimensions.get('window').height;
let selectedMulti = [];

export default class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curQuestion: Object,

            //Settings
            questionColor: GLOBAL.vocabColor,
            mouseDownColor: GLOBAL.vocabMouseDownColor,

            //Selected Radio
            selectedRadio: 0
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
        if (this.state.curQuestion.TYPE == 'SINGLECHOICE')
            return(this.renderSingleChoice())
        else if (this.state.curQuestion.TYPE == 'MULTIPLECHOICE')
            return(this.renderMultiChoice())
        else return(null);
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

                <Radio onSelect={this.onSelect.bind(this)} defaultSelect={0}>
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
                    <Text style={{color: 'black', marginLeft: 10, marginBottom: 3}}>
                        {this.state.curQuestion.REQUIREMENT}
                    </Text>

                    {/* Close button */}
                    <View style={{ width: 50, height: 50, position: 'absolute', top: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.refs.mainModal.close() }>
                            <Image
                                source={require('../images/button_close.png')}
                                style={{ width: 15, height: 15, opacity: 0.2 }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                    </View>
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
