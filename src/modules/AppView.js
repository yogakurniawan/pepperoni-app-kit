import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
// import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';
import NavigationBar from 'react-native-navbar';
import PhoneyListView from '../modules/list/ListView';

export default class AppView extends Component {
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const { dispatch } = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  renderNav() {
    const titleConfig = {
      title: 'Phoney'
    };

    return (
      <NavigationBar title={titleConfig} />
    );
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderNav()}
        <PhoneyListView />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    height: 45,
    padding: 10,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 19,
    fontWeight: '500'
  },
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});
