import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    isLoading: true
  };
  
  render() {
    const isLoading = this.state

    return (
      <View style={styles.container}>
        {isLoading ? (<Text>Fetching Your Weather</Text>) : (
          <View>
            <Text>Echo Simple Weather App</Text>
          </View>  
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
