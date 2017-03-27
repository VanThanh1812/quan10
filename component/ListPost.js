import React, { Component } from 'react';
import {
	View, Text, ListView, TouchableOpacity, StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast';

export default class ListPost extends Component {
	
	constructor(props) {
	  	super(props);
		this.state = {
	  		dataSourcePost: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2}),
			idCategory:this.props.idCategory,
	  	};
	}

	componentWillReceiveProps( nextProps ) { // nhan prop moi
    	console.log('componentWillReceiveProps');

    	if (nextProps.idCategory == this.props.idCategory){
    		return;
    	}
    	
    	this.setState({
        	idCategory: nextProps.idCategory
    	});

    	console.log(nextProps);
    	
    	if (nextProps.idCategory === 'undefined'){
    		console.log('Stop re render');
    		return;
    	}

    	console.log(api_post+nextProps.idCategory+'/post');

    	var arr = [];
		fetch(api_post+nextProps.idCategory+'/post')  // list category 
		.then((response)=>{
			var obj = JSON.parse(response._bodyInit);
			if (obj.error){
				return;	
			}

    		var objData = obj.data;
    		var objListPost = objData.posts; // data -> posts
    		for(var i = 0; i < objListPost.length; ++i){
			   	//do something with obj[i]
	   			arr.push(objListPost[i]);
	   			console.log('push post');
			}
			this.setState ({
				  			dataSourcePost: this.state.dataSourcePost.cloneWithRows(arr),
				  		});
	  		//this._getPostItemClick(arr[0]); // lay luon list post cua category vi tri 0
		}).done();

	}

	componentWillMount(){
		console.log('componentWillMount');
		var arr = [];
		fetch(api_post+this.state.idCategory+'/post')  // list category 
		.then((response)=>{
			var obj = JSON.parse(response._bodyInit);
    		var objData = obj.data;
    		var objListPost = objData.posts; // data -> posts
    		for(var i = 0; i < objListPost.length; ++i){
			   	//do something with obj[i]
	   			arr.push(objListPost[i]);
			}
			this.setState ( {
				  			dataSourcePost: this.state.dataSourcePost.cloneWithRows(arr),
				  		});
	  		//this._getPostItemClick(arr[0]); // lay luon list post cua category vi tri 0
		});
	}

	render() {
		return (
			<View style={styles.viewPost}>
				<ListView
						style = {styles.listpost}
						pagingEnabled = {true}
						enableEmptySections={true}
						dataSource = {this.state.dataSourcePost}
						renderRow = {(rowData)=> this._renderPostbyIdCategory(rowData)}
				/>
			</View>
		);

	}

	_renderPostbyIdCategory(itemPost){
		return (
			<TouchableOpacity
				onPress={()=> this._onItemPostClick(itemPost)}
				style={styles.touchable}>
				<Text style={styles.textTitle}>
					{itemPost.title}
				</Text>
				<Text style={styles.textTime}>
				  	{this._convertTime(itemPost.createAt)}
				</Text>
				<Text style={styles.textAbstraction}>
					{itemPost.abstraction}
				</Text>
				<View style={{backgroundColor:'#000', height:1}}>
				</View>
			</TouchableOpacity>
		);
	}

	_onItemPostClick(itemPost){
		this.props.navigator.push({id:'detail', idPost:itemPost.id});
	}

	_convertTime(time){
		var d = new Date(time*1000);
		return d.toString();
	}
}

var styles = StyleSheet.create({
	viewPost:{
		flex:1,
		backgroundColor:'#fff',
		paddingBottom:15,
	},
	textView:{
		color:'#000'
	},
	listpost:{
		backgroundColor:'#fff',
		flex:1,
	},
	textTitle:{
		color:'#0288D1',
		fontSize:20,
		paddingTop:5,
		padding:10,
		fontWeight:'bold',
	},
	textAbstraction:{
		color:'black',
		fontSize:15,
		paddingLeft:15,
		paddingTop:5,
		paddingRight:15,
		paddingBottom:15,
	},
	textTime:{
		color:'#616161',
		fontSize:13,
		paddingLeft:24,
		fontWeight:'bold',
	}
});

var demo_listKey='http://newsreader2.me.zing.vn/mrm/ver2/article?method=get_update_article_list_by_category&uid=1&sid=901&cid=901102&count=100&includearticleinfo=false&articleinfocount=100&firstlid=0';
var api_post = 'http://api.cms.mobilelab.vn/api/v1/category/';
/*
{
        "abstraction": "Từ thông tin của bạn đọc, Zing.vn đã thâm nhập vào rừng phòng hộ đầu nguồn tỉnh Khánh Hòa và phát hiện vụ phá rừng rất lớn.",
        "categories": [
          21
        ],
        "createAt": 1489118592,
        "id": 9,
        "owner": {
          "displayName": "Can Cat",
          "email": "cancat95@gmail.com",
          "id": 4,
          "userType": 1
        },
        "title": "Thâm nhập lõi rừng phòng hộ ở Khánh Hòa bị lâm tặc tàn phá",
        "updateAt": 1489118592
      }
*/