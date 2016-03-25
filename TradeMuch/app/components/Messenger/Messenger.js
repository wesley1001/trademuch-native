import React, { Component, StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';
import io from 'socket.io-client/socket.io';
import { connect } from 'react-redux';
import {
  receivedMessages,
} from '../../actions/MessageActions';

const socket = io('ws://localhost:1337?__sails_io_sdk_version=0.13.5', { jsonp: false });
window.navigator.userAgent = 'react-native';

function composeRequestWithAuthToken(url, data) {
  return {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
      user: {
        age: 0,
        createdAt: '2016-03-24T04:10:10.000Z',
        email: 'test@gmail.com',
        firstName: null,
        fullName: null,
        gender: 'none',
        id: 1,
        isFirstLogin: true,
        lastName: null,
        telephone: null,
        updatedAt: '2016-03-24T04:10:10.000Z',
        username: 'testuser',
        uuid: null,
      },
    },
  };
}

async function joinRoom(chatRoomId) {
  const url = `/room/${chatRoomId}/users`;
  const request = composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function sendMessage(chatRoomId, message) {
  const url = `/chat/${chatRoomId}/public`;
  const request = composeRequestWithAuthToken(url, message);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function getChatHistory(chatRoomId) {
  const url = `/chat/${chatRoomId}/history`;
  const request = composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('get', request, (response) => {
      resolve(response.body.result);
    });
  });
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#007aff',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    marginTop: 15,
    color: '#FFF',
  },
});

export default class GiftedMessengerExample extends Component {
  componentWillMount() {
    socket.on('connect', async () => {
      // const token = await getAuthToken();
      await joinRoom(1);
      const messageHistory = await getChatHistory(1);
      this.props.receivedMessages(messageHistory);
      console.log(messageHistory);
    });
  }

  async handleSend(message = {}, rowID = null) {
    // Send message.text to your server
    // {text: "123", name: "Sender", image: null, position: "right", date: Fri Mar 25 2016 01:15:14 GMT+0800 (CST)…}
    await sendMessage(1, {
      content: message.text,
    });
  }

  // function handleReceive() {
  //   this._GiftedMessenger.appendMessage({
  //     text: 'Received message',
  //     name: 'Friend',
  //     image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
  //     position: 'left',
  //     date: new Date(),
  //   });
  // }

  messengerRef(c) {
    this._GiftedMessenger = c;
  }

  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Text style={styles.navText}>Kent</Text>
        </View>
        <GiftedMessenger
          ref={this.messengerRef}
          style={{ marginTop: 20 }}
          messages={this.props.messages}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
          styles={{
            bubbleLeft: {
              backgroundColor: '#e6e6eb',
              marginRight: 70,
            },
            bubbleRight: {
              backgroundColor: '#007aff',
              marginLeft: 70,
            },
          }}
        />
      </View>
    );
  }
}

function _injectPropsFromStore({ messenger }) {
  return {
    messages: messenger.messages,
  };
}

const _injectPropsFormActions = {
  receivedMessages,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(GiftedMessengerExample);
