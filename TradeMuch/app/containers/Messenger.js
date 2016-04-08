import React, { Component, StyleSheet, Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';
import GiftedMessenger from 'react-native-gifted-messenger';
import { messengerSocket, joinRoom, sendMessage, getChatHistory } from '../utils/socket';
import {
  receivedMessages,
  receivedNewMessage,
} from '../actions/MessageActions';

const socket = messengerSocket;

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

export default class Messenger extends Component {

  static propTypes = {
    receivedMessages: React.PropTypes.func,
    receivedNewMessage: React.PropTypes.func,
    messages: React.PropTypes.array,
    postId: React.PropTypes.number.required,
  };

  constructor(props) {
    super(props);
    this.handleGetHistoryMessage = this.handleGetHistoryMessage.bind(this);
    this.handleNewMessage = this.handleCatchNewMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentWillMount() {
    // this.props.joinRoom(this.props.postId);
    console.log('i want see postId here ',this.props.postId);
    this.handleGetHistoryMessage();
    this.handleCatchNewMessage();
    //=====
    // socket.on('public', (response) => {
    //   console.log("=== new message ===");
    //   this.props.receivedNewMessage(response);
    // });
    // socket.on('connect', async () => {
    //   // const token = await getAuthToken();
    //   console.log('=== Socket Connected ===', this.props);
    //   await joinRoom(this.props.postId);
    //   const messageHistory = await getChatHistory(this.props.postId);
    //   this.props.receivedMessages(messageHistory);
    // });
  }

  async handleGetHistoryMessage() {
    const srcMessages = await getChatHistory(socket, this.props.postId);
    this.props.receivedMessages(srcMessages);
  }

  async handleCatchNewMessage() {
    await joinRoom(socket, this.props.postId);
    console.log("joined");
    socket.on('public', (response) => {
      console.log("=== new message ===");
      this.props.receivedNewMessage(response);
    });
  }

  async handleSend(message = {}, /* rowID = null*/) {
    // Send message.text to your server
    // {text: "123", name: "Sender", image: null, position: "right", date: Fri Mar 25 2016 01:15:14 GMT+0800 (CST)…}
    await sendMessage(socket, this.props.postId, {
      content: message.text,
    });
  }

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
          style={{ marginTop: 0 }}
          messages={this.props.messages}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height - 110} // 64 for the navBar
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
  receivedNewMessage,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Messenger);
