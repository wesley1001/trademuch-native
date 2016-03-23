import React, { StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';
import io from 'socket.io-client/socket.io';

window.navigator.userAgent = 'react-native';

const socket = io('ws://localhost:1337?__sails_io_sdk_version=0.13.5', { jsonp: false });

// var CookieManager = require('react-native-cookies');
//
// // set a cookie (IOS ONLY)
// CookieManager.set({
//   name: 'myCookie',
//   value: 'myValue',
//   domain: 'some domain',
//   origin: 'some origin',
//   path: '/',
//   version: '1',
//   expiration: '2015-05-30T12:30:00.00-05:00'
// }, (err, res) => {
//   console.log('cookie set!');
//   console.log(err);
//   console.log(res);
// });
//
//
// // list cookies (IOS ONLY)
// CookieManager.getAll((err, res) => {
//   console.log('cookies!');
//   console.log(err);
//   console.log(res);
// });

function composeRequest(url) {
  return {
    url,
    headers: {
      accept: 'Application/json',
    },
  };
}


const newUser = {
  // username: 'testuser',
  email: 'test@gmail.com',
  password: 'testuser',
};

// fetch('http://localhost:1337/rest/auth/simple', {method: 'post', data: newUser}).then(function(response) {
  // console.log('res',response);
// });

socket.on('connect', async function() {

  console.log('connected');

  socket.emit('post',{
    url: 'http://localhost:1337/auth/token',
    data: newUser
  }, function(response) {
    console.log('user',response.body.user);
    const user = response.body.user;
    socket.emit('post', {
      url: '/room/1/users',
      data: {
          user: user,
        },
    }, function(response) {
      console.log('join room');
      socket.emit('post', {
        url: '/chat/1/public',
        data: {
          user: user,
          content: 'content11',
        },
      }, function() {
        console.log('sended');
        socket.emit('get', {
          url: '/chat/1/history',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            user: user,
          },
        }, function(messageHistory) {
          console.log('=== get data ===');
          console.log(messageHistory.body.result);
      });

      });
    });
  }
);
  // socket.emit('post', {
  //   url: 'http://localhost:1337/rest/auth/token',
  //   data: newUser,
  // },function(authToken) {
  //   console.log(authToken);
  // });



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
