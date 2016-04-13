
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  TouchableOpacity,
  PixelRatio,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import {
  requestUpdateUserInfo,
  requestInputEmail,
} from '../actions/AuthActions';
import Dimensions from 'Dimensions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ActionButton from '../components/ActionButton';

const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  avatar: {
    borderRadius: 50,
    marginTop: 100,
    width: 100,
    height: 100,
  },
  username: {
    fontSize: 18,
    marginTop: 15,
    color: 'rgb(69, 135, 119)',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  body: {
    // backgroundColor: 'rgb(227, 227, 227)',
    width: 145 * PIXEL_RATIO,
    height: 66 * PIXEL_RATIO,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 18,
    color: 'rgb(69, 135, 119)',
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    // fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    color: 'rgb(69, 135, 119)',
    textAlign: 'left',
    fontSize: 15,
    height: 20,
    width: 120,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateEmail = this.updateEmail.bind(this);
    this.inputEmailHandle = this.inputEmailHandle.bind(this);
    this.state = {
      isConfirm: false,
    };
  }

  componentWillMount() {
    this.setState({
      isConfirm: this.props.isConfirm,
    });
  }

  componentWillUpdate(nextProps) {
    // const { isFirstLogin } = nextProps;
    // if (!isFirstLogin) {
    //   Actions.postList();
    // }
  }

  updateEmail() {
    this.props.requestUpdateUserInfo();
  }

  inputEmailHandle(email) {
    let userInfo = {};
    userInfo = {
      ...this.props.userInfo,
    };
    userInfo.email = email;
    this.props.requestInputEmail(userInfo);
  }

  inputEditable = () => {
    if (this.state.isConfirm === true) {
      return true;
    }
    return false;
  }

  buttonText = () => {
    if (this.state.isConfirm === true) {
      return '確認';
    }
    return '修改';
  }

  inputBorderStyle = () => {
    if (this.state.isConfirm === true) {
      return {
        borderStyle: 'dashed',
        backgroundColor: 'white',
      };
    }
    return '';
  }

  bodyColor = () => {
    if (this.state.isConfirm === true) {
      return 'rgb(252, 238, 187)';
    }
    return 'rgb(227, 227, 227)';
  }

  handleActionButtonPress = () => {
    if (this.state.isConfirm === true) {
      this.updateEmail();
    }
    this.setState({
      isConfirm: !this.state.isConfirm,
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
          <Text style={styles.username}>{userInfo.userName}</Text>
        </View>
        <View style={[styles.body, { backgroundColor: this.bodyColor() }]} >
          <View style={styles.row} >
            <Text style={styles.rowText}>Email： </Text>
            <TextInput
              editable={this.inputEditable()}
              style={[styles.input, this.inputBorderStyle()]}
              placeholder="點擊輸入Email"
              placeholderTextColor="rgb(69, 135, 119)"
              value={userInfo.email}
              onChangeText= { this.inputEmailHandle }
            />
          </View>
          {/*<TouchableOpacity onPress={ this.updateEmail } style={styles.button}>
            <Text style={styles.buttonText}>確認</Text>
          </TouchableOpacity>*/}
          <KeyboardSpacer />
        </View>
        <ActionButton
          text={this.buttonText()}
          onPress={this.handleActionButtonPress}
        />
      </View>
    );
  }
}

Profile.propTypes = {
  isConfirm: React.PropTypes.bool,
  userInfo: React.PropTypes.object,
  requestUpdateUserInfo: React.PropTypes.func,
  requestInputEmail: React.PropTypes.func,
};

function _injectPropsFromStore(state) {
  return {
    userInfo: state.auth.userInfo,
    isFirstLogin: state.auth.userInfo.isFirstLogin,
  };
}

const _injectPropsFormActions = {
  requestUpdateUserInfo,
  requestInputEmail,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Profile);
