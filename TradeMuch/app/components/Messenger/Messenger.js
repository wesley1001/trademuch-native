import React, { StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';

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
