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
GLOBAL = require('../global');

let stW = Dimensions.get('window').width, stH = Dimensions.get('window').height;;
let curQuestion = Object;

export default class QuestionModal extends Component {
    constructor(props) {
        super(props);
    }

    open(curCode) {
        GLOBAL.QUESTION_DATA.forEach((value, index) => {
            if (value.CODE == curCode)
            {
                curQuestion = value;
                return;
            }
        })
        //
        this.refs.mainModal.open();
    }

    openMainModal(id) {
        this.refs.mainModal.open();
    }

    render() {
        return (
            <Modal {...this.props}
                style={{ height: stH * 0.8, width: stW }}
                position={'bottom'} ref={'mainModal'} backButtonClose={true}
                backdropOpacity={0.7}
                backdropPressToClose={false}
                animationDuration={200}
                >

                {/* Title */}
                <View style={{ flexDirection: 'row', height: 30, width: stW }}>
                    {/* Point */}
                    <View style={{ width: 24, height: 24, borderRadius: 12, borderColor: 'orange', backgroundColor: 'white' }}>
                        <Text>{curQuestion.POINT}</Text>
                    </View>
                </View>

            </Modal>
        );
    }
}

var styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    },

    selectionItem: {
        alignItems: 'center',
        height: 46,
        padding: 5,
        paddingLeft: 10
    },

    selectionImage: {
        marginRight: 10,
        height: 21,
        width: 25
    },

    selectionText: {
        fontSize: 15,
    }

});

