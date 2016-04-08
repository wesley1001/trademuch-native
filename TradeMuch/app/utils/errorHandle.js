import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
export function errorHandle(data) {
  switch (JSON.parse(data).status) {
    case 403:
      Alert.alert(
        '需要登入喔',
        '登入後體驗更多 TradeMuch 細節', [{
          text: '取消',
        }, {
          text: '登入',
          onPress: () => Actions.login(),
        }]
      );
      break;
    default:
      break;
  }
}
