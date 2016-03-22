import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Route, Schema,
} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import MessengerSample from './components/Messenger/Messenger';
// import NHSample from './containers/sampleApp';

export default function AppRoutes() {
  return (
    <Router hideNavBar name="root">
      <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
      <Route name="Login" component={MessengerSample} title="Login" initial />
      <Route name="PostList" component={PostList} title="PostList"/>
      <Route name="PostDetail" component={PostDetail} title="PostDetail"/>
    </Router>
  );
}
