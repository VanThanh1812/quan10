import React, { Component } from 'react';
import {
	View, StyleSheet, Text, TextInput, ToolbarAndroid, WebView, ScrollView
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

export default class DetailPost extends Component {

	constructor(props) {
   	  super(props);
		this.state={
			textTitle:'Title',
			textTime:'00:00',
			textAbstraction: 'textAbstraction',
			textBody:'<h1>H1</h1>',
			owner:'admin',
			isLoading:true,
		}
	}

	componentWillMount(){
		this._getDataPost();

		console.log(this.state.textBody);
	}

	_getDataPost(){
		fetch(api+this.props.idPost)  // list category 
		.then((response)=>{
			var obj = JSON.parse(response._bodyInit);
			var objData = obj.data;
			var objPost = objData.post;

			var owner = objPost.owner;
			var name = owner.displayName;

			this.setState({
				textTitle: objPost.title,
				textAbstraction: objPost.abstraction,
				textTime:objPost.createAt,
				textBody: objPost.body,
				isLoading:false,
				owner:name,
			});

			console.log(this.state.textBody);
		});
	}

	render() {
		
		var id_post = this.props.idPost;

		onBackPress = () => {
			this.props.navigator.pop();
		}

		if (this.state.isLoading){
			return (
				<View style={{flex:1}}>
					<Text style={styles.textBody}>
					  Loading
					</Text>
				</View>
			);
		} else {
			return this._returnWebView();
		}
	}

	_convertTime(time){
		var d = new Date(time*1000);
		return d.toString();
	}

	_returnWebView(){

		return (
 
			<View style={{flex:1, backgroundColor:'#fff'}}>
				<Header>
					<Left>
						<Button transparent
							onPress={onBackPress}>
							<Icon name='arrow-back'/>
						</Button>
					</Left>
					<Body>
						<Title>Post</Title>
					</Body>
				</Header>

					<Text style={styles.textTitle}>
				  	{this.state.textTitle}
					</Text>
					<Text style={styles.textTime}>
				  		{this._convertTime(this.state.textTime)}
					</Text>
					<Text style={styles.textAbstraction}>
					  	{this.state.textAbstraction}
					</Text>
						<WebView 
							ref="AWESOME"
							source={{html:this.state.textBody}} 
				   	   		style={styles.webView}
          					startInLoadingState={true}
          					javaScriptEnabled={true}
    					    domStorageEnabled={true}
	        				decelerationRate="normal"
	        				scrollEnabled={false}
	        				automaticallyAdjustContentInsets={false}
						/>
					<Text style={styles.textTime}>
					  	Theo {this.state.owner}
					</Text>

			</View>
		);
	}
}

var api = 'http://api.cms.mobilelab.vn/api/v1/post/';
var styles = StyleSheet.create({
	textTitle:{
		color:'#0288D1',
		fontSize:20,
		paddingTop:5,
		padding:10,
		fontWeight:'bold',
	},
	textTime:{
		color:'#616161',
		fontSize:13,
		paddingLeft:24,
		fontWeight:'bold',
		fontStyle:'italic',
	},
	textAbstraction:{
		color:'black',
		fontSize:15,
		paddingLeft:15,
		paddingTop:5,
		fontWeight:'bold',
		paddingRight:15,
		paddingBottom:15,
	},
	webView: {
  	},
});