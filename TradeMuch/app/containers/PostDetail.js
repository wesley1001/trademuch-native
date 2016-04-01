'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Component,
  Alert,
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
    left: windowSize.width / 2 - 50,
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
    fontSize: 25,
    textAlign: 'left',
  },
  itemDescriptionContainer: {
    paddingLeft: 10 * PixelRatio.get(),
    marginBottom: 5 * PixelRatio.get(),
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
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
    fontSize: 18,
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
    this.AddToFavoriteButtonHandle = this.AddToFavoriteButtonHandle.bind(this);
    this.OpenChatRoomButtonHandle = this.OpenChatRoomButtonHandle.bind(this);
    this.OpenMapButtonHandle = this.OpenMapButtonHandle.bind(this);
    this.GetItNowButtonHandle = this.GetItNowButtonHandle.bind(this);
  }

  OpenChatRoomButtonHandle() {
    Actions.Messenger.call();
  }

  AddToFavoriteButtonHandle() {
    this.props.requestAddItemToFavList({ id: this.props.id });
    // this.props.requestDeleteItemToFavList({ id: this.props.id });
  }

  GetItNowButtonHandle() {
    Actions.Messenger({});
  }

  OpenMapButtonHandle() {
    console.log(`OpenMapButtonHandle=>${this.props.url}`);
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    const { url, src, photo, itemTitle, itemDescription } = this.props;
    console.log("!!!",itemDescription);
    if (this.props.postFinishData.id !== null) {
      Actions.postList();
    }

    return (
      <View style={styles.imageContainer}>
        <Image key="img" source={{uri: src}} style={styles.itemImg} />
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
          <Text style={styles.title}>{itemTitle}</Text>
        </View>
        <View style={styles.itemDescriptionContainer}>
          <Text style={styles.description}>{itemDescription}</Text>
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
            <TouchableOpacity
              style={styles.button}
              onPress={ this.AddToFavoriteButtonHandle }
            >
              <Text style={styles.buttonText} >追蹤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


function _injectPropsFromStore(state) {
  return {
    // itemTitle: state.post.title,
    // itemDescription: state.post.description,
    // photo: state.takePhoto.photoSource,
    // photoInfo: state.takePhoto.photoInfo,
    // imgSrc: state.post.upLoadImg,
    // postFinishData: state.post.postFinishData,
  };
}

PostDetail.propTypes = {
  id: React.PropTypes.string,
  itemTitle: React.PropTypes.string,
  itemDescription: React.PropTypes.string,
  url: React.PropTypes.string,
  src: React.PropTypes.string,
  requestAddItemToFavList: React.PropTypes.func,
  requestDeleteItemToFavList: React.PropTypes.func,
};

PostDetail.defaultProps = {
  itemTitle: '[標題]',
  itemDescription: '[描述]',
  photo: {},
  photoInfo: {},
  imgSrc: [{ name: '', src: '' }],
  postFinishData: { id: null, uuid: '', title: '', startDate: '', user_id: null, UserId: null },
};

const _injectPropsFormActions = {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
