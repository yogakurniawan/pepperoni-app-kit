import React from 'react';
import {
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollVIew,
  Text,
  View
} from 'react-native';
import MainPage from '../../components/MainPage';

const PhoneyListView = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({}))
    };
  },
  render() {
    return (
      <MainPage
        title='<ListView>'
        noSpacer={true}
        noScroll={true}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          />
      </MainPage>
    );
  },
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    const rowHash = Math.abs(hashCode(rowData));
    return (
      <TouchableHighlight onPress={() => {
        this._pressRow(rowID);
        highlightRow(sectionID, rowID);
      } }>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  _pressData: ({}),
  componentWillMount() {
    this._pressData = {};
  },
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
        }}
      />
    );
  },
  _pressRow(rowID) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
  _genRows(pressData) {
    var dataBlob = [];
    for (let ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  }
});

const hashCode = (str) => {
  let hash = 15;
  for (let ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1
  }
});

export default PhoneyListView;
