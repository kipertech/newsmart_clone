import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  TouchableHighlight,
  ScrollView,
  TextInput
} from 'react-native';

import Modal from 'react-native-modalbox';

const stW = Dimensions
  .get('window')
  .width;
const stH = Dimensions
  .get('window')
  .height;

const GLOBAL = require('../global')

let info = GLOBAL.USER_DATA.BASIC_INFO;
let st = Dimensions.get('window');

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _NAME: info.NAME,
      _JOBTITLE: info.JOBTITLE,
      _SHORTBIO: info.SHORTBIO,
      _COUNTRY: info.COUNTRY,
      _EMAILADDRESS: ''
    };
  }

  open() 
  {
    this.refs.editProfile.open();
  }

  render() {
    return (
      <Modal
          {...this.props}
          position={'center'}
          ref={'editProfile'}
          backButtonClose={true}
          backdropOpacity={0.7}
          animationDuration={200}
          swipeToClose={false}>

          <View style={{ flex: 1 }}>

              {/*Action Bar*/}
              <View style={{ height: 50, flexDirection: 'row' }}>

                  {/* Close button */}
                  <TouchableOpacity
                      onPress={() => this.refs.editProfile.close()}
                      style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                      <Image
                          source={require('../images/button_close_orange.png')}
                          style={{ width: 15, height: 15 }}
                          resizeMode='stretch'
                      />
                  </TouchableOpacity>

                  {/* Scene Title */}
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'black', fontSize: 18 }}>Edit Profile</Text>
                  </View>

                  {/* Done button */}
                  <TouchableOpacity
                      onPress={() => {
                        info.NAME = this.state._NAME;
                        info.COUNTRY = this.state._COUNTRY; 
                        info.JOBTITLE = this.state._JOBTITLE; 
                        info.SHORTBIO = this.state._SHORTBIO;
                        GLOBAL.PROFILESCENE.forceUpdate();
                        this.refs.editProfile.close();
                      }}
                      style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#ED6030', fontWeight: 'bold' }}>Done</Text>
                  </TouchableOpacity>
              </View>

          <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
              <View style={{ padding: 20 }}>
                  {/* Profile Picture */}
                  <View style={{ flex: .7, justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                      <Image style={styles.imageStyle} source={require('../images/profile_pic.jpg')}/>
                  </View>

                  <Text>NAME{`\n`}</Text>
                  <TextInput
                      underlineColorAndroid='transparent'
                      style={styles.textInput}
                      onChangeText={(_NAME) => this.setState({_NAME})}
                      value={this.state._NAME}/>
                  <Text>{`\n`}</Text>

                  <Text>JOB TITLE{`\n`}</Text>
                  <TextInput
                      underlineColorAndroid='transparent'
                      style={styles.textInput}
                      onChangeText={(_JOBTITLE) => this.setState({_JOBTITLE})}
                      value={this.state._JOBTITLE}/>
                  <Text>{`\n`}</Text>

                  <Text>SHORT BIO{`\n`}</Text>
                  <TextInput
                      underlineColorAndroid='transparent'
                      style={styles.textInput}
                      onChangeText={(_SHORTBIO) => this.setState({_SHORTBIO})}
                      value={this.state._SHORTBIO}/>
                  <Text>{`\n`}</Text>

                  <Text>COUNTRY{`\n`}</Text>
                  <TextInput
                      underlineColorAndroid='transparent'
                      style={styles.textInput}
                      onChangeText={(_COUNTRY) => this.setState({_COUNTRY})}
                      value={this.state._COUNTRY}/>
                  <Text>{`\n`}</Text>

                  <Text>EMAIL ADDRESS{`\n`}</Text>
                  <TextInput
                      underlineColorAndroid='transparent'
                      style={styles.textInput}
                      onChangeText={(_EMAILADDRESS) => this.setState({_EMAILADDRESS})}
                      value={this.state._EMAILADDRESS}/>
                  <Text>{`\n`}</Text>

                </View>
          </ScrollView>
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
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#ED6030',
    borderWidth: 2
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10
  }
});
