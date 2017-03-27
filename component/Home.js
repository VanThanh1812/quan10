import React, { Component, AsyncStorage } from 'react';
import {
	View, StyleSheet, Text, TextInput, ToolbarAndroid
} from 'react-native';
import {Container,
	Header,
	Title,
	Button,
	Left,
	Right,
	Body,
	Icon,
	Tab, Tabs, Drawer} from 'native-base';
import DrawerMain from '../component/DrawerMain.js';
import CategoryBar from '../component/CategoryBar.js';
import {
	getAllIDDemo
} from '../getdata/Category.js';

export default class Home extends Component {

	constructor(props){
		super(props);
		this.state={
			sessionKey:'',
			idCategory:'-1',
			arr_key:[],
		};	
	}

	render() {

		closeDrawer = () => {
        	this._drawer._root.close()
      	};
      	openDrawer = () => {
        	this._drawer._root.open();		
      	};

	  	return (            // tra lai view
			<View style={{flex:1}}>

<Drawer
        		ref={(ref) => { this._drawer = ref; }}
           		content={<DrawerMain  listCategory={arrDrawer} close={closeDrawer} navigatorDrawer={this.props.navigator}/>} 
				type='overlay'
           		tapToClose={true}
				openDrawerOffset={0.2} // 20% gap on the right side of drawer
  				panCloseMask={0.2}
				closedDrawerOffset={-3}>
			
				
          	<Header>
					<Left>
						<Button transparent
							onPress={openDrawer}>
							<Icon name='menu'/>
						</Button>
					</Left>
					<Body>
						<View style={{flexDirection:'row'}}>
							<Title>Home</Title>
							<Title>  Home2</Title>
						</View>
					</Body>
				</Header>
				<CategoryBar listCategory={this.state.arr_key} navigator={this.props.navigator}/>
          	</Drawer>
		
			</View>
			
		);

	}

	_onIconClick(){
		//this.props.navigator.push({id:'login'});
	}

}

var arrList = new Array('Kinh tế','Chính trị','Văn hóa','Xa hoi','CNTT','ShowBiz','Gema');
var arrDrawer = new Array('Infomation','Logout');

var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff'
	},
	input:{
		height:40,
		margin:5,
		borderRadius:4,
		fontSize:15,
		paddingHorizontal:20,
		backgroundColor:'#81D4FA',
		color:'#fff',
	},
	toolbar:{
		height:56,
	}
});
