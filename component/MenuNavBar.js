import React, { Component} from 'react';
import {
		StyleSheet, View, Text
} from 'react-native';
import Menu,{
	MenuContext, MenuOptions, MenuOption, MenuTrigger
} from 'react-native-menu';

export default class MenuNavBar extends Component {
	render() {
		return (
			<MenuContext style={{flex:1}}>
				<TopNavigation />
				<View style={{ backgroundColor:'blue',flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Hello!</Text></View>
			</MenuContext>
		);
	}
}

const TopNavigation=()=>(
	<View style={styles.topNav}>
		<View style={{flex:1}}>
			<Text>
				Category
			</Text>
		</View>

	<Menu
		onSelected={(value)=> alert('Selected ${value}')}>

		<MenuTrigger>
			<Text style={{ fontSize: 20 }}>&#8942;</Text>
		</MenuTrigger>

		<MenuOptions>
        <MenuOption value={1}>
          <Text>One</Text>
        </MenuOption>
        <MenuOption value={2}>
          <Text>Two</Text>
        </MenuOption>
			</MenuOptions>

	</Menu>

</View>
);

const styles = StyleSheet.create({
	topNav:{
		padding:10,
		flexDirection:'row',
		backgroundColor:'red',
	}
});
