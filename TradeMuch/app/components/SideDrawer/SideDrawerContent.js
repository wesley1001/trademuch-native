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
import { Actions } from 'react-native-router-flux';
import MenuItem from '../Menu/MenuItem';
const PIXEL_RATIO = PixelRatio.get();
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 20 * PIXEL_RATIO,
    width: 40 * PIXEL_RATIO,
    height: 40 * PIXEL_RATIO,
    flexDirection: 'row',
  },
  avatarBlock: {
    width: 50 * PIXEL_RATIO,
    height: 50 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentAvatar: {
    backgroundColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: windowSize.width,
    height: 70 * PIXEL_RATIO,
  },
  textUserName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
    fontWeight: '700',
    fontSize: 7 * PIXEL_RATIO,
  },
  textNotification: {
    color: '#fff',
    fontWeight: '700',
  },
  textMenuTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  cellBorder: {
    backgroundColor: 'rgba(164, 164, 164, 0.5)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    // marginLeft: 4,
    width: windowSize.width,
  },
  icon: {
    width: 32,
    height: 32,
  },
  blockIcon: {
    // backgroundColor: '#362e2e',
    flex: 1,
    // padding: 5,
    // marginLeft: -10,
  },
  blockTitle: {
    // backgroundColor: '#3b1a1a',
    flex: 1,
    // padding: 15,
    // marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockNotification: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    flex: 1,
    borderRadius: 10,
    width: 8 * PIXEL_RATIO,
    height: 8 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: '#333333',
    flex: 1,
    flexDirection: 'column',
  },
  contentBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentBlock: {
    // backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  button: {
    width: 130,
    color: '#fff',
  },
});

export default class SideDrawerContent extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  onItemPress = (id) => {
    this.context.drawer.close();
    Actions[id]();
  }

  profile() {
    this.context.drawer.close();
    Actions.editProfile.call();
  }

  render() {
    // const { drawer } = this.context
    return (
      <View style={styles.contentWrapper}>
        <View style={styles.contentAvatar}>
          <TouchableOpacity style={styles.avatarBlock} onPress={ this.profile.bind(this) }>
            <Image source={{ uri: 'http://qa.trademuch.co.uk/img/human.png' }} style={styles.avatarImage} />
          </TouchableOpacity>
          <Text style={styles.textUserName}>{'Gloria'}</Text>
        </View>
        <View style={styles.contentBody}>
          <MenuItem id="postList" title="附近的好康物品" img="http://qa.trademuch.co.uk/img/map.png" notification="120" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我撿的資源" img="http://qa.trademuch.co.uk/img/map.png" notification="5" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我追蹤的資源" img="http://qa.trademuch.co.uk/img/map.png" notification="5" onItemPress={this.onItemPress} />
          <MenuItem id="messenger" title="我的留言板" img="http://qa.trademuch.co.uk/img/chat%EF%BC%BF60x60.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我的倉庫" img="http://qa.trademuch.co.uk/img/map.png" notification="5" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="尋寶去" img="http://qa.trademuch.co.uk/img/map.png" notification="5" onItemPress={this.onItemPress} />
          <MenuItem id="createPost" title="Create Post" img="http://qa.trademuch.co.uk/img/add.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="login" title="登入" img="http://qa.trademuch.co.uk/img/login.png" notification="" onItemPress={this.onItemPress} />
        </View>
      </View>
		);
  }
}

SideDrawerContent.propTypes = {
  drawer: PropTypes.object,
};
