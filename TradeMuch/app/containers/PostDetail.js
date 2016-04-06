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
    top: 15 * PixelRatio.get(),
    position: 'absolute',
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10 * PixelRatio.get(),
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11 * PixelRatio.get(),
    textAlign: 'left',
  },
  descriptionContainer: {
    justifyContent: 'flex-end',
    height: 150 * PixelRatio.get(),
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 9 * PixelRatio.get(),
    marginBottom: 5 * PixelRatio.get(),
    textAlign: 'left',
    height: 30 * PixelRatio.get(),
  },
  buttonContainer: {
    width: windowSize.width,
    bottom: 10 * PixelRatio.get(),
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 5 * PixelRatio.get(),
    paddingRight: 5 * PixelRatio.get(),
    paddingTop: 50 * PixelRatio.get(),
  },
  button: {
    flex: 1,
    margin: 5 * PixelRatio.get(),
    height: 15 * PixelRatio.get(),
    width: 100 * PixelRatio.get(),
    borderRadius: 3 * PixelRatio.get(),
    borderWidth: 0.5 * PixelRatio.get(),
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 5 * PixelRatio.get(),
  },
  footContainer: {
    flex: 1,
  },
  footBackColor: {
    height: windowSize.height,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonChatContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  openChatRoomText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 5 * PixelRatio.get(),
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3 * PixelRatio.get(),
  },
  openChatRoomButton: {
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15 * PixelRatio.get(),
    borderWidth: 1 * PixelRatio.get(),
    width: 30 * PixelRatio.get(),
    height: 30 * PixelRatio.get(),
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
    this.props.requestAddItemToFavList({
      postList: this.props.postList,
      index: this.props.index,
    });
  }

  DeleteFavoriteItemButtonHandle() {
    this.props.requestDeleteItemToFavList({
      postList: this.props.postList,
      index: this.props.index,
    });
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
            <Text style={styles.openChatRoomText} >對話</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
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
  // ...postList
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  isFav: React.PropTypes.bool,
  location: React.PropTypes.object,
  distance: React.PropTypes.number,
  pic: React.PropTypes.string,
  // postList[index]
  index: React.PropTypes.number,
  // postList array
  postList: React.PropTypes.array,
  requestAddItemToFavList: React.PropTypes.func,
  requestDeleteItemToFavList: React.PropTypes.func,
};

PostDetail.defaultProps = {
  // ...postList
  id: 0,
  title: '[標題]',
  description: '[描述]',
  isFav: null,
  location: { lat: 80.1, lon: 100 },
  distance: 1,
  pic: 'http://qa.trademuch.co.uk/img/human.png',
  // postList[index]
  index: 0,
  // postList array
  postList: [],
};

function _injectPropsFromStore(state) {
  return {
    // postList: state.search.postList,
  };
}

const _injectPropsFormActions = {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
