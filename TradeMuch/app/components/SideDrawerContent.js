import React, {
	View,
	PropTypes } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default function SideDrawerContent() {
  const contextTypes = {
    drawer: PropTypes.object.isRequired,
  };
  const { drawer } = this;
  return (
		<View>
			<Button onPress={() => { drawer.close(); Actions.Home.call(); }}>{'Home'}</Button>
			<Button onPress={() => { drawer.close(); Actions.Screen1.call(); }}>{'Screen 1'}</Button>
			<Button onPress={() => { drawer.close(); Actions.Screen2.call(); }}>{'Screen 2'}</Button>
			<Button onPress={() => { Actions.Login.call(); }}>{'Logout'}</Button>
		</View>
	);
}

SideDrawerContent.propTypes = {
  drawer: PropTypes.object.isRequired,
};
