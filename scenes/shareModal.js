import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableHighlight,
    NativeModules,
    Dimensions,
    AppRegistry,
    Alert
} from 'react-native';
import Modal from 'react-native-modalbox';
GLOBAL = require('../global');

export default class ShareSelection extends Component {
    constructor(props) {
        super(props);
    }

    open() {
        this.refs.mainModal.open();
    }

    render() {
        let st = Dimensions.get('window').width;
        return (
            <Modal {...this.props}
                style={{ height: 225 + 40 + 5, width: st - 100 }}
                position={'center'} ref={'mainModal'} backButtonClose={true}
                backdropOpacity={0.7}
                animationDuration={200}
                >

                {/* Title */}
                <View style={{ height: 30, width: st - 100, justifyContent: 'center' }}>
                    <Text style={{ padding: 5, fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>SHARE</Text>
                </View>

                {/* To Facebook */}
                <TouchableHighlight 
                    onPress={() => { 
                        this.refs.mainModal.close();
                    }} 
                    underlayColor='#F2F2F2'
                    style={{ marginTop: 10 }}>

                    <View flexDirection='row' style={[styles.selectionItem]}>
                        <Image
                            source={require('../images/share_FB.png')}
                            style={{marginRight: 15, marginLeft: 6, height: 20, width: 20}} 
                            resizeMode='stretch'
                        />
                        <Text style={[styles.selectionText]}>Facebook</Text>
                    </View>

                </TouchableHighlight>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                {/* To LinkedIn */}
                <TouchableHighlight 
                    onPress={() => { 
                        this.refs.mainModal.close();
                    }} 
                    underlayColor='#F2F2F2'>

                    <View flexDirection='row' style={[styles.selectionItem]}>
                        <Image
                            source={require('../images/share_LinkedIn.png')}
                            style={{marginRight: 15, marginLeft: 6, height: 20, width: 20}} 
                            resizeMode='stretch'
                        />
                        <Text style={[styles.selectionText]}>LinkedIn</Text>
                    </View>

                </TouchableHighlight>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                {/* To Twitter */}
                <TouchableHighlight 
                    onPress={() => { 
                        this.refs.mainModal.close();
                    }} 
                    underlayColor='#F2F2F2'>

                    <View flexDirection='row' style={[styles.selectionItem]}>
                        <Image
                            source={require('../images/share_Twitter.png')}
                            style={{marginRight: 15, marginLeft: 6, height: 20, width: 20}} 
                            resizeMode='stretch'
                        />
                        <Text style={[styles.selectionText]}>Twitter</Text>
                    </View>

                </TouchableHighlight>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                {/* To Google Plus */}
                <TouchableHighlight 
                    onPress={() => { 
                        this.refs.mainModal.close();
                    }} 
                    underlayColor='#F2F2F2'>

                    <View flexDirection='row' style={[styles.selectionItem]}>
                        <Image
                            source={require('../images/share_GooglePlus.png')}
                            style={{marginRight: 15, marginLeft: 6, height: 20, width: 20}} 
                            resizeMode='stretch'
                        />
                        <Text style={[styles.selectionText]}>Google Plus</Text>
                    </View>

                </TouchableHighlight>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: 'gray', opacity: 0.2 }} />

                {/* To Email */}
                <TouchableHighlight 
                    onPress={() => { 
                        this.refs.mainModal.close();
                    }} 
                    underlayColor='#F2F2F2'>

                    <View flexDirection='row' style={[styles.selectionItem]}>
                        <Image
                            source={require('../images/share_Email.png')}
                            style={{marginRight: 15, marginLeft: 6, height: 15, width: 20}} 
                            resizeMode='stretch'
                        />
                        <Text style={[styles.selectionText]}>Send Email</Text>
                    </View>

                </TouchableHighlight>
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
        height: 45,
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

