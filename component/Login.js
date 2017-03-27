import React, { Component } from 'react';
import {
	View, StyleSheet, Text, Image, TextInput,KeyboardAvoidingView,
	TouchableOpacity,AsyncStorage,
} from 'react-native';
import {Key_user} from '../model/User.js';
import Toast from 'react-native-simple-toast';

export default class Login extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
			sessionKey:'',
			email:'',
	  	password:'',
	  };
	}

	_getSessionKey(){
    	return fetch('http://api.cms.mobilelab.vn/api/v1/auth/email',{
      		method:'POST',
      		headers:{
        		'Accept':'application/json',
        		'Content-Type':'application/json',
      		},
      		body: JSON.stringify({
        		email:this.state.email,
        		password:this.state.password,
      		})
    	}).then((response)=> {
				var responseJson = JSON.parse(response._bodyInit) ;
    		if ((response.status === 200) && (responseJson.data.sessionKey !== '')){
    			console.log("Session "+responseJson.data.sessionKey);
    			this.props.navigator.push({id:'home'});
					this._saveDataOffline(responseJson);
    		}else{
    			Toast.show('Đăng nhập lỗi, bạn hãy thử lại xem',Toast.SHORT);
    		}
    	}).catch((error) => {
        	console.error(error);
      });
  }
	_saveDataOffline(responseJson){
		async(responseJson)=>{
			try {
				await AsyncStorage.setItem(Key_user.key_session,responseJson.sessionKey);
				console.log('OKE');
			} catch (e) {
				console.log(e);
			} finally {

			}
		};
	}
	render() {

		return (
			<KeyboardAvoidingView
				behavior={'padding'}
				style={styles.component}>
				<View style={styles.logoContainer}>
					<Image
						style = {styles.img_login}
						source={require('../image/img_login.png')}
					/>

					<Text style = {styles.textview}>
						Login to Quan10 app
					</Text>
				</View>

				<View style={{flexDirection:'row',justifyContent:'center'}}>
					<Image
						style={{height:48,width:48, margin:5}}
						source={require('../image/icon_face.png')}
					/>
					<Image
						style={{height:48,width:48,margin:5}}
						source={require('../image/icon_gg.png')}
					/>

				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder='Enter your email'
						returnKeyType='next'
						placeholderTextColor='#fff'
						keyboardType='email-address'
						underlineColorAndroid='#81D4FA'
						onChangeText={(text)=>this.state.email=text}
						style={styles.input}
					/>

					<TextInput
						placeholder='Enter your password'
						returnKeyType='go'
						placeholderTextColor='#fff'
						onChangeText={(text)=>this.state.password=text}
						underlineColorAndroid='#81D4FA'
						secureTextEntry={true}
						style={styles.input}
					/>

					<TouchableOpacity
						onPress={()=> this._getSessionKey()}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>
							Login
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

var styles = StyleSheet.create({
	component:{
		flex:1,
	},
	logoContainer:{
		justifyContent: 'center',
	    alignItems: 'center',
	    paddingTop:20,
	},
	img_login:{
		width:100,
		height:100,
	},
	textview:{
		color:'#fff',
		textAlign:'center',
		fontSize:20,
		margin:5,
		opacity:0.8,
	},
	input:{
		height:40,
		margin:5,
		borderRadius:4,
		fontSize:18,
		marginBottom:10,
		paddingHorizontal:10,
		backgroundColor:'#81D4FA',
		color:'#fff',
	},
	inputContainer:{
		padding:10,
	},
	buttonContainer:{
		backgroundColor:'#0277BD',
		borderRadius:4,
		padding:10,
		paddingVertical:15,

	},
	buttonText:{
		textAlign:'center',
		color:'#fff',
		fontWeight:'800'
	}

});
