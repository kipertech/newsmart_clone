import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

import SideMenu from 'react-native-side-menu';
import {Actions, Scene, Router} from 'react-native-router-flux';

import Menu from './components/menu';
import Button from './components/menu_button'
import NewsScene from './scenes/scene_news'
import Profile from './scenes/scene_profile'
import Skills from './scenes/scene_skill'
import Starred from './scenes/scene_starred'
import Test from './scenes/scene_test'
import ArticleScene from './scenes/scene_article'
import VideoScene from './scenes/scene_video'

const scenes = Actions.create(
		<Scene key="root">
				<Scene
						key="news"
						component={NewsScene}
						title="News"
						hideNavBar={true}
						type='replace'/>
				<Scene
						key="skills"
						component={Skills}
						title="Skills"
						hideNavBar={true}
						type='replace'/>
				<Scene
						key="starred"
						component={Starred}
						title="Starred"
						hideNavBar={true}
						type='replace'/>
				<Scene
						key="profile"
						component={Profile}
						title="My Profile"
						hideNavBar={true}
						type='replace'/>
				<Scene
						key="article"
						component={ArticleScene}
						hideNavBar={true}/>
				<Scene
						key="video"
						component={VideoScene}
						hideNavBar={true}/>
				<Scene key="test" component={Test} title="Test" hideNavBar={true}/>
		</Scene>
);

export default class Main extends Component {
		constructor(props) {
				super(props)
				this.state = {
						isOpen: false,
						selectedItem: 'News'
				};
		}

		renderScene(scene) {
				const tempFunc = this.toggle.bind(this);
				switch (scene) {
						case 'news':
								{
										Actions.news({passToggle: tempFunc});
										break;
								}

						case 'skills':
								{
										Actions.skills();
										break;
								}

						case 'starred':
								{
										Actions.starred();
										break;
								}
						case 'profile':
								{
										Actions.profile({passToggle: tempFunc});
										break;
								}
						default:
								break;
				}
		}

		toggle() {
				this.setState({
						isOpen: !this.state.isOpen
				});
		}

		updateMenuState(isO) {
				this.setState({isOpen: isO});
		}

		onMenuItemSelected = (item) => {
				this.setState({
						isOpen: false,
						selectedItem: item
				}, () => this.renderScene(this.state.selectedItem));
		}

		render() {
				const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
				return (
						<SideMenu
								menu={menu}
								isOpen={this.state.isOpen}
								onChange={(isOpen) => this.updateMenuState(isOpen)}>

								<Router scenes={scenes}/>

						</SideMenu>
				);
		}
};

const styles = StyleSheet.create({
		button: {
				position: 'absolute',
				top: 13,
				paddingLeft: 8
		}
});