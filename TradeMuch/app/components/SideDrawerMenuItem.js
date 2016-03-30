import React, {
  View,
  Component,
  PropTypes,
  StyleSheet,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  profilePhoto: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  avatar: {
    backgroundColor: '#c94196',
    borderRadius: 50,
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginTop: -7,
  },
  textUserName: {
    marginBottom: 40,
  },
  textNotification: {
    color: '#fff',
    fontWeight: '700',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
    width: windowSize.width,
  },
  blockIcon: {
  // backgroundColor: '#362e2e',
    flex: 1,
    padding: 10,
    marginLeft: -10,
  },
  blockTitle: {
    // backgroundColor: '#3b1a1a',
    flex: 1,
    padding: 15,
    marginRight: 15,
  },
  blockNotification: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    flex: 1,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: '#dbdbdb',
    flex: 1,
    flexDirection: 'column',
  },
  contentBody: {
    // backgroundColor: '#b8b8b8',
    alignItems: 'center',
    width: windowSize.width,
  },
  contentBlock: {
    // backgroundColor: '#362e2e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  button: {
    width: 100,
  },
});

export default class SideDrawerContent extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  profile() {
    this.context.drawer.close();
    Actions.PostList.call();
  }
  postLit() {
    this.context.drawer.close();
    Actions.PostList.call();
  }
  postDetail() {
    this.context.drawer.close();
    Actions.PostList.call();
  }
  messenger() {
    this.context.drawer.close();
    Actions.Messenger.call();
  }

  render() {
    // const { drawer } = this.context
    return (
			<View style={styles.contentWrapper}>
        <View style={styles.contentBody}>
          <TouchableOpacity style={styles.avatar} onPress={ this.profile.bind(this) }>
            <Image source={{ uri: 'http://qa.trademuch.co.uk/img/human.png' }} style={styles.profilePhoto} />
          </TouchableOpacity>
          <Text style={styles.textUserName}>{'Monica'}</Text>
        </View>

				<View style={styles.contentBody}>
          <TouchableOpacity style={styles.contentBlock} onPress={ this.postLit.bind(this) }>
            <View style={styles.blockIcon}>
              <Image source={{ uri: 'http://qa.trademuch.co.uk/img/map.png' }} style={styles.icon} />
            </View>
            <View style={styles.blockTitle}>
              <Button style={styles.button}>{'PostList'}</Button>
            </View>
            <View style={styles.blockNotification}>
              <Text style={styles.textNotification}>{'0'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cellBorder} />

          <View>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.profile.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/login.png' }} style={styles.icon} />
              </View>
              <View style={styles.blockTitle}>
                <Button style={styles.button}>{'EditProfile'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'0'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cellBorder} />

          <View>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.postDetail.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/add.png' }} style={styles.icon} />
              </View>
              <View style={styles.blockTitle}>
                <Button	style={styles.button}>{'PostDetail'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'1'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cellBorder} />

          <View onPress={ this.messenger.bind(this) }>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.postDetail.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/chat%EF%BC%BF60x60.png' }} style={styles.icon} />
    					</View>
              <View style={styles.blockTitle}>
                <Button style={styles.button}>{'Messenger'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'1'}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
			</View>
		);
  }
}

SideDrawerContent.propTypes = {
  drawer: PropTypes.object,
};
