
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { FBSDKLoginButton } from 'react-native-fbsdklogin';
import { FBSDKAccessToken } from 'react-native-fbsdkcore';
import { requestUserInfo } from '../actions/AuthActions';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  backImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  avatar: {
    borderRadius: 50,
    marginTop: 100,
    width: 100,
    height: 100,
  },
  username: {
    marginTop: 10,
    color: '#fff',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    // fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 15,
    height: 25,
    marginLeft:10
  },
  button: {
    height: 40,
    width: 150,
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container} >
        <Image source={{ uri: 'http://qa.trademuch.co.uk/img/splash.png' }} style={styles.backImg} />
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: 'http://graph.facebook.com/1247429101941071/picture?type=large' }} />
          <Text style={styles.username}>傅耀德</Text>
        </View>
        <View style={styles.bodyContainer} >
          <TextInput
            style={styles.input}
            placeholder="點擊輸入Email"
            placeholderTextColor="#FFF"
            />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>確認</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function _injectPropsFromStore() {
  return {
  };
}

const _injectPropsFormActions = {
  requestUserInfo,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(EditProfile);
