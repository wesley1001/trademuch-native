import React, { StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';
import io from 'socket.io-client/socket.io';
import {
  getAuthToken,
} from '../../utils/authFetch';

window.navigator.userAgent = 'react-native';

const socket = io('ws://localhost:1337?__sails_io_sdk_version=0.13.5', { jsonp: false });

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

socket.on('connect', async function() {
  console.log('connected');
  const token = await getAuthToken();
  await joinRoom(1);
  console.log(token);
  const response = await sendMessage(1, {
    content: 'text',
  });
  console.log('====', response);
  const messageHistory = await getChatHistory(1);
  console.log('message',messageHistory);
});

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

export default function GiftedMessengerExample() {
  function getMessages() {
    return [
      {
        text: 'Are you building a chat app?',
        name: 'React-Native',
        image: {
          uri: 'https://facebook.github.io/react/img/logo_og.png',
        },
        position: 'left',
        date: new Date(2015, 0, 16, 19, 0),
      },
      {
        text: 'Yes, and I use Gifted Messenger!',
        name: 'Developer',
        image: null,
        position: 'right',
        date: new Date(2015, 0, 17, 19, 0),
      },
    ];
  }

  function handleSend(message = {}, rowID = null) {
    // Send message.text to your server
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

  function messengerRef(c) {
    this._GiftedMessenger = c;
  }

  return (
    <View>
      <View style={styles.nav}>
        <Text style={styles.navText}>Kent</Text>
      </View>
      <GiftedMessenger
        ref={messengerRef}
        style={{ marginTop: 20 }}
        messages={getMessages()}
        handleSend={handleSend}
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
