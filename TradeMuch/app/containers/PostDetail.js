'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Component,
  Linking,
  PixelRatio,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
} from '../actions/PostDetailActions';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');

const styles = React.StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  itemImg: {
    position: 'absolute',
    left: 0 * PixelRatio.get(),
    top: 0 * PixelRatio.get(),
    width: windowSize.width,
    height: windowSize.height,
  },
  noneImg: {
    position: 'absolute',
    left: windowSize.width / 2 - 50 * PixelRatio.get(),
    top: windowSize.width / 2,
    width: 100 * PixelRatio.get(),
    height: 100 * PixelRatio.get(),
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 10 * PixelRatio.get(),
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11 * PixelRatio.get(),
    textAlign: 'left',
  },
  descriptionContainer: {
    paddingLeft: 10 * PixelRatio.get(),
    marginBottom: 5 * PixelRatio.get(),
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 10 * PixelRatio.get(),
    marginBottom: 5 * PixelRatio.get(),
    textAlign: 'left',
    height: 30 * PixelRatio.get(),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5 * PixelRatio.get(),
    paddingRight: 5 * PixelRatio.get(),
  },
  button: {
    flex: 1,
    margin: 5 * PixelRatio.get(),
    height: 25 * PixelRatio.get(),
    width: 100 * PixelRatio.get(),
    borderRadius: 5 * PixelRatio.get(),
    borderWidth: 1 * PixelRatio.get(),
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 6 * PixelRatio.get(),
  },
  footContainer: {
    flex: 0.7,
  },
  footBackColor: {
    height: windowSize.height,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonChatContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  openChatRoomButton: {
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25 * PixelRatio.get(),
    borderWidth: 1 * PixelRatio.get(),
    width: 50 * PixelRatio.get(),
    height: 50 * PixelRatio.get(),
    top: 15 * PixelRatio.get(),
    right: 5 * PixelRatio.get(),
    position: 'absolute',
  },
});


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.AddItemToFavoriteButtonHandle = this.AddItemToFavoriteButtonHandle.bind(this);
    this.DeleteFavoriteItemButtonHandle = this.DeleteFavoriteItemButtonHandle.bind(this);
    this.OpenChatRoomButtonHandle = this.OpenChatRoomButtonHandle.bind(this);
    this.OpenMapButtonHandle = this.OpenMapButtonHandle.bind(this);
    this.GetItNowButtonHandle = this.GetItNowButtonHandle.bind(this);
  }

  OpenChatRoomButtonHandle() {
    Actions.Messenger.call();
  }

  AddItemToFavoriteButtonHandle() {
    this.props.requestAddItemToFavList({ id: this.props.id });
  }

  DeleteFavoriteItemButtonHandle() {
    this.props.requestDeleteItemToFavList({ id: this.props.id });
  }

  GetItNowButtonHandle() {
    Actions.Messenger({});
  }

  OpenMapButtonHandle() {
    const lon = this.props.location.lon;
    const lat = this.props.location.lat;
    const url = `https://www.google.com.tw/maps/@,${lat},${lon}`;
    console.log(`OpenMapButtonHandle url=>${url}`);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don\'t know how to open URI: ${url}`);
      }
    });
  }

  render() {
    const { title, description, pic, isFav } = this.props;
    console.log(`[title,description]=>[${title},${description}]`);
    if (this.props.title === null) {
      Actions.postList.call();
    }

    let favButton = '';
    if (isFav !== null) {
      if (isFav === false) {
        favButton = [
          <TouchableOpacity
            key="favButton"
            style={styles.button}
            onPress={ this.AddItemToFavoriteButtonHandle }
          >
            <Text style={styles.buttonText} >追蹤</Text>
          </TouchableOpacity>,
        ];
      } else if (isFav === true) {
        favButton = [
          <TouchableOpacity
            key="favButton"
            style={styles.button}
            onPress={ this.DeleteFavoriteItemButtonHandle }
          >
            <Text style={styles.buttonText} >取消追蹤</Text>
          </TouchableOpacity>,
        ];
      }
    }

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: pic }} style={styles.itemImg} />
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            style={styles.openChatRoomButton}
            onPress={ this.OpenChatRoomButtonHandle }
          >
            <Text style={styles.buttonText} >對話</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.footContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.GetItNowButtonHandle }
            >
              <Text style={styles.buttonText} >立即交易</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.OpenMapButtonHandle }
            >
              <Text style={styles.buttonText} >地圖</Text>
            </TouchableOpacity>
            {favButton}
          </View>
        </View>
      </View>
    );
  }
}

PostDetail.propTypes = {
  id: React.PropTypes.number,
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  isFav: React.PropTypes.bool,
  location: React.PropTypes.object,
  distance: React.PropTypes.number,
  pic: React.PropTypes.string,
  requestAddItemToFavList: React.PropTypes.func,
  requestDeleteItemToFavList: React.PropTypes.func,
};

PostDetail.defaultProps = {
  id: 0,
  index: 0,
  title: '[標題]',
  description: '[描述]',
  isFav: null,
  location: { lat: 80.1, lon: 100 },
  distance: 1,
  pic: 'http://qa.trademuch.co.uk/img/human.png',
};

function _injectPropsFromStore(state) {
  return {
    // id: React.PropTypes.string,
    // index: React.PropTypes.number,
    // title: React.PropTypes.string,
    // description: React.PropTypes.string,
    // isFav: React.PropTypes.bool,
    // location: React.PropTypes.object,
    // distance: React.PropTypes.number,
    // pic: React.PropTypes.string,
  };
}

const _injectPropsFormActions = {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
