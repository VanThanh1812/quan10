/*
	Day la Drawer
*/

import React, { Component } from 'react';
import {
	View, Text, ListView, TouchableOpacity, StyleSheet, ScrollView, AsyncStorage
} from 'react-native';
import {
	Button
} from 'native-base';
import {Key_user} from '../model/User.js';

export default class DrawerMain extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  	this.state={
			dataSource: ds.cloneWithRows(this.props.listCategory),
		}
	};

	_renderMenu(item){
		return (
			  <TouchableOpacity
				onPress={(item)=> this._onItemClick(item)}
				style={styles.touchable}>
				<Text style={styles.textStyle}>
					{item}
				</Text>
			</TouchableOpacity>
		);
	}
	_onItemClick(item){
		this.props.close();
		this._removeSessionKey();
		this.props.navigatorDrawer.push({id:'login'});
		//this.setState({dataSource:this.state.dataSource.cloneWithRows(arr_category2)});
	}
	_removeSessionKey(){
		AsyncStorage.removeItem(Key_user.key_session,(error)=>{
			console.log(error);
		});
	}
	render() {
		return (
				<ListView
					style={{flex:1, backgroundColor:'#fff'}}
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this._renderMenu(rowData)}
				/>
		);
	}
}

	var styles = StyleSheet.create({
		touchable:{
			flex:1,
			height:50,
			backgroundColor:'#fff',
			padding:5,
		},
		textStyle:{
			flex:1,
			color:'#000',
			marginTop:15,
			marginLeft:15,
			fontSize:15,
		},
	});
