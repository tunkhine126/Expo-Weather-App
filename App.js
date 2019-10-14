import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/weather'

const API_KEY = 'e405a49c88462d007a0b53d3208dfbf3'

export default class App extends React.Component {

  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condition'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          temperature: res.main.temp,
          weatherCondition: res.weather[0].main,
          isLoading: false       
         })
      });
  }

  
  render() {
    const isLoading = this.state

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.container}>
            <Text>Fetching Your Weather</Text> 
          </View>)
          : (
            <Weather weather={weatherCondition} temperature={temperature} />
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
