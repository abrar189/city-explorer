import React from 'react';
import axios from 'axios';
import Weather from './components/weather';
import Movie from './components/movie';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      dataOfobject: {},
      locationMap: false,
      showError: false,
      showWeatherData: false,
      weatherData: [],
      movieData: [],
      showMovieData: false




    }
  }
  showLocation = async (event) => {
    event.preventDefault();
    await this.setState({
      locationName: event.target.location.value
    })

    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&city=${this.state.locationName}&format=json`

    try {
      let allData = await axios.get(url);
      console.log(allData)
      this.setState({
        dataOfobject: allData.data[0],
        locationMap: true
      })
      this.getDataWeather();
      this.getDatamovie();
    } catch {
      this.setState({
        showError: true
      })
    }
  }

  getDataWeather = async () => {

    // let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.locationName.charAt(0).toUpperCase()+this.state.locationName.slice(1)}`
    try {
      let weatherdata = await axios.get(`${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.locationName.charAt(0).toUpperCase() + this.state.locationName.slice(1)}`);
      this.setState({
        weatherData: weatherdata.data,
        showWeatherData: true
      })
    }
    catch {
      this.setState({
        showError: true
      })
    }
  }

  getDatamovie = async () => {

    // let url = `${process.env.REACT_APP_SERVER}/movie?cityName=${this.state.locationName.charAt(0).toUpperCase()+this.state.locationName.slice(1)}`
    try {
      let moviedata = await axios.get(`${process.env.REACT_APP_SERVER}/movie?cityName=${this.state.locationName.charAt(0).toUpperCase() + this.state.locationName.slice(1)}`);
      this.setState({
        movieData: moviedata.data,
        showMovieData: true
      })
    }
    catch {
      this.setState({
        showError: true
      })
    }
  }
  render() {
    return (
      <div className='App-div'>
        <h2> City Explorer</h2>

        <form onSubmit={this.showLocation} >
          <input type='text' placeholder='Name of City' name='location' ></input><br></br>
          <input type='submit' value='Explore!' className='App-submit' />
        </form>
        <p> City Data :</p>
        <p> 1. City Name : {this.state.dataOfobject.display_name}</p>
        <p> 2. City lat :{this.state.dataOfobject.lat} </p>
        <p> 3. City lon :{this.state.dataOfobject.lon} </p>
        <p> 4. city map :
          {this.state.locationMap &&
            <img alt='' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.dataOfobject.lat},${this.state.dataOfobject.lon}&zoom=18`} className='map-imge' />
          }</p>

        {this.state.showError && <p> your data is wrong</p>}

        <Weather weatherData={this.state.weatherData} />
        <Movie movieData={this.state.movieData} />

      </div>
    )
  }
}

export default App;