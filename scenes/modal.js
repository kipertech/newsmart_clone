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
GLOBAL = require('../global');
EXTRA = require('../components/extra_functions')

//Variables
let st = Dimensions.get('window');
var selectedMulti = [], selectedRadio = -1;
var obj = {}, curArray = [];

export default class QuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curQuestion: Object,

            //Settings
            questionColor: GLOBAL.vocabColor,
            mouseDownColor: GLOBAL.vocabMouseDownColor,
        }
    }

    componentWillMount() {
        GLOBAL.ARTICLEMODAL = this;
    }

    open(isDrag, dragArray)
    {
        if (isDrag)
            curArray = dragArray;

        //Reset all data
        obj = {};
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
        obj[`${EXTRA.getObjSize(obj)}`] = { KEY: value.KEY, WORD: value.WORD };

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
        return(
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: st.height * 0.8 - 130, width: st.width }}>
                <SortableListView
                    style={{ width: st.width, height: 150, backgroundColor: 'rgb(142, 147, 148)' }}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 5 }}
                    data={obj}
                    renderRow={(data) => <DragButton key={data.KEY} content={data.WORD} onClick={() => this.onRemove(data)}/>}
                />

                <View style={{ width: st.width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 5, marginLeft: -2 }}>
                    { curArray.map((value) => this.renderSingleDragWord(value)) }
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
                    let index = selectedMulti.indexOf(i + 1);
                    if (index < 0)
                        selectedMulti.push(i + 1)
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
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: st.height * 0.8 - 130 }}>
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
        selectedRadio = index + 1;
    }

    //RADIO - Map All Answers
    renderSingleChoice()
    {
        return (
            <ScrollView contentContainerStyle={{ padding: 15 }} style={{ height: st.height * 0.8 - 130 }}>
                <Text style={{ fontSize: 18 }}>{this.state.curQuestion.QUESTION}</Text>

                <Radio onSelect={this.onSelect.bind(this)}>
                    { this.state.curQuestion.ANSWERS.map((value, index) => this.renderSingleChoiceRadio(value, index)) }
                </Radio>
            </ScrollView>
        )
    }

    //onClick event for check button
    onCheck()
    {
        if (this.state.curQuestion.TYPE == 'SINGLECHOICE')
        {
            if (selectedRadio == this.state.curQuestion.CORRECT_ANS)
            {
                alert('Corrected!');
            }
            else
            {
                alert('Wrong!');
            }
        }
        else if (this.state.curQuestion.TYPE == 'MULTIPLECHOICE')
        {
            if (EXTRA.compareArrays(selectedMulti, this.state.curQuestion.CORRECT_ANS))
            {
                alert('Corrected!');
            }
            else
            {
                alert('Wrong!');
            }
        }
        else if (this.state.curQuestion.TYPE == 'DRAGWORD')
        {
            let check = true;
            Object.keys(obj).forEach((data) => {
                if (obj[data].WORD != this.state.curQuestion.ANSWERS[data].WORD)
                    check = false;
            })
            //
            if (check)
            {
                alert('Corrected!');
            }
            else
            {
                alert('Wrong!');
            }
        }
        else Alert.alert('Pandora Enki', 'Unsupported question type, please contact the developer for more information')
    }

    //Main render function
    render()
    {
        return (
            <Modal {...this.props}
                style={{ height: st.height * 0.8, width: st.width, backgroundColor: '#F5F5F5' }}
                position={'bottom'} ref={'mainModal'} backButtonClose={true}
                backdropOpacity={0.7}
                backdropPressToClose={false}
                animationDuration={200}
                >

                {/* Title */}
                <View style={{ flexDirection: 'row', height: 50, width: st.width, alignItems: 'center', padding: 15 }}>

                    {/* Point */}
                    <View style={[styles.pointContainer, {borderColor: this.state.questionColor}]}>
                        <Text>{this.state.curQuestion.POINT}</Text>
                    </View>

                    <Text style={{color: this.state.questionColor, marginLeft: 5, marginBottom: 3}}>points</Text>

                    {/* Vertical divider */}
                    <View style={{ width: 1, height: 40, backgroundColor: 'gray', opacity: 0.2, marginLeft: 10 }} />

                    {/* Requirement */}
                    <Text style={{color: 'black', marginLeft: 10, marginBottom: 5, marginTop: 5, width: st.width - 150}}>
                        {this.state.curQuestion.REQUIREMENT}
                    </Text>

                    {/* Close button */}
                    <TouchableOpacity
                        onPress={() => {
                            GLOBAL.ARTICLESCENE.setState({ triangleStyle: { top: -20, left: -20 } }, () => this.refs.mainModal.close());
                            
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
                <View style={{ flexDirection: 'row', height: 80, width: st.width, backgroundColor: this.state.questionColor, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableHighlight 
                        underlayColor={this.state.mouseDownColor} 
                        onPress={() =>  this.onCheck()} 
                        style={{ backgroundColor: 'white', borderRadius: 4, width: st.width - 30, height: 50, alignItems: 'center', justifyContent: 'center' }}>

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
