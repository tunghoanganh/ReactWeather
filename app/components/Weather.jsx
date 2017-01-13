var React = require('react');
var WeatherMessage = require('WeatherMessage');
var WeatherForm = require('WeatherForm');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },

  handleSearch: function (location) {
    var that = this;
    
    this.setState({isLoading: true});

    openWeatherMap.getTemp(location).then(function (temp) {
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function (errorMessage) {
      that.setState({isLoading: false});
      alert(errorMessage);
    });
  },

  render: function () {
    var {location, temp, isLoading} = this.state;

    function renderMessage () {
      if(isLoading) {
        return (
          <h3>Fetching weather...</h3>
        );
      } else if (location && temp) {
        return (
          <WeatherMessage location={location} temp={temp}/>
        );
      }
    }

    return (
      <div>
        <h2>Weather component</h2>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
      </div>

    );
  }
});

module.exports = Weather;
