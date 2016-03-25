import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Route, Schema,
} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import EditProfile from './containers/EditProfile';
import Login from './containers/Login';
// import NHSample from './containers/sampleApp';

export default function AppRoutes() {
  return (
    <Router name="root">
      <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
      <Route name="Login" component={Login} title="Login" />
      <Route name="PostList" component={PostList} title="PostList" />
      <Route name="PostDetail" component={PostDetail} title="PostDetail" />
      <Route name="EditProfile" component={EditProfile} title="確認個人資料" initial />
    </Router>
  );
}
