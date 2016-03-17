import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';


import FBLogin from '../components/login';

let styles = StyleSheet.create(require('./styles.js'));

/**
 * A sample app that demonstrates use of the FBSDK login button, native share dialog, and graph requests.
 */
class Login extends React.Component {
  render() {
    return (
      <Image
        source={{uri: 'plutoBack.png'}}
        style={styles.loginImage}>
        <View style={styles.disclaimerContainer}>
          <TouchableOpacity onPress={Actions.Camera}>
            <Text style={styles.disclaimerText}>Images taken from New Horizons Facebook page</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.PostList}>
            <Text style={styles.disclaimerText}>List Test Page</Text>
          </TouchableOpacity>
        </View>
        <FBLogin style={styles.loginContainer}/>
      </Image>
    );
  }
}


function _injectPropsFromStore(state) {
  return state
};

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Login);
