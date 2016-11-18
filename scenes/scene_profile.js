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
    TouchableWithoutFeedback
} from 'react-native';

import { Actions, Scene, Router, Tabbar } from 'react-native-router-flux'

const GLOBAL = require('../global')
import Info from '../components/tab_info';
import Activity from '../components/tab_activity';
import Progress from '../components/tab_progress';
import EditProfile from '../components/modal_edit_profile';

/*---*/
let info = GLOBAL.USER_DATA.BASIC_INFO;
let st = Dimensions.get('window');
/*---*/

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: true,
            showActivity: false,
            showProgress: false,
            menuOpen: false,
        }
        this.totalPoint = 0;
    }

    componentWillUnmount() {
        GLOBAL.PROFILESCENE = null;
    }

    //Get cumulative points
    componentWillMount() {
        GLOBAL.PROFILESCENE = this;

        GLOBAL.QUESTION_DATA.forEach((item) => {
            this.totalPoint += item.POINTS_EARNED;
        });

        GLOBAL.ARTICLES.forEach((item) => {
            if (item.ID.indexOf('VF') > -1)
            {
                item.QUESTIONS.forEach((question) => {
                    this.totalPoint += question.POINTS_EARNED;
                })
            }
        })
    }

    //Show the tabs
    renderTab() 
    {
        if (this.state.showInfo) 
            return (
                <Info
                    country={info.COUNTRY}
                    job={info.JOBTITLE}
                    shortbio={info.SHORTBIO} />
            )
        else if (this.state.showProgress) 
            return <Progress/>
        else if (this.state.showActivity) 
            return <Activity/>
    }

    //Open modal to edit user information
    openSelection() {
        this.refs.editProfile.open();
    }

    //Main render function
    render() 
    {
        return (
            <View style={{ flex: 1 }}>
                {/* Action Bar */}
                <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white' }}>
                    {/*Menu Button*/}
                    <TouchableOpacity 
                        onPress={this.props.passToggle}
                        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require('../images/icon_menu.png')}
                            resizeMode='stretch' />
                    </TouchableOpacity>

                    {/* Scene Title */}
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 18 }}>My Profile</Text>
                    </View>

                    {/* Edit Profile Button */}
                    <TouchableOpacity 
                        onPress={() => this.openSelection()}
                        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }} >
                        <Image
                            style={{ width: 25, height: 25 }}
                            source={require('../images/icon_settings.png')}
                            resizeMode='stretch'/>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={{ width: st.width, height: 1, backgroundColor: '#E5E5E5' }} />

                {/* Main Content */}
                <ScrollView style={{ flex: 1 }}>

                    {/* Basic Information */}
                    <View style={{ paddingTop: 15, paddingBottom: 15, width: st.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        
                        {/* Profile Picture */}
                        <Image 
                            style={{ width: 150, height: 150, borderRadius: 75, borderColor: '#ED6030', borderWidth: 2 }}
                            source={require('../images/profile_pic.jpg')} />

                        {/* Name and Points */}
                        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, color: '#292929', width: st.width - 180 - 30}}>{info.NAME}</Text>
                            <Text style={{ fontSize: 20 }}>
                                <Text style={{ color: '#ED6030' }}>{this.totalPoint}</Text>
                                {' '}Points
                            </Text>
                        </View>

                    </View>

                    {/* Tab Buttons */}
                    <View style={[styles.tabView, { backgroundColor: 'white' }]}>
                        {/* Info Button */}
                        <TouchableOpacity
                            style={[styles.tabButton, {
                                backgroundColor: this.state.showInfo ? '#ED6030' : 'white',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                            }]}
                            onPress={() => {
                                this.setState({
                                    showInfo: true,
                                    showActivity: false,
                                    showProgress: false
                                })
                            } }>
                            <Text style={{ color: this.state.showInfo ? '#F4F4F4' : '#ED6030' }}>Info</Text>
                        </TouchableOpacity>

                        {/* Progress Button */}
                        <TouchableOpacity
                            style={[styles.tabButton, {
                                backgroundColor: this.state.showProgress ? '#ED6030' : 'white',
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                            }]}
                            onPress={() => {
                                this.setState({
                                    showInfo: false,
                                    showActivity: false,
                                    showProgress: true
                                })
                            }}>
                            <Text style={{ color: this.state.showProgress ? '#F4F4F4' : '#ED6030' }}>Progress</Text>
                        </TouchableOpacity>

                        {/* Activity Button */}
                        <TouchableOpacity 
                            style={[styles.tabButton, {
                                backgroundColor: this.state.showActivity ? '#ED6030' : 'white',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                            }]}
                            onPress={() => {
                                this.setState({
                                    showInfo: false,
                                    showActivity: true,
                                    showProgress: false,
                                })
                            }}>
                            <Text style={{ color: this.state.showActivity ? '#F4F4F4' : '#ED6030' }}>Activity</Text>
                        </TouchableOpacity>
                    </View>

                    {this.renderTab()}

                </ScrollView>

                <EditProfile ref='editProfile'/>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        height: 30,
        borderWidth: 1,
        borderColor: '#ED6030',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    tabView: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    }

})

