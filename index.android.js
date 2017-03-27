/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,AsyncStorage,
  Navigator, StyleSheet, View, TextInput, Text
} from 'react-native';
import Home from './component/Home.js';
import Login from './component/Login.js';
import {Key_user} from './model/User.js';
import DetailPost from './component/DetailPost.js';

export default class Quan10 extends Component {

  constructor(props){ //khai bao bien sate la home
    super(props);
		this.state={
			sessionKey:'',
      id:'home',
      isLoading: true,
      idPost:'-1',
		}
  }
  componentWillMount() { // ham chay sau ham constructor
    this._getSessionKey();
	}

  _getSessionKey(){
    try {
      AsyncStorage.getItem(Key_user.key_session, (err, result) => {
        console.log(result);
        if (result !== null){
          // We have data!!
          
          this.setState({
            id:'home',
            sessionKey:result,
          });

        }else{

          this.setState({
            id:'login',
          });
          
        }
        this.setState({
          isLoading: false,
        });
      });
    } catch (error) {
      // Error retrieving data
    }    
  }

  _renderScene(route, navigator){ // render home hoac login khi dang nhap
    switch(route.id){
      case 'home':
      return(
          <Home navigator={navigator} sessionKey={this.state.sessionKey} />
        );
      case 'login':
        return(
          <Login navigator={navigator}/>
        );
      case 'detail':
      console.log(navigator);
        return (
          <DetailPost navigator={navigator} idPost = {route.idPost}/>
        );
    }
  }

  render() {
    if (this.state.isLoading) {
       return <View><Text style={styles.welcome}>Loading...</Text></View>;
    }
      // this is the content you want to show after the promise has resolved
    return (
      <Navigator
        style={{backgroundColor:'#29B6F6',}}
        initialRoute={{id:this.state.id, idPost:-1}}
        renderScene={(route, navigator)=>
          this._renderScene(route, navigator)
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Quan10', () => Quan10);
