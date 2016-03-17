'use strict';

import React, { Component, View, Text, TouchableOpacity} from 'react-native';
import {bindActionCreators} from 'redux';
import * as counterActions from '../actions/counterActions';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import FBSDKLogin, {
  FBSDKLoginButton, FBSDKLoginManager
} from 'react-native-fbsdklogin';
import FBSDKCore, {
  FBSDKAccessToken,
} from 'react-native-fbsdkcore';

import ReactNativeSimpleAuth from './loginApp';
// @connect(state => ({
//   state: state.counter
// }))


class Login extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login</Text>
        <TouchableOpacity onPress={Actions.Counter}><Text>Counter</Text></TouchableOpacity>
          <FBSDKLoginButton
          onWillLogin={() => {
            FBSDKAccessToken.getCurrentAccessToken((result) => {
              console.log('FBSDKAccessToken:',result);
              if (result == null) {
                alert('Start logging in.');
              } else {
                alert('Start logging out.');
              }
            });
            return true;
          }}

          onLoginFinished={(error, result) => {
            console.log('facebook login result: ',result);
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in. Token:');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={[]}/>
      </View>
    );
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Login);
