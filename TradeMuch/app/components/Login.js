
import React, {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import {
  FBSDKLoginButton,
} from 'react-native-fbsdklogin';

import {
  FBSDKAccessToken,
} from 'react-native-fbsdkcore';

import {
  requestUserInfo,
} from '../actions/AuthActions';

const styles = StyleSheet.create(require('./styles.js'));

export default function Login() {
  function handleLoginFinished(error, result) {
    if (error) {
      // alert('Error logging in.');
    } else {
      if (result.isCancelled) {
        // alert('Login cancelled.');
      } else {
        FBSDKAccessToken.getCurrentAccessToken(async userIdentities => {
          this.props.requestUserInfo(userIdentities);
          if (result === null) {
            // alert('Start logging in.');
          } else {
            // alert('Start logging out.');
          }
        });
        // alert('Logged in.');
      }
    }
  }

  return (
    <View style={this.props.style}>
      <FBSDKLoginButton
        style={styles.loginButton}
        // onWillLogin={() => {
        //   FBSDKAccessToken.getCurrentAccessToken((result) => {
        //     // console.log('token',result);
        //     if (result === null) {
        //       // alert('Start logging in.');
        //     } else {
        //       // alert('Start logging out.');
        //     }
        //   });
        //   return true;
        // }}
        onLoginFinished={handleLoginFinished}
        // onLogoutFinished={() => {}}
        readPermissions={[]}
        publishPermissions={[]}
      />
    </View>
  );
}

function _injectPropsFromStore() {
  return {
  };
}

const _injectPropsFormActions = {
  requestUserInfo,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Login);
