import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './components/weather'
import Constants from 'expo'

const KEY = Expo.Constants.manifest.extra.mysecret

export default class App extends React.Component {

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    location: null,
    humidity: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Retriving Weather Conditions'
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=imperial`
    )
    .then(res => res.json())
    .then(data => {
      this.setState({
        temperature: data.main.temp,
        weatherCondition: data.weather[0].main,
        isLoading: false,
        location: data.name,
        humidity: data.main.humidity
        });
    });
  }

  
  render() {
    const { isLoading, weatherCondition, temperature, location, humidity } = this.state

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text stlye={styles.loadingText}>Fetching Your Weather</Text> 
          </View>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} location={location} humidity={humidity}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
