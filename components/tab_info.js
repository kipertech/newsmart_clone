import React, {Component} from 'react';
import {
		AppRegistry,
		StyleSheet,
		Text,
		View,
		TouchableHighlight,
		Dimensions,
		Image,
		Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
const GLOBAL = require('../global')

let info = GLOBAL.USER_DATA.BASIC_INFO;
let st = Dimensions.get('window');

export default class Info extends Component 
{
	render() 
	{
		return (
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<View style={styles.devider}/>

					{/* Contry */}
					<View style={styles.itemContainer}>
							<Text>COUNTRY</Text>
							<Text style={{ color: '#292929', fontWeight: 'bold' }}>{info.COUNTRY}</Text>
					</View >

					<View style={styles.devider}/>

					{/* Job Title */}
					<View style={styles.itemContainer}>
							<Text>JOB TITLE</Text>
							<Text style={{ color: '#292929', fontWeight: 'bold' }}>{info.JOBTITLE}</Text>
					</View >

					<View style={styles.devider}/>

					{/* Short Bio */}
					<View style={styles.itemContainer}>
							<Text>SHORT BIO</Text>
							<Text style={{ color: '#292929', fontWeight: 'bold' }}>{info.SHORTBIO}</Text>
					</View>

					<View style={styles.devider}/>
				</View>

				{/* Test Button */}
				<View style={{ width: st.width, justifyContent: 'center', alignItems: 'center' }}>
					<TouchableHighlight 
						onPress={() => {
							Alert.alert('Pandora Enki', `PLACEMENT TEST\n\nNote: This is an experimental feature of this app, please do expect bugs and proceed with your own risk.\n\nTap "Close" on the top left corner to close this test at anytime.`)
							Actions.test()}
						}>
						<Image 
							source={require('../images/test.png')}
							style={{ width: st.width, height: st.width * 0.3 }}
							resizeMode='stretch'
						/>
					</TouchableHighlight>
				</View >

				{/* Sing Out Button */}
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
					<TouchableHighlight 
						style={styles.signOutButton} 
						onPress={() => Alert.alert('Pandora Enki', 'Cannot sign out right now, please try again later.')}
						underlayColor='#E5E5E5'>
						<Text style={{ fontSize: 16, color: '#292929' }}>
								Sign Out
						</Text>
					</TouchableHighlight>
				</View >

			</View >
		)
	}
}

const styles = StyleSheet.create({
		itemContainer: {
				width: st.width,
				paddingBottom: 10,
				paddingTop: 10,
				paddingLeft: 10
		},
		signOutButton: {
				justifyContent: 'center',
				alignItems: 'center',
				borderWidth: 1,
				borderRadius: 5,
				borderColor: '#ED6030',
				width: Dimensions
						.get('window')
						.width - 50,
				height: 40
		},
		button: {
				width: 25,
				height: 25
		},
		devider: {
				height: 1,
				backgroundColor: '#E5E5E5',
		}
})