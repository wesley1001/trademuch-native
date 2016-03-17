import React, {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
let simpleAuthClient = require('react-native-simple-auth');
import {Actions} from 'react-native-router-flux';
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  componentWillMount() {
    console.log("=== will mount ===")
    simpleAuthClient.configure('facebook', {
      app_id: '915539495181624',
      // consumer_key: 'KEY',
    }).then(() => {
      // Twitter is configured.
      console.log('=== auth config done ===');
    });
  }

  _login() {
    console.log('=== login func ===');
    simpleAuthClient.authorize('facebook').then((info) => {
      let token = info.token;
      let name = info.name;
      console.log('= Name =', name);
    }).catch((error) => {
      let errorCode = error.code;
      let errorDescription = error.description;
      console.log('=== login err ===');
      console.log(error);
    });
  }

  render() {
    const { counter, increment, decrement } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={Actions.Login} style={{height: 40, justifyContent: 'center' }}>
          <Text>Back to Login</Text>
        </TouchableOpacity>
        {/*<Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
        */}
      </View>
    );
  }
}
