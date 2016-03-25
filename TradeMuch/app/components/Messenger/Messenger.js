import React, { StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';
import io from 'socket.io-client/socket.io';

window.navigator.userAgent = 'react-native';

const socket = io('ws://localhost:1337?__sails_io_sdk_version=0.13.5', { jsonp: false });

const domain = `http://localhost:1337`;
const newUser = {
  email: 'test@gmail.com',
  password: 'testuser',
};

function composeRequestWithAuthToken(url, data) {
  return {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
    },
  };
}

// fetch('http://localhost:1337/rest/auth/simple', {method: 'post', data: newUser}).then(function(response) {
  // console.log('res',response);
// });


async function getAuthToken() {
  // let url = `${host}/auth/login`;     // api url for login
  const url = `${domain}/auth/token`;
  const option = {                         // optional second argument
    method: 'post',               //  to customize the HTTP request
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  // fetch(url, option).then(response => response.json()).then( response => {
  //   console.log(response);
  // });

  let token = await fetch(url, option);
  token = await token.json();
  return token;

  // for socket
  // const request = composeRequestWithAuthToken(url, newUser);
  // return fetch(url, opt);
  // socket.emit('post', request, (response) => {
  //   console.log('user',response.body);
  // });
}

function joinRoom(chatRoomId) {
  // const user = response.body.user;
  const url = `/room/${chatRoomId}/users`;
  const request = composeRequestWithAuthToken(url);
  socket.emit('post', request, (response) => {
    console.log('join room');
  });
}

function sendMessage(chatRoomId, message) {
  const url = `/chat/${chatRoomId}/public`;
  const request = composeRequestWithAuthToken(url, message);
  socket.emit('post', request, () => {
    console.log('sended');
  });
}

function getChatHistory(chatRoomId) {
  const url = `/chat/${chatRoomId}/history`;
  const request = composeRequestWithAuthToken(url);
  socket.emit('get', request, (messageHistory) => {
      // Received message history
      console.log('=== get data ===');
      console.log(messageHistory.body.result);
  });
}

socket.on('connect', async function() {

  console.log('connected');
  // socket.emit('post', {
  //   url: 'http://localhost:1337/rest/auth/token',
  //   data: newUser,
  // },function(authToken) {
  //   console.log(authToken);
  // });
  const token = await getAuthToken();
  console.log(token);


});

// socket.emit('message','hi');

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
