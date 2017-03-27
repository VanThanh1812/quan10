import React, { Component } from 'react';
import {
	View, Text, ListView, TouchableOpacity, StyleSheet,TouchableHighlight,
} from 'react-native';
import ListPost from '../component/ListPost.js';

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2});
export default class CategoryBar extends Component {
	
	constructor(props) {
	  	super(props);		
	  	this.state = {
	  		dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2}),
	  		currentIdCategory:16,
	  	};

	}

	componentWillMount(){
		var arr = [];
		fetch(apiCategory)  // list category 
		.then((response)=>{
			var obj = JSON.parse(response._bodyInit);
    		var objData = obj.data;
    		var objListID = objData.categories;
    		for(var i = 0; i < objListID.length; ++i){
			   	//do something with obj[i]
			   	//{id: , name:}
		   		arr.push(objListID[i]); 
		   		console.log('push');
			}
			this.setState({
				  			dataSource: this.state.dataSource.cloneWithRows(arr),
				  		});
		});

		
	}

	render() {

		return (
			<View style={{flex:1}}>
				<View style={{height:45}}>
					<ListView
						style = {styles.listview}
						horizontal = {true}
						pagingEnabled={true}
						dataSource = {this.state.dataSource}
						renderRow = {(rowData, sectionID, rowID, highlightRow)=> this._renderItemListView(rowData, sectionID, rowID, highlightRow)
					}/>
				</View>
				<View style={styles.viewPageLoad}>
					<ListPost idCategory={this.state.currentIdCategory} navigator = {this.props.navigator}/>
				</View>
			</View>
		);

	}

	_renderItemListView(item, sectionID, rowID, highlightRow){
		return (
			<TouchableOpacity
				onPress={()=> this._onItemClick(item, rowID)}
				style={styles.touchable}>
				<Text style={styles.textStyle}>
					{item.name} {/*thay doi thuoc tinh khi change api*/}
				</Text>
			</TouchableOpacity>
		);
	}

	_onItemClick(item, rowID){
		this.setState({
			currentIdCategory:item.id
		});	
		console.log('Current ID send: ');
		console.log(this.state.currentIdCategory);
	}

}

var demo_listKey='http://newsreader2.me.zing.vn/mrm/ver2/article?method=get_update_article_list_by_category&uid=1&sid=901&cid=901102&count=100&includearticleinfo=false&articleinfocount=100&firstlid=0';
var apiCategory='http://api.cms.mobilelab.vn/api/v1/category/';

var styles = StyleSheet.create({
	listview:{
		backgroundColor:'#F5F5F5',
		height:45,
	},
	listpost:{
		backgroundColor:'#64B5F6',
		flex:1,
	},
	touchable:{
		justifyContent: 'center',
	    height:45,
	    padding:10,
	    alignItems: 'center',
	    backgroundColor:'#F5F5F5',
	},
	textStyle:{
		flex:1,
		color:'#000',
		fontSize:15,
		fontWeight:'bold',
	},
	viewPageLoad:{
		flex:1,
		backgroundColor:'red',
	},
});