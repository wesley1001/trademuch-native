import React, { StyleSheet, Dimensions, Component, View, Text } from 'react-native'
import GiftedMessenger from 'react-native-gifted-messenger'

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#007aff',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navText: {
    marginTop: 15,
    color: '#FFF',
  }
});

export default class GiftedMessengerExample extends Component {

  getMessages() {
    return [
      {text: 'Are you building a chat app?', name: 'React-Native', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'left', date: new Date(2015, 0, 16, 19, 0)},
      {text: "Yes, and I use Gifted Messenger!", name: 'Developer', image: null, position: 'right', date: new Date(2015, 0, 17, 19, 0)},
    ];
  }

  handleSend(message = {}, rowID = null) {
    // Send message.text to your server
  }

  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message',
      name: 'Friend',
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
    });
  }

  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Text style={styles.navText}>Kent</Text>
        </View>
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}
          style={{marginTop: 20}}
          messages={this.getMessages()}
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
          }} />
      </View>
    );
  }
}